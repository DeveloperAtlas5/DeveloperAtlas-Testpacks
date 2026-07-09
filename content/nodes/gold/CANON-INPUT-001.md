# CANON-INPUT-001 — Input

## Hover summary

An input lets the user enter data.

## One-sentence truth

An input is an HTML element where users can type or choose a value.

## Mental model

An input is the blank space where the user gives the app information.

## Tiny example

```html
<label for="item-name">New item</label>
<input id="item-name" class="item-input" type="text">
```

## Common mistakes

- Missing a label.
- Reading the input before the user types.
- Forgetting to trim empty spaces.
- Confusing `id`, `class`, and `name`.

## AI steering rule

AI should keep input examples simple and explain what reads the value.

## Human readability rule

Input names, IDs, and labels should clearly match the data being requested.
