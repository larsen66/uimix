'use client';
import { useState, useEffect } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import PixelBlast from '@/components/ui/PixelBlast';

// "Hero section" style: full viewport height, centered, responsive.
const PixelBlastDemo = () => {
  // Controls state
  const [variant, setVariant] = useState<'square' | 'circle' | 'triangle' | 'diamond' | 'ascii'>('square');
  const [pixelSize, setPixelSize] = useState<number>(4);
  const [patternScale, setPatternScale] = useState<number>(2);
  const [patternDensity, setPatternDensity] = useState<number>(1);
  const [pixelSizeJitter, setPixelSizeJitter] = useState<number>(0);
  const [enableRipples, setEnableRipples] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(0.5);
  const [edgeFade, setEdgeFade] = useState<number>(0.25);
  const [color, setColor] = useState<string>('#B19EEF');

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pixelblast-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.variant) setVariant(settings.variant);
        if (settings.pixelSize) setPixelSize(settings.pixelSize);
        if (settings.patternScale) setPatternScale(settings.patternScale);
        if (settings.patternDensity) setPatternDensity(settings.patternDensity);
        if (settings.pixelSizeJitter !== undefined) setPixelSizeJitter(settings.pixelSizeJitter);
        if (settings.enableRipples !== undefined) setEnableRipples(settings.enableRipples);
        if (settings.speed) setSpeed(settings.speed);
        if (settings.edgeFade) setEdgeFade(settings.edgeFade);
        if (settings.color) setColor(settings.color);
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

  // Debug log
  console.log('Current variant:', variant);

  return (
    <section className="relative flex items-center justify-center w-full min-h-[54vh] md:min-h-[72vh] lg:min-h-[90vh] p-0 overflow-hidden" style={{ width: '100vw' }}>
      {/* Dashed Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-fd-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-fd-border) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Background effect */}
      <PixelBlast
        className="absolute inset-0 w-full h-full"
        style={{}}
        variant={variant}
        pixelSize={pixelSize}
        color={color}
        patternScale={patternScale}
        patternDensity={patternDensity}
        pixelSizeJitter={pixelSizeJitter}
        enableRipples={enableRipples}
        speed={speed}
        edgeFade={edgeFade}
      />

    </section>
  );
};

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <PixelBlastDemo />
    </HomeLayout>
  );
}
