import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n";
import { IMAGES, HERO_BADGES } from "../data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative mx-3 mt-3 flex min-h-[96vh] flex-col justify-end overflow-hidden rounded-[2rem] pb-16 sm:rounded-b-[4rem]"
      data-testid="hero-section"
    >
      {/* Background image with slow zoom-out */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.14, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img src={IMAGES.hero} alt="African farmland at golden hour" className="h-full w-full object-cover" />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D14] via-[#0F3D14]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D14]/65 via-[#0F3D14]/20 to-transparent" />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#FFC107]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
            <span className="h-2 w-2 rounded-full bg-[#FFC107]" />
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1 variants={item} className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
            {t("hero.title1")}
            <br />
            <span className="text-[#FFC107]">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            {t("hero.description")}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/contact" className="btn-gold group" data-testid="hero-cta-button">
              {t("hero.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/services" className="rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20" data-testid="hero-services-button">
              {t("hero.cta2")}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-14 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {HERO_BADGES.map((b, i) => (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
              >
                <b.icon className="h-5 w-5 flex-shrink-0 text-[#FFC107]" />
                <span className="text-sm font-medium leading-tight text-white">{t(b.key)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">{t("hero.scroll")}</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
