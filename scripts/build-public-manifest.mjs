#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestRelative = 'config/public-export/manifest.json'
const manifestPath = path.join(root, manifestRelative)
const checkOnly = process.argv.includes('--check')
const ignoredDirectories = new Set(['.git', 'dist', 'node_modules', 'playwright-report', 'test-results'])
const textExtensions = new Set(['.css', '.csv', '.diff', '.html', '.js', '.json', '.md', '.mjs', '.php', '.svg', '.txt', '.yml', '.yaml'])
const textBasenames = new Set(['.gitattributes', '.gitignore', '.npmrc', 'CODEOWNERS', 'Dockerfile', 'LICENSE'])

const files = listFiles(root)
  .map((filePath) => ({
    path: normalize(path.relative(root, filePath)),
    sha256: hashPublicFile(filePath),
  }))
  .filter((record) => record.path !== manifestRelative)
  .sort((a, b) => a.path.localeCompare(b.path))

const manifest = {
  schemaVersion: '1.0.0',
  source: 'DeveloperAtlas-Public reviewed public tree',
  hashAlgorithm: 'sha256-normalized-text-v1',
  generatedBy: 'scripts/build-public-manifest.mjs',
  selfExcluded: manifestRelative,
  files,
}
const expected = `${JSON.stringify(manifest, null, 2)}\n`

if (checkOnly) {
  if (!fs.existsSync(manifestPath) || normalizeText(fs.readFileSync(manifestPath, 'utf8')) !== expected) {
    console.error('[atlas] Public manifest is stale. Run npm run manifest:build and review the diff.')
    process.exit(1)
  }
  console.log(`[atlas] Public manifest is current (${files.length} fingerprinted files).`)
  process.exit(0)
}

fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
fs.writeFileSync(manifestPath, expected, 'utf8')
console.log(`[atlas] Wrote public manifest (${files.length} fingerprinted files).`)

function listFiles(directory) {
  const output = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) output.push(...listFiles(absolutePath))
    if (entry.isFile()) output.push(absolutePath)
  }
  return output
}

function hashPublicFile(filePath) {
  const extension = path.extname(filePath).toLowerCase()
  const basename = path.basename(filePath)
  if (textExtensions.has(extension) || textBasenames.has(basename)) {
    return sha256Text(fs.readFileSync(filePath, 'utf8'))
  }
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function sha256Text(value) {
  return crypto.createHash('sha256').update(normalizeText(value), 'utf8').digest('hex')
}

function normalizeText(value) {
  return String(value).replaceAll('\r\n', '\n').replaceAll('\r', '\n').replace(/^\uFEFF/, '')
}

function normalize(value) {
  return String(value).replaceAll('\\', '/')
}
