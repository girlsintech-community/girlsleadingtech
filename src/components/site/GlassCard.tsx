import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  glow?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, strong, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl p-6 transition-all duration-300",
        strong ? "glass-strong" : "glass",
        glow ? "shadow-glow hover:shadow-lavender" : "shadow-soft",
        "hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";
