import { useState } from "react";

/**
 * Author: raysi
 * Lecture 08 Lab: React Router & Protected Route Auth Guard
 * Backend Analogy: ProtectedRoute = Spring Security OncePerRequestFilter.
 */
function ProtectedRoute({ isAuth, role, children }) {
  if (!isAuth) {
    return <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">⛔ 401 Unauthorized: Redirected to /login</div>;
  }
  if (role !== "ADMIN") {
    return <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded">🔒 403 Forbidden: Admin role required</div>;
  }
  return children;
}

export default function ProtectedAdminRouteLab() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("USER");
  const [path, setPath] = useState("/dashboard");

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      {/* Session / JWT Bar */}
      <div className="p-2.5 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs">
        <span>Status: <strong className={isAuth ? "text-emerald-400" : "text-rose-400"}>{isAuth ? `Logged (${role})` : "Logged Out"}</strong></span>
        <div className="space-x-1">
          <button onClick={() => setIsAuth(!isAuth)} className="px-2 py-0.5 bg-slate-700 rounded text-[11px]">{isAuth ? "Logout" : "Login"}</button>
          <button onClick={() => setRole(role === "USER" ? "ADMIN" : "USER")} className="px-2 py-0.5 bg-slate-700 rounded text-[11px]">{role}</button>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex gap-2 border-b pb-2">
        {["/dashboard", "/admin/metrics", "/users/42"].map((p) => (
          <button
            key={p}
            onClick={() => setPath(p)}
            className={`text-xs px-2.5 py-1 rounded font-medium ${path === p ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-3 bg-white border rounded-lg text-xs min-h-[90px]">
        {path === "/dashboard" && <p className="text-gray-600">📊 Public Dashboard: Anyone can see this screen.</p>}
        {path === "/users/42" && <p className="text-gray-700">👤 User Detail Route with Dynamic Param: <strong className="text-blue-600">:id = 42</strong></p>}
        {path === "/admin/metrics" && (
          <ProtectedRoute isAuth={isAuth} role={role}>
            <div className="text-emerald-800 space-y-0.5">
              <p className="font-bold">🛡️ Protected Admin Metrics Console</p>
              <p>Active DB Connections: 18 | JVM Heap: 48% | Cache Hit: 99.2%</p>
            </div>
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
}
