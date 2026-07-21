import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

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

/** Content emerges from a corner with subtle rotation — signature WTMA motion. */
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface HashtagOrbitProps {
  tags: readonly string[];
  className?: string;
}

/** Strip leading # so tags render consistently. */
function formatTag(tag: string) {
  return tag.startsWith("#") ? tag.slice(1) : tag;
}

/** Slowly rotating # tags ring — decorative center element. */
export function HashtagOrbit({ tags, className }: HashtagOrbitProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer ring */}
      <div className="absolute size-[280px] rounded-full border border-dashed border-brand-600/15 sm:size-[360px]" />
      <div className="absolute size-[220px] rounded-full border border-brand-500/10 sm:size-[280px]" />

      {/* Rotating tag orbit */}
      <motion.div
        className="absolute size-[280px] sm:size-[360px]"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {tags.map((tag, i) => {
          const angle = (i / tags.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const radius = 140;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const label = formatTag(tag);

          return (
            <motion.span
              key={tag}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <span className="inline-flex items-center gap-0.5 rounded-full border border-brand-600/20 bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur-sm sm:text-sm">
                <span className="text-brand-500">#</span>
                {label}
              </span>
            </motion.span>
          );
        })}
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute size-[180px] rounded-full border border-brand-500/20 sm:size-[220px]"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Center dot */}
      <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg shadow-brand-600/30 sm:size-20">
        <span className="text-lg font-bold text-white sm:text-xl">W</span>
      </div>
    </div>
  );
}
