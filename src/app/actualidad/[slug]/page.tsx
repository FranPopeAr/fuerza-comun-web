import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/PortableBody";
import { getNewsItem } from "@/sanity/lib/content";

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();
  return <main className="internal-page"><section className="article-hero"><div className="container"><p className="eyebrow">{item.category}</p><h1>{item.title}</h1><p className="article-summary">{item.text}</p></div></section><div className="article-image"><Image src={item.imageUrl || item.image} alt="" fill sizes="100vw" quality={92}/></div><section className="article-body"><div className="container prose-wrap">{item.body?.length ? <PortableBody value={item.body}/> : <><p>{item.text}</p><p>Esta publicación está preparada para ampliarse desde el gestor de contenidos con texto, imágenes y novedades sin necesidad de modificar el sitio.</p></>}</div></section></main>;
}
