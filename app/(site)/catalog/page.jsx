import { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";
import { getProducts, buildFilterOptions } from "@/data/source";

export const metadata = {
  title: "Каталог ковров — КовёрБай",
  description: "Каталог ковров с фильтрами по материалу, форме, комнате, цвету и цене. Поиск по названию.",
};

export default async function CatalogPage() {
  const products = await getProducts();
  const filterOptions = buildFilterOptions(products);
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 text-brand-600">Загрузка каталога…</div>}>
      <CatalogClient products={products} filterOptions={filterOptions} />
    </Suspense>
  );
}
