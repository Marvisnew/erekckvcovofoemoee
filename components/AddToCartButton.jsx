"use client";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, className = "" }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addToCart(product);
      }}
      className={`mt-4 w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 sm:w-auto ${className}`}
    >
      Добавить в корзину
    </button>
  );
}
