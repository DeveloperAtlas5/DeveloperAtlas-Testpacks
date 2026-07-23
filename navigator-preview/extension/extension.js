'use strict'

const path = require('node:path')
const vscode = require('vscode')
const core = require('./flow-core.cjs')

class FlowProvider {
  constructor(context) {
    this.context = context
    this.flows = []
    this.emitter = new vscode.EventEmitter()
    this.onDidChangeTreeData = this.emitter.event
  }

  async refresh() {
    this.flows = await discoverFlows()
    this.emitter.fire()
    return this.flows
  }

  getTreeItem(element) {
    if (element.type === 'route') {
      const item = new vscode.TreeItem(`${element.flow.method} ${element.flow.uri}`, vscode.TreeItemCollapsibleState.Expanded)
      item.description = element.flow.name || undefined
      item.contextValue = 'atlasPreviewRoute'
      item.command = { command: 'atlasPreview.showCurrentFlow', title: 'Show flow', arguments: [element.flow] }
      return item
    }

    const item = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.None)
    item.description = element.description
    item.tooltip = element.path || element.label
    if (element.uri) item.command = { command: 'vscode.open', title: 'Open file', arguments: [element.uri] }
    return item
  }

  getChildren(element) {
    if (!element) return this.flows.map((flow) => ({ type: 'route', flow }))
    if (element.type !== 'route') return []
    const flow = element.flow
    return [
      fileChild('Controller', `${flow.controllerClass}::${flow.controllerMethod}`, flow.controllerUri, flow.controllerPath),
      fileChild('Blade view', flow.viewName || 'No returned view found', flow.viewUri, flow.viewPath),
    ]
  }
}

function fileChild(label, description, uri, relativePath) {
  return { type: 'file', label, description, uri, path: relativePath }
}

async function discoverFlows() {
  const routeFiles = await vscode.workspace.findFiles('**/routes/web.php', '**/{vendor,node_modules}/**', 20)
  const flows = []
  for (const routeUri of routeFiles) {
    const routeContent = await readText(routeUri)
    const folder = vscode.workspace.getWorkspaceFolder(routeUri)
    if (!folder) continue
    const enriched = core.enrichRoutes(routeContent, (relativePath) => readWorkspaceTextSync(folder.uri, relativePath))
    for (const flow of enriched) {
      const controllerUri = flow.controllerPath ? vscode.Uri.joinPath(folder.uri, ...flow.controllerPath.split('/')) : undefined
      const viewUri = flow.viewPath ? vscode.Uri.joinPath(folder.uri, ...flow.viewPath.split('/')) : undefined
      flows.push({ ...flow, routeUri, controllerUri, viewUri })
    }
  }
  return flows
}

function readWorkspaceTextSync(rootUri, relativePath) {
  try {
    const fsPath = vscode.Uri.joinPath(rootUri, ...relativePath.split('/')).fsPath
    return require('node:fs').readFileSync(fsPath, 'utf8')
  } catch {
    return ''
  }
}

async function readText(uri) {
  const bytes = await vscode.workspace.fs.readFile(uri)
  return Buffer.from(bytes).toString('utf8')
}

function flowHtml(flow) {
  const nodes = [
    ['Route', `${flow.method} ${flow.uri}`, 'routes/web.php'],
    ['Controller', `${flow.controllerClass}::${flow.controllerMethod}`, flow.controllerPath || 'Not resolved'],
    ['Blade view', flow.viewName || 'No returned view found', flow.viewPath || 'Not resolved'],
  ]
  const cards = nodes.map(([kind, label, file], index) => `
    <article class="node">
      <p>${escapeHtml(kind)}</p>
      <h2>${escapeHtml(label)}</h2>
      <code>${escapeHtml(file)}</code>
    </article>${index < nodes.length - 1 ? '<div class="arrow" aria-hidden="true">→</div>' : ''}`).join('')
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    body{font-family:var(--vscode-font-family);color:var(--vscode-foreground);padding:24px;background:var(--vscode-editor-background)}
    .notice{border-left:4px solid var(--vscode-focusBorder);padding:10px 14px;background:var(--vscode-editor-inactiveSelectionBackground);margin-bottom:22px}
    .flow{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.node{min-width:210px;flex:1;border:1px solid var(--vscode-panel-border);border-radius:10px;padding:16px;background:var(--vscode-sideBar-background)}
    .node p{margin:0;color:var(--vscode-descriptionForeground);font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.08em}.node h2{font-size:17px}.node code{word-break:break-all}.arrow{font-size:26px;color:var(--vscode-descriptionForeground)}
  </style></head><body><h1>Atlas Navigator public preview</h1><div class="notice">Static analysis only. This preview does not run project commands or claim that the flow is complete.</div><div class="flow">${cards}</div></body></html>`
}

function escapeHtml(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

async function showFlow(context, suppliedFlow) {
  let flow = suppliedFlow
  if (!flow) {
    const flows = await discoverFlows()
    if (!flows.length) return vscode.window.showInformationMessage('Atlas Preview found no supported Route::method(... [Controller::class, method]) entries in routes/web.php.')
    const selected = await vscode.window.showQuickPick(flows.map((entry) => ({ label: `${entry.method} ${entry.uri}`, description: `${entry.controllerClass}::${entry.controllerMethod}`, flow: entry })), { placeHolder: 'Choose a Laravel request flow' })
    flow = selected?.flow
  }
  if (!flow) return
  const panel = vscode.window.createWebviewPanel('atlasPreviewFlow', `Atlas: ${flow.method} ${flow.uri}`, vscode.ViewColumn.Beside, { enableScripts: false })
  panel.webview.html = flowHtml(flow)
}

async function openLearningNode(context) {
  const indexUri = vscode.Uri.joinPath(context.extensionUri, 'knowledge', 'index.json')
  let index
  try { index = JSON.parse(await readText(indexUri)) } catch { return vscode.window.showErrorMessage('The public learning-node bundle is unavailable.') }
  const selected = await vscode.window.showQuickPick(index.nodes.map((node) => ({ label: node.title, description: node.id, node })), { placeHolder: 'Open an allowlisted public learning node' })
  if (!selected) return
  const uri = vscode.Uri.joinPath(context.extensionUri, 'knowledge', selected.node.file)
  await vscode.window.showTextDocument(await vscode.workspace.openTextDocument(uri), { preview: true })
}

async function activate(context) {
  const provider = new FlowProvider(context)
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('atlasPreview.flow', provider),
    vscode.commands.registerCommand('atlasPreview.refresh', () => provider.refresh()),
    vscode.commands.registerCommand('atlasPreview.showCurrentFlow', (flow) => showFlow(context, flow)),
    vscode.commands.registerCommand('atlasPreview.openLearningNode', () => openLearningNode(context)),
  )
  await provider.refresh()
}

function deactivate() {}

module.exports = { activate, deactivate }
