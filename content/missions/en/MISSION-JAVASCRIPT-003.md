# MISSION-JAVASCRIPT-003 — JavaScript Interaction

## Mission goal

Add one button that changes text on the page.

## Why this matters

HTML creates structure.

CSS changes appearance.

JavaScript changes behavior.

This mission teaches cause and effect: the user clicks a button, and the page changes.

## Before you start

You need:

```text
atlas-doorway/
  index.html
  style.css
```

In this mission, you will add:

```text
atlas-doorway/
  index.html
  style.css
  script.js
```

## Concepts used

- JavaScript
- script tag
- DOM
- querySelector
- button
- event
- textContent

## Step 1 — Add a button and message to HTML

Inside your `.profile-card`, add:

```html
<section class="interaction-area">
  <h2>Small interaction</h2>

  <p class="message-text">
    This message will change when you click the button.
  </p>

  <button class="change-message-button">
    Change message
  </button>
</section>
```

## Step 2 — Link JavaScript to HTML

Before the closing `</body>` tag, add:

```html
<script src="script.js"></script>
```

Putting the script at the bottom helps the browser load the HTML before JavaScript tries to find elements.

## Step 3 — Create `script.js`

Create a new file:

```text
script.js
```

Add:

```js
const messageText = document.querySelector('.message-text')
const changeMessageButton = document.querySelector('.change-message-button')

changeMessageButton.addEventListener('click', () => {
  messageText.textContent = 'You changed the page with JavaScript.'
})
```

## Step 4 — Optional readable CSS

Add this to `style.css`:

```css
.interaction-area {
  margin-top: 24px;
}

.change-message-button {
  padding: 10px 14px;
  cursor: pointer;
}
```

## Checkpoint

Open `index.html` in the browser.

Click the button.

The message should change.

## Common errors

| Problem | Likely cause | Fix |
|---|---|---|
| Button does nothing | `script.js` not linked | Check `<script src="script.js"></script>` |
| Console says `null` | Class name mismatch | Check `.message-text` and `.change-message-button` |
| Text does not change | Wrong property | Use `textContent` |

## Recovery card

When stuck:

1. Stop editing.
2. Check that `script.js` is in the same folder.
3. Check the script tag.
4. Check class names in HTML and JavaScript.
5. Open the browser console and read the first error.

## Safe AI prompts

```text
Explain why my button does not change the text. Do not rewrite my files. Check the script link, class names, and event listener.
```

```text
Suggest the smallest fix for this JavaScript error. Preserve my current beginner structure.
```

## Human Preference check

- [ ] Variable names explain what they hold.
- [ ] JavaScript is grouped clearly.
- [ ] The event listener does one simple job.
- [ ] AI did not add extra features.
- [ ] The learner can explain cause and effect.

## Completion proof

You can explain:

- what the button does
- how JavaScript finds the paragraph
- what an event is
- why `textContent` changes the page
- how HTML, CSS, and JavaScript connect
