"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Content Agencies",
  "Founders & Execs",
  "Social Media Managers",
  "Content Marketers",
  "Growth Teams",
];

export default function CtaVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-foreground animate-fade-in-up [animation-delay:200ms]">
              Get Started in Minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Start getting more distribution and ROI out of your content. Try
              Assembly for free for 14 days.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
              <button className="group relative px-6 py-3 bg-foreground text-background rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="relative z-10">START FREE TRIAL</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
              <button className="group relative px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border">
                <span className="relative z-10">BOOK A 15 MINUTE DEMO</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[600px] lg:h-[700px] flex items-center justify-center animate-fade-in-up [animation-delay:400ms]">
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 marquee-item"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/50 to-transparent z-10"></div>
              
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

