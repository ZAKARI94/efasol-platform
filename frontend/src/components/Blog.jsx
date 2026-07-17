import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { BLOG_POSTS } from "../data/site";
import Reveal from "./Reveal";

export default function Blog() {
  const { t } = useLanguage();
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-32" data-testid="blog-section">
      <Reveal className="mb-16 max-w-2xl">
        <p className="overline mb-3">{t("blog.eyebrow")}</p>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl">
          {t("blog.title")} <span className="text-[#1B5E20]">{t("blog.title2")}</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#1B5E20]/10 bg-white shadow-[0_12px_40px_rgba(27,94,32,0.05)] transition-transform duration-300 hover:-translate-y-1.5"
            data-testid={`blog-post-${i}`}
          >
            <div className="relative h-52 overflow-hidden">
              <img src={post.image} alt={t(post.titleKey)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-[#FFC107] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#1F2937]">
                {t(post.categoryKey)}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2937]/40">{t(post.dateKey)}</p>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#1F2937] transition-colors group-hover:text-[#1B5E20]">
                {t(post.titleKey)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#1F2937]/65">{t(post.excerptKey)}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B5E20] transition-all group-hover:gap-2.5" data-testid={`blog-read-${i}`}>
                {t("blog.readMore")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
