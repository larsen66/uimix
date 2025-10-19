"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Feature { text: string }
interface Plan {
  id: string;
  name: string;
  blurb: string;
  monthly: string;
  yearly: string;
  features: Feature[];
  cta: { text: string; url: string };
  popular?: boolean;
}

export default function PricingCards3({
  title = "Pricing",
  subtitle = "Transparent plans for every stage.",
  plans: defaultPlans = [
    {
      id: "basic",
      name: "Basic",
      blurb: "For personal projects",
      monthly: "$8",
      yearly: "$6",
      features: [
        { text: "3 projects" },
        { text: "Community support" },
        { text: "Email reports" },
      ],
      cta: { text: "Start", url: "https://21st.dev" },
    },
    {
      id: "pro",
      name: "Pro",
      blurb: "Best for teams",
      monthly: "$29",
      yearly: "$23",
      features: [
        { text: "Unlimited projects" },
        { text: "Team collaboration" },
        { text: "Priority support" },
        { text: "Advanced analytics" },
      ],
      cta: { text: "Upgrade", url: "https://21st.dev" },
      popular: true,
    },
    {
      id: "scale",
      name: "Scale",
      blurb: "For organizations",
      monthly: "$79",
      yearly: "$59",
      features: [
        { text: "All Pro features" },
        { text: "SAML SSO" },
        { text: "Audit logs" },
        { text: "Dedicated support" },
      ],
      cta: { text: "Contact sales", url: "https://21st.dev" },
    },
  ],
}: {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
}) {
  const [yearly, setYearly] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? 520));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    type P = { x: number; y: number; r: number; a: number; s: number };
    let ps: P[] = [];
    let raf = 0;
    const init = () => {
      ps = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const n = Math.floor((w * h) / 22000);
      for (let i = 0; i < n; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.4,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.3 + 0.1,
        });
      }
    };
    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        p.a += p.s * 0.01;
        p.x += Math.cos(p.a) * p.s;
        p.y += Math.sin(p.a) * p.s * 0.6;
        if (p.x < -4) p.x = w + 4; if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4; if (p.y > h + 4) p.y = -4;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(() => { setSize(); init(); });
    ro.observe(canvas.parentElement || document.body);
    init();
    raf = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const plans = defaultPlans;

  return (
    <section className="relative isolate overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 dark:from-white/0 dark:via-white/0 dark:to-white/10" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">
            Pricing
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">{subtitle}</p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border px-2 py-1 text-sm">
            Monthly
            <button
              onClick={() => setYearly((v) => !v)}
              className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em]"
            >
              Toggle
            </button>
            Yearly
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Card key={plan.id} className={`${plan.popular ? "border-neutral-300 shadow-2xl dark:border-white/20" : "border-neutral-200 dark:border-white/10"}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.popular && (
                    <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.3em]">Popular</span>
                  )}
                </CardTitle>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{plan.blurb}</p>
                <div className="mt-2 text-4xl font-bold">
                  {yearly ? plan.yearly : plan.monthly}
                </div>
                <p className="text-xs text-neutral-500">Billed {yearly ? "yearly" : "monthly"}</p>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <ul className="space-y-3">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-400" />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href={plan.cta.url} target="_blank" rel="noreferrer">
                    {plan.cta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
