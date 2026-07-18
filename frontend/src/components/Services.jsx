import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { SERVICES } from "../data/site";
import Reveal from "./Reveal";

function ServiceCard({ service, index }) {
  const { t } = useLanguage();
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative col-span-full overflow-hidden rounded-[2rem] border border-[#1B5E20]/10 bg-white shadow-[0_18px_50px_rgba(15,61,20,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,61,20,0.14)] md:col-span-1 ${service.span} ${service.tall ? "min-h-[26rem]" : "min-h-[22rem]"}`}
      data-testid={`service-card-${service.id}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={service.image}
          alt={t(service.titleKey)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D14] via-[#0F3D14]/35 to-[#0F3D14]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.16),_transparent_42%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/25">
          <Icon className="h-6 w-6 text-[#FFC107]" />
        </div>

        <div className="rounded-[1.25rem] border border-white/15 bg-black/10 p-5 backdrop-blur-sm">
          <div className="mb-2 h-1 w-10 rounded-full bg-[#FFC107]" />
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{t(service.titleKey)}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{t(service.descKey)}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFC107] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            {t("services.learnMore")}
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-36" data-testid="services-section">
      <div className="sticky top-4 z-20 mb-12 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1B5E20]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1B5E20] shadow-sm backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC107]" />
          {t("services.title")}
        </div>
      </div>

      <Reveal className="mb-12 max-w-3xl">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
          {t("services.subtitle")} <span className="text-[#1B5E20]">{t("services.subtitle2")}</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[#1F2937]/70">
          {t("services.premiumIntro")}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
