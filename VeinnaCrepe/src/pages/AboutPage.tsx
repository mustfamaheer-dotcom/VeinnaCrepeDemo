import { motion } from "framer-motion";
import { ChefHat, Heart, Medal, Award, Clock, Sparkles, Star } from "lucide-react";

const sectionStyle = (alt?: boolean): React.CSSProperties => ({
  padding: "80px 20px",
  background: alt ? "rgba(10, 22, 40, 0.4)" : "transparent",
});

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const values = [
  { icon: Medal, title: "مكونات عالية الجودة", desc: "نستخدم أفضل المكونات الطازجة يوميًا لنضمن لك طعم لا يُقاوم" },
  { icon: ChefHat, title: "خبرة احترافية", desc: "شيفاتنا لديهم خبرة سنوات في إعداد أشهى الأطباق" },
  { icon: Heart, title: "العميل أولاً", desc: "رضاك هو أولويتنا القصوى، ونسعى دائمًا لتقديم الأفضل" },
];

const team = [
  { name: "الشيف أحمد", role: "شيف رئيسي", icon: "👨‍🍳" },
  { name: "الشيف ماريا", role: "شيف حلويات", icon: "👩‍🍳" },
  { name: "عمر", role: "مدير", icon: "👔" },
];

const whyUs = [
  { icon: Award, title: "جودة عالية", desc: "مكونات طازجة يومياً" },
  { icon: Clock, title: "توصيل سريع", desc: "سخن وطازج، في كل مرة" },
  { icon: Sparkles, title: "أفضل قيمة", desc: "رفاهية بسعر يناسب الجميع" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div dir="rtl" style={{ paddingTop: "5rem", background: "var(--bg-dark)", fontFamily: "var(--font-arabic)" }}>
      {/* Hero */}
      <section style={{
        padding: "80px 20px 60px", textAlign: "center",
        background: "linear-gradient(180deg, rgba(10,22,40,0.95) 0%, var(--bg-dark) 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <motion.div {...fadeUp}>
          <span style={{
            display: "inline-block", padding: "4px 18px", borderRadius: 20,
            background: "rgba(212,175,55,0.12)", color: "#d4af37",
            fontSize: "0.8rem", fontWeight: 600, marginBottom: 16,
          }}>
            من نحن
          </span>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700, ...goldGrad, marginBottom: 16,
          }}>
            Vienna Crepe
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 550, margin: "0 auto" }}>
            رحلة من النكهة والأناقة وشغف الطهي في قلب القاهرة
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section style={sectionStyle(true)}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 50, alignItems: "center",
          }}>
            <motion.div {...fadeUp}>
              <span style={{
                display: "inline-block", padding: "3px 14px", borderRadius: 16,
                background: "rgba(212,175,55,0.1)", color: "#d4af37",
                fontSize: "0.75rem", fontWeight: 600, marginBottom: 12,
              }}>
                قصتنا
              </span>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                fontWeight: 700, ...goldGrad, marginBottom: 20, lineHeight: 1.4,
              }}>
                من شغف بسيط إلى أنجح وجهات الطعام
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 16 }}>
                فيينا كريب وُلدت من رؤية بسيطة: نقل أناقة الكريب الأوروبي إلى القاهرة، ممزوجة بالنكهات الغنية للمطبخ المصري.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 16 }}>
                ما بدأ كمشروع صغير بشغف تحول إلى واحد من أشهر وجهات الطعام في القاهرة.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.9 }}>
                نؤمن بأن الطعام الجيد يجمع الناس. كل طبق يُحضَّر بدقة وشغف وأفضل المكونات.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: "40px 30px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%",
                background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)",
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "5rem", marginBottom: 20, opacity: 0.8 }}>🥞</div>
              <div style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 16,
                padding: "20px", border: "1px solid rgba(212,175,55,0.1)",
              }}>
                <p style={{ color: "#d4af37", fontWeight: 700, fontSize: "1.2rem", fontFamily: "var(--font-heading)", marginBottom: 8 }}>
                  &ldquo;حيث تلتقي النكهة بالأناقة&rdquo;
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  منذ 2024 | القاهرة، مصر
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
                {[Star, Star, Star, Star, Star].map((_, i) => (
                  <Star key={i} size={18} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={sectionStyle()}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div style={{ textAlign: "center", marginBottom: 50 }} {...fadeUp}>
            <span style={{
              display: "inline-block", padding: "3px 14px", borderRadius: 16,
              background: "rgba(212,175,55,0.1)", color: "#d4af37",
              fontSize: "0.75rem", fontWeight: 600, marginBottom: 12,
            }}>
              قيمنا
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700, ...goldGrad, marginBottom: 12,
            }}>
              ما يحفزنا كل يوم
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              القيم اللي بنبني عليها كل حاجة
            </p>
          </motion.div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.3)" }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: "32px 24px", textAlign: "center",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(212,175,55,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 18px",
                }}>
                  <v.icon size={26} color="#d4af37" />
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
                  {v.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={sectionStyle(true)}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div style={{ textAlign: "center", marginBottom: 50 }} {...fadeUp}>
            <span style={{
              display: "inline-block", padding: "3px 14px", borderRadius: 16,
              background: "rgba(212,175,55,0.1)", color: "#d4af37",
              fontSize: "0.75rem", fontWeight: 600, marginBottom: 12,
            }}>
              الفريق
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700, ...goldGrad, marginBottom: 12,
            }}>
              تعرف على فريقنا
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              الناس اللي ورا أكلاتك المفضلة
            </p>
          </motion.div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 30,
          }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: "32px 20px",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px",
                  background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
                  border: "2px solid rgba(212,175,55,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.5rem",
                }}>
                  {member.icon}
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: 4 }}>
                  {member.name}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, rgba(10,22,40,0.98), rgba(26,42,90,0.6))",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div style={{ textAlign: "center", marginBottom: 50 }} {...fadeUp}>
            <span style={{
              display: "inline-block", padding: "3px 14px", borderRadius: 16,
              background: "rgba(212,175,55,0.12)", color: "#d4af37",
              fontSize: "0.75rem", fontWeight: 600, marginBottom: 12,
            }}>
              لماذا نحن؟
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700, ...goldGrad, marginBottom: 12,
            }}>
              لماذا Vienna Crepe؟
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              ثلاثة أسباب تخلينا الاختيار الأمثل
            </p>
          </motion.div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}>
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.3)" }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16, padding: "28px 24px",
                  textAlign: "center", transition: "border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(212,175,55,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <item.icon size={22} color="#d4af37" />
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
