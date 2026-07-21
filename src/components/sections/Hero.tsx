import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircle2Icon, MessageCircleIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HashtagOrbit } from "@/components/ui/CornerReveal";
import { GlowOrbs } from "@/components/ui/GlowOrbs";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { EASE, MOTION } from "@/hooks/useMotionPreset";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[92dvh] overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24">
      <Atmosphere />
      <GlowOrbs />

      {/* Fon bezak: # teglar halqada aylanadi (dekorativ, bosib bo'lmaydi) */}
      <div
        className="pointer-events-none absolute -right-20 top-24 hidden opacity-40 lg:block"
        aria-hidden
      >
        <HashtagOrbit tags={t.hero.orbitTags} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION.duration.normal, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                {t.hero.boost}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: MOTION.duration.slow, delay: 0.15, ease: EASE }}
              className="mt-5 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.75rem]"
            >
              <span className="text-gradient-hero">{t.hero.title}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: MOTION.duration.normal, delay: 0.35, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-relaxed text-brand-800/65 sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: MOTION.duration.normal, delay: 0.5, ease: EASE }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button
                href={CONTACT.telegramHref}
                external
                className="pulse-glow"
                icon={<ArrowRightIcon className="size-3.5" />}
              >
                {t.hero.ctaPrimary}
              </Button>
              <Button href="#team" variant="secondary">
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: MOTION.duration.slow, delay: 0.4, ease: EASE }}
            className="relative"
          >
            <div className="animate-float">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-500/25 via-brand-600/15 to-transparent blur-3xl" />
            <div className="absolute -right-4 -top-4 z-10 rounded-2xl border border-white/80 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-500">WTMA</p>
              <p className="text-xs font-semibold text-brand-900">Toshkent</p>
            </div>
            <BezelCard glow innerClassName="overflow-hidden ring-1 ring-brand-800/5">
              <img
                src="/images/hero-team.png"
                alt={t.hero.imageAlt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
              />
              <div className="flex items-center justify-between border-t border-brand-800/8 bg-gradient-to-r from-white to-brand-50/50 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-brand-900">{t.hero.imageCaption}</p>
                  <p className="mt-0.5 text-xs text-brand-700/55">{t.hero.imageSub}</p>
                </div>
                <a
                  href={CONTACT.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-brand-50 px-2.5 py-1 shadow-sm transition-colors hover:bg-brand-100"
                >
                  <MessageCircleIcon className="size-3 text-brand-600" />
                  <span className="text-xs font-semibold text-brand-800">{t.hero.highlight}</span>
                </a>
              </div>
            </BezelCard>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.normal, delay: 0.7, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="hero-stat-pill">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-700/45">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-brand-900 sm:text-3xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
            </div>
          ))}
          <div className="hero-stat-pill col-span-2 flex flex-col justify-center sm:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-700/45">
              {t.hero.highlightLabel}
            </p>
            <p className="mt-1 text-sm font-bold text-brand-900 sm:text-base">{t.hero.highlight}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION.duration.normal, delay: 0.95, ease: EASE }}
          className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
        >
          {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-full border border-brand-800/8 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-700/70 backdrop-blur-sm"
            >
              <CheckCircle2Icon className="size-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}
