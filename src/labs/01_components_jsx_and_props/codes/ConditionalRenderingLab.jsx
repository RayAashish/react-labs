import { useState } from "react";

/**
 * Author: raysi
 * Lecture 01 Lab B: Conditional Rendering & JSX Rules
 * Backend Analogy: Just like Java ternary (val != null ? val : defaultVal) or if-checks.
 * Rule: JSX must return a single root element (Fragment <></> or <div>).
 */
export default function ConditionalRenderingLab() {
  const [userRole, setUserRole] = useState("ADMIN"); // "ADMIN" | "MEMBER" | "GUEST"
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex gap-2 border-b pb-3">
        {["ADMIN", "MEMBER", "GUEST"].map((role) => (
          <button
            key={role}
            onClick={() => setUserRole(role)}
            className={`px-3 py-1 text-xs rounded font-medium ${
              userRole === role ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Pattern 1: Ternary Operator (if-else for UI) */}
      <div className="p-3 bg-white border rounded-lg">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-1">Access Tier</h4>
        {userRole === "ADMIN" ? (
          <span className="text-sm font-semibold text-red-600">🛡️ Full Root Privileges</span>
        ) : (
          <span className="text-sm font-semibold text-gray-700">👤 Standard User Dashboard</span>
        )}
      </div>

      {/* Pattern 2: Short-Circuit && (Render only if condition is true) */}
      <div className="p-3 bg-white border rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Notification Center</span>
          <button
            onClick={() => setHasUnreadAlerts(!hasUnreadAlerts)}
            className="text-xs text-blue-600 underline"
          >
            Toggle Alert
          </button>
        </div>
        {hasUnreadAlerts && (
          <div className="p-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded">
            ⚠️ Attention: Critical database maintenance scheduled for 02:00 UTC.
          </div>
        )}
      </div>
    </div>
  );
}
