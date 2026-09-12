import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/sanity/lib/content";

export const metadata = { title: "Actualidad" };

export default async function NewsPage() {
  const news = await getNews();
  return <main className="internal-page"><section className="internal-hero"><div className="container"><p className="eyebrow">Actualidad</p><h1>Lo que estamos haciendo ahora.</h1><p>Actividades, campañas, debates y proyectos que estamos construyendo en Santa Fe.</p></div></section><section className="prose-section"><div className="container news-list">{news.map((item)=><article className="news-card" key={item.slug}><div className="news-image"><Image src={item.imageUrl || item.image} alt="" fill sizes="(max-width: 680px) 100vw, 33vw" quality={90}/></div><div className="news-body"><span>{item.category}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={`/actualidad/${item.slug}`}>Leer más →</Link></div></article>)}</div></section></main>;
}
