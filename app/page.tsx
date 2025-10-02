"use client";

import { useState, useEffect, useRef } from "react";
import ComponentCatalog from "@/components/component-catalog";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource] = useState<"all" | "free" | "pro">("all");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
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

  return (
    <ComponentCatalog
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedSource={selectedSource}
      isHeaderVisible={isHeaderVisible}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onSearchClick={handleSearchClick}
    />
  );
}
