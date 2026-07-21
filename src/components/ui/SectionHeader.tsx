import { Reveal } from "./Stagger";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center", dark }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "mx-auto mb-16 max-w-2xl text-center" : "mb-16 max-w-2xl",
        dark && "text-white",
      )}
    >
      <span
        className={cn(
          "section-eyebrow shimmer-badge",
          dark && "border-white/20 bg-white/10 text-white/80",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight",
          dark ? "text-white" : "text-brand-950",
        )}
      >
        {title}
      </h2>
      {align === "center" && <div className="section-title-line" />}
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/55" : "text-brand-800/60",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
