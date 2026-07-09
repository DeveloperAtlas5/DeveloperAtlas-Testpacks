# CANON-DOM-001 — DOM

## Hover summary

The DOM is the browser's live version of the HTML page.

## One-sentence truth

The DOM is a structured representation of the page that JavaScript can read and change.

## Mental model

HTML is the written recipe. The DOM is the meal the browser builds from that recipe.

## Beginner explanation

When the browser opens your HTML, it creates a live page structure. JavaScript can find parts of this structure and change them.

## Technical explanation

DOM stands for Document Object Model. Browser JavaScript uses DOM methods like `querySelector` to select elements.

```js
const button = document.querySelector('.change-message-button')
```

## When to use it

Use DOM methods when JavaScript needs to find or change something on the page.

## Common mistakes

- Thinking JavaScript edits the HTML file itself.
- Selecting the wrong element.
- Running JavaScript before the element exists.

## AI steering rule

AI should explain the connection between HTML class names and JavaScript selectors before patching DOM bugs.

## Human readability rule

DOM-related variable names should name the element clearly, like `submitButton` or `messageText`.

## Related nodes

- CANON-JAVASCRIPT-001
- SUPPORT-QUERYSELECTOR-001
