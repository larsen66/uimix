"use client";

import { InfiniteCanvasGrid } from '@/components/ui/infinite-canvas-grid';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Apply home canvas styles
    document.documentElement.classList.add('home-canvas');

    return () => {
      // Cleanup when component unmounts
      document.documentElement.classList.remove('home-canvas');
    };
  }, []);

  return (
    <div className="w-screen h-screen" style={{ margin: 0, padding: 0 }}>
      <InfiniteCanvasGrid/>
    </div>
  );
}
