import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const assets = [
  { name: 'hero.jpg', id: '1zoIeaIxCxXCTBMnyxw2o23-dbuQKwOUf', min: 500000 },
  { name: 'santa-fe-sin-hambre.jpg', id: '1ZHbq2rAz9S3PY9Rvhkm6ygMrBMNzkJwX', min: 200000 },
  { name: 'actividad.jpg', id: '1Yjil6-BYX4P3OvO8SkYRZmFyIt2Bp685', min: 500000 },
  { name: 'organizacion.jpg', id: '1_BQBUajl1WP_mQhq3cBy5ZDRRTgFBlKZ', min: 500000 },
  { name: 'logo.png', id: '1Vyaw-61UKtqBYUKmPu9KwnOBaFehErXc', min: 5000 },
  { name: 'logo-white.png', id: '10CZgCff-5dgUg-327k5reAXJjDy102a4', min: 5000 }
];

const outDir = join(process.cwd(), 'public', 'images');
await mkdir(outDir, { recursive: true });

async function download(id) {
  const urls = [
    `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${id}`
  ];
  let lastError;
  for (const url of urls) {
    try {
      const response = await fetch(url, { redirect: 'follow' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!type.startsWith('image/') && bytes.length < 100000) throw new Error(`Respuesta inválida: ${type}`);
      return bytes;
    } catch (error) { lastError = error; }
  }
  throw lastError;
}

for (const asset of assets) {
  const bytes = await download(asset.id);
  if (bytes.length < asset.min) throw new Error(`${asset.name}: archivo demasiado pequeño (${bytes.length})`);
  await writeFile(join(outDir, asset.name), bytes);
  console.log(`✓ ${asset.name}: ${(bytes.length / 1024 / 1024).toFixed(1)} MB`);
}
