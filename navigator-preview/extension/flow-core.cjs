'use strict'

const routePattern = /Route::(get|post|put|patch|delete|options|any)\s*\(\s*['"]([^'"]+)['"]\s*,\s*\[\s*([A-Za-z0-9_\\]+)::class\s*,\s*['"]([A-Za-z0-9_]+)['"]\s*\]\s*\)(?:\s*->name\(\s*['"]([^'"]+)['"]\s*\))?/gms

function parseRoutes(content) {
  const routes = []
  for (const match of String(content || '').matchAll(routePattern)) {
    routes.push({
      method: match[1].toUpperCase(),
      uri: match[2],
      controllerClass: match[3],
      controllerMethod: match[4],
      name: match[5] || '',
    })
  }
  return routes
}

function controllerRelativePath(controllerClass) {
  const className = String(controllerClass || '').split('\\').filter(Boolean).pop() || ''
  return className ? `app/Http/Controllers/${className}.php` : ''
}

function methodBody(content, methodName) {
  const source = String(content || '')
  const escaped = String(methodName || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const startPattern = new RegExp(`(?:public|protected|private)\\s+function\\s+${escaped}\\s*\\([^)]*\\)`, 'm')
  const startMatch = startPattern.exec(source)
  if (!startMatch) return ''
  const start = startMatch.index
  const remainder = source.slice(start + startMatch[0].length)
  const nextMethod = /\n\s*(?:public|protected|private)\s+function\s+[A-Za-z0-9_]+\s*\(/m.exec(remainder)
  return nextMethod ? source.slice(start, start + startMatch[0].length + nextMethod.index) : source.slice(start)
}

function extractViewName(content, methodName) {
  const body = methodBody(content, methodName)
  const match = /(?:return\s+)?view\s*\(\s*['"]([^'"]+)['"]/m.exec(body)
  return match?.[1] || ''
}

function viewRelativePath(viewName) {
  const normalized = String(viewName || '').trim().replaceAll('.', '/')
  return normalized ? `resources/views/${normalized}.blade.php` : ''
}

function enrichRoutes(routeContent, readController) {
  return parseRoutes(routeContent).map((route) => {
    const controllerPath = controllerRelativePath(route.controllerClass)
    const controllerContent = controllerPath ? readController(controllerPath) : ''
    const viewName = extractViewName(controllerContent, route.controllerMethod)
    return {
      ...route,
      controllerPath,
      viewName,
      viewPath: viewRelativePath(viewName),
    }
  })
}

module.exports = {
  controllerRelativePath,
  enrichRoutes,
  extractViewName,
  methodBody,
  parseRoutes,
  viewRelativePath,
}
