# CANON-JSON-001 — JSON

## Hover summary

JSON is a text format for storing structured data.

## One-sentence truth

JSON turns structured data into text that can be saved or sent.

## Mental model

JSON is a transport box for data.

## Beginner explanation

localStorage stores text. Arrays and objects are not plain text. JSON helps convert between JavaScript data and text.

## Tiny example

```js
const savedText = JSON.stringify(items)
const loadedItems = JSON.parse(savedText)
```

## Common mistakes

- Forgetting `JSON.stringify` before saving objects or arrays.
- Forgetting `JSON.parse` after loading.
- Trying to parse broken text.

## AI steering rule

AI should explain why JSON is needed instead of hiding it behind helper functions too early.

## Human readability rule

JSON save/load logic should be grouped and named clearly.
