import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Páginas",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "eyebrow", title: "Etiqueta", type: "string" }),
    defineField({ name: "intro", title: "Introducción", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Imagen principal", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Contenido", type: "array", of: [{ type: "block" }] })
  ]
});
