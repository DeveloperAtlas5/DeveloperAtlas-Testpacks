const form = document.querySelector('#control-form')
const output = document.querySelector('#output')
const artifacts = document.querySelector('#artifacts')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = readForm()
  const generated = [
    ['CHANGE_CONTRACT.md', changeContract(data)],
    ['AI_INSTRUCTION.md', aiInstruction(data)],
    ['EVIDENCE_RECORD.md', evidenceRecord(data)],
    ['DECISION_RECORD.md', decisionRecord(data)],
  ]

  artifacts.textContent = ''
  for (const [filename, content] of generated) artifacts.appendChild(renderArtifact(filename, content))
  output.hidden = false
  output.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

function readForm() {
  return {
    goal: value('goal'),
    allowed: lines('allowed'),
    protected: lines('protected'),
    acceptance: lines('acceptance'),
    verification: lines('verification'),
    parked: lines('parked'),
  }
}

function value(id) {
  return document.querySelector(`#${id}`).value.trim()
}

function lines(id) {
  return value(id).split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function bullets(items, checkbox = false) {
  if (!items.length) return '- None declared.'
  return items.map((item) => `${checkbox ? '- [ ]' : '-'} ${item}`).join('\n')
}

function changeContract(data) {
  return `# Atlas Change Contract

## Goal

${data.goal}

## Allowed scope

${bullets(data.allowed.map((file) => `\`${file}\``))}

## Protected boundaries

${bullets(data.protected)}

## Acceptance criteria

${bullets(data.acceptance, true)}

## Verification

${bullets(data.verification, true)}

Never mark a command as passed unless a person or trusted system actually observed it.

## Confirmation boundaries

- Deleting data or files.
- Changing dependencies, migrations, public APIs, authentication, authorization, or payment behavior.
- Expanding beyond the allowed scope.

## Parked ideas

${bullets(data.parked)}
`
}

function aiInstruction(data) {
  return `# Atlas-controlled AI instruction

## Goal

${data.goal}

## Allowed files

${bullets(data.allowed.map((file) => `\`${file}\``))}

## Protected boundaries

${bullets(data.protected)}

Do not edit any path outside the allowed list. Park useful out-of-scope ideas instead of implementing them.

## Acceptance criteria

${bullets(data.acceptance)}

## Verification honesty

${bullets(data.verification)}

Report every check as Passed, Failed, or Not run. Never infer a result that was not observed.

## Required response format

1. Restate the goal and allowed files.
2. Explain the smallest proposed change.
3. Show the exact changed-file list.
4. Provide the patch.
5. Report verification honestly.
6. List parked ideas separately.
`
}

function evidenceRecord(data) {
  return `# Atlas Evidence Record

## Scope review

${bullets(data.allowed.map((file) => `Expected allowed path: \`${file}\``), true)}

## Acceptance review

${bullets(data.acceptance, true)}

## Verification results

${data.verification.map((check) => `- ${check}: **Not run**`).join('\n') || '- No checks declared.'}

## Known limitations

- This template contains no automatically observed command results.
- A human reviewer must replace “Not run” only after observing trustworthy evidence.
`
}

function decisionRecord(data) {
  return `# Atlas Decision Record

## Change

${data.goal}

## Decision

Choose exactly one:

- [ ] Accept
- [ ] Revise
- [ ] Reject

## Decided by

[Accountable human name or role]

## Evidence reviewed

- Scope conformance:
- Required checks:
- Known limitations:

## Rationale

[Why this decision follows from the declared goal, boundaries, and observed evidence.]

## Required next action

[What happens next. Unrun required checks normally require revision rather than acceptance.]

## Decision date

YYYY-MM-DD
`
}

function renderArtifact(filename, content) {
  const article = document.createElement('article')
  article.className = 'artifact'

  const header = document.createElement('header')
  const title = document.createElement('h3')
  title.textContent = filename

  const actions = document.createElement('div')
  actions.className = 'artifact-actions'
  const copy = button('Copy', 'secondary')
  const download = button('Download')

  const textarea = document.createElement('textarea')
  textarea.readOnly = true
  textarea.value = content

  copy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(content)
    copy.textContent = 'Copied'
    setTimeout(() => { copy.textContent = 'Copy' }, 1200)
  })

  download.addEventListener('click', () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  })

  actions.append(copy, download)
  header.append(title, actions)
  article.append(header, textarea)
  return article
}

function button(label, className = '') {
  const element = document.createElement('button')
  element.type = 'button'
  element.textContent = label
  element.className = className
  return element
}
