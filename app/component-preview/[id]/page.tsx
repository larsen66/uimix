'use client';

import { useEffect, use } from "react";
import {
  CTAWithHorizontalMarquee,
  CTAWithVerticalMarquee,
  CTAWithVerticalMarqueeLeft,
  HeroWithMarqueeLarge,
  HeroWithMarquee,
  HeroWithMarqueeMixedFont,
  HeroWithMarqueeReverse,
  HeroWithVideo
} from "@/components/catalog/cta";
import { HeroMinimalism, HeroMonochromeLaunch, HeroOrbitDeck } from "@/components/catalog/hero";
import { LoginCard } from "@/components/catalog/login-signup";
import { PricingCards } from "@/components/catalog/pricing";
import { ProcessingDemo } from "@/components/catalog/processing";
import { FallbackCardDemo } from "@/components/catalog/cards";
import { BackgroundNoise, SquaresBackground, BackgroundGradientGrid, BlueprintGradientMesh } from "@/components/catalog/backgrounds";
import { FAQMonochrome, FAQWithSpiral } from "@/components/catalog/faq";
import { BentoFeatures, BentoMonochrome, BentoMonochrome1 } from "@/components/catalog/features";

const componentMap: Record<string, React.ComponentType> = {
  "hero-minimalism": HeroMinimalism,
  "hero-monochrome-launch": HeroMonochromeLaunch,
  "hero-orbit-deck": HeroOrbitDeck,
  "login-card": LoginCard,
  "cta-horizontal-marquee": CTAWithHorizontalMarquee,
  "cta-vertical-marquee": CTAWithVerticalMarquee,
  "cta-vertical-marquee-left": CTAWithVerticalMarqueeLeft,
  "hero-with-marquee-large": HeroWithMarqueeLarge,
  "hero-with-marquee": HeroWithMarquee,
  "hero-with-marquee-mixed-font": HeroWithMarqueeMixedFont,
  "hero-with-marquee-reverse": HeroWithMarqueeReverse,
  "hero-with-video": HeroWithVideo,
  "pricing-cards": PricingCards,
  "processing-card": ProcessingDemo,
  "fallback-card-demo": FallbackCardDemo,
  "background-noise": BackgroundNoise,
  "squares-background": SquaresBackground,
  "background-gradient-grid": BackgroundGradientGrid,
  "blueprint-gradient-mesh": BlueprintGradientMesh,
  "bento-features": BentoFeatures,
  "bento-monochrome": BentoMonochrome,
  "bento-monochrome-1": BentoMonochrome1,
  "faq-with-spiral": FAQWithSpiral,
  "faq-monochrome": FAQMonochrome,
};

export default function ComponentPreviewPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { id } = use(params);
  const { theme } = use(searchParams);
  const Component = componentMap[id];
  const isDark = theme === 'dark';

  useEffect(() => {
    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Cleanup
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [isDark]);

  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Component not found</p>
      </div>
    );
  }

  return <Component />;
}
