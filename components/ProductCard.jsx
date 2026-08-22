import Link from "next/link";
import CarpetThumb from "./CarpetThumb";

export default function ProductCard({ p }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col rounded-xl border border-brand-200 bg-white p-3 transition hover:shadow-lg"
    >
      <div className="relative">
        <CarpetThumb image={p.image} colors={p.colors} form={p.form} className="aspect-[4/3] w-full" />
        <div className="absolute left-2 top-2 flex gap-1">
          {p.isNew && <span className="rounded bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">Новинка</span>}
          {p.hit && <span className="rounded bg-brand-600 px-2 py-0.5 text-[11px] font-semibold text-white">Хит</span>}
          {p.oldPrice && <span className="rounded bg-red-600 px-2 py-0.5 text-[11px] font-semibold text-white">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
        </div>
      </div>
      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-brand-900 group-hover:text-brand-700">{p.name}</h3>
        <p className="mt-1 text-xs text-brand-600">{p.material} · {p.form} · {p.room}</p>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-lg font-bold text-brand-800">{p.price} р.</div>
          {p.oldPrice && <div className="text-xs text-brand-500 line-through">{p.oldPrice} р.</div>}
        </div>
        <span className={`text-xs font-medium ${p.inStock ? "text-emerald-700" : "text-red-600"}`}>
          {p.inStock ? "В наличии" : "Под заказ"}
        </span>
      </div>
    </Link>
  );
}
