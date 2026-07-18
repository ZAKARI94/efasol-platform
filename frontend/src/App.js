import "./App.css";
import { Toaster } from "sonner";
import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <CartProvider>
          <div className="App min-h-screen bg-[#F3F4F6]">
            <div className="noise-overlay" aria-hidden />
            {!isAdminRoute ? <ScrollProgress /> : null}
            {!isAdminRoute ? <Navbar /> : null}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/products"
                element={(
                  <AdminProtectedRoute>
                    <AdminProductsPage />
                  </AdminProtectedRoute>
                )}
              />
              <Route
                path="/admin/orders"
                element={(
                  <AdminProtectedRoute>
                    <AdminOrdersPage />
                  </AdminProtectedRoute>
                )}
              />
            </Routes>
            {!isAdminRoute ? <Footer /> : null}
            {!isAdminRoute ? <CartDrawer /> : null}
            {!isAdminRoute ? <WhatsAppButton /> : null}
            <Toaster position="top-center" richColors />
          </div>
        </CartProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}

export default App;
