#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exercise = path.join(root, 'control', 'exercises', 'browser-list-count')
const baseline = path.join(exercise, 'baseline')
const project = path.join(exercise, 'project')
const expectedChanged = ['index.html', 'script.js']
const changed = [...new Set([...listRelativeFiles(baseline), ...listRelativeFiles(project)])]
  .filter((relative) => hash(path.join(baseline, relative)) !== hash(path.join(project, relative)))
  .sort()

if (JSON.stringify(changed) !== JSON.stringify(expectedChanged)) {
  throw new Error(`Exercise scope mismatch. Expected ${expectedChanged.join(', ')}, observed ${changed.join(', ') || 'no changes'}.`)
}

const record = fs.readFileSync(path.join(exercise, 'records', 'IN_SCOPE_CHANGED_FILES.txt'), 'utf8').trim().split(/\r?\n/).filter(Boolean)
const expectedRecord = expectedChanged.map((relative) => `control/exercises/browser-list-count/project/${relative}`)
if (JSON.stringify(record) !== JSON.stringify(expectedRecord)) throw new Error('IN_SCOPE_CHANGED_FILES.txt is stale.')

const patch = fs.readFileSync(path.join(exercise, 'proposed', 'IN_SCOPE_PATCH.diff'), 'utf8')
const patchPaths = [...patch.matchAll(/^diff --git a\/(.+?) b\/(.+)$/gm)].map((match) => match[2]).sort()
if (JSON.stringify(patchPaths) !== JSON.stringify(expectedRecord)) throw new Error('IN_SCOPE_PATCH.diff path list is stale.')

console.log(`[atlas] Control exercise scope verified: ${changed.join(', ')} only.`)

function listRelativeFiles(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return listRelativeFiles(absolute).map((relative) => path.join(entry.name, relative))
    return [entry.name]
  }).map((relative) => relative.replaceAll('\\', '/')).sort()
}

function hash(file) {
  if (!fs.existsSync(file)) return null
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}
