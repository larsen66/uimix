"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState, useMemo } from "react";

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
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
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
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
];

const images2 = [
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400&h=400&fit=crop",
];

interface MixedFontTextProps {
  text: string;
  className?: string;
  intervalDuration?: number;
  changeDuration?: number;
}

function MixedFontText({ 
  text, 
  className = "", 
  intervalDuration = 3000,
  changeDuration = 2000
}: MixedFontTextProps) {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  const charPositions = useMemo(() => {
    const words = text.split(" ");
    let charIndex = 0;
    const positions: Array<{ char: string; index: number; isSpace: boolean; wordIndex: number }> = [];

    words.forEach((word, wordIdx) => {
      if (wordIdx > 0) {
        positions.push({ char: " ", index: charIndex++, isSpace: true, wordIndex: -1 });
      }
      
      word.split("").forEach((char) => {
        positions.push({
          char,
          index: charIndex++,
          isSpace: false,
          wordIndex: wordIdx
        });
      });
    });

    return positions;
  }, [text]);

  useMemo(() => {
    const triggerChange = () => {
      const words = text.split(" ");
      const wordIndices = words.map((_, idx) => idx);
      
      const shuffled = [...wordIndices].sort(() => Math.random() - 0.5);
      const selectedWords = shuffled.slice(0, 2);
      
      const newActiveIndices = new Set<number>();
      
      selectedWords.forEach(wordIdx => {
        const wordChars = charPositions.filter(cp => cp.wordIndex === wordIdx && !cp.isSpace);
        if (wordChars.length > 0) {
          const randomCharIdx = Math.floor(Math.random() * wordChars.length);
          newActiveIndices.add(wordChars[randomCharIdx].index);
        }
      });
      
      setActiveIndices(newActiveIndices);
      
      setTimeout(() => {
        setActiveIndices(new Set());
      }, changeDuration);
    };

    triggerChange();
    const interval = setInterval(triggerChange, intervalDuration);

    return () => clearInterval(interval);
  }, [text, charPositions, intervalDuration, changeDuration]);

  return (
    <span className={className}>
      {charPositions.map(({ char, index }) => {
        const isActive = activeIndices.has(index);
        return (
          <span
            key={`${char}-${index}`}
            className="inline-block transition-all duration-700 ease-in-out"
            style={isActive ? { 
              fontFamily: "'Zapfino', 'Edwardian Script ITC', 'Snell Roundhand', 'Apple Chancery', cursive",
              fontStyle: "italic",
              fontSize: "1.15em",
              fontWeight: 400
            } : {
              fontFamily: "inherit",
              fontStyle: "normal",
              fontSize: "1em",
              fontWeight: "inherit"
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

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

export default function HeroWithMarqueeMixedFont() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <MixedFontText 
                text="The Future of Creative Design" 
                intervalDuration={4000}
                changeDuration={2000}
              />
            </h1>
            <div className="space-y-1 text-muted-foreground">
              <p className="text-lg">March 2025</p>
              <p className="text-lg">Design Studio</p>
            </div>
            <ScrambleButton />
          </div>

          {/* Right Marquee Grid */}
          <div className="relative space-y-4 overflow-hidden">
            <Marquee speed={30} reverse className="[--gap:1rem]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0"
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
            <Marquee speed={30} className="[--gap:1rem]">
              {images2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0"
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
          </div>
        </div>
      </div>
    </div>
  );
}

