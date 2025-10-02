import React, { useEffect, useMemo, useRef, useState } from "react";

const STYLE_ID = "bento3-animations";

const flows = [
  {
    id: "01",
    variant: "orbit",
    meta: "Discovery",
    title: "Signal Mapping Sprints",
    description:
      "Frame the opportunity space in under three working sessions. Signals are stacked against feasibility bands so investment is directed where impact is provable.",
    statLabel: "Scope commit",
    statValue: "48 hrs",
  },
  {
    id: "02",
    variant: "relay",
    meta: "Design",
    title: "Systemised Exploration",
    description:
      "Designers and engineers co-draft the base tokens, layouts, and flows concurrently. Every pattern lands straight into the codebase as audited primitives.",
    statLabel: "Artifacts shipped",
    statValue: "11 kits",
  },
  {
    id: "03",
    variant: "wave",
    meta: "Build",
    title: "Parallel Implementation Lanes",
    description:
      "Stories are streamed into dual delivery lanes — experiential and foundational. Automated previews review performance, accessibility, and regression deltas in real time.",
    statLabel: "Runtime delta",
    statValue: "-28%",
  },
  {
    id: "04",
    variant: "spark",
    meta: "Validation",
    title: "Predictable Release Gates",
    description:
      "Edge smoke suites, contract validation, and synthetic journeys run on each merge. Failures annotate the originating story so fixes stay localised.",
    statLabel: "Checks run",
    statValue: "87",
  },
  {
    id: "05",
    variant: "loop",
    meta: "Evolution",
    title: "Continuous Signal Loop",
    description:
      "Post-release metrics write back into the roadmap. Velocity dashboards surface orphan work, adoption, and regressions so the system compounds value.",
    statLabel: "Insights captured",
    statValue: "32/wk",
  },
];

const metrics = [
  { label: "Mean delivery", value: "19 days" },
  { label: "Release confidence", value: "99.5%" },
  { label: "Audited rollouts", value: "120+" },
];

const palettes = {
  dark: {
    surface: "bg-neutral-950 text-neutral-100",
    heading: "text-white",
    muted: "text-neutral-400",
    capsule: "bg-white/5 border-white/10 text-white/80",
    card: "bg-neutral-900/55",
    cardBorder: "border-white/10",
    metric: "bg-white/5 border-white/10 text-white/70",
    headingAccent: "bg-white/10",
    toggleSurface: "bg-white/10",
    toggle: "border-white/15 text-white",
    button: "border-white/15 text-white hover:border-white/40 hover:bg-white/10",
    gridColor: "rgba(255, 255, 255, 0.06)",
    overlay:
      "linear-gradient(180deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 45%, rgba(10,10,10,0.92) 100%)",
    focusGlow: "rgba(255, 255, 255, 0.14)",
    iconStroke: "#f8fafc",
    iconTrail: "rgba(148, 163, 184, 0.55)",
  },
  light: {
    surface: "bg-slate-100 text-neutral-900",
    heading: "text-neutral-900",
    muted: "text-neutral-600",
    capsule: "bg-white/70 border-neutral-200 text-neutral-700",
    card: "bg-white/80",
    cardBorder: "border-neutral-200",
    metric: "bg-white border-neutral-200 text-neutral-600",
    headingAccent: "bg-neutral-900/10",
    toggleSurface: "bg-white",
    toggle: "border-neutral-300 text-neutral-900",
    button: "border-neutral-300 text-neutral-900 hover:border-neutral-500 hover:bg-neutral-900/5",
    gridColor: "rgba(17, 17, 17, 0.08)",
    overlay:
      "linear-gradient(180deg, rgba(248,250,252,0.96) 0%, rgba(241,245,249,0.68) 45%, rgba(248,250,252,0.96) 100%)",
    focusGlow: "rgba(15, 23, 42, 0.15)",
    iconStroke: "#111827",
    iconTrail: "rgba(30, 41, 59, 0.42)",
  },
};

const getRootTheme = (): "dark" | "light" => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.dataset?.theme === "dark" || root.getAttribute("data-theme") === "dark") return "dark";
  if (root.classList.contains("light")) return "light";
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

function Bento3Section() {
  const [theme, setTheme] = useState<"dark" | "light">(() => getRootTheme());
  const [introReady, setIntroReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes bento3-card-in {
        0% { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.97); filter: blur(12px); }
        60% { filter: blur(0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
      }
      @keyframes bento3-flare {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes bento3-dash {
        0% { transform: translateX(-25%); opacity: 0; }
        30% { opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translateX(25%); opacity: 0; }
      }
      @keyframes bento3-wave {
        0% { transform: translateX(-45%); }
        100% { transform: translateX(45%); }
      }
      @keyframes bento3-pulse {
        0% { transform: scale(0.8); opacity: 0.6; }
        70% { opacity: 0.05; }
        100% { transform: scale(1.35); opacity: 0; }
      }
      .bento3-root {
        padding-inline: 0;
        min-height: min(100vh, 960px);
      }
      .bento3-section {
        gap: clamp(3rem, 6vw, 5rem);
        padding-inline: clamp(1.25rem, 5vw, 3.75rem);
        width: min(100%, 72rem);
      }
      .bento3-grid {
        gap: clamp(1.25rem, 4vw, 2.5rem);
      }
      .bento3-metrics {
        gap: clamp(1rem, 3vw, 1.5rem);
        padding: clamp(1.25rem, 4vw, 2.5rem);
      }
      .bento3-footer {
        gap: clamp(1.15rem, 3.5vw, 2.4rem);
      }
      .bento3-hero-pill {
        flex-wrap: wrap;
      }
      .bento3-hero-pill span:last-child {
        flex-shrink: 0;
      }
      .bento3-card {
        opacity: 0;
        transform: translate3d(0, 32px, 0);
        filter: blur(14px);
        transition: border-color 400ms ease, background 400ms ease, padding 300ms ease;
        padding: clamp(1.2rem, 3vw, 2.4rem);
        border-radius: clamp(1.5rem, 4vw, 28px);
      }
      .bento3-card[data-visible="true"] {
        animation: bento3-card-in 760ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
        animation-delay: var(--bento3-delay, 0ms);
      }
      .bento3-icon {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: clamp(2.75rem, 6vw, 3.25rem);
        width: clamp(2.75rem, 6vw, 3.25rem);
        border-radius: 9999px;
        overflow: hidden;
        isolation: isolate;
      }
      .bento3-icon::before,
      .bento3-icon::after {
        content: "";
        position: absolute;
        inset: 4px;
      @media (max-width: 1024px) {
        .bento3-section {
          gap: clamp(2.5rem, 6vw, 4rem);
          padding-inline: clamp(1.1rem, 6vw, 3rem);
        }
        .bento3-metrics {
          border-radius: 24px;
        }
      }
      @media (max-width: 768px) {
        .bento3-root {
          min-height: auto;
        }
        .bento3-section {
          gap: clamp(2rem, 7vw, 3.5rem);
          padding-inline: clamp(1rem, 8vw, 2.25rem);
          padding-block: clamp(3rem, 10vw, 4rem);
        }
        .bento3-card {
          padding: clamp(1rem, 5vw, 1.6rem);
          border-radius: 22px;
        }
        .bento3-grid {
          gap: clamp(1rem, 6vw, 2rem);
        }
        .bento3-metrics {
          padding: clamp(1rem, 6vw, 1.8rem);
          gap: clamp(0.75rem, 4vw, 1.25rem);
        }
        .bento3-footer {
          gap: clamp(1rem, 6vw, 1.75rem);
        }
      }
      @media (max-width: 640px) {
        .bento3-section {
          gap: clamp(1.75rem, 8vw, 3rem);
        }
        .bento3-hero-pill {
          justify-content: center;
          text-align: center;
        }
        .bento3-hero-pill span:last-child {
          width: 100%;
          text-align: center;
        }
        .bento3-card {
          padding: clamp(0.85rem, 6vw, 1.4rem);
        }
        .bento3-icon {
          height: clamp(2.25rem, 8vw, 2.75rem);
          width: clamp(2.25rem, 8vw, 2.75rem);
        }
        .bento3-metrics div {
          padding-block: clamp(1rem, 6vw, 1.5rem);
        }
      }
        border-radius: inherit;
        border: 1px solid var(--bento3-icon-trail);
        opacity: 0.45;
      }
      .bento3-icon::after {
        inset: 10px;
        opacity: 0.2;
      }
      .bento3-icon[data-variant="orbit"] span {
        position: absolute;
        height: 140%;
        width: 3px;
        background: linear-gradient(180deg, transparent, var(--bento3-icon-stroke) 55%, transparent);
        transform-origin: center;
        animation: bento3-flare 8s linear infinite;
      }
      .bento3-icon[data-variant="relay"] span {
        position: absolute;
        inset: 18px;
        border-top: 1px solid var(--bento3-icon-stroke);
        border-bottom: 1px solid var(--bento3-icon-stroke);
        transform: skewX(-15deg);
      }
      .bento3-icon[data-variant="relay"] span::before,
      .bento3-icon[data-variant="relay"] span::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 120%;
        left: -10%;
        background: linear-gradient(90deg, transparent, var(--bento3-icon-stroke), transparent);
        animation: bento3-dash 2.6s ease-in-out infinite;
      }
      .bento3-icon[data-variant="relay"] span::after {
        top: 70%;
        animation-delay: 0.9s;
      }
      .bento3-icon[data-variant="wave"] span {
        position: absolute;
        inset: 12px;
        border-radius: 999px;
        overflow: hidden;
      }
      .bento3-icon[data-variant="wave"] span::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 5%, var(--bento3-icon-stroke) 50%, transparent 95%);
        transform: translateX(-45%);
        animation: bento3-wave 2.8s ease-in-out infinite alternate;
      }
      .bento3-icon[data-variant="spark"] span {
        position: absolute;
        inset: 0;
      }
      .bento3-icon[data-variant="spark"] span::before,
      .bento3-icon[data-variant="spark"] span::after {
        content: "";
        position: absolute;
        inset: 12px;
        border-radius: 9999px;
        border: 1px solid var(--bento3-icon-stroke);
        opacity: 0.28;
        animation: bento3-pulse 2.8s ease-out infinite;
      }
      .bento3-icon[data-variant="spark"] span::after {
        animation-delay: 0.9s;
      }
      .bento3-icon[data-variant="loop"] span {
        position: absolute;
        inset: 12px;
      }
      .bento3-icon[data-variant="loop"] span::before,
      .bento3-icon[data-variant="loop"] span::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        background: linear-gradient(90deg, transparent, var(--bento3-icon-stroke), transparent);
      }
      .bento3-icon[data-variant="loop"] span::before {
        transform: rotate(90deg);
      }
      .bento3-icon[data-variant="loop"] span::after {
        opacity: 0.4;
        transform: rotate(0deg);
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIntroReady(true);
      setVisible(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const syncTheme = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "bento-theme") syncTheme();
    };

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const handleMedia = () => syncTheme();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
    }
    media?.addEventListener("change", handleMedia);

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
      }
      media?.removeEventListener("change", handleMedia);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const palette = useMemo(() => palettes[theme], [theme]);

  const containerStyle = useMemo(
    () => ({
      "--bento3-grid-color": palette.gridColor,
      "--bento3-focus-glow": palette.focusGlow,
      "--bento3-icon-stroke": palette.iconStroke,
      "--bento3-icon-trail": palette.iconTrail,
    } as React.CSSProperties),
    [palette.gridColor, palette.focusGlow, palette.iconStroke, palette.iconTrail]
  );

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      window.localStorage?.setItem("bento-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <div
      className={`bento3-root relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${palette.surface}`}
      style={containerStyle}
    >
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--bento3-grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--bento3-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: palette.overlay }} />

      <section
        ref={sectionRef}
        className={`bento3-section relative z-10 mx-auto flex max-w-6xl flex-col gap-12 py-24 md:gap-16 ${
          introReady && visible ? "" : "opacity-0"
        }`}
      >
        <div
          className={`bento3-hero-pill mx-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-full border px-5 py-3 text-[11px] uppercase tracking-[0.5em] transition-all duration-700 ${
            introReady ? "opacity-100 translate-y-0" : "translate-y-5 opacity-0"
          } ${palette.capsule}`}
        >
          <span className="relative flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_0_6px_rgba(255,255,255,0.05)]" />
            New system route
          </span>
          <span className="font-medium">Bento Edition 03</span>
        </div>

        <header className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full px-3 py-1 text-xs uppercase tracking-[0.4em] text-current">
              <span className={`h-1 w-14 rounded-full ${palette.headingAccent}`} />
              Press-ready systems
            </div>
            <h1 className={`text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl ${palette.heading}`}>
              Monochrome workflow blocks that stay aligned with your product rhythm.
            </h1>
            <p className={`max-w-2xl text-sm sm:text-base md:text-lg ${palette.muted}`}>
              Drag this sequence into your library to instantly represent discovery, design, build, quality, and growth without leaving the black & white language.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-xs uppercase tracking-[0.35em] ${palette.muted}`}>Toggle theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className={`relative inline-flex h-11 items-center gap-3 rounded-full border px-5 text-sm font-medium transition-colors duration-500 ${palette.toggleSurface} ${palette.toggle}`}
                aria-pressed={theme === "dark"}
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-full border opacity-40 ${
                      theme === "dark" ? "border-white/40" : "border-neutral-400/60"
                    }`}
                  />
                  <span
                    className={`h-3 w-3 rounded-full transition-all duration-500 ${
                      theme === "dark" ? "bg-white" : "bg-neutral-900"
                    }`}
                  />
                </span>
                {theme === "dark" ? "Night" : "Day"} mode
              </button>
            </div>
            <p className={`max-w-xs text-xs ${palette.muted}`}>
              Uses your site theme tokens — no inline overrides.
            </p>
          </div>
        </header>

        <div className="bento3-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
          {flows.map((flow, index) => (
            <FlowCard key={flow.id} flow={flow} palette={palette} index={index} visible={visible} />
          ))}
        </div>

        <div className={`bento3-metrics grid grid-cols-1 gap-4 rounded-[28px] border p-6 sm:grid-cols-2 md:grid-cols-3 ${palette.cardBorder} ${palette.card}`}>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`rounded-[22px] border px-5 py-6 text-xs uppercase tracking-[0.22em] text-center sm:text-sm sm:tracking-[0.25em] ${palette.metric}`}
            >
              <span className="block text-[10px] opacity-60 sm:text-[11px]">{metric.label}</span>
              <span className="mt-2 block text-base font-semibold tracking-[0.08em] sm:text-lg sm:tracking-[0.12em]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        <footer className="bento3-footer flex flex-col gap-5 border-t border-dashed border-current/20 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <div className={`flex flex-col gap-2 ${palette.muted}`}>
            <span className="text-xs uppercase tracking-[0.35em]">Ready to drop in</span>
            <span className="text-base font-medium text-current">Plug each stage into your component gallery or use the full journey grid.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${palette.button}`}
            >
              Copy layout tokens
            </button>
            <a
              href="#"
              className="text-xs uppercase tracking-[0.35em] underline-offset-4 transition hover:underline"
            >
              View live demo
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}

function FlowCard({ flow, palette, index, visible }: {
  flow: {
    id: string;
    variant: string;
    meta: string;
    title: string;
    description: string;
    statLabel: string;
    statValue: string;
  };
  palette: typeof palettes.dark;
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const setGlow = (event: React.MouseEvent) => {
    const target = cardRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--bento3-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--bento3-y", `${event.clientY - rect.top}px`);
  };

  const clearGlow = () => {
    const target = cardRef.current;
    if (!target) return;
    target.style.removeProperty("--bento3-x");
    target.style.removeProperty("--bento3-y");
  };

  return (
    <article
      ref={cardRef}
      className={`bento3-card group relative overflow-hidden rounded-[28px] border ${palette.cardBorder} ${palette.card} p-6 transition-colors duration-500`}
      data-visible={visible}
      style={{ "--bento3-delay": `${index * 90}ms` } as React.CSSProperties}
      onMouseMove={setGlow}
      onMouseLeave={clearGlow}
    >
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-xs uppercase tracking-[0.3em] opacity-50 sm:h-12 sm:w-12">
          {flow.id}
        </div>
        <div className="flex flex-col gap-4 lg:flex-1">
          <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.4em] ${palette.cardBorder} ${palette.muted}`}>
            {flow.meta}
          </span>
          <h3 className={`text-xl font-semibold leading-tight sm:text-2xl ${palette.heading}`}>{flow.title}</h3>
          <p className={`text-sm leading-relaxed sm:text-base ${palette.muted}`}>{flow.description}</p>
        </div>
        <div className={`mt-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${palette.cardBorder} ${palette.card} sm:h-14 sm:w-14 lg:ml-auto lg:mt-0 lg:h-16 lg:w-16`}>
          <AnimatedIcon variant={flow.variant} />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-[0.65rem] uppercase tracking-[0.25em] opacity-70 sm:text-xs sm:tracking-[0.35em] sm:flex-row sm:items-center sm:justify-between">
        <span className="text-center sm:text-left">{flow.statLabel}</span>
        <span className="text-center font-semibold text-current sm:text-right">{flow.statValue}</span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at var(--bento3-x, 50%) var(--bento3-y, 50%), var(--bento3-focus-glow), transparent 68%)`,
        }}
      />
    </article>
  );
}

function AnimatedIcon({ variant }: { variant: string }) {
  return (
    <span className="bento3-icon" data-variant={variant}>
      <span />
    </span>
  );
}

export default Bento3Section;
export { Bento3Section };

