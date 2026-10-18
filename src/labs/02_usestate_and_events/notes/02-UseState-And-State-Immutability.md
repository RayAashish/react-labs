# Lecture 02: useState & State Immutability
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
In Java, an entity instance has private fields, and changing them does not automatically push a push notification or update client screens. In React, a component's **State** is a monitored variable. 
- Calling `setState()` is like firing an `ApplicationEventPublisher.publishEvent()` in Spring.
- React compares memory references (`oldState === newState`). If the pointer address hasn't changed (e.g. you mutated an array in-place), React assumes **no event occurred** and skips re-rendering.
- Always create a **new copy** (like Java's `Collections.unmodifiableList()` or `record.with(...)`).

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without useState:** Ordinary JavaScript variables reset back to their initial value every time the function component re-runs.
- **Without Immutability:** React's Virtual DOM diffing engine would have to perform a deep recursive inspection of every object on every frame (destroying performance).
- **Without Functional Updates:** Rapid asynchronous clicks or batch events overwrite each other, causing lost updates (race conditions).

---

## 3. The 10-Line Minimal Syntax Template
```jsx
import { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({ name: "Raysi", role: "Dev" });

  const promote = () => {
    // Spread operator creates a brand new memory reference
    setUser(prev => ({ ...prev, role: "Architect" }));
  };
  return <button onClick={promote}>{user.name}: {user.role}</button>;
}
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Mutating Array In-Place
```jsx
// ❌ WRONG: array.push() mutates the same reference; React skips re-render!
const addItem = () => {
  items.push("New Item");
  setItems(items); // Same pointer! oldItems === newItems
};

// ✅ RIGHT: Spread into a new array
const addItem = () => {
  setItems([...items, "New Item"]);
};
```

### Bug 2: Assuming `setState` is Immediately Synchronous
```jsx
// ❌ WRONG: 'count' will NOT reflect the updated value immediately on next line
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Prints OLD count!
};

// ✅ RIGHT: React state updates are scheduled asynchronously; read state in next render or use a local variable
const handleClick = () => {
  const nextCount = count + 1;
  setCount(nextCount);
  console.log(nextCount);
};
```

### Bug 3: Direct Overwrite of Nested Objects
```jsx
// ❌ WRONG: Overwrites entire object, losing other fields
setUser({ role: "ADMIN" }); // name and id are now lost!

// ✅ RIGHT: Spread existing fields first
setUser(prev => ({ ...prev, role: "ADMIN" }));
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **Why does React require state to be immutable?**  
   React uses shallow reference equality (`Object.is`) for lightning-fast diffing; mutating objects in-place breaks this check and prevents UI updates.

2. **What is state batching in React 18?**  
   React automatically groups multiple `setState` calls inside event handlers and promises into a single re-render to optimize browser performance.

3. **When should you pass a callback function to `setState`?**  
   Use `setState(prev => prev + 1)` whenever the new state depends directly on the previous state to avoid stale closure snapshots.

4. **What is a Synthetic Event in React?**  
   It is a cross-browser wrapper around native browser events that provides consistent behavior and event pooling across all browsers.

5. **Why can't we call React Hooks inside `if` conditions or loops?**  
   React relies on the exact fixed call order of Hooks between renders to associate each state slice with its internal fiber node.
