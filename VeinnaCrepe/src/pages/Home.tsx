import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { MenuGrid } from "../components/MenuGrid";
import { StatsCounter } from "../components/StatsCounter";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ContactSection } from "../components/ContactSection";
import { ImageGallery } from "../components/ImageGallery";
import { featuredItems, menuItems, menuCategories } from "../data/menu";
import { ChefHat, Pizza, Sandwich, IceCream } from "lucide-react";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div
    className="section-title"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </motion.div>
);

const Section = ({ id, children, dark }: { id?: string; children: React.ReactNode; dark?: boolean }) => (
  <section id={id} className="section" style={{ background: dark ? "var(--bg-dark)" : "rgba(10, 22, 40, 0.5)" }}>
    <div className="container">{children}</div>
  </section>
);

const storyCards = [
  { icon: ChefHat, label: "شيفات محترفة", desc: "خبرة سنوات في كل طبق" },
  { icon: Pizza, label: "مكونات طازجة", desc: "أفضل المكونات يوميًا" },
  { icon: Sandwich, label: "وصفات حصرية", desc: "مزيج فريد من النكهات" },
  { icon: IceCream, label: "حلويات مميزة", desc: "لذة لا تُقاوم" },
];

export default function Home() {
  return (
    <div dir="rtl" style={{ fontFamily: "var(--font-arabic)" }}>
      <HeroSection />

      <Section id="featured">
        <SectionHeading title="الأكثر مبيعًا" subtitle="أكثر الأصناف طلبًا من عملائنا" />
        <MenuGrid items={featuredItems} columns={3} />
      </Section>

      <Section id="about" dark>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <span style={{
              display: "inline-block", padding: "4px 16px", borderRadius: 20,
              background: "rgba(212, 175, 55, 0.12)", color: "#d4af37",
              fontSize: "0.8rem", fontWeight: 600, letterSpacing: 1, marginBottom: 12,
            }}>
              قصتنا
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
                background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 20,
              }}
            >
              حيث يلتقي الشغف بالتميز
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.9, maxWidth: 700, margin: "0 auto" }}>
              فيينا كريب مش مجرد مطعم، ده شغف وحب للطبخ. في قلب القاهرة، بنقدملك مزيج فريد من الوصفات الأصيلة والإبداع العصري.
            </p>
          </motion.div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20, marginBottom: 50,
          }}>
            {storyCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "32px 20px",
                  textAlign: "center",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
                whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.3)" }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(212,175,55,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <card.icon size={26} color="#d4af37" />
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>
                  {card.label}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap",
              padding: "30px 20px",
              background: "rgba(212,175,55,0.04)",
              borderRadius: 24,
              border: "1px solid rgba(212,175,55,0.08)",
            }}
          >
            {[
              { num: "منذ 2024", label: "بدأنا الرحلة" },
              { num: "130+", label: "صنف في القائمة" },
              { num: "5★", label: "تقييم العملاء" },
              { num: "500+", label: "زبون سعيد" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "#d4af37", fontWeight: 800, fontSize: "1.6rem", fontFamily: "var(--font-heading)" }}>
                  {s.num}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="menu">
        <SectionHeading title="تصفح قائمتنا" subtitle="من الحادق للحلو، اختر وجبتك المثالية" />
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {menuCategories.filter((c) => c.id !== "all").map((cat) => {
            const catItems = menuItems.filter((item) => item.category === cat.id).slice(0, 4);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 24, flexWrap: "wrap", gap: 8,
                }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      fontWeight: 700, margin: 0,
                      background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {cat.icon} {cat.label}
                  </h3>
                  <Link
                    to="/menu"
                    style={{
                      color: "var(--accent)", fontWeight: 500, fontSize: "0.85rem",
                      textDecoration: "none", transition: "color 0.3s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-light)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                  >
                    عرض الكل →
                  </Link>
                </div>
                <MenuGrid items={catItems} columns={4} />
              </motion.div>
            );
          })}
        </div>
      </Section>

      <ImageGallery />
      <StatsCounter />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
