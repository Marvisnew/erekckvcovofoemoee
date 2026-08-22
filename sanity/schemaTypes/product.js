import { defineType, defineField, defineArrayMember } from "sanity";
import { TagIcon } from "@sanity/icons";

export const product = defineType({
  name: "product",
  title: "Товар (ковёр)",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "name", title: "Название", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Ссылка (slug)", type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image", title: "Фото товара", type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "price", title: "Цена, р.", type: "number", validation: (r) => r.required().positive() }),
    defineField({ name: "oldPrice", title: "Старая цена, р.", type: "number" }),
    defineField({
      name: "material", title: "Материал", type: "string",
      options: { list: ["Шерсть", "Вискоза", "Полипропилен"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "form", title: "Форма", type: "string",
      options: { list: ["Прямоугольный", "Круглый", "Овальный", "Дорожка"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "room", title: "Комната", type: "string",
      options: { list: ["Гостиная", "Спальня", "Детская", "Прихожая", "Кабинет"] },
    }),
    defineField({ name: "color", title: "Цвет", type: "string" }),
    defineField({ name: "style", title: "Стиль", type: "string" }),
    defineField({
      name: "pile", title: "Ворс", type: "string",
      options: { list: ["Короткий", "Средний", "Длинный"], layout: "radio" },
    }),
    defineField({
      name: "sizes", title: "Размеры", type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "colors", title: "Цвета превью (2 hex)", type: "array",
      description: "Два HEX-цвета для превью, напр. #e4cfb4 и #a9743f",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.max(2),
    }),
    defineField({ name: "rating", title: "Рейтинг", type: "number", initialValue: 4.7 }),
    defineField({ name: "inStock", title: "В наличии", type: "boolean", initialValue: true }),
    defineField({ name: "isNew", title: "Новинка", type: "boolean", initialValue: false }),
    defineField({ name: "hit", title: "Хит продаж", type: "boolean", initialValue: false }),
    defineField({ name: "desc", title: "Описание", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "name", subtitle: "material", price: "price", media: "image" },
    prepare: ({ title, subtitle, price, media }) => ({ title, subtitle: `${subtitle} · ${price} р.`, media }),
  },
});
