# MISSION-DOM-LIST-004 — Build a DOM List

## Mission goal

Build a small list app in the browser.

You will add items with a form, show them on the page, mark them done, and remove them.

## Why this matters

This is the first mission where the page starts to feel like a real app.

You are no longer only changing one piece of text. You are creating, updating, and removing page elements.

This prepares you for CRUD later in Laravel.

## Before you start

You need the doorway files from Mission 1–3:

```text
atlas-doorway/
  index.html
  style.css
  script.js
```

You can continue in the same files or use the example folder:

```text
examples/browser-list-starter/
```

## Concepts used

- form
- input
- submit event
- preventDefault
- array
- object
- DOM
- createElement
- appendChild
- remove
- classList

## Step 1 — Add list HTML

Replace or extend the interaction area in `index.html` with:

```html
<section class="list-app">
  <h2>Atlas practice list</h2>

  <form class="item-form">
    <label for="item-name">New item</label>

    <div class="form-row">
      <input id="item-name" class="item-input" type="text" placeholder="Example: Learn routes">
      <button type="submit">Add item</button>
    </div>
  </form>

  <ul class="item-list"></ul>
</section>
```

## Step 2 — Add readable CSS

Add this to `style.css`:

```css
.list-app {
  margin-top: 24px;
}

.form-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.item-input {
  flex: 1;
  padding: 10px;
}

.item-list {
  padding-left: 0;
  list-style: none;
}

.item-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

.item-row.is-done .item-name {
  text-decoration: line-through;
}
```

## Step 3 — Create list state in JavaScript

Replace your `script.js` content with:

```js
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

function renderItems() {
  itemList.textContent = ''

  items.forEach((item) => {
    const itemRow = document.createElement('li')
    itemRow.classList.add('item-row')

    if (item.isDone) {
      itemRow.classList.add('is-done')
    }

    const itemName = document.createElement('span')
    itemName.classList.add('item-name')
    itemName.textContent = item.name

    const itemActions = document.createElement('div')
    itemActions.classList.add('item-actions')

    const toggleButton = document.createElement('button')
    toggleButton.type = 'button'
    toggleButton.dataset.action = 'toggle'
    toggleButton.dataset.id = String(item.id)
    toggleButton.textContent = 'Done'

    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.dataset.action = 'remove'
    removeButton.dataset.id = String(item.id)
    removeButton.textContent = 'Remove'

    itemActions.append(toggleButton, removeButton)
    itemRow.append(itemName, itemActions)

    itemList.appendChild(itemRow)
  })
}
```

## Step 4 — Handle form submit

Add this below the functions:

```js
itemForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const itemName = itemInput.value.trim()

  if (itemName === '') {
    return
  }

  addItem(itemName)
  renderItems()

  itemInput.value = ''
})
```

## Step 5 — Handle list button clicks

Add this below the form listener:

```js
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

  renderItems()
})
```

## Checkpoint

Open the page in the browser.

You should be able to:

- type an item
- click Add item
- see the item appear
- click Done
- see the item crossed out
- click Remove
- see the item disappear
- enter `<img src="invalid" onerror="alert('test')">` and see those exact characters as text, not an image

`textContent` is intentional. Item names come from the user, so the browser must display them as
text rather than interpret them as HTML.

## Common errors

| Problem | Likely cause | Fix |
|---|---|---|
| Page refreshes when adding item | Missing `event.preventDefault()` | Add it at the top of the submit listener |
| Item does not appear | `renderItems()` not called | Call `renderItems()` after `addItem()` |
| Done button does nothing | Wrong `data-action` or click listener | Check `data-action="toggle"` |
| Remove button does nothing | ID is compared as string vs number | Use `Number(clickedButton.dataset.id)` |

## Recovery card

When stuck:

1. Stop adding new features.
2. Check the browser console.
3. Check that the HTML class names match JavaScript selectors.
4. Check that `items` changes.
5. Check that `renderItems()` runs after the change.

## Safe AI prompts

```text
Explain why my DOM list is not adding items. Do not rewrite the whole file. Check the form listener, preventDefault, items array, and renderItems call.
```

```text
Suggest the smallest fix for my Done or Remove button. Preserve my current beginner structure and explain the data-action flow.
```

## Human Preference check

- [ ] Variable names explain their purpose.
- [ ] Each function has one clear job.
- [ ] The code separates state, rendering, and events.
- [ ] Buttons use clear `data-action` values.
- [ ] AI did not add extra architecture.

## Completion proof

You can explain:

- what the `items` array stores
- why each item has an `id`
- what `renderItems()` does
- why `preventDefault()` is needed
- how the Done and Remove buttons know what to do
