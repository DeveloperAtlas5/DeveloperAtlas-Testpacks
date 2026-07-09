# MISSION-CSS-002 — CSS and Visual Structure

## Mission goal

Style your first HTML page so it becomes easier to read and nicer to look at.

## Why this matters

HTML gives a page structure.

CSS gives that structure visual meaning.

A human-readable page uses spacing, contrast, and grouping so the reader understands what belongs together.

## Before you start

You need the files from Mission 1:

```text
atlas-doorway/
  index.html
```

In this mission, you will add:

```text
atlas-doorway/
  index.html
  style.css
```

## Concepts used

- CSS
- selector
- class
- spacing
- visual grouping
- linked files

## Step 1 — Create `style.css`

In the same folder as `index.html`, create a new file:

```text
style.css
```

## Step 2 — Link CSS to HTML

Inside the `<head>` of `index.html`, add:

```html
<link rel="stylesheet" href="style.css">
```

Your head could look like this:

```html
<head>
  <meta charset="UTF-8">
  <title>My First Atlas Page</title>
  <link rel="stylesheet" href="style.css">
</head>
```

## Step 3 — Add a readable page layout

Open `style.css` and add:

```css
body {
  font-family: Arial, sans-serif;
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
  line-height: 1.6;
}

.profile-card {
  border: 1px solid #dddddd;
  border-radius: 12px;
  padding: 24px;
}

.note {
  margin-top: 20px;
  padding: 12px;
  background: #f5f5f5;
}
```

## Step 4 — Add classes to your HTML

Update your HTML so the main content has readable groups:

```html
<body>
  <main class="profile-card">
    <h1>Hello, I am learning code</h1>

    <p>
      This is my first Developer Atlas page.
      I am learning how files connect.
    </p>

    <section class="note">
      <h2>What I learned</h2>
      <p>HTML gives the page structure. CSS changes how it looks.</p>
    </section>
  </main>
</body>
```

## Checkpoint

Open `index.html` in your browser.

You should see:

- the page centered
- readable spacing
- a card-like border
- a light note section

## Common errors

| Problem | Likely cause | Fix |
|---|---|---|
| Nothing changed | CSS file is not linked | Check `href="style.css"` |
| Some styles work, others do not | Class name mismatch | Compare `.profile-card` with `class="profile-card"` |
| Page looks cramped | Missing padding or margin | Check the `body` and `.profile-card` rules |

## Recovery card

When stuck:

1. Stop changing code.
2. Check that `style.css` is in the same folder as `index.html`.
3. Check the `<link>` tag.
4. Check class spelling.
5. Refresh the browser.

## Safe AI prompts

```text
Explain why my CSS is not showing. Do not rewrite my whole page. Check only the link tag, file name, and class names.
```

```text
Suggest one small readability improvement for this CSS. Keep the beginner style and explain the reason.
```

## Human Preference check

- [ ] The CSS file is connected clearly.
- [ ] Class names explain purpose.
- [ ] Spacing makes the page easier to scan.
- [ ] The page is not overdesigned.
- [ ] The learner can explain what CSS changed.

## Completion proof

You can explain:

- where CSS is linked
- why `body` affects the whole page
- why `.profile-card` only affects one part
- how spacing helps humans read
