"use client";

import {
  Smartphone,
  Sparkles,
  Terminal,
  Bot,
  LineChart,
} from "lucide-react";
import { ProjectCard, type Project } from "./ProjectCard";

// Ten showcase projects. Where a real client screenshot fits the brief it is
// used directly (Decoroys, marble studio, corporate, etc.); the remaining
// backend/AI/tooling work — which has no marketing UI to screenshot — uses a
// branded gradient tile with its own icon instead.
const PROJECTS: Project[] = [
  {
    title: "Decoroys E-Ticaret",
    tag: "E-Ticaret",
    description:
      "Doğal mermer ürünleri için PayTR ve RevenueCat entegrasyonlu, yüksek dönüşümlü e-ticaret altyapısı.",
    image: "/refe/decoroys.png",
  },
  {
    title: "Nazife Yenge (iOS)",
    tag: "Mobil · iOS",
    description:
      "React Native ve Expo ile geliştirilmiş, App Store standartlarında eğlence ve yaşam tarzı mobil uygulaması.",
    image: "/refe/yasam-tarzi.png",
  },
  {
    title: "Atelier Mermer Studio",
    tag: "Marka Vitrini",
    description:
      "Sanat ve zanaatı dijitale taşıyan, modern ve rustik esintili yüksek performanslı marka vitrini.",
    image: "/refe/mermer.png",
  },
  {
    title: "Fal & Eğlence Asistanı",
    tag: "Mobil · UX",
    description:
      "Kullanıcıları günlük olarak etkileşimde tutan, akıcı UI/UX ile tasarlanmış mobil deneyim.",
    image: "/refe/premium-koyu.png",
  },
  {
    title: "Sesli Kredi Sistemi",
    tag: "Canlı Ses",
    description:
      "Firebase Firestore ile anlık senkronize olan, süreli kredi ve session mantığına sahip canlı ses altyapısı.",
    icon: Smartphone,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    title: "Premium Etkinlik Platformu",
    tag: "Web · Etkileşim",
    description:
      "Scroll etkileşimleri ve hero animasyonlarıyla zenginleştirilmiş, üst düzey RSVP ve etkinlik yönetim sistemi.",
    image: "/refe/moda.png",
  },
  {
    title: "Local Build Pipeline",
    tag: "DevOps",
    description:
      "EAS (Expo Application Services) ile bulut sıralarını beklemeksizin kurulan lokal derleme ve otomasyon hattı.",
    icon: Terminal,
    accent: "from-slate-700 to-slate-900",
  },
  {
    title: "Yapay Zeka Müşteri Temsilcisi",
    tag: "Yapay Zeka",
    description:
      "Gemini 2.0 Flash Live altyapısıyla geliştirilmiş, sıfır gecikmeli akıllı asistan entegrasyonu.",
    icon: Bot,
    accent: "from-signal to-violet",
  },
  {
    title: "B2B Otomasyon Paneli",
    tag: "Dashboard",
    description:
      "Kurumsal firmalar için veri analizi ve raporlama süreçlerini tek ekranda toplayan modern dashboard.",
    image: "/refe/kurumsal.png",
  },
  {
    title: "Finansal Raporlama Aracı",
    tag: "Web · Analitik",
    description:
      "Karmaşık verileri temiz, okunabilir ve anlık grafiklere döken güvenli web uygulaması.",
    icon: LineChart,
    accent: "from-amber-500 to-orange-600",
  },
];

export function Projects() {
  return (
    <section id="projeler" className="relative bg-[#FAFAFA] py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-ash">
            <Sparkles className="mr-2 inline h-3.5 w-3.5 align-[-2px]" />
            Seçili işler
          </span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Referanslarımız &amp; Projelerimiz
          </h2>
          <p className="mt-4 text-lg text-graphite">
            E-ticaret altyapılarından mobil uygulamalara, canlı ses
            sistemlerinden yapay zeka panellerine — uçtan uca teslim ettiğim
            projelerden bir seçki.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
