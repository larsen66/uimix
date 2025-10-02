"use client";

import { useState } from "react";

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

export default function HeroWithVideo() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center lg:gap-8">
          {/* Left Content */}
          <div className="flex-shrink-0 space-y-6 px-6 lg:px-12 py-12 lg:py-0 lg:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Experience Next-Gen AI Video Generation
            </h1>
            <div className="space-y-1 text-muted-foreground">
              <p className="text-lg">Powered by Ray2 API</p>
              <p className="text-lg">Advanced AI Technology</p>
            </div>
            <ScrambleButton />
          </div>

          {/* Right Video */}
          <div className="flex-1 w-full lg:w-auto overflow-hidden rounded-2xl lg:rounded-none">
            <video
              src="https://static.cdn-luma.com/files/site/api/ray2/RAY2%20API%20Launch%20Twitter_smaller.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

