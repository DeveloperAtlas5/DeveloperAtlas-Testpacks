const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')
const exercise = path.join(root, 'control/exercises/browser-list-count')

function lines(file) {
  return fs.readFileSync(path.join(exercise, file), 'utf8').trim().split(/\r?\n/).filter(Boolean)
}

test('in-scope proposal declares exactly the two allowed project files', () => {
  assert.deepEqual(lines('records/IN_SCOPE_CHANGED_FILES.txt'), [
    'control/exercises/browser-list-count/project/index.html',
    'control/exercises/browser-list-count/project/script.js',
  ])
})

test('out-of-scope proposal visibly includes the forbidden dependency file', () => {
  const changed = lines('records/OUT_OF_SCOPE_CHANGED_FILES.txt')
  assert.equal(changed.includes('package.json'), true)
  const patch = fs.readFileSync(path.join(exercise, 'proposed/OUT_OF_SCOPE_PATCH.diff'), 'utf8')
  assert.match(patch, /pluralize/)
  assert.match(patch, /diff --git a\/package\.json/)
})

test('baseline fixture preserves literal text rendering', () => {
  const script = fs.readFileSync(path.join(exercise, 'project/script.js'), 'utf8')
  assert.match(script, /itemName\.textContent = String\(item\.name\)/)
  assert.doesNotMatch(script, /innerHTML\s*=/)
})
