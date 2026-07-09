# Example — Small Patch Review

## AI gave you a patch

Before applying it, ask:

```txt
Review this patch against the Atlas AI action model.

Check:
- Is it small?
- Is the filename clear?
- Does it avoid unrelated changes?
- Is the code beginner-readable?
- What should I test after applying it?
```

## Good answer

A good AI answer should include:

```txt
Action: Patch
Changed file: src/App.vue
Why this is small: only localStorage save/load was added
How to test: add a todo, refresh, check if it stays
Risk: browser-only storage, not for sensitive data
```

## Bad answer

A bad AI answer might:

- rewrite the whole app
- add a database
- add login
- change styling unrelated to the bug
- skip testing instructions
- use unclear names

## Lesson

A patch is not good because it is clever.

A patch is good when it is small, clear, reviewable, and testable.
