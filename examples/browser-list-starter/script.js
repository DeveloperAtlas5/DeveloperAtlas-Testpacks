const storageKey = 'atlasPracticeItems'

const itemForm = document.querySelector('.item-form')
const itemInput = document.querySelector('.item-input')
const itemList = document.querySelector('.item-list')

let items = []

function addItem(name) {
  const newItem = {
    id: Date.now(),
    name: name,
    isDone: false,
  }

  items.push(newItem)
}

function saveItems() {
  localStorage.setItem(storageKey, JSON.stringify(items))
}

function loadItems() {
  const savedItems = localStorage.getItem(storageKey)

  if (!savedItems) {
    return
  }

  items = JSON.parse(savedItems)
}

function renderItems() {
  itemList.textContent = ''

  items.forEach((item) => {
    const itemRow = document.createElement('li')
    itemRow.classList.add('item-row')

    if (item.isDone) {
      itemRow.classList.add('is-done')
    }

    itemRow.innerHTML = `
      <span class="item-name">${item.name}</span>

      <div class="item-actions">
        <button type="button" data-action="toggle" data-id="${item.id}">
          Done
        </button>

        <button type="button" data-action="remove" data-id="${item.id}">
          Remove
        </button>
      </div>
    `

    itemList.appendChild(itemRow)
  })
}

itemForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const itemName = itemInput.value.trim()

  if (itemName === '') {
    return
  }

  addItem(itemName)
  saveItems()
  renderItems()

  itemInput.value = ''
})

itemList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('button')

  if (!clickedButton) {
    return
  }

  const itemId = Number(clickedButton.dataset.id)
  const action = clickedButton.dataset.action

  if (action === 'toggle') {
    items = items.map((item) => {
      if (item.id !== itemId) {
        return item
      }

      return {
        ...item,
        isDone: !item.isDone,
      }
    })
  }

  if (action === 'remove') {
    items = items.filter((item) => item.id !== itemId)
  }

  saveItems()
  renderItems()
})

loadItems()
renderItems()
