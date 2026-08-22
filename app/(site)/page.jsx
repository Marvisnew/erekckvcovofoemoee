import Link from "next/link";
import { getProducts, getPosts } from "@/data/source";
import ProductCard from "@/components/ProductCard";

const categories = [
  { label: "Гостиная", q: "room=Гостиная", colors: ["#e4cfb4", "#a9743f"] },
  { label: "Детская", q: "room=Детская", colors: ["#3b6cb0", "#8fb3e0"] },
  { label: "Дорожки", q: "form=Дорожка", colors: ["#a83232", "#e0b48f"] },
  { label: "Шерстяные", q: "material=Шерсть", colors: ["#b5623c", "#e4cfb4"] },
];

export default async function Home() {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);
  const hits = products.filter((p) => p.hit).slice(0, 6);
  const featured = hits.length ? hits : products.slice(0, 6);
  const fresh = posts.slice(0, 3);
  return (
    <>
      <section className="bg-gradient-to-br from-brand-100 to-brand-200">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Доставка по всей Беларуси</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-brand-900 md:text-5xl">
              Ковры, которые создают уют в вашем доме
            </h1>
            <p className="mt-4 text-lg text-brand-700">
              Более 1000 моделей из шерсти, вискозы и полипропилена. Оплата картой и через ЕРИП, возврат 14 дней.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/catalog" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
                Смотреть каталог
              </Link>
              <Link href="/blog" className="rounded-lg border border-brand-400 px-6 py-3 font-semibold text-brand-800 hover:bg-brand-100">
                Как выбрать ковёр
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-brand-900">Популярные категории</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.label} href={`/catalog?${c.q}`}
              className="group relative overflow-hidden rounded-xl border border-brand-200 bg-white p-5 transition hover:shadow-lg">
              <div className="h-24 w-full rounded-lg" style={{ background: `linear-gradient(135deg, ${c.colors[0]}, ${c.colors[1]})` }} />
              <div className="mt-3 font-semibold text-brand-800 group-hover:text-brand-700">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-900">Хиты продаж</h2>
          <Link href="/catalog" className="text-sm font-semibold text-brand-600 hover:text-brand-800">Весь каталог →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Доставка по Беларуси", "Курьером по Минску и почтой в регионы"],
            ["Оплата удобным способом", "Карта, ЕРИП, наличные при получении"],
            ["Гарантия и возврат", "14 дней на возврат без вопросов"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-brand-200 bg-white p-5">
              <h3 className="font-semibold text-brand-800">{t}</h3>
              <p className="mt-1 text-sm text-brand-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {fresh.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-4 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-900">Из блога</h2>
            <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-800">Все статьи →</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fresh.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group rounded-xl border border-brand-200 bg-white p-4 transition hover:shadow-lg">
                <div className="h-32 w-full rounded-lg" style={{ background: `linear-gradient(135deg, ${(post.cover && post.cover[0]) || "#e4cfb4"}, ${(post.cover && post.cover[1]) || "#a9743f"})` }} />
                <p className="mt-3 text-xs font-medium text-brand-500">{post.category}</p>
                <h3 className="mt-1 font-semibold text-brand-900 group-hover:text-brand-700">{post.title}</h3>
                <p className="mt-1 text-sm text-brand-600 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
