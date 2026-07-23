const assert = require('node:assert/strict')
const test = require('node:test')
const core = require('../control-lite/core.js')

test('accept example is aligned only when all supplied evidence passed', () => {
  const state = core.cloneScenario('accept')
  const assessment = core.assessDecision(state)
  assert.equal(assessment.acceptReady, true)
  assert.equal(assessment.aligned, true)
  assert.match(core.combinedRecord(state), /CANON-LOCALSTORAGE-001/)
  state.evidence[1].status = 'Not run'
  const incomplete = core.assessDecision(state)
  assert.equal(incomplete.acceptReady, false)
  assert.equal(incomplete.aligned, false)
})

test('reject example records the out-of-scope dependency', () => {
  const state = core.cloneScenario('reject')
  const scope = core.assessScope(state)
  assert.deepEqual(scope.outOfScope, ['package.json'])
  assert.match(core.combinedRecord(state), /package\.json/)
  assert.match(core.combinedRecord(state), /Reject/)
})

test('verification changes preserve matching evidence and add Not run rows', () => {
  const evidence = core.synchronizeEvidence(
    ['Run tests', 'Inspect UI'],
    [{ check: 'Run tests', status: 'Passed', note: 'Observed locally.' }],
  )
  assert.deepEqual(evidence, [
    { check: 'Run tests', status: 'Passed', note: 'Observed locally.' },
    { check: 'Inspect UI', status: 'Not run', note: '' },
  ])
})

test('generated Markdown preserves HTML-like input as plain text', () => {
  const state = core.cloneScenario('custom')
  state.goal = '<img src=x onerror="alert(1)">'
  const record = core.combinedRecord(state)
  assert.match(record, /<img src=x onerror="alert\(1\)">/)
})

test('custom work links to the Compendium catalog without inventing a missing node', () => {
  const state = core.cloneScenario('custom')
  const related = core.relatedNodeForScenario(state.scenario)
  assert.equal(related.id, '')
  assert.match(core.combinedRecord(state), /compendium-preview\/index\.html`/)
  assert.doesNotMatch(core.combinedRecord(state), /\?node=/)
})
