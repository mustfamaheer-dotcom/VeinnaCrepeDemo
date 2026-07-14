import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import { navLinks } from "../data/menu";
import { useCart } from "../context/CartContext";

const goldGradient = {
  background: "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text" as const,
};

const linkStyle = (isActive: boolean, _scrolled: boolean) =>
  ({
    position: "relative",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: isActive ? "#d4a853" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    transition: "color 0.3s ease",
    cursor: "pointer",
  }) as React.CSSProperties;

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollTrigger(80);
  const { pathname } = useLocation();
  const { itemCount, setIsOpen } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: "0 1.5rem",
        background: scrolled ? "rgba(8, 14, 26, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212, 175, 55, 0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "rtl",
          height: scrolled ? "64px" : "80px",
          transition: "height 0.4s ease",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <motion.img
            src="/images/logo.jpeg"
            alt="Vienna Crepe"
            style={{
              width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover",
              border: "2px solid rgba(212, 168, 83, 0.4)",
              transition: "border 0.4s ease",
            }}
            whileHover={{ scale: 1.08, borderColor: "#d4a853" }}
          />
          <span
            style={{
              fontFamily: "serif", fontSize: "1.35rem", fontWeight: 700,
              letterSpacing: "0.02em", ...goldGradient,
            }}
          >
            Vienna Crepe
          </span>
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={linkStyle(isActive(link.href), scrolled)}
              onMouseEnter={(e) => { if (!isActive(link.href)) e.currentTarget.style.color = "#d4a853"; }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: "absolute", bottom: "-4px", left: 0, right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, #d4a853, #f5d77b)",
                    borderRadius: "1px",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "relative",
              background: "none", border: "none",
              color: "rgba(255,255,255,0.85)", cursor: "pointer",
              padding: 4, display: "flex",
            }}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -6,
                width: 18, height: 18, borderRadius: "50%",
                background: "#d4af37", color: "#0a1628",
                fontSize: "0.65rem", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {itemCount}
              </span>
            )}
          </motion.button>
        </nav>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", padding: "0.5rem", borderRadius: "8px",
            border: "none", background: "transparent",
            color: "rgba(255,255,255,0.9)", cursor: "pointer",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            style={{
              position: "fixed", inset: 0, top: scrolled ? "64px" : "80px", zIndex: 40,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
              background: "rgba(8, 14, 26, 0.95)", backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(212, 175, 55, 0.08)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontSize: "1.75rem", fontWeight: 500,
                      color: isActive(link.href) ? "#d4a853" : "rgba(255,255,255,0.8)",
                      textDecoration: "none", letterSpacing: "0.02em",
                      position: "relative", transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isActive(link.href) ? "#d4a853" : "rgba(255,255,255,0.8)";
                    }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="mobile-nav-underline"
                        style={{
                          position: "absolute", bottom: "-6px", left: "20%", right: "20%",
                          height: "2px",
                          background: "linear-gradient(90deg, #d4a853, #f5d77b)",
                          borderRadius: "1px",
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                onClick={() => { setMobileOpen(false); setIsOpen(true); }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #d4af37, #f5d76e)",
                  color: "#0a1628", border: "none", borderRadius: 50,
                  padding: "12px 28px", fontWeight: 700, fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                <ShoppingBag size={18} />
                {itemCount > 0 ? `السلة (${itemCount})` : "السلة"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
