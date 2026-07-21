# Atlas Change Contract

Copy this file for one bounded AI-assisted change. A contract controls the request; it does not grant
an AI permission to act, run commands, or accept its own work.

## Goal

What should be true when this change is complete?

## Allowed scope

List the files or behaviors that may change.

- `path/to/allowed-file`

## Protected boundaries

What must not change?

- No dependency changes.
- No authentication or authorization changes.
- No unrelated cleanup or redesign.

## Acceptance criteria

How will the human know the result is acceptable?

- [ ] The requested behavior is visible.
- [ ] Existing protected behavior is preserved.
- [ ] The change remains understandable to the reviewer.

## Verification

Which checks must be run or inspected, and by whom?

| Check | Required | Result | Observed by |
| --- | --- | --- | --- |
| Maintained test command | Yes | Not run | Human reviewer |
| Allowed-path review | Yes | Pending | Human reviewer |

Never mark a command as passed unless a person or trusted system actually observed it.

## Confirmation boundaries

Which actions require separate human confirmation?

- Deleting data or files.
- Changing dependencies, migrations, public APIs, authentication, or payment behavior.
- Expanding beyond the allowed scope.

## Parked ideas

Record useful suggestions that are explicitly outside this change.

- None yet.
