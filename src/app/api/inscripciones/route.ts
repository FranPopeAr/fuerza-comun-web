import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = { name?: string; whatsapp?: string; email?: string; neighborhood?: string; interest?: string; message?: string; formType?: string; origin?: string; website?: string; consent?: string; };
const clean = (value: unknown, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    if (clean(body.website)) return NextResponse.json({ ok: true });
    const name = clean(body.name, 120), whatsapp = clean(body.whatsapp, 80), email = clean(body.email, 160);
    const neighborhood = clean(body.neighborhood, 120), interest = clean(body.interest, 160), message = clean(body.message, 1200);
    const formType = clean(body.formType, 40) || 'Participá', origin = clean(body.origin, 300), consent = clean(body.consent, 20);
    if (!name || !whatsapp || !neighborhood || !interest || consent !== 'Sí') return NextResponse.json({ error: 'Completá los campos obligatorios y aceptá el uso de datos para contacto.' }, { status: 400 });

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!spreadsheetId || !clientEmail || !privateKey) return NextResponse.json({ error: 'El formulario todavía no está conectado a Google Sheets.' }, { status: 503 });

    const auth = new google.auth.JWT({ email: clientEmail, key: privateKey, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
    await sheets.spreadsheets.values.append({ spreadsheetId, range: 'Inscripciones!A:J', valueInputOption: 'USER_ENTERED', insertDataOption: 'INSERT_ROWS', requestBody: { values: [[timestamp, name, whatsapp, email, neighborhood, interest, message, formType, origin, consent]] } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'No pudimos guardar la inscripción.' }, { status: 500 });
  }
}
