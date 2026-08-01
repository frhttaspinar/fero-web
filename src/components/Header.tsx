"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { useContactModal } from "./contact/ContactModalContext";

// Kök-göreli hash: header alt sayfalarda da kullanıldığı için bağlantılar
// ana sayfadaki bölümlere her koşulda ulaşır.
const NAV_LINKS = [
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Projeler", href: "/#projeler" },
  { label: "İletişim", href: "/#iletisim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-colors duration-300 ${scrolled ? "border-b border-line bg-white/70" : "bg-white/40"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* h-12 yuvası korundu; header yüksekliği ve mobil düzen değişmiyor. */}
        <Link
          href="/#top"
          className="flex h-12 items-center"
          aria-label="Doku Yazılım — Ana Sayfa"
        >
          <BrandLogo height={44} priority />
        </Link>

        {/* gap-4 + px-2 keeps the old visual rhythm (gap-8) while giving each
            link a comfortable touch target for tablets, where md: nav shows. */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-slate-900 transition hover:text-slate-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={open}
          className="rounded-full bg-void px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-paper transition hover:bg-ink"
        >
          Bize Ulaşın
        </button>
      </div>
    </motion.header>
  );
}
