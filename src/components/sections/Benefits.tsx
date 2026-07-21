import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BezelCard } from "@/components/ui/BezelCard";
import { CornerReveal, HashtagOrbit } from "@/components/ui/CornerReveal";

const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

export function Benefits() {
  const { t } = useI18n();

  return (
    <section id="benefits" className="relative overflow-hidden bg-white/60 py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-20 size-64 rounded-full bg-brand-500/5 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-32 bottom-20 size-64 rounded-full bg-brand-600/5 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.benefits.eyebrow}
          title={t.benefits.title}
          subtitle={t.benefits.subtitle}
        />

        {/* Orbit + corner cards layout */}
        <div className="relative mx-auto mt-8 max-w-4xl">
          {/* Desktop: orbit center with cards at corners */}
          <div className="hidden min-h-[520px] md:block">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <HashtagOrbit tags={t.benefits.hashtags} />
            </div>

            <div className="relative grid min-h-[520px] grid-cols-2 grid-rows-2 gap-6">
              {t.benefits.items.map((item, i) => (
                <CornerReveal
                  key={item.title}
                  corner={CORNERS[i]}
                  delay={0.15 + i * 0.12}
                  className={i % 2 === 1 ? "justify-self-end" : "justify-self-start"}
                >
                  <BezelCard innerClassName="max-w-[280px] p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-brand-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-800/60">{item.desc}</p>
                  </BezelCard>
                </CornerReveal>
              ))}
            </div>
          </div>

          {/* Mobile: stacked with corner reveal */}
          <div className="space-y-4 md:hidden">
            <div className="mb-8 flex justify-center">
              <HashtagOrbit tags={t.benefits.hashtags} className="scale-75" />
            </div>
            {t.benefits.items.map((item, i) => (
              <CornerReveal key={item.title} corner={CORNERS[i]} delay={i * 0.1}>
                <BezelCard innerClassName="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                    #{t.benefits.hashtags[i]}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-brand-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-800/60">{item.desc}</p>
                </BezelCard>
              </CornerReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
