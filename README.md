# КовёрБай — интернет-магазин ковров (Next.js + Sanity CMS)

Магазин ковров для Беларуси на **React + Next.js 14 (App Router)** и **Tailwind CSS**,
с бесплатной headless-CMS **Sanity**. Админка встроена в сам сайт по адресу **/studio**.

## Возможности
- Каталог товаров, страницы товара, фильтры и живой поиск, сортировка
- Блог со статьями (Portable Text)
- Адаптивный дизайн, SEO-метаданные, статическая генерация
- **CMS Sanity**: товары и статьи редактируются на /studio
- Умный фолбэк: пока Sanity не настроен, сайт работает на встроенных демо-данных,
  поэтому сборка и деплой никогда не падают из-за отсутствия ключей

## Быстрый старт (локально)
```bash
npm install
npm run dev        # сайт: http://localhost:3000  •  админка: http://localhost:3000/studio
```
Без ключей Sanity сайт сразу работает на демо-данных.

## Подключение бесплатной CMS Sanity (5–10 минут)
1. Создайте бесплатный аккаунт на https://sanity.io и проект (план Free).
   Быстрее всего: `npx sanity@latest init --env` — он создаст проект и запишет ключи в `.env.local`.
   Либо возьмите **Project ID** в https://www.sanity.io/manage.
2. Скопируйте `.env.local.example` в `.env.local` и заполните:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ваш_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. Разрешите доступ с сайта (CORS):
   ```bash
   npx sanity cors add http://localhost:3000 --credentials
   ```
4. Залейте демо-контент в CMS (12 товаров + 4 статьи):
   ```bash
   npx sanity dataset import sanity/seed.ndjson production
   ```
5. `npm run dev` → откройте `/studio`, войдите — можно редактировать товары и статьи.
   Как только в датасете есть документы, сайт берёт данные из Sanity автоматически.

## Деплой на Vercel
1. Загрузите папку в репозиторий GitHub.
2. vercel.com → **Add New → Project** → импортируйте репозиторий (определится Next.js).
3. В **Environment Variables** добавьте те же переменные, что в `.env.local`.
4. **Deploy**. Затем добавьте прод-домен в CORS:
   ```bash
   npx sanity cors add https://ваш-домен.vercel.app --credentials
   ```
5. Мгновенное обновление кэша при правках в CMS (необязательно):
   Sanity Manage → API → Webhooks → URL `https://ваш-домен/api/revalidate`,
   секрет = `SANITY_REVALIDATE_SECRET`, projection: `{ "tags": [_type] }`.

## Структура
- `app/(site)/` — витрина (главная, каталог, товар, блог) с шапкой/подвалом
- `app/studio/` — встроенная админка Sanity
- `app/api/revalidate/` — вебхук обновления кэша
- `components/` — UI-компоненты
- `data/` — демо-данные + слой `source.js` (Sanity ↔ демо)
- `sanity/` — конфиг, схемы (`product`, `post`), клиент, GROQ-запросы, `seed.ndjson`

## Дальнейшие шаги
- Корзина и оформление заказа, оплата bePaid/ЕРИП
- Категории как отдельный тип-справочник (reference)
