import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/lib/utils";
import { EASE } from "@/hooks/useMotionPreset";

interface StatCardProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  suffix?: string;
  icon: LucideIcon;
  accent: "green" | "blue" | "amber" | "violet" | "cyan";
}

const themes = {
  green: {
    card: "from-emerald-50/90 via-white to-teal-50/50 border-emerald-200/50",
    icon: "border-emerald-200/80 bg-emerald-500/10 text-emerald-600",
    value: "text-emerald-600",
    glow: "stat-card-glow-green",
  },
  blue: {
    card: "from-blue-50/90 via-white to-indigo-50/50 border-blue-200/50",
    icon: "border-blue-200/80 bg-blue-500/10 text-blue-600",
    value: "text-blue-600",
    glow: "stat-card-glow-blue",
  },
  amber: {
    card: "from-amber-50/90 via-white to-yellow-50/50 border-amber-200/50",
    icon: "border-amber-200/80 bg-amber-500/10 text-amber-600",
    value: "text-amber-600",
    glow: "stat-card-glow-amber",
  },
  violet: {
    card: "from-violet-50/90 via-white to-purple-50/50 border-violet-200/50",
    icon: "border-violet-200/80 bg-violet-500/10 text-violet-600",
    value: "text-violet-600",
    glow: "stat-card-glow-violet",
  },
  cyan: {
    card: "from-cyan-50/90 via-white to-sky-50/50 border-cyan-200/50",
    icon: "border-cyan-200/80 bg-cyan-500/10 text-cyan-600",
    value: "text-cyan-600",
    glow: "stat-card-glow-cyan",
  },
};

export function StatCard({ label, value, format, suffix, icon: Icon, accent }: StatCardProps) {
  const th = themes[accent];

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-shadow duration-300 hover:shadow-xl",
        th.card,
        th.glow,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-brand-700/60">{label}</p>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105",
            th.icon,
          )}
        >
          <Icon className="size-4" />
        </div>
      </div>
      <p className={cn("mt-3 text-2xl font-bold tabular-nums tracking-tight sm:text-3xl", th.value)}>
        <AnimatedNumber value={value} format={format} suffix={suffix} />
      </p>
    </motion.div>
  );
}
