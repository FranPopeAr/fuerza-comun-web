import Image from "next/image";
import Link from "next/link";

const links = [
  ["Qué somos", "/quienes-somos"],
  ["Ejes", "/ejes"],
  ["Santa Fe Sin Hambre", "/santa-fe-sin-hambre"],
  ["Actualidad", "/actualidad"],
  ["Territorio", "/territorio"]
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Fuerza Común - inicio">
          <Image src="/images/logo.webp" alt="Fuerza Común" width={188} height={74} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Link className="button button-small" href="/participa">Participá</Link>
        </nav>
        <details className="mobile-menu">
          <summary>Menú</summary>
          <div className="mobile-menu-panel">
            {links.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
            <Link href="/participa">Participá</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
