'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor } from 'lucide-react'

// tiny util
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

/* ────────────── LetterGlitch ────────────── */
const LetterGlitch: React.FC<{
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  className?: string
}> = ({
  glitchColors = ['#78b4ff', '#a0c4ff', '#c7d2fe', '#e0e7ff', '#f0f4ff'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = '.,:;-*#',
  className = ''
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationRef = React.useRef<number | null>(null)
  const letters = React.useRef<
    Array<{ char: string; color: string; targetColor: string; colorProgress: number }>
  >([])
  const grid = React.useRef({ columns: 0, rows: 0 })
  const context = React.useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = React.useRef(Date.now())

  const lettersAndSymbols = React.useMemo(() => Array.from(characters), [characters])
  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = React.useCallback(
    () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    [lettersAndSymbols]
  )
  const getRandomColor = React.useCallback(
    () => glitchColors[Math.floor(Math.random() * glitchColors.length)],
    [glitchColors]
  )

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const normalized = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized)
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : null
  }

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) =>
    `rgb(${Math.round(start.r + (end.r - start.r) * factor)},${Math.round(
      start.g + (end.g - start.g) * factor
    )},${Math.round(start.b + (end.b - start.b) * factor)})`

  const calculateGrid = (width: number, height: number) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight)
  })

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }
    const total = columns * rows
    letters.current = Array.from({ length: total }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }))
  }

  const drawLetters = () => {
    if (!context.current || !canvasRef.current) return
    const ctx = context.current
    const canvas = canvasRef.current
    // Use canvas dimensions, not getBoundingClientRect
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'
    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth
      const y = Math.floor(index / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const updateLetters = () => {
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))
    for (let i = 0; i < updateCount; i++) {
      const idx = Math.floor(Math.random() * letters.current.length)
      const item = letters.current[idx]
      item.char = getRandomChar()
      item.targetColor = getRandomColor()
      if (!smooth) {
        item.color = item.targetColor
        item.colorProgress = 1
      } else {
        item.colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        letter.colorProgress = Math.min(1, letter.colorProgress + 0.05)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })
    if (needsRedraw) drawLetters()
  }

  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }
    if (smooth) handleSmoothTransitions()
    animationRef.current = requestAnimationFrame(animate)
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const dpr = window.devicePixelRatio || 1
    
    // Force parent to have dimensions
    const rect = parent.getBoundingClientRect()
    const width = rect.width || parent.clientWidth || parent.offsetWidth
    const height = rect.height || parent.clientHeight || parent.offsetHeight
    
    // Set canvas size with DPR
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    // Reset transform and calculate grid with visual dimensions
    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    const { columns, rows } = calculateGrid(width, height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    context.current = canvas.getContext('2d')
    resizeCanvas()
    animate()

    let resizeTimeout: number | undefined
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
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
    <div className={cn('relative w-full h-full bg-black overflow-hidden', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {outerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]" />
      )}
      {centerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  )
}

/* ────────────── CustomLoader ────────────── */
const loaderStyle = `
.custom-loader-5{height:32px;width:32px;position:relative;animation:loader-5-1 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
@keyframes loader-5-1{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.custom-loader-5::before,.custom-loader-5::after,.custom-loader-5 span::before,.custom-loader-5 span::after{
content:"";display:block;position:absolute;margin:auto;background:#78b4ff;border-radius:50%}
.custom-loader-5::before{top:0;left:0;bottom:0;right:auto;width:8px;height:8px;animation:loader-5-2 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
@keyframes loader-5-2{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(24px,0,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
.custom-loader-5::after{top:0;left:auto;bottom:0;right:0;width:8px;height:8px;animation:loader-5-3 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
@keyframes loader-5-3{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(-24px,0,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
.custom-loader-5 span{display:block;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;height:32px;width:32px}
.custom-loader-5 span::before{top:0;left:0;bottom:auto;right:0;width:8px;height:8px;animation:loader-5-4 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
@keyframes loader-5-4{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(0,24px,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}
.custom-loader-5 span::after{top:auto;left:0;bottom:0;right:0;width:8px;height:8px;animation:loader-5-5 2s cubic-bezier(0.770,0.000,0.175,1.000) infinite}
@keyframes loader-5-5{0%{transform:translate3d(0,0,0)scale(1)}50%{transform:translate3d(0,-24px,0)scale(.5)}100%{transform:translate3d(0,0,0)scale(1)}}`
if (typeof document !== 'undefined' && !document.getElementById('loader-style')) {
  const styleTag = document.createElement('style')
  styleTag.id = 'loader-style'
  styleTag.innerHTML = loaderStyle
  document.head.appendChild(styleTag)
}
const CustomLoader: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className,
  size = 'md'
}) => <div className={cn(`custom-loader-5 size-${size}`, className)}><span /></div>

/* ────────────── AsciiProgressBar ────────────── */
const AsciiProgressBar: React.FC<{ progress: number; className?: string }> = ({
  progress,
  className
}) => {
  const [animatedProgress, setAnimatedProgress] = React.useState(0)
  React.useEffect(() => {
    const t = setTimeout(() => setAnimatedProgress(progress), 100)
    return () => clearTimeout(t)
  }, [progress])
  const totalBars = 20
  const filledBars = Math.floor((animatedProgress / 100) * totalBars)
  const characters = Array.from({ length: totalBars }, (_, index) => ({
    char: index < filledBars ? '▓' : '░',
    isFilled: index < filledBars,
    index
  }))
  return (
    <div className={cn('font-mono text-lg', className)}>
      <div className="flex items-center text-white/80">
        <span className="text-white/60 mr-1">[</span>
        <div className="flex">
          {characters.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1, scale: item.isFilled ? [1, 1.2, 1] : 1 }}
              transition={{
                delay: item.isFilled ? index * 0.03 : 0,
                duration: item.isFilled ? 0.3 : 0.1,
                scale: { repeat: item.isFilled ? 1 : 0, duration: 0.4 }
              }}
              className={item.isFilled ? 'text-[#78b4ff]' : 'text-white/30'}
            >
              {item.char}
            </motion.span>
          ))}
        </div>
        <span className="text-white/60 ml-1">]</span>
        <span className="text-white/60 ml-2 text-sm">
          {Math.round(animatedProgress)}%
        </span>
      </div>
    </div>
  )
}

/* ────────────── ProcessingCard ────────────── */
interface ProcessingCardProps {
  name?: string
  className?: string
  status?: 'queued' | 'running' | 'succeeded' | 'failed'
  progress?: number
  glitchOffsetX?: number
  glitchOffsetY?: number
}

const processingStages = [
  { key: 'initializing', label: 'Initializing...', minProgress: 0 },
  { key: 'analyzing', label: 'Analyzing components...', minProgress: 10 },
  { key: 'generating', label: 'Generating TSX code...', minProgress: 30 },
  { key: 'validating', label: 'Validating syntax...', minProgress: 70 },
  { key: 'optimizing', label: 'Optimizing code...', minProgress: 85 },
  { key: 'finalizing', label: 'Finalizing...', minProgress: 95 }
]

const getCurrentStage = (progress: number) => {
  for (let i = processingStages.length - 1; i >= 0; i--) {
    if (progress >= processingStages[i].minProgress) return processingStages[i]
  }
  return processingStages[0]
}

const ProcessingCard: React.FC<ProcessingCardProps> = ({
  name = 'ComponentGeneration',
  className,
  status = 'queued',
  progress = 0,
  glitchOffsetX = 0,
  glitchOffsetY = 0
}) => {
  const [displayProgress, setDisplayProgress] = React.useState(0)
  const [currentStage, setCurrentStage] = React.useState(processingStages[0])

  React.useEffect(() => {
    const t = setTimeout(() => setDisplayProgress(progress), 100)
    return () => clearTimeout(t)
  }, [progress])

  React.useEffect(() => {
    setCurrentStage(getCurrentStage(displayProgress))
  }, [displayProgress])

  React.useEffect(() => {
    if (status === 'running' && displayProgress < 95) {
      const i = setInterval(() => {
        setDisplayProgress(prev =>
          Math.min(prev + Math.random() * 2 + 0.5, Math.min(progress + 10, 95))
        )
      }, 500)
      return () => clearInterval(i)
    }
  }, [status, progress, displayProgress])

  const finalProgress = status === 'succeeded' ? 100 : displayProgress
  const getStatusText = () =>
    status === 'queued'
      ? 'Queued for processing...'
      : status === 'running'
      ? currentStage.label
      : status === 'succeeded'
      ? 'Generation completed!'
      : status === 'failed'
      ? 'Generation failed'
      : 'Processing...'

  return (
    <div
      className={cn(
        'w-full rounded-2xl border overflow-hidden shadow-lg',
        // ALWAYS dark palette:
        'bg-[#0b0b0f] text-white border-white/10',
        className
      )}
    >
      {/* Header (dark) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-sm font-medium text-white truncate">{name}.tsx</div>
        {(status === 'running' || status === 'queued' || status === 'succeeded') && (
          <div className="text-xs text-white/60">{Math.round(finalProgress)}%</div>
        )}
      </div>

      {/* Inner content — ALWAYS dark */}
      <div className="relative h-[400px] w-full bg-black text-white overflow-hidden">
        {/* ASCII glitch backdrop */}
        <div 
          className="absolute inset-0 w-full h-full opacity-25 z-10"
          style={{
            transform: `translate(${glitchOffsetX}px, ${glitchOffsetY}px)`
          }}
        >
          <LetterGlitch glitchSpeed={50} centerVignette={false} outerVignette={false} smooth characters=". " />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/90 via-black/70 to-transparent blur-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/90 via-black/70 to-transparent blur-lg"></div>
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/90 via-black/70 to-transparent blur-lg"></div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/90 via-black/70 to-transparent blur-lg"></div>
          </div>
        </div>

        {/* Subtle blue radial glow on black */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120,180,255,0.15), transparent 70%), #000'
          }}
        />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            {status === 'running' ? (
              <div className="w-8 h-8 drop-shadow-[0_0_8px_rgba(120,180,255,0.4)]">
                <CustomLoader size="md" />
              </div>
            ) : (
              <Monitor className="w-8 h-8 text-white/60 drop-shadow-[0_0_8px_rgba(156,163,175,0.3)]" />
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentStage.key + status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-bold text-center text-white mb-4 drop-shadow-[0_0_6px_rgba(229,231,235,0.2)]"
            >
              {getStatusText()}
            </motion.p>
          </AnimatePresence>

          {(status === 'running' || status === 'queued' || status === 'succeeded') && (
            <AsciiProgressBar progress={finalProgress} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ────────────── Section Wrapper ────────────── */
export default function ProcessingCardSection() {
  const [offsetX, setOffsetX] = React.useState(0)
  const [offsetY, setOffsetY] = React.useState(0)
  const step = 10

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(120,180,255,0.08),transparent_70%)]" />
      
      {/* Control Panel */}
      <div className="absolute top-8 right-8 z-50 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 shadow-xl">
        <div className="text-xs text-zinc-400 mb-3 font-mono">
          Glitch Position: X: {offsetX}px, Y: {offsetY}px
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* Up */}
          <button
            onClick={() => setOffsetY(prev => prev - step)}
            className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
            aria-label="Move up"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
              <path d="M8 4L8 12M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex gap-2">
            {/* Left */}
            <button
              onClick={() => setOffsetX(prev => prev - step)}
              className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
              aria-label="Move left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
                <path d="M12 8L4 8M4 8L8 4M4 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Reset */}
            <button
              onClick={() => { setOffsetX(0); setOffsetY(0); }}
              className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
              aria-label="Reset position"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
                <circle cx="8" cy="8" r="2" fill="currentColor"/>
              </svg>
            </button>
            {/* Right */}
            <button
              onClick={() => setOffsetX(prev => prev + step)}
              className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
              aria-label="Move right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
                <path d="M4 8L12 8M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {/* Down */}
          <button
            onClick={() => setOffsetY(prev => prev + step)}
            className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
            aria-label="Move down"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
              <path d="M8 12L8 4M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Centered Card */}
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <ProcessingCard 
            status="running" 
            progress={45} 
            name="ComponentGeneration"
            glitchOffsetX={offsetX}
            glitchOffsetY={offsetY}
          />
        </div>
      </div>
    </section>
  )
}
