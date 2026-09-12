import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  name?: string;
  whatsapp?: string;
  email?: string;
  neighborhood?: string;
  interest?: string;
  message?: string;
  formType?: string;
  origin?: string;
  website?: string;
  consent?: string;
};

const clean = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;

    // Honeypot: respondemos OK para no dar pistas a bots.
    if (clean(body.website)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const whatsapp = clean(body.whatsapp, 80);
    const email = clean(body.email, 160);
    const neighborhood = clean(body.neighborhood, 120);
    const interest = clean(body.interest, 160);
    const message = clean(body.message, 1200);
    const formType = clean(body.formType, 40) || 'Participá';
    const origin = clean(body.origin, 300);
    const consent = clean(body.consent, 20);

    if (!name || !whatsapp || !neighborhood || !interest || consent !== 'Sí') {
      return NextResponse.json(
        { error: 'Completá los campos obligatorios y aceptá el uso de datos para contacto.' },
        { status: 400 },
      );
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    const appsScriptSecret = process.env.APPS_SCRIPT_SECRET;

    if (!appsScriptUrl || !appsScriptSecret) {
      return NextResponse.json(
        { error: 'El formulario todavía no está conectado a Google Sheets.' },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: appsScriptSecret,
          name,
          whatsapp,
          email,
          neighborhood,
          interest,
          message,
          formType,
          origin,
          consent,
        }),
        cache: 'no-store',
        redirect: 'follow',
        signal: controller.signal,
      });

      const raw = await response.text();
      let result: { ok?: boolean; error?: string } = {};

      try {
        result = JSON.parse(raw) as { ok?: boolean; error?: string };
      } catch {
        console.error('Apps Script devolvió una respuesta no JSON.');
      }

      if (!response.ok || result.ok !== true) {
        console.error('Apps Script rechazó la inscripción:', response.status, result.error || 'sin detalle');
        return NextResponse.json(
          { error: 'No pudimos guardar la inscripción. Probá nuevamente en unos minutos.' },
          { status: 502 },
        );
      }
    } finally {
      clearTimeout(timeout);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en /api/inscripciones:', error instanceof Error ? error.message : 'desconocido');
    return NextResponse.json({ error: 'No pudimos guardar la inscripción.' }, { status: 500 });
  }
}
