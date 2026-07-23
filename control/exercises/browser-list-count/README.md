# Controlled change exercise: remaining item count

This is the first public Control exercise that can progress from a bounded request to real runnable verification.

## Start

1. Read [`TASK.md`](TASK.md).
2. Review the [`CHANGE_CONTRACT.md`](CHANGE_CONTRACT.md).
3. Compare the [`BASELINE_PROMPT.md`](BASELINE_PROMPT.md) with the [`ATLAS_INSTRUCTION.md`](ATLAS_INSTRUCTION.md).
4. Inspect both proposals in [`proposed/`](proposed/).
5. Use the changed-file records in [`records/`](records/) to perform the scope review.

The `baseline/` and verified `project/` folders are browser-only local lists. It has no network calls, dependencies, account, backend, or telemetry. User-entered text is assigned through `textContent`.

## Expected scope decision

- `IN_SCOPE_PATCH.diff` changes only the two allowed files and uses existing browser APIs.
- `OUT_OF_SCOPE_PATCH.diff` changes the root `package.json` and introduces a dependency, violating explicit boundaries.

A scope-conforming patch is not automatically accepted. Continue with the maintained verification in the next section of this exercise before recording a final decision.

## Verification and maintained decision

- [Run the verification](VERIFY.md)
- [Review the maintained evidence record](EVIDENCE_RECORD.md)
- [Review the maintained Accept decision](DECISION_RECORD.md)
