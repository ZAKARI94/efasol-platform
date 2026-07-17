import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Footer Component
 *
 * NOTE: the hardcoded contact block here previously listed a Lagos,
 * Nigeria address/phone that didn't match the Abidjan, Côte d'Ivoire
 * details already sitting in LanguageContext's translations. Now
 * pulling from the translations everywhere so there's one source of
 * truth — double check footer.address/phone/email/website in
 * LanguageContext.tsx are your real details (address is country-level
 * only right now, no street address was provided).
 */
export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("nav.home"), href: "/#home" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.impact"), href: "/#about" },
  ];

  const services = [
    { label: t("services.poultry"), href: "/#services" },
    { label: t("services.feed"), href: "/#services" },
    { label: t("services.agriculture"), href: "/#services" },
    { label: t("services.aquaculture"), href: "/#services" },
    { label: t("services.livestock"), href: "/#services" },
  ];

  const contactInfo = [
    { icon: MapPin, label: t("footer.address") },
    { icon: Phone, label: t("footer.phone") },
    { icon: Mail, label: t("footer.email") },
    { icon: Globe, label: t("footer.website") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-[#1B5E20] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <img
              src="/efasol-logo.png"
              alt="EFASOL - Eureka Farm Solutions"
              className="h-8 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-gray-100 text-sm mb-4">{t("footer.tagline")}</p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FFC107] hover:text-[#1B5E20] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-100 hover:text-[#FFC107] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-gray-100 hover:text-[#FFC107] transition-colors text-sm"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.ourServices")}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-100 hover:text-[#FFC107] transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("footer.contactUs")}</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <info.icon className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100 text-sm">{info.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-100 text-sm">{t("footer.copyright")}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-100 hover:text-[#FFC107] text-sm transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="#" className="text-gray-100 hover:text-[#FFC107] text-sm transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
