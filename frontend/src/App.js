import "./App.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Approach from "./components/Approach";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#F3F4F6]">
        <div className="noise-overlay" aria-hidden />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Approach />
          <About />
          <Testimonials />
          <Blog />
          <CTA />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-center" richColors />
      </div>
    </LanguageProvider>
  );
}

export default App;
