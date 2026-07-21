---
id: MISSION-HTML-001
title: Your First Human-Readable Web Page
status: public_preview
track: free_mission_pack
level: absolute_beginner
estimated_time: 30-60 minutes
related_nodes:
  - HUMAN-PREFERENCE-001
  - SUPPORT-DIV-001
  - SUPPORT-CLASS-001
  - SUPPORT-ID-001
---

# Mission 1 — Your First Human-Readable Web Page

## Mission goal

Build one small HTML page that is easy for a human to read and edit.

This is not about making something impressive.

This is about learning the first Developer Atlas rule:

> Code should be calm enough that you can come back tomorrow and still understand it.

## What you will build

A single page with:

- a title
- a short introduction
- a small list of things you want to learn
- one note to your future self
- clean indentation and spacing

## Why this matters

Most beginners think coding starts with memorizing commands.

Developer Atlas starts earlier:

- What file am I editing?
- What is the browser reading?
- Can I see the structure?
- Can another human understand this?

If your first file is readable, every later skill becomes less scary.

## Before you start

Create a folder:

```text
atlas-mission-1/
```

Inside it, create a file:

```text
index.html
```

Open the folder in VS Code or your editor.

## Concepts used

- HTML
- element
- indentation
- heading
- paragraph
- list
- class
- human-readable structure

## Build steps

### Step 1 — Add the page skeleton

Put this in `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Atlas Page</title>
</head>
<body>

</body>
</html>
```

### Checkpoint

Open `index.html` in your browser.

You should see an empty page.

That is okay. The browser has a page, but the body has no visible content yet.

---

### Step 2 — Add visible content

Inside `<body>`, add:

```html
<main class="page">
    <h1>My First Atlas Page</h1>

    <p>
        I am learning how a simple HTML file becomes a page in the browser.
    </p>
</main>
```

Your full file should now look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Atlas Page</title>
</head>
<body>
    <main class="page">
        <h1>My First Atlas Page</h1>

        <p>
            I am learning how a simple HTML file becomes a page in the browser.
        </p>
    </main>
</body>
</html>
```

### Checkpoint

Refresh the browser.

You should see:

```text
My First Atlas Page
I am learning how a simple HTML file becomes a page in the browser.
```

---

### Step 3 — Add a learning list

Under the paragraph, add:

```html
<section class="learning-goals">
    <h2>What I want to understand</h2>

    <ul>
        <li>What an HTML file does</li>
        <li>How the browser reads my code</li>
        <li>How indentation makes code easier to read</li>
    </ul>
</section>
```

### Human readability note

The empty lines are intentional.

They separate:

- the main title
- the paragraph
- the learning goals section

Spacing helps the human eye see the structure.

---

### Step 4 — Add a note to your future self

Under the learning goals section, add:

```html
<section class="future-note">
    <h2>Note to future me</h2>

    <p>
        When I feel stuck, I should slow down, find the file I am editing,
        and check one small change at a time.
    </p>
</section>
```

<details>
<summary><strong>Reference: complete final code</strong></summary>

## Final code

Your full file should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Atlas Page</title>
</head>
<body>
    <main class="page">
        <h1>My First Atlas Page</h1>

        <p>
            I am learning how a simple HTML file becomes a page in the browser.
        </p>

        <section class="learning-goals">
            <h2>What I want to understand</h2>

            <ul>
                <li>What an HTML file does</li>
                <li>How the browser reads my code</li>
                <li>How indentation makes code easier to read</li>
            </ul>
        </section>

        <section class="future-note">
            <h2>Note to future me</h2>

            <p>
                When I feel stuck, I should slow down, find the file I am editing,
                and check one small change at a time.
            </p>
        </section>
    </main>
</body>
</html>
```

</details>

<details>
<summary><strong>Need help? Common errors and recovery</strong></summary>

## Common errors

| Problem | Likely cause | Fix |
|---|---|---|
| Browser shows an old version | Page was not refreshed | Press refresh |
| Text appears outside the page structure | Tag placed outside `<body>` | Move visible content inside `<body>` |
| Code looks messy | Indentation not aligned | Use 4 spaces or editor format command |
| Page title in tab is wrong | `<title>` not changed | Edit the `<title>` inside `<head>` |

## Recovery card

When stuck:

1. Stop changing code for a moment.
2. Save the file.
3. Refresh the browser.
4. Check whether your visible content is inside `<body>`.
5. Compare only one section at a time.
6. Ask AI to explain the structure before asking it to rewrite anything.

</details>

<details>
<summary><strong>Optional AI prompts and scope boundaries</strong></summary>

## Safe AI prompts

```text
Explain this HTML file in beginner language. Do not rewrite it yet.
```

```text
Check my indentation and tell me if the structure is readable. Only suggest small changes.
```

```text
I am stuck on Mission 1. Ask me which part I see in the browser before giving me code.
```

## Unsafe AI prompts for this mission

```text
Make this page amazing with animations, Tailwind, JavaScript, and a full design system.
```

Why this is unsafe:

It skips the mission goal. You are learning file structure and readable HTML first.

</details>

## Human Preference check

Before finishing, check:

- [ ] Can I point to the `<head>` and `<body>`?
- [ ] Can I explain what the `<main>` element contains?
- [ ] Is the indentation consistent?
- [ ] Are related pieces grouped together?
- [ ] Did I avoid adding extra features before understanding the basics?

## Completion proof

You are done when you can explain:

1. What file the browser opened.
2. Why the page title appears in the browser tab.
3. Why visible content goes inside `<body>`.
4. How indentation helps humans read code.
5. What you would safely change next.

## Parked ideas

These are useful later, but not now:

- CSS styling
- colors
- JavaScript button
- images
- layout grid
- publishing online

They belong in later missions.
