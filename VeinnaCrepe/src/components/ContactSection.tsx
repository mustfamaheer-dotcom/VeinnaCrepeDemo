import { type FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, Send, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "../utils/constants";

const goldGradient = "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)";
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: "24px",
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const contactItems = [
  { icon: MapPin, label: "العنوان", text: SITE_CONFIG.address },
  { icon: Phone, label: "الهاتف", text: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { icon: Clock, label: "ساعات العمل", text: SITE_CONFIG.hours },
];

export function ContactSection() {
  const [columns, setColumns] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 900) setColumns(1);
      else setColumns(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.email.trim()) errs.email = "البريد الإلكتروني مطلوب";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "البريد الإلكتروني غير صحيح";
    if (!form.message.trim()) errs.message = "الرسالة مطلوبة";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    padding: "20px 16px 8px",
    fontSize: "0.9rem",
    color: "#fff",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    boxSizing: "border-box",
    textAlign: "right",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#d4a853";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,168,83,0.15)";
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#0a0a0f",
      }}
    >
      <motion.h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: 48,
          fontFamily: "serif",
          background: goldGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        تواصل معنا
      </motion.h2>

      <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: columns === 1 ? "1fr" : "1fr 1fr",
            gap: "40px 48px",
          }}
      >
        {/* Left: Map */}
        <motion.div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            height: 400,
          }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27635.778869071843!2d31.224350883984374!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa876b7b2d1%3A0x8cd2a45c6f3a3e8a!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1"
            width="100%"
            height="100%"
            loading="lazy"
            title="Vienna Crepe Location"
            style={{ border: 0, borderRadius: 16 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Right: Contact Info + Form */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {contactItems.map((item) => (
            <div key={item.label} style={glassCard}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(212,168,83,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <item.icon size={20} color="#d4a853" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  >
                    {item.text}
                  </a>
                ) : (
                  <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: "0.9rem", margin: 0 }}>
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                background: "inherit",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <MessageCircle size={18} style={{ position: "relative", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 1 }}>تحدث عبر واتساب</span>
          </motion.a>

          {/* Form */}
          <div
            style={{
              ...glassCard,
              flexDirection: "column",
              alignItems: "stretch",
              padding: "28px",
              marginTop: 4,
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 0",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Send size={28} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
                  تم إرسال الرسالة!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", margin: 0 }}>
                  سنتواصل معك خلال 24 ساعة
                </p>
              </motion.div>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 20,
                  }}
                >
                  أرسل لنا رسالة
                </h3>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                  noValidate
                >
                  <FloatingInput
                    label="الاسم"
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => handleChange("name", v)}
                    inputBase={inputBase}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                  <FloatingInput
                    label="البريد الإلكتروني"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => handleChange("email", v)}
                    inputBase={inputBase}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                  <FloatingTextarea
                    label="رسالتك"
                    value={form.message}
                    error={errors.message}
                    onChange={(v) => handleChange("message", v)}
                    inputBase={{ ...inputBase, resize: "none" }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 10,
                      border: "none",
                      background: goldGradient,
                      color: "#0a0a0f",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.6 : 1,
                    }}
                    whileHover={!submitting ? { scale: 1.02 } : undefined}
                    whileTap={!submitting ? { scale: 0.98 } : undefined}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        إرسال الرسالة
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>


    </section>
  );
}

function FloatingInput({
  label,
  value,
  error,
  type = "text",
  onChange,
  inputBase,
  onFocus,
  onBlur,
}: {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (v: string) => void;
  inputBase: React.CSSProperties;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          ...inputBase,
          borderColor: error ? "#ef4444" : "rgba(255,255,255,0.1)",
        }}
        placeholder=" "
      />
      <label
        htmlFor={label}
        style={{
          position: "absolute",
          right: 16,
          top: value ? 8 : "50%",
          transform: value ? "translateY(0)" : "translateY(-50%)",
          fontSize: value ? "0.7rem" : "0.85rem",
          color: error ? "#ef4444" : "rgba(255,255,255,0.35)",
          pointerEvents: "none",
          transition: "all 0.2s ease",
        }}
      >
        {label}
      </label>
      {error && (
        <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "#ef4444", textAlign: "right" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  error,
  onChange,
  inputBase,
  onFocus,
  onBlur,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  inputBase: React.CSSProperties;
  onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <textarea
        id={label}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          ...inputBase,
          padding: "20px 16px 8px",
          borderColor: error ? "#ef4444" : "rgba(255,255,255,0.1)",
        }}
        placeholder=" "
      />
      <label
        htmlFor={label}
        style={{
          position: "absolute",
          right: 16,
          top: value ? 8 : 16,
          fontSize: value ? "0.7rem" : "0.85rem",
          color: error ? "#ef4444" : "rgba(255,255,255,0.35)",
          pointerEvents: "none",
          transition: "all 0.2s ease",
        }}
      >
        {label}
      </label>
      {error && (
        <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "#ef4444", textAlign: "right" }}>
          {error}
        </p>
      )}
    </div>
  );
}
