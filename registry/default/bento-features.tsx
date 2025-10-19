"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function FeaturesSection() {
  const spiralRef = useRef<HTMLDivElement>(null);

  const [cfg, setCfg] = useState({
    points: 800,
    dotRadius: 1.6,
    duration: 3,
    gradient: "none",
    color: "#ffffff",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.35,
    background: "transparent",
  });

  const gradients = useMemo(
    () => ({
      none: [],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 620;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient as keyof typeof gradients].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  function randomize() {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const useBW = Math.random() > 0.4;
    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(400, 1800)),
      dotRadius: rand(0.8, 3),
      duration: rand(1.2, 6),
      pulseEffect: Math.random() > 0.3,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.1, 2.1),
      gradient: useBW ? "none" : "grayscale",
      color: "#ffffff",
    }));
  }

  const features = [
    { title: "From Discovery to Delivery", blurb: "Research, product strategy, UX/UI, engineering, and release management — handled end-to-end by one team.", meta: "Process" },
    { title: "Performance-First Frontend", blurb: "Ship fast experiences: code-split bundles, edge caching, static + SSR hybrids, Core Web Vitals tracked in CI.", meta: "Web" },
    { title: "Stable, Typed Backends", blurb: "Type-safe APIs, resilient services, and predictable data layers. Observability and tests included by default.", meta: "API" },
    { title: "Design Systems that Scale", blurb: "Reusable tokens, components, and docs keep multi-product portfolios visually consistent and maintainable.", meta: "Design" },
    { title: "Zero-Downtime Deploys", blurb: "Rollouts via blue-green/canary, automated migrations, and health gates so users never see a blip.", meta: "DevOps" },
  ];

  const spans = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Azure Depths */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-6 py-20 text-white">
        {/* Background Spiral */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
          style={{ mixBlendMode: "screen" }}
        >
          <div ref={spiralRef} />
        </div>

        <header className="relative mb-10 flex items-end justify-between border-b border-white/20 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Features</h2>
            <p className="mt-2 text-sm md:text-base text-white/70">
              Bento layout. Minimal. Monochrome.
            </p>
          </div>
        </header>

        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6 auto-rows-[minmax(120px,auto)]">
          {features.map((f, i) => (
            <BentoCard key={i} span={spans[i]} title={f.title} blurb={f.blurb} meta={f.meta} />
          ))}
        </div>

        <footer className="relative mt-16 border-t border-white/10 pt-6 text-xs text-white/50">
          Built with reliability, speed, and taste.
        </footer>
      </section>
    </div>
  );
}

function BentoCard({ span = "", title, blurb, meta }: { span?: string; title: string; blurb: string; meta?: string }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-5 transition hover:border-white/40 ${span}`}
    >
      <header className="mb-2 flex items-center gap-3">
        <span className="text-xs text-white/40">&bull;</span>
        <h3 className="text-base md:text-lg font-semibold leading-tight">
          {title}
        </h3>
        {meta && (
          <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
            {meta}
          </span>
        )}
      </header>
      <p className="text-sm text-white/70 max-w-prose">{blurb}</p>

      {/* Hover outline mask */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-white/10"
          style={{ maskImage: "radial-gradient(180px 180px at var(--x,50%) var(--y,50%),white,transparent)" }}
        />
      </div>
    </article>
  );
}

export default FeaturesSection;
export { FeaturesSection };

