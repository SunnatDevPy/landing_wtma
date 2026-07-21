import { motion, useReducedMotion } from "framer-motion";
import { MOTION, EASE } from "@/hooks/useMotionPreset";

export function ScrollCue() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: MOTION.duration.normal, ease: EASE }}      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      aria-hidden
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700/40">
        scroll
      </span>
      <motion.div
        className="flex h-10 w-5 items-start justify-center rounded-full border border-brand-800/15 p-1.5"
        animate={reduce ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="size-1 rounded-full bg-brand-500"
          animate={reduce ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
