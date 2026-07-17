import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Navigation Component
 *
 * - Real EFASOL wordmark (the image already contains the name + tagline,
 *   so we don't duplicate it in text alongside it)
 * - Nav links work from any route: same-page anchors are prefixed with
 *   "/" so they resolve correctly even when navigating from /contact;
 *   "Contact Us" and "Get Started" route to the real /contact page
 * - "Impact" points at the About section's stats block, since that's
 *   the closest existing content — there's no separate Impact section yet
 * - FR/EN toggle using LanguageContext
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/#home" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.impact"), href: "/#about" },
  ];

  const toggleLanguage = () => setLanguage(language === "en" ? "fr" : "en");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/efasol-logo.png"
            alt="EFASOL - Eureka Farm Solutions"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-[#1B5E20] transition-colors font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#1B5E20] transition-colors font-medium text-sm"
          >
            {t("nav.contact")}
          </Link>
        </div>

        {/* Desktop CTA + Language toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#1B5E20] border border-gray-300 hover:border-[#1B5E20] rounded-md px-2.5 py-1.5 transition-colors"
          >
            <Languages className="w-4 h-4" />
            {language === "en" ? "FR" : "EN"}
          </button>
          <Button asChild className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
            <Link href="/contact">{t("nav.getStarted")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-[#1B5E20] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#1B5E20] transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.contact")}
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-md px-2.5 py-1.5 w-fit"
            >
              <Languages className="w-4 h-4" />
              {language === "en" ? "Français" : "English"}
            </button>
            <Button asChild className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                {t("nav.getStarted")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
