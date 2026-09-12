import { cp, mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
const assets = ["hero.webp", "santa-fe-sin-hambre.webp", "actividad.webp", "actualidad.webp", "logo.webp", "logo-white.webp"];
for (const file of assets) {
  try { await cp(`images/${file}`, `public/images/${file}`); } catch {}
}
