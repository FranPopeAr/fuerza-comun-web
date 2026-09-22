import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const DRIVE_DOMAIN = 'drive.usercontent.google.com';

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

function validateId(id) {
  if (typeof id !== 'string') throw new Error('Invalid ID type');
  if (!/^[a-zA-Z0-9_-]{20,}$/.test(id)) throw new Error('Invalid ID format');
  return true;
}

function validateExtension(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) throw new Error(`Invalid extension: ${ext}`);
  return ext;
}

function validateContentType(type) {
  const basetype = (type.split(';')[0] || '').trim().toLowerCase();
  if (!ALLOWED_MIMETYPES.includes(basetype)) throw new Error(`Invalid MIME type: ${basetype}`);
  return basetype;
}

async function download(id) {
  validateId(id);

  const url = new URL(`https://${DRIVE_DOMAIN}/download`);
  url.searchParams.set('id', id);
  url.searchParams.set('export', 'download');
  url.searchParams.set('confirm', 't');

  try {
    const response = await fetch(url.toString(), {
      redirect: 'follow',
      headers: { 'User-Agent': 'FuerzaComun-AssetFetcher/1.0' },
      timeout: 30000
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentType = response.headers.get('content-type') || '';
    const contentLength = parseInt(response.headers.get('content-length') || '0');

    validateContentType(contentType);

    if (contentLength > MAX_FILE_SIZE) {
      throw new Error(`Content-Length exceeds maximum: ${contentLength} bytes`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());

    if (bytes.length > MAX_FILE_SIZE) {
      throw new Error(`Downloaded file exceeds maximum size: ${bytes.length} bytes`);
    }

    if (bytes.length < 1000) {
      throw new Error(`File too small: ${bytes.length} bytes`);
    }

    return bytes;
  } catch (error) {
    throw new Error(`Download failed for ID ${id}: ${error.message}`);
  }
}

for (const asset of assets) {
  validateExtension(asset.name);

  const bytes = await download(asset.id);
  if (bytes.length < asset.min) {
    throw new Error(`${asset.name}: archivo demasiado pequeño (${bytes.length} < ${asset.min})`);
  }

  const outputPath = join(outDir, asset.name);
  await writeFile(outputPath, bytes, { mode: 0o644 });
  console.log(`✓ ${asset.name}: ${(bytes.length / 1024 / 1024).toFixed(1)} MB`);
}
