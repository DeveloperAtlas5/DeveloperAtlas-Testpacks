---

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([Validation](https://laravel.com/docs/13.x/validation)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).

id: SUPPORT-VALIDATE-001
title: validate()
status: candidate
type: canon_node
node_depth: supporting
category: quick_reminder
level: beginner
content_version: 2
journey_ids:
- JOURNEY-LARAVEL-REQUEST-001
version_scope: Laravel 13.x
version_sensitivity: medium
review_due_at: 2026-10-12
user_validation_status: planned
prerequisite_nodes:
- CANON-REQUEST-RESPONSE-001
used_with_nodes:
- CANON-CONTROLLER-001
continues_to_nodes:
- SUPPORT-REDIRECT-001
deeper_explanation_nodes:
- CANON-PHP-FORM-REQUEST-001
---

# validate()

## Quick answer

Laravel's request `validate()` method evaluates input against rules and returns the validated data when those rules pass.

## Where it fits in the flow

Use validation inside the request-handling path before creating or updating data. It turns untrusted request input into an explicitly accepted shape; authorization and persistence remain separate steps.

`request input -> validation rules -> validated data -> operation`

## Mental model

Think of validation as a gate with a checklist. Passing values continue in a smaller validated array. Failing values stop the normal action and produce an error response suited to the request context.

## Working example

```php
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

public function store(Request $request): RedirectResponse
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:120'],
        'quantity' => ['required', 'integer', 'min:1'],
    ]);

    Item::create($validated);

    return redirect()->route('items.index');
}
```

Only `name` and `quantity` that satisfy the rules reach `Item::create(...)` through `$validated`.

## What you can safely change

- Add or adjust one rule while updating the form hint, error expectation, and focused test for that field.
- Use the returned validated data for the operation instead of `$request->all()`.
- Move a growing or reusable rule set to a Form Request without changing what the accepted payload means.

## Common failure and recovery

- **Invalid input is saved.** Confirm persistence uses `$validated`, not the complete request payload.
- **The browser redirects instead of returning JSON.** Check the request's expected response format and test the correct web or JSON boundary.
- **A valid value is rejected.** Inspect the exact input name, submitted representation, and its ordered rules.
- **Validation is treated as permission.** Add authorization separately; valid input is not automatically allowed input.

## How to verify it

- `V-VALIDATE-001`: Submit a payload satisfying every rule and confirm the returned validated array contains the accepted fields used by the operation.
- `V-VALIDATE-002`: Submit a traditional web request missing a required field and confirm the redirect, session errors, and absence of persistence.
- `V-VALIDATE-003`: Submit the equivalent JSON or XHR request and confirm the validation error status, JSON body, and absence of persistence.

## Boundaries and version notes

- Reviewed for Laravel 13.x; exact rules and failure representation depend on application context.
- When validation passes, `validate()` returns the validated data.
- Traditional web validation failure redirects with errors; requests expecting JSON receive an error response body.
- Validation checks input rules. Authorization, database constraints, and business invariants remain separate controls.

## AI steering rule

AI should inspect the submitted input names, current rules, response context, and persistence call before changing validation, and should keep rule changes aligned with the field's actual accepted shape.

## Human readability rule

Group validation rules by input name, prefer array rule syntax when it improves scanning, and keep the accepted payload visible next to the operation that consumes it.

## Related nodes

- CANON-REQUEST-RESPONSE-001
- CANON-CONTROLLER-001
- CANON-PHP-FORM-REQUEST-001
- SUPPORT-REDIRECT-001

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [`../evidence/SUPPORT-VALIDATE-001.evidence.json`](../evidence/SUPPORT-VALIDATE-001.evidence.json). Independent human review and any promotion decision remain pending.
