import { ParticipationForm } from "@/components/ParticipationForm";
import { getPageContent } from "@/sanity/lib/content";

export const metadata = { title: "Participá" };

export default async function ParticipatePage() {
  const page = await getPageContent("participa");
  return <main className="internal-page"><section className="internal-hero dark"><div className="container"><p className="eyebrow light">Participá</p><h1>{page?.title || "Hay muchas formas de ser parte."}</h1><p>{page?.intro || "Contanos quién sos, dónde estás y en qué te gustaría aportar. Queremos encontrarnos con vos."}</p></div></section><section className="prose-section"><div className="container participation-layout"><div className="participation-copy"><p className="eyebrow">Sumate</p><h2>Construir también es participar.</h2><p>Podés acercarte a una actividad, aportar desde un eje de trabajo, sumarte a Santa Fe Sin Hambre o simplemente empezar una conversación.</p><p>Pedimos solamente los datos necesarios para contactarte.</p></div><ParticipationForm /></div></section></main>;
}
