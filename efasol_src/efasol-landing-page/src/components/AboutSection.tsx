import { Users, Award, Globe, Leaf, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/Reveal";

/**
 * AboutSection Component
 *
 * NOTE ON THE IMAGE: same issue as the hero — there's no real farmer
 * photo in the assets that were exported, so this uses a styled
 * placeholder panel instead of a stretched/incorrect image. Swap the
 * placeholder block below for a real <img> once you have photography.
 */
export default function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, number: "10,000+", label: t("about.farmers") },
    { icon: Award, number: "50+", label: t("about.products") },
    { icon: Globe, number: "15+", label: t("about.countries") },
    { icon: Leaf, number: "100%", label: t("about.sustainable") },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <Reveal className="flex justify-center">
            <div
              className="relative w-full max-w-md h-96 rounded-xl overflow-hidden shadow-xl flex flex-col items-center justify-center gap-3 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, #1B5E20 0%, #2E7D32 60%, #1B5E20 100%)",
              }}
            >
              <Sprout className="w-16 h-16 text-[#FFC107]" strokeWidth={1.5} />
              <p className="text-sm font-medium text-white/70 px-8 text-center">
                Add real farm or team photography here
              </p>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={100}>
            {/* Section Label */}
            <p className="text-[#1B5E20] font-semibold text-sm uppercase tracking-widest mb-4">
              {t("about.label")}
            </p>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t("about.title")}
              <br />
              <span className="text-[#1B5E20]">{t("about.title2")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {t("about.description")}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-start">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#1B5E20]/10 rounded-lg flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-[#1B5E20]" />
                  </div>

                  {/* Number */}
                  <p className="text-3xl font-bold text-[#1B5E20] mb-1">
                    {stat.number}
                  </p>

                  {/* Label */}
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
