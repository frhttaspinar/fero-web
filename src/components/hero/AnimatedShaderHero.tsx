"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { smoothScrollTo } from "@/lib/lenisStore";
import { HeroSignatureVideo } from "./HeroSignatureVideo";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";

export function AnimatedShaderHero() {
  const { open } = useContactModal();

  // The tall track: its scroll progress (0 → 1) both scrubs the pinned video
  // and stages the copy in. offset ["start start", "end end"] spans the whole
  // pin — 0 when the section top hits the viewport top, 1 when its bottom does.
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The page opens on the bare video — at progress 0 the copy is strictly
  // invisible. A tiny scroll (0 → 0.05) fades it in and settles it from below,
  // then it stays fully pinned across the whole hero (through 0.8 and on to 1),
  // so it never fades out early while the user is still in the hero.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [0, 1, 1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [50, 0, 0, 0]);

  return (
    <section
      ref={containerRef}
      className="relative isolate h-[1000vh] w-full overflow-x-clip bg-paper"
    >
      {/* Pinned stage: everything the viewer sees while scrubbing lives here. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroSignatureVideo scrollYProgress={scrollYProgress} />
        <MeshGradientBackground />

        {/* Dark contrast layer — sits directly beneath the copy (above the
            video, mesh and stars) so the white headline stays readable over
            both the bright and dark passages of the cinematic clip. Darkest
            behind the centred text, fading to transparent at the edges so the
            footage and the bottom paper transition still read. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 42%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.34) 45%, rgba(0,0,0,0.12) 72%, transparent 100%)",
          }}
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 font-mono text-xs text-graphite shadow-sm backdrop-blur-md">
            İnovatif Fikirler, E-ticaret ve Yazılım Geliştirme.
          </span>

          <h1 className="font-display mt-8 text-[9.5vw] leading-[0.95] font-medium tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
            <span className="block">Dijital Vizyonunuzu</span>
            <span className="block">Gerçeğe Dönüştürün</span>
          </h1>

          <p className="mt-8 max-w-2xl text-balance text-base text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)] sm:text-lg">
            Mobil Uygulamalardan, Gelişmiş Yapay Zeka Çözümlerine, E-Ticaret ve
            Google Antigravity mimarisiyle güçlendirilmiş otomasyonlar dahil dijital
            çözümler.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={open}
              className="group inline-flex items-center gap-2 rounded-full border-none bg-gradient-to-r from-blue-600 via-violet-600 to-violet-500 px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition hover:shadow-[0_14px_40px_rgba(124,58,237,0.5)]"
            >
              Projeyi Başlat
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <button
              onClick={() => smoothScrollTo("#hizmetler")}
              className="rounded-full border-2 border-white/40 px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/10"
            >
              Hizmetleri İncele
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
