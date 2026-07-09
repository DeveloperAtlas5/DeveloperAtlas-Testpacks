# Example — Confirm Before Change

## Situation

AI suggests:

```txt
Let's refactor this into a new store, add routing, and split the app into components.
```

## Problem

That may be a good future idea, but it is too broad for a small mission.

## Better response

```txt
Use the Atlas AI action model.
This sounds like an architecture change.

Use Confirm:
- summarize the proposed change
- explain the risk
- ask me before giving code
```

## Good AI behavior

AI should say something like:

```txt
This is broader than the current mission.
It changes structure and creates new files.
Please confirm before I continue.
```

## Lesson

Use Confirm before:

- architecture changes
- new dependencies
- database changes
- authentication changes
- routing changes
- deleting or moving files
