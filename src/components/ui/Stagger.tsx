import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE, MOTION, useMotionPreset } from "@/hooks/useMotionPreset";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.stagger } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration.normal, ease: EASE },
  },
};

export function StaggerContainer({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION.viewport}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

export function Reveal({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const { distance, reduce } = useMotionPreset();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={MOTION.viewport}
      transition={{ duration: MOTION.duration.slow, delay, ease: EASE }}
      style={{ willChange: reduce ? undefined : "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
