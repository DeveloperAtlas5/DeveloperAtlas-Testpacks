# Atlas-controlled instruction

## Goal

Show a short review-ready explanation on the existing status page without changing routing,
authentication, dependencies, or unrelated UI.

## Allowed files

- `app/Http/Controllers/StatusController.php`
- `resources/views/status.blade.php`

## Protected boundaries

- Preserve the `/status` route, route name, controller class, and `show` method signature.
- Do not change dependencies, middleware, authentication, authorization, tests, layouts, or styles.
- Do not create files or edit any path not listed above.

## Acceptance criteria

- The heading reads “Ready for review.”
- A short sentence explains that the application is running and awaits a human check.
- Blade continues to escape displayed values.
- The patch remains limited to the two allowed files.

## Verification

- Show the exact changed-file list.
- Run `php artisan test` only if a real Laravel workspace and explicit human approval are available.
- Never claim the command passed unless its result was actually observed.
- Explain any check that was not run.

## Parked ideas

Park color changes, status polling, API endpoints, dashboards, and deployment integrations for a
separate contract.
