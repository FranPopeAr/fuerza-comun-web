'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ParticipationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setNotice('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: 'Participá', origin: window.location.pathname })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No pudimos enviar el formulario.');
      setStatus('success');
      setNotice('¡Gracias! Recibimos tus datos y nos vamos a poner en contacto.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setNotice(error instanceof Error ? error.message : 'No pudimos enviar el formulario.');
    }
  }

  return <form className="participation-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>Nombre y apellido *</span><input name="name" required autoComplete="name" /></label>
      <label><span>WhatsApp *</span><input name="whatsapp" required inputMode="tel" autoComplete="tel" /></label>
      <label><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
      <label><span>Barrio *</span><input name="neighborhood" required /></label>
      <label className="span-2"><span>¿En qué te gustaría participar? *</span><select name="interest" required defaultValue=""><option value="" disabled>Elegí una opción</option><option>Hábitat y vivienda</option><option>Ambiente y río</option><option>Géneros y diversidad</option><option>Cultura y comunicación</option><option>Deporte social</option><option>Trabajo y producción</option><option>Santa Fe Sin Hambre</option><option>Organización territorial</option><option>Quiero conocer más</option></select></label>
      <label className="span-2"><span>Mensaje</span><textarea name="message" rows={4} /></label>
      <label className="consent span-2"><input name="consent" type="checkbox" value="Sí" required /><span>Acepto que Fuerza Común utilice estos datos únicamente para contactarme y coordinar mi participación. *</span></label>
      <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Quiero participar'}</button>
    {notice && <p className={`form-message ${status}`}>{notice}</p>}
  </form>;
}
