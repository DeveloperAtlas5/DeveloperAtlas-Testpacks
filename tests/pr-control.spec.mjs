import assert from 'node:assert/strict'
import test from 'node:test'
import { validatePullRequest } from '../scripts/pr-control-policy.mjs'

const validBody = `## Change Contract

### Human goal

Make the reviewed public export trustworthy.

### Allowed paths

- content/nodes/**
- scripts/**

### Protected boundaries

- Do not expose private source or personal data.

### Parked ideas

- None.

## Evidence Record

### Changed files

- scripts/validate-public-repo.mjs
- content/nodes/evidence/example.evidence.json

### Verification results

- npm test: **Passed**

### Manual review

- Public-path review: **Passed**
- Public/private boundary review: **Passed**

### AI assistance

- AI assisted with implementation and test preparation; the maintainer reviewed the result.

## Decision Record

### Decision

- [x] Accept
- [ ] Revise
- [ ] Reject

### Accountable human

- Repository maintainer

### Rationale

- The change stays in scope and all required evidence was observed.

### Merge confirmation

- [x] I confirm that all required checks and manual reviews above were observed as passed before merge.
`

test('draft pull requests may remain incomplete', () => {
  assert.deepEqual(validatePullRequest({ draft: true, body: '' }), [])
})

test('a complete accepted control record passes', () => {
  assert.deepEqual(validatePullRequest({ draft: false, body: validBody }), [])
})

test('template comments and unrun checks fail for a ready pull request', () => {
  const body = validBody
    .replace('Make the reviewed public export trustworthy.', '<!-- goal -->')
    .replace('**Passed**', '**Not run**')
  const errors = validatePullRequest({ draft: false, body })
  assert.ok(errors.some((error) => error.includes('template comments')))
  assert.ok(errors.some((error) => error.includes('Not run')))
})

test('multiple or non-accept decisions fail', () => {
  const body = validBody
    .replace('- [ ] Revise', '- [x] Revise')
  const errors = validatePullRequest({ draft: false, body })
  assert.ok(errors.some((error) => error.includes('exactly one decision')))
})
