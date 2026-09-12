import { defineField, defineType } from "sanity";
export const newsType = defineType({
  name: "news", title: "Actualidad", type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "category", title: "Categoría", type: "string" }),
    defineField({ name: "summary", title: "Bajada", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true }, description: "Usar la imagen original en alta resolución." }),
    defineField({ name: "publishedAt", title: "Fecha", type: "datetime" }),
    defineField({ name: "featured", title: "Destacada", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Contenido", type: "array", of: [{ type: "block" }] })
  ]
});
