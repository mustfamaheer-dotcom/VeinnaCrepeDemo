import { motion } from "framer-motion";
import { ContactSection } from "../components/ContactSection";

export default function ContactPage() {
  return (
    <div dir="rtl" style={{ paddingTop: "5rem", background: "var(--bg-dark)", fontFamily: "var(--font-arabic)" }}>
      <section
        style={{
          padding: "5rem 1rem 4rem",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(10,22,40,0.9), var(--bg-dark))",
        }}
      >
        <motion.h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.75rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          تواصل معنا
        </motion.h1>
        <motion.p
          style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          يسعدنا سماع رأيك. تواصل معنا للطلبات أو الاستفسارات
        </motion.p>
      </section>
      <ContactSection />
    </div>
  );
}
