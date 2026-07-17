import React, { createContext, useContext, useState } from "react";

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.impact": "Impact",
    "nav.contact": "Contact",
    "nav.getStarted": "Commencer",
    "nav.blog": "Actualités",

    "blog.eyebrow": "Actualités & Insights",
    "blog.title": "Dernières nouvelles de",
    "blog.title2": "l'agriculture africaine",
    "blog.readMore": "Lire l'article",
    "blog.p1_cat": "Innovation",
    "blog.p1_date": "12 Juin 2025",
    "blog.p1_title": "L'agriculture intelligente transforme les rendements en Afrique de l'Ouest",
    "blog.p1_excerpt": "Comment les capteurs, l'irrigation de précision et les données aident les agriculteurs à produire plus avec moins de ressources.",
    "blog.p2_cat": "Aviculture",
    "blog.p2_date": "28 Mai 2025",
    "blog.p2_title": "5 bonnes pratiques pour une aviculture saine et rentable",
    "blog.p2_excerpt": "De la biosécurité à la nutrition, les fondamentaux pour un élevage performant tout au long de l'année.",
    "blog.p3_cat": "Aquaculture",
    "blog.p3_date": "9 Mai 2025",
    "blog.p3_title": "L'aquaculture durable : une opportunité de croissance majeure",
    "blog.p3_excerpt": "Pourquoi la pisciculture responsable est l'un des secteurs les plus prometteurs pour la sécurité alimentaire.",

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

    "trust.item1": "Coopératives Agricoles",
    "trust.item2": "Agro-Industries",
    "trust.item3": "Éleveurs",
    "trust.item4": "Distributeurs",
    "trust.item5": "ONG & Partenaires",
    "trust.item6": "Gouvernements Locaux",

    "trust.heading": "La confiance des acteurs de l'agriculture à travers l'Afrique",

    "approach.eyebrow": "Notre Approche",
    "approach.title": "Une méthode éprouvée,",
    "approach.title2": "des résultats durables",
    "approach.s1_title": "Analyse & Diagnostic",
    "approach.s1_desc": "Nous étudions vos terres, vos objectifs et vos contraintes pour concevoir une solution sur mesure.",
    "approach.s2_title": "Solutions & Technologie",
    "approach.s2_desc": "Nous déployons intrants, équipements et savoir-faire adaptés à chaque maillon de la chaîne.",
    "approach.s3_title": "Accompagnement",
    "approach.s3_desc": "Nos experts forment et soutiennent vos équipes sur le terrain, à chaque saison.",
    "approach.s4_title": "Croissance Mesurable",
    "approach.s4_desc": "Nous suivons les rendements et optimisons en continu pour maximiser votre rentabilité.",

    "t.eyebrow": "Témoignages",
    "t.title": "Ils cultivent l'avenir",
    "t.title2": "avec EFASOL",
    "t.t1_name": "Aïcha Koné",
    "t.t1_role": "Présidente de coopérative, Korhogo",
    "t.t1_quote": "Grâce à EFASOL, nos rendements ont augmenté de 40 % en deux saisons. Leur accompagnement change réellement la vie de nos membres.",
    "t.t2_name": "Fatou Diallo",
    "t.t2_role": "Directrice, AgriTech Abidjan",
    "t.t2_quote": "Un partenaire fiable et innovant. La qualité des intrants et le suivi technique sont incomparables sur le marché.",
    "t.t3_name": "Kwame Mensah",
    "t.t3_role": "Éleveur avicole, Bouaké",
    "t.t3_quote": "Des aliments de qualité et des conseils avisés. Mon élevage est plus sain et bien plus rentable aujourd'hui.",

    "cta.title": "Prêt à transformer votre exploitation ?",
    "cta.description": "Rejoignez des milliers d'agriculteurs et d'entreprises qui font confiance à EFASOL pour bâtir un avenir agricole prospère.",
    "cta.button": "Parlons de votre projet",

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
    "nav.blog": "News",

    "blog.eyebrow": "News & Insights",
    "blog.title": "Latest from",
    "blog.title2": "African agriculture",
    "blog.readMore": "Read article",
    "blog.p1_cat": "Innovation",
    "blog.p1_date": "June 12, 2025",
    "blog.p1_title": "Smart farming is transforming yields across West Africa",
    "blog.p1_excerpt": "How sensors, precision irrigation, and data are helping farmers produce more with fewer resources.",
    "blog.p2_cat": "Poultry",
    "blog.p2_date": "May 28, 2025",
    "blog.p2_title": "5 best practices for healthy, profitable poultry farming",
    "blog.p2_excerpt": "From biosecurity to nutrition, the fundamentals for a high-performing flock all year round.",
    "blog.p3_cat": "Aquaculture",
    "blog.p3_date": "May 9, 2025",
    "blog.p3_title": "Sustainable aquaculture: a major growth opportunity",
    "blog.p3_excerpt": "Why responsible fish farming is one of the most promising sectors for food security.",

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

    "trust.item1": "Farming Cooperatives",
    "trust.item2": "Agribusinesses",
    "trust.item3": "Livestock Farmers",
    "trust.item4": "Distributors",
    "trust.item5": "NGOs & Partners",
    "trust.item6": "Local Governments",

    "trust.heading": "Trusted by agriculture leaders across Africa",

    "approach.eyebrow": "Our Approach",
    "approach.title": "A proven method,",
    "approach.title2": "lasting results",
    "approach.s1_title": "Analysis & Diagnosis",
    "approach.s1_desc": "We study your land, goals, and constraints to design a solution tailored to you.",
    "approach.s2_title": "Solutions & Technology",
    "approach.s2_desc": "We deploy inputs, equipment, and know-how suited to every link in the value chain.",
    "approach.s3_title": "Hands-on Support",
    "approach.s3_desc": "Our experts train and support your teams in the field, season after season.",
    "approach.s4_title": "Measurable Growth",
    "approach.s4_desc": "We track yields and continuously optimize to maximize your profitability.",

    "t.eyebrow": "Testimonials",
    "t.title": "Growing the future",
    "t.title2": "with EFASOL",
    "t.t1_name": "Aïcha Koné",
    "t.t1_role": "Cooperative President, Korhogo",
    "t.t1_quote": "Thanks to EFASOL, our yields rose 40% in two seasons. Their support genuinely changes the lives of our members.",
    "t.t2_name": "Fatou Diallo",
    "t.t2_role": "Director, AgriTech Abidjan",
    "t.t2_quote": "A reliable, innovative partner. The quality of inputs and the technical follow-up are unmatched on the market.",
    "t.t3_name": "Kwame Mensah",
    "t.t3_role": "Poultry Farmer, Bouaké",
    "t.t3_quote": "Quality feed and sound advice. My flock is healthier and far more profitable today.",

    "cta.title": "Ready to transform your farm?",
    "cta.description": "Join thousands of farmers and businesses who trust EFASOL to build a thriving agricultural future.",
    "cta.button": "Let's talk about your project",

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
