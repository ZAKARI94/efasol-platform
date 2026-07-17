import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, CheckCircle, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * HeroSection Component
 *
 * NOTE ON THE BACKGROUND: the original export pointed this at a
 * /manus-storage/ image that only resolves inside Manus, and the local
 * fallback that got swapped in for it turned out to be the EFASOL
 * wordmark stretched full-bleed (not a farm photo). Using a brand-color
 * gradient instead until real hero photography is supplied — swap the
 * `style` block below for a real `backgroundImage` once you have one.
 */
export default function HeroSection() {
  const { t } = useLanguage();

  const badges = [
    { icon: Leaf, label: t("hero.badge1") },
    { icon: CheckCircle, label: t("hero.badge2") },
    { icon: Users, label: t("hero.badge3") },
    { icon: TrendingUp, label: t("hero.badge4") },
  ];

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 45%), linear-gradient(135deg, #0F3D14 0%, #1B5E20 45%, #2E7D32 100%)",
      }}
    >
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-start justify-center h-full">
        {/* Titre principal */}
        <div className="max-w-2xl mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
            <br />
            <span className="text-[#FFC107]">{t("hero.title3")}</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-xl">
            {t("hero.description")}
          </p>

          {/* Bouton CTA */}
          <Button
            asChild
            className="bg-white hover:bg-gray-100 text-[#1B5E20] px-8 py-6 text-lg rounded-lg font-semibold group"
          >
            <Link href="/contact">
              {t("hero.cta")}{" "}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </Button>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              <badge.icon className="w-5 h-5 text-[#FFC107] flex-shrink-0" />
              <span className="text-white font-medium text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-sm font-medium">{t("hero.scroll")}</p>
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 animate-bounce">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
