import { useReducedMotion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function useMotionPreset() {
  const reduce = useReducedMotion();
  return {
    duration: reduce ? 0 : 0.5,
    distance: reduce ? 0 : 16,
    blur: reduce ? 0 : 8,
    ease: EASE,
    reduce: !!reduce,
  };
}
