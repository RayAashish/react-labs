# Lecture 12: Redux Toolkit, Zustand & Production Architecture
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
Think of frontend enterprise architecture like an enterprise microservices ecosystem:
- **The Store:** The centralized **In-Memory Global Database / Redis Cluster**. All components read from this single source of truth.
- **Slices:** Modular schemas/tables (e.g. `authSlice`, `cartSlice`, `productSlice`).
- **Dispatching an Action:** Producing a Kafka message to an event topic: `kafkaTemplate.send("ORDER_PLACED", payload)`.
- **Reducers:** Stream processors / Consumer listeners that process events and update the database state immutably.
- **Axios/Fetch JWT Interceptors:** Spring Security `ClientHttpRequestInterceptor` that automatically injects `Authorization: Bearer <token>` into outgoing HTTP requests and transparently refreshes expired tokens on 401 Unauthorized responses.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Global State Stores:** Passing data across dozens of decoupled features (e.g. cart badge in navbar, checkout page, profile dropdown) leads to untraceable prop-drilling or Context re-render performance bottlenecks.
- **Without Slices (Redux Toolkit):** Legacy Redux required 4 separate files for every simple action: action types, action creators, reducers, and constants.
- **Without HTTP Interceptors:** Every single API call in your app would need 10 lines of manual code to read the JWT from storage, attach headers, and catch 401 token expiry errors.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
// Redux Toolkit / Zustand Architecture Pattern
import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => { state.token = action.payload; },
    logout: (state) => { state.token = null; },
  },
});
export const { setToken, logout } = authSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer } });
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Storing Everything in Global State
```jsx
// ❌ WRONG: Storing temporary form input text or modal open/close booleans in Redux
// Pollutes the global store and adds needless boilerplate

// ✅ RIGHT: Keep local UI state in useState; use Redux/Zustand ONLY for truly global domain data (Auth, Cart, User Settings)
```

### Bug 2: Mutating State in Redux without Immer
```jsx
// ❌ WRONG: In vanilla Redux, direct mutation (state.user.name = "X") causes lost updates
// Note: Redux Toolkit uses Immer internally, but plain JS reducers forbid direct mutation!

// ✅ RIGHT: Always return spread copies or use Redux Toolkit createSlice which incorporates Immer
```

### Bug 3: Hardcoding Auth Headers in Individual Fetch Calls
```jsx
// ❌ WRONG: Copy-pasting headers: { Authorization: `Bearer ${token}` } in 50 components
fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } });

// ✅ RIGHT: Configure a single Axios/Fetch interceptor that injects token automatically
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is the difference between Redux Toolkit (RTK) and Classic Redux?**  
   RTK eliminates 80% of boilerplate by combining actions and reducers into `createSlice` and using Immer under the hood to allow safe "mutating" syntax.

2. **When should you choose Zustand over Redux Toolkit?**  
   Choose Zustand for smaller or medium projects where you want a hook-based global store without providers, boilerplate, or context wrap overhead.

3. **How does an HTTP interceptor handle expired JWT tokens automatically?**  
   A response interceptor catches 401 errors, pauses outgoing calls, calls a `/refresh-token` endpoint, updates the store with the new token, and replays the original request.

4. **What is a "Selector" in Redux and why is it important for performance?**  
   A selector is a function (e.g. `useSelector(state => state.cart.count)`) that extracts specific state fields, ensuring the component only re-renders when *that exact slice* changes.

5. **Why can't Redux Reducers perform asynchronous operations like database or API queries?**  
   Reducers must remain pure, synchronous, and deterministic for predictable state replays; all async operations must be handled in middleware like RTK Query or `createAsyncThunk`.
