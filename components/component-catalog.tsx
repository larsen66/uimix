"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Search, ArrowUpDown, Code, X, Moon, Sun } from "lucide-react";
import PixelText from "./pixel-text";

function ComponentCard({ component, index, onClick }: { component: Component; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={component.id}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up cursor-pointer"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Preview */}
      <div className={cn("aspect-video relative overflow-hidden", !component.previewImage && component.preview)}>
        {/* Image - always show */}
        {component.previewImage && (
          <Image
            src={component.previewImage}
            alt={component.title}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              isHovered && component.previewVideo && component.previewVideo.includes('.mp4') ? "opacity-0" : "opacity-100"
            )}
            unoptimized
          />
        )}
        {/* Video - show on hover (only if it's actually a video file) */}
        {component.previewVideo && component.previewVideo.includes('.mp4') && isHovered && (
          <video
            src={component.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {component.isPro && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-10">
            Pro
          </span>
        )}
      </div>
      {/* Title */}
      <div className="p-4 bg-white">
        <h3 className="font-medium text-gray-900">
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
  {
    id: "cta-horizontal-marquee",
    title: "CTA with Horizontal Marquee",
    preview: "bg-gradient-to-br from-purple-600 to-blue-600",
    previewImage: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/preview.1759339049805.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/cta-with-text-marquee/cta-with-horizontal-marquee/video.1759339049805.mp4",
    category: "cta",
  },
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
];

export default function ComponentCatalog() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedSource, setSelectedSource] = useState<"all" | "free" | "pro">("all");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
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

  const filteredComponents = components
    .filter((comp) => {
      const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource =
        selectedSource === "all" ||
        (selectedSource === "pro" && comp.isPro) ||
        (selectedSource === "free" && !comp.isPro);
      return matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

  const ctaComponents = filteredComponents.filter((comp) => comp.category === "cta");
  const otherComponents = filteredComponents.filter((comp) => comp.category !== "cta");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSource("all");
    setSortOrder("asc");
  };

  return (
    <div className={cn(
      "min-h-screen relative transition-colors duration-300",
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* CTA Components Section */}
        {ctaComponents.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <PixelText interval={5000}>Call to Action</PixelText>
                <span className="text-xs font-sans font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {ctaComponents.length}
                </span>
              </h2>
              <p className="text-gray-500 cursor-pointer">
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
                />
              ))}
            </div>


          </div>
        )}

        {/* Search and Filters Bar */}
        <div className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300",
          isHeaderVisible ? "translate-y-0" : "translate-y-[200%]"
        )}>
          <div className="bg-white/90 border border-gray-300 rounded-xl shadow-2xl shadow-gray-400/20 px-4 py-3 flex items-center gap-3 backdrop-blur-xl">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-lg min-w-[200px]">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder:text-gray-500"
              />
            </div>

            {/* Sort */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-sm font-medium">Sort</span>
            </button>

            {/* Source */}
            <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-gray-900">
              <Code className="w-4 h-4" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value as "all" | "free" | "pro")}
                className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer text-gray-900"
              >
                <option value="all">Source</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">Clear Filters</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
