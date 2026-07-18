import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { IMAGES } from "../data/site";

export default function CTA() {
  const { t } = useLanguage();
  return (
    <section className="mx-3 my-8" data-testid="cta-band">
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[4rem]">
        <img src={IMAGES.cta} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[#0F3D14]/80" />
        <div className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#FFC107]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/85"
          >
            {t("cta.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10"
          >
            <a href="/contact" className="btn-gold group text-lg" data-testid="cta-button">
              {t("cta.button")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
