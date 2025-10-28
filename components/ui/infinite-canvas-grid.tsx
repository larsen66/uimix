"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { Masonry } from "@/components/ui/Masonry";
import { CanvasComponentModal } from "@/components/CanvasComponentModal";
import { Settings2Icon, X, ZoomInIcon, ZoomOutIcon } from 'lucide-react';

// Extend Window interface to include ResizeObserver and MutationObserver
declare global {
  interface Window {
    ResizeObserver?: typeof ResizeObserver;
    MutationObserver?: typeof MutationObserver;
  }
}

const DEBUG = false;
// Debug all video components
const debugVideo = (...args: unknown[]) => {
  if (DEBUG && typeof window !== 'undefined') console.log('[VideoDebug]', ...args);
};

// Video mapping for components that have video recordings
const componentVideoMap: Record<string, string> = {
  "FAQ Monochrome": "/videos/faq-monochrome.mov",
  "FAQ with Spiral": "/videos/faq-with-spiral.mov",
  "Hero Minimalism": "/videos/hero-minimalism.mov",
  "Hero Orbit Deck": "/videos/hero-orbit.mov",
  "Hero Dock": "/videos/dock.mp4",
  "Bento Monochrome": "/videos/monochrome-bento.mp4",
  "Processing Card": "/videos/processing_card.mov",
  "Fallback Card": "/videos/fallback-card.mov",
  "Hero ASCII 1": "/videos/heroascii1.mp4",
  "Hero ASCII 2": "/videos/heroascii2.mp4",
  "Hero By Design": "/videos/herobyd.mp4",
  "Background Blue": "/videos/bgblue.mov",
  "CTA Text Marquee": "/videos/ctatextmarque.mov",
  "CTA Marquee": "/videos/ctamarquee.mov",
  "Pricing 2": "/videos/pricing2.mov",
};

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
const FAQMonochrome = dynamic(() => import("@/registry/default/faq-monochrome"), { ssr: false, loading: () => <Skeleton /> });
const FAQWithSpiral = dynamic(() => import("@/registry/default/faq-with-spiral"), { ssr: false, loading: () => <Skeleton /> });
const HeroDock = dynamic(() => import("@/registry/default/hero-dock"), { ssr: false, loading: () => <Skeleton /> });
const MinimalHero = dynamic(() => import("@/registry/default/hero-minimalism"), { ssr: false, loading: () => <Skeleton /> });
const HeroOrbitDeck = dynamic(() => import("@/registry/default/hero-orbit-deck"), { ssr: false, loading: () => <Skeleton /> });
const FeaturesSectionMinimal = dynamic(() => import("@/registry/default/bento-monochrome-1"), { ssr: false, loading: () => <Skeleton /> });
const ProcessingCardSection = dynamic(() => import("@/registry/default/processing-card/processing-card"), { ssr: false, loading: () => <Skeleton /> });
const FallbackCardSection = dynamic(() => import("@/registry/default/fallback-card/fallback-card"), { ssr: false, loading: () => <Skeleton /> });
// Additional components used for previews matching videos
const Pricing2 = dynamic(() => import("@/registry/default/pricing-cards-2"), { ssr: false, loading: () => <Skeleton /> });
const HeroWithMarquee = dynamic(() => import("@/registry/default/cta-marquee-base"), { ssr: false, loading: () => <Skeleton /> });
const CtaHorizontalMarquee = dynamic(() => import("@/registry/default/cta-with-horizontal-marquee/cta-with-horizontal-marquee"), { ssr: false, loading: () => <Skeleton /> });
// const Frame = dynamic(() => import('react-frame-component'), { ssr: false });
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
  showOrigin: boolean;
  onComponentClose?: () => void;
}
// #endregion

// #region Constants
const CANVAS_SIZE = 6000;
const CANVAS_ORIGIN = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };

// Masonry container dimensions
const MASONRY_WIDTH = 1200;
const MASONRY_HEIGHT = 800; // Approximate height

// Center of masonry container (since it's positioned with transform: translate(-50%, -50%))
// The masonry center is exactly at CANVAS_ORIGIN due to translate(-50%, -50%)
const MASONRY_CENTER = {
  x: CANVAS_ORIGIN.x, // 3000 - absolute coordinates
  y: CANVAS_ORIGIN.y  // 3000 - absolute coordinates
};

const MIN_SCALE = 0.1;
const MAX_SCALE = 3;

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
  { name: "CTA Text Marquee", component: CtaHorizontalMarquee, description: "CTA with text marquee", tags: ["cta", "text", "marquee"], size: { width: 800, height: 600 } },
  { name: "CTA Marquee", component: HeroWithMarquee, description: "CTA marquee component", tags: ["cta", "marquee"], size: { width: 800, height: 600 } },
  { name: "Pricing 2", component: Pricing2, description: "Pricing component 2", tags: ["pricing", "cards"], size: { width: 800, height: 600 } },
];
// #endregion

// #region Components
const CanvasContentWithContext: React.FC<CanvasContentProps> = ({
  selectedComponent,
  setSelectedComponent,
  showGrid,
  showOrigin,
  onComponentClose,
}) => {

  // Video components config

  // Preserve the exact order used in content/docs/video-gallery/index.mdx
  const masonryVideoOrder = useMemo(
    () => [
      "Background Blue",
      "FAQ Monochrome",
      "FAQ with Spiral",
      "Hero Minimalism",
      "Hero Orbit Deck",
      "Processing Card",
      "Fallback Card",
      "Bento Monochrome",
      "Hero Dock",
      "CTA Marquee",
      "CTA Text Marquee",
      "Pricing 2",
      "Hero ASCII 1",
      "Hero ASCII 2",
      "Hero By Design",
    ],
    []
  );

  useEffect(() => { }, [showGrid, showOrigin]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-black transition-all duration-300 ${selectedComponent ? 'backdrop-blur-md' : ''
        }`}
      style={{ overflow: 'hidden', margin: 0, padding: 0 } as React.CSSProperties}
    >
      {/* Hide canvas content when modal is open */}
      {selectedComponent === null && (
        <>
          {showGrid && (
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          )}

          <TransformComponent
            wrapperClass="absolute inset-0"
            contentClass="relative"
          >
            <div className="relative" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
              {/* Canvas origin marker */}
              {showOrigin && (
                <div
                  style={{
                    position: 'absolute',
                    left: CANVAS_ORIGIN.x - 6,
                    top: CANVAS_ORIGIN.y - 6,
                    width: 12,
                    height: 12,
                    borderRadius: 9999,
                    background: 'rgba(255,0,0,0.8)',
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.4)'
                  }}
                />
              )}
              {/* Video Masonry inside the canvas */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: CANVAS_ORIGIN.x,
                  top: CANVAS_ORIGIN.y,
                  transform: 'translate(-50%, -50%)',
                  width: '1200px',
                  zIndex: 100,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 100
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.4, 0.0, 0.2, 1],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <Masonry
                  className="w-full"
                  columnsClassName="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
                  gapClassName="gap-4"
                >
                  {masonryVideoOrder.map((name, i) => {
                    const item = componentRegistry.find((c) => c.name === name);
                    const videoSrc = componentVideoMap[name];
                    if (!videoSrc) return null;

                    const Preview = item?.component as React.ComponentType | undefined;
                    debugVideo(`🎬 ${name} | Video: ${videoSrc} | Preview: ${Preview ? 'yes' : 'no'}`);

                    return (
                      <motion.div
                        key={`${name}-${i}`}
                        role={Preview ? 'button' : undefined}
                        aria-label={Preview ? `Open preview of ${name}` : undefined}
                        onClick={() => {
                          if (Preview && item) {
                            console.log(`Masonry item ${i} clicked: ${name}`);
                            setSelectedComponent({ component: Preview, name, description: item.description });
                          }
                        }}
                        style={{
                          width: '100%',
                          borderRadius: '12px',
                          position: 'relative',
                          overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.12)'
                        }}
                        initial={{
                          opacity: 0,
                          scale: 0.3,
                          y: 50
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0
                        }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1, // Staggered animation
                          ease: [0.4, 0.0, 0.2, 1],
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{
                          scale: 0.95,
                          transition: { duration: 0.1 }
                        }}
                      >
                        {/* Title badge removed per request */}
                        <video
                          src={videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                          onError={(e) => {
                            console.log('Video error for:', name);
                            (e.target as HTMLVideoElement).style.display = 'none';
                          }}
                          onLoadedData={() => console.log(`Video loaded: ${name}`)}
                        />
                      </motion.div>
                    );
                  })}
                </Masonry>
              </motion.div>
            </div>
          </TransformComponent>
        </>
      )}

      <AnimatePresence mode="wait">
        {selectedComponent && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CanvasComponentModal
              component={selectedComponent.component}
              componentName={selectedComponent.name}
              description={selectedComponent.description}
              scale={0.7}
              onClose={() => {
                // Закрываем компонент
                setSelectedComponent(null);

                // Вызываем функцию центрирования если она передана
                if (onComponentClose) {
                  setTimeout(() => {
                    onComponentClose();
                  }, 200);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InfiniteCanvasGrid: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<{ component: React.ComponentType; name: string; description: string; } | null>(null);
  const wrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  // No custom gesture state; use built-in gestures from react-zoom-pan-pinch

  // Manual camera position control
  const [cameraPosition, setCameraPosition] = useState({
    x: 3500, // Optimized position for masonry center
    y: 3380
  });
  const [showControlPanel, setShowControlPanel] = useState(false);

  // Helper function for focal zoom to a specific world point
  const focalZoom = useCallback((target: { x: number; y: number }, nextScale: number, duration = 0) => {
    const ref = wrapperRef.current;
    if (!ref || !ref.setTransform || typeof window === 'undefined') return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Use manual camera position if available, otherwise use target
    const focalPoint = target || cameraPosition;

    // Position the world point target at screen center
    const newPosX = cx - focalPoint.x * nextScale;
    const newPosY = cy - focalPoint.y * nextScale;

    console.log('focalZoom called:', {
      target,
      focalPoint,
      cameraPosition,
      nextScale,
      duration,
      screenCenter: { x: cx, y: cy },
      calculatedPosition: { x: newPosX, y: newPosY },
      calculation: {
        targetScaledX: focalPoint.x * nextScale,
        targetScaledY: focalPoint.y * nextScale,
        offsetX: cx - focalPoint.x * nextScale,
        offsetY: cy - focalPoint.y * nextScale
      },
      debug: {
        canvasOrigin: CANVAS_ORIGIN,
        masonryCenter: MASONRY_CENTER,
        masonryDimensions: { width: MASONRY_WIDTH, height: MASONRY_HEIGHT }
      }
    });

    try { ref.setTransform(newPosX, newPosY, nextScale, duration); }
    catch { try { ref.setTransform(newPosX, newPosY, nextScale); } catch { } }
  }, [cameraPosition]);


  useEffect(() => { }, []);

  // Отслеживаем взаимодействие пользователя
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
    };

    const events = ['mousedown', 'mousemove', 'wheel', 'touchstart', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Auto zoom on page load
  useEffect(() => {
    if (hasUserInteracted) return;

    const run = async () => {
      if (typeof window === 'undefined') return;
      await new Promise(r => setTimeout(r, 500)); // Let it render

      const state = getTZPState();
      const startScale = state.scale ?? 1;
      const ZOOM = Math.pow(1.1, 7);
      const endScale = Math.min(MAX_SCALE, startScale * ZOOM);

      focalZoom(cameraPosition, endScale, 1000);
    };

    run();
  }, [hasUserInteracted, cameraPosition, focalZoom]);

  // Функция для центрирования камеры при закрытии компонента
  const centerCameraOnClose = useCallback(() => {
    if (typeof window === 'undefined') return;
    // Используем точно ту же логику что и в centerOnce, но с анимацией
    const wx = window.innerWidth;
    const wy = window.innerHeight;
    const scaleX = wx / MASONRY_WIDTH;
    const scaleY = wy / MASONRY_HEIGHT;
    const s = Math.min(scaleX, scaleY, 1.125);

    // Центрируем с анимацией (вместо duration: 0 как в centerOnce)
    focalZoom(cameraPosition, s, 800);
  }, [cameraPosition, focalZoom]);

  // Helper function to safely get transform state from different library versions
  const getTZPState = (): { scale?: number; positionX?: number; positionY?: number } => {
    const ref = wrapperRef.current as unknown as {
      state?: { scale?: number; positionX?: number; positionY?: number };
      instance?: { transformState?: { scale?: number; positionX?: number; positionY?: number } };
      getTransformState?: () => { scale?: number; positionX?: number; positionY?: number }
    } | null;
    // разные версии lib: state / instance.transformState / getTransformState()
    const s1 = ref?.getTransformState?.();
    const s2 = ref?.instance?.transformState;
    const s3 = ref?.state;
    return s1 ?? s2 ?? s3 ?? {};
  };

  // Center camera to fill screen initially
  useEffect(() => {
    if (selectedComponent) return;

    const centerOnce = () => {
      if (typeof window === 'undefined') return;
      // Calculate scale to fit masonry entirely
      const wx = window.innerWidth;
      const wy = window.innerHeight;
      const scaleX = wx / MASONRY_WIDTH;
      const scaleY = wy / MASONRY_HEIGHT;
      const s = Math.min(scaleX, scaleY, 1.125);

      // Hard center the world point using camera position
      focalZoom(cameraPosition, s, 0);
    };
    // Wait for frame to render everything
    const id = window.requestAnimationFrame(centerOnce);
    window.addEventListener('resize', centerOnce);
    // Trackpad two-finger scroll = панорамирование (wheel -> translate).
    // Pinch-to-zoom (ctrlKey=true) игнорируем — масштаб только кнопками.
    const el = outerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        const ref = wrapperRef.current;
        if (!ref || !ref.setTransform) return;

        // pinch gesture — не панорамы
        if (e.ctrlKey) return;

        // Intercept default scroll
        e.preventDefault();
        e.stopPropagation();

        const state = getTZPState();
        const s = state.scale ?? 1.125;
        const posX = state.positionX ?? 0;
        const posY = state.positionY ?? 0;

        const modeFactor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 120 : 1; // line/page→px
        const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
        // «натуральный» скролл на маках уже инвертирован, используем -delta*
        const dx = clamp(-e.deltaX * modeFactor, -80, 80);
        const dy = clamp(-e.deltaY * modeFactor, -80, 80);

        const nextX = posX + dx;
        const nextY = posY + dy;

        try { ref.setTransform(nextX, nextY, s, 0); }
        catch { try { ref.setTransform(nextX, nextY, s); } catch { } }
      };
      el.addEventListener('wheel', onWheel as EventListener, { passive: false } as AddEventListenerOptions);
      return () => {
        window.cancelAnimationFrame(id);
        window.removeEventListener('resize', centerOnce);
        el.removeEventListener('wheel', onWheel as EventListener);
      };
    }
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener('resize', centerOnce);
    };
  }, [selectedComponent, cameraPosition, focalZoom]);

  // Masonry version does not use DnD; components are rendered in a responsive grid.

  return (
    <motion.div
      ref={outerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: {
          duration: 1.2,
          ease: "easeOut"
        }
      }}
      style={{
        touchAction: 'none',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        cursor: 'grab',
        overscrollBehavior: 'none',
        overscrollBehaviorX: 'none',
        overscrollBehaviorY: 'none'
      }}
    >
      <TransformWrapper
        ref={wrapperRef}
        initialScale={1}
        minScale={MIN_SCALE}
        maxScale={MAX_SCALE}
        limitToBounds={false}
        centerOnInit={false}
        initialPositionX={0}
        initialPositionY={0}
        pinch={{ disabled: true }}   // <-- свой pinch на wheel+ctrlKey
        wheel={{ disabled: true }}   // <-- свой wheel-обработчик
        doubleClick={{ disabled: true }}
        panning={{
          disabled: !!selectedComponent,  // Отключаем panning когда открыт компонент
          velocityDisabled: false
        }}
      >
        <CanvasContentWithContext
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          showGrid={false}
          showOrigin={false}
          onComponentClose={centerCameraOnClose}
        />
      </TransformWrapper>

      {/* Control Panel Toggle */}
      {!selectedComponent && (
        <div className="fixed bg-white/10 backdrop-blur-md  top-4 right-4 z-[50] flex gap-4 border border-white/20 shadow-2xs py-2 px-2 rounded-full">
          <Button
            variant="outline"
            className="h-9 rounded-full border-white/20 cursor-pointer text-fd-muted-foreground hover:text-white bg-black/40 hover:bg-white/10"
            onClick={() => setShowControlPanel(!showControlPanel)}
            aria-label={showControlPanel ? "Hide controls" : "Show controls"}
            aria-expanded={showControlPanel}
            aria-controls="canvas-controls-panel"
          >
            {showControlPanel ? (
              <X />
            ) : (<Settings2Icon />)}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 w-9 rounded-full border-white/20 cursor-pointer text-fd-muted-foreground hover:text-white bg-black/40 hover:bg-white/10"
              aria-label="Zoom out"
              onClick={() => {
                const s = getTZPState().scale ?? 1;
                focalZoom(cameraPosition, Math.max(MIN_SCALE, s * 0.9), 0);
              }}
            >
              <ZoomOutIcon />
            </Button>
            <Button
              variant="outline"
              className="h-9 w-9 rounded-full border-white/20 cursor-pointer text-fd-muted-foreground hover:text-white bg-black/40 hover:bg-white/10"
              aria-label="Zoom in"
              onClick={() => {
                const s = getTZPState().scale ?? 1;
                focalZoom(cameraPosition, Math.min(MAX_SCALE, s * 1.1), 0);
              }}
            >
              <ZoomInIcon />
            </Button>
          </div>

        </div>
      )
      }


      {/* Control Panel */}
      {
        !selectedComponent && showControlPanel && (
          <div id="canvas-controls-panel" className="fixed top-16 right-4 z-[50] bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[300px]">

            <div className="space-y-4">
              <div>
                <label className="text-white text-xs block mb-1">X Position: {cameraPosition.x}</label>
                <input
                  type="range"
                  min="0"
                  max={CANVAS_SIZE}
                  value={cameraPosition.x}
                  onChange={(e) => setCameraPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-white text-xs block mb-1">Y Position: {cameraPosition.y}</label>
                <input
                  type="range"
                  min="0"
                  max={CANVAS_SIZE}
                  value={cameraPosition.y}
                  onChange={(e) => setCameraPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-white border-white/20 bg-black/40 hover:bg-white/10"
                  onClick={() => {
                    setCameraPosition({ x: 3500, y: 3380 });
                    focalZoom(cameraPosition, getTZPState().scale ?? 1, 0);
                  }}
                >
                  Reset to Center
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-white border-white/20 bg-black/40 hover:bg-white/10"
                  onClick={() => {
                    focalZoom(cameraPosition, getTZPState().scale ?? 1, 0);
                  }}
                >
                  Apply Position
                </Button>
              </div>
            </div>
          </div>
        )
      }

    </motion.div >
  );
};
