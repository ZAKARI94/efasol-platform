import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

/**
 * Home Page - EFASOL Landing Page
 * 
 * Page d'accueil complète avec:
 * - Navigation sticky
 * - Hero section avec image et CTA
 * - Section des services (5 cartes)
 * - Section "About Us" avec statistiques
 * - Footer avec liens et contact
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
