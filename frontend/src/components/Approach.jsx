import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { APPROACH } from "../data/site";
import Reveal from "./Reveal";

export default function Approach() {
  const { t } = useLanguage();
  return (
    <section id="approach" className="relative overflow-hidden bg-[#0F3D14] py-28 md:py-36" data-testid="approach-section">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#FFC107]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#2E7D32]/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFC107]">{t("approach.eyebrow")}</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {t("approach.title")} <span className="text-[#FFC107]">{t("approach.title2")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
              data-testid={`approach-step-${i}`}
            >
              <span className="font-display text-6xl font-extrabold text-white/10 transition-colors group-hover:text-[#FFC107]/30">
                0{i + 1}
              </span>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFC107]/15 ring-1 ring-[#FFC107]/30">
                <step.icon className="h-6 w-6 text-[#FFC107]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{t(step.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
