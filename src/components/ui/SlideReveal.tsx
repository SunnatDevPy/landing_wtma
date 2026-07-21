import { motion } from "framer-motion";
import { EASE, MOTION, useMotionPreset } from "@/hooks/useMotionPreset";

interface SlideRevealProps {
  children: React.ReactNode;
  from: "left" | "right";
  className?: string;
  delay?: number;
}

/** Text/card slides in from left or right — our brand signature motion. */
export function SlideReveal({ children, from, className, delay = 0 }: SlideRevealProps) {
  const { reduce } = useMotionPreset();
  const x = from === "left" ? -36 : 36;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduce ? 0 : x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={MOTION.viewport}
      transition={{ duration: MOTION.duration.normal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface AlternatingRowProps {
  index: number;
  children: React.ReactNode;
  className?: string;
}

export function AlternatingSlide({ index, children, className }: AlternatingRowProps) {
  return (
    <SlideReveal from={index % 2 === 0 ? "left" : "right"} className={className} delay={index * 0.1}>
      {children}
    </SlideReveal>
  );
}
