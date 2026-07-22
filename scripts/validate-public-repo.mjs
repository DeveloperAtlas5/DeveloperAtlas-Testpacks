#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const textExtensions = new Set(['.css', '.csv', '.diff', '.html', '.js', '.json', '.md', '.mjs', '.php', '.txt', '.yml', '.yaml'])
const textBasenames = new Set(['.gitattributes', '.gitignore', '.npmrc', 'CODEOWNERS', 'Dockerfile', 'LICENSE'])
const requiredFiles = [
  'docs/getting-started/TRY_ATLAS.md',
  '.github/CONTRIBUTING.md',
  '.github/SECURITY.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/workflows/pr-control.yml',
  'docs/README.md',
  'docs/governance/REPOSITORY_RULES.md',
  'docs/testing/START_TESTING.md',
  'docs/testing/FEEDBACK.md',
  'config/public-export/manifest.json',
  'control/CHANGE_CONTRACT_TEMPLATE.md',
  'control/DECISION_RECORD_TEMPLATE.md',
  'control/examples/laravel-status-label/COMPLETED_EXAMPLE.md',
  'control/examples/laravel-status-label/DECISION_RECORD.md',
  'control/examples/laravel-status-label/PROPOSED_PATCH.diff',
  'content/missions/README.md',
  'content/nodes/README.md',
  'examples/README.md',
  'scripts/pr-control-policy.mjs',
  'scripts/validate-pr-body.mjs',
  'tests/browser-list.spec.mjs',
  'tests/pr-control.spec.mjs',
]
const forbiddenPathFragments = [
  '/.env',
  '/artifacts/',
  '/feedback/raw/',
  '/internal/',
  '/node_modules/',
  '/private/',
]
const forbiddenContent = [
  { label: 'Windows user path', pattern: /[A-Za-z]:\\Users\\/i },
  { label: 'macOS user path', pattern: /\/Users\/[^/\s]+\// },
  { label: 'Codex attachment path', pattern: /\.codex[\\/]attachments/i },
  { label: 'private key', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: 'GitHub token', pattern: /(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}/ },
  { label: 'OpenAI-style secret', pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
]
const allFiles = listFiles(root)
const nodePaths = new Map()
const evidencePaths = new Map()

for (const file of allFiles) {
  const relative = normalize(path.relative(root, file))
  const probe = `/${relative.toLowerCase()}`
  if (forbiddenPathFragments.some((fragment) => probe.includes(fragment))) {
    failures.push(`${relative}: forbidden path`)
    continue
  }

  const stat = fs.statSync(file)
  if (stat.size > 5 * 1024 * 1024) failures.push(`${relative}: file exceeds 5 MiB`)
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue

  const content = fs.readFileSync(file, 'utf8')
  for (const rule of forbiddenContent) {
    if (rule.pattern.test(content)) failures.push(`${relative}: contains ${rule.label}`)
  }

  if (
    (relative.startsWith('examples/') || relative.startsWith('content/missions/')) &&
    /\.(?:innerHTML|outerHTML)\s*=|insertAdjacentHTML\s*\(|document\.write\s*\(/.test(content)
  ) {
    failures.push(`${relative}: uses unsafe HTML insertion in public teaching material`)
  }

  const nodeMatch = relative.match(/^content\/nodes\/(gold|supporting)\/([^/]+)\.md$/)
  if (nodeMatch) {
    const nodeId = nodeMatch[2].toUpperCase()
    nodePaths.set(nodeId, file)
    validateNodeDocument(relative, content, nodeId)
  }

  const evidenceMatch = relative.match(/^content\/nodes\/evidence\/([^/]+)\.evidence\.json$/)
  if (evidenceMatch) evidencePaths.set(evidenceMatch[1].toUpperCase(), file)

  if (relative === 'content/missions/free/MISSION-HTML-001.md' && /status:\s*draft/i.test(content)) {
    failures.push(`${relative}: recommended public mission cannot remain draft`)
  }

  if (path.extname(file).toLowerCase() === '.md') {
    for (const target of markdownTargets(content)) {
      if (!isLocalTarget(target)) continue
      const clean = decodeURIComponent(target.split('#')[0].split('?')[0])
      if (!clean) continue
      const destination = path.resolve(path.dirname(file), clean)
      if (!isInside(root, destination) || !fs.existsSync(destination)) {
        failures.push(`${relative}: broken local link ${target}`)
      }
    }
  }
}

for (const [nodeId, nodePath] of nodePaths) {
  const evidencePath = evidencePaths.get(nodeId)
  const nodeRelative = normalize(path.relative(root, nodePath))
  if (!evidencePath) {
    failures.push(`${nodeRelative}: matching evidence sidecar is missing`)
    continue
  }
  validatePublicEvidence(nodeId, nodePath, evidencePath)
}

for (const [nodeId, evidencePath] of evidencePaths) {
  if (!nodePaths.has(nodeId)) failures.push(`${normalize(path.relative(root, evidencePath))}: matching public node is missing`)
}

for (const required of requiredFiles) {
  if (!fs.existsSync(path.join(root, required))) failures.push(`${required}: required golden-path file is missing`)
}

validateCanonicalExportManifest()

if (failures.length) {
  console.error('[atlas] Public repository validation failed:')
  for (const failure of [...new Set(failures)].sort()) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[atlas] Public repository boundary, links, ${nodePaths.size} node/evidence pairs, frontmatter, and canonical export manifest are valid.`)

function validateNodeDocument(relative, content, nodeId) {
  const normalizedContent = normalizeText(content)
  const frontmatter = inspectFrontmatter(normalizedContent)
  if (frontmatter.error) failures.push(`${relative}: ${frontmatter.error}`)
  if (frontmatter.id && frontmatter.id.toUpperCase() !== nodeId) failures.push(`${relative}: frontmatter id ${frontmatter.id} does not match ${nodeId}`)

  const headingIndex = normalizedContent.search(/^#\s+/m)
  const statusIndex = normalizedContent.indexOf('> **Evidence status — public preview**')
  if (statusIndex === -1) failures.push(`${relative}: missing visible public evidence status`)
  if (headingIndex === -1) failures.push(`${relative}: missing H1 title`)
  if (statusIndex !== -1 && headingIndex !== -1 && statusIndex < headingIndex) failures.push(`${relative}: evidence status must appear after the H1 title`)
  if (frontmatter.endOffset && statusIndex !== -1 && statusIndex < frontmatter.endOffset) failures.push(`${relative}: evidence status is inside YAML frontmatter`)
  if (!/Independent human review: \*\*(?:pending|complete)\*\*/i.test(normalizedContent)) failures.push(`${relative}: independent human review state is not visible`)
  if (!/Primary-source mapping: \*\*completed with AI assistance\*\*/i.test(normalizedContent)) failures.push(`${relative}: AI-assisted primary-source review is not visible`)
}

function validatePublicEvidence(nodeId, nodePath, evidencePath) {
  const owner = normalize(path.relative(root, evidencePath))
  let evidence
  try {
    evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'))
  } catch (error) {
    failures.push(`${owner}: invalid JSON (${error.message})`)
    return
  }

  if (evidence.nodeId !== nodeId) failures.push(`${owner}: nodeId must match ${nodeId}`)
  if (!/^[a-f0-9]{64}$/i.test(evidence.nodeContentSha256 || '')) failures.push(`${owner}: canonical nodeContentSha256 is missing or invalid`)
  if (!Array.isArray(evidence.sources) || evidence.sources.length === 0) failures.push(`${owner}: sources must be non-empty`)
  if (!Array.isArray(evidence.verifications) || evidence.verifications.length === 0) failures.push(`${owner}: verifications must be non-empty`)
  if (!['pending', 'complete'].includes(evidence.independentReview?.status)) failures.push(`${owner}: independentReview.status must be pending or complete`)

  const publicExport = evidence.publicExport
  if (!publicExport || typeof publicExport !== 'object') {
    failures.push(`${owner}: publicExport integrity metadata is missing`)
    return
  }
  if (publicExport.transformation !== 'evidence-status-banner-v1') failures.push(`${owner}: unsupported public export transformation`)
  if (publicExport.canonicalHashField !== 'nodeContentSha256') failures.push(`${owner}: canonicalHashField must be nodeContentSha256`)
  if (!/^[a-f0-9]{64}$/i.test(publicExport.contentSha256 || '')) failures.push(`${owner}: publicExport.contentSha256 is missing or invalid`)

  const actual = sha256Text(fs.readFileSync(nodePath, 'utf8'))
  if (publicExport.contentSha256 !== actual) failures.push(`${owner}: publicExport.contentSha256 is stale for ${normalize(path.relative(root, nodePath))}`)
}

function inspectFrontmatter(content) {
  if (!content.startsWith('---\n')) return { present: false, endOffset: 0, id: null }
  const lines = content.split('\n')
  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---')
  if (closingIndex === -1) return { present: true, endOffset: 0, id: null, error: 'unclosed YAML frontmatter' }
  const frontmatterLines = lines.slice(1, closingIndex)
  if (frontmatterLines.some((line) => /^\s*(?:>|#{1,6}\s|```)/.test(line))) {
    return { present: true, endOffset: offsetThroughLine(lines, closingIndex), id: null, error: 'Markdown content appears inside YAML frontmatter' }
  }
  const idLine = frontmatterLines.find((line) => /^id:\s*\S/.test(line))
  return {
    present: true,
    endOffset: offsetThroughLine(lines, closingIndex),
    id: idLine?.replace(/^id:\s*/, '').trim() ?? null,
  }
}

function offsetThroughLine(lines, index) {
  return lines.slice(0, index + 1).join('\n').length
}

function validateCanonicalExportManifest() {
  const manifestRelative = 'config/public-export/manifest.json'
  const manifestPath = path.join(root, manifestRelative)
  if (!fs.existsSync(manifestPath)) return

  let manifest
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    failures.push(`${manifestRelative}: invalid JSON (${error.message})`)
    return
  }

  if (manifest.schemaVersion !== '1.0.0') failures.push(`${manifestRelative}: schemaVersion must be 1.0.0`)
  if (manifest.hashAlgorithm !== 'sha256-normalized-text-v1') failures.push(`${manifestRelative}: unsupported hashAlgorithm`)
  if (!Array.isArray(manifest.files)) {
    failures.push(`${manifestRelative}: files must be an array`)
    return
  }

  const expected = new Map()
  for (const record of manifest.files) {
    if (!record?.path || !/^[a-f0-9]{64}$/i.test(record?.sha256 || '')) {
      failures.push(`${manifestRelative}: every file record needs path and sha256`)
      continue
    }
    if (record.path === manifestRelative) failures.push(`${manifestRelative}: manifest must not fingerprint itself`)
    if (expected.has(record.path)) failures.push(`${manifestRelative}: duplicate record ${record.path}`)
    expected.set(record.path, record.sha256)
  }

  const actualFiles = allFiles
    .map((file) => normalize(path.relative(root, file)))
    .filter((relative) => relative !== manifestRelative)
    .sort((a, b) => a.localeCompare(b))
  const manifestOrder = manifest.files.map((record) => record.path)
  if (JSON.stringify(manifestOrder) !== JSON.stringify([...manifestOrder].sort((a, b) => a.localeCompare(b)))) {
    failures.push(`${manifestRelative}: file records must be sorted by path`)
  }

  for (const relative of actualFiles) {
    if (!expected.has(relative)) {
      failures.push(`${manifestRelative}: untracked public file ${relative}`)
      continue
    }
    const actualHash = hashPublicFile(path.join(root, relative))
    if (expected.get(relative) !== actualHash) failures.push(`${manifestRelative}: stale hash for ${relative}`)
  }
  for (const relative of expected.keys()) {
    if (!actualFiles.includes(relative)) failures.push(`${manifestRelative}: manifest references missing file ${relative}`)
  }
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

function listFiles(directory) {
  const output = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'playwright-report', 'test-results'].includes(entry.name)) continue
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) output.push(...listFiles(absolutePath))
    if (entry.isFile()) output.push(absolutePath)
  }
  return output
}

function markdownTargets(content) {
  return [...content.matchAll(/!?(?:\[[^\]]*\])\(([^)]+)\)/g)]
    .map((match) => match[1].trim().replace(/^<|>$/g, ''))
}

function isLocalTarget(target) {
  return !/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function normalize(value) {
  return String(value).replaceAll('\\', '/')
}
