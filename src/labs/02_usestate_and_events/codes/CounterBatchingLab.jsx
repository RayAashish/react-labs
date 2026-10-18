import { useState } from "react";

/**
 * Author: raysi
 * Lecture 02 Lab A: State Batching & Functional Updates
 * Backend Analogy: Direct update is like reading a cached field;
 * functional updater (prev => prev + 1) is like an AtomicInteger.incrementAndGet().
 */
export default function CounterBatchingLab() {
  const [count, setCount] = useState(0);

  // Buggy batching: all 3 calls capture the same snapshot of 'count'
  const handleBuggyTripleIncrement = () => {
    setCount(count + 1); // e.g. 0 + 1 = 1
    setCount(count + 1); // still 0 + 1 = 1
    setCount(count + 1); // still 0 + 1 = 1 -> Result: +1 only!
  };

  // Correct functional update: reads latest pending queue
  const handleCorrectTripleIncrement = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // Result: +3
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="text-center p-6 bg-slate-900 text-white rounded-xl">
        <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Current Count</span>
        <div className="text-4xl font-extrabold text-indigo-400">{count}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleBuggyTripleIncrement}
          className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg hover:bg-rose-100"
        >
          ❌ Buggy 3x (+1 only)<br />
          <span className="text-[10px] font-normal text-rose-500">setCount(count + 1)</span>
        </button>

        <button
          onClick={handleCorrectTripleIncrement}
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100"
        >
          ✅ Atomic 3x (+3)<br />
          <span className="text-[10px] font-normal text-emerald-500">setCount(prev =&gt; prev + 1)</span>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setCount(0)}
          className="text-xs text-slate-500 underline hover:text-slate-800"
        >
          Reset to 0
        </button>
      </div>
    </div>
  );
}
