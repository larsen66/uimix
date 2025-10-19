"use client";

import { ReactNode, useState } from "react";
import { Maximize2, X } from "lucide-react";

interface FullscreenWrapProps {
  children: ReactNode;
}

export function FullscreenWrap({ children }: FullscreenWrapProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors"
        aria-label="Enter fullscreen"
        title="Enter fullscreen"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors"
              aria-label="Exit fullscreen"
              title="Exit fullscreen"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-full h-full overflow-auto p-6">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
