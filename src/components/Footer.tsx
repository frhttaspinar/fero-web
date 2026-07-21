"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useContactModal } from "./contact/ContactModalContext";

const YEAR = new Date().getFullYear();

const SITE_MAP = [
  { label: "Ana Sayfa", href: "#top" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Projeler", href: "#projeler" },
  { label: "İletişim", href: "#iletisim" },
  { label: "Gizlilik Politikası", href: "/gizlilik" },
];

const SERVICES = [
  { label: "Mobil Uygulama Çözümleri", href: "#hizmetler" },
  { label: "E-Ticaret Altyapıları", href: "#hizmetler" },
  { label: "Kurumsal Web Sistemleri", href: "#hizmetler" },
  { label: "Yapay Zeka Otomasyonları", href: "#hizmetler" },
];

const POSTS = [
  {
    label:
      "Next.js 14 ile Yüksek Performanslı E-ticaret Siteleri Kurmanın Püf Noktaları",
    href: "#",
  },
  { label: "React Native mi, Native mi? Projeniz İçin Hangisi Doğru?", href: "#" },
  {
    label: "Google Antigravity ve Yapay Zeka ile Otomasyon Sistemleri",
    href: "#",
  },
  { label: "Kullanıcı Deneyimini Artıran 3D Web Animasyonları", href: "#" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ferotaspinar/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "E-posta",
    href: "mailto:frhttaspinar@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <rect
          x="2.5"
          y="4.5"
          width="19"
          height="15"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m3.5 6.5 8.5 6 8.5-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/905069060250",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.17 0 4.2.84 5.74 2.38a8.06 8.06 0 0 1 2.38 5.73c0 4.48-3.65 8.12-8.13 8.12a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.28c0-4.48 3.64-8.12 8.15-8.12Zm-4.6 4.86c-.15 0-.4.06-.6.29-.21.23-.79.77-.79 1.88s.81 2.18.92 2.33c.11.15 1.6 2.44 3.87 3.42.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.33-.54 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.21-.15-.44-.27-.23-.11-1.33-.66-1.54-.73-.21-.08-.36-.11-.5.11-.15.23-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.12-.96-.36-1.83-1.13-.68-.6-1.13-1.35-1.27-1.58-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.5-1.24-.7-1.69-.18-.44-.36-.38-.5-.39l-.42-.01Z" />
      </svg>
    ),
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="group inline-flex items-start gap-1.5 py-1 text-sm leading-relaxed text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-black"
      >
        <span>{label}</span>
      </a>
    </li>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
      {children}
    </h3>
  );
}

export function Footer() {
  const { open } = useContactModal();

  return (
    <footer id="iletisim" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 — Marka ve İletişim */}
          <div className="flex flex-col">
            <Image
              src="/logo-ft.png"
              alt="Ferhat Taşpınar logo"
              width={379}
              height={420}
              className="h-auto w-14 self-start object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
            />
            <span className="font-display mt-4 block text-lg font-semibold tracking-tight text-slate-900">
              Ferhat Taşpınar
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              Gelişmiş yapay zeka asistanlarından yüksek performanslı mobil
              uygulamalara kadar kesintisiz dijital çözümler tasarlayan yazılım
              stüdyosu.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-3 py-1 text-sm text-slate-600 transition-colors hover:text-black"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-slate-500 transition-colors group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
                      {social.icon}
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={open}
              className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
            >
              Proje Başlat
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* 2 — Site Haritası */}
          <div>
            <ColumnHeading>Site Haritası</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {SITE_MAP.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* 3 — Hizmetlerimiz */}
          <div>
            <ColumnHeading>Hizmetlerimiz</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {SERVICES.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* 4 — Popüler Yazılar */}
          <div>
            <ColumnHeading>Popüler Yazılar</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-4">
              {POSTS.map((post) => (
                <li key={post.label}>
                  <a
                    href={post.href}
                    className="group block py-1 text-sm leading-snug text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-black"
                  >
                    {post.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt Bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>© {YEAR} Ferhat Taşpınar. Tüm hakları saklıdır.</span>
          <span className="font-mono tracking-wide">Türkiye</span>
        </div>
      </div>
    </footer>
  );
}
