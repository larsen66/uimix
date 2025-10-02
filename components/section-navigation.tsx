"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SectionItem {
  id: string;
  label: string;
  count: number;
}

interface SectionNavigationProps {
  sections: SectionItem[];
  isDarkMode: boolean;
  isHeaderVisible: boolean;
  isInHeroSection: boolean;
  onSearchClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SectionNavigation({ sections, isDarkMode, isHeaderVisible, isInHeroSection, onSearchClick, searchQuery, setSearchQuery }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      // Find which section is currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen, setSearchQuery]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    onSearchClick();
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Offset for header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (sections.length === 0) return null;

  // Auto-expand navigation in hero section
  const isExpanded = isInHeroSection || isNavHovered;

  return (
    <nav
      className={cn(
        "fixed left-12 top-1/2 -translate-y-1/2 z-40 transition-all duration-500",
        isHeaderVisible ? "opacity-100" : "opacity-30 hover:opacity-100"
      )}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <div
        className={cn(
          "backdrop-blur-md border rounded-2xl shadow-lg transition-all duration-300",
          isExpanded ? "p-4" : "p-3",
          isDarkMode ? "bg-gray-800/70 border-gray-700" : "bg-white/70 border-gray-200"
        )}
      >
        <div className={cn(
          "flex flex-col gap-2",
          isExpanded ? "items-stretch" : "items-center"
        )}>
          {/* Section Items */}
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredIndex === index;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "flex items-center transition-all duration-300 rounded-lg overflow-hidden",
                  isExpanded ? "px-3 py-2 w-full gap-3" : "justify-center w-auto p-1",
                  isExpanded && (isDarkMode
                    ? isHovered ? "bg-gray-700" : ""
                    : isHovered ? "bg-gray-100" : "")
                )}
              >
                {/* Dot indicator */}
                <div
                  className={cn(
                    "rounded-full transition-all duration-300 flex-shrink-0",
                    isActive
                      ? isDarkMode
                        ? "w-2.5 h-2.5 bg-gray-100 ring-2 ring-gray-100/30"
                        : "w-2.5 h-2.5 bg-gray-900 ring-2 ring-gray-900/30"
                      : isDarkMode
                      ? "w-1.5 h-1.5 bg-gray-500"
                      : "w-1.5 h-1.5 bg-gray-400"
                  )}
                />

                {/* Label - shown when nav is expanded */}
                <div
                  className={cn(
                    "flex items-center justify-between gap-4 transition-all duration-300 overflow-hidden whitespace-nowrap",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isActive
                        ? isDarkMode ? "text-gray-100" : "text-gray-900"
                        : isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    {section.label}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-sans px-2 py-0.5 rounded-full transition-colors duration-300",
                      isActive
                        ? isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
                        : isDarkMode ? "bg-gray-700/50 text-gray-400" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {section.count}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Separator */}
          <div 
            className={cn(
              "h-[1px] transition-all duration-300",
              isExpanded ? "w-full" : "w-4",
              isDarkMode ? "bg-gray-600" : "bg-gray-300"
            )}
          />

          {/* Search Button / Input */}
          {!isSearchOpen ? (
            <button
              onClick={handleSearchClick}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
              className={cn(
                "flex items-center transition-all duration-300 rounded-lg overflow-hidden",
                isExpanded ? "px-3 py-2 w-full gap-3" : "justify-center w-auto p-1",
                isExpanded && (isDarkMode
                  ? isSearchHovered ? "bg-gray-700" : ""
                  : isSearchHovered ? "bg-gray-100" : "")
              )}
            >
              {/* Search Icon */}
              <div className="flex-shrink-0">
                <Search 
                  className={cn(
                    "transition-all duration-300",
                    isExpanded ? "w-4 h-4" : "w-3.5 h-3.5",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )} 
                />
              </div>

              {/* Search Label - shown when nav is expanded */}
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap",
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}
              >
                Search Components
              </span>
            </button>
          ) : (
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 w-full",
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            )}>
              <Search 
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} 
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "bg-transparent border-none outline-none text-sm w-full",
                  isDarkMode 
                    ? "text-gray-100 placeholder:text-gray-500" 
                    : "text-gray-900 placeholder:text-gray-500"
                )}
              />
              <button
                onClick={handleCloseSearch}
                className={cn(
                  "flex-shrink-0 hover:opacity-70 transition-opacity",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

