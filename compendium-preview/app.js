'use strict'

const data = window.ATLAS_COMPENDIUM_DATA
const catalogView = document.querySelector('#catalog-view')
const nodeView = document.querySelector('#node-view')
const nodeGrid = document.querySelector('#node-grid')
const search = document.querySelector('#search')
const resultCount = document.querySelector('#result-count')

if (!data || !Array.isArray(data.nodes)) {
  resultCount.textContent = 'The public Compendium data bundle is unavailable.'
} else {
  search.addEventListener('input', renderCatalog)
  const requestedNode = new URLSearchParams(window.location.search).get('node')
  const selected = data.nodes.find((node) => node.id === requestedNode)
  if (selected) renderNode(selected)
  else renderCatalog()
}

function renderCatalog() {
  catalogView.hidden = false
  nodeView.hidden = true
  const query = search.value.trim().toLowerCase()
  const matches = data.nodes.filter((node) => searchable(node).includes(query))
  nodeGrid.textContent = ''
  for (const node of matches) nodeGrid.appendChild(nodeCard(node))
  resultCount.textContent = `${matches.length} of ${data.nodes.length} public nodes shown.`
}

function nodeCard(node) {
  const article = document.createElement('article')
  article.className = 'node-card'
  const tags = document.createElement('p')
  tags.className = 'tags'
  tags.textContent = node.tags.join(' · ')
  const title = document.createElement('h2')
  title.textContent = node.title
  const summary = document.createElement('p')
  summary.textContent = node.summary
  const facts = document.createElement('dl')
  addFact(facts, 'Version', node.versionScope.join('; ') || 'Not recorded')
  addFact(facts, 'Sources', String(node.sourceCount))
  addFact(facts, 'Human review', node.independentReview)
  const link = document.createElement('a')
  link.href = `?node=${encodeURIComponent(node.id)}`
  link.textContent = 'Read this node →'
  article.append(tags, title, summary, facts, link)
  return article
}

function renderNode(node) {
  catalogView.hidden = true
  nodeView.hidden = false
  const meta = document.querySelector('#node-meta')
  const content = document.querySelector('#node-content')
  const summary = document.querySelector('#evidence-summary')
  const sourceList = document.querySelector('#source-list')
  meta.textContent = ''
  content.textContent = ''
  summary.textContent = ''
  sourceList.textContent = ''

  const eyebrow = document.createElement('p')
  eyebrow.className = 'eyebrow'
  eyebrow.textContent = node.id
  const title = document.createElement('h1')
  title.textContent = node.title
  const intro = document.createElement('p')
  intro.className = 'lead'
  intro.textContent = node.summary
  const grid = document.createElement('div')
  grid.className = 'meta-grid'
  addMeta(grid, 'Version scope', node.versionScope.join('; ') || 'Not recorded')
  addMeta(grid, 'Primary sources', String(node.sourceCount))
  addMeta(grid, 'Verification designs', String(node.verificationCount))
  addMeta(grid, 'Independent review', node.independentReview)
  meta.append(eyebrow, title, intro, grid)

  // node.html is generated at build time from allowlisted public Markdown after HTML escaping.
  content.innerHTML = node.html

  const status = document.createElement('p')
  status.className = node.independentReview === 'complete' ? 'status-complete' : 'status-pending'
  status.textContent = `Independent human review: ${node.independentReview}.`
  const reviewed = document.createElement('p')
  reviewed.textContent = `Primary-source mapping reviewed: ${node.reviewedAt || 'date not recorded'}.`
  const links = document.createElement('p')
  const sourceLink = externalLink(node.sourceUrl, 'Open source Markdown')
  const evidenceLink = externalLink(node.evidenceUrl, 'Open evidence sidecar')
  links.append(sourceLink, document.createTextNode(' · '), evidenceLink)
  summary.append(status, reviewed, links)

  for (const source of node.sources) {
    const item = document.createElement('li')
    const link = externalLink(source.url, source.title)
    item.append(link, document.createTextNode(` — ${source.publisher}; checked ${source.checkedAt || 'date not recorded'}`))
    sourceList.appendChild(item)
  }
  document.title = `${node.title} — Atlas Compendium Preview`
}

function addFact(list, term, definition) {
  const dt = document.createElement('dt')
  dt.textContent = term
  const dd = document.createElement('dd')
  dd.textContent = definition
  list.append(dt, dd)
}

function addMeta(grid, label, value) {
  const item = document.createElement('div')
  item.className = 'meta-item'
  const heading = document.createElement('span')
  heading.textContent = label
  const body = document.createElement('strong')
  body.textContent = value
  item.append(heading, body)
  grid.appendChild(item)
}

function externalLink(url, label) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.textContent = label
  return link
}

function searchable(node) {
  return [node.id, node.title, node.summary, ...node.tags, ...node.versionScope].join(' ').toLowerCase()
}
