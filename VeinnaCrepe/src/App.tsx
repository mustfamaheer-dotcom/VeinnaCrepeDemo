import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Navigation } from "./components/Navigation";
import { CartSidebar } from "./components/CartSidebar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsApp/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <CartProvider>
      <div dir="rtl" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ScrollToTop />
        <Navigation />
        <CartSidebar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
