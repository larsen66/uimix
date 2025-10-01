"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Maximize2, Code2, Copy, Check, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelText from "@/components/pixel-text";
import ComponentPreview from "@/components/component-preview";

interface ComponentData {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: string;
  previewImage?: string;
  previewVideo?: string;
  isPro?: boolean;
  code: string;
  installCommand?: string;
  dependencies?: string[];
}

const componentsData: Record<string, ComponentData> = {
  "cta-horizontal-marquee": {
    id: "cta-horizontal-marquee",
    title: "CTA with Horizontal Marquee",
    description: "A conversion-focused CTA component with horizontal scrolling text marquee. Features fade-in animations and engaging call-to-action buttons.",
    category: "CTA",
    preview: "bg-gradient-to-br from-purple-600 to-blue-600",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/video.1759339049805.mp4",
    code: `// Full source code available in: 
// /components/cta-with-horizontal-marquee.tsx

// Key features:
// - Horizontal scrolling marquee animation
// - Dynamic opacity fade effect from center
// - Responsive CTA section with animations
// - Customizable speed and content

// View the component file for complete implementation`,
    dependencies: ["react"],
  },
  "cta-vertical-marquee": {
    id: "cta-vertical-marquee",
    title: "CTA with Vertical Marquee",
    description: "A conversion-focused CTA component with vertical scrolling text marquee on the right side. Features parallax effects and engaging animations.",
    category: "CTA",
    preview: "bg-gradient-to-br from-blue-500 to-cyan-500",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee/video.1759339049805.mp4",
    code: `// See the component file for full implementation
import CTAWithVerticalMarquee from '@/components/cta-with-vertical-marquee';

export default function Page() {
  return <CTAWithVerticalMarquee />;
}`,
    dependencies: ["react"],
  },
  "cta-vertical-marquee-left": {
    id: "cta-vertical-marquee-left",
    title: "CTA with Vertical Marquee Left",
    description: "A conversion-focused CTA component with vertical scrolling text marquee on the left side. Mirror version with engaging animations.",
    category: "CTA",
    preview: "bg-gradient-to-br from-indigo-600 to-purple-500",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee-left/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee-left/video.1759339049805.mp4",
    code: `// See the component file for full implementation
import CTAWithVerticalMarqueeLeft from '@/components/cta-with-vertical-marquee-left';

export default function Page() {
  return <CTAWithVerticalMarqueeLeft />;
}`,
    dependencies: ["react"],
  },
};

export default function ComponentPageClient({ id }: { id: string }) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [realCode, setRealCode] = useState<string>("");
  const [loadingCode, setLoadingCode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const component = componentsData[id] || componentsData["cta-horizontal-marquee"];
  const hasComponent = !!componentsData[id];

  // Load real component code from API
  useEffect(() => {
    if (showCode && !realCode && !loadingCode) {
      setLoadingCode(true);
      fetch(`/api/component-code?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setRealCode(data.code);
          }
        })
        .catch(err => console.error('Failed to load component code:', err))
        .finally(() => setLoadingCode(false));
    }
  }, [showCode, id, realCode, loadingCode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      
      scrollTimer.current = setTimeout(() => {
        setIsHeaderVisible(true);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const codeToCopy = realCode || component.code;
    await navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "min-h-screen relative transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Top Blur Vignette */}
      <div className={cn(
        "pointer-events-none fixed top-0 left-0 right-0 h-32 z-30 transition-colors duration-300",
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 via-gray-900/60 to-transparent"
          : "bg-gradient-to-b from-gray-50 via-gray-50/60 to-transparent"
      )} />
      
      {/* Bottom Blur Vignette */}
      <div className={cn(
        "pointer-events-none fixed bottom-0 left-0 right-0 h-64 z-30 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"
          : "bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent"
      )} />
      
      {/* Header */}
      <header className={cn(
        "px-6 py-4 sticky top-0 z-40 transition-transform duration-300",
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Floating */}
          <div className={cn(
            "backdrop-blur-sm border rounded-xl px-4 py-2 shadow-sm transition-colors duration-300",
            isDarkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"
          )}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/")}
                className={cn(
                  "w-8 h-8 rounded-lg transition-colors flex items-center justify-center",
                  isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"
                )}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Image 
                  src={isDarkMode ? "/logo-dark.png" : "/logo.png"}
                  alt="MIX-UI Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-lg object-contain"
                />
                <span className={cn(
                  "font-logo text-sm transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>uimix</span>
              </div>
            </div>
          </div>

          {/* Right Side - Floating */}
          <div className={cn(
            "backdrop-blur-sm border rounded-xl shadow-sm transition-colors duration-300",
            isDarkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"
          )}>
            <nav className="flex items-center gap-2 px-2 py-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={cn(
                  "w-8 h-8 rounded-lg transition-colors flex items-center justify-center",
                  isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"
                )}
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="#" className={cn(
                "text-sm transition-colors px-4 py-1 rounded-full",
                isDarkMode 
                  ? "text-gray-400 hover:text-gray-100 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}>
                <PixelText onHover>Pricing</PixelText>
              </Link>
              <Link href="/" className={cn(
                "text-sm font-medium px-4 py-1 rounded-full transition-colors",
                isDarkMode
                  ? "text-gray-100 bg-gray-700"
                  : "text-gray-900 bg-gray-100"
              )}>
                <PixelText onHover>Components</PixelText>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          {/* Left Panel - Info */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className={cn(
                  "text-2xl font-bold cursor-pointer transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>
                  <PixelText interval={5000}>{component.title}</PixelText>
                </h1>
                {component.isPro && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-sans font-medium">
                    Pro
                  </span>
                )}
              </div>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                <PixelText onHover>{component.description}</PixelText>
              </p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Category:</span>
                <span className={cn(
                  "font-medium px-3 py-1 rounded-full transition-colors duration-300",
                  isDarkMode ? "text-gray-100 bg-gray-700" : "text-gray-900 bg-gray-100"
                )}>
                  {component.category}
                </span>
              </div>
              {component.dependencies && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Dependencies:</span>
                  <span className={cn(
                    "font-medium transition-colors duration-300",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{component.dependencies.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="relative">
              <div
                className={cn(
                  "rounded-2xl overflow-hidden transition-all duration-300 relative",
                  isFullscreen
                    ? "fixed inset-4 z-50 shadow-2xl bg-gray-50"
                    : "bg-gray-50 border border-gray-200"
                )}
              >
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white flex items-center justify-center transition-all hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {hasComponent ? (
                  <div className={cn(
                    "w-full overflow-hidden",
                    isFullscreen ? "h-full" : "h-[700px]"
                  )}>
                    <ComponentPreview componentId={id} isDarkMode={isDarkMode} />
                  </div>
                ) : (
                  <div className={cn("w-full h-full aspect-video flex items-center justify-center border border-gray-200", component.preview)}>
                    <div className="text-white text-lg font-medium">Component Preview</div>
                  </div>
                )}
              </div>
            </div>

            {/* Installation */}
            {component.installCommand && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Installation</h3>
                <code className="block bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-mono">
                  {component.installCommand}
                </code>
              </div>
            )}
          </div>

          {/* Right Panel - Controls */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className={cn(
              "rounded-xl border p-4 space-y-3 min-w-[200px] transition-colors duration-300",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                  isDarkMode 
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Maximize2 className="w-5 h-5" />
                <span className="font-medium">Fullscreen</span>
              </button>
              <button
                onClick={() => setShowCode(!showCode)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                  showCode
                    ? (isDarkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white")
                    : (isDarkMode 
                        ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50")
                )}
              >
                <Code2 className="w-5 h-5" />
                <span className="font-medium">Show Code</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Code Panel Backdrop */}
      {showCode && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowCode(false)}
        />
      )}

      {/* Code Panel - Slides from Bottom */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-2xl transition-all duration-500 ease-out z-50",
          showCode ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
        style={{ height: "60vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Code Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Component Code</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">Copy Code</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowCode(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            {loadingCode ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading component code...</div>
              </div>
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                <code className="text-sm font-mono">{realCode || component.code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
}
