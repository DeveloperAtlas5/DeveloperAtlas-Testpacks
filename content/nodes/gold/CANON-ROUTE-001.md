---
id: CANON-ROUTE-001
title: Route
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
- CANON-REQUEST-RESPONSE-001
used_with_nodes:
- CANON-CONTROLLER-001
- CANON-BLADE-VIEW-001
continues_to_nodes:
- CANON-CONTROLLER-001
deeper_explanation_nodes:
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CRUD-001
---

# Route

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 2 ([Routing](https://laravel.com/docs/13.x/routing), [URL Generation](https://laravel.com/docs/13.x/urls)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Quick answer

A Laravel route matches an HTTP method and URI, then dispatches the request to a configured closure, controller action, or other supported route action.

## Where it fits in the flow

The route is the decision point after Laravel boots and applicable global middleware runs. It connects an incoming method and URI to the next action and may add route middleware, parameters, and a name used for URL generation.

`request method + URI -> route match -> route middleware -> action`

## Mental model

Think of a route as a signpost with two required coordinates: method and path. The route name is a reusable label for generating a URL; it is not the action itself.

## Working example

```php
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::get('/items', [ItemController::class, 'index'])
    ->name('items.index');

Route::post('/items', [ItemController::class, 'store'])
    ->name('items.store');
```

`GET /items` dispatches `index`; `POST /items` dispatches `store`. Blade can generate the first URL with `route('items.index')` without hard-coding `/items`.

## What you can safely change

- Change a route URI together with links, forms, tests, or redirects that call it.
- Change a route name together with every `route(...)` reference.
- Change a controller action only when the target public method exists.
- Preserve the HTTP meaning: reads normally use `GET`; state-changing form actions use `POST`, `PUT`, `PATCH`, or `DELETE` as appropriate.

## Common failure and recovery

- **`404 Not Found`.** Confirm the registered URI and any route prefix with `route:list`.
- **`405 Method Not Allowed`.** The path exists but the request method differs; inspect the form method and method spoofing.
- **`Route [name] not defined`.** Compare the exact route name with the Blade, redirect, or test reference.
- **Target class or method error.** Confirm the controller import and public action name.

## How to verify it

- `V-ROUTE-001`: Run `php artisan route:list --path=items` and confirm method, URI, name, middleware, and action.
- `V-ROUTE-002`: Send a request with the registered method and URI and confirm the configured closure or controller action runs.
- `V-ROUTE-003`: Use one wrong method or route name and confirm the mismatch is observable and the intended action does not run.

## Boundaries and version notes

- Reviewed for Laravel 13.x; the method-and-URI matching model is stable across supported recent Laravel versions.
- Named routes generate URLs by name but do not change the dispatched action.
- Middleware, route-model binding, authorization, and domain or prefix groups may affect the request around the action.
- A controller is common but optional; a closure or invokable class can also be a route action.

## AI steering rule

AI should inspect the current request method and URI plus `route:list` before editing a route, and should change only the mismatched route property and its direct callers unless broader routing work is requested.

## Human readability rule

Group related routes, use consistent resource-oriented names, and keep method, URI, action, middleware, and route name easy to scan on one definition.

## Related nodes

- CANON-REQUEST-RESPONSE-001
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CONTROLLER-001
- CANON-BLADE-VIEW-001
- CANON-CRUD-001

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-ROUTE-001.evidence.json`](../evidence/CANON-ROUTE-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
