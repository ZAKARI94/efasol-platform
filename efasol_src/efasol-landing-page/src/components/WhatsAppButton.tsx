import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// TODO: replace with EFASOL's real WhatsApp Business number (digits only, with country code)
const WHATSAPP_NUMBER = "2250749378770";

/**
 * Floating WhatsApp CTA, fixed to the bottom-right of the viewport.
 * Pre-fills the chat with the localized greeting already defined in
 * LanguageContext ("whatsapp.message").
 */
export default function WhatsAppButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsapp.message")
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EFASOL on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={2.25} />
    </a>
  );
}
