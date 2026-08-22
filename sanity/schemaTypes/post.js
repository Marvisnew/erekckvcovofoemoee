import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const post = defineType({
  name: "post",
  title: "Статья блога",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Заголовок", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Ссылка (slug)", type: "slug",
      options: { source: "title", maxLength: 96 }, validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Короткое описание", type: "text", rows: 2,
      validation: (r) => r.max(200).warning("Лучше держать до 200 символов") }),
    defineField({ name: "date", title: "Дата публикации", type: "date", initialValue: () => new Date().toISOString().slice(0, 10) }),
    defineField({
      name: "category", title: "Рубрика", type: "string",
      options: { list: ["Гид покупателя", "Уход", "Тренды интерьера"] },
    }),
    defineField({ name: "readingTime", title: "Время чтения, мин", type: "number", initialValue: 4 }),
    defineField({
      name: "coverImage", title: "Обложка статьи", type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cover", title: "Цвета обложки (2 hex, запасной вариант)", type: "array",
      description: "Используется как градиент-заглушка, если обложка не загружена",
      of: [defineArrayMember({ type: "string" })], validation: (r) => r.max(2),
    }),
    defineField({
      name: "body", title: "Текст статьи", type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
