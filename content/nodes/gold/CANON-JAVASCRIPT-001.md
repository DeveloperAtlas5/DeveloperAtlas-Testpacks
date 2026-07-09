# CANON-JAVASCRIPT-001 — JavaScript

## Hover summary

JavaScript adds behavior to a page.

## One-sentence truth

JavaScript is the language that can read, change, and react to a web page after it loads.

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
