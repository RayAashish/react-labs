import { useState, useEffect } from "react";

/**
 * Author: raysi
 * Lecture 05 Lab: useEffect Lifecycle & Cleanup Functions
 * Backend Analogy:
 * Mount ([]) = @PostConstruct / init()
 * Cleanup return () => {...} = @PreDestroy / close() / connection.disconnect()
 * Dependencies array [dep] = Spring @EventListener listening to specific topic.
 */
function ActiveListenerWidget() {
  const [seconds, setSeconds] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 1. Mount phase: initialize interval & window event listener
    const timerId = setInterval(() => setSeconds((s) => s + 1), 1000);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // 2. Unmount/Cleanup phase: ALWAYS tear down to prevent memory leaks!
    return () => {
      clearInterval(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array = run once on mount, cleanup on unmount

  return (
    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg space-y-1 text-xs">
      <div className="flex justify-between font-semibold text-indigo-900">
        <span>⏱️ Active Timer: {seconds}s</span>
        <span>🖥️ Window Width: {windowWidth}px</span>
      </div>
      <p className="text-[11px] text-indigo-700">
        Interval & resize listener running. Click 'Unmount' to trigger cleanup function.
      </p>
    </div>
  );
}

export default function WindowResizeAndTimerCleanupLab() {
  const [mounted, setMounted] = useState(true);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Lifecycle & Memory Cleanup</h3>
        <button
          onClick={() => setMounted(!mounted)}
          className={`px-3 py-1 text-xs font-semibold rounded ${
            mounted ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          {mounted ? "Unmount Widget (Teardown)" : "Mount Widget (Init)"}
        </button>
      </div>

      {mounted ? (
        <ActiveListenerWidget />
      ) : (
        <div className="p-3 bg-gray-50 border rounded text-xs text-gray-500 text-center">
          Widget unmounted. All intervals cleared and memory safely reclaimed!
        </div>
      )}
    </div>
  );
}
