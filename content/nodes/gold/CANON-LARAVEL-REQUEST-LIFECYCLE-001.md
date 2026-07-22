---
id: CANON-LARAVEL-REQUEST-LIFECYCLE-001
title: Laravel Request Lifecycle
status: gold_candidate
type: canon_node
node_depth: gold
category: core_code_concept
level: beginner_to_rookie
content_version: 2
journey_ids:
- JOURNEY-LARAVEL-REQUEST-001
version_scope: Laravel 13.x; PHP 8.3+
version_sensitivity: high
review_due_at: 2026-10-12
user_validation_status: planned
prerequisite_nodes:
- CANON-REQUEST-RESPONSE-001
used_with_nodes:
- CANON-ROUTE-001
- CANON-CONTROLLER-001
- SUPPORT-VALIDATE-001
- CANON-BLADE-VIEW-001
continues_to_nodes:
- CANON-ROUTE-001
deeper_explanation_nodes:
- CANON-CRUD-001
---

# Laravel Request Lifecycle

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 8 ([Request Lifecycle](https://laravel.com/docs/13.x/lifecycle), [Routing](https://laravel.com/docs/13.x/routing), [Controllers](https://laravel.com/docs/13.x/controllers)). Automated structure and evidence checks: **passed**.
> Verification designs: 5. Version scope: Laravel 13.x; PHP 8.3+; Standard Laravel HTTP request lifecycle.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Quick answer

A Laravel HTTP request enters through `public/index.php`, passes through application bootstrap and middleware, reaches a matching route action, and returns a response outward through middleware to the client.

## Where it fits in the flow

This is the map for the full server-side journey. Use it before changing code when you do not yet know whether a failure belongs to the request, middleware, route, action, view, or response.

`client -> public/index.php -> bootstrap -> global middleware -> router -> route middleware -> action -> response -> middleware -> client`

## Mental model

Think of the request as a parcel moving through checkpoints. `public/index.php` receives it, bootstrap prepares the application, middleware may inspect or stop it, the router chooses a destination, the action creates a response, and middleware handles that response on its way out.

The controller and Blade view are common stops, not mandatory ones. A route closure can produce a response directly, and a controller can return JSON, a redirect, a string, or a response object instead of a view.

## Working example

```php
// routes/web.php
use App\Http\Controllers\GroceryController;
use Illuminate\Support\Facades\Route;

Route::get('/groceries', [GroceryController::class, 'index'])
    ->name('groceries.index');
```

```php
// app/Http/Controllers/GroceryController.php
use Illuminate\View\View;

public function index(): View
{
    return view('groceries.index');
}
```

For `GET /groceries`, Laravel boots, runs middleware, matches the route, calls `GroceryController::index()`, renders the view, and sends the resulting response back through middleware.

## What you can safely change

- Change one link in the chain at a time, then verify that exact boundary.
- When changing the URI or method, update the caller and route together.
- When changing the action or view name, update the route or controller reference that points to it.
- Keep the response assertion aligned with the response type: view, redirect, or JSON.

## Common failure and recovery

- **The controller breakpoint never runs.** Confirm the request method and URI with `route:list`, then inspect middleware that can return early.
- **The URI looks right but Laravel rejects the request.** Compare the HTTP method as well as the path.
- **The action runs but the page fails.** Inspect the returned response or view name and the data passed to it.
- **Debugging jumps straight to architecture changes.** Trace the first boundary where expected and observed behavior differ, then make the smallest repair there.

## How to verify it

- `V-LRLC-001`: Run `php artisan route:list --path=groceries` and confirm the expected method, URI, action, and middleware.
- `V-LRLC-002`: Request `/groceries` in a feature test, then assert `200` and `assertViewIs('groceries.index')`.
- `V-LRLC-003`: Add an observable route middleware behavior and confirm it runs before the controller and can return a response without invoking the action.
- `V-LRLC-004`: Send the wrong HTTP method to `/groceries` and confirm `GroceryController::index()` is not invoked.
- `V-LRLC-005`: For JSON or redirect variants, assert status plus `assertJson(...)` or `assertRedirect(...)` instead of asserting a view.

## Boundaries and version notes

- Reviewed for Laravel 13.x, which requires PHP 8.3 or newer within its supported PHP range.
- This article describes the normal HTTP lifecycle; console commands use the console path.
- Application middleware and long-running runtimes can add operational detail without changing the core request-to-response model.
- Route closures, controllers, Blade, JSON, and redirects are alternatives at specific points, not universal stages.

## AI steering rule

Before changing a Laravel request-flow bug, AI should identify the observed method and URI, matching route, applicable middleware, route action, and returned response; it should not assume the controller ran or introduce new architecture before locating the first broken boundary.

## Human readability rule

Present the method, URI, middleware, action, response type, and verification result as one traceable request-to-response chain.

## Related nodes

- CANON-REQUEST-RESPONSE-001
- CANON-ROUTE-001
- CANON-CONTROLLER-001
- SUPPORT-VALIDATE-001
- CANON-BLADE-VIEW-001
- CANON-CRUD-001

## Evidence status

Primary-source reviewed on 2026-07-12 for Laravel 13.x. Independent human review is pending. See [`../evidence/CANON-LARAVEL-REQUEST-LIFECYCLE-001.evidence.json`](../evidence/CANON-LARAVEL-REQUEST-LIFECYCLE-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
