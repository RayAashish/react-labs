# Lecture 11: useMemo, useCallback & Custom Hooks
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
- **`useMemo`:** Think of Spring's `@Cacheable(value = "heavyQuery", key = "#id")`. It caches the **return value** of a function so that expensive calculations aren't repeated on unrelated renders.
- **`useCallback`:** Think of a **Singleton Method Reference** in Java. In React, every re-render recreates all local functions, generating new memory references. `useCallback` preserves the exact same function reference across renders so child components wrapped in `React.memo` skip re-rendering.
- **Custom Hooks:** Think of a **Spring `@Service` or Helper Bean**. It encapsulates stateful logic (`useState`, `useEffect`) into a reusable function (e.g. `useFetch(url)`) that can be shared across 20 components with 1 line of code.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without useMemo:** Typing in a search box or toggling dark mode forces React to re-calculate heavy math or filter 10,000 array items on every single keystroke.
- **Without useCallback:** Passing an inline callback `<Child onClick={() => doSomething()} />` breaks child memoization (`React.memo`) because the function address changes on every render.
- **Without Custom Hooks:** Every component that fetches data would have to duplicate 25 lines of boilerplate (`useState(data)`, `useState(loading)`, `useState(error)`, and `useEffect`).

---

## 3. The 10-Line Minimal Syntax Template
```jsx
// 1. useMemo: Caches a calculated value
const cachedCalculation = useMemo(() => heavyMath(value), [value]);

// 2. useCallback: Caches a function definition
const handleAction = useCallback(() => doWork(id), [id]);

// 3. Custom Hook: Reusable stateful unit
function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);
  return [open, () => setOpen(prev => !prev)];
}
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Premature Optimization (Wrapping Cheap Operations in `useMemo`)
```jsx
// ❌ WRONG: Wrapping a simple addition in useMemo adds more overhead than it saves!
const total = useMemo(() => a + b, [a, b]);

// ✅ RIGHT: Compute primitive operations directly
const total = a + b;
```

### Bug 2: Using `useCallback` Without Wrapping Child in `React.memo`
```jsx
// ❌ WRONG: Using useCallback on parent prop does nothing if Child is not memoized!
const handleClick = useCallback(() => {}, []);
return <RegularChild onClick={handleClick} />; // RegularChild re-renders anyway!

// ✅ RIGHT: Wrap child component in React.memo
const MemoChild = React.memo(RegularChild);
```

### Bug 3: Missing State Dependencies Inside `useCallback`
```jsx
// ❌ WRONG: Empty dependency array captures stale initial count forever
const increment = useCallback(() => {
  setCount(count + 1); // Reads initial count (0) on every click!
}, []);

// ✅ RIGHT: Use functional updater
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is the exact difference between `useMemo` and `useCallback`?**  
   `useMemo` caches the *result* of calling a function; `useCallback` caches the *function reference itself* without executing it.

2. **Does `React.memo` guarantee that a component will never re-render?**  
   No, `React.memo` only skips rendering if props have shallow equality; if internal state changes or consumed Context updates, it still re-renders.

3. **What is the Golden Rule of Custom Hooks?**  
   A custom hook must start with the prefix `use` (e.g. `useAuth`, `useFetch`) so the React compiler can enforce the official Rules of Hooks on it.

4. **Do two components using the same Custom Hook share the exact same state?**  
   No, custom hooks reuse *stateful logic*, not state data; each component invoking the hook receives its own isolated slice of state.

5. **When should you avoid using `useMemo` and `useCallback`?**  
   Avoid them for cheap calculations and components that re-render rarely, as the dependency tracking and memory overhead will exceed the performance savings.
