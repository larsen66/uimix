"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import PixelText from "./pixel-text";
import SectionNavigation from "./section-navigation";

function ComponentCard({ component, index, onClick, isDarkMode }: { component: Component; index: number; onClick: () => void; isDarkMode: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      try {
        // Wait for video to be ready
        if (video.readyState >= 2) {
          await video.play();
        } else {
          // Wait for video to load enough data
          video.addEventListener('loadeddata', async () => {
            try {
              await video.play();
            } catch (err) {
              // Silently fail if autoplay is blocked
              console.debug('Video play failed:', err);
            }
          }, { once: true });
        }
      } catch (err) {
        // Silently fail if autoplay is blocked
        console.debug('Video play failed:', err);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      key={component.id}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up cursor-pointer",
        isDarkMode 
          ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-gray-900/50" 
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200/50"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Preview */}
      <div className={cn("aspect-video relative overflow-hidden bg-gray-900", !component.previewImage && component.preview)}>
        {/* Video - always rendered but hidden when not hovered */}
        {component.previewVideo && component.previewVideo.includes('.mp4') && (
          <video
            ref={videoRef}
            src={component.previewVideo}
            loop
            muted
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            onError={(e) => {
              console.debug('Video load error:', e);
            }}
          />
        )}
        {/* Image - always show as background */}
        {component.previewImage && (
          <Image
            src={component.previewImage}
            alt={component.title}
            fill
            className="object-cover absolute inset-0 z-0"
            unoptimized
          />
        )}
        {component.isPro && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-20">
            Pro
          </span>
        )}
      </div>
      {/* Title */}
      <div className={cn(
        "p-4 transition-colors duration-300",
        isDarkMode ? "bg-gray-800" : "bg-white"
      )}>
        <h3 className={cn(
          "font-medium transition-colors duration-300",
          isDarkMode ? "text-gray-100" : "text-gray-900"
        )}>
          <PixelText onHover>{component.title}</PixelText>
        </h3>
      </div>
    </div>
  );
}

interface Component {
  id: string;
  title: string;
  preview: string;
  previewImage?: string;
  previewVideo?: string;
  category: string;
  isPro?: boolean;
}

const components: Component[] = [
  // Hero Components
  {
    id: "hero-minimalism",
    title: "Hero Minimalism",
    preview: "bg-gradient-to-br from-slate-950 to-slate-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/hero-minimalism/default/preview.1757129422522.png",
    previewVideo: "https://cdn.21st.dev/user_2xFgBhIEcC8WVjxizPEzB14AOkb/hero-minimalism/default/video.1757129621642.mp4",
    category: "hero",
  },
  // Login & Signup Components
  {
    id: "login-card",
    title: "Login Card",
    preview: "bg-gradient-to-br from-zinc-950 to-zinc-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/login-signup/forgot-password/preview.1757131471818.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/login-signup/forgot-password/video.1757131471819.mp4",
    category: "login-signup",
  },
  // CTA Components with Text Marquee

  {
    id: "cta-vertical-marquee",
    title: "CTA with Vertical Marquee",
    preview: "bg-gradient-to-br from-blue-500 to-cyan-500",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/default/preview.1759339049804.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/default/video.1759339049804.mp4",
    category: "cta",
  },
  {
    id: "cta-vertical-marquee-left",
    title: "CTA with Vertical Marquee Left",
    preview: "bg-gradient-to-br from-indigo-600 to-purple-500",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee-left/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-vertical-marquee-left/video.1759339049805.mp4",
    category: "cta",
  },
  // Hero Components with Image Marquee (grouped together)
  {
    id: "cta-horizontal-marquee",
    title: "CTA with Horizontal Marquee",
    preview: "bg-gradient-to-br from-purple-600 to-blue-600",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/video.1759339049805.mp4",
    category: "cta",
  },
  {
    id: "hero-with-marquee-large",
    title: "CTA with Marquee Large",
    preview: "bg-gradient-to-br from-slate-900 to-slate-700",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-large/preview.1759331424507.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-large/video.1759331424507.mp4",
    category: "cta",
  },
  {
    id: "hero-with-marquee",
    title: "CTA with Marquee",
    preview: "bg-gradient-to-br from-slate-800 to-slate-600",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/default/preview.1759331424506.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/default/video.1759331424506.mp4",
    category: "cta",
  },
  {
    id: "hero-with-marquee-reverse",
    title: "CTA with Marquee Reverse",
    preview: "bg-gradient-to-br from-zinc-900 to-zinc-700",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-reverse/preview.1759331424506.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-marque-reverse/video.1759331424506.mp4",
    category: "cta",
  },
  {
    id: "hero-with-video",
    title: "CTA with Video Background",
    preview: "bg-gradient-to-br from-neutral-900 to-neutral-700",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-video/preview.1759331424507.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-marquee/cta-with-video/video.1759331424507.mp4",
    category: "cta",
  },
  // Pricing Components
  {
    id: "pricing-cards",
    title: "Pricing Cards",
    preview: "bg-gradient-to-br from-zinc-950 to-zinc-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/pricing-cards/default/preview.1757402696088.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/pricing-cards/default/video.1757402696088.mp4",
    category: "pricing",
  },
  // Processing Components
  {
    id: "processing-card",
    title: "Processing Card",
    preview: "bg-gradient-to-br from-[#000000] to-[#010133]",
    previewImage: "https://cdn.21st.dev/lyanchouss/processing-card/default/preview.1758602377997.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/processing-card/default/video.1758602377997.mp4",
    category: "processing",
  },
  // Card Components
  {
    id: "fallback-card-demo",
    title: "Fallback Card",
    preview: "bg-gradient-to-br from-[#000000] to-[#0d1a36]",
    previewImage: "https://cdn.21st.dev/lyanchouss/fallback-card/default/preview.1758602065436.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/fallback-card/default/video.1758602065436.mp4",
    category: "cards",
  },
  // Background Components
  {
    id: "background-noise",
    title: "Background with Noise",
    preview: "bg-gradient-to-br from-slate-950 to-orange-900",
    previewImage: "https://cdn.21st.dev/larsen66/background-snippets-noise-effect11/default/preview.1756797499983.png",
    previewVideo: "https://cdn.21st.dev/larsen66/background-snippets-noise-effect11/default/video.1756797499983.mp4",
    category: "backgrounds",
  },
  {
    id: "squares-background",
    title: "Squares Grid Background",
    preview: "bg-gradient-to-br from-neutral-950 to-blue-900",
    previewImage: "https://cdn.21st.dev/larsen66/noise-dark-blue-gradient-with-squares/default/preview.1756799900781.png",
    previewVideo: "https://cdn.21st.dev/larsen66/noise-dark-blue-gradient-with-squares/default/video.1756799900781.mp4",
    category: "backgrounds",
  },
  {
    id: "background-gradient-grid",
    title: "Gradient Grid Background",
    preview: "bg-gradient-to-br from-neutral-900 to-cyan-600",
    previewImage: "https://cdn.21st.dev/larsen66/background-gradient-snippet/default/preview.1756797835869.png",
    previewVideo: "https://cdn.21st.dev/larsen66/background-gradient-snippet/default/video.1756797835869.mp4",
    category: "backgrounds",
  },
  {
    id: "blueprint-gradient-mesh",
    title: "Blueprint Gradient Mesh",
    preview: "bg-gradient-to-br from-[#0d2b4d] to-[#1a4d7a]",
    previewImage: "https://cdn.21st.dev/larsen66/blueprint-gradient-mesh/default/preview.1756803128499.png",
    previewVideo: "https://cdn.21st.dev/larsen66/blueprint-gradient-mesh/default/video.1756803128499.mp4",
    category: "backgrounds",
  },
  // Features Components
  {
    id: "bento-features",
    title: "Bento Features Section",
    preview: "bg-gradient-to-br from-[#000000] to-[#010133]",
    previewImage: "https://cdn.21st.dev/larsen66/bento-features/default/preview.1759166271914.png",
    previewVideo: "https://cdn.21st.dev/larsen66/bento-features/default/video.1759166271914.mp4",
    category: "features",
  },
];

interface ComponentCatalogProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSource: "all" | "free" | "pro";
  isHeaderVisible: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  onSearchClick: () => void;
}

export default function ComponentCatalog({
  searchQuery,
  setSearchQuery,
  selectedSource,
  isHeaderVisible,
  isDarkMode,
  setIsDarkMode,
  onSearchClick,
}: ComponentCatalogProps) {
  const router = useRouter();

  const filteredComponents = components
    .filter((comp) => {
      const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource =
        selectedSource === "all" ||
        (selectedSource === "pro" && comp.isPro) ||
        (selectedSource === "free" && !comp.isPro);
      return matchesSearch && matchesSource;
    });

  const heroComponents = filteredComponents.filter((comp) => comp.category === "hero");
  const loginSignupComponents = filteredComponents.filter((comp) => comp.category === "login-signup");
  const ctaComponents = filteredComponents.filter((comp) => comp.category === "cta");
  const pricingComponents = filteredComponents.filter((comp) => comp.category === "pricing");
  const processingComponents = filteredComponents.filter((comp) => comp.category === "processing");
  const cardComponents = filteredComponents.filter((comp) => comp.category === "cards");
  const backgroundComponents = filteredComponents.filter((comp) => comp.category === "backgrounds");
  const featuresComponents = filteredComponents.filter((comp) => comp.category === "features");
  const otherComponents = filteredComponents.filter((comp) => comp.category !== "cta" && comp.category !== "hero" && comp.category !== "login-signup" && comp.category !== "pricing" && comp.category !== "processing" && comp.category !== "cards" && comp.category !== "backgrounds" && comp.category !== "features");

  // Prepare sections for navigation
  const sections = [
    heroComponents.length > 0 && { id: "hero-section", label: "Hero Sections", count: heroComponents.length },
    loginSignupComponents.length > 0 && { id: "login-signup-section", label: "Login & Signup", count: loginSignupComponents.length },
    ctaComponents.length > 0 && { id: "cta-section", label: "Call to Action", count: ctaComponents.length },
    pricingComponents.length > 0 && { id: "pricing-section", label: "Pricing", count: pricingComponents.length },
    processingComponents.length > 0 && { id: "processing-section", label: "Processing", count: processingComponents.length },
    cardComponents.length > 0 && { id: "cards-section", label: "Cards", count: cardComponents.length },
    backgroundComponents.length > 0 && { id: "backgrounds-section", label: "Backgrounds", count: backgroundComponents.length },
    featuresComponents.length > 0 && { id: "features-section", label: "Features", count: featuresComponents.length },
  ].filter(Boolean) as { id: string; label: string; count: number }[];

  return (
    <div className={cn(
      "min-h-screen w-full relative transition-colors duration-300",
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      {/* Dashed Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? '#374151' : '#e7e5e4'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? '#374151' : '#e7e5e4'} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Corner Vignette Blur - Top Left */}
      <div className={cn(
        "pointer-events-none fixed top-0 left-0 w-96 h-96 z-10 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-900/25 to-transparent"
          : "bg-gradient-to-br from-gray-50 via-gray-50/25 to-transparent"
      )} />

      {/* Corner Vignette Blur - Top Right */}
      <div className={cn(
        "pointer-events-none fixed top-0 right-0 w-96 h-96 z-10 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-bl from-gray-900 via-gray-900/25 to-transparent"
          : "bg-gradient-to-bl from-gray-50 via-gray-50/25 to-transparent"
      )} />

      {/* Corner Vignette Blur - Bottom Left */}
      <div className={cn(
        "pointer-events-none fixed bottom-0 left-0 w-96 h-96 z-10 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-tr from-gray-900 via-gray-900/25 to-transparent"
          : "bg-gradient-to-tr from-gray-50 via-gray-50/25 to-transparent"
      )} />

      {/* Corner Vignette Blur - Bottom Right */}
      <div className={cn(
        "pointer-events-none fixed bottom-0 right-0 w-96 h-96 z-10 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-tl from-gray-900 via-gray-900/25 to-transparent"
          : "bg-gradient-to-tl from-gray-50 via-gray-50/25 to-transparent"
      )} />

      {/* Section Navigation */}
      <SectionNavigation 
        sections={sections} 
        isDarkMode={isDarkMode} 
        isHeaderVisible={isHeaderVisible}
        onSearchClick={onSearchClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Top Blur Vignette */}
      <div className={cn(
        "pointer-events-none fixed top-0 left-0 right-0 h-32 z-30 transition-colors duration-300",
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-900/39 to-transparent"
          : "bg-gradient-to-b from-gray-50 via-gray-50/39 to-transparent"
      )} />
      
      {/* Bottom Blur Vignette */}
      <div 
        className={cn(
          "pointer-events-none fixed bottom-0 left-0 right-0 h-64 z-30 transition-colors duration-300",
          isDarkMode
            ? "bg-gradient-to-t from-gray-900 via-gray-900/39 to-transparent"
            : "bg-gradient-to-t from-gray-50 via-gray-50/39 to-transparent"
        )}
      />
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
              <Link href="#" className={cn(
                "text-sm font-medium px-4 py-1 rounded-full transition-colors",
                isDarkMode
                  ? "text-gray-100 bg-gray-700"
                  : "text-gray-900 bg-gray-100"
              )}>
                <PixelText onHover>Components</PixelText>
              </Link>
              <button className={cn(
                "w-8 h-8 rounded-full transition-colors flex items-center justify-center",
                isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"
              )}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className={cn(
                "w-8 h-8 rounded-full transition-colors flex items-center justify-center",
                isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"
              )}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-20 ml-32">
        
        {/* Hero Components Section */}
        {heroComponents.length > 0 && (
          <div id="hero-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Hero Sections</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {heroComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Stunning hero sections to captivate your visitors</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Login & Signup Components Section */}
        {loginSignupComponents.length > 0 && (
          <div id="login-signup-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Login & Signup</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {loginSignupComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Beautiful authentication forms with modern design</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loginSignupComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* CTA Components Section */}
        {ctaComponents.length > 0 && (
          <div id="cta-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Call to Action</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {ctaComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Conversion-focused CTA components with engaging animations</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ctaComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pricing Components Section */}
        {pricingComponents.length > 0 && (
          <div id="pricing-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Pricing</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {pricingComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Beautiful pricing sections with modern card designs</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Processing Components Section */}
        {processingComponents.length > 0 && (
          <div id="processing-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Processing & Loaders</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {processingComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Processing states, loaders, and progress indicators</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processingComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Card Components Section */}
        {cardComponents.length > 0 && (
          <div id="cards-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Cards</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {cardComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Beautiful card components with stunning effects</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Background Components Section */}
        {backgroundComponents.length > 0 && (
          <div id="backgrounds-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Backgrounds</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {backgroundComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Stunning background effects with gradients and noise</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backgroundComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Features Components Section */}
        {featuresComponents.length > 0 && (
          <div id="features-section" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Features</PixelText>
                <span className={cn(
                  "text-xs font-sans font-normal px-2 py-1 rounded transition-colors duration-300",
                  isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {featuresComponents.length}
                </span>
              </h2>
              <p className={cn(
                "cursor-pointer transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <PixelText onHover>Showcase your product features with bento-style layouts</PixelText>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Components Grid */}
        {otherComponents.length > 0 && (
          <div className="relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
              {otherComponents.map((component, index) => (
                <ComponentCard 
                  key={component.id}
                  component={component}
                  index={index}
                  onClick={() => router.push(`/component/${component.id}`)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>


          </div>
        )}
      </main>
    </div>
  );
}
