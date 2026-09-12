import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  whatsapp?: string;
  email?: string;
  neighborhood?: string;
  interest?: string;
  message?: string;
  formType?: string;
  origin?: string;
  consent?: string;
  website?: string;
};

function clean(value: unknown, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    if (body.website) return NextResponse.json({ ok: true });

    const name = clean(body.name, 160);
    const whatsapp = clean(body.whatsapp, 80);
    const email = clean(body.email, 180);
    const neighborhood = clean(body.neighborhood, 160);
    const interest = clean(body.interest, 180);
    const message = clean(body.message, 1500);
    const formType = clean(body.formType, 80) || "Participá";
    const origin = clean(body.origin, 300);
    const consent = clean(body.consent, 20);

    if (!name || !whatsapp || !neighborhood || !interest || consent !== "Sí") {
      return NextResponse.json({ error: "Revisá los campos obligatorios antes de enviar." }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!spreadsheetId || !clientEmail || !privateKey) {
      return NextResponse.json({ error: "El formulario está listo, pero falta activar la conexión segura con Google Sheets." }, { status: 503 });
    }

    const auth = new google.auth.JWT({ email: clientEmail, key: privateKey, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
    const sheets = google.sheets({ version: "v4", auth });
    const timestamp = new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "medium", timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Inscripciones!A:J",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[timestamp, name, whatsapp, email, neighborhood, interest, message, formType, origin, consent]] }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Form submission error", error);
    return NextResponse.json({ error: "No pudimos guardar tus datos. Intentá nuevamente en unos minutos." }, { status: 500 });
  }
}
