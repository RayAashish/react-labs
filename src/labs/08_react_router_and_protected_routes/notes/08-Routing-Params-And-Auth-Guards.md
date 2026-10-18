# Lecture 08: React Router, Dynamic Params & Auth Guards
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
- In Spring MVC, an HTTP request hits a `@GetMapping("/users/{id}")` endpoint and extracts path variables via `@PathVariable("id") Long id`.
- In React Router, `<Route path="/users/:id" element={<UserDetail />} />` does client-side routing, and `const { id } = useParams()` extracts the parameter.
- A `<ProtectedRoute>` component in React mirrors a **Spring Security Filter Chain (`SecurityFilterChain`)** or `@PreAuthorize("hasRole('ADMIN')")`:
  - If the user has a valid JWT/token in state -> render `<Outlet />` (pass down the chain).
  - If unauthorized -> redirect to `<Navigate to="/login" replace />` (HTTP 401/403 equivalent).

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Client-Side Routing:** Every link click fires a new HTTP GET request to the web server, refreshing the entire page, resetting state, and feeling like a sluggish 1990s website.
- **Without Protected Routes:** Any user could type `/admin` directly into the browser URL bar and see internal management dashboards.
- **Without Dynamic URL Parameters (`:id`):** You would have to hardcode individual routes for every single user or product ID in your database.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
import { Navigate, Outlet } from "react-router-dom";

// Standard Auth Guard Wrapper
export function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login
  }
  return <Outlet />; // Render child routes if authorized
}

// Router config: <Route element={<ProtectedRoute isAuthenticated={isAuth} />}> ... </Route>
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Using HTML `<a href="...">` Instead of `<Link to="...">`
```jsx
// ❌ WRONG: Triggers full browser HTTP request and wipes client state
<a href="/dashboard">Dashboard</a>

// ✅ RIGHT: Uses client-side pushState without page reload
<Link to="/dashboard">Dashboard</Link>
```

### Bug 2: Relying Solely on Frontend Route Guards for Security
```jsx
// ❌ WRONG: Assuming <ProtectedRoute> makes backend APIs secure
// Anyone can modify client-side JavaScript in dev tools!

// ✅ RIGHT: Frontend guards provide UI/UX redirects; Backend Spring Security must validate JWT on EVERY API request
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/api/admin/metrics")
```

### Bug 3: Mutating URL Without `replace` in Login Redirects
```jsx
// ❌ WRONG: Adds redirect to browser history, creating an annoying back-button loop
<Navigate to="/login" />

// ✅ RIGHT: Replace current history entry so clicking back doesn't bounce immediately
<Navigate to="/login" replace />
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **How does client-side routing in React differ from server-side routing?**  
   Server routing downloads an entirely new HTML document on each URL change; React Router intercepts the URL in the browser and re-renders only the matched component without reloading.

2. **How do you extract URL path parameters in React Router?**  
   Declare the route with a colon placeholder (e.g. `path="/orders/:id"`) and read it inside the component using the `useParams()` hook.

3. **What is the purpose of `<Outlet />` in React Router?**  
   `<Outlet />` acts as a placeholder inside parent layout components (like headers or protected wrappers) where matched child routes are rendered.

4. **What is the difference between `useNavigate()` and `<Navigate />`?**  
   `useNavigate()` is an imperative hook used inside functions/callbacks, while `<Navigate />` is a declarative JSX component that redirects immediately upon render.

5. **If a user bypasses a React `<ProtectedRoute>`, does it compromise backend data?**  
   No, as long as backend REST endpoints enforce JWT/session validation on all API endpoints; client-side route guards only protect the presentation layer.
