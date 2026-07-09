# Beginner-Safe AI Code Review

Use this checklist after AI gives you code.

## 1. Scope check

Ask:

```txt
Did AI only change what I asked for?
```

If AI added extra features, park them.

## 2. File check

Ask:

```txt
Which file changed?
Do I understand why this file changed?
```

If not, ask for Explain.

## 3. Readability check

Ask:

```txt
Are the names clear?
Is the code spaced clearly?
Are the functions small?
Are comments explaining why instead of repeating what?
```

## 4. Test check

Ask:

```txt
What should I click or run to know it works?
```

## 5. Risk check

Ask:

```txt
Could this affect data, login, packages, routing, database, or deployment?
```

If yes, use Confirm before applying.

## 6. Recovery check

Ask:

```txt
What can I undo if this breaks?
```

## Quick decision

```txt
Clear and small → apply/test
Unclear → ask Explain
Too broad → Park
Risky → Confirm
Unsafe → Refuse
```
