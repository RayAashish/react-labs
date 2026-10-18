# Lecture 07: useRef vs useState & Direct DOM Access
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
In Java:
- `useState` is like a property with a PropertyChangeListener attached: whenever the setter is called, an event fires and the GUI completely repaints.
- `useRef` is like a plain `private Object value` field or pointer inside a singleton bean. You can mutate `ref.current = 42` as much as you want in memory: it persists across method invocations, but **zero events are emitted and zero repaints happen**.
- Additionally, `useRef` acts as a direct memory pointer to a physical HTML DOM element (like an element reference in a desktop Swing/JavaFX app).

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without useRef for Memory Persistence:** If you store a timer ID or WebSocket connection in ordinary `useState`, clearing or updating it forces unnecessary and costly re-renders of the entire screen.
- **Without useRef for DOM Elements:** You would have to resort to dirty global DOM queries like `document.getElementById("input")`, which breaks React's component encapsulation.
- **Without useRef for Render Counters:** Tracking how many times a component rendered using `useState` would trigger an infinite loop of re-renders.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
import { useRef } from "react";

function FocusDemo() {
  const inputRef = useRef(null); // Direct pointer to DOM node
  const timerIdRef = useRef(null); // Persistent value without re-rendering

  const focusInput = () => inputRef.current.focus();

  return <><input ref={inputRef} /><button onClick={focusInput}>Focus</button></>;
}
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Expecting `useRef` Mutation to Re-render UI
```jsx
// ❌ WRONG: Mutating .current will never repaint the screen
const countRef = useRef(0);
const increment = () => {
  countRef.current += 1; // Number changes in memory, but UI remains unchanged!
};
return <div>{countRef.current}</div>;

// ✅ RIGHT: Use useState if the UI needs to display the updated number
const [count, setCount] = useState(0);
```

### Bug 2: Accessing `ref.current` During Initial Render Body
```jsx
// ❌ WRONG: DOM node is null during initial rendering phase before mount!
const inputRef = useRef(null);
inputRef.current.focus(); // Throws Cannot read properties of null

// ✅ RIGHT: Access DOM refs inside useEffect or event handlers
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

### Bug 3: Re-initializing Expensive Objects in `useRef(new HeavyObject())`
```jsx
// ❌ WRONG: new HeavyObject() executes on EVERY render even though ref ignores it after mount
const heavyRef = useRef(new HeavyObject());

// ✅ RIGHT: Lazy initialization pattern
const heavyRef = useRef(null);
if (heavyRef.current === null) {
  heavyRef.current = new HeavyObject();
}
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is the core difference between `useState` and `useRef`?**  
   Updating `useState` triggers a component re-render to update the UI, while mutating `useRef.current` persists data silently in memory without triggering any re-render.

2. **When should a backend developer use `useRef` instead of `useState`?**  
   Use `useRef` to store non-visual operational data like timer IDs, WebSocket handles, previous state snapshots, or direct DOM node references.

3. **Does modifying `useRef.current` cause child components to re-render?**  
   No, ref updates bypass React's reconciliation engine entirely and produce zero component re-renders.

4. **What is `forwardRef` in React?**  
   It is a higher-order utility that allows a parent component to pass a ref down through a child component directly to an underlying DOM node.

5. **Why can't we just declare a regular JavaScript `let counter = 0` outside the component?**  
   Variables outside the component are shared across all instances on the page; `useRef` is isolated and scoped strictly to that specific component instance.
