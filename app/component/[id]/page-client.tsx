"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Maximize2, Code2, Copy, Check, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelText from "@/components/pixel-text";
import ComponentPreview from "@/components/component-preview";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  "hero-minimalism": {
    id: "hero-minimalism",
    title: "Hero Minimalism",
    description: "A stunning minimalist hero section with animated particle effects and elegant line animations. Features a clean, modern design with smooth fade-in effects and responsive layout.",
    category: "Hero",
    preview: "bg-gradient-to-br from-slate-950 to-slate-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/hero-minimalism/default/preview.1757129422522.png",
    previewVideo: "https://cdn.21st.dev/user_2xFgBhIEcC8WVjxizPEzB14AOkb/hero-minimalism/default/video.1757129621642.mp4",
    code: `// See the component file for full implementation
import HeroMinimalism from '@/components/catalog/hero/hero-minimalism';

export default function Page() {
  return <HeroMinimalism />;
}`,
    dependencies: ["react"],
  },
  "login-card": {
    id: "login-card",
    title: "Login Card",
    description: "A beautiful login form with animated particles, elegant line animations, and shadcn/ui components. Features email/password inputs, remember me checkbox, social login buttons, and smooth fade-in animations.",
    category: "Login & Signup",
    preview: "bg-gradient-to-br from-zinc-950 to-zinc-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/login-signup/forgot-password/preview.1757131471818.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/login-signup/forgot-password/video.1757131471819.mp4",
    code: `// See the component file for full implementation
import LoginCard from '@/components/catalog/login-signup/login-card';

export default function Page() {
  return <LoginCard />;
}`,
    dependencies: ["react", "@/components/ui/card", "@/components/ui/input", "@/components/ui/label", "@/components/ui/button", "@/components/ui/checkbox", "@/components/ui/separator", "lucide-react"],
    installCommand: "npx shadcn@latest add card input label button checkbox separator",
  },
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
import CTAWithVerticalMarquee from '@/components/catalog/cta/cta-with-vertical-marquee';

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
import CTAWithVerticalMarqueeLeft from '@/components/catalog/cta/cta-with-vertical-marquee-left';

export default function Page() {
  return <CTAWithVerticalMarqueeLeft />;
}`,
    dependencies: ["react"],
  },
  "hero-with-marquee-large": {
    id: "hero-with-marquee-large",
    title: "CTA with Marquee Large",
    description: "A full-width CTA section with large-scale image marquees. Features edge-to-edge design with smooth horizontal scrolling animations.",
    category: "CTA",
    preview: "bg-gradient-to-br from-slate-900 to-slate-700",
    previewImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=700&h=700&fit=crop",
    code: `// See the component file for full implementation
import HeroWithMarqueeLarge from '@/components/catalog/cta/hero-with-marquee-large';

export default function Page() {
  return <HeroWithMarqueeLarge />;
}`,
    dependencies: ["react", "next/image"],
  },
  "hero-with-marquee": {
    id: "hero-with-marquee",
    title: "CTA with Marquee",
    description: "A stunning CTA section featuring horizontal image marquees with rounded corners. Includes scramble button effect and elegant typography.",
    category: "CTA",
    preview: "bg-gradient-to-br from-slate-800 to-slate-600",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&h=700&fit=crop",
    code: `// See the component file for full implementation
import HeroWithMarquee from '@/components/catalog/cta/hero-with-marquee';

export default function Page() {
  return <HeroWithMarquee />;
}`,
    dependencies: ["react", "next/image"],
  },
  "hero-with-marquee-mixed-font": {
    id: "hero-with-marquee-mixed-font",
    title: "CTA with Marquee Mixed Font",
    description: "An innovative CTA section with dynamic mixed font animation in the title. Text characters randomly switch between serif and sans-serif styles.",
    category: "CTA",
    preview: "bg-gradient-to-br from-gray-900 to-gray-700",
    previewImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=700&h=700&fit=crop",
    code: `// See the component file for full implementation
import HeroWithMarqueeMixedFont from '@/components/catalog/cta/hero-with-marquee-mixed-font';

export default function Page() {
  return <HeroWithMarqueeMixedFont />;
}`,
    dependencies: ["react", "next/image"],
  },
  "hero-with-marquee-reverse": {
    id: "hero-with-marquee-reverse",
    title: "CTA with Marquee Reverse",
    description: "A mirrored layout CTA section with image marquee on the left and content on the right. Perfect for alternate design layouts.",
    category: "CTA",
    preview: "bg-gradient-to-br from-zinc-900 to-zinc-700",
    previewImage: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=700&h=700&fit=crop",
    code: `// See the component file for full implementation
import HeroWithMarqueeReverse from '@/components/catalog/cta/hero-with-marquee-reverse';

export default function Page() {
  return <HeroWithMarqueeReverse />;
}`,
    dependencies: ["react", "next/image"],
  },
  "hero-with-video": {
    id: "hero-with-video",
    title: "CTA with Video Background",
    description: "A modern CTA section with auto-playing video background. Features seamless loop and optimized performance with native HTML5 video.",
    category: "CTA",
    preview: "bg-gradient-to-br from-neutral-900 to-neutral-700",
    previewImage: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=700&h=700&fit=crop",
    code: `// See the component file for full implementation
import HeroWithVideo from '@/components/catalog/cta/hero-with-video';

export default function Page() {
  return <HeroWithVideo />;
}`,
    dependencies: ["react"],
  },
  "pricing-cards": {
    id: "pricing-cards",
    title: "Pricing Cards",
    description: "Beautiful pricing section with animated particles, accent lines, and monthly/yearly toggle. Features two pricing tiers with smooth animations and glassmorphism effects.",
    category: "Pricing",
    preview: "bg-gradient-to-br from-zinc-950 to-zinc-800",
    previewImage: "https://cdn.21st.dev/lyanchouss/pricing-cards/default/preview.1757402696088.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/pricing-cards/default/video.1757402696088.mp4",
    code: `// See the component file for full implementation
import PricingCards from '@/components/catalog/pricing/pricing-cards';

export default function Page() {
  return <PricingCards />;
}`,
    dependencies: ["react", "@/components/ui/button", "@/components/ui/card", "@/components/ui/separator", "@/components/ui/switch", "lucide-react"],
    installCommand: "npx shadcn@latest add button card separator switch",
  },
  "processing-card": {
    id: "processing-card",
    title: "Processing Card",
    description: "Animated processing card with ASCII glitch effect background, custom loader, and progress bar. Features smooth animations, processing stages, and status indicators perfect for showing generation or upload progress.",
    category: "Processing",
    preview: "bg-gradient-to-br from-[#000000] to-[#010133]",
    previewImage: "https://cdn.21st.dev/lyanchouss/processing-card/default/preview.1758602377997.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/processing-card/default/video.1758602377997.mp4",
    code: `// See the component file for full implementation
import ProcessingDemo from '@/components/catalog/processing/processing-demo';

export default function Page() {
  return <ProcessingDemo />;
}`,
    dependencies: ["react", "framer-motion", "lucide-react", "@/components/ui/processing-card"],
    installCommand: "npm install framer-motion",
  },
  "fallback-card-demo": {
    id: "fallback-card-demo",
    title: "Fallback Card",
    description: "Beautiful fallback card with animated letter glitch effect and radial gradient glow. Features customizable theme (dark/light), animated canvas background with smooth color transitions, and elegant icon display. Perfect for preview unavailable states and error handling.",
    category: "Cards",
    preview: "bg-gradient-to-br from-[#000000] to-[#0d1a36]",
    previewImage: "https://cdn.21st.dev/lyanchouss/fallback-card/default/preview.1758602065436.png",
    previewVideo: "https://cdn.21st.dev/lyanchouss/fallback-card/default/video.1758602065436.mp4",
    code: `// See the component file for full implementation
import FallbackCardDemo from '@/components/catalog/cards/fallback-card-demo';

export default function Page() {
  return <FallbackCardDemo />;
}`,
    dependencies: ["react", "framer-motion", "lucide-react", "@/components/ui/fallback-card", "@/components/ui/card", "@/components/ui/button"],
    installCommand: "npm install framer-motion",
  },
  "background-noise": {
    id: "background-noise",
    title: "Background with Noise",
    description: "Stunning full-screen background with animated noise grain effect and radial gradient spotlight. Features canvas-based noise overlay with customizable refresh rate and alpha channel, creating a cinematic film grain aesthetic. Perfect for hero sections and immersive landing pages.",
    category: "Backgrounds",
    preview: "bg-gradient-to-br from-slate-950 to-orange-900",
    previewImage: "https://cdn.21st.dev/larsen66/background-snippets-noise-effect11/default/preview.1756797499983.png",
    previewVideo: "https://cdn.21st.dev/larsen66/background-snippets-noise-effect11/default/video.1756797499983.mp4",
    code: `// See the component file for full implementation
import BackgroundNoise from '@/components/catalog/backgrounds/background-noise';

export default function Page() {
  return <BackgroundNoise />;
}`,
    dependencies: ["react", "@/components/ui/noise"],
    installCommand: "",
  },
  "squares-background": {
    id: "squares-background",
    title: "Squares Grid Background",
    description: "Interactive animated grid background with moving squares, hover effects, and noise overlay. Features smooth diagonal movement, responsive canvas rendering, glowing hover states with shadows, and layered vignette effects. Creates a dynamic, futuristic aesthetic perfect for modern web applications.",
    category: "Backgrounds",
    preview: "bg-gradient-to-br from-neutral-950 to-blue-900",
    previewImage: "https://cdn.21st.dev/larsen66/noise-dark-blue-gradient-with-squares/default/preview.1756799900781.png",
    previewVideo: "https://cdn.21st.dev/larsen66/noise-dark-blue-gradient-with-squares/default/video.1756799900781.mp4",
    code: `// See the component file for full implementation
import SquaresBackground from '@/components/catalog/backgrounds/squares-background';

export default function Page() {
  return <SquaresBackground />;
}`,
    dependencies: ["react"],
    installCommand: "",
  },
  "background-gradient-grid": {
    id: "background-gradient-grid",
    title: "Gradient Grid Background",
    description: "Clean and minimal background with radial gradient spotlight and grid pattern. Features a cyan gradient emanating from the top center with subtle grid lines. Simple yet elegant design perfect for modern landing pages and hero sections. Pure CSS implementation with no dependencies.",
    category: "Backgrounds",
    preview: "bg-gradient-to-br from-neutral-900 to-cyan-600",
    previewImage: "https://cdn.21st.dev/larsen66/background-gradient-snippet/default/preview.1756797835869.png",
    previewVideo: "https://cdn.21st.dev/larsen66/background-gradient-snippet/default/video.1756797835869.mp4",
    code: `// See the component file for full implementation
import BackgroundGradientGrid from '@/components/catalog/backgrounds/background-gradient-grid';

export default function Page() {
  return <BackgroundGradientGrid />;
}`,
    dependencies: ["react"],
    installCommand: "",
  },
  "blueprint-gradient-mesh": {
    id: "blueprint-gradient-mesh",
    title: "Blueprint Gradient Mesh",
    description: "Professional blueprint-style background with interactive animated grid and soft hover effects. Features deep navy blue tones, technical drawing aesthetic with light blue grid lines, subtle film grain overlay, and smooth diagonal movement. Includes gentle glow on hover with minimal spotlight effect. Perfect for technical dashboards and professional interfaces.",
    category: "Backgrounds",
    preview: "bg-gradient-to-br from-[#0d2b4d] to-[#1a4d7a]",
    previewImage: "https://cdn.21st.dev/larsen66/blueprint-gradient-mesh/default/preview.1756803128499.png",
    previewVideo: "https://cdn.21st.dev/larsen66/blueprint-gradient-mesh/default/video.1756803128499.mp4",
    code: `// See the component file for full implementation
import BlueprintGradientMesh from '@/components/catalog/backgrounds/blueprint-gradient-mesh';

export default function Page() {
  return <BlueprintGradientMesh />;
}`,
    dependencies: ["react"],
    installCommand: "",
  },
  "bento-features": {
    id: "bento-features",
    title: "Bento Features Section",
    description: "A stunning bento-style features section with animated golden ratio spiral background. Features monochrome design with deep blue gradients, pulsing dot animations, and responsive grid layout. Perfect for showcasing product features with modern, minimal aesthetic. Includes animated SVG spiral with golden angle distribution and customizable cards with hover effects.",
    category: "Features",
    preview: "bg-gradient-to-br from-[#000000] to-[#010133]",
    previewImage: "https://cdn.21st.dev/larsen66/bento-features/default/preview.1759166271914.png",
    previewVideo: "https://cdn.21st.dev/larsen66/bento-features/default/video.1759166271914.mp4",
    code: `// See the component file for full implementation
import BentoFeatures from '@/components/catalog/features/bento-features';

export default function Page() {
  return <BentoFeatures />;
}`,
    dependencies: ["react"],
    installCommand: "",
  },
  "bento-monochrome": {
    id: "bento-monochrome",
    title: "Bento Monochrome",
    description: "A minimalist monochrome bento grid layout with subtle animations and dark mode support. Features clean design with gradient backgrounds, animated icons, and responsive modular spans. Perfect for showcasing features with quiet precision and elegant visual hierarchy. Includes theme toggle and smooth fade-in animations.",
    category: "Features",
    preview: "bg-gradient-to-br from-white to-neutral-100",
    previewImage: "https://cdn.21st.dev/larsen66/bento-monochrome/default/preview.1759204336628.png",
    previewVideo: "https://cdn.21st.dev/larsen66/bento-monochrome/default/video.1759204336628.mp4",
    code: `// See the component file for full implementation
import BentoMonochrome from '@/components/catalog/features/bento-monochrome';

export default function Page() {
  return <BentoMonochrome />;
}`,
    dependencies: ["react", "lucide-react"],
    installCommand: "",
  },
  "faq-with-spiral": {
    id: "faq-with-spiral",
    title: "FAQ with Spiral",
    description: "Beautiful FAQ section with animated spiral background using golden ratio mathematics. Features search functionality, expandable questions, smooth animations, and customizable spiral controls. Clean minimalistic black-and-white design.",
    category: "FAQ",
    preview: "bg-gradient-to-br from-black to-zinc-900",
    previewImage: "https://cdn.21st.dev/larsen66/faq-section/default/preview.1759163808269.png",
    previewVideo: "https://cdn.21st.dev/larsen66/faq-section/default/video.1759163808269.mp4",
    code: `// See the component file for full implementation
import FAQWithSpiral from '@/components/catalog/faq/faq-with-spiral';

export default function Page() {
  return <FAQWithSpiral />;
}`,
    dependencies: ["react"],
    installCommand: "",
  },
  "faq-monochrome": {
    id: "faq-monochrome",
    title: "FAQ Monochrome",
    description: "Sophisticated monochrome FAQ section with advanced animations and theme toggle. Features expandable questions with smooth transitions, animated intro badge with rotating beam effect, mouse-tracking card glow, and elegant dark/light mode switch. Includes accessibility features with ARIA labels and keyboard navigation. Perfect for modern SaaS and tech product pages.",
    category: "FAQ",
    preview: "bg-gradient-to-br from-neutral-950 to-neutral-800",
    previewImage: "https://cdn.21st.dev/larsen66/faq-monocrhome/default/preview.1759204235333.png",
    previewVideo: "https://cdn.21st.dev/larsen66/faq-monocrhome/default/video.1759204235333.mp4",
    code: `// See the component file for full implementation
import FAQMonochrome from '@/components/catalog/faq/faq-monochrome';

export default function Page() {
  return <FAQMonochrome />;
}`,
    dependencies: ["react"],
    installCommand: "",
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

  // Escape key handler for fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

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
          ? "bg-gradient-to-b from-gray-900 via-gray-900/54 to-transparent"
          : "bg-gradient-to-b from-gray-50 via-gray-50/54 to-transparent"
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
            <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
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
            <div className="flex flex-wrap gap-4 text-sm animate-fade-in-up" style={{ animationDelay: '50ms' }}>
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
            <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {!isFullscreen ? (
                <div
                  className={cn(
                    "rounded-2xl overflow-hidden border relative transition-colors duration-300",
                    isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
                  )}
                >
                  {hasComponent ? (
                    <div className="w-full h-[700px] relative">
                      <ComponentPreview componentId={id} isDarkMode={isDarkMode} />
                    </div>
                  ) : (
                    <div className={cn("w-full h-full aspect-video flex items-center justify-center border border-gray-200", component.preview)}>
                      <div className="text-white text-lg font-medium">Component Preview</div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Installation */}
            {component.installCommand && (
              <div className={cn(
                "rounded-xl border p-4 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              )}>
                <h3 className={cn(
                  "text-sm font-semibold mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Installation</h3>
                <code className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-mono transition-colors duration-300",
                  isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
                )}>
                  {component.installCommand}
                </code>
              </div>
            )}
          </div>

          {/* Right Panel - Controls */}
          <div className="lg:sticky lg:top-24 h-fit animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className={cn(
              "rounded-xl border p-4 space-y-3 min-w-[200px] transition-colors duration-300",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left hover:scale-[1.02] active:scale-[0.98]",
                  isDarkMode 
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Maximize2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">Fullscreen</span>
              </button>
              <button
                onClick={() => setShowCode(!showCode)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left hover:scale-[1.02] active:scale-[0.98]",
                  showCode
                    ? (isDarkMode ? "bg-gray-100 text-gray-900 shadow-md" : "bg-gray-900 text-white shadow-md")
                    : (isDarkMode 
                        ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50")
                )}
              >
                <Code2 className={cn(
                  "w-5 h-5 transition-transform",
                  showCode && "rotate-180"
                )} />
                <span className="font-medium">{showCode ? "Hide Code" : "Show Code"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Code Panel Backdrop */}
      {showCode && !isFullscreen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fade-in"
          onClick={() => setShowCode(false)}
        />
      )}

      {/* Code Panel - Slides from Right */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 border-l shadow-2xl transition-all duration-700 ease-out z-50",
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
          showCode && !isFullscreen
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0"
        )}
        style={{ 
          width: "50vw",
          minWidth: "600px",
          maxWidth: "800px"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Code Panel Header */}
          <div className={cn("flex items-center justify-between px-6 py-4 border-b", isDarkMode ? "border-gray-700" : "border-gray-200") }>
            <div className="flex items-center gap-3">
              <Code2 className={cn("w-5 h-5", isDarkMode ? "text-gray-200" : "text-gray-700")} />
              <h3 className={cn("font-semibold", isDarkMode ? "text-gray-100" : "text-gray-900")}>Component Code</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  isDarkMode ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-gray-900 text-white hover:bg-gray-800"
                )}
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
                className={cn("w-8 h-8 rounded-lg transition-colors flex items-center justify-center", isDarkMode ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-100")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className={cn("flex-1 overflow-auto p-6", isDarkMode ? "bg-gray-900" : "bg-gray-50") }>
            {loadingCode ? (
              <div className="flex items-center justify-center h-full">
                <div className={cn("flex items-center gap-2", isDarkMode ? "text-gray-400" : "text-gray-500") }>
                  <div className={cn("w-5 h-5 border-2 border-t-transparent rounded-full animate-spin", isDarkMode ? "border-gray-600" : "border-gray-400") }></div>
                  Loading component code...
                </div>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in">
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? vscDarkPlus : vs}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    borderRadius: '0.75rem',
                  }}
                  showLineNumbers
                  wrapLines
                >
                  {realCode || component.code}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] animate-fade-in"
            onClick={() => setIsFullscreen(false)}
          />
          
          {/* Fullscreen Content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full h-full max-w-[95vw] max-h-[95vh] pointer-events-auto relative animate-scale-in">
              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute -top-2 -right-2 z-[102] w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
                aria-label="Close fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Preview Container */}
              <div className={cn(
                "w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                isDarkMode ? "bg-gray-900" : "bg-white"
              )}>
                {hasComponent && (
                  <ComponentPreview componentId={id} isDarkMode={isDarkMode} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
