import path from 'node:path'

const repositoryBase = 'https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/'

export function renderMarkdown(markdown, sourcePath) {
  const content = stripFrontmatter(String(markdown || ''))
  const lines = content.split(/\r?\n/)
  const output = []
  let paragraph = []
  let listType = null
  let listItems = []
  let quote = []
  let code = null
  let codeLanguage = ''

  const flushParagraph = () => {
    if (!paragraph.length) return
    output.push(`<p>${inline(paragraph.join(' '), sourcePath)}</p>`)
    paragraph = []
  }
  const flushList = () => {
    if (!listItems.length) return
    const tag = listType === 'ol' ? 'ol' : 'ul'
    output.push(`<${tag}>${listItems.map((item) => `<li>${inline(item, sourcePath)}</li>`).join('')}</${tag}>`)
    listItems = []
    listType = null
  }
  const flushQuote = () => {
    if (!quote.length) return
    output.push(`<aside class="evidence-banner">${quote.map((line) => `<p>${inline(line, sourcePath)}</p>`).join('')}</aside>`)
    quote = []
  }
  const flushAll = () => {
    flushParagraph()
    flushList()
    flushQuote()
  }

  for (const line of lines) {
    const fence = line.match(/^```\s*([A-Za-z0-9_-]*)\s*$/)
    if (fence) {
      if (code !== null) {
        output.push(`<pre><code${codeLanguage ? ` class="language-${escapeAttribute(codeLanguage)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`)
        code = null
        codeLanguage = ''
      } else {
        flushAll()
        code = []
        codeLanguage = fence[1] || ''
      }
      continue
    }
    if (code !== null) {
      code.push(line)
      continue
    }

    if (!line.trim()) {
      flushAll()
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      flushAll()
      const level = heading[1].length
      const text = heading[2].trim()
      output.push(`<h${level} id="${escapeAttribute(slug(text))}">${inline(text, sourcePath)}</h${level}>`)
      continue
    }

    const blockquote = line.match(/^>\s?(.*)$/)
    if (blockquote) {
      flushParagraph()
      flushList()
      quote.push(blockquote[1])
      continue
    }
    flushQuote()

    const unordered = line.match(/^\s*-\s+(.+)$/)
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/)
    if (unordered || ordered) {
      flushParagraph()
      const nextType = ordered ? 'ol' : 'ul'
      if (listType && listType !== nextType) flushList()
      listType = nextType
      listItems.push((unordered || ordered)[1])
      continue
    }
    flushList()
    paragraph.push(line.trim())
  }
  flushAll()
  if (code !== null) output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`)
  return output.join('\n')
}

export function stripFrontmatter(markdown) {
  const value = String(markdown || '').replaceAll('\r\n', '\n')
  if (!value.startsWith('---\n')) return value
  const end = value.indexOf('\n---\n', 4)
  return end === -1 ? value : value.slice(end + 5)
}

export function extractTitle(markdown, fallback) {
  const frontmatter = String(markdown || '').match(/^---\n([\s\S]*?)\n---\n/)
  const titleLine = frontmatter?.[1].match(/^title:\s*(.+)$/m)
  if (titleLine) return titleLine[1].trim().replace(/^['"]|['"]$/g, '')
  const heading = stripFrontmatter(markdown).match(/^#\s+(.+)$/m)
  return heading?.[1]?.replace(/^CANON-[^—]+—\s*/, '').trim() || fallback
}

export function extractSummary(markdown) {
  const content = stripFrontmatter(markdown)
  for (const heading of ['Quick answer', 'One-sentence truth', 'Hover summary', 'Beginner explanation', 'Mental model']) {
    const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*$\\n+([^#\\n][^\\n]*)`, 'm')
    const match = pattern.exec(content)
    if (match) return plainText(match[1]).slice(0, 220)
  }
  const paragraphs = content.split(/\n\s*\n/).map((part) => part.trim()).filter((part) => part && !part.startsWith('#') && !part.startsWith('>') && !part.startsWith('```'))
  return plainText(paragraphs[0] || '').slice(0, 220)
}

export function escapeHtml(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

function inline(value, sourcePath) {
  let escaped = escapeHtml(value)
  const tokens = []
  escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const token = `@@ATLAS_LINK_${tokens.length}@@`
    tokens.push(`<a href="${escapeAttribute(resolveHref(decodeEntities(href), sourcePath))}" target="_blank" rel="noreferrer">${label}</a>`)
    return token
  })
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>')
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  tokens.forEach((tokenValue, index) => { escaped = escaped.replace(`@@ATLAS_LINK_${index}@@`, tokenValue) })
  return escaped
}

function resolveHref(href, sourcePath) {
  const trimmed = String(href || '').trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('#')) return trimmed
  const clean = trimmed.split('#')[0].split('?')[0]
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), clean))
  return `${repositoryBase}${resolved}`
}

function decodeEntities(value) {
  return String(value).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#96;')
}

function slug(value) {
  return plainText(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

function plainText(value) {
  return String(value || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_>#]/g, '').replace(/\s+/g, ' ').trim()
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
