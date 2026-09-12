import { defineConfig } from "sanity";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "fuerza-comun",
  title: "Fuerza Común",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aaaaaaaa",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  schema: { types: schemaTypes }
});
