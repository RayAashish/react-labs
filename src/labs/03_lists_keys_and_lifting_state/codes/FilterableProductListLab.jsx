import { useState } from "react";

/**
 * Author: raysi
 * Lecture 03 Lab: Lists, Keys & Lifting State Up
 * Backend Analogy: .map() is like Java Stream.map(), lifting state is like passing
 * a Consumer<String> listener from parent to child to receive events.
 * Key rule: 'key' must be a stable unique database ID, NOT array index!
 */
function SearchInput({ query, onQueryChange }) {
  // Child component receives value and callback (lifting state up)
  return (
    <input
      type="text"
      placeholder="Filter by tech..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full border p-2 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}

export default function FilterableProductListLab() {
  const [query, setQuery] = useState("");

  const products = [
    { id: "p1", name: "Spring Cloud Microservices", tag: "Java", price: 49 },
    { id: "p2", name: "PostgreSQL High Performance", tag: "DB", price: 39 },
    { id: "p3", name: "Kafka Event-Driven Architecture", tag: "Messaging", price: 59 },
    { id: "p4", name: "Docker & Kubernetes for Java Devs", tag: "DevOps", price: 45 },
  ];

  // Derived state: filtered in memory on every render
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <div className="border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Course Catalog</h3>
        <p className="text-[11px] text-gray-500">Demonstrates Lifting State Up & Stable Keys</p>
      </div>

      <SearchInput query={query} onQueryChange={setQuery} />

      <div className="space-y-2 pt-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 py-3 text-center">No matching courses found.</p>
        ) : (
          filtered.map((item) => (
            // ✅ Key is item.id (unique primary key)
            <div
              key={item.id}
              className="flex justify-between items-center p-2.5 bg-white border rounded-lg shadow-xs"
            >
              <div>
                <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                  {item.tag}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600">${item.price}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
