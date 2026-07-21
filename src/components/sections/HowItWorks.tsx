import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { GlowOrbs } from "@/components/ui/GlowOrbs";
import { EASE } from "@/hooks/useMotionPreset";

const CORNERS = ["top-left", "top-right", "bottom-left"] as const;

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <GlowOrbs variant="dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(230,46,82,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.howItWorks.eyebrow}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
          dark
        />

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent md:block"
            aria-hidden
          />

          {t.howItWorks.steps.map((step, i) => (
            <CornerReveal key={step.title} corner={CORNERS[i]} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3, ease: EASE } }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-500/30 hover:bg-white/8 hover:shadow-[0_20px_50px_-12px_rgba(230,46,82,0.2)]"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-500/20 text-lg font-bold text-brand-500 ring-1 ring-brand-500/30 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
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
