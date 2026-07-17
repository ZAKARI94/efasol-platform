import "./App.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#F3F4F6]">
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
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
