import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../i18n";
import Reveal from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(t("contact.success"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(t("contact.error"));
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-transparent bg-[#F3F4F6] px-5 py-4 text-[#1F2937] placeholder-[#1F2937]/40 outline-none transition-all focus:border-[#1B5E20]/30 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/10";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:px-8" data-testid="contact-section">
      <div className="overflow-hidden rounded-[2.5rem] border border-[#1B5E20]/10 bg-white shadow-[0_24px_60px_rgba(27,94,32,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left info panel */}
          <div className="relative overflow-hidden bg-[#1B5E20] p-9 text-white sm:p-12 lg:col-span-2">
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#FFC107]/20 blur-3xl" />
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFC107]">{t("contact.eyebrow")}</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {t("contact.title")} <span className="text-[#FFC107]">{t("contact.title2")}</span>
              </h2>
              <p className="mt-5 text-white/80">{t("contact.description")}</p>

              <div className="mt-10 space-y-5">
                <a href={`mailto:${t("footer.email")}`} className="flex items-center gap-4 text-white/90 transition-colors hover:text-[#FFC107]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><Mail className="h-5 w-5" /></span>
                  {t("footer.email")}
                </a>
                <a href={`tel:${t("footer.phone").replace(/\s/g, "")}`} className="flex items-center gap-4 text-white/90 transition-colors hover:text-[#FFC107]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><Phone className="h-5 w-5" /></span>
                  {t("footer.phone")}
                </a>
                <div className="flex items-center gap-4 text-white/90">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><MapPin className="h-5 w-5" /></span>
                  {t("footer.address")}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="p-9 sm:p-12 lg:col-span-3">
            <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input name="name" required value={form.name} onChange={onChange} placeholder={t("contact.name")} className={inputCls} data-testid="contact-name" />
                <input name="email" type="email" required value={form.email} onChange={onChange} placeholder={t("contact.email")} className={inputCls} data-testid="contact-email" />
              </div>
              <input name="phone" value={form.phone} onChange={onChange} placeholder={t("contact.phone")} className={inputCls} data-testid="contact-phone" />
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} placeholder={t("contact.message")} className={`${inputCls} resize-none`} data-testid="contact-message" />
              <button type="submit" disabled={sending} className="btn-green w-full disabled:opacity-60" data-testid="contact-submit-btn">
                {sending ? t("contact.sending") : t("contact.send")}
                {!sending && <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
