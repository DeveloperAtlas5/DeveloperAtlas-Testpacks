const requiredHeadings = [
  '## Change Contract',
  '### Human goal',
  '### Allowed paths',
  '### Protected boundaries',
  '### Parked ideas',
  '## Evidence Record',
  '### Changed files',
  '### Verification results',
  '### Manual review',
  '### AI assistance',
  '## Decision Record',
  '### Decision',
  '### Accountable human',
  '### Rationale',
  '### Merge confirmation',
]

export function validatePullRequest(pullRequest = {}) {
  if (pullRequest.draft === true) return []

  const body = normalize(pullRequest.body)
  const errors = []

  if (!body.trim()) return ['Ready pull requests require a completed Atlas Change Contract, Evidence Record, and Decision Record.']
  if (/<!--|-->/.test(body)) errors.push('Remove all template comments before marking the pull request ready for review.')

  for (const heading of requiredHeadings) {
    if (!body.split('\n').some((line) => line.trim() === heading)) errors.push(`Missing required heading: ${heading}`)
  }

  requireMeaningfulSection(body, '### Human goal', '### Allowed paths', errors)
  requireBullets(body, '### Allowed paths', '### Protected boundaries', errors)
  requireBullets(body, '### Protected boundaries', '### Parked ideas', errors)
  requireBullets(body, '### Parked ideas', '## Evidence Record', errors)
  requireBullets(body, '### Changed files', '### Verification results', errors)
  requireMeaningfulSection(body, '### AI assistance', '## Decision Record', errors)
  requireMeaningfulSection(body, '### Accountable human', '### Rationale', errors)
  requireMeaningfulSection(body, '### Rationale', '### Merge confirmation', errors)

  const verification = section(body, '### Verification results', '### Manual review')
  const manualReview = section(body, '### Manual review', '### AI assistance')
  const observedPasses = [...verification.matchAll(/\*\*Passed\*\*/g)].length + [...manualReview.matchAll(/\*\*Passed\*\*/g)].length
  if (observedPasses < 2) errors.push('Record at least two observed Passed results across verification and manual review.')
  if (/\*\*(?:Not run|Failed)\*\*/i.test(`${verification}\n${manualReview}`)) {
    errors.push('An accepted ready pull request cannot contain Failed or Not run verification/manual-review results.')
  }

  const decision = section(body, '### Decision', '### Accountable human')
  const decisions = ['Accept', 'Revise', 'Reject'].filter((label) => new RegExp(`^- \\[x\\] ${label}$`, 'im').test(decision))
  if (decisions.length !== 1) errors.push('Select exactly one decision: Accept, Revise, or Reject.')
  else if (decisions[0] !== 'Accept') errors.push('Only an explicit Accept decision can satisfy the ready-for-merge policy.')

  const confirmation = section(body, '### Merge confirmation', null)
  if (!/^- \[x\] I confirm that all required checks and manual reviews above were observed as passed before merge\.$/im.test(confirmation)) {
    errors.push('Complete the merge confirmation after all required checks and manual reviews pass.')
  }

  return [...new Set(errors)]
}

function requireMeaningfulSection(body, start, end, errors) {
  const value = section(body, start, end)
    .replace(/^[-*]\s*/gm, '')
    .trim()
  if (!value || /^(?:none|n\/a)?$/i.test(value)) errors.push(`${start} requires a concrete value.`)
}

function requireBullets(body, start, end, errors) {
  const value = section(body, start, end)
  const bullets = value.split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+\S/.test(line) && !/^[-*]\s*$/.test(line))
  if (bullets.length === 0) errors.push(`${start} requires at least one explicit bullet (use “None” when appropriate).`)
}

function section(body, start, end) {
  const startIndex = body.indexOf(start)
  if (startIndex === -1) return ''
  const contentStart = startIndex + start.length
  if (!end) return body.slice(contentStart).trim()
  const endIndex = body.indexOf(end, contentStart)
  return body.slice(contentStart, endIndex === -1 ? body.length : endIndex).trim()
}

function normalize(value) {
  return String(value ?? '').replaceAll('\r\n', '\n').replaceAll('\r', '\n')
}
