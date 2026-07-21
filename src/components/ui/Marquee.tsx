import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}

const speedMap = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
};

/** Finovia-style infinite horizontal scroll. */
export function Marquee({ children, className, reverse, speed = "normal" }: MarqueeProps) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8",
          speedMap[speed],
          reverse && "animate-marquee-reverse",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

interface TickerItem {
  label: string;
}

export function KeywordTicker({ items, className }: { items: ReadonlyArray<TickerItem>; className?: string }) {
  return (
    <div className={cn("border-y border-brand-800/8 bg-brand-950 py-5", className)}>
      <Marquee speed="slow">
        {items.map((item, i) => (
          <span key={`${item.label}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80 sm:text-base">
              {String(i + 1).padStart(2, "0")}. {item.label}
            </span>
            <span className="text-brand-500/60" aria-hidden>
              /
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function LogoTicker({ labels, className }: { labels: readonly string[]; className?: string }) {
  return (
    <div className={cn("border-y border-brand-800/8 bg-white/80 py-6 backdrop-blur-sm", className)}>
      <Marquee speed="slow">
        {labels.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex h-12 min-w-[140px] items-center justify-center rounded-xl border border-brand-800/10 bg-white px-6 shadow-sm"
          >
            <span className="text-sm font-bold tracking-tight text-brand-800/50">{label}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
