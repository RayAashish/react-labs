# Lecture 01: Functional Components, JSX Rules & Props Contract
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
In Java/Spring Boot, a **Component** is like a `@Service` method that takes an immutable `record UserDto(String name, String role)` and returns a formatted JSON payload. 
- **Props** are the method parameters passed into this function.
- In Java, you cannot modify incoming method parameters and expect caller state to change automatically; similarly in React, **Props are strictly read-only (`final`)**.
- **JSX** is simply template syntax (like Thymeleaf or JSP expressions) compiled down to pure `React.createElement()` Java-like method calls under the hood.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Components:** You end up with 5,000 lines of spaghetti vanilla HTML/JS where changing one button breaks styles in 4 other places.
- **Without Props:** Every card or button has to be hardcoded, making code reuse impossible.
- **Without JSX:** You'd have to write painful nested calls: `React.createElement('div', { className: 'card' }, React.createElement('h1', null, 'Hi'))`.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
// 1. Child component receives immutable props object
function UserBadge({ username, role = "GUEST" }) {
  return (
    <div className="badge">
      <h4>{username}</h4>
      <p>{role}</p>
    </div>
  );
}
// 2. Parent calls component like a custom HTML tag
<UserBadge username="raysi" role="ADMIN" />
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Mutating Props Directly
```jsx
// ❌ WRONG: Props are immutable (final)
function Card(props) {
  props.title = props.title.toUpperCase(); // Runtime error or unpredictable re-render bugs
  return <h1>{props.title}</h1>;
}

// ✅ RIGHT: Derive a new local variable
function Card({ title }) {
  const formattedTitle = title.toUpperCase();
  return <h1>{formattedTitle}</h1>;
}
```

### Bug 2: Returning Multiple Root Elements without Fragment
```jsx
// ❌ WRONG: JSX must have a single enclosing parent
return (
  <h1>Title</h1>
  <p>Description</p>
);

// ✅ RIGHT: Wrap with React Fragment (<>...</>)
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

### Bug 3: Using HTML `class` instead of `className`
```jsx
// ❌ WRONG: 'class' is a reserved keyword in JavaScript/Java
<div class="p-4 bg-white"></div>

// ✅ RIGHT: Use 'className' for DOM elements
<div className="p-4 bg-white"></div>
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **What is JSX and how does the browser execute it?**  
   JSX is syntactic sugar for `React.createElement()`. Browsers cannot run JSX directly; Babel or Vite transpiles it into standard JavaScript before execution.

2. **What is the difference between Props and State?**  
   Props are immutable inputs passed down from parent to child (like method arguments). State is mutable data managed internally within the component (like local class fields).

3. **Why must component names start with a Capital letter in React?**  
   React uses casing to distinguish HTML tags (`<div>`, `<button>`) from custom components (`<UserBadge />`). Lowercase tags are passed as strings to `createElement`.

4. **Can a child component pass props back up to its parent?**  
   No, props flow unidirectionally (top-to-bottom). To communicate upwards, the parent must pass a callback function prop that the child invokes.

5. **Why can't JSX return two sibling elements without a parent wrapper?**  
   A JavaScript function can only return a single value/object. React elements compile to function calls, so multiple siblings must be wrapped in a parent element or Fragment (`<>`).
