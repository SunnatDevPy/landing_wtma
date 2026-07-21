import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";
import { Button } from "@/components/ui/Button";
import { GlowOrbs } from "@/components/ui/GlowOrbs";
import { SlideReveal } from "@/components/ui/SlideReveal";
export function MidCTA() {
  const { t } = useI18n();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SlideReveal from="left">
          <div className="premium-hero-v2 animated-border shine-border relative overflow-hidden">
            <GlowOrbs variant="dark" />
            <div className="hero-mesh opacity-30" aria-hidden />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">
                  {t.midCta.eyebrow}
                </p>
                <h2 className="mt-3 max-w-lg text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {t.midCta.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                  {t.midCta.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Button
                  href={CONTACT.telegramHref}
                  external
                  className="!bg-white !text-brand-900 hover:!bg-white/90"
                  icon={<ArrowRightIcon className="size-3.5" />}
                >
                  {t.midCta.cta}
                </Button>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <PhoneIcon className="size-4" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>          </div>
        </SlideReveal>
      </div>
    </section>
  );
}
