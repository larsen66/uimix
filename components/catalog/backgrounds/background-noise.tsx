"use client"

import React from "react";
import Noise from "@/components/ui/noise";

/** Gradient + Noise (applied to one of our previous dark radial variants). */
export default function BackgroundNoise() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      {/* Radial spotlight (orange) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#f97316,transparent)]" />
      {/* Grain overlay */}
      <Noise patternRefreshInterval={2} patternAlpha={18} />
    </div>
  );
}

