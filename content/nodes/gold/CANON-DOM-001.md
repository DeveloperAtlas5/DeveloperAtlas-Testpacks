# CANON-DOM-001 — DOM

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current DOM standard; Evergreen browsers.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

The DOM is the browser's live version of the HTML page.

## One-sentence truth

The DOM represents a document as a node tree and provides APIs that code can use to inspect and change that in-memory document.

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

## Verification

- `V-DOM-001`: Select a known element and confirm the lookup returns the expected node.
- `V-DOM-002`: Change one text value, attribute, or class and observe the corresponding page update.
- `V-DOM-003`: Check the missing-element path so a failed selector is visible rather than silently guessed.

## Applicability and boundaries

- The DOM is the browser's current document representation, not an automatic edit to the source HTML file.
- Selector methods can return no match; code must handle that path instead of assuming an element exists.
- DOM availability and timing depend on the host environment and document lifecycle.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-DOM-001.evidence.json`](../evidence/CANON-DOM-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
