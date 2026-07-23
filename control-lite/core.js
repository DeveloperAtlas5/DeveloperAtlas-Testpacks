(function attachAtlasControlCore(globalScope) {
  'use strict'

  const STATUS_VALUES = ['Not run', 'Passed', 'Failed']

  const scenarios = {
    revise: {
      scenario: 'revise',
      goal: 'Improve the status page so a reviewer knows it is ready for a human check.',
      allowed: ['app/Http/Controllers/StatusController.php', 'resources/views/status.blade.php'],
      protected: ['No route, authentication, dependency, database, or unrelated UI changes.'],
      acceptance: ['The heading is clear.', 'A short explanation is visible.', 'Only allowed files change.'],
      verification: ['Show the exact changed-file list.', 'Run php artisan test.', 'Inspect the result in the browser.'],
      parked: ['Color changes, polling, dashboards, and deployment integrations.'],
      changed: ['app/Http/Controllers/StatusController.php', 'resources/views/status.blade.php'],
      patch: 'Adds a short review-ready explanation while preserving the existing route and layout.',
      evidence: [
        { check: 'Show the exact changed-file list.', status: 'Passed', note: 'Two changed paths were supplied and both are allowed.' },
        { check: 'Run php artisan test.', status: 'Not run', note: 'The static public exercise has no Laravel runtime.' },
        { check: 'Inspect the result in the browser.', status: 'Passed', note: 'The supplied rendered example was reviewed.' },
      ],
      decision: 'Revise',
      reviewer: 'Public exercise reviewer',
      date: currentDate(),
      rationale: 'The patch is in scope, but a required runtime check was not observed.',
      nextAction: 'Run the maintained Laravel test command in a real project and update the evidence record.',
    },
    accept: {
      scenario: 'accept',
      goal: 'Show how many practice-list items remain incomplete without changing stored data behavior.',
      allowed: ['control/exercises/browser-list-count/project/index.html', 'control/exercises/browser-list-count/project/script.js'],
      protected: ['Preserve the localStorage key and data shape, add/complete/undo/remove/reload behavior, and literal rendering of user input.'],
      acceptance: ['A visible status reports incomplete items.', 'Singular and plural wording are correct.', 'Only allowed files change.'],
      verification: ['Confirm the exact changed-file list.', 'Run the maintained Node behavior tests.', 'Run browser lifecycle and HTML-like-input smoke checks.'],
      parked: ['Animations, categories, accounts, and cloud sync.'],
      changed: ['control/exercises/browser-list-count/project/index.html', 'control/exercises/browser-list-count/project/script.js'],
      patch: 'Adds an aria-live remaining-count element and updates it from the existing render function.',
      evidence: [
        { check: 'Confirm the exact changed-file list.', status: 'Passed', note: 'Both changed files are explicitly allowed.' },
        { check: 'Run the maintained Node behavior tests.', status: 'Passed', note: 'Remaining-count behavior and wording checks passed.' },
        { check: 'Run browser lifecycle and HTML-like-input smoke checks.', status: 'Passed', note: 'Add, complete, undo, reload, remove, and safety checks passed.' },
      ],
      decision: 'Accept',
      reviewer: 'Public exercise reviewer',
      date: currentDate(),
      rationale: 'The change is bounded and every required check was observed as passed.',
      nextAction: 'Preserve this record with the reviewed change.',
    },
    reject: {
      scenario: 'reject',
      goal: 'Clarify the status-page copy without changing architecture or dependencies.',
      allowed: ['resources/views/status.blade.php'],
      protected: ['Do not add dependencies, routes, controllers, persistence, or remote services.'],
      acceptance: ['The status explanation is clearer.', 'Only the allowed Blade view changes.'],
      verification: ['Confirm the exact changed-file list.', 'Review the rendered status page.'],
      parked: ['Live deployment checks and dashboards.'],
      changed: ['resources/views/status.blade.php', 'package.json'],
      patch: 'Updates the copy but also adds a new status-checking dependency.',
      evidence: [
        { check: 'Confirm the exact changed-file list.', status: 'Failed', note: 'package.json changed outside the declared scope.' },
        { check: 'Review the rendered status page.', status: 'Passed', note: 'The copy is understandable, but the proposal violates a protected boundary.' },
      ],
      decision: 'Reject',
      reviewer: 'Public exercise reviewer',
      date: currentDate(),
      rationale: 'The proposal adds a dependency that is outside scope and explicitly protected.',
      nextAction: 'Discard this proposal and request a view-only patch.',
    },
    custom: {
      scenario: 'custom',
      goal: '',
      allowed: [],
      protected: [],
      acceptance: [],
      verification: [],
      parked: [],
      changed: [],
      patch: '',
      evidence: [],
      decision: '',
      reviewer: '',
      date: currentDate(),
      rationale: '',
      nextAction: '',
    },
  }

  function currentDate() {
    return new Date().toISOString().slice(0, 10)
  }

  function cloneScenario(name) {
    return JSON.parse(JSON.stringify(scenarios[name] || scenarios.custom))
  }

  function lines(value) {
    if (Array.isArray(value)) return value.map(cleanLine).filter(Boolean)
    return String(value || '').split(/\r?\n/).map(cleanLine).filter(Boolean)
  }

  function cleanLine(value) {
    return String(value || '').trim()
  }

  function normalizePath(value) {
    return cleanLine(value).replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/+/, '/')
  }

  function synchronizeEvidence(verification, evidence) {
    const existing = new Map((evidence || []).map((entry) => [cleanLine(entry.check), entry]))
    return lines(verification).map((check) => {
      const previous = existing.get(check)
      const status = STATUS_VALUES.includes(previous?.status) ? previous.status : 'Not run'
      return { check, status, note: cleanLine(previous?.note) }
    })
  }

  function normalizeState(input) {
    const state = input || {}
    const verification = lines(state.verification)
    return {
      schemaVersion: '1.0.0',
      scenario: cleanLine(state.scenario) || 'custom',
      goal: cleanLine(state.goal),
      allowed: lines(state.allowed),
      protected: lines(state.protected),
      acceptance: lines(state.acceptance),
      verification,
      parked: lines(state.parked),
      changed: lines(state.changed),
      patch: cleanLine(state.patch),
      evidence: synchronizeEvidence(verification, state.evidence),
      decision: ['Accept', 'Revise', 'Reject'].includes(state.decision) ? state.decision : '',
      reviewer: cleanLine(state.reviewer),
      date: /^\d{4}-\d{2}-\d{2}$/.test(state.date || '') ? state.date : currentDate(),
      rationale: cleanLine(state.rationale),
      nextAction: cleanLine(state.nextAction),
    }
  }

  function assessScope(stateInput) {
    const state = normalizeState(stateInput)
    const allowed = new Set(state.allowed.map(normalizePath))
    const changed = state.changed.map((display) => ({ display, normalized: normalizePath(display) }))
    const inScope = changed.filter((entry) => allowed.has(entry.normalized)).map((entry) => entry.display)
    const outOfScope = changed.filter((entry) => !allowed.has(entry.normalized)).map((entry) => entry.display)
    const unchangedAllowed = state.allowed.filter((file) => !changed.some((entry) => entry.normalized === normalizePath(file)))
    return { inScope, outOfScope, unchangedAllowed, hasChangedFiles: changed.length > 0 }
  }

  function assessDecision(stateInput) {
    const state = normalizeState(stateInput)
    const scope = assessScope(state)
    const notPassed = state.evidence.filter((entry) => entry.status !== 'Passed')
    const failed = state.evidence.filter((entry) => entry.status === 'Failed')
    const notRun = state.evidence.filter((entry) => entry.status === 'Not run')
    const acceptReady = scope.hasChangedFiles && scope.outOfScope.length === 0 && state.evidence.length > 0 && notPassed.length === 0
    let recommendation = 'Revise'
    if (acceptReady) recommendation = 'Accept'
    if (scope.outOfScope.length > 0 || failed.length > 0) recommendation = 'Reject or revise'

    let alignment = 'No decision selected.'
    let aligned = false
    if (state.decision === 'Accept') {
      aligned = acceptReady
      alignment = aligned
        ? 'Accept aligns with the recorded scope and evidence.'
        : 'Accept does not align: required scope or evidence conditions remain incomplete.'
    } else if (state.decision === 'Revise') {
      aligned = !acceptReady
      alignment = aligned
        ? 'Revise aligns with unresolved scope or evidence.'
        : 'Revise is conservative even though the recorded checks support acceptance.'
    } else if (state.decision === 'Reject') {
      aligned = scope.outOfScope.length > 0 || failed.length > 0
      alignment = aligned
        ? 'Reject aligns with a recorded scope violation or failed check.'
        : 'Reject is a human choice, but the current record contains no explicit violation or failed check.'
    }

    return { scope, notPassed, failed, notRun, acceptReady, recommendation, alignment, aligned }
  }

  function bullets(items, checkbox) {
    const values = lines(items)
    if (!values.length) return '- None declared.'
    return values.map((item) => `${checkbox ? '- [ ]' : '-'} ${item}`).join('\n')
  }

  function pathBullets(items) {
    const values = lines(items)
    if (!values.length) return '- None declared.'
    return values.map((item) => `- \`${item}\``).join('\n')
  }

  function instruction(stateInput) {
    const state = normalizeState(stateInput)
    return `# Atlas-controlled AI instruction\n\n## Human goal\n\n${state.goal || '[State the user-visible outcome.]'}\n\n## Allowed files\n\n${pathBullets(state.allowed)}\n\n## Protected boundaries\n\n${bullets(state.protected)}\n\nDo not edit any path outside the allowed list. Park useful out-of-scope ideas instead of implementing them.\n\n## Acceptance criteria\n\n${bullets(state.acceptance)}\n\n## Verification honesty\n\n${bullets(state.verification)}\n\nReport every check as Passed, Failed, or Not run. Never infer a result that was not observed.\n\n## Required response\n\n1. Restate the goal and allowed files.\n2. Explain the smallest proposed change.\n3. Show the exact changed-file list.\n4. Provide the patch.\n5. Report verification honestly.\n6. List parked ideas separately.\n`
  }

  function changeContract(stateInput) {
    const state = normalizeState(stateInput)
    return `# Atlas Change Contract\n\n## Human goal\n\n${state.goal || '[State the user-visible outcome.]'}\n\n## Allowed scope\n\n${pathBullets(state.allowed)}\n\n## Protected boundaries\n\n${bullets(state.protected)}\n\n## Acceptance criteria\n\n${bullets(state.acceptance, true)}\n\n## Required verification\n\n${bullets(state.verification, true)}\n\nA written command is not proof that it ran. Keep unobserved checks as **Not run**.\n\n## Confirmation boundaries\n\n- Deleting data or files.\n- Changing dependencies, migrations, public APIs, authentication, authorization, or payment behavior.\n- Expanding beyond the allowed scope.\n\n## Parked ideas\n\n${bullets(state.parked)}\n`
  }

  function evidenceRecord(stateInput) {
    const state = normalizeState(stateInput)
    const assessment = assessDecision(state)
    const changed = state.changed.length ? pathBullets(state.changed) : '- No changed-file list supplied.'
    const scopeResult = assessment.scope.outOfScope.length
      ? `**Scope violation recorded.**\n\n${pathBullets(assessment.scope.outOfScope)}`
      : assessment.scope.hasChangedFiles
        ? '**All supplied changed files are inside the declared allowlist.**'
        : '**Not reviewed:** no changed-file list was supplied.'
    const results = state.evidence.length
      ? state.evidence.map((entry) => `- ${entry.check}: **${entry.status}**${entry.note ? ` — ${entry.note}` : ''}`).join('\n')
      : '- No required checks declared.'
    return `# Atlas Evidence Record\n\n## Actually changed files\n\n${changed}\n\n## Scope review\n\n${scopeResult}\n\n## Patch or change summary\n\n${state.patch || 'Not supplied.'}\n\n## Verification results\n\n${results}\n\n## Known limitations\n\n- Control Lite compares supplied paths; it does not inspect repository history.\n- Control Lite does not execute commands or validate claims automatically.\n- A human reviewer remains responsible for the evidence and final decision.\n`
  }

  function decisionRecord(stateInput) {
    const state = normalizeState(stateInput)
    const assessment = assessDecision(state)
    return `# Atlas Decision Record\n\n## Change\n\n${state.goal || '[No goal recorded.]'}\n\n## Decision\n\n**${state.decision || 'Not selected'}**\n\n## Accountable human\n\n${state.reviewer || 'Not recorded.'}\n\n## Decision date\n\n${state.date || 'Not recorded.'}\n\n## Decision alignment advisory\n\n${assessment.alignment}\n\nThis advisory does not replace the accountable human decision.\n\n## Rationale\n\n${state.rationale || 'Not recorded.'}\n\n## Required next action\n\n${state.nextAction || 'Not recorded.'}\n`
  }

  function relatedNodeForScenario(scenario) {
    if (scenario === 'accept') return { id: 'CANON-LOCALSTORAGE-001', title: 'localStorage' }
    if (scenario === 'revise' || scenario === 'reject') return { id: 'CANON-LARAVEL-REQUEST-LIFECYCLE-001', title: 'Laravel Request Lifecycle' }
    return { id: '', title: 'Compendium catalog' }
  }

  function combinedRecord(stateInput) {
    const state = normalizeState(stateInput)
    const assessment = assessDecision(state)
    const relatedNode = relatedNodeForScenario(state.scenario)
    return `# Atlas Controlled Change Record\n\n> Local public-preview record. Control Lite did not run an AI, inspect Git history, or execute verification commands.\n\n## Human goal\n\n${state.goal || '[No goal recorded.]'}\n\n## Change Contract\n\n### Allowed files\n\n${pathBullets(state.allowed)}\n\n### Protected boundaries\n\n${bullets(state.protected)}\n\n### Acceptance criteria\n\n${bullets(state.acceptance)}\n\n### Parked ideas\n\n${bullets(state.parked)}\n\n## Controlled instruction\n\n${instruction(state)}\n## Change inspection\n\n### Actually changed files\n\n${state.changed.length ? pathBullets(state.changed) : '- Not supplied.'}\n\n### Out-of-scope paths\n\n${assessment.scope.outOfScope.length ? pathBullets(assessment.scope.outOfScope) : '- None found in the supplied changed-file list.'}\n\n### Patch or change summary\n\n${state.patch || 'Not supplied.'}\n\n## Evidence\n\n${state.evidence.length ? state.evidence.map((entry) => `- **${entry.status}** — ${entry.check}${entry.note ? ` — ${entry.note}` : ''}`).join('\n') : '- No required checks declared.'}\n\n## Human decision\n\n- **Decision:** ${state.decision || 'Not selected'}\n- **Accountable human:** ${state.reviewer || 'Not recorded'}\n- **Date:** ${state.date || 'Not recorded'}\n- **Alignment advisory:** ${assessment.alignment}\n\n### Rationale\n\n${state.rationale || 'Not recorded.'}\n\n### Required next action\n\n${state.nextAction || 'Not recorded.'}\n\n## Related public learning\n\n- ${relatedNode.title}: \`compendium-preview/index.html${relatedNode.id ? `?node=${relatedNode.id}` : ''}\`\n`
  }

  function artifacts(stateInput) {
    const state = normalizeState(stateInput)
    return [
      { filename: 'CHANGE_CONTRACT.md', content: changeContract(state) },
      { filename: 'AI_INSTRUCTION.md', content: instruction(state) },
      { filename: 'EVIDENCE_RECORD.md', content: evidenceRecord(state) },
      { filename: 'DECISION_RECORD.md', content: decisionRecord(state) },
    ]
  }

  const api = {
    STATUS_VALUES,
    assessDecision,
    assessScope,
    artifacts,
    changeContract,
    cloneScenario,
    combinedRecord,
    currentDate,
    decisionRecord,
    evidenceRecord,
    instruction,
    lines,
    normalizePath,
    normalizeState,
    relatedNodeForScenario,
    synchronizeEvidence,
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = api
  globalScope.AtlasControlCore = api
})(typeof window !== 'undefined' ? window : globalThis)
