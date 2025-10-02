"use client";

import { useState, useEffect, useRef } from "react";
import ComponentCatalog from "@/components/component-catalog";
import HomeHero from "@/components/home-hero";
import SiteHeader from "@/components/site-header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource] = useState<"all" | "free" | "pro">("all");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearchClick = () => {
    // Search functionality handled in SectionNavigation
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero section is min-h-screen
      const componentsSection = document.getElementById('components');
      const componentsTop = componentsSection?.offsetTop || heroHeight;
      
      // Control header visibility
      if (currentScrollY < heroHeight) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      // Side navigation visibility: Always visible in hero, hidden in components
      if (currentScrollY < componentsTop - 100) {
        setIsNavVisible(true);
        setIsInHeroSection(true);
      } else {
        setIsNavVisible(false);
        setIsInHeroSection(false);
      }
      
      lastScrollY.current = currentScrollY;

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      
      scrollTimer.current = setTimeout(() => {
        setIsHeaderVisible(true);
        // Don't auto-show nav after timeout if in components section
        const currentScroll = window.scrollY;
        const compTop = document.getElementById('components')?.offsetTop || window.innerHeight;
        if (currentScroll < compTop - 100) {
          setIsNavVisible(true);
        }
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

  return (
    <>
      <SiteHeader 
        isHeaderVisible={isHeaderVisible}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <HomeHero isDarkMode={isDarkMode} />
      <div id="components">
        <ComponentCatalog
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSource={selectedSource}
          isNavVisible={isNavVisible}
          isInHeroSection={isInHeroSection}
          isDarkMode={isDarkMode}
          onSearchClick={handleSearchClick}
        />
      </div>
    </>
  );
}
