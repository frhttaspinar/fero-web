"use client";

import { Sparkles } from "lucide-react";
import { ProjectCard, type Project } from "./ProjectCard";

// Showcase projects backed by real client references under /refe. Each card's
// showcase area follows the screenshot's natural aspect ratio (`ratio`), so
// web sites render wide and mobile-app captures render as portrait frames —
// the masonry layout below absorbs the mixed heights. Backend/AI/tooling work
// with no marketing UI uses a branded gradient tile with an icon instead.
// `link` is the live site; "#" is a placeholder until the real URL is filled.
const PROJECTS: Project[] = [
  {
    title: "E-Ticaret",
    tag: "E-Ticaret",
    description:
      "Mobilya ve dekorasyon ürünleri için PayTR entegrasyonlu, yüksek dönüşümlü e-ticaret altyapısı.",
    image: "/refe/deco.png",
    ratio: "1919 / 882",
    link: "#",
  },
  {
    title: "Mobil Uygulama",
    tag: "Mobil · iOS",
    description:
      "React Native ve Expo ile geliştirilen; numeroloji analizi, sesli sohbet ve kredili kullanım sunan yaşam tarzı uygulaması.",
    image: "/refe/mobil.png",
    ratio: "1242 / 2688",
    link: "#",
  },
  {
    title: "Atelier Mermer Studio",
    tag: "Marka Vitrini",
    description:
      "El işçiliği mermer atölyesi için sanat ve zanaatı dijitale taşıyan, modern ve rustik esintili marka vitrini.",
    image: "/refe/atelier.png",
    ratio: "1920 / 879",
    link: "#",
  },
  {
    title: "Yaşam Tarzı",
    tag: "Web · Sağlık",
    description:
      "Diyetisyen için kişiye özel beslenme programları ve online randevuyu öne çıkaran kişisel marka sitesi.",
    image: "/refe/yasam.png",
    ratio: "635 / 348",
    link: "#",
  },
  {
    title: "Mühendislik",
    tag: "Kurumsal · Web",
    description:
      "Harita mühendisliği firması için ölçüm, imar ve kadastro hizmetlerini tanıtan kurumsal web sitesi.",
    image: "/refe/harita.png",
    ratio: "425 / 491",
    link: "#",
  },
  {
    title: "Moda Butik",
    tag: "E-Ticaret · Moda",
    description:
      "Moda markası için zamansız koleksiyonları premium bir alışveriş deneyimiyle sunan butik e-ticaret vitrini.",
    image: "/refe/moda.png",
    ratio: "491 / 333",
    link: "#",
  },
  {
    title: "Kurumsal Tanıtım",
    tag: "Kurumsal · Hukuk",
    description:
      "Hukuk ve danışmanlık bürosu için faaliyet alanlarını ve iletişimi öne çıkaran prestijli kurumsal tanıtım sitesi.",
    image: "/refe/ova.png",
    ratio: "1920 / 879",
    link: "#",
  },
  {
    title: "Yapay Zeka Asistanı",
    tag: "Yapay Zeka",
    description:
      "Gemini Pro Live altyapısıyla geliştirilmiş, sıfır gecikmeli akıllı asistan entegrasyonu.",
    image: "/refe/yz.jpeg",
    ratio: "736 / 1104",
    link: "#",
  },
  {
    title: "Mühendislik Firması",
    tag: "Kurumsal · Web",
    description:
      "Jeoloji mühendisliği firması için zemin etüdü, analiz ve danışmanlık hizmetlerini öne çıkaran kurumsal web sitesi.",
    image: "/refe/mühendislik.png",
    ratio: "427 / 489",
    link: "#",
  },
  {
    title: "Mobil Uygulama - Asistan",
    tag: "Mobil · Yapay Zeka",
    description:
      "Araç sahipleri için arıza teşhisi, maliyet tahmini ve sesli usta asistanı sunan yapay zeka destekli mobil uygulama.",
    image: "/refe/mobilusta.png",
    ratio: "1206 / 2484",
    link: "#",
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
            E-ticaret altyapılarından mobil uygulamalara, kurumsal web
            sitelerinden yapay zeka asistanlarına — uçtan uca teslim ettiğim
            projelerden bir seçki.
          </p>
        </div>

        {/* Masonry columns: cards keep their screenshots' natural aspect
            ratios, so portrait app captures and wide site captures coexist. */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
