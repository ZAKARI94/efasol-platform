import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Globe, Leaf, Users } from "lucide-react";
import { useLanguage } from "../i18n";

const cards = [
  { icon: Leaf, titleKey: "home.highlight1Title", descKey: "home.highlight1Desc" },
  { icon: Award, titleKey: "home.highlight2Title", descKey: "home.highlight2Desc" },
  { icon: Users, titleKey: "home.highlight3Title", descKey: "home.highlight3Desc" },
  { icon: Globe, titleKey: "home.highlight4Title", descKey: "home.highlight4Desc" },
];

export default function HomeHighlights() {
  const { t } = useLanguage();

  return (
    <section className="mx-3 -mt-6 pb-8 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#1B5E20]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,61,20,0.08)] backdrop-blur md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.6rem] bg-gradient-to-br from-[#0F3D14] via-[#1B5E20] to-[#2E7D32] p-8 text-white sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFC107]">{t("home.highlightsEyebrow")}</p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">{t("home.highlightsTitle")}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">{t("home.highlightsSubtitle")}</p>
            <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              {t("home.highlightsCta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-[1.4rem] border border-[#1B5E20]/10 bg-[#F9FAF7] p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B5E20]/10">
                    <Icon className="h-5 w-5 text-[#1B5E20]" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold text-[#1F2937]">{t(card.titleKey)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#1F2937]/70">{t(card.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
