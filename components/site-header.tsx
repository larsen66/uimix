"use client";

import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { HyperText } from "./ui/hyper-text";

interface SiteHeaderProps {
  isHeaderVisible: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function SiteHeader({ isHeaderVisible, isDarkMode, setIsDarkMode }: SiteHeaderProps) {
  return (
    <header className={cn(
      "px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
      isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    )}>
      <style jsx>{`
        .star-button {
          position: relative;
          isolation: isolate;
        }
        
        .star-button::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          padding: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 300% 100%;
          animation: shine-sweep 3s linear infinite;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: overlay;
        }
        
        @keyframes shine-sweep {
          0% {
            background-position: 300% 0;
          }
          100% {
            background-position: -300% 0;
          }
        }
        
        .star-button > span {
          position: relative;
          z-index: 2;
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Floating */}
        <div className={cn(
          "backdrop-blur-sm border rounded-xl px-4 py-2 shadow-sm transition-all duration-500 ease-out",
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
          "backdrop-blur-sm border rounded-xl shadow-sm transition-all duration-500 ease-out",
          isDarkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"
        )}>
          <nav className="flex items-center gap-2 px-2 py-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "w-8 h-8 rounded-lg transition-all duration-300 ease-out flex items-center justify-center",
                isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"
              )}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link 
              href="#components" 
              className={cn(
                "text-sm font-medium font-logo px-4 py-1 rounded-lg transition-all duration-300 ease-out",
                isDarkMode
                  ? "text-gray-100 bg-gray-700 hover:bg-gray-600"
                  : "text-gray-900 bg-gray-100 hover:bg-gray-200"
              )}
            >
              <HyperText 
                text="Components"
                className="!py-0 !font-medium"
                duration={800}
                animateOnLoad={false}
              />
            </Link>
            <a 
              href="https://github.com/yourusername/yourrepo" 
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 px-4 py-1 rounded-lg transition-all duration-300 ease-out text-sm font-medium font-logo star-button",
                isDarkMode 
                  ? "text-gray-100 bg-gray-700 hover:bg-gray-600" 
                  : "text-gray-900 bg-gray-100 hover:bg-gray-200"
              )}
              title="Star us on GitHub"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                <HyperText 
                  text="Star"
                  className="!py-0 !font-medium"
                  duration={800}
                  animateOnLoad={false}
                />
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

