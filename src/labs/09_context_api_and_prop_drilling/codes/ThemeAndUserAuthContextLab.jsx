import { useState, createContext, useContext } from "react";

/**
 * Author: raysi
 * Lecture 09 Lab: Context API & Eliminating Prop Drilling
 * Backend Analogy: SecurityContextHolder or Spring ApplicationContext.
 * Avoids passing user credentials through 6 service layers; any bean
 * can inject and read global context directly via useContext().
 */
const AppContext = createContext(null);

function DeepNestedChild() {
  // Directly consumes context without intermediate components passing props!
  const { theme, user, toggleTheme } = useContext(AppContext);
  const isDark = theme === "dark";

  return (
    <div className={`p-3 rounded-lg border text-xs space-y-2 ${isDark ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-800 border-gray-200"}`}>
      <div className="flex justify-between items-center">
        <span>Deep Grandchild Component</span>
        <button
          onClick={toggleTheme}
          className={`px-2 py-1 rounded font-semibold text-[11px] ${isDark ? "bg-amber-400 text-slate-900" : "bg-slate-900 text-white"}`}
        >
          Toggle to {isDark ? "Light" : "Dark"}
        </button>
      </div>
      <p>Logged in as: <strong className="text-indigo-400">{user.name}</strong> ({user.role})</p>
    </div>
  );
}

function MiddleWrapper() {
  // Notice MiddleWrapper accepts NO theme or user props (0 prop drilling!)
  return (
    <div className="p-3 bg-gray-50 border border-dashed rounded-lg space-y-2">
      <p className="text-[11px] text-gray-500 font-medium">
        Intermediate Container (Bypassed prop drilling entirely)
      </p>
      <DeepNestedChild />
    </div>
  );
}

export default function ThemeAndUserAuthContextLab() {
  const [theme, setTheme] = useState("light");
  const [user] = useState({ name: "raysi", role: "Full-Stack Engineer" });

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider value={{ theme, user, toggleTheme }}>
      <div className="p-4 max-w-md mx-auto space-y-3">
        <div className="border-b pb-2">
          <h3 className="font-bold text-slate-800 text-sm">Global Context Provider</h3>
          <p className="text-[11px] text-gray-500">Provides Theme and User Auth to all descendants</p>
        </div>
        <MiddleWrapper />
      </div>
    </AppContext.Provider>
  );
}
