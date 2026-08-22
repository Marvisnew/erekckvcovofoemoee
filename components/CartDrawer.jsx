"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const { items, open, closeCart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-brand-200 px-4 py-3">
            <h2 className="text-lg font-bold text-brand-900">Корзина</h2>
            <button onClick={closeCart} className="text-brand-600 hover:text-brand-800">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-brand-600">Корзина пуста</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-3 rounded-lg border border-brand-200 p-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-brand-900">{item.name}</h3>
                      <p className="text-sm text-brand-600">{item.price} р.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => updateQty(item.slug, -1)} className="rounded border border-brand-300 px-2 py-1 text-sm">−</button>
                        <span className="text-sm font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.slug, 1)} className="rounded border border-brand-300 px-2 py-1 text-sm">+</button>
                        <button onClick={() => removeFromCart(item.slug)} className="ml-auto text-xs text-red-600 hover:text-red-800">Удалить</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t border-brand-200 p-4">
              <div className="flex items-center justify-between text-lg font-bold text-brand-900">
                <span>Итого:</span>
                <span>{total} р.</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={clearCart} className="flex-1 rounded-lg border border-brand-300 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-100">
                  Очистить
                </button>
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="flex-1 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Оформить заказ
                </button>
              </div>
              {checkoutOpen && <CheckoutForm onClose={() => setCheckoutOpen(false)} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
