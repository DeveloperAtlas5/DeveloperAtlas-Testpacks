# CANON-CSS-001 — CSS

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([CSS: Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current CSS modules; Evergreen browsers.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

CSS controls how HTML looks.

## One-sentence truth

CSS is a stylesheet language that describes how HTML or XML documents are presented across supported media.

## Mental model

HTML is the skeleton. CSS is the clothing, spacing, and visual organization.

## Beginner explanation

CSS lets you change colors, spacing, fonts, borders, layout, and other visual details.

You connect CSS to HTML with a `<link>` tag.

## Technical explanation

CSS applies declarations to selected elements. A rule contains a selector and a block of property-value declarations.

```css
.note {
  padding: 12px;
  background: #f5f5f5;
}
```

## When to use it

Use CSS when you want to change presentation without changing the meaning of the HTML.

## Common mistakes

- Forgetting to link the CSS file.
- Misspelling a class name.
- Styling everything with random classes instead of meaningful names.
- Adding too many visual changes before the structure is clear.

## AI steering rule

AI may suggest small readability improvements to CSS, but should not redesign the full page unless asked.

## Human readability rule

CSS should use meaningful selectors, consistent spacing, and grouped rules that make visual intent clear.

## Related nodes

- CANON-DOM-001
- SUPPORT-CSS-SELECTOR-001
- SUPPORT-CLASS-001

## Verification

- `V-CSS-001`: Change one selector property and confirm only the intended element changes visually.
- `V-CSS-002`: Confirm the stylesheet is loaded and the selector matches the class, ID, or element in the HTML.
- `V-CSS-003`: Remove or override the rule and observe that the targeted presentation changes predictably.

## Applicability and boundaries

- A selector match does not guarantee a declaration wins; cascade, specificity, inheritance, order, and validity can affect the result.
- CSS affects presentation rather than changing the semantic meaning of the underlying HTML.
- Individual CSS modules evolve separately, so version-sensitive features require their own compatibility check.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-CSS-001.evidence.json`](../evidence/CANON-CSS-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
