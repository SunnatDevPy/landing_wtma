import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Stagger";

export function ContactCTA() {
  const { t, locale } = useI18n();

  const contactItems = [
    { icon: PhoneIcon, label: t.contact.phone, value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: MailIcon, label: t.contact.email, value: CONTACT.email, href: CONTACT.emailHref },
    { icon: SendIcon, label: t.contact.telegram, value: CONTACT.telegram, href: CONTACT.telegramHref },
    { icon: MapPinIcon, label: t.contact.address, value: CONTACT.address[locale], href: undefined },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="premium-hero shine-border relative overflow-hidden">
          <div className="hero-mesh opacity-50" aria-hidden />
          <div className="hero-aurora opacity-40" aria-hidden />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {t.contact.eyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
                {t.contact.subtitle}
              </p>
              <Button
                href={CONTACT.telegramHref}
                external
                className="mt-9 !bg-white !text-brand-900 !shadow-white/20 hover:!bg-white/90"
                icon={<ArrowUpRightIcon className="size-3.5" />}
              >
                {t.contact.cta}
              </Button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-3">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-105">
                      <item.icon className="size-4 text-white/80" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white/45">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-white transition-colors hover:text-cyan-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
