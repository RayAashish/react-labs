# Lecture 03: Lists, Keys & Lifting State Up
**Author:** raysi

---

## 1. The 1-Minute Backend Analogy
- **Rendering Lists:** Just like Java Streams: `items.stream().filter(...).map(this::renderRow).toList()`.
- **The `key` Prop:** Represents the **Primary Key (`@Id`)** of a database table. When React compares old and new lists during reconciliation (diffing), it uses the primary key to know whether an item was moved, inserted, or deleted—without re-rendering the whole table.
- **Lifting State Up:** Like passing a Java callback interface (`Consumer<String> onEvent`) into a sub-service so it can notify the orchestrator when an action occurs.

---

## 2. Why Does This Exist? (The Problem It Solves)
- **Without Unique Keys:** React defaults to item index, which breaks form inputs, checkboxes, and animations when items are sorted or deleted.
- **Without Lifting State Up:** Sibling components cannot share data without passing props sideways (which React forbids).
- **Without Functional Array Methods (`.map()`):** You would have to manually construct imperative `for` loops and push JSX fragments into temporary arrays.

---

## 3. The 10-Line Minimal Syntax Template
```jsx
function ParentList() {
  const [filter, setFilter] = useState("");
  const users = [{ id: "u101", name: "Alice" }, { id: "u102", name: "Bob" }];

  return (
    <>
      <SearchBox value={filter} onChange={setFilter} /> {/* Lifting State */}
      {users.map(u => (
        <UserRow key={u.id} user={u} /> /* Stable Primary Key */
      ))}
    </>
  );
}
```

---

## 4. ❌ Wrong vs. ✅ Right (3 Common Bugs)

### Bug 1: Using Array Index as `key`
```jsx
// ❌ WRONG: If list is sorted or first item is deleted, inputs attach to wrong items!
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}

// ✅ RIGHT: Use unique, stable business identifier (UUID / DB ID)
{items.map((item) => (
  <ListItem key={item.id} data={item} />
))}
```

### Bug 2: Duplicating State Instead of Deriving It
```jsx
// ❌ WRONG: Storing both 'products' AND 'filteredProducts' in separate state requires syncing
const [products, setProducts] = useState(allProducts);
const [filtered, setFiltered] = useState(allProducts);

// ✅ RIGHT: Calculate filtered items on-the-fly during render
const filtered = products.filter(p => p.name.includes(query));
```

### Bug 3: Direct Sibling-to-Sibling Communication
```jsx
// ❌ WRONG: React does NOT support sideways prop passing
<SearchBar onSearch={/* send directly to ProductGrid */} />

// ✅ RIGHT: Lift state to common parent and pass down to both children
<Parent>
  <SearchBar query={query} onChange={setQuery} />
  <ProductGrid items={filteredItems} />
</Parent>
```

---

## 5. Top 5 Interview Questions & 2-Line Answers

1. **Why does React need a `key` prop when rendering lists?**  
   The `key` provides a permanent identity so React Fiber can match elements between Virtual DOM trees during diffing and minimize real DOM mutations.

2. **What bugs happen when using array index as a `key`?**  
   Deleting or reordering items causes React to reuse old DOM nodes/component state, producing phantom values in input boxes and broken animations.

3. **What does "Lifting State Up" mean?**  
   Moving state to the closest common ancestor component so multiple child components can share and synchronize the same data source.

4. **Can you generate a random `Math.random()` key during render?**  
   No! A new key on every render forces React to destroy and recreate the DOM node from scratch every time, causing devastating performance issues.

5. **When is it acceptable to use array index as a key?**  
   Only when the list is strictly static (never reordered, filtered, or mutated) and items have no inputs or internal state.
