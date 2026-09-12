import { defineField, defineType } from "sanity";
export const siteSettingsType = defineType({
  name: "siteSettings", title: "Configuración general", type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Título principal", type: "string" }),
    defineField({ name: "heroText", title: "Texto principal", type: "text", rows: 4 }),
    defineField({ name: "heroImage", title: "Foto principal", type: "image", options: { hotspot: true }, description: "Subir la foto original en alta resolución. Sanity conserva el archivo fuente." }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" })
  ]
});
