const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const core = require('../navigator-preview/extension/flow-core.cjs')

const routeSource = `<?php
use App\\Http\\Controllers\\StatusController;
Route::get('/status', [StatusController::class, 'show'])->name('status.show');
`
const controllerSource = `<?php
class StatusController {
    public function show() {
        return view('status.show');
    }
}
`

test('parses a conventional Laravel route and resolves its Blade view', () => {
  const flows = core.enrichRoutes(routeSource, (relative) => {
    assert.equal(relative, 'app/Http/Controllers/StatusController.php')
    return controllerSource
  })
  assert.deepEqual(flows, [{
    method: 'GET',
    uri: '/status',
    controllerClass: 'StatusController',
    controllerMethod: 'show',
    name: 'status.show',
    controllerPath: 'app/Http/Controllers/StatusController.php',
    viewName: 'status.show',
    viewPath: 'resources/views/status/show.blade.php',
  }])
})

test('the public Navigator allowlist references only existing public node files', () => {
  const root = path.resolve(__dirname, '..')
  const allowlist = JSON.parse(fs.readFileSync(path.join(root, 'config/navigator-preview-allowlist.json'), 'utf8'))
  assert.equal(allowlist.nodes.length, 4)
  for (const node of allowlist.nodes) {
    assert.match(node.source, /^content\/nodes\/(gold|supporting)\//)
    assert.match(node.evidence, /^content\/nodes\/evidence\//)
    assert.equal(fs.existsSync(path.join(root, node.source)), true)
    assert.equal(fs.existsSync(path.join(root, node.evidence)), true)
  }
})
