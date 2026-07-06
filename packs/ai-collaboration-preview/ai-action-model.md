# The Atlas AI Action Model

AI coding help becomes safer when you choose the right type of help.

Use these six actions.

## 1. Explain

Use when you do not understand something yet.

Ask AI to explain before changing code.

Example:

```txt
Explain this error in beginner-friendly language. Do not suggest code changes yet.
```

## 2. Suggest

Use when you want options, but no code edits yet.

Example:

```txt
Suggest two simple ways to fix this. Do not write the full code yet.
```

## 3. Patch

Use when you want a small code change.

A patch should be narrow and reviewable.

Example:

```txt
Patch only the smallest necessary change. Show the filename first and explain why this is enough.
```

## 4. Confirm

Use before risky or unclear changes.

Example:

```txt
Before changing architecture, ask me to confirm the plan.
```

## 5. Park

Use when AI suggests a bigger idea that is useful but not for now.

Example:

```txt
Park this idea as a future improvement. Do not build it in this mission.
```

## 6. Refuse

Use when the request is unsafe, destructive, private, or out of scope.

Example:

```txt
If the requested change could delete data or expose secrets, refuse and explain the safer alternative.
```

## Simple rule

```txt
If you are unsure, start with Explain.
If the change is small and clear, Patch.
If the change is risky or broad, Confirm or Park.
```
