import React from "react";

type GridBackgroundProps = {
  className?: string;
  gridSize?: string;
  gridColor?: string;
  gridColorY?: string;
  gridColorX?: string;
  gridOpacity?: number;
  showDefaultGlows?: boolean;
  customGlows?: React.ReactNode;
  zIndex?: string;
};

export default function GridBackground({
  className = "",
  gridSize = "22px 22px",
  gridColor,
  gridColorY,
  gridColorX,
  gridOpacity = 0.6,
  showDefaultGlows = true,
  customGlows,
  zIndex = "z-0",
}: GridBackgroundProps) {
  const defaultYColor = gridColorY || gridColor || "rgba(72, 38, 96, 0.13)";
  const defaultXColor = gridColorX || gridColor || "rgba(160, 100, 200, 0.13)";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${zIndex} ${className}`}>
      {showDefaultGlows && !customGlows && (
        <>
          <div
            className="absolute left-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
            style={{
              background:
                "radial-gradient(circle, rgba(255,120,180,0.28), transparent 75%)",
            }}
          />

          <div
            className="absolute right-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
            style={{
              background:
                "radial-gradient(circle, rgba(240,120,255,0.24), transparent 75%)",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
            }}
          />
        </>
      )}

      {customGlows}

      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${defaultYColor} 1px, transparent 1px),
            linear-gradient(90deg, ${defaultXColor} 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
        }}
      />
    </div>
  );
}