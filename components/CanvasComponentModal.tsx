"use client";

/*
Стильная анимация загрузки компонента:

1. Пользователь кликает на элемент в masonry
2. Открывается модальное окно с анимацией появления
   ↓ (opacity: 0 → 1, scale: 0.95 → 1)
3. Показывается стильный загрузчик из processing-card:
   - CustomLoader с 4 анимированными точками
   - Голубое свечение (#78b4ff)
   - Плавные cubic-bezier анимации
   - Текст "Loading..."
   ↓ (500ms короткая задержка)
4. Анимация загрузки исчезает
   ↓ (opacity: 1 → 0)
5. Контент компонента появляется
   ↓ (opacity: 0 → 1, scale: 0.95 → 1)
6. При закрытии компонента камера автоматически центрируется
   ↓ (используется та же логика что и при открытии страницы)

Общее время анимации: ~0.5 секунды
*/

import { ComponentPreview } from './ComponentPreview';
import { ComponentCode } from './ComponentCode';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { X, Code } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CanvasComponentModalProps {
  component: React.ComponentType;
  componentName: string;
  description: string;
  scale?: number;
  onClose: () => void;
}

export const CanvasComponentModal = ({ 
  component,
  componentName,
  description,
  scale = 0.7,
  onClose
}: CanvasComponentModalProps) => {
  const [code, setCode] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Получаем путь к компоненту на основе его имени
  const getComponentPath = (name: string): string => {
    const nameMap: Record<string, string> = {
      'Hero Dock': 'registry/default/hero-dock.tsx',
      'Hero Minimalism': 'registry/default/hero-minimalism.tsx',
      'Hero Monochrome Launch': 'registry/default/hero-monochrome-launch.tsx',
      'Hero Orbit Deck': 'registry/default/hero-orbit-deck.tsx',
      'Bento Features': 'registry/default/bento-features.tsx',
      'Bento Monochrome': 'registry/default/bento-monochrome.tsx',
      'Bento Workflow Section': 'registry/default/bento-monochrome-1.tsx',
      'CTA Marquee Base': 'registry/default/cta-marquee-base.tsx',
      'CTA Marquee Large': 'registry/default/cta-marquee-large.tsx',
      'CTA Marquee Reverse': 'registry/default/cta-marquee-reverse.tsx',
      'CTA with Video': 'registry/default/cta-with-video.tsx',
      'Horizontal Marquee': 'registry/default/cta-with-horizontal-marquee/cta-with-horizontal-marquee.tsx',
      'Vertical Marquee CTA': 'registry/default/cta-vertical-marquee/cta-vertical-marquee.tsx',
      'Vertical Marquee (Left Layout)': 'registry/default/cta-with-vertical-marquee-left/cta-with-vertical-marquee-left.tsx',
      'FAQ Monochrome': 'registry/default/faq-monochrome.tsx',
      'FAQ with Spiral': 'registry/default/faq-with-spiral.tsx',
      'Login Card': 'registry/default/login-card.tsx',
      'Pricing Cards': 'registry/default/pricing-cards.tsx',
      'Pricing Cards (Variation)': 'registry/default/pricing-cards-1.tsx',
      'Processing Card': 'registry/default/processing-card/processing-card.tsx',
      'Fallback Card': 'registry/default/fallback-card/fallback-card.tsx',
    };
    
    return nameMap[name] || `registry/default/${name.toLowerCase().replace(/\s+/g, '-')}.tsx`;
  };

  const componentPath = getComponentPath(componentName);

  // Загружаем код компонента
  useEffect(() => {
    let mounted = true;
    fetch(`/api/code?path=${encodeURIComponent(componentPath)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        const data = await r.json();
        if (mounted) setCode(data.code ?? '');
      })
      .catch((e) => mounted && setErr(String(e)));
    return () => { mounted = false; };
  }, [componentPath]);

  // Простая логика загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Короткая задержка для плавности

    return () => clearTimeout(timer);
  }, []);

  // Стили для CustomLoader (из processing-card)
  const loaderStyle = `
    .custom-loader-5{height:32px;width:32px;position:relative;animation:loader-5-1 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
    @keyframes loader-5-1{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    .custom-loader-5::before,.custom-loader-5::after,.custom-loader-5 span::before,.custom-loader-5 span::after{
    content:"";display:block;position:absolute;margin:auto;background:#78b4ff;border-radius:50%}
    .custom-loader-5::before{top:0;left:0;bottom:0;right:auto;width:8px;height:8px;animation:loader-5-2 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
    @keyframes loader-5-2{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(24px,0,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
    .custom-loader-5::after{top:0;left:auto;bottom:0;right:0;width:8px;height:8px;animation:loader-5-3 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
    @keyframes loader-5-3{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(-24px,0,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
    .custom-loader-5 span{display:block;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;height:32px;width:32px}
    .custom-loader-5 span::before{top:0;left:0;bottom:auto;right:0;width:8px;height:8px;animation:loader-5-4 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
    @keyframes loader-5-4{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(0,24px,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
    .custom-loader-5 span::after{top:auto;left:0;bottom:0;right:0;width:8px;height:8px;animation:loader-5-5 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
    @keyframes loader-5-5{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(0,-24px,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}`;

  // Добавляем стили в head если их еще нет
  React.useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('modal-loader-style')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'modal-loader-style';
      styleTag.innerHTML = loaderStyle;
      document.head.appendChild(styleTag);
    }
  }, []);

  // CustomLoader компонент (из processing-card)
  const CustomLoader: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
    className,
    size = 'md'
  }) => <div className={`custom-loader-5 size-${size} ${className || ''}`}><span /></div>;

  // Стильный компонент анимации загрузки
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Стильный загрузчик из processing-card */}
      <div className="w-12 h-12 drop-shadow-[0_0_12px_rgba(120,180,255,0.4)]">
        <CustomLoader size="md" />
      </div>
      
      {/* Текст загрузки */}
      <div className="text-white/70 text-sm font-medium">
        Loading...
      </div>
    </div>
  );

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full">
        {/* Анимация загрузки */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="absolute inset-0 flex items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="group fixed top-6 right-6 z-20 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
                aria-label="Close modal"
                title="Close modal"
              >
                <X className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-90" />
              </button>

              {/* Show Code button */}
              <button
                onClick={() => setShowCode(!showCode)}
                className={`group fixed top-6 left-6 z-20 p-3 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${
                  showCode ? 'bg-primary/20 border-primary/30' : ''
                }`}
                aria-label={showCode ? "Hide code" : "Show code"}
                title={showCode ? "Hide code" : "Show code"}
              >
                <Code className={`h-4 w-4 transition-all duration-300 ease-out group-hover:scale-110 ${
                  showCode ? 'text-primary' : ''
                }`} />
              </button>

        {/* Modal content - fullscreen */}
        <div className="w-full h-full bg-background overflow-hidden">
          <div className={`flex h-full transition-all duration-500 ease-out ${
            showCode ? 'flex-row' : 'flex-col justify-center items-center'
          }`}>
            {/* Left side - Code and Installation (animated) */}
            <div 
              className={`overflow-y-auto space-y-6 border-r border-border transition-all duration-500 ease-out ${
                showCode 
                  ? 'w-1/2 p-6 opacity-100 translate-x-0' 
                  : 'w-0 p-0 opacity-0 -translate-x-full overflow-hidden'
              }`}
              style={{
                willChange: 'transform, width, opacity',
                transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
              }}
            >
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{componentName}</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>

              {/* Installation Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Installation</h3>
                
                {/* CLI Installation */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">CLI Installation</h4>
                  <DynamicCodeBlock
                    lang="bash"
                    code={`npx shadcn@latest add @uimix/${componentName.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
                
                {/* Manual Installation */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Manual Installation</h4>
                  <p className="text-sm text-muted-foreground">Copy and paste the following code:</p>
                </div>
              </div>

              {/* Code Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Component Code</h4>
                {err ? (
                  <div className="text-destructive">Could not load component source: {err}</div>
                ) : !code ? (
                  <div className="text-muted-foreground">Loading source…</div>
                ) : (
                  <ComponentCode componentPath={componentPath} />
                )}
              </div>
            </div>

            {/* Right side - Preview */}
            <div 
              className={`transition-all duration-500 ease-out ${
                showCode 
                  ? 'w-1/2 p-6 overflow-y-auto' 
                  : 'w-full h-full flex items-center justify-center p-0'
              }`}
              style={{
                willChange: 'transform, width',
                transform: 'translateZ(0)', // Force hardware acceleration
              }}
            >
              {!showCode ? (
                // Fullscreen mode - centered component at full size
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  {/* Component title - positioned absolutely to not affect centering */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
                    <h3 className="text-lg font-semibold text-center">{componentName}</h3>
                  </div>
                  
                  {/* Centered component */}
                  <div className="flex items-center justify-center w-full h-full">
                    <ComponentPreview 
                      component={component} 
                      scale={1} 
                      hideFullscreen 
                    />
                  </div>
                </div>
              ) : (
                // Code mode - side by side
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <div className="relative">
                    <ComponentPreview 
                      component={component} 
                      scale={scale} 
                      hideFullscreen 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
