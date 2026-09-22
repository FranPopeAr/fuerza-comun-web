import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const assets = [
  { name: 'hero.jpg', id: '1zoIeaIxCxXCTBMnyxw2o23-dbuQKwOUf', min: 500000 },
  { name: 'santa-fe-sin-hambre.jpg', id: '1ZHbq2rAz9S3PY9Rvhkm6ygMrBMNzkJwX', min: 200000 },
  { name: 'actividad.jpg', id: '1Yjil6-BYX4P3OvO8SkYRZmFyIt2Bp685', min: 500000 },
  { name: 'organizacion.jpg', id: '1_BQBUajl1WP_mQhq3cBy5ZDRRTgFBlKZ', min: 500000 },
  { name: 'plenario-11.jpg', id: '1af2Z_k0fyXk5oQ11kKjN17jJu6JpiDbl', min: 500000 },
  { name: 'plenario-15.jpg', id: '1kHoW0PZ3jvDlVHKDpQqqB1oYKhnhkcrb', min: 500000 },
  { name: 'plenario-17.jpg', id: '1cS61G1Z_IiABL5majT58n7jwCgWo3idl', min: 500000 },
  { name: 'plenario-1.jpg', id: '1JNb1hSh8cD_plHK8rOs3fI-cMkbjQCU5', min: 500000 },
  { name: 'plenario-3.jpg', id: '1T8Xnom5eNIJwxlAqhDqmJTttC-jnt4gU', min: 500000 },
  { name: 'plenario-7.jpg', id: '1wSdRx4vEaeofvEoUTd4VwDsf-2_EDblt', min: 500000 },
  { name: 'plenario-20.jpg', id: '1cQHnOwKIA4NhpaN1wTQWiOpedjmrpBSn', min: 500000 },
  { name: 'plenario-23.jpg', id: '1KYVssqFNGzSc-dhN_pV2QjABW1bydmgi', min: 500000 },
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
