import React from "react";
import { Sprout } from "lucide-react";
import { useLanguage } from "../i18n";
import { TRUST_ITEMS } from "../data/site";

export default function Marquee() {
  const { t } = useLanguage();
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <section className="border-y border-[#1B5E20]/10 bg-white/60 py-10" data-testid="trust-marquee">
      <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.25em] text-[#2E7D32]">{t("trust.heading")}</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-14 pr-14">
          {items.map((key, i) => (
            <div key={`${key}-${i}`} className="flex flex-shrink-0 items-center gap-2.5 text-lg font-semibold text-[#1F2937]/50">
              <Sprout className="h-5 w-5 text-[#FFC107]" />
              {t(key)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
