"use client";

import { useEffect, useRef } from "react";

interface ComponentPreviewProps {
  componentId: string;
  isDarkMode?: boolean;
}

export default function ComponentPreview({ componentId, isDarkMode = false }: ComponentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // Force reload iframe when theme changes
      const currentSrc = iframeRef.current.src;
      const url = new URL(currentSrc);
      url.searchParams.set('theme', isDarkMode ? 'dark' : 'light');
      url.searchParams.set('t', Date.now().toString()); // Cache buster
      iframeRef.current.src = url.toString();
    }
  }, [isDarkMode]);

  return (
    <iframe
      ref={iframeRef}
      src={`/component-preview/${componentId}?theme=${isDarkMode ? 'dark' : 'light'}`}
      className="w-full h-full border-0"
      title="Component Preview"
      sandbox="allow-scripts allow-same-origin"
      style={{ display: 'block' }}
    />
  );
}
