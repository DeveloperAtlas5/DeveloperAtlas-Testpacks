# CANON-CSS-001 — CSS

## Hover summary

CSS controls how HTML looks.

## One-sentence truth

CSS is the language that styles HTML by selecting elements and applying visual rules.

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

- CANON-HTML-001
- SUPPORT-CSS-SELECTOR-001
- SUPPORT-CLASS-001
