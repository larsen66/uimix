"use client";

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * LazyVideo component that only loads video when it's about to enter the viewport.
 * Uses Intersection Observer API to detect when video is near viewport.
 * Optimized for large video files and production environments.
 */
export function LazyVideo({ src, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldLoad) return;

    // Используем IntersectionObserver с увеличенным rootMargin для ранней загрузки
    // и учитываем возможные трансформации родительского контейнера
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setShouldLoad(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        });
      },
      { 
        rootMargin: '200px', // Увеличено для ранней загрузки (особенно важно для трансформируемых контейнеров)
        threshold: 0.01 // Загружаем даже если видна небольшая часть
      }
    );

    observerRef.current.observe(video);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [shouldLoad, src]);

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

