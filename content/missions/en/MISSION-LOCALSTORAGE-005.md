# MISSION-LOCALSTORAGE-005 — Save the List with localStorage

## Mission goal

Save your DOM list so it stays after refreshing the browser.

## Why this matters

A page without saving forgets everything after refresh.

`localStorage` teaches the first version of persistence: data surviving after the page reloads.

Later, Laravel will save data in a database. This mission helps you understand why saving matters before the database arrives.

## Before you start

You need the DOM list from Mission 4.

```text
atlas-doorway/
  index.html
  style.css
  script.js
```

## Concepts used

- localStorage
- key/value storage
- JSON.stringify
- JSON.parse
- load on page start
- save after changes

## Step 1 — Add a storage key

At the top of `script.js`, near your other constants, add:

```js
const storageKey = 'atlasPracticeItems'
```

## Step 2 — Create save function

Add this function below `renderItems()`:

```js
function saveItems() {
  localStorage.setItem(storageKey, JSON.stringify(items))
}
```

## Step 3 — Create load function

Add this function below `saveItems()`:

```js
function loadItems() {
  const savedItems = localStorage.getItem(storageKey)

  if (!savedItems) {
    return
  }

  items = JSON.parse(savedItems)
}
```

## Step 4 — Save after every change

After adding an item:

```js
addItem(itemName)
saveItems()
renderItems()
```

After toggling or removing an item:

```js
saveItems()
renderItems()
```

## Step 5 — Load when the page opens

At the bottom of `script.js`, add:

```js
loadItems()
renderItems()
```

## Checkpoint

Test this:

1. Add two items.
2. Mark one item done.
3. Refresh the browser.
4. The items should still be there.
5. The done item should still be crossed out.

## Common errors

| Problem | Likely cause | Fix |
|---|---|---|
| List disappears after refresh | `saveItems()` not called | Save after add/toggle/remove |
| Browser shows JSON error | Bad stored data | Clear localStorage and retry |
| Loaded data does not display | `renderItems()` not called after `loadItems()` | Call both at bottom |
| Done state is not saved | Saving happens before state changes | Save after updating `items` |

## Recovery card

When stuck:

1. Open browser dev tools.
2. Go to Application/Storage.
3. Find localStorage.
4. Check `atlasPracticeItems`.
5. If data is broken, delete the key and test again.

## Safe AI prompts

```text
Explain why my localStorage list does not stay after refresh. Do not rewrite my whole script. Check saveItems, loadItems, JSON.stringify, JSON.parse, and when renderItems runs.
```

```text
Suggest the smallest safe fix for this localStorage error. Preserve my existing Mission 4 structure.
```

## Human Preference check

- [ ] The storage key has a clear name.
- [ ] Save and load logic are separate functions.
- [ ] JSON conversion is visible and explainable.
- [ ] Data is saved after every list change.
- [ ] AI did not replace localStorage with a framework or backend.

## Completion proof

You can explain:

- why localStorage is needed
- why JSON is needed
- when the list is saved
- when the list is loaded
- why this is not the same as a real database
