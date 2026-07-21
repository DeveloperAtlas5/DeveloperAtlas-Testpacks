# CANON-JSON-001 — JSON

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 3 ([JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current ECMAScript JSON object; JSON data syntax.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

JSON is a text format for storing structured data.

## One-sentence truth

JSON is a text data syntax; in JavaScript, JSON.stringify serializes supported values and JSON.parse parses valid JSON text.

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

## Verification

- `V-JSON-001`: Stringify a known object, parse the text, and compare the round-tripped data.
- `V-JSON-002`: Try invalid JSON and confirm the parse failure is handled or reported at the boundary.
- `V-JSON-003`: Inspect the stored or transported text and confirm it contains the intended serializable fields.

## Related nodes

- `CANON-OBJECT-001`
- `CANON-ARRAY-001`
- `CANON-LOCALSTORAGE-001`

## Applicability and boundaries

- JSON is not the same thing as a JavaScript object, even though their surface syntax overlaps.
- JSON.parse throws on invalid JSON text unless the caller catches the error.
- Not every JavaScript value round-trips through JSON: unsupported values may be omitted, changed, or rejected.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-JSON-001.evidence.json`](../evidence/CANON-JSON-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
