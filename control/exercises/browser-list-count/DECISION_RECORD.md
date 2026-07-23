# Atlas Decision Record — maintained public example

## Decision

**Accept** the in-scope proposal as the verified reference outcome for this synthetic exercise.

## Accountable role

Developer Atlas public-preview maintainer.

## Evidence reviewed

- Exact changed-file and patch-path verification: Passed.
- Dependency-free Node behavior and safety tests: Passed.
- Chromium DOM lifecycle and HTML-like-input smoke checks: Passed with documented sandbox shims.
- Hosted-origin Playwright specification: Prepared for CI; not run in the local implementation sandbox.
- Independent human review: Pending.

## Rationale

The candidate changes only the two allowed files, preserves the protected list behavior and storage format, meets the remaining-count criteria, and has observed behavior and DOM-safety evidence. The remaining hosted-origin run is a release gate rather than an undisclosed pass, and its local absence is preserved explicitly.

## Required next action

Run the full repository test workflow in GitHub Actions before publishing a release artifact, preserve the CI result with the pull request, and seek independent review of the exercise wording and expected decision.
