"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const GROUPS = [
  { key: "material", label: "Материал" },
  { key: "form", label: "Форма" },
  { key: "room", label: "Комната" },
  { key: "color", label: "Цвет" },
  { key: "pile", label: "Ворс" },
];

export default function CatalogClient({ products, filterOptions }) {
  const sp = useSearchParams();
  const initial = () => {
    const f = {};
    GROUPS.forEach(({ key }) => {
      const v = sp.get(key);
      f[key] = v ? [v] : [];
    });
    return f;
  };

  const [filters, setFilters] = useState(initial);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(700);
  const [sort, setSort] = useState("popular");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (key, value) =>
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: [...set] };
    });

  const reset = () => {
    setFilters(Object.fromEntries(GROUPS.map((g) => [g.key, []])));
    setQuery("");
    setMaxPrice(700);
  };

  const result = useMemo(() => {
    let list = products.filter((p) => {
      for (const { key } of GROUPS) {
        if (filters[key]?.length && !filters[key].includes(p[key])) return false;
      }
      if (p.price > maxPrice) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.material} ${p.style} ${p.color} ${p.room}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "cheap") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "expensive") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else list = [...list].sort((a, b) => Number(b.hit) - Number(a.hit));
    return list;
  }, [products, filters, query, maxPrice, sort]);

  const activeCount = GROUPS.reduce((n, g) => n + filters[g.key].length, 0);

  const Sidebar = (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-semibold text-brand-800">Цена до: {maxPrice} р.</label>
        <input type="range" min="80" max="700" step="10" value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-brand-600" />
      </div>
      {GROUPS.map(({ key, label }) => (
        <div key={key}>
          <h4 className="mb-2 text-sm font-semibold text-brand-800">{label}</h4>
          <div className="space-y-1.5">
            {filterOptions[key].map((opt) => (
              <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-brand-700">
                <input type="checkbox" checked={filters[key].includes(opt)}
                  onChange={() => toggle(key, opt)} className="accent-brand-600" />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={reset} className="w-full rounded-lg border border-brand-300 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100">
        Сбросить фильтры{activeCount ? ` (${activeCount})` : ""}
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-900">Каталог ковров</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: например «шерсть», «синий», «детская»…"
            className="w-full rounded-lg border border-brand-300 bg-white px-4 py-2.5 pl-10 text-sm outline-none focus:border-brand-500"
          />
          <svg className="absolute left-3 top-3 text-brand-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-brand-300 bg-white px-3 py-2.5 text-sm outline-none">
          <option value="popular">По популярности</option>
          <option value="cheap">Сначала дешёвые</option>
          <option value="expensive">Сначала дорогие</option>
          <option value="rating">По рейтингу</option>
        </select>
        <button onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg border border-brand-300 bg-white px-3 py-2.5 text-sm font-medium lg:hidden">
          Фильтры{activeCount ? ` (${activeCount})` : ""}
        </button>
      </div>

      <div className="mt-6 flex gap-6">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-20 rounded-xl border border-brand-200 bg-white p-4">{Sidebar}</div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white p-4" onClick={(e) => e.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">Фильтры</span>
                <button onClick={() => setMobileOpen(false)} className="text-brand-600">Закрыть ✕</button>
              </div>
              {Sidebar}
            </div>
          </div>
        )}

        <div className="flex-1">
          <p className="mb-3 text-sm text-brand-600">Найдено товаров: {result.length}</p>
          {result.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand-300 p-10 text-center text-brand-600">
              Ничего не найдено. Попробуйте изменить фильтры или запрос.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {result.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
