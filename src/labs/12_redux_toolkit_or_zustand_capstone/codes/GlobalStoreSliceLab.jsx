import { useSyncExternalStore } from "react";

/**
 * Author: raysi
 * Lecture 12 Capstone: Industry Global Store & JWT Interceptor Flow
 * Backend Analogy: Store = Redis cache. Dispatch = Kafka event producer.
 * Interceptor = Spring ClientHttpRequestInterceptor adding Bearer JWT.
 */
let storeState = { token: null, user: null, lastLog: null };
const listeners = new Set();

const globalStore = {
  get: () => storeState,
  dispatch: (action) => {
    if (action.type === "LOGIN") {
      storeState = { ...storeState, token: "eyJhGciOi...jwt-token", user: "raysi_architect" };
    } else if (action.type === "LOGOUT") {
      storeState = { token: null, user: null, lastLog: null };
    } else if (action.type === "LOG") {
      storeState = { ...storeState, lastLog: action.payload };
    }
    listeners.forEach((l) => l());
  },
  sub: (l) => { listeners.add(l); return () => listeners.delete(l); },
};

// Simulated JWT Interceptor HTTP Client
const sendSecuredRequest = async () => {
  const { token } = globalStore.get();
  const headers = { Authorization: token ? `Bearer ${token}` : "None" };
  await new Promise((r) => setTimeout(r, 300));
  globalStore.dispatch({
    type: "LOG",
    payload: { status: token ? "200 OK (Authenticated)" : "401 Unauthorized", headers },
  });
};

export default function GlobalStoreSliceLab() {
  const state = useSyncExternalStore(globalStore.sub, globalStore.get);

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Global Store & JWT Interceptor</h3>
        {state.token ? (
          <button onClick={() => globalStore.dispatch({ type: "LOGOUT" })} className="px-2.5 py-1 bg-rose-600 text-white text-xs rounded">
            Logout
          </button>
        ) : (
          <button onClick={() => globalStore.dispatch({ type: "LOGIN" })} className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-semibold rounded">
            Dispatch Login
          </button>
        )}
      </div>

      <div className="p-3 bg-white border rounded-xl space-y-2 text-xs">
        <p>User: <strong className="text-slate-800">{state.user || "Unauthenticated (Guest)"}</strong></p>
        <button onClick={sendSecuredRequest} className="w-full py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-700">
          Send Intercepted API Request
        </button>
      </div>

      {state.lastLog && (
        <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-[11px] font-mono space-y-1">
          <p className="text-emerald-400 font-bold">{state.lastLog.status}</p>
          <pre className="text-indigo-300">{JSON.stringify(state.lastLog.headers)}</pre>
        </div>
      )}
    </div>
  );
}
