# Review task

A teammate wants a remaining-item count in the local practice list.

1. Open the starting point in `baseline/`.
2. Compare the baseline prompt with the Atlas-controlled instruction.
3. Inspect `proposed/IN_SCOPE_PATCH.diff` and `proposed/OUT_OF_SCOPE_PATCH.diff`.
4. Decide which proposal, if either, respects the Change Contract.
5. Continue to the verification instructions before selecting Accept.

The in-scope proposal is intentionally small. The out-of-scope proposal produces similar visible text but also introduces an external runtime dependency and changes `package.json`, which is not allowed.
