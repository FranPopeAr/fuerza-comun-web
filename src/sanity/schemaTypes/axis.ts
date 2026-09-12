import { defineField, defineType } from "sanity";
export const axisType = defineType({
  name: "axis", title: "Ejes", type: "document",
  fields: [
    defineField({ name: "index", title: "Número", type: "string", description: "Ej.: 01" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
    defineField({ name: "title", title: "Nombre", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "summary", title: "Descripción corta", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Contenido", type: "array", of: [{ type: "block" }] })
  ]
});
