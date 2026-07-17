import React, { useEffect, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "../i18n";
import { NAV_LINKS } from "../data/site";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLanguage(language === "en" ? "fr" : "en");

  return (
    <header className="fixed top-3 left-3 right-3 z-50 flex justify-center" data-testid="site-header">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "bg-white/80 shadow-[0_8px_32px_rgba(27,94,32,0.10)] backdrop-blur-xl border border-white/60"
            : "bg-white/50 backdrop-blur-md border border-white/40"
        }`}
      >
        <a href="#home" className="flex items-center" data-testid="nav-logo">
          <img src="/efasol-logo.png" alt="EFASOL — Eureka Farm Solutions" className="h-7 w-auto object-contain sm:h-8" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-semibold text-[#1F2937]/80 transition-colors hover:text-[#1B5E20]"
              data-testid={`nav-link-${link.href.replace("#", "")}`}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="flex items-center gap-1.5 rounded-full border border-[#1B5E20]/15 px-3 py-1.5 text-sm font-bold text-[#1F2937]/70 transition-colors hover:border-[#1B5E20] hover:text-[#1B5E20]"
            data-testid="lang-toggle"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "FR" : "EN"}
          </button>
          <a href="#contact" className="rounded-full bg-[#1B5E20] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-95" data-testid="nav-get-started">
            {t("nav.getStarted")}
          </a>
        </div>

        <button className="p-1.5 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" data-testid="mobile-menu-toggle">
          {open ? <X className="h-6 w-6 text-[#1B5E20]" /> : <Menu className="h-6 w-6 text-[#1B5E20]" />}
        </button>
      </nav>

      {open && (
        <div className="absolute top-16 left-0 right-0 mx-3 rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden" data-testid="mobile-menu">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-[#1F2937] transition-colors hover:text-[#1B5E20]"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <button onClick={toggleLang} className="flex items-center gap-1.5 rounded-full border border-[#1B5E20]/15 px-3 py-2 text-sm font-bold text-[#1F2937]/70">
                <Languages className="h-4 w-4" />
                {language === "en" ? "Français" : "English"}
              </button>
              <a href="#contact" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-[#1B5E20] px-5 py-2.5 text-center text-sm font-semibold text-white">
                {t("nav.getStarted")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
