# CANON-LOCALSTORAGE-001 — localStorage

## Hover summary

localStorage saves small browser data after refresh.

## One-sentence truth

`localStorage` is a browser feature for saving small pieces of text data on the user's device.

## Mental model

It is a tiny notebook in the browser.

## Beginner explanation

Without saving, a page forgets changes after refresh. `localStorage` lets the browser remember simple data.

## Technical explanation

`localStorage` stores string key-value pairs.

```js
localStorage.setItem('name', 'Jefry')

const savedName = localStorage.getItem('name')
```

For arrays or objects, use JSON:

```js
localStorage.setItem('items', JSON.stringify(items))

const savedItems = JSON.parse(localStorage.getItem('items'))
```

## When to use it

Use it for small local data in beginner projects.

## When not to use it

Do not use it for passwords, private data, or real multi-user database needs.

## Common mistakes

- Forgetting that localStorage stores strings.
- Forgetting `JSON.stringify`.
- Forgetting `JSON.parse`.
- Treating localStorage like a real backend database.

## AI steering rule

AI should warn when localStorage is being used for data that should be private or server-side.

## Human readability rule

Use clear key names and keep save/load logic grouped.

## Related nodes

- CANON-JAVASCRIPT-001
- SUPPORT-JSON-STRINGIFY-001
- SUPPORT-JSON-PARSE-001
