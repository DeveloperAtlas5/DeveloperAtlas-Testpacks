#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(root, 'navigator-preview', 'demo-workspace')
const output = path.resolve(process.env.ATLAS_OUTPUT_DIR || path.join(root, 'dist', 'navigator-demo'))
const packageName = 'atlas-navigator-demo-workspace'
const stage = path.join(output, packageName)
const archive = path.join(output, `${packageName}.zip`)

fs.rmSync(output, { recursive: true, force: true })
copyTree(source, stage)
const files = listFiles(stage).map((file) => normalize(path.relative(stage, file))).sort()
for (const relative of files) {
  if (/private|internal|feedback|secret|token|canon-flow-map/i.test(relative)) throw new Error(`Forbidden demo path: ${relative}`)
  const content = fs.readFileSync(path.join(stage, relative), 'utf8')
  if (/[A-Za-z]:\\Users\\|\/Users\/[^/\s]+\//.test(content)) throw new Error(`Personal path found in demo file: ${relative}`)
}
execFileSync('zip', ['-q', '-r', archive, packageName], { cwd: output })
const sha256 = crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex')
fs.writeFileSync(`${archive}.sha256`, `${sha256}  ${path.basename(archive)}\n`)
fs.writeFileSync(path.join(output, 'package-manifest.json'), `${JSON.stringify({ schemaVersion: '1.0.0', package: path.basename(archive), sha256, files }, null, 2)}\n`)
fs.rmSync(stage, { recursive: true, force: true })
console.log(`[atlas] Packaged Navigator demo workspace with ${files.length} files.`)

function copyTree(sourcePath, destinationPath) {
  fs.mkdirSync(destinationPath, { recursive: true })
  for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
    const from = path.join(sourcePath, entry.name)
    const to = path.join(destinationPath, entry.name)
    if (entry.isDirectory()) copyTree(from, to)
    if (entry.isFile()) fs.copyFileSync(from, to)
  }
}
function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? listFiles(absolute) : [absolute]
  })
}
function normalize(value) { return String(value).replaceAll('\\', '/') }
