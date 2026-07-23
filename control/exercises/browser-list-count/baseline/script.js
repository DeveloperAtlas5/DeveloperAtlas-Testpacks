const storageKey = 'atlasPracticeItems'

const itemForm = document.querySelector('.item-form')
const itemInput = document.querySelector('.item-input')
const itemList = document.querySelector('.item-list')
const emptyState = document.querySelector('.empty-state')

let items = []

function addItem(name) {
  items.push({
    id: crypto.randomUUID(),
    name,
    isDone: false,
  })
}

function saveItems() {
  localStorage.setItem(storageKey, JSON.stringify(items))
}

function loadItems() {
  const savedItems = localStorage.getItem(storageKey)
  if (!savedItems) return

  try {
    const parsedItems = JSON.parse(savedItems)
    if (Array.isArray(parsedItems)) {
      items = parsedItems
        .filter((item) => item && typeof item === 'object' && 'id' in item && 'name' in item)
        .map((item) => ({
          id: String(item.id),
          name: String(item.name),
          isDone: Boolean(item.isDone),
        }))
    }
  } catch {
    localStorage.removeItem(storageKey)
  }
}

function createActionButton(action, label, itemId) {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.action = action
  button.dataset.id = itemId
  button.textContent = label
  return button
}

function renderItems() {
  itemList.textContent = ''
  emptyState.hidden = items.length > 0

  items.forEach((item) => {
    const itemRow = document.createElement('li')
    itemRow.classList.add('item-row')
    if (item.isDone) itemRow.classList.add('is-done')

    const itemName = document.createElement('span')
    itemName.classList.add('item-name')
    itemName.textContent = String(item.name)

    const itemActions = document.createElement('div')
    itemActions.classList.add('item-actions')
    itemActions.append(
      createActionButton('toggle', item.isDone ? 'Undo' : 'Done', String(item.id)),
      createActionButton('remove', 'Remove', String(item.id))
    )

    itemRow.append(itemName, itemActions)
    itemList.appendChild(itemRow)
  })
}

itemForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const itemName = itemInput.value.trim()
  if (!itemName) return

  addItem(itemName)
  saveItems()
  renderItems()
  itemInput.value = ''
  itemInput.focus()
})

itemList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('button')
  if (!clickedButton || !itemList.contains(clickedButton)) return

  const itemId = clickedButton.dataset.id
  if (clickedButton.dataset.action === 'toggle') {
    items = items.map((item) => item.id === itemId ? { ...item, isDone: !item.isDone } : item)
  }
  if (clickedButton.dataset.action === 'remove') {
    items = items.filter((item) => item.id !== itemId)
  }

  saveItems()
  renderItems()
})

loadItems()
renderItems()
