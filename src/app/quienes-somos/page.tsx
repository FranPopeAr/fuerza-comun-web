import Image from "next/image";
import { aboutParagraphs } from "@/content/site";
import { PortableBody } from "@/components/PortableBody";
import { getPageContent } from "@/sanity/lib/content";

export const metadata = { title: "Quiénes somos" };

export default async function AboutPage() {
  const page = await getPageContent("quienes-somos");
  return <main className="internal-page"><section className="internal-hero"><div className="container"><p className="eyebrow">Quiénes somos</p><h1>{page?.title || "Una fuerza que nace de encontrarnos."}</h1><p>{page?.intro || "Fuerza Común es un espacio político nacido en 2022, construido desde el encuentro y la organización colectiva en Santa Fe."}</p></div></section>{page?.imageUrl && <div className="article-image"><Image src={page.imageUrl} alt="" fill sizes="100vw" quality={92}/></div>}<section className="prose-section"><div className="container prose-wrap">{page?.body?.length ? <PortableBody value={page.body}/> : <>{aboutParagraphs.map((p)=><p key={p}>{p}</p>)}<p className="closing-quote">La fuerza para cambiar Santa Fe está en su gente. Cuando esa fuerza se encuentra y se organiza, se vuelve Fuerza Común.</p></>}</div></section></main>;
}
