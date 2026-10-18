import { useState, useMemo, useCallback } from "react";

/**
 * Author: raysi
 * Lecture 11 Lab A: useMemo & useCallback Performance Optimization
 * Backend Analogy:
 * useMemo = @Cacheable(value = "heavyCalc", key = "#num")
 * useCallback = Singleton method reference preventing unnecessary child re-renders.
 */
function heavyFibonacci(n) {
  // Simulating an intensive CPU computation (e.g. big data aggregation)
  let a = 0, b = 1;
  for (let i = 2; i <= n * 50000; i++) {
    const temp = (a + b) % 1000;
    a = b;
    b = temp;
  }
  return n <= 0 ? 0 : a + b;
}

export default function ExpensiveCalculationMemoLab() {
  const [num, setNum] = useState(10);
  const [darkTheme, setDarkTheme] = useState(false);

  // ✅ useMemo caches the computed result; recalculates ONLY when 'num' changes!
  const computedValue = useMemo(() => {
    console.log("⚡ [Expensive CPU Task]: Computing heavy calculation for num:", num);
    return heavyFibonacci(num);
  }, [num]);

  return (
    <div className={`p-4 max-w-md mx-auto space-y-4 rounded-xl border ${darkTheme ? "bg-slate-900 text-white" : "bg-white text-slate-800"}`}>
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-sm">useMemo Computation Cache</h3>
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xs px-2.5 py-1 bg-indigo-600 text-white rounded font-medium"
        >
          Toggle Theme (Check Console!)
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Clicking "Toggle Theme" re-renders this component, but <strong className="text-emerald-400">useMemo</strong> skips the CPU calculation because 'num' hasn't changed.
      </p>

      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span>Target Factor N: <strong>{num}</strong></span>
          <button
            onClick={() => setNum((n) => n + 5)}
            className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold"
          >
            + 5 (Triggers Memo Recompute)
          </button>
        </div>
        <p className="text-xs font-mono">
          Cached Hash Result: <span className="font-bold text-indigo-500">{computedValue}</span>
        </p>
      </div>
    </div>
  );
}
