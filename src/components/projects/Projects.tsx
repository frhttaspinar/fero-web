"use client";

import { Sparkles } from "lucide-react";
import { ProjectCard, type Project } from "./ProjectCard";
import { projectCatalog } from "@/lib/project-catalog";

// Showcase projects backed by real client references under /refe. Each card's
// showcase area follows the screenshot's natural aspect ratio (`ratio`), so
// web sites render wide and mobile-app captures render as portrait frames —
// the masonry layout below absorbs the mixed heights. Backend/AI/tooling work
// with no marketing UI uses a branded gradient tile with an icon instead.
// `link` yalnızca gerçek bir canlı site adresi verildiğinde tanımlanır; adres
// yoksa alan hiç yazılmaz ve kartta bağlantı katmanı render edilmez.
// Veri src/lib/project-catalog.ts'te tek kaynakta tutulur; hizmet sayfaları da
// aynı listeden okuduğu için bir proje iki yerde farklı anlatılamaz. Kart tipi
// `link` ve `icon` gibi ek alanları desteklemeye devam eder.
const PROJECTS: Project[] = projectCatalog;

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
            sitelerinden yapay zekâ asistanlarına — uçtan uca teslim ettiğimiz
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
