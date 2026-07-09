# MISSIE-JAVASCRIPT-003 — JavaScript interactie

## Missiedoel

Voeg één knop toe die tekst op de pagina verandert.

## Waarom dit belangrijk is

HTML maakt structuur.

CSS verandert uiterlijk.

JavaScript verandert gedrag.

Deze missie leert oorzaak en gevolg: de gebruiker klikt, daarna verandert de pagina.

## Voor je begint

Je hebt:

```text
atlas-doorway/
  index.html
  style.css
```

Je voegt toe:

```text
script.js
```

## Concepten

- JavaScript
- script tag
- DOM
- querySelector
- button
- event
- textContent

## Stap 1 — Voeg knop en tekst toe

Zet dit in `.profile-card`:

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

## Stap 2 — Koppel JavaScript aan HTML

Zet dit vlak voor `</body>`:

```html
<script src="script.js"></script>
```

## Stap 3 — Maak `script.js`

Maak een nieuw bestand:

```text
script.js
```

Zet erin:

```js
const messageText = document.querySelector('.message-text')
const changeMessageButton = document.querySelector('.change-message-button')

changeMessageButton.addEventListener('click', () => {
  messageText.textContent = 'You changed the page with JavaScript.'
})
```

## Stap 4 — Kleine CSS-aanvulling

Zet dit in `style.css`:

```css
.interaction-area {
  margin-top: 24px;
}

.change-message-button {
  padding: 10px 14px;
  cursor: pointer;
}
```

## Controlepunt

Open `index.html` in je browser.

Klik op de knop.

De tekst moet veranderen.

## Veelgemaakte fouten

| Probleem | Waarschijnlijke oorzaak | Oplossing |
|---|---|---|
| Knop doet niets | `script.js` niet gekoppeld | Controleer `<script src="script.js"></script>` |
| Console zegt `null` | Classnaam klopt niet | Controleer `.message-text` en `.change-message-button` |
| Tekst verandert niet | Verkeerde property | Gebruik `textContent` |

## Veilige AI-prompt

```text
Leg uit waarom mijn knop de tekst niet verandert. Herschrijf mijn bestanden niet. Controleer de script link, classnamen en event listener.
```

## Human Preference check

- [ ] Variabelen hebben duidelijke namen.
- [ ] JavaScript is overzichtelijk gegroepeerd.
- [ ] De event listener doet één eenvoudige taak.
- [ ] AI heeft geen extra features toegevoegd.

## Bewijs dat je klaar bent

Je kunt uitleggen:

- wat de knop doet
- hoe JavaScript de paragraaf vindt
- wat een event is
- waarom `textContent` de pagina verandert
- hoe HTML, CSS en JavaScript samenwerken
