import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { IMAGES, STATS } from "../data/site";
import CountUp from "../components/CountUp";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#1B5E20]/10 bg-white p-8 shadow-[0_20px_70px_rgba(15,61,20,0.08)] sm:p-12">
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

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <img src={IMAGES.about} alt="EFASOL team" className="h-[24rem] w-full rounded-[1.8rem] object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="overline">{t("about.label")}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-[#1F2937] sm:text-5xl">
              {t("about.title")} <span className="text-[#1B5E20]">{t("about.title2")}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#1F2937]/70">{t("about.description")}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {STATS.map((stat, index) => (
                <div key={index} className="rounded-[1.2rem] border border-[#1B5E20]/10 bg-[#F9FAF7] p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B5E20]/10">
                    <stat.icon className="h-5 w-5 text-[#1B5E20]" />
                  </div>
                  <p className="mt-4 font-display text-3xl font-extrabold text-[#1B5E20]">
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#1F2937]/60">{t(stat.labelKey)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
