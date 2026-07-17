import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "../i18n";
import { TESTIMONIALS } from "../data/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-32" data-testid="testimonials-section">
      <Reveal className="mb-16 max-w-2xl">
        <p className="overline mb-3">{t("t.eyebrow")}</p>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
          {t("t.title")} <span className="text-[#1B5E20]">{t("t.title2")}</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col rounded-[2rem] border border-[#1B5E20]/10 p-8 ${i === 1 ? "bg-[#1B5E20] text-white shadow-[0_24px_60px_rgba(27,94,32,0.25)] md:-translate-y-4" : "bg-white text-[#1F2937] shadow-[0_12px_40px_rgba(27,94,32,0.06)]"}`}
            data-testid={`testimonial-${i}`}
          >
            <Quote className={`h-9 w-9 ${i === 1 ? "text-[#FFC107]" : "text-[#1B5E20]/20"}`} />
            <blockquote className={`mt-4 flex-1 text-lg leading-relaxed ${i === 1 ? "text-white/90" : "text-[#1F2937]/80"}`}>
              "{t(item.quoteKey)}"
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <img src={item.image} alt={t(item.nameKey)} className="h-14 w-14 rounded-full object-cover ring-2 ring-[#FFC107]/40" />
              <div>
                <p className="font-display font-bold">{t(item.nameKey)}</p>
                <p className={`text-sm ${i === 1 ? "text-white/70" : "text-[#1F2937]/55"}`}>{t(item.roleKey)}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
