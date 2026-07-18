import React, { useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, CreditCard, Sparkles, Truck, Wallet2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { useCart } from "../context/CartContext";

const API_BASE = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : "/api";

const deliveryOptions = [
  { id: "express", labelKey: "checkout.express", price: 2000, descriptionKey: "checkout.expressText" },
  { id: "standard", labelKey: "checkout.standard", price: 1000, descriptionKey: "checkout.standardText" },
];

const paymentOptions = [
  { id: "card", labelKey: "checkout.card", icon: CreditCard },
  { id: "cash", labelKey: "checkout.cash", icon: Wallet2 },
];

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { items, subtotal, clear } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[1].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].id);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const deliveryPrice = useMemo(() => deliveryOptions.find((option) => option.id === selectedDelivery)?.price ?? 1000, [selectedDelivery]);
  const finalTotal = subtotal + deliveryPrice;

  const onCustomerChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0 || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const { data } = await axios.post(`${API_BASE}/orders`, {
        customer,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        delivery_method: selectedDelivery,
        payment_method: selectedPayment,
      });
      setOrder(data);
      clear();
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t("checkout.errorStock"));
      } else {
        setError(t("checkout.errorGeneric"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,193,7,0.15),_transparent_34%),_rgb(247,245,238)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B07E15]">{t("checkout.title")}</p>
            <h1 className="font-display text-4xl font-bold text-slate-950">{t("checkout.subtitle")}</h1>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-[#B07E15]">{t("checkout.back")}</Link>
        </div>

        {order ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_25px_80px_rgba(148,163,184,0.18)]">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#2F6C2D]" />
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">{t("checkout.successTitle")}</h2>
            <p className="mt-3 text-lg text-slate-600">{t("checkout.successText")}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D6EFD6] bg-[#F4FCF4] px-4 py-2 text-sm font-semibold text-[#2F6C2D]">
              {t("checkout.orderNumber")}: {order.order_number}
            </p>
            <div>
              <Link to="/marketplace" className="mt-6 inline-flex rounded-full bg-[#FFC107] px-5 py-3 text-sm font-semibold text-[#0F172A]">{t("checkout.continue")}</Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_25px_80px_rgba(148,163,184,0.16)]">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-950">{t("checkout.customer")}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input name="name" value={customer.name} onChange={onCustomerChange} required className="rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FFC107]" placeholder={t("checkout.name")} />
                  <input name="phone" value={customer.phone} onChange={onCustomerChange} required className="rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FFC107]" placeholder={t("checkout.phone")} />
                  <input name="address" value={customer.address} onChange={onCustomerChange} required className="rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FFC107]" placeholder={t("checkout.address")} />
                  <input name="city" value={customer.city} onChange={onCustomerChange} className="rounded-full border border-slate-200 bg-[#F7FAF0] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FFC107]" placeholder={t("checkout.city")} />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold text-slate-950">{t("checkout.delivery")}</h2>
                <div className="mt-4 space-y-3">
                  {deliveryOptions.map((option) => (
                    <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-[1.2rem] border p-4 ${selectedDelivery === option.id ? "border-[#FFC107] bg-[#FFF8E0]" : "border-slate-200 bg-[#F7FAF0]"}`}>
                      <input type="radio" name="delivery" checked={selectedDelivery === option.id} onChange={() => setSelectedDelivery(option.id)} className="mt-1" />
                      <div>
                        <div className="flex items-center gap-2 font-semibold text-slate-900">
                          <Truck className="h-4 w-4 text-[#B07E15]" />
                          {t(option.labelKey)}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{t(option.descriptionKey)}</p>
                      </div>
                      <span className="ml-auto font-semibold text-[#B07E15]">{option.price.toLocaleString()} FCFA</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold text-slate-950">{t("checkout.payment")}</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label key={option.id} className={`flex cursor-pointer items-center gap-3 rounded-[1.2rem] border p-4 ${selectedPayment === option.id ? "border-[#FFC107] bg-[#FFF8E0]" : "border-slate-200 bg-[#F7FAF0]"}`}>
                        <input type="radio" name="payment" checked={selectedPayment === option.id} onChange={() => setSelectedPayment(option.id)} className="" />
                        <Icon className="h-5 w-5 text-[#B07E15]" />
                        <span className="font-semibold text-slate-900">{t(option.labelKey)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {error ? (
                <div className="mt-6 flex items-center gap-2 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              ) : null}

              <button type="submit" disabled={items.length === 0 || submitting} className="mt-8 w-full rounded-full bg-[#FFC107] px-5 py-3 text-sm font-semibold text-[#0F172A] transition-opacity disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? t("checkout.placing") : t("checkout.placeOrder")}
              </button>
            </form>

            <div className="rounded-[2rem] border border-[#D6EFD6] bg-[#F4FCF4] p-8 shadow-[0_25px_80px_rgba(74,128,75,0.14)]">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#2F6C2D]">
                <Sparkles className="h-4 w-4" />
                {t("checkout.summary")}
              </div>
              <div className="mt-6 space-y-3">
                {items.length === 0 ? (
                  <p className="text-sm text-slate-700">{t("checkout.empty")}</p>
                ) : items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-slate-900">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#B07E15]">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-700">
                <div className="flex items-center justify-between"><span>{t("checkout.subtotal")}</span><span>{subtotal.toLocaleString()} FCFA</span></div>
                <div className="flex items-center justify-between"><span>{t("checkout.deliveryFee")}</span><span>{deliveryPrice.toLocaleString()} FCFA</span></div>
                <div className="flex items-center justify-between text-base font-semibold text-slate-950"><span>{t("checkout.total")}</span><span>{finalTotal.toLocaleString()} FCFA</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
