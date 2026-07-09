# CANON-FORM-001 — Form

## Hover summary

A form collects user input.

## One-sentence truth

A form groups inputs and lets the user submit data.

## Mental model

A form is a small container for a question the page asks the user.

## Beginner explanation

Forms are used when the user needs to type, choose, or send something.

In JavaScript missions, forms can update the page. In PHP and Laravel, forms can send data to the server.

## Tiny example

```html
<form class="item-form">
  <input class="item-input" type="text">
  <button type="submit">Add item</button>
</form>
```

## Common mistakes

- Forgetting to prevent browser refresh in JavaScript.
- Forgetting `@csrf` in Laravel forms.
- Putting too many unrelated inputs in one form.

## AI steering rule

AI should explain whether the form is browser-only or server-submitted before changing it.

## Human readability rule

A form should make its purpose clear through labels, names, and button text.
