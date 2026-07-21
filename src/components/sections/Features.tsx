import { ArrowRightIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { EASE } from "@/hooks/useMotionPreset";
import { motion } from "framer-motion";

const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => (
            <CornerReveal key={item.title} corner={CORNERS[i % 4]} delay={(i % 3) * 0.1}>
              <motion.article
                whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
                className="group finovia-card flex h-full flex-col"
              >
                <span className="mb-3 text-xs font-bold text-brand-500">
                  #{t.features.hashtags[i % t.features.hashtags.length]}
                </span>
                <h3 className="text-lg font-semibold text-brand-950">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-800/60">{item.desc}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all duration-300 hover:gap-2.5"
                >
                  {t.features.learnMore}
                  <ArrowRightIcon className="size-3.5" />
                </a>
              </motion.article>
            </CornerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
