# SUPPORT-BLADE-FOREACH-001 — Blade @foreach

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([Blade Templates](https://laravel.com/docs/13.x/blade)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

Blade's `@foreach` directive repeats a template block for each value produced by a PHP iterable expression.

## Beginner explanation

Use it when a view needs to show a list. Keep list markup readable.

## Syntax example

```blade
@foreach ($items as $item)
    <li>{{ $item }}</li>
@endforeach
```

## Common mistake

Using this feature without understanding which folder, file, or response it affects.

## AI steering rule

AI should connect `Blade @foreach` to `CANON-BLADE-VIEW-001` and keep the explanation inside the current task.

## Verification

- `V-BLADE-FOREACH-001` — Render a view with two known items and count the repeated elements.
- `V-BLADE-FOREACH-002` — Inspect `$loop->first` and `$loop->last` across the two iterations.
- `V-BLADE-FOREACH-003` — Render an empty collection through an equivalent `@forelse` example.

## Related nodes

- `CANON-BLADE-VIEW-001`
- `CANON-ARRAY-001`

## Human readability rule

Use clear singular and plural names so the collection and current item are easy to distinguish.

## Applicability and boundaries

- Use distinct plural and singular variable names so the collection and current item are clear.
- Use `@forelse` when an empty-state message is part of the interface.
- Blade echo syntax escapes values by default; raw output has a different security boundary.

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [SUPPORT-BLADE-FOREACH-001.evidence.json](../evidence/SUPPORT-BLADE-FOREACH-001.evidence.json). Independent human review and any promotion decision remain pending.
