// Конфигурация встроенной студии Sanity (админка по адресу /studio).
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "kovryby",
  title: "КовёрБай — CMS",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
