import { cn } from "@/lib/utils";

interface GlowOrbsProps {
  className?: string;
  variant?: "light" | "dark";
}

/** Floating ambient orbs — depth without clutter. */
export function GlowOrbs({ className, variant = "light" }: GlowOrbsProps) {
  const a = variant === "dark" ? "bg-brand-500/20" : "bg-brand-500/15";
  const b = variant === "dark" ? "bg-brand-600/25" : "bg-brand-600/12";

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className={cn("glow-orb absolute -left-16 top-1/4 size-64 rounded-full blur-3xl", a)} />
      <div className={cn("glow-orb glow-orb--delay absolute -right-20 bottom-1/4 size-72 rounded-full blur-3xl", b)} />
      <div className={cn("glow-orb glow-orb--slow absolute left-1/2 top-0 hidden size-48 -translate-x-1/2 rounded-full blur-3xl lg:block", a)} />
    </div>
  );
}
