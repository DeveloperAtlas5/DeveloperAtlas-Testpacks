# Vue State

**Level:** Rookie

## What it means

State is data the app remembers while it is running. In Vue, state often lives in ref or reactive.

## Use it when

Use state for values that can change, like todos, input text, filters, or counters.

## Tiny example

```txt
const todos = ref([])
const newTodoText = ref('')
```

## Watch out

If you use normal variables, Vue may not update the screen.
