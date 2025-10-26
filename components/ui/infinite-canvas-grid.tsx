"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
// Removed Masonry imports - using custom grid layout instead
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Masonry from '@/components/ui/Masonry';
import { ZoomIn, ZoomOut } from 'lucide-react';

const DEBUG = true;
const log = (...args: unknown[]) => {
  if (DEBUG && typeof window !== 'undefined') console.log('[InfiniteCanvasGrid]', ...args);
};



// Exact video list/order used in docs video masonry page
const videoSources: string[] = [
  "/videos/bgblue.mov",
  "/videos/faq-monochrome.mov",
  "/videos/faq-with-spiral.mov",
  "/videos/hero-minimalism.mov",
  "/videos/hero-orbit.mov",
  "/videos/processing_card.mov",
  "/videos/fallback-card.mov",
  "/videos/monochrome-bento.mp4",
  "/videos/dock.mp4",
  "/videos/ctamarquee.mov",
  "/videos/ctatextmarque.mov",
  "/videos/pricing2.mov",
  "/videos/heroascii1.mp4",
  "/videos/heroascii2.mp4",
  "/videos/herobyd.mp4",
];

// Simple Skeleton fallback for dynamic imports
const Skeleton: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 12,
      background:
        'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)'
    }}
  >
    Loading…
  </div>
);


// #region Component Imports (Dynamic)
const FeaturesSectionMinimal = dynamic(() => import("@/registry/default/bento-monochrome-1"), { ssr: false, loading: () => <Skeleton /> });
const FAQMonochrome = dynamic(() => import("@/registry/default/faq-monochrome"), { ssr: false, loading: () => <Skeleton /> });
const FAQWithSpiral = dynamic(() => import("@/registry/default/faq-with-spiral"), { ssr: false, loading: () => <Skeleton /> });
const HeroDock = dynamic(() => import("@/registry/default/hero-dock"), { ssr: false, loading: () => <Skeleton /> });
const MinimalHero = dynamic(() => import("@/registry/default/hero-minimalism"), { ssr: false, loading: () => <Skeleton /> });
const HeroOrbitDeck = dynamic(() => import("@/registry/default/hero-orbit-deck"), { ssr: false, loading: () => <Skeleton /> });
const ProcessingCardSection = dynamic(() => import("@/registry/default/processing-card/processing-card"), { ssr: false, loading: () => <Skeleton /> });
const FallbackCardSection = dynamic(() => import("@/registry/default/fallback-card/fallback-card"), { ssr: false, loading: () => <Skeleton /> });
const Frame = dynamic(() => import('react-frame-component'), { ssr: false });
// #endregion

// #region Type Interfaces
interface ComponentRegistryItem {
  name: string;
  component: React.ComponentType;
  description: string;
  tags: string[];
  size: { width: number; height: number };
}

interface CanvasContentProps {
  selectedComponent: {
    component: React.ComponentType;
    name: string;
    description: string;
  } | null;
  setSelectedComponent: (component: {
    component: React.ComponentType;
    name: string;
    description: string;
  } | null) => void;
  showGrid: boolean;
}
// #endregion

// #region Constants
const CANVAS_SIZE = 6000;
const CANVAS_ORIGIN = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };

const componentRegistry: ComponentRegistryItem[] = [
  { name: "FAQ Monochrome", component: FAQMonochrome, description: "Elegant monochrome FAQ section", tags: ["faq", "minimal", "theme"], size: { width: 800, height: 600 } },
  { name: "FAQ with Spiral", component: FAQWithSpiral, description: "Interactive FAQ with animated spiral", tags: ["faq", "spiral", "interactive"], size: { width: 800, height: 600 } },
  { name: "Hero Minimalism", component: MinimalHero, description: "Clean minimal hero with particles", tags: ["hero", "minimal", "particles"], size: { width: 800, height: 600 } },
  { name: "Hero Orbit Deck", component: HeroOrbitDeck, description: "Command deck hero with orbital animations", tags: ["hero", "orbit", "command"], size: { width: 800, height: 600 } },
  { name: "Hero Dock", component: HeroDock, description: "Elegant minimal dock-style hero", tags: ["hero", "dock", "minimal"], size: { width: 800, height: 600 } },
  { name: "Bento Monochrome", component: FeaturesSectionMinimal, description: "Minimal monochrome bento grid", tags: ["bento", "minimal", "grid"], size: { width: 800, height: 700 } },
  { name: "Processing Card", component: ProcessingCardSection, description: "Animated processing card with glitch effects", tags: ["processing", "glitch", "card"], size: { width: 700, height: 525 } },
  { name: "Fallback Card", component: FallbackCardSection, description: "Elegant fallback cards with glitch effects", tags: ["fallback", "glitch", "card"], size: { width: 700, height: 525 } },
  { name: "Hero ASCII 1", component: MinimalHero, description: "Hero ASCII style 1", tags: ["hero", "ascii", "minimal"], size: { width: 800, height: 600 } },
  { name: "Hero ASCII 2", component: MinimalHero, description: "Hero ASCII style 2", tags: ["hero", "ascii", "minimal"], size: { width: 800, height: 600 } },
  { name: "Hero By Design", component: HeroOrbitDeck, description: "Hero By Design showcase", tags: ["hero", "design", "showcase"], size: { width: 800, height: 600 } },
  { name: "Background Blue", component: HeroDock, description: "Blue background animation", tags: ["background", "blue", "animation"], size: { width: 800, height: 600 } },
  { name: "CTA Text Marquee", component: MinimalHero, description: "CTA with text marquee", tags: ["cta", "text", "marquee"], size: { width: 800, height: 600 } },
  { name: "CTA Marquee", component: MinimalHero, description: "CTA marquee component", tags: ["cta", "marquee"], size: { width: 800, height: 600 } },
  { name: "Pricing 2", component: MinimalHero, description: "Pricing component 2", tags: ["pricing", "cards"], size: { width: 800, height: 600 } },
];
// #endregion

// #region Components
function ScaledIframePreview({
  Component,
  width,
  height,
  scale,
  head,
  allowPointerEvents = false,
  inheritGlobalStyles = true,
  onMeasured,
  fixedViewport,
}: {
  Component: React.ComponentType;
  width: number;
  height: number;
  scale: number;
  head?: React.ReactNode;
  allowPointerEvents?: boolean;
  inheritGlobalStyles?: boolean;
  onMeasured?: (size: { width: number; height: number }) => void;
  fixedViewport?: { width: number; height: number };
}) {
  const frameRef = useRef<any>(null);
  const [frameSize, setFrameSize] = useState<{ width: number; height: number }>(fixedViewport ?? { width, height });
  const isPreview = !allowPointerEvents;
  const clonedHead = useMemo(() => {
    if (!inheritGlobalStyles || typeof document === 'undefined') return head ?? null;
    const nodes = Array.from(
      document.head.querySelectorAll(
        'style, link[rel="stylesheet"], link[rel="preconnect"], link[as="style"], style[data-next-hide-fouc]'
      )
    );
    const reactNodes: React.ReactNode[] = nodes.map((n, idx) => {
      if (n.tagName.toLowerCase() === 'style') {
        return <style key={`style-${idx}`} dangerouslySetInnerHTML={{ __html: (n as HTMLStyleElement).innerHTML }} />;
      }
      const linkEl = n as HTMLLinkElement;
      if (linkEl.tagName.toLowerCase() === 'link') {
        const props: any = {};
        Array.from(linkEl.attributes).forEach((a) => (props[a.name] = a.value));
        return <link key={`link-${idx}`} {...props} />;
      }
      return null;
    });
    return (
      <>
        {head}
        {reactNodes}
      </>
    );
  }, [inheritGlobalStyles, head]);

  useEffect(() => {
    if (!inheritGlobalStyles) return;
    const iframeEl: any = frameRef.current?.node || frameRef.current;
    const doc: Document | null = iframeEl?.contentDocument || iframeEl?.contentWindow?.document || null;
    if (!doc) return;

    const targetHead = doc.head;
    if (!targetHead) return;

    // Avoid duplicating on re-renders
    if (targetHead.querySelector('[data-cloned-global-styles="true"]')) return;

    const frag = doc.createDocumentFragment();
    const marker = doc.createElement('meta');
    marker.setAttribute('data-cloned-global-styles', 'true');

    const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"], link[rel="preconnect"], link[as="style"], style[data-next-hide-fouc]'));
    nodes.forEach((node) => {
      const clone = node.cloneNode(true) as HTMLElement;
      frag.appendChild(clone);
    });
    frag.appendChild(marker);
    targetHead.appendChild(frag);

    // Mirror html/body classes (dark mode, fonts, etc.)
    doc.documentElement.className = document.documentElement.className;
    doc.body.className = document.body.className;

    // Keep syncing as new styles are injected (e.g., code-split, HMR)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          const isStyle = n.matches('style, link[rel="stylesheet"], link[rel="preconnect"], link[as="style"]');
          if (!isStyle) return;
          targetHead.appendChild(n.cloneNode(true));
        });
      });
    });
    observer.observe(document.head, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [inheritGlobalStyles]);

  // Measure content inside iframe and adjust frame size (throttled)
  useEffect(() => {
    if (fixedViewport) {
      setFrameSize(fixedViewport);
      return;
    }
    const iframeEl: any = frameRef.current?.node || frameRef.current;
    const doc: Document | null = iframeEl?.contentDocument || iframeEl?.contentWindow?.document || null;
    if (!doc) return;

    const root: HTMLElement | null = doc.querySelector('.frame-root') as HTMLElement | null;
    if (!root) return;

    let scheduled = false;
    const measure = () => {
      const body = doc.body;
      const html = doc.documentElement;
      const w = Math.max(
        root.scrollWidth,
        body?.scrollWidth || 0,
        html?.scrollWidth || 0,
        root.clientWidth
      );
      const h = Math.max(
        root.scrollHeight,
        body?.scrollHeight || 0,
        html?.scrollHeight || 0,
        root.clientHeight
      );
      if (w > 0 && h > 0) {
        const next = { width: w, height: h };
        setFrameSize(next);
        onMeasured?.(next);
      }
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      (iframeEl?.contentWindow || window).requestAnimationFrame(() => {
        scheduled = false;
        measure();
      });
    };

    // Initial measure after next frame
    const raf = (iframeEl?.contentWindow || window).requestAnimationFrame(() => measure());

    // Observe mutations/resizes inside the iframe
    const ro = new (iframeEl?.contentWindow?.ResizeObserver || ResizeObserver)(() => schedule());
    ro.observe(root);

    const mo = new (iframeEl?.contentWindow?.MutationObserver || MutationObserver)(() => schedule());
    mo.observe(root, { childList: true, subtree: true, attributes: true });

    // Re-measure on window resize inside iframe
    (iframeEl?.contentWindow || window).addEventListener('resize', schedule);

    return () => {
      (iframeEl?.contentWindow || window).cancelAnimationFrame?.(raf);
      ro.disconnect();
      mo.disconnect();
      (iframeEl?.contentWindow || window).removeEventListener('resize', schedule);
    };
  }, [onMeasured, fixedViewport]);

  return (
    <div style={{ width: frameSize.width * scale, height: frameSize.height * scale }}>
      <div
        style={{
          width: frameSize.width,
          height: frameSize.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: allowPointerEvents ? 'auto' : 'none',
          contain: 'layout paint size',
          isolation: 'isolate',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Frame
          ref={frameRef as any}
          style={{ width: frameSize.width, height: frameSize.height, border: 'none', display: 'block' }}
          head={clonedHead as any}
          initialContent={`<!DOCTYPE html><html class="dark"><head><base href="/" /><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>${isPreview ? '<style>*,*::before,*::after{box-sizing:border-box} html,body{margin:0;padding:0;width:100%;height:100%;background:#000;color:#fff} *{animation-play-state:paused !important}</style><script>(function(){var _raf=window.requestAnimationFrame;window.requestAnimationFrame=function(cb){return setTimeout(function(){cb(performance.now())},120)};window.cancelAnimationFrame=function(id){clearTimeout(id)};})();</script>' : '<style>*,*::before,*::after{box-sizing:border-box} html,body{margin:0;padding:0;width:100%;height:100%;background:#000;color:#fff}</style>'}</head><body><div class="frame-root"></div></body></html>`}
          mountTarget={".frame-root"}
        >
          <Component />
        </Frame>
      </div>
    </div>
  );
}

const CanvasContentWithContext: React.FC<CanvasContentProps> = ({
  selectedComponent,
  setSelectedComponent,
  showGrid,
}) => {
  const [modalScale, setModalScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const maxW = vw;
      const maxH = vh;
      const sx = maxW / 1440;
      const sy = maxH / 900;
      setModalScale(Math.min(sx, sy, 1));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [selectedComponent]);

  return (
      <div
        className="fixed inset-0 w-screen h-screen bg-black"
        style={{ overflow: 'hidden', margin: 0, padding: 0 } as React.CSSProperties}
      >
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              // Subtle dashed grid for dark theme
              backgroundImage:
                `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),` +
                `linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 0',
              maskImage:
                `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),` +
                `repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)`,
              WebkitMaskImage:
                `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),` +
                `repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)`,
              // Best-effort cross-browser mask composition
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              maskComposite: 'intersect',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              WebkitMaskComposite: 'source-in',
            } as React.CSSProperties}
          />
        )}

        <TransformComponent wrapperClass="absolute inset-0" contentClass="relative">
          <div className="relative" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
            {/* Exact same CSS-columns Masonry as docs, centered on canvas */}
            <div
              style={{
                position: 'absolute',
                left: CANVAS_ORIGIN.x,
                top: CANVAS_ORIGIN.y,
                transform: 'translate(-50%, -50%)',
                width: 'min(1200px, 90vw)',
              }}
            >
              <Masonry className="w-full" columnsClassName="columns-1 sm:columns-2 lg:columns-3 xl:columns-4" gapClassName="gap-4">
                {videoSources.map((src, i) => (
                  <video key={i} src={src} autoPlay loop muted playsInline className="w-full h-auto rounded-xl" />
                ))}
              </Masonry>
            </div>
          </div>
        </TransformComponent>
        


        <AnimatePresence>
          {selectedComponent && (
            <motion.div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.div className="relative w-screen h-screen bg-black overflow-hidden" initial={{ scale: 0.98, opacity: 0.95 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0.95 }} transition={{ duration: 0.25 }}>
                <motion.div className="absolute top-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.25 }}>
                  <div>
                    <div className="text-white font-medium">{selectedComponent.name}</div>
                    <div className="text-white/60 text-sm">{selectedComponent.description}</div>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="sm" onClick={() => setSelectedComponent(null)} className="text-white border-white/20 hover:bg-white/10">✕</Button>
                  </motion.div>
                </motion.div>
                <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.3 }}>
                  <div className="w-full h-full flex items-center justify-center">
                    {(() => {
                      const Selected = selectedComponent.component;
                      const idx = componentRegistry.findIndex((c) => c.name === selectedComponent.name);
                      const natural = idx >= 0 ? componentRegistry[idx].size : { width: 1440, height: 900 };
                      return (
                        <ScaledIframePreview
                          Component={Selected}
                          width={natural.width}
                          height={natural.height}
                          scale={modalScale}
                          allowPointerEvents
                        />
                      );
                    })()}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export const InfiniteCanvasGrid: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<{ component: React.ComponentType; name: string; description: string; } | null>(null);
  const wrapperRef = useRef<any>(null);
  const [wheelPanEnabled] = useState(true);
  const [scrollLock] = useState(true);
  const [panInvert] = useState(false);
  const [panSpeed] = useState(1.0);
  const [zoomSpeed] = useState(0.1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    log('componentRegistry:', componentRegistry.length, componentRegistry.map((i) => i.name));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safe zoom helper compatible with RZPP v3 ref shapes
  const zoomBy = (factorDelta: number) => {
    try {
      const ref: any = wrapperRef.current;
      if (!ref) return;
      const state: any = ref.state || ref.instance?.transformState || {};
      const posX = Number(state.positionX || 0);
      const posY = Number(state.positionY || 0);
      const scale = Number(state.scale || 1);
      const next = Math.max(0.1, Math.min(3, scale * (1 + factorDelta)));
      if (typeof ref.setTransform === 'function') {
        ref.setTransform(posX, posY, next, 0);
      } else if (factorDelta > 0 && typeof ref.zoomIn === 'function') {
        ref.zoomIn({ animationTime: 0 });
      } else if (factorDelta < 0 && typeof ref.zoomOut === 'function') {
        ref.zoomOut({ animationTime: 0 });
      }
    } catch {
      // noop
    }
  };

  // Masonry version does not use DnD; components are rendered in a responsive grid.

  // Scroll lock + scoped fullscreen class for canvas only
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preventDefault = (e: Event) => {
      const target = e.target as HTMLElement;
      const isUIControl = target?.closest('.ui-controls') || target?.closest('[data-fumadocs-nav]') || target?.closest('button,input,select,textarea');
      const blockedEvents = ['touchmove', 'touchstart', 'touchend', 'touchcancel', 'scroll'];
      if (!isUIControl && blockedEvents.includes(e.type)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (scrollLock) {
      log('enable fullscreen scroll lock');
      document.documentElement.classList.add('canvas-fullscreen');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      const events: Array<keyof DocumentEventMap> = ['touchmove', 'touchstart', 'touchend', 'touchcancel', 'scroll'];
      events.forEach(event => document.addEventListener(event, preventDefault as EventListener, { passive: false, capture: true }));
      return () => {
        log('disable fullscreen scroll lock');
        document.documentElement.classList.remove('canvas-fullscreen');
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
        const events2: Array<keyof DocumentEventMap> = ['touchmove', 'touchstart', 'touchend', 'touchcancel', 'scroll'];
        events2.forEach(event => document.removeEventListener(event, preventDefault as EventListener, true));
      };
    } else {
      document.documentElement.classList.remove('canvas-fullscreen');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
    }
  }, [scrollLock]);

  // Wheel pan/zoom control
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!wheelPanEnabled) return;

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const isUIControl = target?.closest('.ui-controls') || target?.closest('[data-fumadocs-nav]') || target?.closest('button,input,select,textarea');
      if (isUIControl) return; // allow scrolling inside UI controls if any

      try {
        const ref = wrapperRef.current as any;
        const state = (ref?.state || ref?.instance?.transformState || {});
        const posX = Number(state.positionX || 0);
        const posY = Number(state.positionY || 0);
        const scale = Number(state.scale || 1);

        if (e.ctrlKey) {
          const intensity = -e.deltaY * zoomSpeed; // positive -> zoom in
          const nextScale = Math.max(0.1, Math.min(3, scale * (1 + intensity)));
          if (typeof ref?.setTransform === 'function') {
            ref.setTransform(posX, posY, nextScale, 0);
          } else if (typeof ref?.zoomIn === 'function' || typeof ref?.zoomOut === 'function') {
            if (intensity > 0) ref?.zoomIn?.(0);
            else ref?.zoomOut?.(0);
          }
        } else {
          const dir = panInvert ? -1 : 1;
          const nextX = posX - e.deltaX * panSpeed * dir;
          const nextY = posY - e.deltaY * panSpeed * dir;
          if (typeof ref?.setTransform === 'function') {
            ref.setTransform(nextX, nextY, scale, 0);
          } else if (typeof ref?.setPositionX === 'function' && typeof ref?.setPositionY === 'function') {
            ref.setPositionX(nextX);
            ref.setPositionY(nextY);
          }
        }
      } catch {
        // noop
      }

      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('wheel', onWheel as EventListener, { passive: false, capture: true });
    return () => {
      document.removeEventListener('wheel', onWheel as EventListener, true);
    };
  }, [wheelPanEnabled, panInvert, panSpeed, zoomSpeed]);

  if (!isClient) return null;

  return (
    <>
      <TransformWrapper
        ref={wrapperRef as any}
        initialScale={1}
        minScale={0.1}
        maxScale={3}
        limitToBounds={false}
        centerOnInit={false}
        initialPositionX={-(CANVAS_ORIGIN.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0))}
        initialPositionY={-(CANVAS_ORIGIN.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0))}
        pinch={{ step: 5 }}
        wheel={{ disabled: true } as any}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: false }}
        onZoomStop={(ref) => log('onZoomStop', ref?.state?.scale)}
        onPanningStop={(ref) => log('onPanningStop', ref?.state?.positionX, ref?.state?.positionY)}
      >
        <CanvasContentWithContext
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          showGrid={true}
        />
      </TransformWrapper>

      {/* Quick Zoom controls: bottom-right + and - */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => zoomBy(0.2)}
          className="rounded-full p-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => zoomBy(-0.2)}
          className="rounded-full p-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
