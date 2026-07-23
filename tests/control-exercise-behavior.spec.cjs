const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const scriptPath = path.resolve(__dirname, '../control/exercises/browser-list-count/project/script.js')

function createElement(tag = 'div') {
  let text = ''
  const element = {
    tagName: tag.toUpperCase(),
    children: [],
    dataset: {},
    hidden: false,
    value: '',
    listeners: {},
    classList: {
      values: new Set(),
      add(...names) { names.forEach((name) => this.values.add(name)) },
      contains(name) { return this.values.has(name) },
    },
    append(...children) { this.children.push(...children) },
    appendChild(child) { this.children.push(child); return child },
    addEventListener(type, handler) { this.listeners[type] = handler },
    contains(child) { return this.children.includes(child) || this.children.some((entry) => entry.contains?.(child)) },
    closest(selector) { return selector === 'button' && this.tagName === 'BUTTON' ? this : null },
    focus() {},
  }
  Object.defineProperty(element, 'textContent', {
    get() { return text },
    set(value) { text = String(value); if (value === '') element.children = [] },
  })
  return element
}

function createHarness(saved = null) {
  const itemForm = createElement('form')
  const itemInput = createElement('input')
  const itemList = createElement('ul')
  const emptyState = createElement('p')
  const remainingCount = createElement('p')
  const storage = new Map()
  if (saved !== null) storage.set('atlasPracticeItems', saved)
  const selectors = new Map([
    ['.item-form', itemForm],
    ['.item-input', itemInput],
    ['.item-list', itemList],
    ['.empty-state', emptyState],
    ['.remaining-count', remainingCount],
  ])
  const context = {
    console,
    crypto: { randomUUID: (() => { let id = 0; return () => `item-${++id}` })() },
    document: {
      querySelector(selector) { return selectors.get(selector) },
      createElement,
    },
    localStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null },
      setItem(key, value) { storage.set(key, String(value)) },
      removeItem(key) { storage.delete(key) },
    },
  }
  vm.runInNewContext(fs.readFileSync(scriptPath, 'utf8'), context, { filename: scriptPath })
  return { itemForm, itemInput, itemList, emptyState, remainingCount, storage }
}

function submit(harness, value) {
  harness.itemInput.value = value
  harness.itemForm.listeners.submit({ preventDefault() {} })
}

function clickAction(harness, action) {
  const row = harness.itemList.children[0]
  const actions = row.children[1]
  const button = actions.children.find((entry) => entry.dataset.action === action)
  harness.itemList.listeners.click({ target: button })
}

test('remaining count follows add, complete, undo, and remove behavior', () => {
  const harness = createHarness()
  assert.equal(harness.remainingCount.textContent, '0 items remaining')
  submit(harness, 'First task')
  assert.equal(harness.remainingCount.textContent, '1 item remaining')
  submit(harness, 'Second task')
  assert.equal(harness.remainingCount.textContent, '2 items remaining')
  clickAction(harness, 'toggle')
  assert.equal(harness.remainingCount.textContent, '1 item remaining')
  clickAction(harness, 'toggle')
  assert.equal(harness.remainingCount.textContent, '2 items remaining')
  clickAction(harness, 'remove')
  assert.equal(harness.remainingCount.textContent, '1 item remaining')
})

test('reload restores stored state and counts only incomplete items', () => {
  const saved = JSON.stringify([
    { id: 'a', name: 'Done', isDone: true },
    { id: 'b', name: 'Open', isDone: false },
  ])
  const harness = createHarness(saved)
  assert.equal(harness.remainingCount.textContent, '1 item remaining')
  assert.equal(harness.itemList.children.length, 2)
})

test('HTML-like names remain literal text nodes', () => {
  const harness = createHarness()
  const unsafeLookingText = '<img src=x onerror="alert(1)">'
  submit(harness, unsafeLookingText)
  const nameElement = harness.itemList.children[0].children[0]
  assert.equal(nameElement.textContent, unsafeLookingText)
  assert.equal(nameElement.children.length, 0)
})
