import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/PortableBody";
import { getAxis } from "@/sanity/lib/content";

export default async function AxisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const axis = await getAxis(slug);
  if (!axis) notFound();
  return <main className="internal-page"><section className="internal-hero"><div className="container"><p className="eyebrow">Eje {axis.index}</p><h1>{axis.title}</h1><p>{axis.text}</p></div></section>{axis.imageUrl && <div className="article-image"><Image src={axis.imageUrl} alt="" fill sizes="100vw" quality={92}/></div>}<section className="prose-section"><div className="container axis-detail-grid"><aside className="axis-detail-aside"><p className="eyebrow">Fuerza Común</p><h2>{axis.title}</h2><p>{axis.text}</p></aside><div>{axis.body?.length ? <PortableBody value={axis.body}/> : <div className="portable-body"><p>Este eje ya tiene su espacio propio dentro del sitio. La versión editorial completa podrá actualizarse desde Sanity sin modificar código.</p><p>Mientras avanzamos con la carga inicial del CMS, conservamos la descripción aprobada como contenido base.</p></div>}</div></div></section></main>;
}
