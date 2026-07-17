import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { IMAGES, STATS } from "../data/site";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32" data-testid="about-section">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-[#FFC107]/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_rgba(27,94,32,0.20)]">
              <img src={IMAGES.about} alt="EFASOL farmer" className="h-[30rem] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D14]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-[#1B5E20]/10 bg-white px-6 py-5 shadow-xl">
              <p className="font-display text-3xl font-extrabold text-[#1B5E20]">15+</p>
              <p className="text-sm font-medium text-[#1F2937]/60">{t("about.countries")}</p>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="overline mb-4">{t("about.label")}</p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
              {t("about.title")} <span className="text-[#1B5E20]">{t("about.title2")}</span>
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-[#1B5E20]" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1F2937]/70">{t("about.description")}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`stat-${i}`}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B5E20]/10">
                  <stat.icon className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <p className="font-display text-4xl font-extrabold text-[#1B5E20]">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-[#1F2937]/60">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
