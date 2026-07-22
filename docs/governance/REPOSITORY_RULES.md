# Repository merge rules

Developer Atlas should demonstrate the same human-control process that it asks users to follow.
A material change is mergeable only after its scope, evidence, and accountable decision are explicit.

## Required GitHub rules for `main`

Create a branch ruleset for `main` with these protections:

- require a pull request before merging;
- require the status checks `Public boundary / validate` and `PR control / enforce`;
- require all review conversations to be resolved;
- block force pushes and branch deletion;
- do not allow a merge while either required check is pending or failing;
- limit bypass to a documented emergency recovery procedure.

The repository files define and test the checks, but GitHub branch protection is a repository setting and
must be enabled once by an administrator. A green check is automated evidence, not independent human review.

## Pull-request lifecycle

1. Open the change as a draft and complete the Change Contract.
2. Keep every unobserved check marked **Not run**.
3. Record exact changed files and observed verification.
4. Select **Accept**, **Revise**, or **Reject**.
5. Name the accountable human maintainer and record the rationale.
6. Mark the merge confirmation only after required checks and manual review have passed.
7. Merge only when both required GitHub checks are green.

The `PR control` workflow intentionally permits incomplete draft pull requests. It enforces the completed
record when a pull request is marked ready for review.
