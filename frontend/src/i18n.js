import React, { createContext, useContext, useState } from "react";

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.impact": "Impact",
    "nav.contact": "Contact",
    "nav.getStarted": "Commencer",

    "hero.eyebrow": "EFASOL — Eureka Farm Solutions",
    "hero.title1": "Transformer l'Agriculture.",
    "hero.title2": "Autonomiser l'Afrique.",
    "hero.description":
      "EFASOL fournit des solutions innovantes et durables sur toute la chaîne de valeur agricole — stimulant la productivité, la sécurité alimentaire et la croissance économique à travers l'Afrique.",
    "hero.cta": "Commencer",
    "hero.cta2": "Nos services",
    "hero.badge1": "Solutions Durables",
    "hero.badge2": "Qualité de Confiance",
    "hero.badge3": "Communautés Autonomisées",
    "hero.badge4": "Croissance Stimulée",
    "hero.scroll": "Faites défiler",

    "services.title": "Nos Services Principaux",
    "services.subtitle": "Des solutions complètes pour",
    "services.subtitle2": "chaque étape de l'agriculture",
    "services.poultry": "Aviculture",
    "services.poultry_desc":
      "Solutions avicoles de haute qualité pour un meilleur rendement, une meilleure santé et une productivité accrue.",
    "services.feed": "Aliments pour Animaux",
    "services.feed_desc":
      "Aliments nutritifs et abordables pour une croissance et une performance optimales.",
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

    "about.label": "À propos d'EFASOL",
    "about.title": "Votre partenaire de confiance dans",
    "about.title2": "l'excellence agricole",
    "about.description":
      "EFASOL – Eureka Farm Solutions s'engage à transformer l'agriculture en Afrique par l'innovation, la qualité et des pratiques durables. Nous collaborons avec les agriculteurs, les entreprises et les communautés pour bâtir un avenir plus fort et sécurisé sur le plan alimentaire.",
    "about.farmers": "Agriculteurs Autonomisés",
    "about.products": "Produits de Qualité",
    "about.countries": "Pays Atteints",
    "about.sustainable": "Engagement Durable",

    "contact.eyebrow": "Contact",
    "contact.title": "Construisons ensemble",
    "contact.title2": "un meilleur avenir",
    "contact.description":
      "Nous aimerions échanger avec vous. Envoyez-nous un message et nous vous répondrons rapidement.",
    "contact.name": "Nom complet",
    "contact.email": "Adresse email",
    "contact.phone": "Numéro de téléphone",
    "contact.message": "Votre message",
    "contact.send": "Envoyer le message",
    "contact.sending": "Envoi en cours...",
    "contact.success": "Message envoyé avec succès ! Nous vous répondrons bientôt.",
    "contact.error": "Une erreur est survenue. Veuillez réessayer.",

    "footer.tagline":
      "Transformer l'agriculture. Autonomiser l'Afrique. Ensemble, nous cultivons un meilleur avenir.",
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

    "whatsapp.message":
      "Bonjour EFASOL ! Je souhaite en savoir plus sur vos services.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.impact": "Impact",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    "hero.eyebrow": "EFASOL — Eureka Farm Solutions",
    "hero.title1": "Transforming Agriculture.",
    "hero.title2": "Empowering Africa.",
    "hero.description":
      "EFASOL delivers innovative and sustainable solutions across the agriculture value chain — driving productivity, food security, and economic growth throughout Africa.",
    "hero.cta": "Get Started",
    "hero.cta2": "Our Services",
    "hero.badge1": "Sustainable Solutions",
    "hero.badge2": "Trusted Quality",
    "hero.badge3": "Empowered Communities",
    "hero.badge4": "Driving Growth",
    "hero.scroll": "Scroll",

    "services.title": "Our Core Services",
    "services.subtitle": "Comprehensive solutions for",
    "services.subtitle2": "every stage of farming",
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
    "services.learnMore": "Learn more",

    "about.label": "About EFASOL",
    "about.title": "Your trusted partner in",
    "about.title2": "agricultural excellence",
    "about.description":
      "EFASOL – Eureka Farm Solutions is committed to transforming agriculture across Africa through innovation, quality, and sustainable practices. We partner with farmers, businesses, and communities to build a stronger, food-secure future.",
    "about.farmers": "Farmers Empowered",
    "about.products": "Quality Products",
    "about.countries": "Countries Reached",
    "about.sustainable": "Sustainable Focus",

    "contact.eyebrow": "Contact",
    "contact.title": "Let's grow a better",
    "contact.title2": "future together",
    "contact.description":
      "We'd love to hear from you. Send us a message and we'll get back to you shortly.",
    "contact.name": "Full name",
    "contact.email": "Email address",
    "contact.phone": "Phone number",
    "contact.message": "Your message",
    "contact.send": "Send message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully! We'll be in touch soon.",
    "contact.error": "Something went wrong. Please try again.",

    "footer.tagline":
      "Transforming agriculture. Empowering Africa. Together, we grow a better tomorrow.",
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

    "whatsapp.message":
      "Hello EFASOL! I would like to know more about your services.",
  },
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("efasol-lang");
    if (saved === "fr" || saved === "en") return saved;
    return (navigator.language || "en").startsWith("fr") ? "fr" : "en";
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("efasol-lang", lang);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
