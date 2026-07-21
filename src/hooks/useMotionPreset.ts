import { useReducedMotion } from "framer-motion";

/** Yumshoq, sekinroq easing — kamroq "sakrash" hissi */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION = {
  duration: {
    fast: 0.55,
    normal: 1.05,
    slow: 1.3,
    entrance: 1.15,
  },
  stagger: 0.14,
  viewport: { once: true, margin: "-40px" as const },
} as const;

export function useMotionPreset() {
  const reduce = useReducedMotion();
  return {
    duration: reduce ? 0 : MOTION.duration.normal,
    entrance: reduce ? 0 : MOTION.duration.entrance,
    distance: reduce ? 0 : 20,
    ease: EASE,
    reduce: !!reduce,
    stagger: reduce ? 0 : MOTION.stagger,
  };
}
