---
id: CANON-BLADE-VIEW-001
title: Blade View
status: gold_candidate
type: canon_node
node_depth: gold
category: core_code_concept
level: beginner_to_rookie
content_version: 2
journey_ids:
- JOURNEY-LARAVEL-REQUEST-001
version_scope: Laravel 13.x
version_sensitivity: medium
review_due_at: 2026-10-12
user_validation_status: planned
prerequisite_nodes:
- CANON-CONTROLLER-001
used_with_nodes:
- CANON-ROUTE-001
- CANON-CONTROLLER-001
deeper_explanation_nodes:
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CRUD-001
---

# Blade View

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 2 ([Blade Templates](https://laravel.com/docs/13.x/blade), [Views](https://laravel.com/docs/13.x/views)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Quick answer

A Blade view is a Laravel template, normally stored under `resources/views`, that compiles to PHP and renders presentation output from supplied data.

## Where it fits in the flow

Blade is one possible representation near the end of the request path. A route or controller returns a view with data; Blade renders HTML; Laravel places that HTML in the outgoing response.

`controller view data -> Blade template -> rendered HTML -> response`

## Mental model

Think of Blade as a document template. HTML supplies the structure, Blade directives control simple presentation branches and loops, and escaped echo syntax fills values into the page. The template presents decisions made elsewhere rather than owning request or business logic.

## Working example

```blade
@extends('layouts.app')

@section('content')
    <h1>Items</h1>

    <ul>
        @forelse ($items as $item)
            <li>{{ $item->name }}</li>
        @empty
            <li>No items yet.</li>
        @endforelse
    </ul>
@endsection
```

The controller must pass an `items` value. `{{ $item->name }}` escapes the displayed text by default.

## What you can safely change

- Change labels, layout markup, and simple display conditions while preserving the view-data contract.
- Rename a Blade variable together with the controller key that supplies it.
- Add a route helper only after confirming the named route exists.
- Prefer escaped `{{ }}` output for untrusted values; use raw output only with an explicit trusted-content reason.

## Common failure and recovery

- **Undefined variable.** Compare the controller's view-data key with the Blade variable name.
- **View not found.** Translate the dot name, such as `items.index`, to `resources/views/items/index.blade.php` and confirm the path.
- **The list renders empty.** Inspect the data passed by the controller and provide an intentional empty state.
- **HTML contains unsafe or unexpected markup.** Replace raw `{!! !!}` output with escaped `{{ }}` unless the content is explicitly trusted and sanitized.

## How to verify it

- `V-BLADE-VIEW-001`: Render the view with known controller data and confirm the expected escaped values appear in the HTML.
- `V-BLADE-VIEW-002`: Render an empty collection and confirm the intended empty-state message appears without broken markup.
- `V-BLADE-VIEW-003`: Inspect the template and confirm request handling, database queries, and business rules have not moved into Blade.

## Boundaries and version notes

- Reviewed for Laravel 13.x; `.blade.php`, `resources/views`, compilation, directives, and escaped echo behavior are stable in this scope.
- Escaped `{{ }}` and raw `{!! !!}` output have different cross-site-scripting boundaries.
- A Blade view is one response representation; JSON, redirects, files, and empty responses do not require Blade.
- Blade permits PHP, but request handling and business rules should remain outside presentation templates.

## AI steering rule

AI should inspect the controller's view name and data contract plus the existing layout before editing Blade, preserve escaped output by default, and avoid moving request handling or business logic into the template.

## Human readability rule

Keep HTML structure visible, indent Blade directives consistently, give empty and error states explicit markup, and name variables after the data the user sees.

## Related nodes

- CANON-CONTROLLER-001
- CANON-ROUTE-001
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CRUD-001

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-BLADE-VIEW-001.evidence.json`](../evidence/CANON-BLADE-VIEW-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
