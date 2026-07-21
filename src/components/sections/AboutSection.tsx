import { ArrowRightIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { CornerReveal } from "@/components/ui/CornerReveal";
import { SlideReveal } from "@/components/ui/SlideReveal";

const CORNERS = ["top-left", "bottom-right"] as const;

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="bg-white/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SlideReveal from="left">
            <BezelCard glow innerClassName="overflow-hidden">
              <img
                src="/images/process-consultation.png"
                alt={t.about.title}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </BezelCard>
          </SlideReveal>

          <SlideReveal from="right" delay={0.1}>
            <span className="section-eyebrow">{t.about.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-800/65 sm:text-lg">
              {t.about.desc}
            </p>
            <Button href="#contact" className="mt-8" icon={<ArrowRightIcon className="size-3.5" />}>
              {t.about.cta}
            </Button>

            <div className="mt-10 space-y-5">
              {t.about.highlights.map((item, i) => (
                <CornerReveal key={item.title} corner={CORNERS[i]} delay={0.15 + i * 0.1}>
                  <div className="rounded-xl border border-brand-800/8 bg-white p-5 shadow-sm">
                    <h3 className="font-semibold text-brand-950">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-800/60">{item.desc}</p>
                  </div>
                </CornerReveal>
              ))}
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
}
