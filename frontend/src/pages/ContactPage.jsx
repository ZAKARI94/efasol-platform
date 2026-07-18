import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { useLanguage } from "../i18n";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#1B5E20]/10 bg-white px-4 py-2 text-sm font-semibold text-[#1B5E20] shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            {t("nav.home")}
          </Link>
        </motion.div>
        <Contact />
      </div>
    </main>
  );
}
