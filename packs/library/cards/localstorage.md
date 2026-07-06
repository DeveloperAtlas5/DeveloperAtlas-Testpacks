# localStorage

**Level:** Rookie

## What it means

localStorage is browser storage that can keep small non-sensitive data after refresh.

## Use it when

Use it for simple browser-only persistence, like a practice todo list.

## Tiny example

```txt
localStorage.setItem('todos', JSON.stringify(todos.value))

const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
```

## Watch out

Do not store passwords, tokens, or private data in localStorage.
