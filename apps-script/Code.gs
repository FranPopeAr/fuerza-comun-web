const SPREADSHEET_ID = '1hTLD_GAu1ctlT3SkHLwMwLMhGznhI2AXD39deRfvU4E';
const SHEET_NAME = 'Inscripciones';

// Reemplazá este texto por una clave larga y aleatoria.
// Usá exactamente la misma clave en Vercel como APPS_SCRIPT_SECRET.
const SHARED_SECRET = 'REEMPLAZAR_POR_UN_SECRETO_LARGO_Y_ALEATORIO';

function doPost(e) {
  let lock;

  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (!data.secret || data.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const name = clean(data.name, 120);
    const whatsapp = clean(data.whatsapp, 80);
    const email = clean(data.email, 160);
    const neighborhood = clean(data.neighborhood, 120);
    const interest = clean(data.interest, 160);
    const message = clean(data.message, 1200);
    const formType = clean(data.formType, 40) || 'Participá';
    const origin = clean(data.origin, 300);
    const consent = clean(data.consent, 20);

    if (!name || !whatsapp || !neighborhood || !interest || consent !== 'Sí') {
      return jsonResponse({ ok: false, error: 'invalid_payload' });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ ok: false, error: 'sheet_not_found' });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    sheet.appendRow([
      new Date(),
      safeCell(name),
      safeCell(whatsapp),
      safeCell(email),
      safeCell(neighborhood),
      safeCell(interest),
      safeCell(message),
      safeCell(formType),
      safeCell(origin),
      safeCell(consent),
    ]);

    SpreadsheetApp.flush();
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse({ ok: false, error: 'internal_error' });
  } finally {
    if (lock) {
      try {
        lock.releaseLock();
      } catch (_) {}
    }
  }
}

function clean(value, maxLength) {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, maxLength);
}

// Evita que datos enviados por usuarios se interpreten como fórmulas de Sheets.
// El apóstrofo no se muestra visualmente en la celda.
function safeCell(value) {
  if (!value) return '';
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
