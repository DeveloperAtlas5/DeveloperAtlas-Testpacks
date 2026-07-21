# CANON-FORM-001 — Form

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([HTML form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current HTML standard; Evergreen browsers.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

A form collects user input.

## One-sentence truth

An HTML form groups controls for submitting named data to a configured destination.

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

## Verification

- `V-FORM-001`: Submit known valid inputs and confirm the intended handler or request receives them.
- `V-FORM-002`: Submit an empty or invalid value and confirm the failure path is understandable.
- `V-FORM-003`: Check that labels and input names match the values read by JavaScript or the server.

## Related nodes

- `CANON-INPUT-001`
- `CANON-EVENT-001`
- `CANON-DOM-001`

## Applicability and boundaries

- A form can submit natively or have its submit event handled by JavaScript.
- Client-side validation improves feedback but does not replace server-side validation for untrusted input.
- Only successful named controls contribute to normal form submission.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-FORM-001.evidence.json`](../evidence/CANON-FORM-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
