import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProduct } from "@/data/source";
import CarpetThumb from "@/components/CarpetThumb";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getProduct(params.slug);
  if (!p) return { title: "Товар не найден" };
  return { title: `${p.name} — купить в Беларуси | КовёрБай`, description: p.desc };
}

export default async function ProductPage({ params }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const all = await getProducts();
  const similar = all.filter((x) => x.slug !== p.slug && x.material === p.material).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-brand-500">
        <Link href="/" className="hover:text-brand-700">Главная</Link> ·{" "}
        <Link href="/catalog" className="hover:text-brand-700">Каталог</Link> ·{" "}
        <span className="text-brand-700">{p.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <CarpetThumb image={p.image} colors={p.colors} form={p.form} className="aspect-[4/3] w-full" />
        <div>
          <div className="flex gap-2">
            {p.isNew && <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">Новинка</span>}
            {p.hit && <span className="rounded bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">Хит</span>}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-brand-900">{p.name}</h1>
          <p className="mt-1 text-sm text-brand-600">Рейтинг {p.rating} ★ · {p.style}</p>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-extrabold text-brand-800">{p.price} р.</span>
            {p.oldPrice && <span className="text-lg text-brand-400 line-through">{p.oldPrice} р.</span>}
          </div>
          <p className={`mt-1 text-sm font-medium ${p.inStock ? "text-emerald-700" : "text-red-600"}`}>
            {p.inStock ? "В наличии — отгрузка в день заказа" : "Под заказ — 7–10 дней"}
          </p>

          {Array.isArray(p.sizes) && p.sizes.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-brand-800">Доступные размеры</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <span key={s} className="rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-sm text-brand-700">{s}</span>
                ))}
              </div>
            </div>
          )}

          <button className="mt-6 w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 sm:w-auto">
            Добавить в корзину
          </button>

          <dl className="mt-6 grid grid-cols-2 gap-y-2 text-sm">
            {[["Материал", p.material], ["Форма", p.form], ["Комната", p.room], ["Цвет", p.color], ["Ворс", p.pile], ["Стиль", p.style]].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-brand-500">{k}</dt>
                <dd className="text-brand-800">{v || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {p.desc && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-lg font-bold text-brand-900">Описание</h2>
          <p className="mt-2 text-brand-700">{p.desc}</p>
        </div>
      )}

      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-brand-900">Похожие товары</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
            {similar.map((s) => <ProductCard key={s.slug} p={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}
