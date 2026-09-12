import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/content";

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Image src="/images/logo-white.webp" alt="Fuerza Común" width={210} height={82} />
          <p className="footer-tagline">Sentir en común para transformarlo todo.</p>
        </div>
        <div className="footer-links">
          <Link href="/quienes-somos">Quiénes somos</Link>
          <Link href="/ejes">Nuestros ejes</Link>
          <Link href="/santa-fe-sin-hambre">Santa Fe Sin Hambre</Link>
          <Link href="/participa">Participá</Link>
        </div>
        <div className="footer-links">
          <a href={settings.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={settings.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <span>Santa Fe, Argentina</span>
        </div>
      </div>
      <div className="container footer-bottom">© Fuerza Común</div>
    </footer>
  );
}
