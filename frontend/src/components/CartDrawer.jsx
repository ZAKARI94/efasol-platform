import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../i18n";

export default function CartDrawer() {
  const { t } = useLanguage();
  const { items, open, setOpen, updateQuantity, removeItem, subtotal, total } = useCart();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/40" onClick={() => setOpen(false)} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1B5E20]/10 px-6 py-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1B5E20]">{t("cart.title")}</p>
                <h2 className="font-display text-2xl font-bold text-[#1F2937]">{t("cart.subtitle")}</h2>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-[#F3F4F6] p-2 text-[#1F2937]">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#1B5E20]/20 bg-[#F9FAF7] p-8 text-center">
                  <ShoppingCart className="h-10 w-10 text-[#1B5E20]" />
                  <p className="mt-4 text-lg font-semibold text-[#1F2937]">{t("cart.empty")}</p>
                  <p className="mt-2 text-sm text-[#1F2937]/70">{t("cart.emptyText")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-[1.4rem] border border-[#1B5E20]/10 bg-[#F9FAF7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#1F2937]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#1F2937]/60">{item.weight}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[#1B5E20]">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-[#1B5E20]/10 bg-white px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1 text-[#1B5E20]">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1 text-[#1B5E20]">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-[#1B5E20]">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#1B5E20]/10 bg-white p-6">
              <div className="flex items-center justify-between text-sm text-[#1F2937]/70">
                <span>{t("cart.subtotal")}</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-[#1F2937]/70">
                <span>{t("cart.delivery")}</span>
                <span>1,000 FCFA</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-lg font-bold text-[#1F2937]">
                <span>{t("cart.total")}</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
              <Link to="/checkout" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white">
                {t("cart.checkout")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
