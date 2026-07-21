import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { EASE } from "@/hooks/useMotionPreset";

const CORNERS = ["top-left", "top-right", "bottom-left"] as const;

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(230,46,82,0.3), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.howItWorks.eyebrow}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
          dark
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {t.howItWorks.steps.map((step, i) => (
            <CornerReveal key={step.title} corner={CORNERS[i]} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
                className="group relative"
              >
                <span className="text-6xl font-bold tabular-nums text-white/10 transition-colors duration-500 group-hover:text-brand-500/30 sm:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.desc}</p>
                <div className="mt-6 h-px w-12 bg-brand-500/60 transition-all duration-500 group-hover:w-full group-hover:bg-brand-500" />
              </motion.div>
            </CornerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
