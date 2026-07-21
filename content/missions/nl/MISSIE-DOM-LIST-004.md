# MISSIE-DOM-LIST-004 — Bouw een DOM-lijst

## Missiedoel

Bouw een kleine lijst-app in de browser.

Je kunt items toevoegen, afstrepen en verwijderen.

## Waarom dit belangrijk is

Dit is de eerste missie waarin je pagina begint te voelen als een echte app.

Je verandert niet meer alleen één tekst. Je maakt, verandert en verwijdert onderdelen op de pagina.

Dit bereidt je voor op CRUD in Laravel.

## Voor je begint

Je hebt de bestanden van Missie 1–3 nodig:

```text
atlas-doorway/
  index.html
  style.css
  script.js
```

## Concepten

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

## Stap 1 — Voeg lijst-HTML toe

Zet dit in `index.html`:

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

## Stap 2 — Voeg CSS toe

Zet dit in `style.css`:

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

## Stap 3 — Maak lijst-state in JavaScript

Zet dit in `script.js`:

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
    toggleButton.textContent = 'Klaar'

    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.dataset.action = 'remove'
    removeButton.dataset.id = String(item.id)
    removeButton.textContent = 'Verwijder'

    itemActions.append(toggleButton, removeButton)
    itemRow.append(itemName, itemActions)

    itemList.appendChild(itemRow)
  })
}
```

## Stap 4 — Reageer op submit

Voeg toe:

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

## Stap 5 — Reageer op lijst-knoppen

Voeg toe:

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

## Controlepunt

Je kunt nu:

- een item typen
- Add item klikken
- het item zien verschijnen
- Done klikken
- het item afstrepen
- Remove klikken
- het item verwijderen

## Veilige AI-prompt

```text
Leg uit waarom mijn DOM-lijst geen items toevoegt. Herschrijf mijn hele bestand niet. Controleer de form listener, preventDefault, items array en renderItems.
```

## Bewijs dat je klaar bent

Je kunt uitleggen:

- wat de `items` array bewaart
- waarom elk item een `id` heeft
- wat `renderItems()` doet
- waarom `preventDefault()` nodig is
- hoe Done en Remove weten wat ze moeten doen
