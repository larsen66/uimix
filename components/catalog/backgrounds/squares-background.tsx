"use client";

import React, { useEffect, useRef } from "react";
type Offset = { x: number; y: number };

const setHiDPICanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const parent = canvas.parentElement;
  const cw = (parent?.clientWidth ?? window.innerWidth) | 0;
  const ch = (parent?.clientHeight ?? window.innerHeight) | 0;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  canvas.width = Math.floor(cw * dpr);
  canvas.height = Math.floor(ch * dpr);
  canvas.style.width = cw + "px";
  canvas.style.height = ch + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const originFromOffset = (offset: Offset, cell: number) => ({
  x: -((offset.x % cell) + cell) % cell,
  y: -((offset.y % cell) + cell) % cell,
});

const Noise: React.FC<{ refresh?: number; alpha?: number }> = ({ refresh = 2, alpha = 18 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let f = 0;
    let id = 0;
    const S = 1024;

    const resize = () => {
      c.width = S;
      c.height = S;
      c.style.width = "100vw";
      c.style.height = "100vh";
    };

    const draw = () => {
      const img = ctx.createImageData(S, S);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = () => {
      if (f % refresh === 0) draw();
      f++;
      id = requestAnimationFrame(loop);
    };

    addEventListener("resize", resize);
    resize();
    loop();
    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [refresh, alpha]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

interface GridProps {
  squareSize: number;
  borderColor: string;
  vignette?: boolean;
  gridOffsetRef: React.MutableRefObject<Offset>;
  className?: string;
}

const MovingGrid: React.FC<GridProps> = ({
  squareSize,
  borderColor,
  vignette = true,
  gridOffsetRef,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      const origin = originFromOffset(gridOffsetRef.current, squareSize);

      ctx.strokeStyle = borderColor;
      // vertical lines
      for (let x = origin.x; x < cw + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, ch);
        ctx.stroke();
      }
      // horizontal lines
      for (let y = origin.y; y < ch + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(cw, y + 0.5);
        ctx.stroke();
      }

      if (vignette) {
        const grad = ctx.createRadialGradient(
          cw / 2,
          ch / 2,
          0,
          cw / 2,
          ch / 2,
          Math.sqrt(cw * cw + ch * ch) / 2
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "#060010");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      raf.current = requestAnimationFrame(draw);
    };

    const resize = () => setHiDPICanvas(canvas, ctx);
    resize();
    raf.current = requestAnimationFrame(draw);
    addEventListener("resize", resize);
    return () => {
      removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [squareSize, borderColor, vignette, gridOffsetRef]);

  return <canvas ref={canvasRef} className={`block h-full w-full border-none ${className}`} />;
};

interface HoverProps {
  squareSize: number;
  hoverFillColor: string | CanvasGradient | CanvasPattern;
  hoverStrokeColor: string | CanvasGradient | CanvasPattern;
  hoverGlowColor: string | CanvasGradient | CanvasPattern;
  gridOffsetRef: React.MutableRefObject<Offset>;
  className?: string;
}

const SquaresInteractive: React.FC<HoverProps> = ({
  squareSize,
  hoverFillColor   = "rgba(37,99,235,0.25)",  
  hoverStrokeColor = "rgba(37,99,235,0.8)",   
  hoverGlowColor   = "rgba(37,99,235,0.45)", 
  gridOffsetRef,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<{ x: number; y: number } | null>(null);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.pointerEvents = "auto";
    canvas.style.cursor = "crosshair";
    canvas.style.background = "transparent";

    const draw = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      if (hoveredRef.current) {
        const { x: gx, y: gy } = hoveredRef.current;
        const origin = originFromOffset(gridOffsetRef.current, squareSize);

        const cellX = origin.x + gx * squareSize;
        const cellY = origin.y + gy * squareSize;

        // glow + fill
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = hoverGlowColor as string;
        ctx.fillStyle = hoverFillColor as string;
        ctx.fillRect(cellX, cellY, squareSize, squareSize);
        ctx.restore();

        // border
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = hoverStrokeColor as string;
        ctx.strokeRect(cellX + 0.5, cellY + 0.5, squareSize - 1, squareSize - 1);

        // inner sheen
        const grad = ctx.createLinearGradient(cellX, cellY, cellX, cellY + squareSize);
        grad.addColorStop(0, "rgba(255,255,255,0.20)");
        grad.addColorStop(1, "rgba(255,255,255,0.05)");
        ctx.fillStyle = grad;
        ctx.fillRect(cellX, cellY, squareSize, squareSize);
      }

      raf.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const origin = originFromOffset(gridOffsetRef.current, squareSize);
      const gx = Math.floor((mouseX - origin.x) / squareSize);
      const gy = Math.floor((mouseY - origin.y) / squareSize);
      hoveredRef.current = { x: gx, y: gy };
    };

    const onMouseLeave = () => {
      hoveredRef.current = null;
    };

    const resize = () => {
      setHiDPICanvas(canvas, ctx);
    };

    resize();
    raf.current = requestAnimationFrame(draw);

    addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [squareSize, hoverFillColor, hoverStrokeColor, hoverGlowColor, gridOffsetRef]);

  return <canvas ref={canvasRef} className={`block h-full w-full border-none ${className}`} />;
};

/* =========================
   Final combined component
   ========================= */
type Direction = "right" | "left" | "up" | "down" | "diagonal";

interface CombinedProps {
  showGrid?: boolean;
  direction?: Direction;
  speed?: number;
  squareSize?: number;

  // Grid styling
  borderColor?: string;
  vignette?: boolean;

  // Hover styling
  hoverFillColor?: string;
  hoverStrokeColor?: string;
  hoverGlowColor?: string;

  className?: string;
}

export default function SquaresBackground({
  showGrid = true,
  direction = "diagonal",
  speed = 0.6,
  squareSize = 44,
  borderColor = "rgba(255,255,255,0.12)",
  vignette = true,
  hoverFillColor   = "rgba(37,99,235,0.03)", 
  hoverStrokeColor = "rgba(148,163,184,0.10)",
  hoverGlowColor   = "rgba(37,99,235,0.15)", 
  className = "",
}: CombinedProps) {
  const gridOffsetRef = useRef<Offset>({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  // Single animation loop for the offset shared by both canvases
  useEffect(() => {
    const tick = () => {
      const v = Math.max(speed, 0.1);
      const s = squareSize;
      switch (direction) {
        case "right":
          gridOffsetRef.current.x = (gridOffsetRef.current.x - v + s) % s;
          break;
        case "left":
          gridOffsetRef.current.x = (gridOffsetRef.current.x + v + s) % s;
          break;
        case "up":
          gridOffsetRef.current.y = (gridOffsetRef.current.y + v + s) % s;
          break;
        case "down":
          gridOffsetRef.current.y = (gridOffsetRef.current.y - v + s) % s;
          break;
        case "diagonal":
        default:
          gridOffsetRef.current.x = (gridOffsetRef.current.x - v + s) % s;
          gridOffsetRef.current.y = (gridOffsetRef.current.y - v + s) % s;
          break;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [direction, speed, squareSize]);

  return (
    <div className={`fixed inset-0 z-50 bg-neutral-950 ${className}`}>
      {/* soft spotlight tone */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_620px_at_50%_200px,rgba(37,99,235,0.35),transparent_70%)]" />

      {/* grid layer (optional) */}
      {showGrid && (
        <div className="absolute inset-0 z-10">
          <MovingGrid
            squareSize={squareSize}
            borderColor={borderColor}
            vignette={vignette}
            gridOffsetRef={gridOffsetRef}
          />
        </div>
      )}

      {/* interactive hover cell (always on) */}
      <div className="absolute inset-0 z-20">
        <SquaresInteractive
          squareSize={squareSize}
          hoverFillColor={hoverFillColor}
          hoverStrokeColor={hoverStrokeColor}
          hoverGlowColor={hoverGlowColor}
          gridOffsetRef={gridOffsetRef}
        />
      </div>

      {/* grain + bottom vignette */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <Noise refresh={2} alpha={18} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
}

