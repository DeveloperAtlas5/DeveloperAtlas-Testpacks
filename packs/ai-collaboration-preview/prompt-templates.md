# Prompt Templates

Copy one of these into your AI tool.

## Explain first

```txt
Help me understand this before changing code.

Use the Atlas AI action model.
Start with Explain.

Explain:
- what the problem means
- which file probably matters
- what I should check first

Do not write a patch yet.
```

## Suggest options

```txt
Use the Atlas AI action model.
Start with Suggest.

Give me 2 simple options.
For each option, explain:
- what changes
- why it might help
- what risk it has

Do not edit or rewrite code yet.
```

## Small patch only

```txt
Use the Atlas AI action model.
Use Patch only.

Rules:
- change the smallest necessary part
- show the changed filename first
- provide the full relevant code block
- explain why the patch is small
- follow beginner-readable naming and structure
- do not add unrelated features
```

## Confirm before bigger changes

```txt
Use the Atlas AI action model.

If the change affects architecture, file structure, dependencies, database, authentication, routing, or package setup:
- stop
- summarize the plan
- ask me to confirm before giving code
```

## Park scope creep

```txt
Use the Atlas AI action model.

If you notice a useful future improvement, park it under "Later".
Do not build it now unless I ask.

Current goal:
[paste the current goal here]
```

## Refuse unsafe or destructive work

```txt
Use the Atlas AI action model.

If my request could delete data, expose secrets, break access, or make a destructive change:
- refuse that part
- explain why
- suggest the safest next step instead
```
