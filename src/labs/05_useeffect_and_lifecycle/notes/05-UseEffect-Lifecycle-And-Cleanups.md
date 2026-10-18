# Lecture 05: useEffect Lifecycle & Cleanups
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
Think of a React component's lifecycle like a Spring Bean lifecycle:
- **Mount (`useEffect(..., [])`):** Equivalent to `@PostConstruct` or `InitializingBean.afterPropertiesSet()`. Runs once after initial render.
- **Update (`useEffect(..., [dependency])`):** Equivalent to a conditional event listener (e.g. `@EventListener(condition = "...")`) that re-triggers whenever specified parameters change.
- **Cleanup (`return () => {...}`):** Equivalent to `@PreDestroy` or `AutoCloseable.close()`. Tears down WebSockets, intervals, and event listeners before the component is destroyed.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without useEffect:** Side effects (like network calls, DOM manipulation, or timers) placed directly inside the component body run on *every single render*—blocking the UI and spamming servers.
- **Without Dependency Arrays:** Functions execute in endless infinite loops if the effect modifies a state variable it didn't track.
- **Without Cleanup Functions:** Lingering timers, event listeners, or WebSocket subscriptions continue executing in memory after the user leaves the screen, causing massive memory leaks.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
useEffect(() => {
  // 1. Setup / Mount phase (like @PostConstruct)
  const timer = setInterval(() => console.log("Tick"), 1000);

  // 2. Teardown / Cleanup phase (like @PreDestroy)
  return () => {
    clearInterval(timer);
  };
}, [/* dependencies array */]);
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Missing Dependency Leading to Stale Closures
```jsx
// ❌ WRONG: 'userId' is read inside effect but omitted from deps array
useEffect(() => {
  fetchUserData(userId);
}, []); // Won't re-fetch when userId changes!

// ✅ RIGHT: Include all variables read inside the effect
useEffect(() => {
  fetchUserData(userId);
}, [userId]);
```

### Bug 2: Omitting the Cleanup Return Function
```jsx
// ❌ WRONG: Creates a new window listener on every mount without removing old ones
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
}, []); // Leaks memory when component unmounts!

// ✅ RIGHT: Return cleanup callback
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Bug 3: Triggering State Updates with No Dependency Array (Infinite Loop)
```jsx
// ❌ WRONG: Runs after EVERY render -> sets state -> triggers re-render -> infinite loop!
useEffect(() => {
  setCount(count + 1);
});

// ✅ RIGHT: Pass appropriate dependency array or functional updater
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // Runs once on mount
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is the difference between passing `[]`, `[prop]`, and omitting the dependency array in `useEffect`?**  
   `[]` runs once on mount; `[prop]` runs on mount and whenever `prop` changes; omitting it runs after every single render cycle.

2. **Why does `useEffect` run twice in development mode?**  
   React 18 Strict Mode mounts, unmounts, and re-mounts components in development to verify that cleanup functions correctly prevent memory leaks.

3. **When does the cleanup function returned by `useEffect` actually run?**  
   It runs right before the component unmounts from the DOM, and also immediately before re-running the effect when dependencies change.

4. **Can you mark the `useEffect` callback function itself as `async`?**  
   No, because React expects the effect callback to return either nothing or a cleanup function; return a Promise breaks that contract (use an inner async function instead).

5. **When should you NOT use `useEffect`?**  
   Do not use `useEffect` to transform or filter data that can be calculated synchronously on the fly from existing state or props during render.
