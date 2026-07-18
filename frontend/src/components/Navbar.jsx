import React, { useEffect, useState } from "react";
import { Menu, X, Languages, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { NAV_LINKS } from "../data/site";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { items, setOpen } = useCart();
  const [open, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLanguage(language === "en" ? "fr" : "en");
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-3 left-3 right-3 z-50 flex justify-center" data-testid="site-header">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-3.5 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border border-[#1B5E20]/10 bg-white/85 shadow-[0_14px_40px_rgba(15,61,20,0.12)] backdrop-blur-2xl"
            : "border border-white/50 bg-white/70 shadow-[0_10px_30px_rgba(15,61,20,0.08)] backdrop-blur-xl"
        }`}
      >
        <a href="/" className="flex items-center rounded-full p-1.5 transition-colors hover:bg-[#1B5E20]/5" data-testid="nav-logo">
          <img src="/efasol-logo.png" alt="EFASOL — Eureka Farm Solutions" className="h-7 w-auto object-contain sm:h-8" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-semibold text-[#1F2937]/80 transition-all duration-200 hover:text-[#1B5E20] hover:underline hover:decoration-[#FFC107] hover:decoration-2 hover:underline-offset-8"
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
            className="flex items-center gap-1.5 rounded-full border border-[#1B5E20]/15 bg-[#F9FAF7] px-3 py-1.5 text-sm font-bold text-[#1F2937]/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1B5E20] hover:text-[#1B5E20]"
            data-testid="lang-toggle"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "FR" : "EN"}
          </button>
          <a href="/contact" className="rounded-full bg-[#1B5E20] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,94,32,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#144C1A] active:scale-95" data-testid="nav-get-started">
            {t("nav.getStarted")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setOpen(true)} className="relative rounded-full border border-[#1B5E20]/10 bg-[#F9FAF7] p-2" aria-label="Open cart">
            <ShoppingCart className="h-5 w-5 text-[#1B5E20]" />
            {cartCount > 0 ? <span className="absolute -right-1 -top-1 rounded-full bg-[#1B5E20] px-1.5 py-0.5 text-[10px] font-semibold text-white">{cartCount}</span> : null}
          </button>
          <button className="rounded-full border border-[#1B5E20]/10 bg-[#F9FAF7] p-2" onClick={() => setMenuOpen(!open)} aria-label="Toggle menu" data-testid="mobile-menu-toggle">
            {open ? <X className="h-6 w-6 text-[#1B5E20]" /> : <Menu className="h-6 w-6 text-[#1B5E20]" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute top-16 left-0 right-0 mx-3 rounded-[1.5rem] border border-[#1B5E20]/10 bg-white/95 p-6 shadow-[0_18px_42px_rgba(15,61,20,0.15)] backdrop-blur-xl md:hidden" data-testid="mobile-menu">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
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
              <a href="/contact" onClick={() => setMenuOpen(false)} className="flex-1 rounded-full bg-[#1B5E20] px-5 py-2.5 text-center text-sm font-semibold text-white">
                {t("nav.getStarted")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
