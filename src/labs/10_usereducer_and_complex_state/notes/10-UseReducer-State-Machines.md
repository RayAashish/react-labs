# Lecture 10: useReducer & State Machines
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
In Java/Spring architecture:
- `useState` is like having 6 independent setters on a mutable entity (`setItems()`, `setDiscount()`, `setIsLoading()`), making invalid intermediate states possible.
- `useReducer` implements the **Command Pattern** or an **Event-Sourced State Machine**:
  - An **Action** is a command object (e.g. `record AddItemCommand(Item item)`).
  - You dispatch the command via `dispatch(action)`.
  - The **Reducer** is a pure deterministic handler method: `(CurrentState, Command) -> NextState`.
  - Business rules are consolidated in one testable function, exactly like a backend service router.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without useReducer:** Complex screens require 6 to 10 separate `useState` hooks with inter-dependent values that easily fall out of sync (e.g., setting `loading = false` but forgetting `error = null`).
- **Without Predictable State Transitions:** Logic for *how* state changes is scattered across dozens of button click callbacks throughout the JSX.
- **Without Pure Reducers:** Testing state transitions requires rendering full UI components instead of running pure unit tests on a standalone JavaScript function.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INC": return { count: state.count + 1 };
    case "RESET": return { count: 0 };
    default: return state;
  }
}
// Inside Component:
const [state, dispatch] = useReducer(reducer, { count: 0 });
// Trigger action: <button onClick={() => dispatch({ type: "INC" })}>+</button>
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Mutating State Directly Inside the Reducer Function
```jsx
// ❌ WRONG: Reducers MUST be pure functions with zero mutations!
function reducer(state, action) {
  if (action.type === "ADD") {
    state.items.push(action.payload); // Mutating existing state reference!
    return state;
  }
}

// ✅ RIGHT: Return a brand new object copy
function reducer(state, action) {
  if (action.type === "ADD") {
    return { ...state, items: [...state.items, action.payload] };
  }
}
```

### Bug 2: Performing Asynchronous Calls or Side Effects Inside a Reducer
```jsx
// ❌ WRONG: Reducers must be synchronous and deterministic (no network calls!)
function reducer(state, action) {
  if (action.type === "FETCH") {
    fetch("/api/data").then(...); // NEVER do side effects here!
  }
}

// ✅ RIGHT: Perform side effects in useEffect or event handlers, then dispatch results
const data = await fetch("/api/data");
dispatch({ type: "FETCH_SUCCESS", payload: data });
```

### Bug 3: Forgetting the `default` Case in the Switch Statement
```jsx
// ❌ WRONG: Unhandled action types return undefined, corrupting state!
switch (action.type) {
  case "A": return { ...state, a: true };
}

// ✅ RIGHT: Always return current state in default
default:
  return state;
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **When should you choose `useReducer` over `useState`?**  
   Choose `useReducer` when state consists of multiple sub-values, when the next state depends on complex rules involving previous states, or when state transitions need isolated unit testing.

2. **Why must a reducer function in React be pure?**  
   Pure functions ensure that the same inputs always return the exact same output without side-effects, allowing React Concurrent Mode to pause, replay, or discard updates safely.

3. **Can `useReducer` and `useContext` replace Redux in a React application?**  
   Yes, combining `useReducer` for state transitions and `useContext` for global dispatch provides a lightweight Redux-like architecture without third-party libraries.

4. **What is an "Action" in useReducer?**  
   An action is an object that describes *what happened* in the application, conventionally structured with a `type` string and optional `payload` data.

5. **Does dispatching an action in `useReducer` cause an immediate synchronous state update?**  
   No, just like `useState`, `dispatch` queues a state transition that React batches and reconciles on the next render cycle.
