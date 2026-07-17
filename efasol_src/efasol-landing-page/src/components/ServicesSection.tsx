import { Button } from "@/components/ui/button";
import { Egg, Droplet, Leaf, Fish, Beef } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/Reveal";

/**
 * ServicesSection Component
 *
 * Section présentant les 5 services principaux d'EFASOL
 */
export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { icon: Egg, title: t("services.poultry"), description: t("services.poultry_desc") },
    { icon: Droplet, title: t("services.feed"), description: t("services.feed_desc") },
    { icon: Leaf, title: t("services.agriculture"), description: t("services.agriculture_desc") },
    { icon: Fish, title: t("services.aquaculture"), description: t("services.aquaculture_desc") },
    { icon: Beef, title: t("services.livestock"), description: t("services.livestock_desc") },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <p className="text-[#1B5E20] font-semibold text-sm uppercase tracking-widest mb-2">
            {t("services.title")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("services.subtitle")}
            <br />
            <span className="text-[#1B5E20]">{t("services.subtitle2")}</span>
          </h2>
        </Reveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 80}>
              <div className="h-full bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:border-[#1B5E20]/20 transition-all duration-300 flex flex-col items-center text-center group">
                {/* Icon */}
                <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2E7D32] transition-colors">
                  <service.icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-1 bg-[#FFC107] rounded-full mb-4"></div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <Button
                  variant="link"
                  className="text-[#1B5E20] hover:text-[#2E7D32] p-0 h-auto font-semibold text-sm"
                >
                  {t("services.learnMore")} →
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
