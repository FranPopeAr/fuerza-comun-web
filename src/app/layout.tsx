import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fuerza Común | Santa Fe',
  description: 'Espacio político y social de Santa Fe que construye comunidad y organiza respuestas colectivas frente a la desigualdad.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
