{/* card used for testimonials */}

import type { CSSProperties, ReactNode } from "react";

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function RetroCard({
  children,
  className = "",
  style,
}: RetroCardProps) {
  return (
    <div
      className={`
        flex flex-col
        rounded-[16px]
        overflow-hidden
        border-2 border-black
        bg-[#ffc8e3]
        w-[320px] h-[340px]
        shrink-0
        transition-all duration-300 ease-out
        hover:scale-[1.05]
        hover:z-30
        hover:shadow-[0_20px_40px_rgba(217,85,164,0.25),_0_8px_16px_rgba(0,0,0,0.12)]
        relative
        z-10
        ${className}
      `}
      style={{
        boxShadow:
          "0 8px 24px rgba(217,85,164,0.12), 0 4px 10px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {/* YELLOW BAR */}
      <div
        className="w-full flex items-center shrink-0 bg-[#ffed95] border-b-2 border-black px-4"
        style={{
          minHeight: "36px",
          height: "36px",
          gap: 8,
        }}
      >
        {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
          <span
            key={i}
            className="rounded-full shrink-0 border border-black/10"
            style={{
              width: 10,
              height: 10,
              background: c,
            }}
          />
        ))}
      </div>

      <div className="flex-1 bg-[#ffc8e3]">
        {children}
      </div>
    </div>
  );
}