import Image from "next/image";
import Link from "next/link";
import { PortableBody } from "@/components/PortableBody";
import { getPageContent } from "@/sanity/lib/content";

const fallbackImage = "https://drive.google.com/uc?export=view&id=1_BQBUajl1WP_mQhq3cBy5ZDRRTgFBlKZ";

export const metadata = { title: "Santa Fe Sin Hambre" };

export default async function SfshPage() {
  const page = await getPageContent("santa-fe-sin-hambre");
  return <main className="internal-page"><section className="internal-hero"><div className="container"><p className="eyebrow">Santa Fe Sin Hambre</p><h1>{page?.title || "Conocer la emergencia para organizar una respuesta."}</h1><p>{page?.intro || "Una campaña colectiva para visibilizar el hambre, relevar la realidad de comedores y merenderos y producir información que ayude a construir respuestas públicas."}</p></div></section><section className="section sfsh-section"><div className="container sfsh-feature"><div className="sfsh-feature-image"><Image src={page?.imageUrl || fallbackImage} alt="Actividad de Santa Fe Sin Hambre" fill sizes="(max-width: 900px) 100vw, 50vw" quality={92}/></div><div className="sfsh-feature-copy"><p className="eyebrow">La campaña</p><h2>Datos para hacer visible lo que pasa.</h2>{page?.body?.length ? <PortableBody value={page.body}/> : <><p>Santa Fe Sin Hambre nació como una respuesta amplia y solidaria frente al deterioro de las condiciones sociales. Releva espacios alimentarios, escucha a quienes los sostienen y transforma esa experiencia en información pública.</p><p>La web de Fuerza Común va a integrar la historia de la campaña con los nuevos resultados 2026 cuando estén publicados.</p></>}<Link className="button button-dark" href="/participa">Quiero participar</Link></div></div></section><section className="section section-light"><div className="container"><div className="section-heading"><span>Resultados</span><h2>Dos etapas de un mismo trabajo colectivo.</h2></div><div className="year-cards"><article className="year-card"><strong>2024</strong><h3>Antecedentes y primeros relevamientos</h3><p>La información histórica será reorganizada desde el sitio original de la campaña, distinguiendo claramente cada período.</p></article><article className="year-card"><strong>2026</strong><h3>Nueva etapa</h3><p>Los resultados están próximos a publicarse. Esta sección ya está preparada para incorporarlos sin mezclar datos de años distintos.</p></article></div></div></section></main>;
}
