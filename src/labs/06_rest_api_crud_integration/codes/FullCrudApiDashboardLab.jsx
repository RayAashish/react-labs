import { useState, useEffect } from "react";

/**
 * Author: raysi
 * Lecture 06 Lab: Connecting React to REST APIs (CRUD Integration)
 * Backend Analogy: Consuming Spring Boot @RestController endpoints.
 * Explicitly models 3 UI states: Loading, Error, and Success Data.
 */
export default function FullCrudApiDashboardLab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // Simulated DB latency
    setUsers([
      { id: 1, name: "Alice Springs", email: "alice@spring.io" },
      { id: 2, name: "Bob Boot", email: "bob@boot.io" },
    ]);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUsers((prev) => [...prev, { id: Date.now(), name: nameInput, email: `${nameInput.toLowerCase()}@dev.com` }]);
    setNameInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">User REST Controller</h3>
        <button onClick={fetchUsers} className="text-xs text-blue-600 underline">Refetch</button>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="New user name..."
          className="border p-1.5 text-xs rounded flex-1 outline-none"
        />
        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700">
          POST User
        </button>
      </form>

      {loading ? (
        <p className="text-xs text-blue-600 py-3 text-center">⏳ Contacting Spring Boot API...</p>
      ) : (
        <ul className="space-y-1">
          {users.map((u) => (
            <li key={u.id} className="flex justify-between items-center p-2 bg-white border rounded text-xs">
              <div>
                <p className="font-semibold text-slate-800">{u.name}</p>
                <p className="text-[10px] text-gray-500">{u.email}</p>
              </div>
              <button
                onClick={() => setUsers((prev) => prev.filter((item) => item.id !== u.id))}
                className="text-xs text-rose-500 font-bold hover:text-rose-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
