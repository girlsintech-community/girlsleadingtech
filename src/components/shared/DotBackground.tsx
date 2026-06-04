import { useEffect, useRef } from "react";

interface DotBackground {
  dotColor?: string;
  dotSize?: number;
  gridSize?: number;
}

export default function PixelGridBackground({
  dotColor = "rgba(180, 55, 120, 0.18)",
  dotSize = 2.5,
  gridSize = 28,
}: DotBackground) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.fillStyle = dotColor;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [dotColor, dotSize, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}