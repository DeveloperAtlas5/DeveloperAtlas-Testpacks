# Vue Component

**Level:** Rookie

## What it means

A component is a reusable piece of UI with its own template, logic, and style.

## Use it when

Use a component when part of the page has a clear job, like one todo item or a stats panel.

## Tiny example

```txt
<TodoItem
  v-for="todo in todos"
  :key="todo.id"
  :todo="todo"
/>
```

## Watch out

Do not split everything too early. Split when responsibility is clear.
