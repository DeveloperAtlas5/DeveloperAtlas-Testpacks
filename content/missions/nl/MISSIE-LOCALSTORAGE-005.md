# MISSIE-LOCALSTORAGE-005 — Sla de lijst op met localStorage

## Missiedoel

Sla je DOM-lijst op zodat deze blijft bestaan na refresh.

## Waarom dit belangrijk is

Een pagina zonder opslag vergeet alles na refresh.

`localStorage` is je eerste vorm van persistence: data blijft bestaan nadat de pagina opnieuw laadt.

Later slaat Laravel data op in een database. Deze missie helpt je eerst begrijpen waarom opslaan belangrijk is.

## Voor je begint

Je hebt de DOM-lijst van Missie 4 nodig.

```text
atlas-doorway/
  index.html
  style.css
  script.js
```

## Concepten

- localStorage
- key/value storage
- JSON.stringify
- JSON.parse
- laden bij start
- opslaan na veranderingen

## Stap 1 — Voeg een storage key toe

Zet bovenin `script.js`:

```js
const storageKey = 'atlasPracticeItems'
```

## Stap 2 — Maak een save function

Voeg toe:

```js
function saveItems() {
  localStorage.setItem(storageKey, JSON.stringify(items))
}
```

## Stap 3 — Maak een load function

Voeg toe:

```js
function loadItems() {
  const savedItems = localStorage.getItem(storageKey)

  if (!savedItems) {
    return
  }

  items = JSON.parse(savedItems)
}
```

## Stap 4 — Sla op na elke verandering

Na toevoegen:

```js
addItem(itemName)
saveItems()
renderItems()
```

Na afstrepen of verwijderen:

```js
saveItems()
renderItems()
```

## Stap 5 — Laad bij openen

Zet onderaan `script.js`:

```js
loadItems()
renderItems()
```

## Controlepunt

Test dit:

1. Voeg twee items toe.
2. Streep één item af.
3. Refresh de browser.
4. De items moeten blijven staan.
5. Het afgestreepte item moet afgestreept blijven.

## Veelgemaakte fouten

| Probleem | Waarschijnlijke oorzaak | Oplossing |
|---|---|---|
| Lijst verdwijnt na refresh | `saveItems()` niet aangeroepen | Sla op na add/toggle/remove |
| JSON error | Opgeslagen data is kapot | Verwijder de localStorage key en test opnieuw |
| Data laadt maar toont niet | `renderItems()` ontbreekt na `loadItems()` | Roep allebei onderaan aan |

## Veilige AI-prompt

```text
Leg uit waarom mijn localStorage-lijst niet blijft na refresh. Herschrijf mijn hele script niet. Controleer saveItems, loadItems, JSON.stringify, JSON.parse en renderItems.
```

## Bewijs dat je klaar bent

Je kunt uitleggen:

- waarom localStorage nodig is
- waarom JSON nodig is
- wanneer de lijst wordt opgeslagen
- wanneer de lijst wordt geladen
- waarom dit niet hetzelfde is als een echte database
