---
id: SUPPORT-ROUTE-HELPER-001
title: route() helper
status: candidate
type: canon_node
node_depth: supporting
category: quick_reminder
level: beginner
related_gold_node: CANON-ROUTE-001
---

# route() helper

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([URL Generation](https://laravel.com/docs/13.x/urls)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Short meaning

Laravel's `route()` helper generates a URL for a named route and substitutes supplied route parameters.

## Where you see it

Use it instead of hard-coding paths so URLs can change without breaking views.

## Tiny example

```blade
<a href="{{ route('items.index') }}">Items</a>
```

## Common mistake

Calling a route name that does not exist.

## Related gold node

- CANON-ROUTE-001

## AI steering rule

AI should connect `SUPPORT-ROUTE-HELPER-001` to `CANON-ROUTE-001` and keep the explanation inside the current task.

## Verification

- `V-ROUTE-HELPER-001` — Generate a URL for a known parameterless named route and compare its path.
- `V-ROUTE-HELPER-002` — Generate a URL for a route with a model or scalar parameter.
- `V-ROUTE-HELPER-003` — Pass an extra parameter and inspect the generated query string.

## Related nodes

- `CANON-BLADE-VIEW-001`

## Human readability rule

Prefer a named route so the destination remains understandable when a URL changes.

## Applicability and boundaries

- The route name must exist and required parameters must be supplied.
- Generating a URL does not perform navigation or return a redirect response by itself.
- Parameter serialization can use Eloquent route keys and application URL configuration.

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [SUPPORT-ROUTE-HELPER-001.evidence.json](../evidence/SUPPORT-ROUTE-HELPER-001.evidence.json). Independent human review and any promotion decision remain pending.
