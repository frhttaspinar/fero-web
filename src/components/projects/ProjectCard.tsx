"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  description: string;
  /** Short category label shown as a pill over the showcase area. */
  tag: string;
  /** Local screenshot under /refe. When absent, the gradient variant renders. */
  image?: string;
  /** Icon used by the gradient (no-screenshot) variant. */
  icon?: LucideIcon;
  /** Tailwind gradient stops for the gradient variant, e.g. "from-signal to-violet". */
  accent?: string;
  /** Live site URL; when set, a "Projeyi İncele" overlay appears on hover. */
  link?: string;
  /**
   * CSS aspect-ratio of the showcase area, matching the screenshot's natural
   * dimensions (e.g. "1242 / 2688" for a portrait phone capture). Defaults to
   * the 16/10 web-site frame when omitted.
   */
  ratio?: string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="mb-5 break-inside-avoid"
    >
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Showcase area — real screenshot, or a branded gradient placeholder.
            Sized by the screenshot's own aspect ratio so mobile-app captures
            render as portrait frames and web sites render wide. */}
        <div
          className="relative w-full overflow-hidden bg-slate-50"
          style={{ aspectRatio: project.ratio ?? "16 / 10" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} önizleme`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${
                project.accent ?? "from-signal to-violet"
              }`}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              {Icon && (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition-transform duration-500 group-hover:scale-110">
                  <Icon size={28} strokeWidth={1.6} />
                </div>
              )}
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur">
            {project.tag}
          </span>

          {/* On hover-capable devices the overlay reveals on hover; on touch
              devices (hover: none) it stays visible — otherwise the link would
              be unreachable, since a tap can't trigger :hover reliably. */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — canlı siteye git`}
              className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent pb-4 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-md transition-transform duration-300 translate-y-1 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
                Projeyi İncele
                <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </a>
          )}
        </div>

        {/* Text area — dark elegant title over a soft description. */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight text-indigo-950">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {project.description}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
