# CANON-PHP-001 — PHP

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 2 ([A simple PHP tutorial](https://www.php.net/manual/en/tutorial.php), [Command line usage](https://www.php.net/manual/en/features.commandline.php)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: PHP 8.x web execution; PHP 8.x CLI.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

PHP is a general-purpose scripting language; in this node, it runs on the server and produces part of the browser response.

## One-sentence truth

PHP is a general-purpose scripting language; in a typical web request it executes on the server and contributes to the response sent to the client.

## Mental model

```txt
Browser request -> PHP runs on server -> HTML response -> Browser displays page
```

## Beginner explanation

PHP is not the same as HTML. HTML is what the browser receives. PHP is code the server runs to decide what HTML or data to send.

## Syntax example

```php
<?php
$message = 'Hello from PHP';
?>

<p><?= $message ?></p>
```

## Common mistakes

- Opening a PHP file directly in the browser instead of using a PHP server.
- Mixing PHP and HTML so tightly that the file becomes hard to read.
- Using unclear variable names.

## AI steering rule

AI should explain whether code runs on the server or in the browser before suggesting a PHP fix.

## Human readability rule

Keep PHP values named clearly and keep output points easy to see.

## Related nodes

- CANON-PHP-VARIABLE-001
- SUPPORT-PHP-TAG-001
- SUPPORT-ECHO-001

## Verification

- `V-PHP-001`: Run the smallest PHP example or focused test and compare its output with the expected value.
- `V-PHP-002`: Check one conditional, function, or input boundary used by the example.
- `V-PHP-003`: Run PHP syntax checking on the changed file before treating the example as valid.

## Applicability and boundaries

- PHP can also run from the command line, so server-side web execution is this node's scope rather than PHP's only mode.
- The browser receives PHP output, not the PHP source that generated it.
- Output encoding and trust boundaries still matter when PHP emits user-controlled data.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-PHP-001.evidence.json`](../evidence/CANON-PHP-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
