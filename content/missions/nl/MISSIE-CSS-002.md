# MISSIE-CSS-002 — CSS en visuele structuur

## Missiedoel

Geef je eerste HTML-pagina stijl zodat deze makkelijker te lezen is.

## Waarom dit belangrijk is

HTML geeft structuur.

CSS geeft visuele duidelijkheid.

Goede spacing, contrast en groepering maken code en pagina's menselijker leesbaar.

## Voor je begint

Je hebt nodig:

```text
atlas-doorway/
  index.html
```

Je voegt toe:

```text
style.css
```

## Concepten

- CSS
- selector
- class
- spacing
- visuele groepering
- bestanden koppelen

## Stap 1 — Maak `style.css`

Maak in dezelfde map als `index.html` een nieuw bestand:

```text
style.css
```

## Stap 2 — Koppel CSS aan HTML

Zet dit in de `<head>` van `index.html`:

```html
<link rel="stylesheet" href="style.css">
```

## Stap 3 — Voeg leesbare stijl toe

Zet dit in `style.css`:

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

## Stap 4 — Voeg classes toe aan HTML

Gebruik bijvoorbeeld:

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

## Controlepunt

Open `index.html` in je browser.

Je zou moeten zien:

- de pagina staat gecentreerd
- er is duidelijke spacing
- er is een kaartachtige rand
- de note-sectie heeft een lichte achtergrond

## Veelgemaakte fouten

| Probleem | Waarschijnlijke oorzaak | Oplossing |
|---|---|---|
| Er verandert niets | CSS niet gekoppeld | Controleer `href="style.css"` |
| Een stijl werkt niet | Classnaam klopt niet | Vergelijk `.profile-card` en `class="profile-card"` |
| Pagina oogt krap | Spacing ontbreekt | Controleer `margin` en `padding` |

## Veilige AI-prompt

```text
Leg uit waarom mijn CSS niet zichtbaar is. Herschrijf mijn pagina niet. Controleer alleen de link tag, bestandsnaam en classnamen.
```

## Human Preference check

- [ ] De CSS is duidelijk gekoppeld.
- [ ] Classnamen zeggen wat ze doen.
- [ ] Spacing maakt de pagina beter leesbaar.
- [ ] De pagina is niet onnodig ingewikkeld.

## Bewijs dat je klaar bent

Je kunt uitleggen:

- waar CSS gekoppeld wordt
- waarom `body` de hele pagina beïnvloedt
- waarom `.profile-card` alleen een deel beïnvloedt
- hoe spacing mensen helpt lezen
