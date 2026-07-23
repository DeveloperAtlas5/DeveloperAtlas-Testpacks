#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractSummary, extractTitle, renderMarkdown } from './compendium-render.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const allowlistPath = path.join(root, 'config', 'compendium-preview-allowlist.json')
const outputPath = path.join(root, 'compendium-preview', 'data.js')
const manifestPath = path.join(root, 'compendium-preview', 'data-manifest.json')
const checkOnly = process.argv.includes('--check')
const allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'))
const nodes = []
const sourceFiles = []

for (const record of allowlist.nodes) {
  assertPublicNodePath(record.source)
  assertPublicNodePath(record.evidence)
  const markdown = fs.readFileSync(path.join(root, record.source), 'utf8')
  const evidenceText = fs.readFileSync(path.join(root, record.evidence), 'utf8')
  const evidence = JSON.parse(evidenceText)
  if (evidence.nodeId !== record.id) throw new Error(`Compendium evidence mismatch for ${record.id}`)
  nodes.push({
    id: record.id,
    title: extractTitle(markdown, record.id),
    summary: extractSummary(markdown),
    tags: record.tags,
    versionScope: evidence.versionScope || [],
    reviewedAt: evidence.reviewedAt || null,
    sourceCount: Array.isArray(evidence.sources) ? evidence.sources.length : 0,
    verificationCount: Array.isArray(evidence.verifications) ? evidence.verifications.length : 0,
    independentReview: evidence.independentReview?.status || 'pending',
    sources: (evidence.sources || []).map((source) => ({ title: source.title, publisher: source.publisher, url: source.url, checkedAt: source.checkedAt })),
    limitations: evidence.limitations || [],
    sourcePath: record.source,
    sourceUrl: `https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/${record.source}`,
    evidenceUrl: `https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/${record.evidence}`,
    html: withoutLeadingTitle(renderMarkdown(markdown, record.source)),
  })
  sourceFiles.push(fingerprint(record.source), fingerprint(record.evidence))
}

nodes.sort((a, b) => a.title.localeCompare(b.title))
const payload = {
  schemaVersion: '1.0.0',
  generatedFrom: 'allowlisted public node and evidence files only',
  nodeCount: nodes.length,
  nodes,
}
const dataContent = `window.ATLAS_COMPENDIUM_DATA = ${JSON.stringify(payload, null, 2)};\n`
const manifest = {
  schemaVersion: '1.0.0',
  allowlist: 'config/compendium-preview-allowlist.json',
  nodeIds: nodes.map((node) => node.id),
  sources: sourceFiles.sort((a, b) => a.path.localeCompare(b.path)),
  dataSha256: sha256(dataContent),
}
const manifestContent = `${JSON.stringify(manifest, null, 2)}\n`

if (checkOnly) {
  const currentData = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : ''
  const currentManifest = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, 'utf8') : ''
  if (currentData !== dataContent || currentManifest !== manifestContent) {
    console.error('[atlas] Compendium preview data is stale. Run npm run compendium:build.')
    process.exit(1)
  }
  console.log(`[atlas] Compendium preview data is current (${nodes.length} public nodes).`)
  process.exit(0)
}

fs.writeFileSync(outputPath, dataContent)
fs.writeFileSync(manifestPath, manifestContent)
console.log(`[atlas] Built clean-room Compendium preview data from ${nodes.length} public nodes.`)

function withoutLeadingTitle(html) {
  return String(html).replace(/^<h1[^>]*>[\s\S]*?<\/h1>\n?/, '')
}

function assertPublicNodePath(relative) {
  if (!/^content\/nodes\/(?:gold|supporting|evidence)\//.test(relative)) throw new Error(`Non-public Compendium source path: ${relative}`)
  const absolute = path.resolve(root, relative)
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute)) throw new Error(`Missing Compendium source path: ${relative}`)
}
function fingerprint(relative) {
  return { path: relative, sha256: sha256(fs.readFileSync(path.join(root, relative))) }
}
function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}
