#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(root, 'navigator-preview', 'extension')
const outputRoot = path.resolve(process.env.ATLAS_OUTPUT_DIR || path.join(root, 'dist', 'navigator-preview'))
const stageRoot = path.join(outputRoot, 'stage')
const extensionRoot = path.join(stageRoot, 'extension')
const allowlist = JSON.parse(fs.readFileSync(path.join(root, 'config', 'navigator-preview-allowlist.json'), 'utf8'))
const packageJson = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'package.json'), 'utf8'))
const archiveName = `${packageJson.name}-${packageJson.version}.vsix`
const archivePath = path.join(outputRoot, archiveName)

fs.rmSync(outputRoot, { recursive: true, force: true })
fs.mkdirSync(extensionRoot, { recursive: true })
copyTree(sourceRoot, extensionRoot)

const knowledgeRoot = path.join(extensionRoot, 'knowledge')
fs.mkdirSync(knowledgeRoot, { recursive: true })
const nodeIndex = []
for (const record of allowlist.nodes) {
  for (const key of ['source', 'evidence']) assertPublicPath(record[key])
  const nodeFile = `${record.id}.md`
  const evidenceFile = `${record.id}.evidence.json`
  fs.copyFileSync(path.join(root, record.source), path.join(knowledgeRoot, nodeFile))
  fs.copyFileSync(path.join(root, record.evidence), path.join(knowledgeRoot, evidenceFile))
  nodeIndex.push({ id: record.id, title: record.title, file: nodeFile, evidenceFile })
}
fs.writeFileSync(path.join(knowledgeRoot, 'index.json'), `${JSON.stringify({ schemaVersion: '1.0.0', nodes: nodeIndex }, null, 2)}\n`)

const packagedFiles = listFiles(extensionRoot).map((file) => normalize(path.relative(extensionRoot, file))).sort()
for (const relative of packagedFiles) {
  if (/private|internal|atlas-control|canon-index|reviews/i.test(relative)) throw new Error(`Forbidden Navigator preview path: ${relative}`)
  const stat = fs.statSync(path.join(extensionRoot, relative))
  if (stat.size > 1024 * 1024) throw new Error(`Navigator preview file exceeds 1 MiB: ${relative}`)
}

fs.writeFileSync(path.join(stageRoot, '[Content_Types].xml'), `<?xml version="1.0" encoding="utf-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="json" ContentType="application/json"/><Default Extension="js" ContentType="application/javascript"/><Default Extension="cjs" ContentType="application/javascript"/><Default Extension="md" ContentType="text/markdown"/><Default Extension="svg" ContentType="image/svg+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="txt" ContentType="text/plain"/><Override PartName="/extension.vsixmanifest" ContentType="text/xml"/></Types>\n`)
fs.writeFileSync(path.join(stageRoot, 'extension.vsixmanifest'), vsixManifest(packageJson))

fs.rmSync(archivePath, { force: true })
execFileSync('zip', ['-q', '-r', archivePath, '[Content_Types].xml', 'extension.vsixmanifest', 'extension'], { cwd: stageRoot })
const sha256 = crypto.createHash('sha256').update(fs.readFileSync(archivePath)).digest('hex')
fs.writeFileSync(`${archivePath}.sha256`, `${sha256}  ${archiveName}\n`)
fs.writeFileSync(path.join(outputRoot, 'package-manifest.json'), `${JSON.stringify({ schemaVersion: '1.0.0', package: archiveName, sha256, publicKnowledgeNodes: nodeIndex.map((node) => node.id), files: packagedFiles }, null, 2)}\n`)
fs.rmSync(stageRoot, { recursive: true, force: true })
console.log(`[atlas] Built ${archiveName} with ${packagedFiles.length} files and ${nodeIndex.length} allowlisted public nodes.`)

function assertPublicPath(relative) {
  const absolute = path.resolve(root, relative)
  if (!absolute.startsWith(`${root}${path.sep}`) || !relative.startsWith('content/nodes/')) throw new Error(`Non-public Navigator source path: ${relative}`)
  if (!fs.existsSync(absolute)) throw new Error(`Missing Navigator source path: ${relative}`)
}

function copyTree(source, destination) {
  fs.mkdirSync(destination, { recursive: true })
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)
    if (entry.isDirectory()) copyTree(sourcePath, destinationPath)
    if (entry.isFile()) fs.copyFileSync(sourcePath, destinationPath)
  }
}

function listFiles(directory) {
  const output = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) output.push(...listFiles(absolute))
    if (entry.isFile()) output.push(absolute)
  }
  return output
}

function vsixManifest(pkg) {
  return `<?xml version="1.0" encoding="utf-8"?>\n<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011"><Metadata><Identity Language="en-US" Id="${escapeXml(pkg.name)}" Version="${escapeXml(pkg.version)}" Publisher="${escapeXml(pkg.publisher)}"/><DisplayName>${escapeXml(pkg.displayName)}</DisplayName><Description xml:space="preserve">${escapeXml(pkg.description)}</Description><Tags>laravel,blade,php,navigation,flow,preview</Tags><Categories>Other,Programming Languages,Education</Categories><Properties><Property Id="Microsoft.VisualStudio.Code.Engine" Value="${escapeXml(pkg.engines.vscode)}"/><Property Id="Microsoft.VisualStudio.Code.PreRelease" Value="true"/></Properties></Metadata><Installation><InstallationTarget Id="Microsoft.VisualStudio.Code" Version="${escapeXml(pkg.engines.vscode)}"/></Installation><Dependencies/><Assets><Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true"/><Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE" Addressable="true"/></Assets></PackageManifest>\n`
}

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function normalize(value) {
  return String(value).replaceAll('\\', '/')
}
