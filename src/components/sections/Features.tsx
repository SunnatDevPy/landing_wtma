import { ArrowRightIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { GlowOrbs } from "@/components/ui/GlowOrbs";
import { EASE } from "@/hooks/useMotionPreset";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
const BENTO = ["bento-featured", "", "", "", "", "bento-wide"] as const;

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <GlowOrbs className="opacity-60" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => (
            <CornerReveal
              key={item.title}
              corner={CORNERS[i % 4]}
              delay={(i % 3) * 0.1}
              className={cn(BENTO[i] ?? "")}
            >
              <motion.article
                whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
                className={cn(
                  "group spotlight-card finovia-card relative flex h-full flex-col",
                  i === 0 && "lg:p-9",
                )}
              >
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="text-4xl font-bold tabular-nums text-brand-800/10 transition-colors duration-500 group-hover:text-brand-500/25 lg:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-brand-500/20 bg-brand-500/5 px-2.5 py-1 text-[10px] font-bold text-brand-500">
                      #{t.features.hashtags[i % t.features.hashtags.length]}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-semibold text-brand-950",
                      i === 0 ? "text-xl lg:text-2xl" : "text-lg",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 flex-1 leading-relaxed text-brand-800/60",
                      i === 0 ? "text-base" : "text-sm",
                    )}
                  >
                    {item.desc}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all duration-300 hover:gap-2.5"
                  >
                    {t.features.learnMore}
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.article>
            </CornerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
