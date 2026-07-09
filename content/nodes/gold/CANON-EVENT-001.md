# CANON-EVENT-001 — Event

## Hover summary

An event is something that happens, like a click.

## One-sentence truth

An event lets JavaScript respond when a user or browser action happens.

## Mental model

An event listener is like saying: “When this happens, run this code.”

## Beginner explanation

A button click is an event. JavaScript can wait for that click and then do something.

```js
changeMessageButton.addEventListener('click', () => {
  messageText.textContent = 'Clicked.'
})
```

## Technical explanation

`addEventListener` registers a callback function for a specific event type on a DOM element.

## When to use it

Use events when code should run after a user action.

## Common mistakes

- Calling the function immediately instead of waiting.
- Listening on the wrong element.
- Trying to do many actions inside one unclear listener.

## AI steering rule

AI should keep event examples focused on one clear cause and one clear effect.

## Human readability rule

Event listener code should make the trigger and result obvious.

## Related nodes

- CANON-JAVASCRIPT-001
- CANON-DOM-001
- SUPPORT-ADDEVENTLISTENER-001
