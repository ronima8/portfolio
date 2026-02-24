"use client";

import { useEffect, useRef, useState } from "react";

type HexCell = {
  x: number;
  y: number;
};

const CONFIG = {
  hexRadius: 26,
  glowRadius: 180,
  baseAlpha: 0.16,
  maxAlphaBoost: 0.58,
  baseLineWidth: 1,
  maxLineWidthBoost: 1.5,
  driftLerp: 0.12,
  pulseSpeed: 0.0012,
  pulseAmplitude: 0.05,
  fillAlpha: 0.22,
  baseStroke: { r: 93, g: 255, b: 180 },
  fillColor: { r: 15, g: 17, b: 21 }
} as const;

function buildHexGrid(width: number, height: number, radius: number): HexCell[] {
  const cells: HexCell[] = [];
  const dx = Math.sqrt(3) * radius;
  const dy = 1.5 * radius;

  for (let row = -1, y = -radius; y < height + radius * 2; row += 1, y += dy) {
    const offsetX = row % 2 === 0 ? 0 : dx / 2;
    for (let x = -radius; x < width + radius * 2; x += dx) {
      cells.push({ x: x + offsetX, y });
    }
  }

  return cells;
}

function drawHex(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const px = x + radius * Math.cos(angle);
    const py = y + radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let cells: HexCell[] = [];
    let dpr = 1;

    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000
    };

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = buildHexGrid(width, height, CONFIG.hexRadius);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
    };

    const onPointerLeave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    const render = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * CONFIG.driftLerp;
      pointer.y += (pointer.targetY - pointer.y) * CONFIG.driftLerp;

      ctx.clearRect(0, 0, width, height);

      const pulse = (Math.sin(time * CONFIG.pulseSpeed) + 1) * 0.5;
      const alphaPulse = pulse * CONFIG.pulseAmplitude;

      for (const cell of cells) {
        const dx = cell.x - pointer.x;
        const dy = cell.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - distance / CONFIG.glowRadius);
        const glow = proximity * proximity;

        const strokeAlpha = CONFIG.baseAlpha + alphaPulse + glow * CONFIG.maxAlphaBoost;
        const lineWidth = CONFIG.baseLineWidth + glow * CONFIG.maxLineWidthBoost;

        drawHex(ctx, cell.x, cell.y, CONFIG.hexRadius);

        ctx.fillStyle = `rgba(${CONFIG.fillColor.r}, ${CONFIG.fillColor.g}, ${CONFIG.fillColor.b}, ${CONFIG.fillAlpha})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(${CONFIG.baseStroke.r}, ${CONFIG.baseStroke.g}, ${CONFIG.baseStroke.b}, ${strokeAlpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      rafId = window.requestAnimationFrame(render);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    rafId = window.requestAnimationFrame(render);

    const visibilityFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(visibilityFrame);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    />
  );
}