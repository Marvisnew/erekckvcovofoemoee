import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Клиент создаётся только при наличии projectId (иначе используем демо-данные).
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
