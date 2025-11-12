"use client";

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * LazyVideo component that only loads video when it's about to enter the viewport.
 * Uses Intersection Observer API to detect when video is near viewport.
 */
export function LazyVideo({ src, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '100px' // Начинать загрузку за 100px до появления в viewport
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload="none"
      {...props}
    />
  );
}

export default LazyVideo;

