import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BezelCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: boolean;
}

/** Double-bezel nested card — machined hardware feel. */
export function BezelCard({ children, className, innerClassName, glow }: BezelCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-brand-800/5 p-1.5 ring-1 ring-brand-800/10",
        glow && "shadow-[0_0_60px_-12px_rgba(59,84,141,0.25)]",
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface BezelCardDarkProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: boolean;
}

export function BezelCardDark({ children, className, innerClassName, glow }: BezelCardDarkProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-white/10 p-1.5 ring-1 ring-white/10",
        glow && "shadow-[0_0_80px_-16px_rgba(59,84,141,0.4)]",
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
