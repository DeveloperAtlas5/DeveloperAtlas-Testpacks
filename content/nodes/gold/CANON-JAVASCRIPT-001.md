# CANON-JAVASCRIPT-001 — JavaScript

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 2 ([JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current ECMAScript; Current browser Web APIs.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

JavaScript adds behavior to a page.

## One-sentence truth

JavaScript is a programming language used in browsers and other hosts; in a web page, host APIs such as the DOM provide page interaction.

## Mental model

HTML is the page. CSS is how it looks. JavaScript is what it can do.

## Beginner explanation

JavaScript can respond to clicks, change text, save data, show messages, and make pages interactive.

## Technical explanation

In the browser, JavaScript can use the DOM API to find elements and update them.

```js
const messageText = document.querySelector('.message-text')

messageText.textContent = 'Changed by JavaScript.'
```

## When to use it

Use JavaScript when the page needs behavior after loading.

## Common mistakes

- Linking the script before HTML is loaded.
- Misspelling class names in `querySelector`.
- Trying to change an element that JavaScript cannot find.
- Adding too many features at once.

## AI steering rule

AI should keep beginner JavaScript small, explicit, and connected to visible page behavior.

## Human readability rule

Variable names should describe the element or value they hold.

## Related nodes

- CANON-DOM-001
- CANON-EVENT-001
- SUPPORT-QUERYSELECTOR-001

## Verification

- `V-JAVASCRIPT-001`: Load the script and confirm it reports no syntax or module-loading error.
- `V-JAVASCRIPT-002`: Trace one user action through JavaScript to the resulting data or DOM change.
- `V-JAVASCRIPT-003`: Change a known input and confirm the output changes for the expected reason.

## Applicability and boundaries

- The JavaScript language and browser Web APIs are related but distinct; JavaScript can run where no DOM exists.
- Script loading order, modules, and document timing affect when page elements are available.
- This node focuses on browser JavaScript and does not describe every JavaScript host.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-JAVASCRIPT-001.evidence.json`](../evidence/CANON-JAVASCRIPT-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
