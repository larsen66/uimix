"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ComponentPreviewProps {
  component?: React.ComponentType;
  scale?: number;
  fullscreenScale?: number;
  hideFullscreen?: boolean;
  children?: ReactNode;
}

export const ComponentPreview = ({ 
  component: Component, 
  scale = 0.7, 
  fullscreenScale = 0.75,
  hideFullscreen = false,
  children
}: ComponentPreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const fullscreenContentRef = useRef<HTMLDivElement | null>(null);
  const [contentSize, setContentSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  // When using children (like iframes), don't apply scaling
  const shouldScale = !!Component;
  
  useEffect(() => {
    if (!shouldScale) return; // Skip resize observer for non-scaled content
    
    const currentRef = isFullscreen ? fullscreenContentRef.current : contentRef.current;
    if (!currentRef) return;
    
    const el = currentRef;
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
  }, [isFullscreen, shouldScale]);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Force a small delay to ensure the DOM has updated before measuring
    setTimeout(() => {
      const currentRef = !isFullscreen ? fullscreenContentRef.current : contentRef.current;
      if (currentRef) {
        setContentSize({ 
          width: currentRef.clientWidth, 
          height: currentRef.clientHeight 
        });
      }
    }, 10);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="relative w-full h-full">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors"
            aria-label="Exit fullscreen"
            title="Exit fullscreen"
          >
            ✕
          </button>
          <div className="w-full h-full overflow-auto relative flex items-center justify-center">
            {shouldScale ? (
              <div
                className="origin-center"
                style={{
                  transform: `scale(${fullscreenScale})`,
                  width: `${100 / fullscreenScale}%`,
                }}
              >
                <div ref={fullscreenContentRef}>
                  {Component ? <Component /> : children}
                </div>
              </div>
            ) : (
              <div ref={fullscreenContentRef} className="w-full h-full">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-x-hidden"
      style={shouldScale ? { 
        height: contentSize.height ? contentSize.height * scale : 'auto',
        minHeight: contentSize.height ? contentSize.height * scale : '200px'
      } : undefined}
    >
      {!hideFullscreen && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors shadow-lg"
            aria-label="Enter fullscreen"
            title="Enter fullscreen"
          >
            ⛶
          </button>
        </div>
      )}
      {shouldScale ? (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
          }}
        >
          <div ref={contentRef}>
            {Component ? <Component /> : children}
          </div>
        </div>
      ) : (
        <div ref={contentRef}>
          {children}
        </div>
      )}
    </div>
  );
};