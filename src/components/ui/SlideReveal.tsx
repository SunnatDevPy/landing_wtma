import { motion } from "framer-motion";
import { useMotionPreset } from "@/hooks/useMotionPreset";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SlideRevealProps {
  children: React.ReactNode;
  from: "left" | "right";
  className?: string;
  delay?: number;
}

/** Text/card slides in from left or right — our brand signature motion. */
export function SlideReveal({ children, from, className, delay = 0 }: SlideRevealProps) {
  const { reduce } = useMotionPreset();
  const x = from === "left" ? -48 : 48;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduce ? 0 : x, filter: reduce ? "none" : "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
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
    <SlideReveal from={index % 2 === 0 ? "left" : "right"} className={className} delay={index * 0.06}>
      {children}
    </SlideReveal>
  );
}
