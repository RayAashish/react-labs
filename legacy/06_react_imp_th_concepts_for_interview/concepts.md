# React DOM, Virtual DOM, Reconciliation & Fiber

## The Problem: Why is the Real DOM Slow?

The **Real DOM (Document Object Model)** is the browser's tree-like representation of a webpage.

Every time something changes in the UI, the browser may need to:

1. Recalculate layouts
2. Repaint pixels
3. Re-render parts of the page

These operations are expensive.

### Example

Suppose only a single text value changes:

```html
<h1>Count: 1</h1>
```

becomes

```html
<h1>Count: 2</h1>
```

If we update the Real DOM directly, the browser may still need to perform multiple rendering operations.

When this happens repeatedly, the application can become:

- Slow
- Laggy
- Less responsive

---

# The Solution: React DOM & Virtual DOM

React solves this problem using a **Virtual DOM (VDOM)**.

## What is Virtual DOM?

The Virtual DOM is a lightweight copy of the Real DOM.

Instead of actual browser elements, it consists of JavaScript objects stored in memory.

### Real DOM

```html
<div>
  <h1>Hello</h1>
</div>
```

### Virtual DOM

```js
{
  type: "div",
  props: {
    children: [
      {
        type: "h1",
        props: {
          children: "Hello"
        }
      }
    ]
  }
}
```

Since JavaScript objects are much cheaper to manipulate than browser elements, React performs its calculations here first.

---

## What is React DOM?

**React DOM** acts as the bridge between React and the browser.

### Responsibilities of React DOM

- Converts React components into actual HTML elements
- Updates browser elements when state changes
- Removes elements when necessary

In simple words:

> React creates the plan, React DOM executes the plan.

---

# The Strategy: Reconciliation

Reconciliation is React's process of updating the UI efficiently.

Instead of updating the Real DOM immediately after every state change, React follows a smarter approach.

---

## Step 1: Create a New Virtual DOM

Whenever state changes:

```js
setCount(count + 1);
```

React generates a brand-new Virtual DOM tree representing the updated UI.

---

## Step 2: Diffing

React compares:

- Previous Virtual DOM
- New Virtual DOM

This comparison process is called **Diffing**.

### Example

Before:

```html
<h1>Count: 1</h1>
```

After:

```html
<h1>Count: 2</h1>
```

React notices:

✅ Text changed

❌ Parent element unchanged

❌ Other components unchanged

---

## Step 3: Find the Exact Changes

React identifies precisely which nodes differ.

Instead of rebuilding the entire page, it records only the necessary modifications.

Example:

```diff
- Count: 1
+ Count: 2
```

---

## Step 4: Update the Real DOM

Finally, React DOM applies only the required changes to the browser.

Instead of:

❌ Re-rendering the whole page

React does:

✅ Update only the affected node

This makes rendering much faster.

---

# React Rendering Flow

```text
State Change
      ↓
New Virtual DOM Created
      ↓
Diffing (Comparison)
      ↓
Find Changes
      ↓
React DOM Updates Real DOM
      ↓
Browser Repaints Only What's Needed
```

---

# The Engine Behind Reconciliation: React Fiber

Before React 16, React's reconciliation process was **synchronous**.

This means:

```text
Start Rendering
      ↓
Keep Rendering
      ↓
Finish Rendering
```

React could not stop midway.

---

## The Problem with Old React

Imagine rendering:

- 10,000 list items
- Large dashboards
- Complex component trees

During rendering:

- Typing could freeze
- Clicking buttons could lag
- Animations could stutter

Because React occupied the browser's main thread until the work was completed.

---

# What is React Fiber?

React Fiber is a complete rewrite of React's reconciliation engine introduced in React 16.

Its purpose is to make rendering:

- Interruptible
- Prioritized
- More responsive

---

## Core Idea

Instead of treating rendering as one huge task:

```text
[ Massive Task ]
```

Fiber breaks it into smaller pieces:

```text
[Task 1]
[Task 2]
[Task 3]
[Task 4]
...
```

These small units are called **Fibers**.

---

# How Fiber Works

## 1. Pause and Resume

Fiber can pause rendering work.

```text
Work
 ↓
Pause
 ↓
Handle User Input
 ↓
Resume Work
```

This keeps the application responsive.

---

## 2. Prioritization

Not all updates are equally important.

### High Priority

- Typing in an input box
- Button clicks
- Animations

### Low Priority

- Loading search results
- Updating hidden components
- Background rendering

Fiber processes urgent tasks first.

---

## 3. Concurrency

Fiber enables Concurrent Rendering.

React can:

- Work on multiple updates
- Pause one update
- Continue another
- Resume later

Without blocking the UI.

---

# Simple Analogy

Imagine you are cleaning a house.

### Old React

```text
Clean Entire House
↓
Only After Finishing
↓
Answer Phone Calls
```

Everything waits.

---

### React Fiber

```text
Clean Kitchen
↓
Answer Phone Call
↓
Clean Bedroom
↓
Reply to Message
↓
Continue Cleaning
```

The work gets done while still responding to important events.

---

# Quick Summary

| Concept | Purpose |
|----------|----------|
| **Real DOM** | Actual browser representation of the webpage |
| **Virtual DOM** | Lightweight JavaScript copy of the Real DOM |
| **React DOM** | Bridge between React and the browser |
| **Reconciliation** | Process of comparing old and new Virtual DOM trees |
| **Diffing** | Finding exactly what changed |
| **Fiber** | Modern reconciliation engine that enables interruptible rendering |
| **Concurrency** | Ability to prioritize and schedule rendering work efficiently |

---

# One-Line Interview Definitions

### React DOM
The package that connects React with the browser and updates the Real DOM.

### Virtual DOM
A lightweight JavaScript representation of the Real DOM used for efficient updates.

### Reconciliation
The process of comparing Virtual DOM trees to determine UI changes.

### Diffing
The algorithm React uses to find differences between old and new Virtual DOM trees.

### React Fiber
React's modern rendering architecture that enables scheduling, prioritization, and concurrent rendering.