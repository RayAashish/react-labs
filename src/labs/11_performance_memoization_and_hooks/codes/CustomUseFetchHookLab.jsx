import { useState, useEffect } from "react";

/**
 * Author: raysi
 * Lecture 11 Lab B: Reusable Custom Hooks (useFetch)
 * Backend Analogy: A Custom Hook is like an abstracted Spring @Service
 * or GenericRepository<T> that packages reusable logic across multiple endpoints.
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!isCancelled) setData(json);
      })
      .catch((err) => {
        if (!isCancelled) setError(err.message);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

export default function CustomUseFetchHookLab() {
  const [endpointId, setEndpointId] = useState(1);
  // Consuming our reusable custom hook with 1 clean line:
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${endpointId}`
  );

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Custom useFetch Hook</h3>
        <div className="space-x-1">
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => setEndpointId(id)}
              className={`px-2.5 py-1 text-xs rounded font-medium ${
                endpointId === id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Post #{id}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-xs text-blue-600 py-4 text-center">⏳ Custom hook fetching Post #{endpointId}...</p>}
      {error && <p className="text-xs text-red-600 py-2 text-center">❌ {error}</p>}

      {data && !loading && (
        <div className="p-3 bg-white border rounded-xl space-y-1">
          <h4 className="text-xs font-bold text-slate-900 capitalize">{data.title}</h4>
          <p className="text-[11px] text-gray-600 line-clamp-3">{data.body}</p>
        </div>
      )}
    </div>
  );
}
