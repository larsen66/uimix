"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, Palette } from "lucide-react";
import { HyperText } from "./ui/hyper-text";

interface HomeHeroProps {
  isDarkMode: boolean;
}

export default function HomeHero({ isDarkMode }: HomeHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const words = [
    "Experiences",
    "Interfaces",
    "Components",
    "Applications",
    "Solutions",
    "Products"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000); // Меняем слово каждые 4 секунды
    
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        
        @keyframes float-badge {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        @keyframes float-title {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-6px);
          }
        }
        
        .animate-float-badge {
          animation: float-badge 3s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-float-title {
          animation: float-title 4s ease-in-out infinite;
          animation-delay: 0.5s;
          will-change: transform;
        }
        
        @keyframes float-shadow {
          0%, 100% { 
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
          }
          50% { 
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
          }
        }
        
        .animate-float-badge > * {
          animation: float-shadow 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll-indicator {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
        
        /* Alpha Lyrae font features */
        .alpha-lyrae-text {
          font-feature-settings: 
            "calt" 1,  /* Contextual alternates - every 4th glyph becomes pixelated */
            "liga" 1;  /* Standard ligatures */
          font-variant-ligatures: contextual;
        }
        
        .alpha-lyrae-title {
          font-feature-settings: 
            "calt" 1;  /* Enable contextual alternates for automatic pixelation */
        }
        
        /* Pixelated font on hover for buttons */
        .alpha-lyrae-button {
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        /* Shine border animation for primary button */
        .alpha-lyrae-button.button-primary::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 11px;
          padding: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent,
            transparent
          );
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: shine-border-button 2.5s linear infinite;
          pointer-events: none;
          opacity: 0.6;
        }
        
        @keyframes shine-border-button {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        .alpha-lyrae-button > span {
          position: relative;
          z-index: 1;
        }
        
        .alpha-lyrae-button:hover .letter-morph {
          animation: button-letter-morph 1.3s ease-in-out infinite;
        }
        
        /* Subtle scroll effect - only a few letters */
        .alpha-lyrae-button.scrolled .letter-morph:nth-child(2),
        .alpha-lyrae-button.scrolled .letter-morph:nth-child(7),
        .alpha-lyrae-button.scrolled .letter-morph:nth-child(12) {
          animation: button-letter-morph-simple 2s ease-in-out infinite;
        }
        
        @keyframes button-letter-morph {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          20% {
            font-feature-settings: "calt" 1, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          40% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 1, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          60% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 1, "ss04" 0, "ss05" 0;
          }
          80% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 1;
          }
        }
        
        @keyframes button-letter-morph-simple {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
        }
        
        .alpha-lyrae-button:hover .letter-morph:nth-child(2n) {
          animation-delay: 0s;
        }
        
        .alpha-lyrae-button:hover .letter-morph:nth-child(3n) {
          animation-delay: 0.12s;
        }
        
        .alpha-lyrae-button:hover .letter-morph:nth-child(5n) {
          animation-delay: 0.24s;
        }
        
        .alpha-lyrae-button:hover .letter-morph:nth-child(7n) {
          animation-delay: 0.36s;
        }
        
        .alpha-lyrae-button:hover .letter-morph:nth-child(11n) {
          animation-delay: 0.48s;
        }
        
        /* Description with wave pixelation effect */
        .alpha-lyrae-description {
          font-family: 'AlphaLyrae', sans-serif;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          cursor: default;
        }
        
        .alpha-lyrae-description .word {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .alpha-lyrae-description .word .letter {
          display: inline-block;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: font-feature-settings 0.3s ease;
        }
        
        .alpha-lyrae-description:hover .word .letter {
          animation: wave-pixelate 1.8s ease-in-out infinite;
        }
        
        /* Subtle scroll effect - only certain letters */
        .alpha-lyrae-description.scrolled .word:nth-child(2) .letter:nth-child(2),
        .alpha-lyrae-description.scrolled .word:nth-child(3) .letter:nth-child(1),
        .alpha-lyrae-description.scrolled .word:nth-child(5) .letter:nth-child(3) {
          animation: wave-pixelate-simple 2.5s ease-in-out infinite;
        }
        
        @keyframes wave-pixelate {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          25% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 1, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          75% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 1;
          }
        }
        
        @keyframes wave-pixelate-simple {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
        }
        
        .alpha-lyrae-description:hover .word:nth-child(1) .letter {
          animation-delay: 0s;
        }
        
        .alpha-lyrae-description:hover .word:nth-child(2) .letter {
          animation-delay: 0.1s;
        }
        
        .alpha-lyrae-description:hover .word:nth-child(3) .letter {
          animation-delay: 0.2s;
        }
        
        .alpha-lyrae-description:hover .word:nth-child(4) .letter {
          animation-delay: 0.3s;
        }
        
        .alpha-lyrae-description:hover .word:nth-child(5) .letter {
          animation-delay: 0.4s;
        }
        
        .alpha-lyrae-description:hover .word:nth-child(6) .letter {
          animation-delay: 0.5s;
        }
        
        /* Badge with glitch pixelation effect */
        .alpha-lyrae-badge {
          font-family: 'AlphaLyrae', sans-serif;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        
        /* Shine border animation */
        .alpha-lyrae-badge::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9px;
          padding: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            transparent,
            currentColor,
            transparent,
            transparent
          );
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: shine-border 3s linear infinite;
          pointer-events: none;
        }
        
        @keyframes shine-border {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        .alpha-lyrae-badge > span {
          position: relative;
          z-index: 1;
        }
        
        .alpha-lyrae-badge .badge-letter {
          display: inline-block;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: font-feature-settings 0.2s ease;
        }
        
        .alpha-lyrae-badge:hover .badge-letter {
          animation: badge-glitch 1.2s ease-in-out infinite;
        }
        
        /* Subtle scroll effect - only specific letters */
        .alpha-lyrae-badge.scrolled .badge-letter:nth-child(3),
        .alpha-lyrae-badge.scrolled .badge-letter:nth-child(8),
        .alpha-lyrae-badge.scrolled .badge-letter:nth-child(15) {
          animation: badge-glitch-simple 2s ease-in-out infinite;
        }
        
        @keyframes badge-glitch {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          15% {
            font-feature-settings: "calt" 1, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          30% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 1, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 1, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          70% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 1, "ss05" 0;
          }
          85% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 1;
          }
        }
        
        @keyframes badge-glitch-simple {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
        }
        
        .alpha-lyrae-badge:hover .badge-letter:nth-child(2n) {
          animation-delay: 0s;
        }
        
        .alpha-lyrae-badge:hover .badge-letter:nth-child(3n) {
          animation-delay: 0.15s;
        }
        
        .alpha-lyrae-badge:hover .badge-letter:nth-child(5n) {
          animation-delay: 0.3s;
        }
        
        .alpha-lyrae-badge:hover .badge-letter:nth-child(7n) {
          animation-delay: 0.45s;
        }
        
        /* Feature cards with pixelation effect */
        .alpha-lyrae-feature {
          font-family: 'AlphaLyrae', sans-serif;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: all 0.3s ease;
        }
        
        .alpha-lyrae-feature-title {
          font-family: 'AlphaLyrae', sans-serif;
          cursor: default;
        }
        
        .alpha-lyrae-feature-title .feature-letter {
          display: inline-block;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: font-feature-settings 0.3s ease;
        }
        
        .alpha-lyrae-feature-title:hover .feature-letter {
          animation: feature-pixelate 1.5s ease-in-out infinite;
        }
        
        /* Subtle scroll effect - only specific letters */
        .alpha-lyrae-feature-title.scrolled .feature-letter:nth-child(1),
        .alpha-lyrae-feature-title.scrolled .feature-letter:nth-child(5) {
          animation: feature-pixelate-simple 2.2s ease-in-out infinite;
        }
        
        @keyframes feature-pixelate {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          25% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 1, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          75% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 1;
          }
        }
        
        @keyframes feature-pixelate-simple {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
        }
        
        .alpha-lyrae-feature-title:hover .feature-letter:nth-child(2n) {
          animation-delay: 0s;
        }
        
        .alpha-lyrae-feature-title:hover .feature-letter:nth-child(3n) {
          animation-delay: 0.15s;
        }
        
        .alpha-lyrae-feature-title:hover .feature-letter:nth-child(5n) {
          animation-delay: 0.3s;
        }
        
        .alpha-lyrae-feature-desc {
          font-family: 'AlphaLyrae', sans-serif;
          cursor: default;
        }
        
        .alpha-lyrae-feature-desc .desc-word {
          display: inline-block;
        }
        
        .alpha-lyrae-feature-desc .desc-letter {
          display: inline-block;
          font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          transition: font-feature-settings 0.3s ease;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-letter {
          animation: desc-pixelate 2s ease-in-out infinite;
        }
        
        /* Subtle scroll effect - only a few letters in specific words */
        .alpha-lyrae-feature-desc.scrolled .desc-word:nth-child(2) .desc-letter:nth-child(1),
        .alpha-lyrae-feature-desc.scrolled .desc-word:nth-child(4) .desc-letter:nth-child(2) {
          animation: desc-pixelate-simple 2.5s ease-in-out infinite;
        }
        
        @keyframes desc-pixelate {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          33% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          66% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 1, "ss04" 0, "ss05" 0;
          }
        }
        
        @keyframes desc-pixelate-simple {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss03" 0, "ss04" 0, "ss05" 0;
          }
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(1) .desc-letter {
          animation-delay: 0s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(2) .desc-letter {
          animation-delay: 0.1s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(3) .desc-letter {
          animation-delay: 0.2s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(4) .desc-letter {
          animation-delay: 0.3s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(5) .desc-letter {
          animation-delay: 0.4s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(6) .desc-letter {
          animation-delay: 0.5s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(7) .desc-letter {
          animation-delay: 0.6s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(8) .desc-letter {
          animation-delay: 0.7s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(9) .desc-letter {
          animation-delay: 0.8s;
        }
        
        .alpha-lyrae-feature-desc:hover .desc-word:nth-child(10) .desc-letter {
          animation-delay: 0.9s;
        }
        
        /* Animated pixelation for individual letters */
        @keyframes pixelate-letter {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 1, "ss02" 0, "ss05" 0;
          }
        }
        
        @keyframes pixelate-letter-2 {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 1, "ss05" 0;
          }
        }
        
        @keyframes pixelate-letter-3 {
          0%, 100% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss05" 0;
          }
          50% {
            font-feature-settings: "calt" 0, "ss01" 0, "ss02" 0, "ss05" 1;
          }
        }
        
        .pixelate-word {
          display: inline-block;
        }
        
        .pixelate-word .letter {
          display: inline-block;
        }
        
        .pixelate-word .letter:nth-child(1) {
          animation: pixelate-letter 3s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .pixelate-word .letter:nth-child(3) {
          animation: pixelate-letter-2 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .pixelate-word .letter:nth-child(5) {
          animation: pixelate-letter-3 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .pixelate-word .letter:nth-child(7) {
          animation: pixelate-letter 3.8s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .pixelate-word .letter:nth-child(9) {
          animation: pixelate-letter-2 4.2s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .pixelate-word .letter:nth-child(11) {
          animation: pixelate-letter-3 3.6s ease-in-out infinite;
          animation-delay: 2.5s;
        }
      `}</style>

      {/* Background matching ComponentCatalog */}
      <div className={`absolute inset-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} />

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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-center">
        {/* Badge */}
        <div 
          className={`animate-fade-in-up animate-float-badge mb-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors duration-200 font-logo alpha-lyrae-badge ${isScrolled ? 'scrolled' : ''} ${
              isDarkMode
                ? "bg-transparent border-white/20 text-white/80 hover:border-white/30"
                : "bg-transparent border-black/20 text-black/80 hover:border-black/30"
            }`}
          >
            <span>
              {"20+ Premium Components".split('').map((char, index) => (
                char === ' ' ? ' ' : <span key={index} className="badge-letter">{char}</span>
              ))}
            </span>
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`animate-fade-in-up animate-float-title ${isVisible ? 'opacity-100' : 'opacity-0'} text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] font-logo alpha-lyrae-title ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          Build Stunning
          <br />
          <span 
            key={currentWordIndex}
            className={`pixelate-word ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {words[currentWordIndex].split('').map((letter, index) => (
              <span key={index} className="letter">{letter}</span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p
          className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'} text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-logo alpha-lyrae-description ${isScrolled ? 'scrolled' : ''} ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          {"Copy, paste, and ship beautiful interfaces.".split(' ').map((word, wordIndex, array) => (
            <React.Fragment key={wordIndex}>
              <span className="word">
                {word.split('').map((letter, letterIndex) => (
                  <span key={letterIndex} className="letter">{letter}</span>
                ))}
              </span>
              {wordIndex < array.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>

        {/* CTA Buttons */}
        <div
          className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'} flex flex-col sm:flex-row items-center justify-center gap-3 mb-20`}
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#components"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 alpha-lyrae-button button-primary ${isScrolled ? 'scrolled' : ''} ${
              isDarkMode
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            <span className="flex items-center gap-2">
              <HyperText 
                text="Browse Components" 
                className="!font-logo !py-0"
                duration={800}
                animateOnLoad={false}
                framerProps={{
                  initial: { opacity: 1, y: 0 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 1, y: 0 },
                }}
              />
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-200 inline-flex items-center gap-2 ${
              isDarkMode
                ? "border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                : "border-black/20 text-black hover:bg-black/5 hover:border-black/30"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <HyperText 
              text="GitHub" 
              className="!font-logo !py-0"
              duration={800}
              animateOnLoad={false}
              framerProps={{
                initial: { opacity: 1, y: 0 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 1, y: 0 },
              }}
            />
          </a>
        </div>

        {/* Features */}
        <div
          className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto`}
          style={{ animationDelay: "0.5s" }}
        >
          <div className={`flex flex-col items-center gap-3 p-6 rounded-lg border transition-colors duration-200 ${
            isDarkMode ? "bg-transparent border-white/10 hover:border-white/20" : "bg-transparent border-black/10 hover:border-black/20"
          }`}>
              <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-center font-logo alpha-lyrae-feature">
                <h3 className={`font-medium text-base mb-2 alpha-lyrae-feature-title ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white" : "text-black"}`}>
                  {"Lightning Fast".split('').map((char, index) => (
                    char === ' ' ? ' ' : <span key={index} className="feature-letter">{char}</span>
                  ))}
                </h3>
                <p className={`text-xs leading-relaxed alpha-lyrae-feature-desc ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                  {"Built with Next.js 15 and React 19 for optimal performance".split(' ').map((word, wordIndex, array) => (
                    <React.Fragment key={wordIndex}>
                      <span className="desc-word">
                        {word.split('').map((letter, letterIndex) => (
                          <span key={letterIndex} className="desc-letter">{letter}</span>
                        ))}
                      </span>
                      {wordIndex < array.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </p>
              </div>
          </div>

          <div className={`flex flex-col items-center gap-3 p-6 rounded-lg border transition-colors duration-200 ${
            isDarkMode ? "bg-transparent border-white/10 hover:border-white/20" : "bg-transparent border-black/10 hover:border-black/20"
          }`}>
              <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                <Palette className="w-6 h-6" />
              </div>
              <div className="text-center font-logo alpha-lyrae-feature">
                <h3 className={`font-medium text-base mb-2 alpha-lyrae-feature-title ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white" : "text-black"}`}>
                  {"Fully Customizable".split('').map((char, index) => (
                    char === ' ' ? ' ' : <span key={index} className="feature-letter">{char}</span>
                  ))}
                </h3>
                <p className={`text-xs leading-relaxed alpha-lyrae-feature-desc ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                  {"Tailwind CSS powered with dark mode support out of the box".split(' ').map((word, wordIndex, array) => (
                    <React.Fragment key={wordIndex}>
                      <span className="desc-word">
                        {word.split('').map((letter, letterIndex) => (
                          <span key={letterIndex} className="desc-letter">{letter}</span>
                        ))}
                      </span>
                      {wordIndex < array.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </p>
              </div>
          </div>

          <div className={`flex flex-col items-center gap-3 p-6 rounded-lg border transition-colors duration-200 ${
            isDarkMode ? "bg-transparent border-white/10 hover:border-white/20" : "bg-transparent border-black/10 hover:border-black/20"
          }`}>
              <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-center font-logo alpha-lyrae-feature">
                <h3 className={`font-medium text-base mb-2 alpha-lyrae-feature-title ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white" : "text-black"}`}>
                  {"Production Ready".split('').map((char, index) => (
                    char === ' ' ? ' ' : <span key={index} className="feature-letter">{char}</span>
                  ))}
                </h3>
                <p className={`text-xs leading-relaxed alpha-lyrae-feature-desc ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                  {"Copy-paste ready components tested in real applications".split(' ').map((word, wordIndex, array) => (
                    <React.Fragment key={wordIndex}>
                      <span className="desc-word">
                        {word.split('').map((letter, letterIndex) => (
                          <span key={letterIndex} className="desc-letter">{letter}</span>
                        ))}
                      </span>
                      {wordIndex < array.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </p>
              </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-scroll">
            <svg
              className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

