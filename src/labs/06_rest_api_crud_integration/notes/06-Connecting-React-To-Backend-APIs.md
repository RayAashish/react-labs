# Lecture 06: Connecting React to REST APIs (CRUD Integration)
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
- In Spring Boot, an HTTP client (like `RestClient` or `WebClient`) sends an asynchronous non-blocking request to an external service and deserializes JSON into a DTO.
- In React, `fetch()` or `axios` does the exact same thing in the browser.
- Because HTTP is asynchronous, every API call in React must manage **Three Discrete UI States**:
  1. **Loading State:** Pending request (render a spinner).
  2. **Error State:** 4xx/5xx response or network failure (render a banner).
  3. **Data State:** 200 OK payload (render table/cards).

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Loading/Error States:** The screen stays blank while fetching, leading users to believe the app crashed, and unhandled errors produce white-screen-of-death crashes.
- **Without Async/Await in useEffect:** Data fetching calls get tangled in nested `.then().catch()` callback hell.
- **Without Cleanup/AbortController:** Switching routes mid-flight causes "unmounted component state update" warnings and race conditions between fast and slow network responses.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const controller = new AbortController();
  fetch("/api/users", { signal: controller.signal })
    .then(res => res.json())
    .then(json => setData(json))
    .finally(() => setLoading(false));
  return () => controller.abort(); // Cancel if user leaves screen
}, []);
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Making the `useEffect` Callback Directly `async`
```jsx
// ❌ WRONG: Async functions return a Promise, but React expects a cleanup function or undefined
useEffect(async () => {
  const res = await fetch("/api/data");
}, []);

// ✅ RIGHT: Define an inner async function and invoke it
useEffect(() => {
  const loadData = async () => {
    const res = await fetch("/api/data");
    const json = await res.json();
    setData(json);
  };
  loadData();
}, []);
```

### Bug 2: Assuming `fetch()` Rejects on HTTP 404 or 500
```jsx
// ❌ WRONG: fetch() only rejects on network failures, NOT on 404/500 errors!
try {
  const res = await fetch("/api/missing");
  const data = await res.json(); // May fail with unexpected JSON syntax error
} catch (err) { ... }

// ✅ RIGHT: Manually verify res.ok
const res = await fetch("/api/missing");
if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
```

### Bug 3: Race Conditions with Overlapping Search Queries
```jsx
// ❌ WRONG: Quick typing fires request A then request B; if A returns after B, stale data wins
const handleSearch = (query) => fetch(`/search?q=${query}`).then(...);

// ✅ RIGHT: Cancel previous pending request with AbortController or debounce
const controller = new AbortController();
fetch(`/search?q=${query}`, { signal: controller.signal });
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **Why does `fetch()` not throw an exception on 404 or 500 status codes?**  
   `fetch()` only rejects its promise when a network failure occurs or request is aborted; HTTP error statuses still complete a valid HTTP transaction, so you must inspect `res.ok`.

2. **How do you cancel a pending fetch request when a component unmounts?**  
   Use the native browser `AbortController`, pass its `signal` to `fetch()`, and call `controller.abort()` in the `useEffect` cleanup return function.

3. **What is Optimistic UI Updating?**  
   Immediately updating the local React state before the backend API response completes, then rolling back state only if the HTTP call returns an error.

4. **Why is Axios often preferred over native `fetch()` in large projects?**  
   Axios automatically rejects non-2xx statuses, handles JSON serialization/deserialization, and supports request/response interceptors (ideal for JWT auth tokens).

5. **How do you prevent search inputs from spamming backend servers on every keystroke?**  
   By applying a debounce delay (e.g. 300ms) with `setTimeout` so the API is queried only after the user pauses typing.
