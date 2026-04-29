import { cn } from "@/lib/utils";

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="bg-mesh absolute inset-0" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-soft blur-3xl opacity-60 animate-float" />
      <div
        className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-lavender blur-3xl opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-peach blur-3xl opacity-50 animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

export function Sparkles() {
  const dots = Array.from({ length: 12 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/80 animate-shimmer"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            animationDelay: `${i * 0.4}s`,
            boxShadow: "0 0 8px oklch(1 0 0 / 0.8)",
          }}
        />
      ))}
    </div>
  );
}
