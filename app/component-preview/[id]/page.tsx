'use client';

import { useEffect, use } from "react";
import CTAWithHorizontalMarquee from "@/components/cta-with-horizontal-marquee";
import CTAWithVerticalMarquee from "@/components/cta-with-vertical-marquee";
import CTAWithVerticalMarqueeLeft from "@/components/cta-with-vertical-marquee-left";

const componentMap: Record<string, React.ComponentType> = {
  "cta-horizontal-marquee": CTAWithHorizontalMarquee,
  "cta-vertical-marquee": CTAWithVerticalMarquee,
  "cta-vertical-marquee-left": CTAWithVerticalMarqueeLeft,
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
