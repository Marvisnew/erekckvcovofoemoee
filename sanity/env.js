// Читает настройки проекта Sanity из переменных окружения.
// Пока не задан реальный projectId — сайт работает на демо-данных.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// CMS считается подключённой, только когда указан настоящий projectId.
export const sanityEnabled = Boolean(projectId);
