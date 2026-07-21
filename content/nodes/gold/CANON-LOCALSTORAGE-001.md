# CANON-LOCALSTORAGE-001 — localStorage

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 3 ([Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current Web Storage standard; Evergreen browsers.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

localStorage saves small browser data after refresh.

## One-sentence truth

localStorage stores string key/value pairs for an origin and normally persists them across browser sessions.

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

## Verification

- `V-LOCALSTORAGE-001`: Save a known value, refresh or recreate the state, and confirm the value loads again.
- `V-LOCALSTORAGE-002`: Start with a missing key and confirm the application uses its intended default.
- `V-LOCALSTORAGE-003`: Store malformed or unexpected text and confirm parsing failure does not silently corrupt visible state.

## Applicability and boundaries

- Storage is scoped by origin and behavior for file URLs is not a reliable contract.
- Keys and values are strings; structured values require an explicit serialization format such as JSON.
- Storage access can fail, is synchronous, has browser-dependent limits, and should not hold secrets or server-authoritative data.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-LOCALSTORAGE-001.evidence.json`](../evidence/CANON-LOCALSTORAGE-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
