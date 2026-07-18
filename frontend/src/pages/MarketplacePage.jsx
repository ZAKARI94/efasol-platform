import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ShoppingCart, Sparkles, ShieldCheck, Truck, Flame, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { MARKETPLACE_CATEGORIES } from "../data/marketplace";
import { useCart } from "../context/CartContext";
import { Skeleton } from "../components/ui/skeleton";
import useMarketplaceProducts from "../hooks/useMarketplaceProducts";

export default function MarketplacePage() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { products, loading } = useMarketplaceProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [promoOnly, setPromoOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = `${t(product.nameKey)} ${t(product.descriptionKey)} ${t(product.origin)}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      const matchesPromo = !promoOnly || product.promo;
      return matchesQuery && matchesCategory && matchesPromo;
    });
  }, [category, products, promoOnly, query, t]);

  const galleryProducts = useMemo(() => products.filter((product) => product.featured).slice(0, 3), [products]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_35px_90px_rgba(148,163,184,0.18)] sm:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,193,7,0.18),_transparent_20%),linear-gradient(120deg,_rgba(255,255,255,0.7),_transparent_70%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                <ArrowLeft className="h-4 w-4" />
                {t("nav.home")}
              </Link>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl text-slate-950">
                {t("marketplace.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{t("marketplace.subtitle")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#F3D675] bg-[#FFF8E0] px-4 py-2 text-sm font-semibold text-[#7B5900]">{t("marketplace.heroBadge")}</span>
                <span className="rounded-full border border-[#FFD166]/30 bg-[#FFF8E0] px-4 py-2 text-sm font-semibold text-[#7B5900]">{t("marketplace.perKg")}</span>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-slate-200 bg-[#F7FAF0] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F6C2D]">
                <Sparkles className="h-4 w-4" />
                {t("marketplace.heroText")}
              </div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <ShieldCheck className="h-4 w-4 text-[#2F6C2D]" />
                    {t("marketplace.heroFresh")}
                  </div>
                </div>
                <div className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Truck className="h-4 w-4 text-[#2F6C2D]" />
                    {t("marketplace.heroDelivery")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[#D6EFD6] bg-[#F4FCF4] p-6 shadow-[0_25px_70px_rgba(74,128,75,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2F6C2D]">{t("marketplace.featuredBoxBadge")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950">{t("marketplace.featuredBoxTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{t("marketplace.featuredBoxSubtitle")}</p>
            <div className="mt-6 space-y-3">
              {[
                t("marketplace.featuredBoxItem1"),
                t("marketplace.featuredBoxItem2"),
                t("marketplace.featuredBoxItem3"),
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
                  <ShieldCheck className="h-4 w-4 text-[#B07E15]" />
                  {item}
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-transform hover:-translate-y-0.5">
              {t("marketplace.featuredBoxCta")}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(148,163,184,0.12)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B07E15]">{t("marketplace.galleryTitle")}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">{t("marketplace.gallerySubtitle")}</h2>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {t("marketplace.galleryTag")}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={`gallery-skeleton-${index}`} className="overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white p-4">
                      <Skeleton className="h-44 w-full" />
                      <Skeleton className="mt-3 h-4 w-3/4" />
                      <Skeleton className="mt-2 h-3 w-full" />
                    </div>
                  ))
                : galleryProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white">
                      <img src={product.image} alt={t(product.nameKey)} className="h-44 w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="p-4">
                        <p className="text-sm font-semibold text-[#B07E15]">{t(product.nameKey)}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{t(product.descriptionKey)}</p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="mt-8 grid gap-6 lg:grid-cols-[0.32fr_1fr]">
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(148,163,184,0.16)]">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[1.6rem] border border-slate-200 bg-[#F7FAF0] p-5">
                <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-slate-900">
                  <Search className="h-5 w-5 text-[#B07E15]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("marketplace.searchPlaceholder")}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B07E15]">{t("marketplace.categoriesLabel")}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {MARKETPLACE_CATEGORIES.map((categoryItem) => (
                    <button
                      key={categoryItem.id}
                      onClick={() => setCategory(categoryItem.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${category === categoryItem.id ? "bg-[#FFC107] text-[#0F172A] shadow-[0_8px_24px_rgba(255,193,7,0.18)]" : "bg-slate-100 text-slate-700"}`}
                    >
                      {t(categoryItem.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={promoOnly} onChange={() => setPromoOnly(!promoOnly)} className="h-4 w-4 rounded border-[#FFC107]/30 bg-white" />
                  {t("marketplace.promoFilter")}
                </label>
                <p className="mt-4 text-sm text-slate-600">{loading ? "..." : filteredProducts.length} {t("marketplace.results")}</p>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-[#F7FAF0] p-5 text-slate-700">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2F6C2D]">{t("marketplace.sidebarTitle")}</p>
                <p className="mt-3 text-sm leading-relaxed">{t("marketplace.sidebarText")}</p>
                <Link to="/checkout" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#FFC107] px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#ffd54f]">
                  {t("marketplace.goToCheckout")}
                </Link>
                <a href="#product-list" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  {t("marketplace.jumpToProducts")}
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(148,163,184,0.12)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B07E15]">{t("marketplace.galleryTitle")}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">{t("marketplace.browseTitle")}</h2>
                </div>
                <p className="text-sm text-slate-600">{loading ? "..." : filteredProducts.length} {t("marketplace.browseText")}</p>
              </div>
            </div>

            <div id="product-list" className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={`product-skeleton-${index}`} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(148,163,184,0.18)]">
                      <Skeleton className="h-72 w-full" />
                      <Skeleton className="mt-5 h-4 w-1/3" />
                      <Skeleton className="mt-4 h-8 w-3/4" />
                      <Skeleton className="mt-3 h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-5/6" />
                      <div className="mt-6 flex items-center justify-between">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </div>
                  ))
                : filteredProducts.map((product, index) => (
                    <motion.article
                      key={product.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(148,163,184,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_80px_rgba(148,163,184,0.24)]"
                    >
                      <div className="relative">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image} alt={t(product.nameKey)} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full bg-[#FFC107] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F172A]">
                          {t(product.badgeKey)}
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
                          <Flame className="h-3.5 w-3.5 text-[#B07E15]" />
                          {product.weight}
                        </div>
                        {product.promo ? <div className="absolute bottom-4 right-4 rounded-full bg-[#FFC107] px-3 py-1 text-xs font-bold text-[#0F172A]">{t("marketplace.badges.promo")}</div> : null}
                      </div>

                      <div className="p-8">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span className="font-semibold text-[#B07E15]">{t("marketplace.perKg")}</span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{t(MARKETPLACE_CATEGORIES.find((item) => item.id === product.category)?.labelKey ?? "marketplace.categories.whole")}</span>
                        </div>
                        <Link to={`/product/${product.id}`} className="block">
                          <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">{t(product.nameKey)}</h2>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t(product.descriptionKey)}</p>
                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                          <span>{t(product.origin)}</span>
                          <span>{product.stock} {t("marketplace.stock")}</span>
                        </div>
                        <div className="mt-7 flex items-center justify-between">
                          <div>
                            <p className="text-3xl font-extrabold text-[#B07E15]">{product.price.toLocaleString()} FCFA</p>
                            <p className="text-sm text-slate-500">{t("marketplace.priceHint")}</p>
                          </div>
                          <button onClick={() => addItem({ ...product, name: t(product.nameKey) }, 1)} className="inline-flex items-center gap-2 rounded-full bg-[#2F6C2D] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                            <ShoppingCart className="h-4 w-4" />
                            {t("marketplace.addToCart")}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
