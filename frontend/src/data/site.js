// Centralized site configuration — data belongs in config files.
import { Egg, Wheat, Sprout, Fish, Beef, Users, Award, Globe, Leaf, Search, Cog, Handshake, LineChart } from "lucide-react";

export const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/d706330c49a585ea32888347e6b5dff943b16e22808bd295e6d5d2dee44ba712.png",
  about: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/9634fb87fa5b4e0d39f01c01b8acb61131f7a26003d7834f378a060771b74f3d.png",
  poultry: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/c759c77bac655704cc0499c4f8aeea5eb670cefa24532b0c991edc1984cc7aa5.png",
  feed: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/8d69418b08a0484e20f653e35947e6dbc440af044438a074abab0105454c4e31.png",
  agriculture: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/d3955fa23ab08908bb965db774bf025226d04cc17690e63a5964922ff23aa2be.png",
  aquaculture: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/6390d121f2aa678ae08469be9ee6aa3b731692d17eae3e5a745293abfafe804a.png",
  livestock: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/9e139a764d86bf4ae07c30f15df184cd62aac05a886dfe76a5384eb2c12293f5.png",
  avatar1: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/89b8913f08ab3ac477d901a1cbaa0c22fc9ddc34ab810ae805eac2656ce83a5c.png",
  avatar2: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/f7a4e45446c3f15746fa325dae5fe07a5dea93cac8b30458f96d656ec44ea6e3.png",
  avatar3: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/4aa07912e671456caa31dec364b802e5dc5eec08c6d1c10fdd7fbad903b7755e.png",
  cta: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/96952d22d0081519f616d0b9be0cd36f1c1e50d6f35604519ad086bab33f5021.png",
  blog1: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/f6f62dc13142467597c6de281f901ea0193361b27c87929492b0a03657a68c93.png",
  blog2: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/4ca75752896ed9a15ec4310c0968cd62f2da31a59f134c899ef0b2250f8524cc.png",
  blog3: "https://static.prod-images.emergentagent.com/jobs/4fc95641-0a79-473b-a562-b7afcb3992c5/images/c5e9ff3c6148749bd453510411497ff30dc891e16318305dbb591b62448436cf.png",
};

export const NAV_LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.services", href: "/services" },
  { key: "nav.marketplace", href: "/marketplace" },
  { key: "nav.contact", href: "/contact" },
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
  { icon: Users, prefix: "", value: 10000, suffix: "+", labelKey: "about.farmers" },
  { icon: Award, prefix: "", value: 50, suffix: "+", labelKey: "about.products" },
  { icon: Globe, prefix: "", value: 15, suffix: "+", labelKey: "about.countries" },
  { icon: Leaf, prefix: "", value: 100, suffix: "%", labelKey: "about.sustainable" },
];

export const TRUST_ITEMS = [
  "trust.item1", "trust.item2", "trust.item3", "trust.item4", "trust.item5", "trust.item6",
];

export const APPROACH = [
  { icon: Search, titleKey: "approach.s1_title", descKey: "approach.s1_desc" },
  { icon: Cog, titleKey: "approach.s2_title", descKey: "approach.s2_desc" },
  { icon: Handshake, titleKey: "approach.s3_title", descKey: "approach.s3_desc" },
  { icon: LineChart, titleKey: "approach.s4_title", descKey: "approach.s4_desc" },
];

export const TESTIMONIALS = [
  { image: IMAGES.avatar3, nameKey: "t.t1_name", roleKey: "t.t1_role", quoteKey: "t.t1_quote" },
  { image: IMAGES.avatar2, nameKey: "t.t2_name", roleKey: "t.t2_role", quoteKey: "t.t2_quote" },
  { image: IMAGES.avatar1, nameKey: "t.t3_name", roleKey: "t.t3_role", quoteKey: "t.t3_quote" },
];

export const WHATSAPP_NUMBER = "2250749378770";

export const BLOG_POSTS = [
  { id: "p1", image: IMAGES.blog1, categoryKey: "blog.p1_cat", dateKey: "blog.p1_date", titleKey: "blog.p1_title", excerptKey: "blog.p1_excerpt" },
  { id: "p2", image: IMAGES.blog2, categoryKey: "blog.p2_cat", dateKey: "blog.p2_date", titleKey: "blog.p2_title", excerptKey: "blog.p2_excerpt" },
  { id: "p3", image: IMAGES.blog3, categoryKey: "blog.p3_cat", dateKey: "blog.p3_date", titleKey: "blog.p3_title", excerptKey: "blog.p3_excerpt" },
];
