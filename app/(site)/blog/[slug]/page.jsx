import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/data/source";
import PortableBody from "@/components/PortableBody";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Статья не найдена" };
  return { title: `${post.title} — Блог КовёрБай`, description: post.excerpt };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const all = await getPosts();
  const other = all.filter((p) => p.slug !== post.slug).slice(0, 2);
  const c0 = (post.cover && post.cover[0]) || "#e4cfb4";
  const c1 = (post.cover && post.cover[1]) || "#a9743f";
  const coverSrc = urlFor(post.coverImage)?.width(1200).height(600).fit("crop").url();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-brand-500">
        <Link href="/" className="hover:text-brand-700">Главная</Link> ·{" "}
        <Link href="/blog" className="hover:text-brand-700">Блог</Link>
      </nav>
      <p className="mt-4 text-xs font-medium text-brand-500">{post.category}{post.readingTime ? ` · ${post.readingTime} мин чтения` : ""}</p>
      <h1 className="mt-1 text-3xl font-bold text-brand-900">{post.title}</h1>
      {coverSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverSrc} alt="" className="mt-5 h-52 w-full rounded-xl object-cover" />
      ) : (
        <div className="mt-5 h-52 w-full rounded-xl" style={{ background: `linear-gradient(135deg, ${c0}, ${c1})` }} />
      )}
      <div className="mt-6">
        <PortableBody value={post.body} />
      </div>

      <div className="mt-10 rounded-xl border border-brand-200 bg-white p-5">
        <h3 className="font-semibold text-brand-900">Готовы выбрать ковёр?</h3>
        <p className="mt-1 text-sm text-brand-600">Загляните в каталог — более 1000 моделей с доставкой по Беларуси.</p>
        <Link href="/catalog" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
          В каталог
        </Link>
      </div>

      {other.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-brand-900">Читайте также</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {other.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-xl border border-brand-200 bg-white p-4 hover:shadow-lg">
                <p className="text-xs font-medium text-brand-500">{p.category}</p>
                <h4 className="mt-1 font-semibold text-brand-900 group-hover:text-brand-700">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
