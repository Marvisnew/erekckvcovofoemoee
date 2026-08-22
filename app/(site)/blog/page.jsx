import Link from "next/link";
import { getPosts } from "@/data/source";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Блог о коврах — КовёрБай",
  description: "Статьи о выборе, уходе и трендах ковров. Гид покупателя от магазина КовёрБай.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-900">Блог</h1>
      <p className="mt-1 text-brand-600">Как выбрать, ухаживать и вписать ковёр в интерьер.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const coverSrc = urlFor(post.coverImage)?.width(600).height(300).fit("crop").url();
          return (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-brand-200 bg-white p-4 transition hover:shadow-lg">
            {coverSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverSrc} alt="" className="h-36 w-full rounded-lg object-cover" />
            ) : (
              <div className="h-36 w-full rounded-lg" style={{ background: `linear-gradient(135deg, ${(post.cover && post.cover[0]) || "#e4cfb4"}, ${(post.cover && post.cover[1]) || "#a9743f"})` }} />
            )}
            <p className="mt-3 text-xs font-medium text-brand-500">{post.category}{post.readingTime ? ` · ${post.readingTime} мин` : ""}</p>
            <h2 className="mt-1 font-semibold text-brand-900 group-hover:text-brand-700">{post.title}</h2>
            <p className="mt-1 flex-1 text-sm text-brand-600">{post.excerpt}</p>
            <span className="mt-3 text-sm font-semibold text-brand-600">Читать →</span>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
