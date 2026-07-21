"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Smartphone,
  PenTool,
  TrendingUp,
  PhoneCall,
  Workflow,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { ServiceCard, type Service } from "./ServiceCard";
import { GlowOrb } from "../GlowOrb";

// Bento layout: phones stack one column, tablets (sm) run two columns with the
// two anchor offerings (Web, and the signature AI voice assistant) spanning a
// full row, and lg+ runs the 3×3 diagonal — 2+1 / 1+2 / 1+1+1 — without an
// orphan card.
//
// Each card's showcase area is data-driven: `nodes` are floating tech chips
// positioned in percent, `links` draw dashed connectors between them.
const SERVICES: Service[] = [
  {
    title: "Web Geliştirme",
    description:
      "Hızlı, erişilebilir ve arama motorlarına hazır modern web uygulamaları. Next.js ile ölçeklenen, bakımı kolay bir kod tabanı.",
    className: "sm:col-span-2",
    nodes: [
      { x: 50, y: 46, logo: "nextjs", primary: true },
      { x: 26, y: 34, logo: "react" },
      { x: 73, y: 32, logo: "ts" },
      { x: 69, y: 66, label: "App Router" },
    ],
  },
  {
    title: "Mobil Uygulama Geliştirme",
    description:
      "iOS ve Android'de tek kod tabanıyla akıcı, yüksek etkileşimli uygulamalar.",
    nodes: [
      { x: 50, y: 46, icon: Smartphone, primary: true },
      { x: 26, y: 32, logo: "react" },
      { x: 72, y: 62, label: "Expo" },
    ],
  },
  {
    title: "UI/UX Tasarım",
    description:
      "Kullanıcıyı yormayan, dönüşümü artıran arayüzler. Araştırmadan prototipe uçtan uca tasarım.",
    nodes: [
      { x: 50, y: 46, icon: PenTool, primary: true },
      { x: 27, y: 62, swatch: true },
      { x: 72, y: 32, label: "Figma" },
    ],
  },
  {
    title: "Yapay Zeka Çağrı Asistanı",
    description:
      "Gelen çağrıları 7/24 doğal bir sesle karşılayan, randevu oluşturan ve sık sorulan soruları yanıtlayan yapay zeka telefon asistanı.",
    featured: true,
    className: "sm:col-span-2",
    nodes: [
      { x: 50, y: 46, icon: PhoneCall, primary: true, glow: true },
      { x: 22, y: 30, label: "Google Antigravity", glow: true },
      { x: 77, y: 30, label: "Gemini Pro Live", glow: true },
      { x: 25, y: 68, eq: true },
      { x: 74, y: 68, label: "CRM Entegrasyonu" },
    ],
    links: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    title: "Dijital Pazarlama",
    description:
      "Veriyle yönetilen reklam ve SEO çalışmaları; harcanan her bütçenin geri dönüşünü ölçüyorum.",
    nodes: [
      { x: 50, y: 46, icon: TrendingUp, primary: true },
      { x: 27, y: 32, label: "SEO" },
      { x: 71, y: 63, label: "Google Ads" },
    ],
  },
  {
    title: "Otomasyon Geliştirme",
    description:
      "Tekrar eden işleri ortadan kaldıran özel entegrasyonlar ve iş akışları.",
    nodes: [
      { x: 50, y: 46, icon: Workflow, primary: true },
      { x: 26, y: 63, label: "API" },
      { x: 72, y: 32, label: "Webhook" },
    ],
    links: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    title: "E-Ticaret Siteleri",
    description:
      "Sıfırdan kurulan, hızlı ve KVKK uyumlu satış siteleri; ödemeden kargoya tam entegre.",
    nodes: [
      { x: 50, y: 46, icon: ShoppingBag, primary: true },
      { x: 26, y: 32, icon: CreditCard },
      { x: 71, y: 63, label: "KVKK Uyumlu" },
    ],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The whole block drifts a touch as it scrolls through view, for a subtle
  // layered-depth feel against the ambient glow orbs behind it.
  const blockY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      id="hizmetler"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-28 sm:py-36"
    >
      <GlowOrb
        className="-left-24 top-10"
        color="61,90,254"
        size={440}
        duration={10}
      />
      <GlowOrb
        className="-right-32 bottom-0"
        color="139,92,246"
        size={520}
        duration={13}
        delay={2}
      />

      <motion.div style={{ y: blockY }} className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-ash">
            Uçtan uca üretim
          </span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 max-w-xl text-lg text-graphite">
            Bir dijital ürünün ihtiyaç duyduğu her katman, tek elden.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
