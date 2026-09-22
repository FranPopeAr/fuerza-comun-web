const GOOGLE_FORM_URL = 'https://forms.gle/11D78xFXhfVBZtga9';

export function ParticipationForm() {
  return (
    <div
      className="participation-form"
      style={{ padding: 0, overflow: 'hidden', background: '#fff' }}
    >
      <iframe
        src={GOOGLE_FORM_URL}
        title="Formulario para sumarse a Fuerza Común"
        width="100%"
        height="1450"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        loading="lazy"
        sandbox="allow-same-origin allow-forms allow-popups allow-presentation"
        referrerPolicy="no-referrer"
        allow="camera 'none'; microphone 'none'; geolocation 'none'"
        style={{ display: 'block', width: '100%', minHeight: '1450px', border: 0 }}
      >
        Cargando…
      </iframe>
      <p style={{ margin: 0, padding: '18px 24px 24px', fontSize: '14px', lineHeight: 1.6 }}>
        Si el formulario no se muestra correctamente,{' '}
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 800, textDecoration: 'underline' }}
        >
          abrilo directamente en Google Forms
        </a>.
      </p>
    </div>
  );
}
