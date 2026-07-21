# CANON-PHP-VARIABLE-001 — PHP Variable

> **Evidence status — public preview**
> Primary-source mapping: **completed with AI assistance** on 2026-07-12.
> Independent human review: **pending**. Publication status: **public preview, not certification**.
> Sources: 1 ([Variable basics](https://www.php.net/manual/en/language.variables.basics.php)). Automated structure and evidence checks: **passed**.
> Verification designs: 3. Version scope: PHP 8.x.
> Known limitations remain explicit in this node and in the [public limitations](../../../docs/public/known-limitations.md).


## Hover summary

A PHP variable stores a value and starts with `$`.

## One-sentence truth

A PHP variable is identified by a case-sensitive name beginning with $, and it refers to a value in its current scope.

## Mental model

```txt
$pageTitle = 'Groceries';
```

`$pageTitle` is the name. `'Groceries'` is the value.

## Beginner explanation

PHP variables always begin with `$`. The name should tell you why the value exists, not just what type it is.

## Syntax example

```php
$taskName = 'Buy milk';
$itemCount = 3;
$isComplete = false;
```

## Common mistakes

- Naming variables `$data`, `$thing`, or `$x` when a clearer name exists.
- Treating string values like numbers or booleans by accident.
- Forgetting that `$taskName` and `$taskname` are different.

## Suspicious value note

Future inline-learning cards can warn about values like:

```txt
"true" -> string that looks like a boolean
"6"    -> string that looks like an integer
"0.7"  -> string that looks like a float
```

## AI steering rule

AI should preserve meaningful variable names and explain type-like confusion before changing code.

## Human readability rule

A variable name should make the next line easier to understand.

## Related nodes

- CANON-PHP-001
- CANON-JAVASCRIPT-001

## Verification

- `V-PHP-VARIABLE-001`: Assign a known value and confirm the next read or output uses that value.
- `V-PHP-VARIABLE-002`: Change the value once and identify which later expression observes the change.
- `V-PHP-VARIABLE-003`: Check scope and type at the use site instead of assuming the variable is available or unchanged.

## Applicability and boundaries

- PHP variable names are case-sensitive and have defined naming rules.
- Assignment is by value by default, while references have different aliasing behavior.
- Availability depends on scope, and reading an undefined variable produces a warning in current PHP.

## Evidence status

Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See [`../evidence/CANON-PHP-VARIABLE-001.evidence.json`](../evidence/CANON-PHP-VARIABLE-001.evidence.json) for claim mappings, source locations, limitations, and verification contracts.
