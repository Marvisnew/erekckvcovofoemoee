import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && defined(slug.current)] | order(hit desc, _createdAt desc){
    "slug": slug.current, name, price, oldPrice, material, form, room, color,
    style, pile, sizes, colors, rating, inStock, isNew, hit, desc, image
  }
`;

export const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    "slug": slug.current, name, price, oldPrice, material, form, room, color,
    style, pile, sizes, colors, rating, inStock, isNew, hit, desc, image
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(date desc){
    "slug": slug.current, title, excerpt, date, category, readingTime, cover, coverImage, body
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    "slug": slug.current, title, excerpt, date, category, readingTime, cover, coverImage, body
  }
`;
