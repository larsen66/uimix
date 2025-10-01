"use client";

import { useEffect, useState, useRef } from "react";

interface PixelTextProps {
  children: string;
  interval?: number;
  onHover?: boolean;
  className?: string;
}

export default function PixelText({ 
  children, 
  interval = 5000, 
  onHover = false,
  className = "" 
}: PixelTextProps) {
  const [glitchIndices, setGlitchIndices] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const triggerGlitch = useRef(() => {
    const letters = children.split('').map((char, i) => ({ char, index: i }))
      .filter(item => item.char.trim() !== '');
    
    if (letters.length === 0) return;
    
    const numGlitch = Math.min(2, letters.length);
    const randomIndices: number[] = [];
    
    while (randomIndices.length < numGlitch) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      if (!randomIndices.includes(randomLetter.index)) {
        randomIndices.push(randomLetter.index);
      }
    }
    
    setGlitchIndices(randomIndices);
    
    setTimeout(() => {
      setGlitchIndices([]);
    }, 300);
  });

  // Update the ref when children changes
  useEffect(() => {
    triggerGlitch.current = () => {
      const letters = children.split('').map((char, i) => ({ char, index: i }))
        .filter(item => item.char.trim() !== '');
      
      if (letters.length === 0) return;
      
      const numGlitch = Math.min(2, letters.length);
      const randomIndices: number[] = [];
      
      while (randomIndices.length < numGlitch) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!randomIndices.includes(randomLetter.index)) {
          randomIndices.push(randomLetter.index);
        }
      }
      
      setGlitchIndices(randomIndices);
      
      setTimeout(() => {
        setGlitchIndices([]);
      }, 300);
    };
  }, [children]);

  useEffect(() => {
    if (onHover) return;
    
    triggerGlitch.current();
    
    intervalRef.current = setInterval(() => {
      triggerGlitch.current();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, onHover]);

  useEffect(() => {
    if (onHover && isHovered) {
      triggerGlitch.current();
    }
  }, [isHovered, onHover]);

  if (!children) return null;

  return (
    <span 
      className={className}
      onMouseEnter={() => onHover && setIsHovered(true)}
      onMouseLeave={() => onHover && setIsHovered(false)}
    >
      {children.split('').map((char, index) => (
        <span
          key={index}
          className={`pixel-char ${glitchIndices.includes(index) ? 'glitch' : ''}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
