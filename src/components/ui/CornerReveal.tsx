import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, MOTION } from "@/hooks/useMotionPreset";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_ORIGIN: Record<Corner, string> = {
  "top-left": "top left",
  "top-right": "top right",
  "bottom-left": "bottom left",
  "bottom-right": "bottom right",
};

const CORNER_INITIAL: Record<Corner, { x: number; y: number; rotate: number }> = {
  "top-left": { x: -40, y: -40, rotate: -12 },
  "top-right": { x: 40, y: -40, rotate: 12 },
  "bottom-left": { x: -40, y: 40, rotate: 12 },
  "bottom-right": { x: 40, y: 40, rotate: -12 },
};

interface CornerRevealProps {
  corner: Corner;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll qilganda kontent burchakdan chiqadi — kartalar uchun. */
export function CornerReveal({ corner, children, className, delay = 0 }: CornerRevealProps) {
  const reduce = useReducedMotion();
  const init = CORNER_INITIAL[corner];

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: CORNER_ORIGIN[corner] }}
      initial={{
        opacity: 0,
        x: reduce ? 0 : init.x,
        y: reduce ? 0 : init.y,
        rotate: reduce ? 0 : init.rotate,
        scale: reduce ? 1 : 0.92,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={MOTION.viewport}
      transition={{ duration: MOTION.duration.slow, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface HashtagOrbitProps {
  tags: readonly string[];
  className?: string;
}

function formatTag(tag: string) {
  return tag.startsWith("#") ? tag.slice(1) : tag;
}

/**
 * Markazda W, atrofida sekin aylanadigan # teglar.
 * Tashqi halqa aylanadi, teglar o'qilishi uchun ichkarida teskari aylanadi.
 */
export function HashtagOrbit({ tags, className }: HashtagOrbitProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex size-[260px] items-center justify-center sm:size-[320px]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-brand-600/15" />
      <div className="absolute inset-8 rounded-full border border-brand-500/10 sm:inset-10" />

      {/* CSS aylanish — Framer Motion dan yengilroq, qotish kam */}
      <div className={cn("orbit-ring absolute inset-0", reduce && "orbit-ring--paused")}>
        {tags.map((tag, i) => {
          const angle = (i / tags.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 46;
          const left = 50 + Math.cos(rad) * radius;
          const top = 50 + Math.sin(rad) * radius;

          return (
            <div
              key={tag}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className={cn("orbit-tag", reduce && "orbit-tag--paused")}>
                <span className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full border border-brand-600/20 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-700 shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">
                  <span className="text-brand-500">#</span>
                  {formatTag(tag)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Markaz — WTMA */}
      <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg shadow-brand-600/25 sm:size-16">
        <span className="text-base font-bold text-white sm:text-lg">W</span>
      </div>
    </div>
  );
}
