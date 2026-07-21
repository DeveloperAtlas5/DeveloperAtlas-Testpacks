# Runnable examples

These examples are supporting learning material. Start with the
[15-minute Atlas Control exercise](../TRY_ATLAS.md) for the flagship product demonstration.

| Example | Run method | Concepts | Related mission | Security notes |
| --- | --- | --- | --- | --- |
| [Browser practice list](browser-list-starter/) | Run `npm test`, then open through the included local server | DOM, events, localStorage | [DOM List](../content/missions/en/MISSION-DOM-LIST-004.md) | User text is rendered with `textContent`; browser regression covers HTML-like input |
| [HTML/CSS/JS starter](html-css-js-starter/) | Open `index.html` or use the local server | Structure, styles, click event | [Mission 1](../content/missions/free/MISSION-HTML-001.md) | Fixed text only; no network or persistence |

From the repository root:

```bash
npm ci
npx playwright install chromium
npm test
```

The automated test adds, completes, removes, and reloads an item and confirms HTML-like input is
displayed as plain text.
