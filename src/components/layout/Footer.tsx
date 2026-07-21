import { ArrowUpRightIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";

export function Footer() {
  const { t, locale } = useI18n();

  const links = [
    { id: "features", label: t.nav.features },
    { id: "how-it-works", label: t.nav.howItWorks },
    { id: "team", label: t.nav.team },
    { id: "benefits", label: t.nav.benefits },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,84,141,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <img src="/logo.svg" alt="WTMA" className="mb-5 h-10 brightness-0 invert" />
            <p className="max-w-sm text-sm leading-relaxed text-white/55">{t.footer.tagline}</p>
            <a
              href={CONTACT.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              {t.nav.cta}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.footer.links}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.telegram}
                </a>
              </li>
              <li className="text-white/45">
                {CONTACT.address[locale]}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 text-center text-xs text-white/35">
          © {new Date().getFullYear()} WTMA — World Textile Marketing Agency. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
