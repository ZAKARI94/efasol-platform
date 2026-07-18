import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { SERVICES } from "../data/site";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#1B5E20]/10 bg-white px-4 py-2 text-sm font-semibold text-[#1B5E20] shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            {t("nav.home")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[2rem] border border-[#1B5E20]/10 bg-white p-8 shadow-[0_20px_70px_rgba(15,61,20,0.08)] sm:p-12"
        >
          <p className="overline">{t("services.title")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-[#1F2937] sm:text-5xl">
            {t("services.subtitle")} <span className="text-[#1B5E20]">{t("services.subtitle2")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#1F2937]/70">
            {t("services.premiumIntro")}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  className="rounded-[1.6rem] border border-[#1B5E20]/10 bg-[#F9FAF7] p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B5E20]/10">
                    <Icon className="h-6 w-6 text-[#1B5E20]" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold text-[#1F2937]">{t(service.titleKey)}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#1F2937]/70">{t(service.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
