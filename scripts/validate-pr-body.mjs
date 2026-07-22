#!/usr/bin/env node

import fs from 'node:fs'
import { validatePullRequest } from './pr-control-policy.mjs'

const eventPath = process.argv[2] || process.env.GITHUB_EVENT_PATH
if (!eventPath || !fs.existsSync(eventPath)) {
  console.error('[atlas] PR control requires a GitHub event payload path.')
  process.exit(1)
}

let event
try {
  event = JSON.parse(fs.readFileSync(eventPath, 'utf8'))
} catch (error) {
  console.error(`[atlas] Could not parse PR event payload: ${error.message}`)
  process.exit(1)
}

const pullRequest = event.pull_request ?? event
if (pullRequest.draft === true) {
  console.log('[atlas] Draft pull request: control record may remain incomplete until ready for review.')
  process.exit(0)
}

const errors = validatePullRequest(pullRequest)
if (errors.length) {
  console.error('[atlas] Pull-request control record is incomplete:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('[atlas] Pull-request Change Contract, Evidence Record, and Decision Record are complete.')
