"use client";
import { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext(null);

const initialState = { items: [], open: false };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.slug === action.product.slug);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.slug === action.product.slug ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.slug !== action.slug) };
    case "QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, qty: Math.max(1, i.qty + action.delta) } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE":
      return { ...state, open: !state.open };
    case "CLOSE":
      return { ...state, open: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = useCallback((product) => dispatch({ type: "ADD", product }), []);
  const removeFromCart = useCallback((slug) => dispatch({ type: "REMOVE", slug }), []);
  const updateQty = useCallback((slug, delta) => dispatch({ type: "QTY", slug, delta }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const count = state.items.reduce((n, i) => n + i.qty, 0);
  const total = state.items.reduce((n, i) => n + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQty, clearCart, toggleCart, closeCart, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
