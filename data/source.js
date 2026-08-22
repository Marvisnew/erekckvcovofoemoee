// Единый слой данных: берём из Sanity, если CMS подключена (задан projectId),
// иначе используем встроенные демо-данные. Так сайт работает и без CMS.
import { sanityEnabled } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY, PRODUCT_QUERY, POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { products as demoProducts } from "@/data/products";
import { posts as demoPosts } from "@/data/posts";

const revalidate = 60;

// Демо-статьи хранят body как массив строк — превращаем в Portable Text,
// чтобы страница статьи использовала один способ рендеринга.
function stringsToPortableText(body) {
  if (!Array.isArray(body)) return [];
  if (body.length && typeof body[0] === "object") return body; // уже Portable Text
  return body.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text: String(text), marks: [] }],
  }));
}

function normalizePost(p) {
  return { ...p, body: stringsToPortableText(p.body) };
}

export async function getProducts() {
  if (sanityEnabled && client) {
    const data = await client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate, tags: ["product"] } });
    if (data?.length) return data;
  }
  return demoProducts;
}

export async function getProduct(slug) {
  if (sanityEnabled && client) {
    const data = await client.fetch(PRODUCT_QUERY, { slug }, { next: { revalidate, tags: [`product:${slug}`] } });
    if (data) return data;
  }
  return demoProducts.find((p) => p.slug === slug) || null;
}

export async function getPosts() {
  if (sanityEnabled && client) {
    const data = await client.fetch(POSTS_QUERY, {}, { next: { revalidate, tags: ["post"] } });
    if (data?.length) return data.map(normalizePost);
  }
  return demoPosts.map(normalizePost);
}

export async function getPost(slug) {
  if (sanityEnabled && client) {
    const data = await client.fetch(POST_QUERY, { slug }, { next: { revalidate, tags: [`post:${slug}`] } });
    if (data) return normalizePost(data);
  }
  const local = demoPosts.find((p) => p.slug === slug);
  return local ? normalizePost(local) : null;
}

// Опции фильтров строим из реального набора товаров.
export function buildFilterOptions(products) {
  const uniq = (key) => [...new Set(products.map((p) => p[key]).filter(Boolean))];
  return {
    material: uniq("material"),
    form: uniq("form"),
    room: uniq("room"),
    color: uniq("color"),
    pile: uniq("pile"),
  };
}
