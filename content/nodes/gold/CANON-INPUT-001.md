# CANON-INPUT-001 — Input

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([HTML input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current HTML standard; Evergreen browsers.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

An input lets the user enter data.

## One-sentence truth

The HTML input element creates a form control whose behavior and submitted value depend on its type and attributes.

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

## Verification

- `V-INPUT-001`: Enter a known value and confirm the application reads that exact value.
- `V-INPUT-002`: Check the empty or invalid-input path used by the surrounding form.
- `V-INPUT-003`: Confirm the label, name, type, and code reference describe the same value.

## Related nodes

- `CANON-FORM-001`
- `CANON-EVENT-001`
- `CANON-DOM-001`

## Applicability and boundaries

- Not every input type accepts typed text; inputs also include controls such as checkbox, radio, file, hidden, and submit.
- A control generally needs a name to contribute a name/value pair during form submission.
- Labels and suitable input types are important accessibility and data-quality boundaries.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-INPUT-001.evidence.json`](../evidence/CANON-INPUT-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
