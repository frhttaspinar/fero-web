"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Core } from "./Core";

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  // Safe to read synchronously: this component is dynamically imported with
  // ssr:false, so it only ever mounts in the browser.
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={0.8} />
        <Suspense fallback={null}>
          <Core reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
