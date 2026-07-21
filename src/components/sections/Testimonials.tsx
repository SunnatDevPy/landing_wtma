import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BezelCard } from "@/components/ui/BezelCard";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { cn } from "@/lib/utils";
import { EASE } from "@/hooks/useMotionPreset";

const CORNERS = ["top-left", "top-right", "bottom-left"] as const;

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-brand-600/5 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div className="space-y-4">
          {t.testimonials.items.map((item, i) => (
            <CornerReveal key={item.author} corner={CORNERS[i]} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}>
                <BezelCard glow={i === 1} innerClassName="p-6 sm:p-8 transition-shadow duration-300 hover:shadow-xl">
                  <div
                    className={cn(
                      "flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8",
                      i % 2 !== 0 && "sm:flex-row-reverse sm:text-right",
                    )}
                  >
                    <QuoteIcon className="size-10 shrink-0 text-brand-500/25" />
                    <div className="flex-1">
                      <p className="text-base leading-relaxed text-brand-800/70 sm:text-lg">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <div
                        className={cn(
                          "mt-5 flex items-center gap-3",
                          i % 2 !== 0 && "sm:flex-row-reverse",
                        )}
                      >
                        <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-sm font-bold text-white">
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-950">{item.author}</p>
                          <p className="text-xs text-brand-700/50">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </BezelCard>
              </motion.div>
            </CornerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
