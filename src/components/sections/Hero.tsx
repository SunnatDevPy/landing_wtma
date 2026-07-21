import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircle2Icon, StarIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { CONTACT } from "@/config/contact";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HashtagOrbit } from "@/components/ui/CornerReveal";
import { EASE } from "@/hooks/useMotionPreset";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[92dvh] overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16">
      <Atmosphere />

      {/* Rotating # orbit — decorative background */}
      <div
        className="pointer-events-none absolute -right-24 top-28 opacity-[0.35] sm:-right-16 sm:top-24 lg:right-8 lg:opacity-45"
        aria-hidden
      >
        <HashtagOrbit tags={t.hero.orbitTags} className="scale-[0.55] sm:scale-[0.65] lg:scale-75" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500"
            >
              {t.hero.boost}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              className="mt-4 text-4xl font-bold leading-[1.06] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.75rem]"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-relaxed text-brand-800/65 sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button
                href={CONTACT.telegramHref}
                external
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
            initial={{ opacity: 0, x: 48, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-600/20 to-brand-500/10 blur-2xl" />
            <BezelCard glow innerClassName="overflow-hidden">
              <img
                src="/images/hero-team.png"
                alt={t.hero.imageAlt}
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
              <div className="flex items-center justify-between border-t border-brand-800/8 bg-white/90 px-5 py-4 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-semibold text-brand-900">{t.hero.imageCaption}</p>
                  <p className="mt-0.5 text-xs text-brand-700/55">{t.hero.imageSub}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-1">
                  <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-800">{t.hero.rating}</span>
                </div>
              </div>
            </BezelCard>
          </motion.div>
        </div>

        {/* Finovia-style soft stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-brand-800/8 pt-10 sm:grid-cols-4"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-medium text-brand-700/50">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-brand-900 sm:text-3xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
            </div>
          ))}
          <div className="col-span-2 flex flex-col justify-center sm:col-span-1">
            <p className="text-xs font-medium text-brand-700/50">{t.hero.ratingLabel}</p>
            <div className="mt-1 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm font-bold text-brand-900">{t.hero.rating}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
        >
          {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-700/65"
            >
              <CheckCircle2Icon className="size-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
