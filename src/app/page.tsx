import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/content/site";
import { getAxes, getNews, getSiteSettings } from "@/sanity/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

const sfshImage = "https://drive.google.com/uc?export=view&id=1_BQBUajl1WP_mQhq3cBy5ZDRRTgFBlKZ";

export default async function Home() {
  const [axes, news, settings] = await Promise.all([getAxes(), getNews(), getSiteSettings()]);
  return (
    <main>
      <section className="hero">
        <Image className="hero-image" src={settings.heroImageUrl} alt="Encuentro de Fuerza Común" fill priority sizes="100vw" quality={92} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow light">Fuerza Común · Santa Fe</p>
          <h1>Sentir en común<br />para transformarlo todo.</h1>
          <p className="hero-copy">{settings.heroText}</p>
          <div className="hero-actions"><Link href="/participa" className="button">Sumate</Link><Link href="/quienes-somos" className="button button-ghost-light">Conocenos</Link></div>
        </div>
        <a href="#que-somos" className="hero-scroll" aria-label="Bajar a la siguiente sección">↓</a>
      </section>

      <section id="que-somos" className="section section-light"><div className="container">
        <SectionHeading eyebrow="01 / Fuerza Común" title="Una fuerza que nace de encontrarnos." />
        <div className="pillars-grid">{pillars.map((item, i) => <article className="pillar-card" key={item.title}><span className="card-number">0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      <section id="ejes" className="section axes-section"><div className="container">
        <SectionHeading eyebrow="02 / Nuestros ejes" title="Lo que queremos transformar." inverted />
        <div className="axes-grid">{axes.map((axis) => <Link className="axis-card" href={`/ejes/${axis.slug}`} key={axis.slug}><span>{axis.index}</span><h3>{axis.title}</h3><p>{axis.text}</p><b>↗</b></Link>)}</div>
      </div></section>

      <section id="sfsh" className="section sfsh-section"><div className="container sfsh-grid">
        <div className="sfsh-image-wrap"><Image src={sfshImage} alt="Actividad de Fuerza Común" fill sizes="(max-width: 1000px) 100vw, 50vw" quality={92} /><div className="image-label">Santa Fe Sin Hambre</div></div>
        <div className="sfsh-copy"><p className="eyebrow">03 / Campaña</p><h2>Conocer la emergencia para organizar una respuesta.</h2><p>Relevamos comedores, copas de leche y merenderos junto a organizaciones comunitarias para visibilizar el hambre y construir información que sirva para exigir respuestas públicas.</p><div className="data-note"><strong>2026</strong><span>Nueva etapa en curso. Incorporaremos aquí los resultados apenas se publiquen.</span></div><Link className="button button-dark" href="/santa-fe-sin-hambre">Conocé la campaña</Link></div>
      </div></section>

      <section id="actualidad" className="section section-light"><div className="container"><SectionHeading eyebrow="04 / Ahora" title="Lo que estamos haciendo." /><div className="news-grid">{news.slice(0,3).map((item) => <article className="news-card" key={item.slug}><div className="news-image"><Image src={item.imageUrl || item.image} alt="" fill sizes="(max-width: 680px) 100vw, 33vw" quality={90} /></div><div className="news-body"><span>{item.category}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={`/actualidad/${item.slug}`}>Leer más →</Link></div></article>)}</div></div></section>

      <section id="territorio" className="section territory-section"><div className="container territory-grid"><div><SectionHeading eyebrow="05 / Territorio" title="Estamos acá." inverted /><p className="territory-copy">Fuerza Común se construye donde sucede la vida cotidiana de Santa Fe. El mapa territorial interactivo será la siguiente capa de esta web.</p><Link className="button button-light" href="/territorio">Ver territorio</Link></div><div className="map-placeholder"><div className="map-river"/><span className="map-dot dot-1"/><span className="map-dot dot-2"/><span className="map-dot dot-3"/><span className="map-dot dot-4"/><span className="map-dot dot-5"/><span className="map-caption">Mapa territorial · próxima etapa</span></div></div></section>

      <section id="participa" className="cta-section"><div className="container cta-inner"><p className="eyebrow">06 / Participá</p><h2>La ciudad se transforma con organización y participación.</h2><p>Si querés conocer más, aportar tiempo, ideas o sumarte a una actividad, queremos encontrarnos con vos.</p><Link className="button button-dark" href="/participa">Quiero participar</Link></div></section>
    </main>
  );
}
