import Link from "next/link";
import { getAxes } from "@/sanity/lib/content";

export const metadata = { title: "Nuestros ejes" };

export default async function AxesPage() {
  const axes = await getAxes();
  return <main className="internal-page"><section className="internal-hero dark"><div className="container"><p className="eyebrow light">Nuestros ejes</p><h1>Lo que queremos transformar.</h1><p>Seis campos de trabajo para pensar y construir una Santa Fe más justa, productiva, solidaria y habitable.</p></div></section><section className="prose-section"><div className="container axes-list">{axes.map((axis)=><Link className="axis-list-card" href={`/ejes/${axis.slug}`} key={axis.slug}><span className="card-number">{axis.index}</span><h2>{axis.title}</h2><p>{axis.text}</p><b>↗</b></Link>)}</div></section></main>;
}
