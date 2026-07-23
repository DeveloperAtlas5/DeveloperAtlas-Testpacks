'use strict'

const core = window.AtlasControlCore
const storageKey = 'developer-atlas-control-lite-session-v1'
const stepNames = ['prepare', 'instruct', 'inspect', 'evidence', 'decide', 'export']
const form = document.querySelector('#control-form')
const status = document.querySelector('#status')
const evidenceRows = document.querySelector('#evidence-rows')
const scopeSummary = document.querySelector('#scope-summary')
const decisionGuidance = document.querySelector('#decision-guidance')
const artifactsContainer = document.querySelector('#artifacts')
let activeStep = 'prepare'
let state = loadStoredState() || core.cloneScenario('revise')

form.addEventListener('submit', (event) => event.preventDefault())
document.querySelector('#load-scenario').addEventListener('click', loadSelectedScenario)
document.querySelector('#import-session').addEventListener('click', () => document.querySelector('#import-file').click())
document.querySelector('#import-file').addEventListener('change', importSession)
document.querySelector('#reset-session').addEventListener('click', resetSession)
document.querySelector('#copy-record').addEventListener('click', copyRecord)
document.querySelector('#download-record').addEventListener('click', () => downloadText('ATLAS_CHANGE_RECORD.md', core.combinedRecord(readState())))
document.querySelector('#download-session').addEventListener('click', () => downloadText('atlas-control-session.json', `${JSON.stringify(readState(), null, 2)}\n`, 'application/json'))

document.querySelectorAll('[data-step-target]').forEach((button) => button.addEventListener('click', () => showStep(button.dataset.stepTarget)))
document.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => showStep(button.dataset.next)))
document.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => showStep(button.dataset.back)))

for (const field of form.querySelectorAll('textarea:not([readonly]), input:not([type="radio"]), select')) {
  field.addEventListener('input', handleInput)
  field.addEventListener('change', handleInput)
}
for (const radio of document.querySelectorAll('input[name="decision"]')) radio.addEventListener('change', handleInput)

renderState(state)
showStep('prepare', false)

function handleInput() {
  state = readState()
  synchronizeEvidenceUi()
  refreshDerivedViews()
  storeState(state)
}

function readState() {
  const evidence = [...evidenceRows.querySelectorAll('.evidence-row')].map((row) => ({
    check: row.dataset.check,
    status: row.querySelector('select').value,
    note: row.querySelector('input').value.trim(),
  }))
  return core.normalizeState({
    scenario: document.querySelector('#scenario').value,
    goal: fieldValue('goal'),
    allowed: fieldValue('allowed'),
    protected: fieldValue('protected'),
    acceptance: fieldValue('acceptance'),
    verification: fieldValue('verification'),
    parked: fieldValue('parked'),
    changed: fieldValue('changed'),
    patch: fieldValue('patch'),
    evidence,
    decision: document.querySelector('input[name="decision"]:checked')?.value || '',
    reviewer: fieldValue('reviewer'),
    date: fieldValue('decision-date'),
    rationale: fieldValue('rationale'),
    nextAction: fieldValue('next-action'),
  })
}

function renderState(nextState) {
  state = core.normalizeState(nextState)
  document.querySelector('#scenario').value = ['accept', 'revise', 'reject', 'custom'].includes(state.scenario) ? state.scenario : 'custom'
  setField('goal', state.goal)
  setField('allowed', state.allowed.join('\n'))
  setField('protected', state.protected.join('\n'))
  setField('acceptance', state.acceptance.join('\n'))
  setField('verification', state.verification.join('\n'))
  setField('parked', state.parked.join('\n'))
  setField('changed', state.changed.join('\n'))
  setField('patch', state.patch)
  setField('reviewer', state.reviewer)
  setField('decision-date', state.date)
  setField('rationale', state.rationale)
  setField('next-action', state.nextAction)
  document.querySelectorAll('input[name="decision"]').forEach((radio) => { radio.checked = radio.value === state.decision })
  renderEvidenceRows(state.evidence)
  refreshDerivedViews()
  storeState(state)
}

function loadSelectedScenario() {
  const name = document.querySelector('#scenario').value
  renderState(core.cloneScenario(name))
  showStep('prepare')
  announce(`${capitalize(name)} example loaded.`)
}

function resetSession() {
  localStorage.removeItem(storageKey)
  document.querySelector('#scenario').value = 'custom'
  renderState(core.cloneScenario('custom'))
  showStep('prepare')
  announce('Control session reset.')
}

function showStep(name, moveFocus = true) {
  if (!stepNames.includes(name)) return
  state = readState()
  refreshDerivedViews()
  activeStep = name
  document.querySelectorAll('[data-step]').forEach((panel) => { panel.hidden = panel.dataset.step !== name })
  document.querySelectorAll('[data-step-target]').forEach((button) => {
    if (button.dataset.stepTarget === name) button.setAttribute('aria-current', 'step')
    else button.removeAttribute('aria-current')
  })
  if (moveFocus) {
    const heading = document.querySelector(`[data-step="${name}"] h2`)
    heading?.setAttribute('tabindex', '-1')
    heading?.focus()
  }
  storeState(state)
}

function synchronizeEvidenceUi() {
  const current = [...evidenceRows.querySelectorAll('.evidence-row')].map((row) => ({
    check: row.dataset.check,
    status: row.querySelector('select').value,
    note: row.querySelector('input').value,
  }))
  const synchronized = core.synchronizeEvidence(core.lines(fieldValue('verification')), current)
  const currentSignature = JSON.stringify(current.map(({ check, status, note }) => ({ check, status, note })))
  const nextSignature = JSON.stringify(synchronized)
  if (currentSignature !== nextSignature) renderEvidenceRows(synchronized)
}

function renderEvidenceRows(evidence) {
  evidenceRows.textContent = ''
  if (!evidence.length) {
    const empty = document.createElement('p')
    empty.className = 'callout'
    empty.textContent = 'No required checks are declared. Return to Prepare and add the evidence needed for a trustworthy decision.'
    evidenceRows.appendChild(empty)
    return
  }
  evidence.forEach((entry, index) => {
    const row = document.createElement('div')
    row.className = 'evidence-row'
    row.dataset.check = entry.check

    const check = document.createElement('p')
    check.className = 'evidence-check'
    check.textContent = entry.check

    const statusLabel = document.createElement('label')
    statusLabel.textContent = 'Result'
    const select = document.createElement('select')
    select.setAttribute('aria-label', `Result for ${entry.check}`)
    core.STATUS_VALUES.forEach((statusValue) => {
      const option = document.createElement('option')
      option.value = statusValue
      option.textContent = statusValue
      option.selected = entry.status === statusValue
      select.appendChild(option)
    })
    statusLabel.appendChild(select)

    const noteLabel = document.createElement('label')
    noteLabel.textContent = 'Observed evidence or limitation'
    const note = document.createElement('input')
    note.type = 'text'
    note.value = entry.note || ''
    note.id = `evidence-note-${index}`
    noteLabel.appendChild(note)

    select.addEventListener('change', handleInput)
    note.addEventListener('input', handleInput)
    row.append(check, statusLabel, noteLabel)
    evidenceRows.appendChild(row)
  })
}

function refreshDerivedViews() {
  const current = readStateWithoutRecursion()
  document.querySelector('#instruction-preview').value = core.instruction(current)
  renderScopeAssessment(current)
  renderDecisionAssessment(current)
  document.querySelector('#combined-record').value = core.combinedRecord(current)
  const relatedNode = core.relatedNodeForScenario(current.scenario)
  const compendiumLink = document.querySelector('#compendium-link')
  const nodeQuery = relatedNode.id ? `?node=${encodeURIComponent(relatedNode.id)}` : ''
  compendiumLink.href = `../compendium-preview/index.html${nodeQuery}`
  compendiumLink.textContent = relatedNode.id ? `Open ${relatedNode.title} in the Compendium` : 'Open the Compendium catalog'
  renderArtifacts(core.artifacts(current))
}

function readStateWithoutRecursion() {
  const evidence = [...evidenceRows.querySelectorAll('.evidence-row')].map((row) => ({
    check: row.dataset.check,
    status: row.querySelector('select').value,
    note: row.querySelector('input').value.trim(),
  }))
  return core.normalizeState({
    scenario: document.querySelector('#scenario').value,
    goal: fieldValue('goal'), allowed: fieldValue('allowed'), protected: fieldValue('protected'),
    acceptance: fieldValue('acceptance'), verification: fieldValue('verification'), parked: fieldValue('parked'),
    changed: fieldValue('changed'), patch: fieldValue('patch'), evidence,
    decision: document.querySelector('input[name="decision"]:checked')?.value || '',
    reviewer: fieldValue('reviewer'), date: fieldValue('decision-date'), rationale: fieldValue('rationale'), nextAction: fieldValue('next-action'),
  })
}

function renderScopeAssessment(current) {
  const assessment = core.assessScope(current)
  scopeSummary.textContent = ''
  const heading = document.createElement('h3')
  const body = document.createElement('p')
  if (!assessment.hasChangedFiles) {
    scopeSummary.dataset.tone = 'warning'
    heading.textContent = 'Scope not reviewed'
    body.textContent = 'Supply the exact changed-file list before deciding.'
  } else if (assessment.outOfScope.length) {
    scopeSummary.dataset.tone = 'danger'
    heading.textContent = `${assessment.outOfScope.length} out-of-scope path${assessment.outOfScope.length === 1 ? '' : 's'} recorded`
    body.textContent = 'A functional result does not erase a scope violation.'
  } else {
    scopeSummary.dataset.tone = 'success'
    heading.textContent = 'Supplied paths are inside the allowlist'
    body.textContent = `${assessment.inScope.length} changed path${assessment.inScope.length === 1 ? '' : 's'} checked. This is a path comparison, not a Git inspection.`
  }
  scopeSummary.append(heading, body)
  if (assessment.outOfScope.length) scopeSummary.appendChild(textList(assessment.outOfScope))
}

function renderDecisionAssessment(current) {
  const assessment = core.assessDecision(current)
  decisionGuidance.textContent = ''
  decisionGuidance.dataset.tone = assessment.aligned ? 'success' : current.decision ? 'warning' : 'warning'
  const heading = document.createElement('h3')
  heading.textContent = current.decision ? assessment.alignment : `Recorded evidence suggests: ${assessment.recommendation}`
  const body = document.createElement('p')
  body.textContent = `Out-of-scope paths: ${assessment.scope.outOfScope.length}. Failed checks: ${assessment.failed.length}. Not-run checks: ${assessment.notRun.length}.`
  decisionGuidance.append(heading, body)
}

function renderArtifacts(artifacts) {
  artifactsContainer.textContent = ''
  for (const artifact of artifacts) {
    const article = document.createElement('article')
    article.className = 'artifact'
    const header = document.createElement('header')
    const title = document.createElement('h3')
    title.textContent = artifact.filename
    const download = document.createElement('button')
    download.type = 'button'
    download.className = 'secondary'
    download.textContent = 'Download'
    download.addEventListener('click', () => downloadText(artifact.filename, artifact.content))
    const textarea = document.createElement('textarea')
    textarea.readOnly = true
    textarea.value = artifact.content
    header.append(title, download)
    article.append(header, textarea)
    artifactsContainer.appendChild(article)
  }
}

async function copyRecord() {
  const content = core.combinedRecord(readState())
  try {
    await navigator.clipboard.writeText(content)
    announce('Combined Atlas record copied.')
  } catch {
    const textarea = document.querySelector('#combined-record')
    textarea.focus()
    textarea.select()
    announce('Clipboard access was unavailable. The record is selected for manual copying.')
  }
}

function downloadText(filename, content, type = 'text/markdown;charset=utf-8') {
  const blob = new Blob([content], { type })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 0)
  announce(`${filename} downloaded.`)
}

async function importSession(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  try {
    const parsed = JSON.parse(await file.text())
    if (parsed.schemaVersion !== '1.0.0') throw new Error('Unsupported session schema.')
    renderState(parsed)
    showStep('prepare')
    announce('Control session imported.')
  } catch (error) {
    announce(`Session import failed: ${error.message}`)
  }
}

function loadStoredState() {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? core.normalizeState(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

function storeState(nextState) {
  try { localStorage.setItem(storageKey, JSON.stringify(core.normalizeState(nextState))) } catch { /* local storage can be unavailable */ }
}

function fieldValue(id) { return document.querySelector(`#${id}`).value.trim() }
function setField(id, value) { document.querySelector(`#${id}`).value = value || '' }
function announce(message) { status.textContent = message }
function capitalize(value) { return value ? value[0].toUpperCase() + value.slice(1) : value }
function textList(items) {
  const list = document.createElement('ul')
  for (const item of items) {
    const li = document.createElement('li')
    li.textContent = item
    list.appendChild(li)
  }
  return list
}
