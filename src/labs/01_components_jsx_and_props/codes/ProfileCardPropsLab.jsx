import { useState } from "react";

/**
 * Author: raysi
 * Lecture 01 Lab A: Functional Components & Props Contract
 * Backend Analogy: Props = method arguments or immutable Java Records (record UserDto(...)).
 * Rule: Components are pure functions; NEVER mutate received props.
 */
function ProfileCard({ name, role, isOnline, badgeCount }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isOnline ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isOnline ? "● Online" : "○ Offline"}
        </span>
      </div>
      <p className="text-sm text-gray-600">{role}</p>
      <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded inline-block">
        Pending Tasks: {badgeCount}
      </div>
    </div>
  );
}

export default function ProfileCardPropsLab() {
  // Parent component manages state and passes it down via props
  const [isOnline, setIsOnline] = useState(true);
  const [tasks, setTasks] = useState(3);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="font-bold text-slate-800">Props Contract Demo</h2>
        <div className="space-x-2">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="px-2.5 py-1 text-xs bg-slate-800 text-white rounded hover:bg-slate-700"
          >
            Toggle Status
          </button>
          <button
            onClick={() => setTasks((prev) => prev + 1)}
            className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            + Task
          </button>
        </div>
      </div>

      {/* Passing props: key=value (like calling profileCard(name, role, isOnline, tasks)) */}
      <ProfileCard
        name="Alex Mercer"
        role="Senior Java Architect"
        isOnline={isOnline}
        badgeCount={tasks}
      />
    </div>
  );
}
