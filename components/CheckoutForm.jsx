"use client";
import { useState } from "react";

const ORDER_EMAIL = process.env.NEXT_PUBLIC_ORDER_EMAIL || "debiltupoi52@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function CheckoutForm({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (!WEB3FORMS_ACCESS_KEY) throw new Error("WEB3FORMS_ACCESS_KEY is not configured");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: form.name,
          email: form.email || ORDER_EMAIL,
          subject: `Новый заказ на КовёрБай — ${form.name}`,
          message: `Новый заказ:\n\nИмя: ${form.name}\nТелефон: ${form.phone}\nEmail: ${form.email || "—"}\nАдрес: ${form.address}\nКомментарий: ${form.comment || "—"}`,
          to: ORDER_EMAIL,
        }),
      });
      const result = await res.json();
      if (!res.ok || result.success === false) throw new Error(result.message || "Mail failed");

      setStatus("ok");
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error("Order email error:", err);
      setStatus("error");
    }
  };

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={submit} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-xl font-bold text-brand-900">Оформление заказа</h3>
        <div className="mt-4 grid gap-3">
          {[
            ["name", "Имя", "text"],
            ["phone", "Телефон", "tel"],
            ["email", "Email", "email"],
            ["address", "Адрес доставки", "text"],
          ].map(([key, label, type]) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium text-brand-700">{label}</label>
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="w-full rounded-lg border border-brand-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-700">Комментарий</label>
            <textarea
              value={form.comment}
              onChange={(e) => update("comment", e.target.value)}
              className="w-full rounded-lg border border-brand-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
              rows={3}
            />
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-brand-300 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-100">
            Отмена
          </button>
          <button type="submit" disabled={status === "loading"} className="flex-1 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
            {status === "loading" ? "Отправка..." : "Отправить заказ"}
          </button>
        </div>
        {status === "ok" && <p className="mt-3 text-center text-sm text-emerald-700">Заказ отправлен! Мы свяжемся с вами.</p>}
        {status === "error" && <p className="mt-3 text-center text-sm text-red-600">Ошибка отправки. Попробуйте позже.</p>}
      </form>
    </div>
  );
}
