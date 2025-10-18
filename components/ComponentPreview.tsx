"use client";

import { useEffect, useRef, useState } from 'react';

interface ComponentPreviewProps {
  component: React.ComponentType;
  scale?: number;
  fullscreenScale?: number;
}

export const ComponentPreview = ({ 
  component: Component, 
  scale = 0.7, 
  fullscreenScale = 0.75 
}: ComponentPreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentSize, setContentSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const box = entry.contentBoxSize?.[0];
        if (box) {
          setContentSize({ width: entry.contentRect.width, height: entry.contentRect.height });
        } else {
          setContentSize({ width: el.clientWidth, height: el.clientHeight });
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="relative w-full h-full">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 px-3 py-2 bg-background/80 backdrop-blur border border-border rounded-md text-sm hover:bg-background/90 transition-colors"
          >
            ✕ Exit Fullscreen
          </button>
          <div className="w-full h-full overflow-auto relative">
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{
                transform: `scale(${fullscreenScale})`,
                width: `${100 / fullscreenScale}%`,
              }}
            >
              <div ref={contentRef}>
                <Component />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-x-hidden"
      style={{ height: contentSize.height ? contentSize.height * scale : undefined }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleFullscreen}
          className="px-3 py-2 bg-background/80 backdrop-blur border border-border rounded-md text-sm hover:bg-background/90 transition-colors shadow-lg"
        >
          ⛶ Fullscreen
        </button>
      </div>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: `${100 / scale}%`,
        }}
      >
        <div ref={contentRef}>
          <Component />
        </div>
      </div>
    </div>
  );
};