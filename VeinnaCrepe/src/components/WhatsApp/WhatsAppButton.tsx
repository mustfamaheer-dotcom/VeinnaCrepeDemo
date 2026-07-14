import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_MESSAGE } from "../../utils/constants";

export function WhatsAppButton() {
  const url = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        width: 56,
        height: 56,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(34,197,94,0.3)",
        textDecoration: "none",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "inherit",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <Phone size={24} style={{ position: "relative", zIndex: 1 }} />
    </motion.a>
  );
}
