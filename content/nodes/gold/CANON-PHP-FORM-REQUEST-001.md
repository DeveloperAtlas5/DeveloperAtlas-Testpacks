# CANON-PHP-FORM-REQUEST-001 — Form submission (HTTP input)

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 4 ([HTML form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form), [Variables from external sources](https://www.php.net/manual/en/language.variables.external.php), [Validation](https://laravel.com/docs/13.x/validation)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: HTML form submission; PHP 8.x external variables; Laravel 13.x request validation.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

A browser form sends an HTTP request; PHP or Laravel must treat the submitted fields as untrusted input.

## One-sentence truth

An HTML form submission creates an HTTP request; PHP or Laravel code must read, authorize where applicable, and validate that untrusted input before using or storing it.

## Mental model

```txt
Form input -> Browser request -> Server reads input -> Server validates -> Response
```

## Beginner explanation

A form has a method, action, and named controls. PHP or Laravel reads those names from the incoming request, then applies server-side validation before the values are used.

## Syntax example

```html
<form method="post" action="process.php">
    <input name="task_name" type="text">
    <button type="submit">Save</button>
</form>
```

```php
$taskName = $_POST['task_name'] ?? '';
```

## Laravel example

```php
$validated = $request->validate([
    'task_name' => ['required', 'string', 'max:255'],
]);
```

## Common mistakes

- Not matching input `name` with server-side field name.
- Trusting raw input.
- Forgetting CSRF protection in Laravel forms.

## AI steering rule

AI should explain the form action, method, field names, and validation before adding storage logic.

## Human readability rule

A form should make it obvious where data goes and what each field is called.

## Related nodes

- CANON-LARAVEL-REQUEST-LIFECYCLE-001
- SUPPORT-CSRF-001
- SUPPORT-VALIDATE-001

## Verification

- `V-PHP-FORM-REQUEST-001`: Submit valid input and confirm the controller receives validated data.
- `V-PHP-FORM-REQUEST-002`: Submit invalid input and confirm the request returns the expected errors or redirect.
- `V-PHP-FORM-REQUEST-003`: Inspect the authorization path and confirm it matches the intended caller boundary.

## Applicability and boundaries

- An HTML form submission is not the same thing as Laravel's optional custom Form Request class.
- Client-provided values remain untrusted even when browser validation succeeds.
- Input names, HTTP method, action, CSRF protection, validation, and authorization are separate responsibilities.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-PHP-FORM-REQUEST-001.evidence.json`](../evidence/CANON-PHP-FORM-REQUEST-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
