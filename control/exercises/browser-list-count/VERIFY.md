# Verification instructions

From the repository root:

```bash
npm run verify:control-exercise
```

This dependency-free command verifies that only `index.html` and `script.js` differ between `baseline/` and `project/`, confirms the supplied changed-file and patch path lists, and runs the Node behavior and safety tests.

For browser verification after installing the repository test dependencies:

```bash
npm run test:browser -- tests/control-exercise-browser.spec.mjs
```

The browser checks cover add, complete, undo, reload, remove, singular/plural wording, and literal rendering of HTML-like input.

A command listed here remains **Not run** until its result has actually been observed in the environment where the decision is made.
