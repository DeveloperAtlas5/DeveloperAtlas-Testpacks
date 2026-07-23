const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')
const pages = path.join(root, 'dist', 'pages')

test('Pages build contains both interactive public surfaces', () => {
  for (const relative of [
    'index.html',
    '.nojekyll',
    'control-lite/index.html',
    'control-lite/core.js',
    'compendium-preview/index.html',
    'compendium-preview/data.js',
  ]) {
    assert.equal(fs.existsSync(path.join(pages, relative)), true, `${relative} should exist`)
  }
})

test('cross-surface links remain valid in the Pages bundle', () => {
  const control = fs.readFileSync(path.join(pages, 'control-lite', 'index.html'), 'utf8')
  const compendium = fs.readFileSync(path.join(pages, 'compendium-preview', 'index.html'), 'utf8')
  assert.match(control, /\.\.\/compendium-preview\/index\.html/)
  assert.match(compendium, /\.\.\/control-lite\/index\.html/)
  assert.doesNotMatch(control, /\.\.\/docs\/getting-started\/TRY_ATLAS\.md/)
})
