# Lecture 09: Context API & Prop Drilling
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
In Spring Boot, imagine needing to access the authenticated user or tenant ID inside a deep helper method 5 layers down:
- **Prop Drilling** is like passing `HttpServletRequest` or `SecurityContext` as an explicit parameter through every single method signature in Controller -> Service -> Manager -> Helper -> DAO.
- **Context API** is like **`SecurityContextHolder.getContext()`** or `@Autowired ApplicationContext`. Any component anywhere in the component tree can directly inject the context with `useContext(AuthContext)` without intermediate components even knowing it exists.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Context (Prop Drilling):** Intermediate components that don't care about theme or auth still have to accept and forward those props just so their grand-children can use them.
- **Maintenance Fragility:** Renaming or adding a prop requires modifying 10 intermediate components along the chain.
- **Component Bloat:** Reusable UI components become tightly coupled to data they never use.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "raysi" });
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

// Any deep descendant consumes it directly
export const useAuth = () => useContext(AuthContext);
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Passing New Object Literals in `Provider value` Without Memoization
```jsx
// ❌ WRONG: Creates a new object reference every render, forcing all consumers to re-render!
<ThemeContext.Provider value={{ theme, toggleTheme }}>

// ✅ RIGHT: Memoize context value or keep state cohesive
const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
<ThemeContext.Provider value={value}>
```

### Bug 2: Consuming Context Outside its `<Provider>`
```jsx
// ❌ WRONG: Calling useContext where no parent Provider exists returns defaultValue (often null)
function Profile() {
  const { user } = useContext(AuthContext); // user is null -> Cannot read properties of null
}

// ✅ RIGHT: Custom hook with guard check
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
```

### Bug 3: Using Context for High-Frequency State (e.g. Mouse Position)
```jsx
// ❌ WRONG: Putting 60fps mouse coordinates or live keystrokes into Context
// Every single consumer across the entire app re-renders on every pixel move!

// ✅ RIGHT: Use local state or specialized external stores (Zustand/Redux) for rapid updates
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is Prop Drilling and why is it problematic?**  
   Prop drilling is passing props through intermediary components that don't need them, creating tight coupling, bloated interfaces, and painful refactoring.

2. **What is the difference between Context API and Redux?**  
   Context is a dependency injection mechanism built into React for low-frequency global data (themes/auth); Redux is an external state engine with middleware, time-travel, and granular selector optimizations.

3. **Does updating a Context value cause all consumer components to re-render?**  
   Yes, every component that calls `useContext(MyContext)` will re-render whenever the Provider's `value` reference changes, regardless of whether `React.memo` is used.

4. **How do you prevent unnecessary re-renders when using Context?**  
   Split distinct state slices into separate contexts (e.g. `ThemeContext` vs `AuthContext`) and wrap the provider's `value` object in `useMemo`.

5. **Can a component consume multiple Contexts at the same time?**  
   Yes, a component can call `useContext()` as many times as needed to read different independent context providers.
