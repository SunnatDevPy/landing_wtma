import { useI18n } from "@/i18n/I18nContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BezelCard } from "@/components/ui/BezelCard";
import { Marquee } from "@/components/ui/Marquee";
import { SlideReveal } from "@/components/ui/SlideReveal";
import { cn } from "@/lib/utils";

const IMAGES = [
  "/images/process-fabrics.png",
  "/images/process-consultation.png",
  "/images/process-partnership.png",
];

export function TeamFace() {
  const { t } = useI18n();

  return (
    <section id="team" className="relative overflow-hidden bg-white/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          subtitle={t.team.subtitle}
        />

        {/* Finovia team name marquee */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-brand-800/8 bg-brand-950 py-5">
          <Marquee speed="slow">
            {t.team.marquee.map((member, i) => (
              <span
                key={`${member.name}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap px-4"
              >
                <span className="text-base font-semibold text-white sm:text-lg">{member.name}</span>
                <span className="text-sm text-brand-500">{member.role}</span>
                <span className="text-white/20" aria-hidden>
                  •
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {t.team.items.map((item, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <div
                key={item.title}
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                  !imageFirst && "lg:[&>*:first-child]:order-2",
                )}
              >
                <SlideReveal from={imageFirst ? "left" : "right"}>
                  <BezelCard glow innerClassName="overflow-hidden">
                    <img
                      src={IMAGES[i]}
                      alt={item.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </BezelCard>
                </SlideReveal>

                <SlideReveal from={imageFirst ? "right" : "left"} delay={0.1}>
                  <div className="lg:px-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-brand-800/65 sm:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </SlideReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
