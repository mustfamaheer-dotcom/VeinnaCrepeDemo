import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, Camera, MessageCircle, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "../utils/constants";
import { navLinks } from "../data/menu";

const socialLinks = [
  { label: "Facebook", href: SITE_CONFIG.facebook, icon: Globe },
  { label: "Instagram", href: SITE_CONFIG.instagram, icon: Camera },
  { label: "WhatsApp", href: `https://wa.me/${SITE_CONFIG.whatsapp}`, icon: MessageCircle },
];

const contactDetails = [
  { icon: MapPin, text: SITE_CONFIG.address },
  { icon: Phone, text: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { icon: Mail, text: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
];

const sectionTitle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#fff",
  marginBottom: 20,
  fontFamily: "serif",
  letterSpacing: "0.02em",
};

const linkItem: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
  transition: "color 0.25s",
  cursor: "pointer",
};

const goldHover = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = "#d4a853";
};

const whiteHover = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
};

export function Footer() {
  const [cols, setCols] = useState(4);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 900) setCols(4);
      else if (w >= 640) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <footer
      style={{
        background: "#050508",
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 20px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 40,
          }}
        >
          {/* Logo + Description */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img
                src="/images/logo.jpeg"
                alt="Vienna Crepe"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(212,168,83,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily: "serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vienna Crepe
              </span>
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                margin: 0,
              }}
            >
              حيث يلتقي الطعم بالأناقة. نقدم أفضل كريب، بيتزا، برجر، ساندوتشات في قلب القاهرة منذ 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={sectionTitle}>روابط سريعة</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    style={linkItem}
                    onMouseEnter={goldHover}
                    onMouseLeave={whiteHover}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 style={sectionTitle}>تابعنا</h4>
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    transition: "background 0.25s, border-color 0.25s, color 0.25s",
                    textDecoration: "none",
                  }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(212,168,83,0.15)";
                    e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)";
                    e.currentTarget.style.color = "#d4a853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={sectionTitle}>تواصل معنا</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {contactDetails.map((c, i) => (
                <li key={i}>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{
                        ...linkItem,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    >
                      <c.icon size={14} style={{ flexShrink: 0 }} />
                      {c.text}
                    </a>
                  ) : (
                    <span
                      style={{
                        ...linkItem,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "default",
                      }}
                    >
                      <c.icon size={14} style={{ flexShrink: 0 }} />
                      {c.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            جميع الحقوق محفوظة &copy; 2026 Vienna Crepe
          </p>
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s, border-color 0.25s, color 0.25s",
            }}
            whileHover={{ y: -3 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,168,83,0.15)";
              e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)";
              e.currentTarget.style.color = "#d4a853";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>


    </footer>
  );
}
