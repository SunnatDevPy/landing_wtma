import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE, MOTION } from "@/hooks/useMotionPreset";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative size-4">
      <motion.span
        className="absolute left-0 block h-0.5 w-4 rounded-full bg-brand-900"
        animate={open ? { rotate: 45, y: 0, top: "50%" } : { rotate: 0, y: 0, top: "25%" }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ transformOrigin: "center" }}
      />
      <motion.span
        className="absolute left-0 block h-0.5 w-4 rounded-full bg-brand-900"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, top: "50%" }}
        transition={{ duration: 0.2, ease: EASE }}
        style={{ top: "50%" }}
      />
      <motion.span
        className="absolute left-0 block h-0.5 w-4 rounded-full bg-brand-900"
        animate={open ? { rotate: -45, y: 0, top: "50%" } : { rotate: 0, y: 0, top: "75%" }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { id: "features", label: t.nav.features },
    { id: "how-it-works", label: t.nav.howItWorks },
    { id: "team", label: t.nav.team },
    { id: "benefits", label: t.nav.benefits },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, ease: EASE }}
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-700 sm:px-6",
            scrolled
              ? "border-brand-500/15 bg-white/90 shadow-[0_8px_40px_-8px_rgba(230,46,82,0.15)] backdrop-blur-xl"
              : "border-white/40 bg-white/75 shadow-[0_4px_24px_-4px_rgba(15,26,48,0.08)] backdrop-blur-md",
          )}
        >
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.svg" alt="WTMA" className="h-8 w-auto sm:h-9" />
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-brand-800/65 transition-all duration-300 hover:bg-brand-500/8 hover:text-brand-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-brand-800/10 bg-brand-50/60 p-0.5 text-xs font-semibold">
              {(["uz", "ru"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={cn(
                    "rounded-full px-2.5 py-1 uppercase transition-all duration-300",
                    locale === lang
                      ? "bg-white text-brand-900 shadow-sm"
                      : "text-brand-600/60 hover:text-brand-800",
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Button
              href={CONTACT.telegramHref}
              external
              className="hidden !px-4 !py-2 text-xs sm:inline-flex"
              icon={<ArrowUpRightIcon className="size-3" />}
            >
              {t.nav.cta}
            </Button>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-brand-800/10 bg-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-brand-950/70 backdrop-blur-2xl md:hidden"
          >
            <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: MOTION.duration.normal, delay: 0.12 * i, ease: EASE }}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 text-3xl font-semibold tracking-tight text-white transition-colors hover:text-brand-500"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: EASE }}
                className="mt-8"
              >
                <Button
                  href={CONTACT.telegramHref}
                  external
                  icon={<ArrowUpRightIcon className="size-3.5" />}
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav.cta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
