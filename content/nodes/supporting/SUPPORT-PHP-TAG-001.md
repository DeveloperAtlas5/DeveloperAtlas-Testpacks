# SUPPORT-PHP-TAG-001 — PHP Tag

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([PHP tags](https://www.php.net/manual/en/language.basic-syntax.phptags.php)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: PHP 8.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

The `<?php` opening tag tells the PHP parser where PHP code begins; in PHP-only files the closing tag is commonly omitted to avoid accidental output.

## Beginner explanation

Use `<?php` at the start of pure PHP files and avoid closing it in pure PHP files.

## Syntax example

```php
<?php

$message = 'Hello';
```

## Common mistake

Using this feature without understanding which folder, file, or response it affects.

## AI steering rule

AI should connect `PHP Tag` to `CANON-PHP-001` and keep the explanation inside the current task.

## Verification

- `V-PHP-TAG-001` — Run `php -l` on a PHP-only file that begins with `<?php`.
- `V-PHP-TAG-002` — Inspect the file bytes after the final PHP statement and confirm there is no closing tag or accidental output.
- `V-PHP-TAG-003` — Create an isolated mixed PHP/HTML example and confirm only content outside or echoed inside tags is output.

## Related nodes

- `CANON-PHP-001`

## Human readability rule

Keep PHP boundaries visible and avoid switching repeatedly between PHP and markup in one small block.

## Applicability and boundaries

- Use the full `<?php` opening tag for portable PHP source.
- Omit the closing tag in PHP-only files; mixed PHP and HTML templates have different boundary needs.
- Whitespace or bytes outside PHP tags become output and can interfere with headers or responses.

## Evidence status

Primary-source reviewed on 2026-07-12. Claim-level sources, scope, and verification mappings are recorded in [SUPPORT-PHP-TAG-001.evidence.json](../evidence/SUPPORT-PHP-TAG-001.evidence.json). Independent human review and any promotion decision remain pending.
