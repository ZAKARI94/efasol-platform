import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../i18n";
import { useCart } from "../context/CartContext";
import { Skeleton } from "../components/ui/skeleton";
import useMarketplaceProducts from "../hooks/useMarketplaceProducts";

export default function ProductPage() {
  const { t } = useLanguage();
  const { id } = useParams();
  const { addItem } = useCart();
  const { products, loading } = useMarketplaceProducts();

  const product = useMemo(() => products.find((item) => item.id === id), [id, products]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-10 w-44 rounded-full" />
          <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(148,163,184,0.2)]">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <Skeleton className="min-h-[28rem] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_70px_rgba(148,163,184,0.16)]">
          <p className="text-lg font-semibold text-slate-900">{t("product.notFound")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          {t("marketplace.title")}
        </Link>

        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(148,163,184,0.2)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[28rem]">
              <img src={product.image} alt={t(product.nameKey)} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F3D675] bg-[#FFF8E0] px-3 py-1 text-sm font-semibold text-[#7B5900]">
                  <Sparkles className="h-4 w-4" />
                  {t(product.badgeKey)}
                </div>
                <h1 className="mt-4 font-display text-4xl font-bold text-slate-950 sm:text-5xl">{t(product.nameKey)}</h1>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-700">{t(product.descriptionKey)}</p>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="rounded-[1.8rem] border border-slate-200 bg-[#F7FAF0] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B07E15]">{t("product.price")}</p>
                    <p className="mt-2 text-4xl font-extrabold text-slate-950">{product.price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="rounded-full border border-[#D6EFD6] bg-white px-3 py-1 text-sm font-semibold text-[#2F6C2D]">
                    {t("marketplace.perKg")}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2 rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                    <ShieldCheck className="h-4 w-4 text-[#2F6C2D]" />
                    {t(product.origin)}
                  </div>
                  <div className="flex items-center gap-2 rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                    <Truck className="h-4 w-4 text-[#2F6C2D]" />
                    {product.weight} • {product.stock} {t("marketplace.stock")}
                  </div>
                </div>

                <button onClick={() => addItem({ ...product, name: t(product.nameKey) }, 1)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-5 py-3 text-sm font-semibold text-[#0F172A] transition-transform hover:-translate-y-0.5">
                  <ShoppingCart className="h-4 w-4" />
                  {t("product.addToCart")}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
