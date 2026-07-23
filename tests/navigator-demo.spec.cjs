const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const core = require('../navigator-preview/extension/flow-core.cjs')

const root = path.resolve(__dirname, '..')

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}

function enrich(workspace) {
  const prefix = `navigator-preview/demo-workspace/${workspace}`
  return core.enrichRoutes(read(`${prefix}/routes/web.php`), (relative) => {
    const target = path.join(root, prefix, relative)
    return fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : ''
  })
}

test('clean demo exposes three conventional controller flows', () => {
  const flows = enrich('clean-laravel')
  assert.deepEqual(flows.map((flow) => [flow.uri, flow.controllerMethod, flow.viewName]), [
    ['/', 'index', 'welcome'],
    ['/users', 'index', 'users.index'],
    ['/users/{id}', 'show', 'users.show'],
  ])
})

test('boundary lab preserves an unresolved controller without inventing a view', () => {
  const flows = enrich('boundary-lab')
  assert.equal(flows.length, 2)
  assert.equal(flows[0].viewName, 'status')
  assert.equal(flows[1].controllerClass, 'MissingReportController')
  assert.equal(flows[1].viewName, '')
})
