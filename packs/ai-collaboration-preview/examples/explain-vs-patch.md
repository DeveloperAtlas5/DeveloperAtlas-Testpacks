# Example — Explain vs Patch

## Situation

You see this error:

```txt
Cannot read properties of undefined
```

## Bad AI request

```txt
Fix this.
```

Why this is risky:

- AI may rewrite too much
- AI may guess the wrong file
- you may not understand the fix

## Better request

```txt
Use the Atlas AI action model.
Start with Explain.

Explain what "Cannot read properties of undefined" usually means.
Then tell me which file or variable I should inspect first.
Do not patch code yet.
```

## When to switch to Patch

After you understand the likely cause, ask:

```txt
Now use Patch.
Change only the smallest necessary part.
Show the filename first.
Explain why this is enough.
```

## Lesson

Start with Explain when the problem is unclear.

Use Patch only when the target is small enough to review.
