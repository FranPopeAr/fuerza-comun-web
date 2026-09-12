import type { Metadata } from "next";
import "./globals.css";
import "./internal.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fuerza-comun-web.vercel.app"),
  title: { default: "Fuerza Común", template: "%s | Fuerza Común" },
  description: "Espacio político y social de Santa Fe que construye comunidad y organiza respuestas colectivas frente a la desigualdad.",
  openGraph: { title: "Fuerza Común", description: "Sentir en común para transformarlo todo.", locale: "es_AR", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
