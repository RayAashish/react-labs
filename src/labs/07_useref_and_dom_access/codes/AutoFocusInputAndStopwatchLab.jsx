import { useState, useRef } from "react";

/**
 * Author: raysi
 * Lecture 07 Lab: Understanding useRef vs useState
 * Backend Analogy:
 * useState = instance variable tied to a UI notification listener (re-renders screen).
 * useRef = a private volatile variable or direct pointer (mutates silently, survives calls).
 */
export default function AutoFocusInputAndStopwatchLab() {
  const [renderCount, setRenderCount] = useState(1);
  const silentClickCountRef = useRef(0);
  const searchInputRef = useRef(null);

  const handleSilentIncrement = () => {
    silentClickCountRef.current += 1;
    console.log("Silent count in memory:", silentClickCountRef.current);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="p-4 bg-white border rounded-xl space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-500">Screen Paint Count</span>
          <span className="text-lg font-bold text-blue-600">{renderCount}</span>
        </div>
        <p className="text-xs text-gray-600">
          In-Memory Ref (renders only when state triggers repaint):{" "}
          <strong className="text-slate-900">{silentClickCountRef.current}</strong>
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSilentIncrement}
            className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg"
          >
            Silent Ref +1 (0 Repaints)
          </button>
          <button
            onClick={() => setRenderCount((r) => r + 1)}
            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg"
          >
            Trigger State Repaint
          </button>
        </div>
      </div>

      {/* DOM Reference Access (imperative focus) */}
      <div className="p-4 bg-white border rounded-xl space-y-2">
        <label className="block text-xs font-semibold text-gray-700">DOM Access (Direct Pointer)</label>
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            placeholder="Focus will target here..."
            className="flex-1 border p-1.5 text-xs rounded outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => searchInputRef.current?.focus()}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg"
          >
            Focus Input
          </button>
        </div>
      </div>
    </div>
  );
}
