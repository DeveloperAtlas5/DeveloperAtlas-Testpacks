# SUPPORT-REDIRECT-001 — Redirect

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 2 ([HTTP Responses](https://laravel.com/docs/13.x/responses), [HTTP Tests](https://laravel.com/docs/13.x/http-tests)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: Laravel 13.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

A Laravel redirect response instructs the client to make a subsequent request to another URL.

## Beginner explanation

Use redirects after successful form submits so refresh does not resubmit the form.

## Syntax example

```php
return redirect()->route('groceries.index');
```

## Common mistake

Using this feature without understanding which folder, file, or response it affects.

## AI steering rule

AI should connect `Redirect` to `CANON-CONTROLLER-001` and keep the explanation inside the current task.

## Verification

- `V-REDIRECT-001` — Run the focused request and assert that the response is a redirect.
- `V-REDIRECT-002` — Assert the exact redirect destination or named route URL.
- `V-REDIRECT-003` — Follow the redirect in an integration test and confirm the destination response separately.

## Related nodes

- `CANON-CONTROLLER-001`
- `CANON-ROUTE-001`

## Human readability rule

Name the destination route or URL clearly and keep the redirect close to the completed action.

## Applicability and boundaries

- Return the redirect response from the route or controller action.
- Use a named route when it communicates a stable application destination better than a hard-coded path.
- Choose redirect status and flash/session behavior intentionally; do not assume every redirect is equivalent.

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [SUPPORT-REDIRECT-001.evidence.json](../evidence/SUPPORT-REDIRECT-001.evidence.json). Independent human review and any promotion decision remain pending.
