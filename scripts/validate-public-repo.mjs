#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const textExtensions = new Set(['.css', '.csv', '.html', '.js', '.json', '.md', '.mjs', '.txt', '.yml', '.yaml'])
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

for (const file of listFiles(root)) {
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

if (failures.length) {
  console.error('[atlas] Public repository validation failed:')
  for (const failure of [...new Set(failures)].sort()) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('[atlas] Public repository boundary and local links are valid.')

function listFiles(directory) {
  const output = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git') continue
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
