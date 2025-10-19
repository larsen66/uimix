"use client";

import React from "react";
import { Home, Compass, Calendar, Bookmark, Image as ImageIcon, Telescope, Cog, Search } from "lucide-react";

export default function HeroDock() {
  const accent =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--hero-accent").trim()
      : "";

  const accentStyle: React.CSSProperties = accent
    ? ({ "--accent": accent } as React.CSSProperties)
    : ({} as React.CSSProperties);

  return (
    <div className="min-h-screen w-full relative bg-black" style={accentStyle}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      />

      <section className="relative isolate min-h-screen w-full overflow-hidden text-white px-4 sm:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 [mask-image:radial-gradient(90%_70%_at_50%_45%,black,transparent_85%)] sm:[mask-image:radial-gradient(80%_60%_at_50%_40%,black,transparent_80%)]" />
          <div className="absolute inset-y-0 left-0 w-24 blur-xl opacity-40 sm:w-40 sm:blur-2xl sm:opacity-60 animate-marquee-left [background:linear-gradient(90deg,rgba(255,255,255,0.25),transparent)]" />
          <div className="absolute inset-y-0 right-0 w-24 blur-xl opacity-40 sm:w-40 sm:blur-2xl sm:opacity-60 animate-marquee-right [background:linear-gradient(270deg,rgba(255,255,255,0.25),transparent)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:12px_12px]" />

        <div
          className="mx-auto flex h-full max-w-5xl flex-col items-center justify-start gap-4 text-center sm:gap-8"
          style={{ marginTop: "20%" }}
        >
          <h1 className="text-balance font-semibold tracking-tight text-white/90 [font-size:clamp(20px,4.5vw,38px)]">
            Elegant, minimal dock
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-xs text-white/70 sm:text-sm">
            Black & white. Adaptive. Focused.
          </p>

          <div className="relative mt-6 w-full max-w-[85%] sm:max-w-[80%]">
            <div className="flex items-center justify-center">
              <Dock />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        :root { --accent: hsl(0 0% 100% / 0.9); }
        .dark :root, .dark { --accent: hsl(0 0% 100% / 0.9); }
        .light :root, .light { --accent: hsl(0 0% 0% / 0.9); }

        @keyframes marqueeLeft { 0% { transform: translateX(-60%); } 100% { transform: translateX(0%); } }
        @keyframes marqueeRight { 0% { transform: translateX(60%); } 100% { transform: translateX(0%); } }
        .animate-marquee-left { animation: marqueeLeft 8s linear infinite alternate; }
        .animate-marquee-right { animation: marqueeRight 8s linear infinite alternate; }

        .hover-halo{position:relative}
        .hover-halo::after{content:"";position:absolute;inset:-2px;border-radius:inherit;opacity:0;transition:opacity .25s, transform .25s;box-shadow:0 0 0 0 rgba(255,255,255,.18),0 12px 30px -10px rgba(0,0,0,.7)}
        .hover-halo:hover::after{opacity:1;}
        .tooltip{opacity:0;transform:translateY(6px);transition:opacity .2s, transform .2s}
        .group:hover .tooltip{opacity:1;transform:translateY(0)}
      `}</style>
    </div>
  );
}

function Dock() {
  return (
    <div className="relative flex items-center gap-2 sm:gap-4 scale-[1.17] sm:scale-[1.235]">
      <div className="flex items-center gap-3 rounded-[28px] bg-neutral-900/80 px-3 py-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:gap-5 sm:rounded-[48px] sm:px-6 sm:py-3">
        <DockIcon icon={Home} label="Home" />
        <DockIcon icon={Compass} label="Explore" />
        <DockIcon icon={Calendar} label="Calendar" badge="4" />
        <DockIcon icon={Bookmark} label="Saved" />
        <DockIcon icon={ImageIcon} label="Media" />
        <DockIcon icon={Telescope} label="Discover" />
        <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />
        <DockIcon icon={Search} label="Search" />
        <DockIcon icon={Cog} label="Settings" />
      </div>
    </div>
  );
}

function DockIcon({ icon: Icon, label, badge }: { icon: any; label: string; badge?: string }) {
  return (
    <button
      className="hover-halo group relative grid h-12 w-12 place-items-center rounded-xl ring-1 ring-white/10 bg-gradient-to-b from-neutral-800/60 to-neutral-900/70 backdrop-blur-xl shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.05] sm:h-14 sm:w-14"
      aria-label={label}
    >
      <Icon className="h-5 w-5 text-white/85 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.1} />
      {badge ? (
        <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-semibold text-neutral-900 ring-1 ring-white/80 sm:h-5 sm:w-5 sm:text-[10px]">
          {badge}
        </span>
      ) : null}
      <span className="tooltip pointer-events-none absolute -bottom-6 translate-y-1/2 text-[9px] tracking-wide text-white/70 sm:text-[10px]">
        {label}
      </span>
    </button>
  );
}
