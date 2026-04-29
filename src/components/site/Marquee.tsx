import * as React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-6"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
