# Atlas Evidence Record — maintained public example

> This record documents repository-maintainer verification performed for the public example on 2026-07-23. It is automated project evidence, not independent human review or proof about another environment.

## Scope review

- **Passed:** the baseline-to-project comparison reports changes only in `project/index.html` and `project/script.js`.
- **Passed:** `IN_SCOPE_CHANGED_FILES.txt` matches those two paths.
- **Passed:** `IN_SCOPE_PATCH.diff` declares those two paths and no others.

## Dependency-free behavior verification

- **Passed:** initial state reports `0 items remaining`.
- **Passed:** add, complete, undo, remove, singular, and plural behavior passed.
- **Passed:** stored state reload counts only incomplete items.
- **Passed:** HTML-like names remain literal text.

## Chromium DOM smoke verification

- **Passed:** the actual candidate HTML, CSS, and JavaScript were loaded in headless Chromium.
- **Passed:** add, complete, undo, simulated reload from preserved storage, and HTML-like-input checks passed.
- **Limitation:** the sandbox blocks navigation to local and synthetic origins, so the smoke run supplied in-memory `localStorage` and `crypto.randomUUID` shims before loading the unchanged candidate files.
- **Not run locally:** the maintained hosted-origin Playwright specification. It is included for repository CI and release verification.

## Known limitations

- The local Chromium smoke does not replace the hosted-origin Playwright run on GitHub Actions.
- No independent reviewer has verified this example yet.
- Control Lite did not execute these checks; results were recorded after separate maintained verification.
