import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ParticipationForm } from '@/components/ParticipationForm';

const SANITY_PROJECT_ID = 'bhfaic2v';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2025-02-19';
const EVENT_SLUG = 'hacer-en-comun-19-septiembre';
const EVENT_FORM_URL = 'https://forms.gle/td9Z3RZ6q3pwtrLB9';
const EVENT_IMAGE = 'https://drive.google.com/uc?export=view&id=1nC7Zkl6e_6askx9PAnioEVLTkUFFGjfl';
const PLENARIO_SLUG = 'plenario-hacer-en-comun-septiembre-2026';
const PLENARIO_REEL_URL = 'https://www.instagram.com/reel/DdhNoqsRcZg/';
const PLENARIO_REEL_EMBED = 'https://www.instagram.com/reel/DdhNoqsRcZg/embed';
const ROU_SLUG = 'acompanamos-comunicado-entornos-urbanos-riberenos';
const PLENARIO_GALLERY = [
  '/images/plenario-15.jpg',
  '/images/plenario-17.jpg',
  '/images/plenario-1.jpg',
  '/images/plenario-3.jpg',
  '/images/plenario-7.jpg',
  '/images/plenario-20.jpg',
  '/images/plenario-23.jpg',
];

type SanityBlock = {
  _key?: string;
  style?: string;
  children?: Array<{ text?: string }>;
};

type Settings = {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  pillars: Array<{ title: string; text: string }>;
  sfshTitle: string;
  sfshText: string;
  territoryTitle: string;
  territoryText: string;
  ctaTitle: string;
  ctaText: string;
};

type AxisData = {
  slug: string;
  index: string;
  title: string;
  text: string;
  body: string[];
};

type ArticleData = {
  slug: string;
  category: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  body: string[];
};

type AboutData = {
  eyebrow: string;
  lead: string;
  body: string[];
};

type SiteContent = {
  settings: Settings;
  axes: AxisData[];
  news: ArticleData[];
  about: AboutData;
};

const featuredEvent: ArticleData = {
  slug: EVENT_SLUG,
  category: 'Fuerza Común',
  title: 'Hacer en Común: resultados, encuentro y nueva etapa de voluntariado',
  text: 'El sábado 19 de septiembre nos encontramos para compartir los resultados de Santa Fe Sin Hambre y lanzar una nueva etapa de voluntariado.',
  image: EVENT_IMAGE,
  imageAlt: 'Invitación al encuentro Hacer en Común de Fuerza Común',
  body: [
    'Queremos invitarte a Hacer en Común, un nuevo encuentro de Fuerza Común. Vamos a compartir los resultados del relevamiento “Santa Fe sin Hambre” y empezar a planificar juntos lo que viene.',
    'Durante 60 días recorrimos barrios, comedores y espacios comunitarios. Ahora vamos a presentar los principales datos, compartir un audiovisual realizado durante el relevamiento y poner en común toda la experiencia.',
    'También vamos a lanzar una nueva etapa de voluntariado Hacer en Común, con cuatro dispositivos de trabajo:',
    '🩺 Salud',
    '🤝 Trabajo comunitario',
    '🧒 Infancias, Arte y Cultura',
    '📚 Educativo',
    'Después de la presentación vamos a trabajar en comisiones, para pensar colectivamente qué acciones podemos construir en esta nueva etapa marcada por el deterioro de la vida de miles de santafesinas y santafesinos y la emergencia hídrica.',
    '📅 Sábado 19/09 · 🕐 9:00 · 📍 FESTRAM, Av. Freyre 1635.',
    'Es necesario inscribirse previamente en el formulario. ¡Te esperamos!',
  ],
};

const fallbackSettings: Settings = {
  heroEyebrow: 'Fuerza Común · Santa Fe',
  heroTitle: 'Sentir en común para transformarlo todo.',
  heroIntro: 'Somos un espacio político y social de Santa Fe que construye comunidad y organiza respuestas colectivas frente a la desigualdad.',
  pillars: [
    { title: 'Organización', text: 'Construimos poder desde los barrios, las escuelas, los clubes, los comedores y los espacios comunitarios.' },
    { title: 'Comunidad', text: 'Creemos que nadie se salva solo. La solidaridad y el trabajo colectivo son una forma de hacer política todos los días.' },
    { title: 'Visión', text: 'Pensamos una ciudad que pueda decidir su rumbo y construir respuestas comunes a sus problemas.' },
    { title: 'Transformación', text: 'Impulsamos una Santa Fe más justa, con vivienda, trabajo, ambiente sano, cultura y deporte para todos.' },
  ],
  sfshTitle: 'Una respuesta colectiva frente a la emergencia alimentaria.',
  sfshText: 'Santa Fe Sin Hambre releva comedores, copas de leche y merenderos junto a organizaciones sociales y espacios comunitarios para construir información, visibilizar la situación alimentaria y fortalecer las redes que sostienen cada barrio.',
  territoryTitle: 'Estamos acá.',
  territoryText: 'La política se construye donde transcurre la vida cotidiana. El mapa territorial va a reunir espacios, proyectos, actividades y presencia en los barrios de Santa Fe.',
  ctaTitle: 'La fuerza para cambiar Santa Fe está en su gente.',
  ctaText: 'Cuando esa fuerza se encuentra y se organiza, se vuelve Fuerza Común.',
};

const fallbackAxes: AxisData[] = [
  { slug: 'habitat-y-vivienda', index: '01', title: 'Hábitat y vivienda', text: 'Tierra, vivienda e integración sociourbana como derechos.', body: ['Pensamos el hábitat como una dimensión central del derecho a la ciudad: acceso a la tierra, vivienda digna, infraestructura y servicios adecuados.', 'Este espacio reunirá propuestas, actividades y documentos vinculados con vivienda, integración sociourbana y planificación urbana.'] },
  { slug: 'ambiente-y-rio', index: '02', title: 'Ambiente y río', text: 'Defensa del Paraná, los humedales y los bienes comunes frente al saqueo.', body: ['El río y los humedales son parte de la identidad y del futuro de Santa Fe. Su cuidado requiere políticas públicas, participación y una mirada de largo plazo.', 'Acá vamos a organizar propuestas y acciones sobre ambiente, bienes comunes y relación de la ciudad con el Paraná.'] },
  { slug: 'genero-y-diversidad', index: '03', title: 'Género y Diversidad', text: 'Políticas de igualdad, diversidad y reconocimiento del trabajo de cuidados.', body: ['Queremos una ciudad que garantice derechos y condiciones de vida más igualitarias para todas las personas.', 'Este eje reúne debates, iniciativas y acciones vinculadas con géneros, diversidad, cuidados y prevención de las violencias.'] },
  { slug: 'cultura-y-comunicacion', index: '04', title: 'Cultura y comunicación', text: 'Espacios culturales, medios y producción colectiva de sentido.', body: ['La cultura y la comunicación son herramientas para construir identidad, participación y vínculos colectivos.', 'Acá reuniremos actividades culturales, propuestas de comunicación y experiencias que amplíen el acceso a la producción cultural en la ciudad.'] },
  { slug: 'deporte-social', index: '05', title: 'Deporte social', text: 'Clubes, playones y deporte comunitario como herramientas de inclusión y organización.', body: ['Los clubes y espacios deportivos cumplen un papel central en la vida de los barrios y en la construcción de vínculos.', 'Este eje reúne iniciativas para fortalecer el deporte social, las instituciones y el acceso a actividades deportivas.'] },
  { slug: 'trabajo-y-produccion', index: '06', title: 'Trabajo y producción', text: 'Economía popular, cooperativas, pymes y empleo digno.', body: ['Una ciudad con futuro necesita generar trabajo, fortalecer su entramado productivo y acompañar a quienes producen.', 'Acá vamos a reunir propuestas sobre empleo, economía popular, cooperativas, pymes y desarrollo productivo local.'] },
];

const fallbackNews: ArticleData[] = [
  featuredEvent,
  { slug: 'relevamientos-en-comedores-y-barrios', category: 'Santa Fe Sin Hambre', title: 'Relevamientos en comedores y barrios', text: 'Construimos un mapa de la emergencia alimentaria junto a organizaciones sociales y espacios comunitarios de toda la ciudad.', image: '/images/santa-fe-sin-hambre.jpg', imageAlt: 'Santa Fe Sin Hambre', body: ['Santa Fe Sin Hambre releva comedores, copas de leche y merenderos para construir información sobre la situación alimentaria de la ciudad.', 'La web va a incorporar el material histórico de la campaña y los resultados 2026 cuando sean publicados.'] },
  { slug: 'debate-por-una-ciudad-mas-justa', category: 'Ciudad', title: 'Participamos del debate por una ciudad más justa', text: 'Llevamos propuestas sobre hábitat, integración sociourbana, ambiente y participación para ampliar derechos.', image: '/images/actividad.jpg', imageAlt: 'Actividad de Fuerza Común', body: ['Participamos de instancias de discusión sobre el presente y el futuro de Santa Fe con una mirada centrada en derechos, participación y planificación.', 'Este espacio va a reunir documentos, propuestas y materiales vinculados con esos debates.'] },
  { slug: 'organizacion-y-participacion', category: 'Organización', title: 'La ciudad se transforma con organización y participación', text: 'Nos encontramos en barrios, clubes, universidades y organizaciones para construir respuestas colectivas.', image: '/images/organizacion.jpg', imageAlt: 'Encuentro de Fuerza Común', body: ['Fuerza Común se construye a partir del encuentro, la participación y el trabajo colectivo en distintos espacios de la ciudad.', 'Queremos que esta web sea también una herramienta para facilitar esos encuentros y acercar nuevas personas a las actividades.'] },
];

const fallbackAbout: AboutData = {
  eyebrow: 'Quiénes somos',
  lead: 'Construir para nuestros problemas respuestas comunes.',
  body: [
    'Fuerza Común es un espacio político nacido en 2022 y construido por personas que creemos que nuestra ciudad puede estar mejor y que transformarla es un derecho que se ejerce mediante la organización y el compromiso colectivo.',
    'Nacimos del encuentro de personas con recorridos distintos: trabajadores y trabajadoras, jóvenes, estudiantes, profesionales, referentes barriales, vecinales, deportivos, culturales, sindicales y de organizaciones sociales. Nos une una convicción: los grandes problemas de Santa Fe no se resuelven de manera individual o sectorial. Necesitamos construir, para nuestros problemas, respuestas comunes. Para nuestros sueños colectivos, un camino colectivo.',
    'Hacemos política desde la realidad cotidiana de nuestra ciudad. Desde los barrios, los lugares de trabajo, las universidades, los clubes, las organizaciones y cada espacio donde las y los santafesinos se organizan para mejorar su comunidad.',
    'Queremos una Santa Fe que genere trabajo y producción, que defienda desde su lugar la educación y la salud pública, que acompañe a quienes más lo necesitan, que recupere y aproveche sus recursos estratégicos y que brinde oportunidades para que nuestros jóvenes puedan construir su futuro acá.',
    'Creemos en una política que escuche, que esté presente y que vuelva a involucrar a la comunidad en las decisiones y acciones sobre el rumbo de la ciudad.',
    'No pensamos Fuerza Común como un espacio cerrado. Queremos encontrarnos con todos aquellos que, aun viniendo de experiencias y tradiciones diferentes, compartan la necesidad de construir una Santa Fe más justa, soberana, productiva y solidaria.',
  ],
};

function blockText(block?: SanityBlock) {
  return (block?.children ?? []).map((child) => child.text ?? '').join('').trim();
}

function bodyParagraphs(body?: SanityBlock[]) {
  return (body ?? []).map(blockText).filter(Boolean);
}

async function loadContent(): Promise<SiteContent> {
  const query = `{
    "settings": *[_type == "siteSettings"][0]{
      heroEyebrow, heroTitle, heroIntro, pillars,
      sfshTitle, sfshText, territoryTitle, territoryText, ctaTitle, ctaText
    },
    "axes": *[_type == "axis"] | order(order asc){
      order, title, "slug": slug.current, summary, body
    },
    "articles": *[_type == "article"] | order(coalesce(publishedAt, _createdAt) desc){
      category, title, "slug": slug.current, summary,
      "imageUrl": image.asset->url, imageAlt, fallbackImage, body
    },
    "about": *[_type == "page" && slug.current == "quienes-somos"][0]{
      eyebrow, lead, body
    }
  }`;
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return { settings: fallbackSettings, axes: fallbackAxes, news: fallbackNews, about: fallbackAbout };

    const payload = await response.json() as {
      result?: {
        settings?: Partial<Settings> | null;
        axes?: Array<{ order?: number; title?: string; slug?: string; summary?: string; body?: SanityBlock[] }>;
        articles?: Array<{ category?: string; title?: string; slug?: string; summary?: string; imageUrl?: string; imageAlt?: string; fallbackImage?: string; body?: SanityBlock[] }>;
        about?: { eyebrow?: string; lead?: string; body?: SanityBlock[] } | null;
      };
    };

    const result = payload.result;
    if (!result) return { settings: fallbackSettings, axes: fallbackAxes, news: fallbackNews, about: fallbackAbout };

    const settings: Settings = {
      ...fallbackSettings,
      ...(result.settings ?? {}),
      pillars: result.settings?.pillars?.length
        ? result.settings.pillars.map((p) => ({ title: p.title ?? '', text: p.text ?? '' })).filter((p) => p.title && p.text)
        : fallbackSettings.pillars,
    };

    const axes: AxisData[] = result.axes?.length
      ? result.axes.map((a, i) => ({
          slug: a.slug || fallbackAxes[i]?.slug || `eje-${i + 1}`,
          index: String(a.order ?? i + 1).padStart(2, '0'),
          title: a.title || fallbackAxes[i]?.title || 'Eje',
          text: a.summary || fallbackAxes[i]?.text || '',
          body: bodyParagraphs(a.body).length ? bodyParagraphs(a.body) : fallbackAxes[i]?.body ?? [],
        }))
      : fallbackAxes;

    const sanityNews: ArticleData[] = result.articles?.length
      ? result.articles.map((a, i) => ({
          slug: a.slug || fallbackNews[i]?.slug || `actualidad-${i + 1}`,
          category: a.category || fallbackNews[i]?.category || 'Actualidad',
          title: a.title || fallbackNews[i]?.title || 'Actualidad',
          text: a.summary || fallbackNews[i]?.text || '',
          image: a.imageUrl || a.fallbackImage || fallbackNews[i]?.image || '/images/organizacion.jpg',
          imageAlt: a.imageAlt || a.title || fallbackNews[i]?.imageAlt || '',
          body: bodyParagraphs(a.body).length ? bodyParagraphs(a.body) : fallbackNews[i]?.body ?? [],
        }))
      : fallbackNews.filter((n) => n.slug !== EVENT_SLUG);

    const news = sanityNews.some((n) => n.slug === EVENT_SLUG) ? sanityNews : [featuredEvent, ...sanityNews];

    const aboutBody = bodyParagraphs(result.about?.body);
    const about: AboutData = {
      eyebrow: result.about?.eyebrow || fallbackAbout.eyebrow,
      lead: result.about?.lead || fallbackAbout.lead,
      body: aboutBody.length ? aboutBody : fallbackAbout.body,
    };

    return { settings, axes, news, about };
  } catch {
    return { settings: fallbackSettings, axes: fallbackAxes, news: fallbackNews, about: fallbackAbout };
  }
}

function Header() {
  const links = [['Qué somos','/quienes-somos'],['Ejes','/ejes'],['Santa Fe Sin Hambre','/santa-fe-sin-hambre'],['Actualidad','/actualidad'],['Territorio','/territorio']];
  return <header className="site-header"><div className="container header-inner"><Link className="brand" href="/"><Image src="/images/logo.png" alt="Fuerza Común" width={188} height={74} priority /></Link><nav className="desktop-nav">{links.map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}<Link className="button button-small" href="/participa">Participá</Link></nav><details className="mobile-menu"><summary>Menú</summary><div className="mobile-menu-panel">{links.map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}<Link href="/participa">Participá</Link></div></details></div></header>;
}

function Footer() { return <footer className="footer"><div className="container footer-grid"><div><Image src="/images/logo-white.png" alt="Fuerza Común" width={210} height={82} /><p className="footer-tagline">Sentir en común para transformarlo todo.</p></div><div className="footer-links"><Link href="/quienes-somos">Quiénes somos</Link><Link href="/ejes">Nuestros ejes</Link><Link href="/santa-fe-sin-hambre">Santa Fe Sin Hambre</Link><Link href="/participa">Participá</Link></div><div className="footer-links"><a href="https://www.instagram.com/fuerzacomun_/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/fuerzacomunsf?locale=es_LA" target="_blank" rel="noreferrer">Facebook</a><span>Santa Fe, Argentina</span></div></div><div className="container footer-bottom">© Fuerza Común</div></footer>; }

function Heading({ eyebrow, title, inverted=false }: { eyebrow:string; title:string; inverted?:boolean }) { return <div className={`section-heading ${inverted?'inverted':''}`}><span>{eyebrow}</span><h2>{title}</h2></div>; }

function HeroTitle({text}:{text:string}) {
  const marker = ' para ';
  const split = text.indexOf(marker);
  if (split < 0) return <>{text}</>;
  return <>{text.slice(0, split)}<br />{text.slice(split + 1)}</>;
}

function Home({settings, axes, news}:{settings:Settings; axes:AxisData[]; news:ArticleData[]}) {
  const homeNews = news.filter((n) => n.slug !== PLENARIO_SLUG);
  return <><Header /><main>
  <section className="hero"><Image className="hero-image" src="/images/hero.jpg" alt="Encuentro de Fuerza Común" fill priority quality={95} sizes="100vw" /><div className="hero-overlay" /><div className="container hero-content"><p className="eyebrow light">{settings.heroEyebrow}</p><h1><HeroTitle text={settings.heroTitle}/></h1><p className="hero-copy">{settings.heroIntro}</p><div className="hero-actions"><Link href="/participa" className="button">Sumate</Link><Link href="/quienes-somos" className="button button-ghost-light">Conocenos</Link></div></div></section>
  <section className="section section-light plenario-home" style={{borderBottom:'1px solid rgba(46,45,44,.18)'}}><div className="container sfsh-grid"><div className="sfsh-image-wrap plenario-home-image"><Image src="/images/plenario-11.jpg" alt="Plenario Hacer en Común de Fuerza Común" fill priority quality={95} sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="sfsh-copy"><p className="eyebrow">Plenario Hacer en Común · 19 de septiembre</p><h2>Nos encontramos para organizar lo que viene.</h2><p>Personas de distintos sectores y edades participaron de una nueva jornada de debate y organización, una característica que sigue marcando la construcción de Fuerza Común.</p><p>Trabajamos en <strong>siete comisiones</strong> alrededor de cuatro grandes temas: Salud y prevención de consumos y violencia de género; Trabajo comunitario; Infancias, Arte y Cultura; y Educación.</p><div className="hero-actions"><Link className="button" href={`/actualidad/${PLENARIO_SLUG}`}>Ver el Plenario</Link><a className="button button-dark" href={PLENARIO_REEL_URL} target="_blank" rel="noreferrer">Ver publicación en Instagram</a></div></div></div></section>
  <section className="section section-light"><div className="container"><Heading eyebrow="01 / Fuerza Común" title="Una fuerza que nace de encontrarnos." /><div className="pillars-grid">{settings.pillars.map((p,i)=><article className="pillar-card" key={`${p.title}-${i}`}><span className="card-number">{String(i+1).padStart(2,'0')}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div></div></section>
  <section className="section axes-section"><div className="container"><Heading eyebrow="02 / Nuestros ejes" title="Lo común también se construye con prioridades." inverted /><div className="axes-grid">{axes.map(a=><Link className="axis-card" key={a.slug} href={`/ejes/${a.slug}`}><span>{a.index}</span><h3>{a.title}</h3><p>{a.text}</p><b>↗</b></Link>)}</div></div></section>
  <section className="section sfsh-section"><div className="container sfsh-grid"><div className="sfsh-image-wrap"><Image src="/images/santa-fe-sin-hambre.jpg" alt="Santa Fe Sin Hambre" fill quality={95} sizes="(max-width: 800px) 100vw, 50vw" /><span className="image-label">Santa Fe Sin Hambre</span></div><div className="sfsh-copy"><p className="eyebrow">03 / Proyecto destacado</p><h2>{settings.sfshTitle}</h2><p>{settings.sfshText}</p><div className="data-note"><strong>2026</strong><span>Los nuevos resultados se incorporarán cuando finalice su publicación.</span></div><Link className="button button-dark" href="/santa-fe-sin-hambre">Conocé el proyecto</Link></div></div></section>
  <section className="section section-light"><div className="container"><Heading eyebrow="04 / Ahora" title="Lo que estamos haciendo." /><div className="news-grid">{homeNews.map(n=><article className="news-card" key={n.slug}>{n.slug===ROU_SLUG?<div className="news-image rou-card-visual"><span>Ambiente y río</span><strong>Ordenamiento urbano</strong></div>:<div className="news-image"><Image src={n.image} alt={n.imageAlt} fill quality={92} sizes="(max-width: 800px) 100vw, 33vw" style={n.slug===EVENT_SLUG?{objectFit:'contain',background:'#f3f2f0'}:undefined} /></div>}<div className="news-body"><span>{n.category}</span><h3>{n.title}</h3><p>{n.text}</p><Link href={`/actualidad/${n.slug}`}>Leer más →</Link></div></article>)}</div></div></section>
  <section className="section territory-section"><div className="container territory-grid"><div><Heading eyebrow="05 / Territorio" title={settings.territoryTitle} inverted /><p className="territory-copy">{settings.territoryText}</p><Link className="button button-light" href="/territorio">Ver territorio</Link></div><Map /></div></section>
  <section className="cta-section"><div className="container cta-inner"><p className="eyebrow">06 / Participá</p><h2>{settings.ctaTitle}</h2><p>{settings.ctaText}</p><Link className="button button-dark" href="/participa">Quiero sumarme</Link></div></section>
</main><Footer /></>; }

function Map() { return <div className="map-placeholder"><div className="map-river"/><span className="map-dot dot-1"/><span className="map-dot dot-2"/><span className="map-dot dot-3"/><span className="map-dot dot-4"/><span className="map-dot dot-5"/><span className="map-caption">Mapa interactivo · próxima etapa</span></div>; }
function Shell({children}:{children:React.ReactNode}) { return <><Header /><main className="internal-page">{children}</main><Footer /></>; }

function About({about}:{about:AboutData}) { return <Shell><section className="internal-hero"><div className="container"><p className="eyebrow">{about.eyebrow}</p><h1>{about.lead}</h1></div></section><section className="section section-light"><div className="container prose-layout"><aside><span>Fuerza Común</span><strong>Santa Fe</strong></aside><div className="prose">{about.body.map((p,i)=><p key={i}>{p}</p>)}<blockquote>La fuerza para cambiar Santa Fe está en su gente. Cuando esa fuerza se encuentra y se organiza, se vuelve Fuerza Común.</blockquote><Link className="button" href="/participa">Participá</Link></div></div></section></Shell>; }
function Axes({axes}:{axes:AxisData[]}) { return <Shell><section className="internal-hero"><div className="container"><p className="eyebrow">Nuestros ejes</p><h1>Seis prioridades para transformar Santa Fe.</h1></div></section><section className="section axes-page"><div className="container axes-grid">{axes.map(a=><Link className="axis-card" key={a.slug} href={`/ejes/${a.slug}`}><span>{a.index}</span><h2>{a.title}</h2><p>{a.text}</p><b>↗</b></Link>)}</div></section></Shell>; }
function Axis({slug, axes, news}:{slug:string; axes:AxisData[]; news:ArticleData[]}) { const a=axes.find(x=>x.slug===slug); if(!a) notFound(); const related=slug==='ambiente-y-rio'?news.find(n=>n.slug===ROU_SLUG):undefined; return <Shell><section className="internal-hero coral"><div className="container"><p className="eyebrow">Eje {a.index}</p><h1>{a.title}</h1><p className="lead">{a.text}</p></div></section><section className="section section-light"><div className="container narrow">{a.body.map((p,i)=><p className="large-copy detail-copy" key={i}>{p}</p>)}{related&&<aside className="axis-related"><p className="eyebrow">Actualidad relacionada</p><h2>{related.title}</h2><p>{related.text}</p><Link className="button button-dark" href={`/actualidad/${related.slug}`}>Leer nota</Link></aside>}</div></section></Shell>; }
function Sfsh({settings}:{settings:Settings}) {
  const pdfView = 'https://drive.google.com/file/d/1XE5MvWRzySQOF8q31dpsnj6FCWsVrjmC/view?usp=sharing';
  const pdfDownload = 'https://drive.google.com/uc?export=download&id=1XE5MvWRzySQOF8q31dpsnj6FCWsVrjmC';
  return <Shell>
    <section className="sfsh-page-hero sfsh-2026-hero"><Image src="/images/santa-fe-sin-hambre.jpg" alt="Santa Fe Sin Hambre" fill priority quality={95} sizes="100vw"/><div className="hero-overlay"/><div className="container"><p className="eyebrow light">Campaña 2026</p><h1>Santa Fe<br/>Sin Hambre</h1><p className="lead light sfsh-2026-lead">Resumen de resultados del relevamiento de comedores y merenderos populares de la ciudad de Santa Fe.</p><div className="hero-actions"><a className="button" href={pdfView} target="_blank" rel="noreferrer">Abrir informe PDF</a><a className="button button-ghost-light" href={pdfDownload} target="_blank" rel="noreferrer">Descargar PDF</a></div></div></section>
    <nav className="sfsh-jump"><div className="container"><a href="#muestra">Muestra</a><a href="#alimentacion">Alimentación</a><a href="#comedores">Comedores</a><a href="#feminizacion">Mujeres y cuidados</a><a href="#nbi">NBI</a><a href="#trabajo">Trabajo</a></div></nav>
    <section className="section section-light sfsh-intro"><div className="container split-copy"><div><p className="eyebrow">Resumen de los resultados 2026</p><h2>Conocer la emergencia para construir políticas públicas integrales.</h2></div><div><p>El objetivo de esta campaña es la generación de un diagnóstico sobre la situación de los comedores y merenderos populares de la ciudad de Santa Fe, que aporte a la construcción del diseño de políticas públicas integrales y valorice su existencia para la contención de la emergencia social.</p><p>La primera experiencia fue realizada en el año 2024 en la ciudad de Santa Fe. El relevamiento 2026 se realizó en tres instancias: comedores/merenderos, trabajadorxs y beneficiarixs. Los resultados corresponden al trabajo llevado a cabo durante julio y agosto de 2026.</p></div></div></section>
    <section id="muestra" className="section sfsh-sample"><div className="container"><p className="eyebrow light">Muestra</p><div className="sfsh-stat-grid"><article><strong>426</strong><span>Encuestas realizadas</span></article><article><strong>1.760</strong><span>Cantidad de raciones</span></article><article><strong>31</strong><span>Cantidad de espacios</span></article><article><strong>26</strong><span>Barrios</span></article></div><div className="sfsh-objectives"><div><h2>Objetivo general</h2><p>Describir la situación de los comedores y merenderos populares de la Ciudad de Santa Fe, de sus beneficiarixs y trabajadorxs y su importancia para la comunidad.</p></div><div><h2>Objetivos específicos</h2><ul><li>Analizar la situación alimentaria y social de lxs beneficiarixs de comedores y merenderos de la ciudad de Santa Fe.</li><li>Analizar el funcionamiento de los comedores y merenderos de la Ciudad de Santa Fe, su funcionalidad y sus necesidades.</li><li>Analizar la situación de quienes trabajan en los comedores y merenderos populares de la ciudad de Santa Fe.</li></ul></div></div></div></section>
    <section id="alimentacion" className="section section-light sfsh-results-block"><div className="container"><p className="eyebrow">Inseguridad alimentaria</p><div className="sfsh-big-claim"><strong>50%</strong><h2>de las familias que asisten a comedores y copas de leche de la ciudad pasan habitualmente un día sin comer.</h2></div><div className="sfsh-two-col"><article className="sfsh-dark-card"><span>Inseguridad alimentaria severa</span><strong>60%</strong><p>de los adultos.</p><strong>40%</strong><p>de los menores.</p></article><article><h3>Cómo se clasificó</h3><p>Nos basamos en el concepto de “Inseguridad Alimentaria”, que se produce cuando las personas no tienen acceso regular y permanente a alimentos en cantidad y calidad suficientes para sobrevivir, según define la ONU para la Agricultura y la Alimentación (FAO).</p><div className="sfsh-food-chart" aria-label="Inseguridad alimentaria: 25% leve, 25% moderada y 50% severa"><div className="sfsh-donut"></div><ul><li><b>25%</b> Leve</li><li><b>25%</b> Moderada</li><li><b>50%</b> Severa</li></ul></div></article></div></div></section>
    <section id="comedores" className="section sfsh-community"><div className="container"><p className="eyebrow light">Comedores y merenderos</p><div className="sfsh-claims-grid"><article><strong>50%</strong><p>de las familias que asisten a comedores y merenderos no puede garantizar una ración diaria de comida si no existieran estos espacios.</p></article><article><strong>70%</strong><p>de las familias asistió por primera vez a un comedor o copa de leche desde que asumió el gobierno de Javier Milei.</p></article></div><div className="sfsh-timeline"><span><b>30%</b> “el último año”</span><span><b>40%</b> “1 a 3 años”</span><span><b>30%</b> “+ de 3 años”</span></div></div></section>
    <section id="feminizacion" className="section section-light sfsh-results-block"><div className="container"><p className="eyebrow">Feminización de la pobreza</p><div className="sfsh-stat-grid sfsh-stat-grid-light"><article><strong>65%</strong><span>de las personas que asisten a buscar la comida son mujeres</span></article><article><strong>90%</strong><span>de quienes sostienen comedores y merenderos son mujeres</span></article><article><strong>50%</strong><span>de los hogares entrevistados tiene como principal ingreso el aportado por las mujeres</span></article><article><strong>72%</strong><span>de los hogares con menores, sostenidos por mujeres, son monoparentales</span></article></div><div className="sfsh-care"><div><strong>75%</strong><h2>de las mujeres se encarga de casi todas o todas las tareas de cuidado.</h2><p>Mientras que ese número baja a la mitad en varones.</p></div><div><h3>Tareas de cuidado en mayores de 18</h3><p>Hacer la comida, realizar la limpieza, pagar cuentas, construcción/refacción en el hogar, cuidar menores y realizar las compras.</p></div></div></div></section>
    <section id="nbi" className="section sfsh-nbi"><div className="container"><p className="eyebrow light">Necesidades básicas</p><div className="sfsh-big-claim inverted"><strong>61%</strong><h2>de las familias encuestadas tiene necesidades básicas insatisfechas.</h2></div><div className="sfsh-nbi-grid"><article><h3>Vivienda precaria</h3><p>Vivienda inadecuada o construida con materiales muy precarios.</p></article><article><h3>Sin baño</h3><p>No dispone de retrete o baño.</p></article><article><h3>Hacinamiento</h3><p>Más de 3 personas por habitación.</p></article><article><h3>Inasistencia escolar</h3><p>Algún niño de 6 a 12 años no asiste a la escuela.</p></article><article><h3>Baja capacidad de subsistencia</h3><p>4 o más personas por trabajador y jefe/a de hogar con bajo nivel educativo.</p></article></div><p className="sfsh-nbi-note">Un hogar tiene NBI si presenta al menos una de estas cinco condiciones.</p></div></section>
    <section id="trabajo" className="section section-light sfsh-results-block"><div className="container"><p className="eyebrow">Trabajo e ingresos</p><div className="sfsh-claims-grid sfsh-claims-light"><article><strong>25%</strong><p>de las familias encuestadas: ningún integrante tiene trabajo.</p></article><article><strong>42%</strong><p>de las personas no tiene trabajo.</p></article><article><strong>58%</strong><p>de las personas trabaja, y de ese grupo un <b>70%</b> tiene “trabajo temporal”.</p></article><article><strong>30%</strong><p>de las familias pidió fiado o un crédito los últimos 30 días.</p></article></div></div></section>
    <section className="cta-section sfsh-pdf-cta"><div className="container cta-inner"><p className="eyebrow">Informe completo</p><h2>Consultá el material original del relevamiento 2026.</h2><p>El PDF contiene el resumen de resultados publicado por la campaña Santa Fe Sin Hambre 2026.</p><div className="hero-actions"><a className="button button-dark" href={pdfView} target="_blank" rel="noreferrer">Abrir informe PDF</a><a className="button button-dark" href={pdfDownload} target="_blank" rel="noreferrer">Descargar PDF</a></div></div></section>
  </Shell>;
}

function News({news}:{news:ArticleData[]}) { return <Shell><section className="internal-hero"><div className="container"><p className="eyebrow">Actualidad</p><h1>Lo que estamos haciendo ahora.</h1></div></section><section className="section section-light"><div className="container news-grid">{news.map(n=><article className="news-card" key={n.slug}>{n.slug===ROU_SLUG?<div className="news-image rou-card-visual"><span>Ambiente y río</span><strong>Ordenamiento urbano</strong></div>:<div className="news-image"><Image src={n.image} alt={n.imageAlt} fill quality={92} sizes="(max-width: 800px) 100vw, 33vw" style={n.slug===EVENT_SLUG?{objectFit:'contain',background:'#f3f2f0'}:undefined} /></div>}<div className="news-body"><span>{n.category}</span><h2>{n.title}</h2><p>{n.text}</p><Link href={`/actualidad/${n.slug}`}>Leer más →</Link></div></article>)}</div></section></Shell>; }
function Article({slug, news}:{slug:string; news:ArticleData[]}) { const n=news.find(x=>x.slug===slug); if(!n) notFound(); const isEvent=n.slug===EVENT_SLUG; const isPlenario=n.slug===PLENARIO_SLUG; const isRou=n.slug===ROU_SLUG; return <Shell><section className="article-hero"><div className="container"><p className="eyebrow">{n.category}</p><h1>{n.title}</h1><p className="lead">{n.text}</p></div></section>{isRou?<div className="article-image rou-article-visual"><span>Ambiente y río</span><strong>Ordenamiento urbano y entornos ribereños</strong></div>:<div className="article-image" style={isEvent?{maxWidth:'760px',margin:'0 auto',height:'min(1100px, 125vw)',background:'#f3f2f0'}:undefined}><Image src={n.image} alt={n.imageAlt} fill priority quality={95} sizes={isEvent?'(max-width: 800px) 100vw, 760px':'100vw'} style={isEvent?{objectFit:'contain'}:undefined} /></div>}<section className="section section-light"><div className="container narrow">{n.body.map((p,i)=><p className="large-copy detail-copy" key={i}>{p}</p>)}{isPlenario&&<><div className="plenario-conclusions"><strong>Próximamente</strong><span>Vamos a publicar el documento con las conclusiones del Plenario.</span></div><div className="plenario-reel"><iframe src={PLENARIO_REEL_EMBED} title="Publicación del Plenario Hacer en Común en Instagram" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" /><a className="button button-dark" href={PLENARIO_REEL_URL} target="_blank" rel="noreferrer">Ver publicación en Instagram</a></div></>} {isEvent&&<div style={{marginTop:'32px',display:'flex',gap:'14px',flexWrap:'wrap'}}><a className="button" href={EVENT_FORM_URL} target="_blank" rel="noreferrer">Inscribirme al encuentro</a><Link className="button button-dark" href="/actualidad">Volver a Actualidad</Link></div>}</div>{isPlenario&&<div className="container plenario-gallery"><p className="eyebrow">Galería del Plenario</p><div>{PLENARIO_GALLERY.map((src,i)=><figure key={src}><Image src={src} alt={`Plenario Hacer en Común · foto ${i+1}`} fill quality={92} sizes="(max-width: 700px) 100vw, 50vw" /></figure>)}</div></div>}</section></Shell>; }
function Territory({settings}:{settings:Settings}) { return <Shell><section className="internal-hero dark"><div className="container"><p className="eyebrow light">Territorio</p><h1>La ciudad se construye desde sus barrios.</h1></div></section><section className="section territory-section"><div className="container territory-grid"><div><h2>{settings.territoryTitle}</h2><p className="territory-copy">{settings.territoryText}</p></div><Map/></div></section></Shell>; }
function Participate() { return <Shell><section className="participate-hero"><div className="container participate-grid"><div><p className="eyebrow">Participá</p><h1>Lo común empieza cuando nos encontramos.</h1><p className="lead">Dejanos tus datos y contanos en qué te gustaría participar.</p></div><ParticipationForm /></div></section></Shell>; }

export default async function Page({params}:{params:Promise<{slug?:string[]}>}) {
  const {slug=[]}=await params;
  const content = await loadContent();

  if(slug.length===0) return <Home settings={content.settings} axes={content.axes} news={content.news}/>;
  if(slug.length===1 && slug[0]==='quienes-somos') return <About about={content.about}/>;
  if(slug.length===1 && slug[0]==='ejes') return <Axes axes={content.axes}/>;
  if(slug.length===2 && slug[0]==='ejes') return <Axis slug={slug[1]} axes={content.axes} news={content.news}/>;
  if(slug.length===1 && slug[0]==='santa-fe-sin-hambre') return <Sfsh settings={content.settings}/>;
  if(slug.length===1 && slug[0]==='actualidad') return <News news={content.news}/>;
  if(slug.length===2 && slug[0]==='actualidad') return <Article slug={slug[1]} news={content.news}/>;
  if(slug.length===1 && slug[0]==='territorio') return <Territory settings={content.settings}/>;
  if(slug.length===1 && slug[0]==='participa') return <Participate/>;
  notFound();
}
