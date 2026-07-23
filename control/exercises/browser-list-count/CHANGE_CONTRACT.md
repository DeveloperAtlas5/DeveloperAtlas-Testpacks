# Atlas Change Contract — remaining item count

## Human goal

Show how many practice-list items remain incomplete so a reviewer can understand progress at a glance.

## Allowed files

- `control/exercises/browser-list-count/project/index.html`
- `control/exercises/browser-list-count/project/script.js`

## Protected boundaries

- Preserve the `atlasPracticeItems` localStorage key and stored data shape.
- Preserve add, complete, undo, remove, reload, and literal text rendering behavior.
- Do not add dependencies, network requests, accounts, analytics, or unrelated styling.
- Do not change files outside the two-file allowlist.

## Acceptance criteria

- A visible status line reports the number of incomplete items.
- It reads `0 items remaining` when the list is empty or every item is complete.
- It uses `1 item remaining` for the singular case.
- It updates after adding, completing, undoing, removing, and reloading items.
- HTML-like user input continues to render as literal text.

## Required verification

- Confirm the exact changed-file list.
- Run the maintained Node behavior tests.
- Run browser lifecycle and HTML-like-input smoke checks.

## Parked ideas

- Progress bars, categories, due dates, animations, cloud sync, and user accounts.
