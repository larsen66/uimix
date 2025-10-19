'use client'

import React, { useRef, useEffect } from 'react'

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

/* ────────────── LetterGlitch ────────────── */
const LetterGlitch = ({
  glitchColors,
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = '.,:;-*#',
  className = ''
}: {
  glitchColors: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  className?: string
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const letters = useRef<Array<{ char: string; color: string; targetColor: string; colorProgress: number }>>([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())

  const lettersAndSymbols = Array.from(characters)
  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

  const hexToRgb = (hex: string) => {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthand, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null
  }

  const interpolateColor = (s: { r: number; g: number; b: number }, e: { r: number; g: number; b: number }, f: number) =>
    `rgb(${Math.round(s.r + (e.r - s.r) * f)}, ${Math.round(s.g + (e.g - s.g) * f)}, ${Math.round(
      s.b + (e.b - s.b) * f
    )})`

  const calculateGrid = (w: number, h: number) => ({
    columns: Math.ceil(w / charWidth),
    rows: Math.ceil(h / charHeight)
  })

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }
    letters.current = Array.from({ length: columns * rows }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }))
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  const drawLetters = () => {
    if (!context.current) return
    const ctx = context.current
    const { width, height } = canvasRef.current!.getBoundingClientRect()
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'
    letters.current.forEach((letter, i) => {
      const x = (i % grid.current.columns) * charWidth
      const y = Math.floor(i / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const updateLetters = () => {
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))
    for (let i = 0; i < updateCount; i++) {
      const idx = Math.floor(Math.random() * letters.current.length)
      if (!letters.current[idx]) continue
      letters.current[idx].char = getRandomChar()
      letters.current[idx].targetColor = getRandomColor()
      if (!smooth) {
        letters.current[idx].color = letters.current[idx].targetColor
        letters.current[idx].colorProgress = 1
      } else {
        letters.current[idx].colorProgress = 0
      }
    }
  }

  const handleSmooth = () => {
    let redraw = false
    letters.current.forEach(l => {
      if (l.colorProgress < 1) {
        l.colorProgress += 0.05
        if (l.colorProgress > 1) l.colorProgress = 1
        const s = hexToRgb(l.color)
        const e = hexToRgb(l.targetColor)
        if (s && e) {
          l.color = interpolateColor(s, e, l.colorProgress)
          redraw = true
        }
      }
    })
    if (redraw) drawLetters()
  }

  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }
    if (smooth) handleSmooth()
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    context.current = canvas.getContext('2d')
    resizeCanvas()
    animate()
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        resizeCanvas()
        animate()
      }, 100)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [glitchSpeed, smooth])

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)]" />
      )}
      {centerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  )
}

/* ────────────── FallbackCard ────────────── */
interface FallbackCardProps {
  className?: string
  message?: string
  showIcon?: boolean
  showGlitch?: boolean
  theme?: 'dark' | 'light'
  glitchOffsetX?: number
  glitchOffsetY?: number
  glitchScale?: number
  cardWidth?: number
  cardHeight?: number
}

export function FallbackCard({
  className,
  message = 'Preview not available',
  showIcon = true,
  showGlitch = true,
  theme = 'dark',
  glitchOffsetX = 0,
  glitchOffsetY = 0,
  glitchScale = 1,
  cardWidth,
  cardHeight = 400
}: FallbackCardProps) {
  const glitchColors =
    theme === 'dark'
      ? ['#78b4ff', '#a0c4ff', '#c7d2fe', '#e0e7ff', '#f0f4ff']
      : ['#374151', '#6b7280', '#9ca3af', '#d1d5db']

  const baseBg = theme === 'dark' ? 'bg-black text-white/90' : 'bg-white text-black/80'

  return (
    <div
      className={cn(
        'w-full rounded-2xl border overflow-hidden shadow-lg',
        baseBg,
        className
      )}
      style={cardWidth ? { maxWidth: `${cardWidth}px` } : undefined}
    >
      <div 
        className="relative w-full overflow-hidden"
        style={{ height: `${cardHeight}px` }}
      >
        {showGlitch && (
          <div 
            className="absolute inset-0 w-full h-full opacity-25 z-10"
            style={{
              transform: `translate(${glitchOffsetX}px, ${glitchOffsetY}px) scale(${glitchScale})`,
              transformOrigin: 'center center'
            }}
          >
            <LetterGlitch glitchSpeed={50} centerVignette={false} outerVignette={false} smooth characters="₀₁. " glitchColors={glitchColors} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/90 via-black/70 to-transparent blur-lg"></div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/90 via-black/70 to-transparent blur-lg"></div>
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/90 via-black/70 to-transparent blur-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/90 via-black/70 to-transparent blur-lg"></div>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]"></div>
        </div>

        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120, 180, 255, 0.15), transparent 70%), #000'
                : 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(55,65,81,0.2), transparent 70%), #ffffff'
          }}
        />

        <div className="relative z-20 flex flex-col items-center justify-center h-full p-6">
          {showIcon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mb-3 opacity-70 drop-shadow-[0_0_8px_rgba(156,163,175,0.3)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="20" x2="16" y2="20" />
            </svg>
          )}
          <p className="text-sm font-bold text-center drop-shadow-[0_0_6px_rgba(229,231,235,0.2)]">{message}</p>
        </div>
      </div>
    </div>
  )
}

/* ────────────── Section Wrapper ────────────── */
export default function FallbackCardSection() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(120,180,255,0.08),transparent_70%)]" />
      
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-[632px]">
          <FallbackCard
            theme="dark"
            message="Preview not available"
            showIcon
            showGlitch
            glitchOffsetX={150}
            glitchOffsetY={170}
            glitchScale={1.6}
            cardWidth={600}
            cardHeight={550}
          />
        </div>
      </div>
    </section>
  )
}
