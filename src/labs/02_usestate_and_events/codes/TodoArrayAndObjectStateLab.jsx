import { useState } from "react";

/**
 * Author: raysi
 * Lecture 02 Lab B: Object & Array State Immutability
 * Backend Analogy: React checks reference equality (oldState === newState).
 * Mutating in-place (todos.push()) keeps same memory address -> React won't re-render!
 * Always return a NEW copy like Java's List.copyOf() or Builder.
 */
export default function TodoArrayAndObjectStateLab() {
  const [profile, setProfile] = useState({ name: "Raysi", role: "Backend Dev" });
  const [todos, setTodos] = useState(["Implement Auth Filter", "Review PR #42"]);
  const [inputVal, setInputVal] = useState("");

  const handleAddTodo = () => {
    if (!inputVal.trim()) return;
    // ✅ Immutability: create a new array copy with spread operator
    setTodos([...todos, inputVal]);
    setInputVal("");
  };

  const handleToggleRole = () => {
    // ✅ Object spread: copy all fields, override 'role'
    setProfile({
      ...profile,
      role: profile.role === "Backend Dev" ? "Full-Stack Architect" : "Backend Dev",
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Object State Section */}
      <div className="p-3 bg-white border rounded-lg flex items-center justify-between">
        <div>
          <p className="font-bold text-slate-800 text-sm">{profile.name}</p>
          <p className="text-xs text-indigo-600 font-medium">{profile.role}</p>
        </div>
        <button
          onClick={handleToggleRole}
          className="px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 rounded font-semibold hover:bg-indigo-100"
        >
          Promote Role
        </button>
      </div>

      {/* Array State Section */}
      <div className="p-3 bg-white border rounded-lg space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase">Immutable Todo List</h4>
        <div className="flex gap-2">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="New sprint task..."
            className="border p-1.5 text-xs rounded flex-1 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={handleAddTodo}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800"
          >
            Add
          </button>
        </div>

        <ul className="space-y-1">
          {todos.map((todo, idx) => (
            <li key={idx} className="flex justify-between items-center text-xs p-1.5 bg-slate-50 rounded">
              <span>{todo}</span>
              <button
                onClick={() => setTodos(todos.filter((_, i) => i !== idx))}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
