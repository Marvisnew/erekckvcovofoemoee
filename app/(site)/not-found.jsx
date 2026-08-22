import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold text-brand-800">404</h1>
      <p className="mt-3 text-brand-600">Страница не найдена.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
        На главную
      </Link>
    </div>
  );
}
