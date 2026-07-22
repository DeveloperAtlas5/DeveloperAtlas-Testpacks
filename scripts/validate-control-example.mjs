#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const example = path.join(root, 'control/examples/laravel-status-label')
const failures = []

const instruction = read('ATLAS_INSTRUCTION.md')
const patch = read('PROPOSED_PATCH.diff')
const evidence = read('SAMPLE_EVIDENCE.md')
const decision = read('DECISION_RECORD.md')

const allowed = extractBacktickList(section(instruction, 'Allowed files'))
const changed = [...patch.matchAll(/^diff --git a\/(.+?) b\/(.+)$/gm)].map((match) => match[2])
const addedLines = [...patch.matchAll(/^\+(?!\+\+)(.*)$/gm)].map((match) => match[1]).join('\n')

if (!allowed.length) failures.push('Atlas instruction declares no allowed files.')
if (!changed.length) failures.push('Proposed patch contains no changed files.')

for (const file of changed) {
  if (!allowed.includes(file)) failures.push(`Patch changes disallowed file: ${file}`)
}

for (const file of allowed) {
  if (!changed.includes(file)) failures.push(`Allowed file is absent from patch: ${file}`)
}

const checkedDecisions = [...decision.matchAll(/^- \[x\] (Accept|Revise|Reject)$/gmi)].map((m) => m[1])
if (checkedDecisions.length !== 1) {
  failures.push(`Decision record must select exactly one outcome; found ${checkedDecisions.length}.`)
}

const selected = checkedDecisions[0]?.toLowerCase()
const evidenceHasNotRun = /\bnot run\b/i.test(evidence) || /\bnot run\b/i.test(decision)
if (selected === 'accept' && evidenceHasNotRun) {
  failures.push('Decision cannot be Accept while required evidence is recorded as not run.')
}

if (selected === 'revise' || selected === 'reject') {
  const nextAction = section(decision, 'Required next action').trim()
  if (!nextAction || /^[-*]\s*none\b/i.test(nextAction)) {
    failures.push(`${checkedDecisions[0]} decision requires a concrete next action.`)
  }
}

const parked = section(instruction, 'Parked ideas')
const parkedTerms = ['color', 'polling', 'api endpoint', 'dashboard', 'deployment integration']
for (const term of parkedTerms) {
  if (parked.toLowerCase().includes(term) && addedLines.toLowerCase().includes(term)) {
    failures.push(`Patch appears to implement parked idea: ${term}`)
  }
}

if (!/php artisan test/i.test(instruction)) failures.push('Instruction does not declare the maintained test command.')
if (!/not run/i.test(evidence)) failures.push('Sample evidence must explicitly record the unrun runtime check.')
if (!/PROPOSED_PATCH\.diff/.test(decision)) failures.push('Decision record does not identify the reviewed patch.')

if (failures.length) {
  console.error('[atlas] Control example validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[atlas] Control example is consistent: ${changed.length} changed files, decision ${checkedDecisions[0]}.`)

function read(filename) {
  const target = path.join(example, filename)
  if (!fs.existsSync(target)) {
    failures.push(`Missing example file: ${filename}`)
    return ''
  }
  return fs.readFileSync(target, 'utf8')
}

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = markdown.match(new RegExp(`^##\\s+${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|\\Z)`, 'mi'))
  return match?.[1] ?? ''
}

function extractBacktickList(markdown) {
  return [...markdown.matchAll(/^- `([^`]+)`\s*$/gm)].map((match) => match[1])
}
