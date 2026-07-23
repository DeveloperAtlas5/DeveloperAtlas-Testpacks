import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import { escapeHtml, extractSummary, renderMarkdown } from '../scripts/compendium-render.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('renderer escapes raw HTML while preserving generated code blocks', () => {
  const rendered = renderMarkdown('# Test\n\n<img src=x onerror="alert(1)">\n\n```js\nconst x = "<tag>"\n```', 'content/nodes/gold/TEST.md')
  assert.match(rendered, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/)
  assert.doesNotMatch(rendered, /<img src=x/)
  assert.match(rendered, /<pre><code class="language-js">const x = &quot;&lt;tag&gt;&quot;/)
  assert.equal(escapeHtml('<script>'), '&lt;script&gt;')
})

test('summary extraction prefers learner-first sections', () => {
  const summary = extractSummary('# Node\n\n## Quick answer\n\nA bounded answer.\n\n## Details\n\nMore.')
  assert.equal(summary, 'A bounded answer.')
})

test('generated bundle contains only the six allowlisted public nodes', () => {
  const allowlist = JSON.parse(fs.readFileSync(path.join(root, 'config/compendium-preview-allowlist.json'), 'utf8'))
  const context = { window: {} }
  vm.runInNewContext(fs.readFileSync(path.join(root, 'compendium-preview/data.js'), 'utf8'), context)
  const data = context.window.ATLAS_COMPENDIUM_DATA
  assert.equal(data.nodes.length, 6)
  assert.deepEqual([...data.nodes.map((node) => node.id)].sort(), [...allowlist.nodes.map((node) => node.id)].sort())
  assert.equal(data.nodes.some((node) => /private|internal/i.test(node.sourcePath)), false)
})
