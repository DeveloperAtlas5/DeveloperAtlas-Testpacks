#!/usr/bin/env node

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = Number.parseInt(process.env.ATLAS_PUBLIC_PORT ?? '4173', 10)
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
])

const server = http.createServer((request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? '127.0.0.1'}`)
    const relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '')
    let candidate = path.resolve(root, relativePath || 'README.md')
    if (!isInside(root, candidate)) return send(response, 403, 'Forbidden')
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) candidate = path.join(candidate, 'index.html')
    if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) return send(response, 404, 'Not found')

    response.writeHead(200, {
      'Content-Type': mimeTypes.get(path.extname(candidate)) ?? 'application/octet-stream',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'",
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    })
    fs.createReadStream(candidate).pipe(response)
  } catch {
    send(response, 400, 'Bad request')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`[atlas] Public preview server listening on http://127.0.0.1:${port}`)
})

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end(body)
}
