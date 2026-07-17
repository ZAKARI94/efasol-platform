// Centralized site configuration — data belongs in config files.
import { Egg, Wheat, Sprout, Fish, Beef, Users, Award, Globe, Leaf } from "lucide-react";

export const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/d706330c49a585ea32888347e6b5dff943b16e22808bd295e6d5d2dee44ba712.png",
  about: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/9634fb87fa5b4e0d39f01c01b8acb61131f7a26003d7834f378a060771b74f3d.png",
  poultry: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/c759c77bac655704cc0499c4f8aeea5eb670cefa24532b0c991edc1984cc7aa5.png",
  feed: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/8d69418b08a0484e20f653e35947e6dbc440af044438a074abab0105454c4e31.png",
  agriculture: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/d3955fa23ab08908bb965db774bf025226d04cc17690e63a5964922ff23aa2be.png",
  aquaculture: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/6390d121f2aa678ae08469be9ee6aa3b731692d17eae3e5a745293abfafe804a.png",
  livestock: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/9e139a764d86bf4ae07c30f15df184cd62aac05a886dfe76a5384eb2c12293f5.png",
};

export const NAV_LINKS = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.contact", href: "#contact" },
];

// Bento layout: span classes create asymmetry on large screens.
export const SERVICES = [
  { id: "poultry", icon: Egg, image: IMAGES.poultry, titleKey: "services.poultry", descKey: "services.poultry_desc", span: "lg:col-span-7", tall: true },
  { id: "feed", icon: Wheat, image: IMAGES.feed, titleKey: "services.feed", descKey: "services.feed_desc", span: "lg:col-span-5", tall: true },
  { id: "agriculture", icon: Sprout, image: IMAGES.agriculture, titleKey: "services.agriculture", descKey: "services.agriculture_desc", span: "lg:col-span-4", tall: false },
  { id: "aquaculture", icon: Fish, image: IMAGES.aquaculture, titleKey: "services.aquaculture", descKey: "services.aquaculture_desc", span: "lg:col-span-4", tall: false },
  { id: "livestock", icon: Beef, image: IMAGES.livestock, titleKey: "services.livestock", descKey: "services.livestock_desc", span: "lg:col-span-4", tall: false },
];

export const HERO_BADGES = [
  { icon: Leaf, key: "hero.badge1" },
  { icon: Award, key: "hero.badge2" },
  { icon: Users, key: "hero.badge3" },
  { icon: Globe, key: "hero.badge4" },
];

export const STATS = [
  { icon: Users, number: "10,000+", labelKey: "about.farmers" },
  { icon: Award, number: "50+", labelKey: "about.products" },
  { icon: Globe, number: "15+", labelKey: "about.countries" },
  { icon: Leaf, number: "100%", labelKey: "about.sustainable" },
];

export const WHATSAPP_NUMBER = "2250749378770";
