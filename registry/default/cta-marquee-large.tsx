"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:0rem] [gap:var(--gap)]",
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
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
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

const images = [
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=700&h=700&fit=crop",
];

const images2 = [
  "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=700&h=700&fit=crop",
];

function ScrambleButton() {
  const [displayText, setDisplayText] = useState("Read More");
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = "Read More";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <button
      onMouseEnter={scramble}
      className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
    >
      {displayText}
    </button>
  );
}

export default function HeroWithMarqueeLarge() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center lg:gap-4">
          {/* Left Content */}
          <div className="flex-shrink-0 space-y-6 px-6 lg:px-12 py-12 lg:py-0 lg:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Innovation Through Design
            </h1>
            <div className="space-y-1 text-muted-foreground">
              <p className="text-lg">Spring 2025</p>
              <p className="text-lg">Creative Lab</p>
            </div>
            <ScrambleButton />
          </div>

          {/* Right Marquee Grid */}
          <div className="flex-1 w-full lg:w-auto relative space-y-0 overflow-hidden">
            <Marquee speed={30} reverse className="[--gap:0rem]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-64 h-64 lg:w-80 lg:h-80 overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={src}
                    alt={`Image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={30} className="[--gap:0rem]">
              {images2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-64 h-64 lg:w-80 lg:h-80 overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={src}
                    alt={`Image ${idx + 5}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
            {/* Vignette edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
