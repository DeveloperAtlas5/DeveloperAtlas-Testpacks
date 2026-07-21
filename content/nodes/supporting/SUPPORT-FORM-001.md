# SUPPORT-FORM-001 — form

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([<form>: The Form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Current HTML.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Short meaning

A `<form>` groups controls for submitting user-provided data, with attributes that define how and where the data is sent.

## Where you see it

In beginner HTML and JavaScript when a page needs user input or dynamic behavior.

## Tiny example

```text
<form class="item-form">...</form>
```

## Common mistake

Using it without understanding how it connects to the page state or event flow.

## AI steering rule

AI should connect the form's inputs and submit event before changing validation or persistence behavior.

## Human readability rule

Keep labels, input names, and submit behavior grouped so the form's purpose is visible.

## Related gold node

- CANON-FORM-001

## Verification

- `V-FORM-001` — Submit a form with two named controls and inspect the outgoing names and values.
- `V-FORM-002` — Remove one control's `name`, submit again, and compare the request.
- `V-FORM-003` — Activate the submit control by keyboard and pointer while counting submissions.


## Applicability and boundaries

- Controls generally need a `name` to contribute a value to submitted form data.
- Use labels and native controls so the form remains understandable and operable.
- Client-side validation improves feedback but does not replace server-side validation for untrusted input.

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [SUPPORT-FORM-001.evidence.json](../evidence/SUPPORT-FORM-001.evidence.json). Independent human review and any promotion decision remain pending.
