"use client";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/blog", label: "Блог" },
  { href: "/#delivery", label: "Доставка" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-brand-50/95 backdrop-blur border-b border-brand-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-800">
            <span className="inline-block h-7 w-7 rounded bg-gradient-to-br from-brand-400 to-brand-700" />
            КовёрБай
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-medium text-brand-700 hover:text-brand-900">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+375291234567" className="text-sm font-semibold text-brand-800">+375 29 123-45-67</a>
            <Link href="/catalog" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
              В каталог
            </Link>
          </div>
          <button
            aria-label="Меню"
            className="md:hidden rounded p-2 text-brand-800"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded px-2 py-2 text-brand-800 hover:bg-brand-100">
                {n.label}
              </Link>
            ))}
            <a href="tel:+375291234567" className="px-2 py-2 font-semibold text-brand-800">+375 29 123-45-67</a>
          </div>
        )}
      </div>
    </header>
  );
}
