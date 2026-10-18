import { useReducer } from "react";

/**
 * Author: raysi
 * Lecture 10 Lab: useReducer State Machines (Shopping Cart)
 * Backend Analogy: CQRS Command Handler. (state, action) => newState.
 */
const initialCart = { items: [], discount: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": return { ...state, items: [...state.items, action.payload] };
    case "REMOVE": return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "APPLY_DISCOUNT": return { ...state, discount: 0.2 };
    case "CLEAR": return initialCart;
    default: return state;
  }
}

export default function ShoppingCartReducerLab() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const subtotal = cart.items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal * (1 - cart.discount);

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Shopping Cart Reducer</h3>
        <span className="text-xs font-semibold text-emerald-600">Total: ${total.toFixed(2)}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch({ type: "ADD", payload: { id: Date.now(), title: "Spring Cloud Pro", price: 40 } })}
          className="flex-1 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700"
        >
          + Add Course ($40)
        </button>
        <button
          onClick={() => dispatch({ type: "APPLY_DISCOUNT" })}
          disabled={cart.discount > 0}
          className="px-2.5 py-1.5 bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded"
        >
          {cart.discount > 0 ? "20% Applied" : "Coupon -20%"}
        </button>
        <button onClick={() => dispatch({ type: "CLEAR" })} className="px-2 py-1.5 bg-gray-200 text-xs rounded">
          Clear
        </button>
      </div>

      <ul className="space-y-1">
        {cart.items.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">Cart is empty</p>
        ) : (
          cart.items.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-2 bg-white border rounded text-xs">
              <span>{item.title}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">${item.price}</span>
                <button onClick={() => dispatch({ type: "REMOVE", payload: item.id })} className="text-red-500 font-bold">✕</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
