import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Dictionnaire de traductions FR/EN
 */
const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.impact": "Impact",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getStarted": "Commencer",

    // Hero Section
    "hero.title1": "Transformer",
    "hero.title2": "l'Agriculture.",
    "hero.title3": "Autonomiser l'Afrique.",
    "hero.description":
      "EFASOL fournit des solutions innovantes et durables dans toute la chaîne de valeur agricole, stimulant la productivité, la sécurité alimentaire et la croissance économique en Afrique.",
    "hero.cta": "Commencer",
    "hero.badge1": "Solutions Durables",
    "hero.badge2": "Qualité de Confiance",
    "hero.badge3": "Autonomiser les Communautés",
    "hero.badge4": "Stimuler la Croissance",
    "hero.scroll": "Faites défiler pour explorer",

    // Services Section
    "services.title": "NOS SERVICES PRINCIPAUX",
    "services.subtitle": "Solutions Complètes pour",
    "services.subtitle2": "Chaque Étape de l'Agriculture",
    "services.poultry": "Aviculture",
    "services.poultry_desc":
      "Solutions avicoles de haute qualité pour un meilleur rendement, une meilleure santé et une meilleure productivité.",
    "services.feed": "Aliments pour Animaux",
    "services.feed_desc":
      "Aliments pour animaux nutritifs et abordables pour une croissance et une performance optimales.",
    "services.agriculture": "Agriculture",
    "services.agriculture_desc":
      "Intrants et technologies agricoles avancés pour des récoltes abondantes.",
    "services.aquaculture": "Aquaculture",
    "services.aquaculture_desc":
      "Solutions d'aquaculture durables pour une industrie prospère et rentable.",
    "services.livestock": "Élevage",
    "services.livestock_desc":
      "Soins complets du bétail pour des animaux plus sains et de meilleurs rendements.",
    "services.learnMore": "En savoir plus",

    // About Section
    "about.label": "À PROPOS D'EFASOL",
    "about.title": "Votre Partenaire de Confiance dans",
    "about.title2": "l'Excellence Agricole",
    "about.description":
      "EFASOL – Eureka Farm Solutions s'engage à transformer l'agriculture en Afrique par l'innovation, la qualité et les pratiques durables. Nous partenaires avec les agriculteurs, les entreprises et les communautés pour construire un avenir plus fort et sécurisé sur le plan alimentaire.",
    "about.farmers": "Agriculteurs Autonomisés",
    "about.products": "Produits de Qualité",
    "about.countries": "Pays Atteints",
    "about.sustainable": "Engagement Durable",

    // Contact Section
    "contact.title": "Contactez-Nous",
    "contact.description": "Nous aimerions entendre parler de vous. Envoyez-nous un message et nous vous répondrons dès que possible.",
    "contact.name": "Nom Complet",
    "contact.email": "Adresse Email",
    "contact.phone": "Numéro de Téléphone",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.sending": "Envoi en cours...",
    "contact.success": "Message envoyé avec succès!",
    "contact.error": "Erreur lors de l'envoi du message.",

    // Footer
    "footer.tagline": "Transformer l'agriculture. Autonomiser l'Afrique. Ensemble, nous cultivons un meilleur avenir.",
    "footer.quickLinks": "Liens Rapides",
    "footer.ourServices": "Nos Services",
    "footer.contactUs": "Nous Contacter",
    "footer.address": "Abidjan, Côte d'Ivoire",
    "footer.phone": "+225 07 49 378 770",
    "footer.email": "info@efasol.ci",
    "footer.website": "www.efasol.ci",
    "footer.copyright": "© 2025 EFASOL – Eureka Farm Solutions. Tous droits réservés.",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",

    // WhatsApp
    "whatsapp.message": "Bonjour EFASOL! Je souhaite en savoir plus sur vos services.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Our Services",
    "nav.impact": "Impact",
    "nav.blog": "Blog",
    "nav.contact": "Contact Us",
    "nav.getStarted": "Get Started",

    // Hero Section
    "hero.title1": "Transforming",
    "hero.title2": "Agriculture.",
    "hero.title3": "Empowering Africa.",
    "hero.description":
      "EFASOL delivers innovative and sustainable solutions across agriculture value chains, driving productivity, food security, and economic growth across Africa.",
    "hero.cta": "Get Started",
    "hero.badge1": "Sustainable Solutions",
    "hero.badge2": "Trusted Quality",
    "hero.badge3": "Empowering Communities",
    "hero.badge4": "Driving Growth",
    "hero.scroll": "Scroll to explore",

    // Services Section
    "services.title": "OUR CORE SERVICES",
    "services.subtitle": "Comprehensive Solutions for",
    "services.subtitle2": "Every Stage of Farming",
    "services.poultry": "Poultry",
    "services.poultry_desc":
      "High-quality poultry solutions for better yield, health, and productivity.",
    "services.feed": "Animal Feed",
    "services.feed_desc":
      "Nutritious and affordable animal feed for optimal growth and performance.",
    "services.agriculture": "Agriculture",
    "services.agriculture_desc":
      "Advanced agricultural inputs and technologies for bountiful harvests.",
    "services.aquaculture": "Aquaculture",
    "services.aquaculture_desc":
      "Sustainable aquaculture solutions for a thriving and profitable industry.",
    "services.livestock": "Livestock",
    "services.livestock_desc":
      "Comprehensive livestock care for healthier animals and better returns.",
    "services.learnMore": "Learn More",

    // About Section
    "about.label": "ABOUT EFASOL",
    "about.title": "Your Trusted Partner in",
    "about.title2": "Agricultural Excellence",
    "about.description":
      "EFASOL – Eureka Farm Solutions is committed to transforming agriculture across Africa through innovation, quality, and sustainable practices. We partner with farmers, businesses, and communities to build a stronger, food-secure future.",
    "about.farmers": "Farmers Empowered",
    "about.products": "Quality Products",
    "about.countries": "Countries Reached",
    "about.sustainable": "Sustainable Focus",

    // Contact Section
    "contact.title": "Contact Us",
    "contact.description": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending message.",

    // Footer
    "footer.tagline": "Transforming agriculture. Empowering Africa. Together, we grow a better tomorrow.",
    "footer.quickLinks": "Quick Links",
    "footer.ourServices": "Our Services",
    "footer.contactUs": "Contact Us",
    "footer.address": "Abidjan, Côte d'Ivoire",
    "footer.phone": "+225 07 49 378 770",
    "footer.email": "info@efasol.ci",
    "footer.website": "www.efasol.ci",
    "footer.copyright": "© 2025 EFASOL – Eureka Farm Solutions. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // WhatsApp
    "whatsapp.message": "Hello EFASOL! I would like to know more about your services.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Récupérer la langue sauvegardée ou utiliser la langue du navigateur
    const saved = localStorage.getItem("language") as Language | null;
    if (saved) return saved;

    const browserLang = navigator.language.split("-")[0];
    return (browserLang === "fr" ? "fr" : "en") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
