import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Contact Page
 *
 * Simple contact page reusing the site's translation keys.
 * NOTE: form submission is stubbed (shows a toast) since no backend
 * endpoint was included in the exported project. Wire this up to
 * your API / email service of choice.
 */
export default function Contact() {
  const { t } = useLanguage();
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      // TODO: replace with a real submission (API route, email service, etc.)
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(t("contact.success"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1B5E20] mt-1" />
                <span className="text-gray-700">{t("footer.address")}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1B5E20] mt-1" />
                <span className="text-gray-700">{t("footer.phone")}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1B5E20] mt-1" />
                <span className="text-gray-700">{t("footer.email")}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.message")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSending}
                className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-6 text-base rounded-lg font-semibold"
              >
                {isSending ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
