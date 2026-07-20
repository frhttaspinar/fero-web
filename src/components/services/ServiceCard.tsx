"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/** A floating chip inside the card's graphic showcase area. */
export type VisualNode = {
  /** Chip center, in percent of the graphic area. */
  x: number;
  y: number;
  icon?: LucideIcon;
  logo?: "nextjs" | "react" | "ts";
  label?: string;
  /** Renders the five-bar live-voice equalizer inside the chip. */
  eq?: boolean;
  /** Renders overlapping color swatches (the design card's motif). */
  swatch?: boolean;
  /** Larger anchor chip at the center of the orbit rings. */
  primary?: boolean;
  /** Indigo glow treatment — the AI card's node/connection look. */
  glow?: boolean;
};

export type Service = {
  title: string;
  description: string;
  nodes: VisualNode[];
  /** Index pairs of nodes joined by dashed connector lines. */
  links?: [number, number][];
  /** Tinted showcase background for the signature AI card. */
  featured?: boolean;
  /** Grid span utilities applied to the outer cell (e.g. "md:col-span-2"). */
  className?: string;
};

// Resting heights (0–1) of the five equalizer bars on the AI card.
const EQ_BARS = [0.45, 0.85, 0.6, 1, 0.5];

/** A five-bar audio equalizer — the AI card's live-voice motif. */
function Equalizer({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden>
      {EQ_BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-indigo-500"
          style={{ height: `${h * 100}%` }}
          animate={
            animate
              ? { height: [`${h * 35}%`, `${h * 100}%`, `${h * 50}%`] }
              : undefined
          }
          transition={
            animate
              ? {
                  duration: 0.85 + i * 0.14,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="-11 -11 22 22" className="h-5 w-5" aria-hidden>
      <circle r="2" fill="#087ea4" />
      <g stroke="#087ea4" strokeWidth="1" fill="none">
        <ellipse rx="10" ry="4.2" />
        <ellipse rx="10" ry="4.2" transform="rotate(60)" />
        <ellipse rx="10" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextLogo({ large }: { large?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-full bg-black font-mono font-bold text-white ${
        large ? "h-7 w-7 text-[15px]" : "h-5 w-5 text-[11px]"
      }`}
    >
      N
    </span>
  );
}

function TsLogo() {
  return (
    <span
      aria-hidden
      className="grid h-5 w-5 place-items-end justify-items-end rounded-[5px] bg-[#3178c6] pb-0.5 pr-0.5 font-mono text-[9px] font-bold leading-none text-white"
    >
      TS
    </span>
  );
}

/** Overlapping color dots — a compact palette motif for the design card. */
function Swatches() {
  return (
    <div className="flex -space-x-1.5" aria-hidden>
      <span className="h-3.5 w-3.5 rounded-full border border-white bg-[#f24e1e]" />
      <span className="h-3.5 w-3.5 rounded-full border border-white bg-[#a259ff]" />
      <span className="h-3.5 w-3.5 rounded-full border border-white bg-[#0acf83]" />
    </div>
  );
}

function NodeChip({
  node,
  animate,
  order,
}: {
  node: VisualNode;
  animate: boolean;
  order: number;
}) {
  const Icon = node.icon;

  let chip: ReactNode;
  if (node.primary && Icon) {
    chip = (
      <span
        className={
          node.glow
            ? "relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_8px_28px_rgba(99,102,241,0.45)]"
            : "grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-md"
        }
      >
        {node.glow && (
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl bg-indigo-400/60 blur-xl"
            animate={animate ? { opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] } : undefined}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <Icon size={22} strokeWidth={1.75} />
      </span>
    );
  } else if (node.logo === "nextjs" && node.primary) {
    chip = (
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-md">
        <NextLogo large />
      </span>
    );
  } else if (node.logo || Icon || node.eq || node.swatch) {
    chip = (
      <span className="grid h-10 min-w-10 place-items-center rounded-xl border border-slate-200 bg-white px-2 text-slate-600 shadow-sm">
        {node.logo === "react" && <ReactLogo />}
        {node.logo === "nextjs" && <NextLogo />}
        {node.logo === "ts" && <TsLogo />}
        {Icon && <Icon size={18} strokeWidth={1.75} />}
        {node.eq && <Equalizer animate={animate} />}
        {node.swatch && <Swatches />}
      </span>
    );
  } else {
    chip = (
      <span
        className={
          node.glow
            ? "whitespace-nowrap rounded-lg border border-indigo-200 bg-white px-2.5 py-1.5 font-mono text-[10px] font-medium text-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.28)]"
            : "whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-[10px] text-slate-500 shadow-sm"
        }
      >
        {node.label}
      </span>
    );
  }

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <motion.div
        animate={animate ? { y: [0, -6, 0] } : undefined}
        transition={{
          duration: 3.2 + order * 0.45,
          repeat: Infinity,
          ease: "easeInOut",
          delay: order * 0.35,
        }}
      >
        {chip}
      </motion.div>
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion;
  const featured = service.featured ?? false;

  return (
    <motion.div
      className={`h-full ${service.className ?? ""}`}
      initial={{
        opacity: 0,
        y: 64,
        scale: 0.9,
        rotate: index % 2 === 0 ? -3 : 3,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Showcase area: dot grid, orbit rings and floating tech chips. */}
        <div
          className={`relative h-48 shrink-0 overflow-hidden ${
            featured
              ? "bg-gradient-to-br from-indigo-50/80 via-slate-50 to-violet-50/60"
              : "bg-slate-50"
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgb(148 163 184 / 0.3) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div
            aria-hidden
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-[190px] w-[190px] rounded-full border border-dashed border-slate-300/70"
                animate={animate ? { rotate: 360 } : undefined}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {service.links && (
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {service.links.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={service.nodes[a].x}
                  y1={service.nodes[a].y}
                  x2={service.nodes[b].x}
                  y2={service.nodes[b].y}
                  stroke="rgb(129 140 248 / 0.45)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          )}

          {service.nodes.map((node, i) => (
            <NodeChip key={i} node={node} animate={animate} order={i} />
          ))}
        </div>

        {/* Text area: just a title and a description — no tags. */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold tracking-tight text-indigo-950 sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
            {service.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
