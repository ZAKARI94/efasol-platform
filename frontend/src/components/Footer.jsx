import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { useLanguage } from "../i18n";
import { NAV_LINKS, SERVICES } from "../data/site";

const Social = ({ path, label }) => (
  <a href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFC107] hover:text-[#1B5E20]">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">{path}</svg>
  </a>
);

const SOCIALS = [
  { label: "Facebook", path: <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /> },
  { label: "Twitter", path: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { label: "LinkedIn", path: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  { label: "Instagram", path: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
];

export default function Footer() {
  const { t } = useLanguage();

  const socials = SOCIALS;
  const contact = [
    { icon: MapPin, value: t("footer.address") },
    { icon: Phone, value: t("footer.phone") },
    { icon: Mail, value: t("footer.email") },
    { icon: Globe, value: t("footer.website") },
  ];

  return (
    <footer className="relative mt-8 overflow-hidden rounded-t-[3rem] border border-[#FFC107]/15 bg-gradient-to-br from-[#0F3D14] via-[#1B5E20] to-[#144C1A] text-white shadow-[0_-20px_60px_rgba(15,61,20,0.18)]" data-testid="site-footer">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.16),_transparent_38%)]" />
      <p aria-hidden className="pointer-events-none absolute -bottom-6 left-0 select-none font-display text-[22vw] font-extrabold leading-none text-white/5 sm:text-[16vw]">
        EFASOL
      </p>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/efasol-logo.png" alt="EFASOL" className="mb-5 h-8 w-auto object-contain brightness-0 invert" />
            <p className="max-w-xs text-sm leading-relaxed text-white/80">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              {socials.map((s, i) => (
                <Social key={i} path={s.path} label={s.label} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-lg font-bold">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="text-sm text-white/75 transition-colors duration-200 hover:text-[#FFC107]">{t(l.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-lg font-bold">{t("footer.ourServices")}</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="/services" className="text-sm text-white/75 transition-colors duration-200 hover:text-[#FFC107]">{t(s.titleKey)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-lg font-bold">{t("footer.contactUs")}</h4>
            <ul className="space-y-4">
              {contact.map((c, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <c.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FFC107]" />
                  <span className="text-sm text-white/80">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-sm text-white/70">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/70 transition-colors duration-200 hover:text-[#FFC107]">{t("footer.privacy")}</a>
            <a href="#" className="text-sm text-white/70 transition-colors duration-200 hover:text-[#FFC107]">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
