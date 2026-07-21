---

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 3 ([Controllers](https://laravel.com/docs/13.x/controllers), [Routing](https://laravel.com/docs/13.x/routing), [Validation](https://laravel.com/docs/13.x/validation)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).

id: CANON-CONTROLLER-001
title: Controller
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
- CANON-ROUTE-001
used_with_nodes:
- SUPPORT-VALIDATE-001
- CANON-BLADE-VIEW-001
continues_to_nodes:
- SUPPORT-VALIDATE-001
- CANON-BLADE-VIEW-001
deeper_explanation_nodes:
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CRUD-001
---

# Controller

## Quick answer

A Laravel controller groups related request-handling methods. When a controller route matches, Laravel invokes the configured public action, which coordinates the work needed to return a response.

## Where it fits in the flow

The controller comes after route matching and route middleware. It receives request context, may validate or authorize input and call models or services, then returns a view, redirect, JSON response, or another supported response.

`matched route -> controller action -> application work -> response`

## Mental model

Think of a controller action as a coordinator at a service desk. It accepts a specific request, sends work to the right place, and returns the result. It should make the sequence visible without becoming the home for every business rule.

## Working example

```php
namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\View\View;

class ItemController extends Controller
{
    public function index(): View
    {
        $items = Item::query()->latest()->get();

        return view('items.index', ['items' => $items]);
    }
}
```

The route selects `index()`. The action obtains the items and passes them to `resources/views/items/index.blade.php` under the name `$items`.

## What you can safely change

- Change one action's query, validation, or response while keeping its route contract visible.
- Rename passed view data together with the Blade variable that receives it.
- Rename an action together with the route that references it.
- Extract business logic only when the action has a clear, repeated responsibility that benefits from a separate class.

## Common failure and recovery

- **Target class or method does not exist.** Confirm the route import, controller namespace, class, and public action name.
- **Blade reports an undefined variable.** Compare the controller's view-data key with the variable used in the template.
- **A valid request works but invalid input behaves unpredictably.** Make validation and the rejected path explicit before persistence.
- **The controller is difficult to scan.** Separate visible blocks for validation, data preparation, action, and response before introducing more architecture.

## How to verify it

- `V-CONTROLLER-001`: Send a request through the mapped route and confirm the intended public controller action handles it.
- `V-CONTROLLER-002`: Exercise one valid path and one rejected or missing-input path and confirm their different responses.
- `V-CONTROLLER-003`: Assert the smallest observable contract: status, redirect, view name, essential view data, or JSON data.

## Boundaries and version notes

- Reviewed for Laravel 13.x; controllers remain optional because routes may use closures or invokable classes.
- A controller does not automatically validate, authorize, or persist data.
- Laravel controllers do not have to extend the framework's base controller class.
- Services, jobs, and repositories may be appropriate later, but they are not prerequisites for a readable beginner controller.

## AI steering rule

AI should confirm the mapped route, action contract, input, and expected response before editing a controller, keep the change inside the focused action, and avoid adding service or repository layers unless the responsibility or user request requires them.

## Human readability rule

Keep controller actions short enough to scan and organize them as visible input, validation or authorization, data preparation, operation, and response blocks.

## Related nodes

- CANON-ROUTE-001
- SUPPORT-VALIDATE-001
- CANON-BLADE-VIEW-001
- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- CANON-CRUD-001
- CANON-FUNCTION-001

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-CONTROLLER-001.evidence.json`](../evidence/CANON-CONTROLLER-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
