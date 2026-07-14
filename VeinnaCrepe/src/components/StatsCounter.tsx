import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { stats } from "../data/menu";

const goldGradient = "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)";

export function StatsCounter() {
  const { ref, isInView } = useInView(0.3, true);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 1500;
    const start = performance.now();
    const targets = stats.map((s) => s.value);

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => Math.floor(eased * t)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, #0a0a0f 0%, #111120 40%, #0d0d1a 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 700,
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
        أرقامنا تتحدث
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            style={{
              padding: "28px 16px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                fontWeight: 800,
                background: goldGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 8,
                fontFamily: "serif",
                lineHeight: 1.1,
              }}
            >
              {counts[i]}
              {stat.suffix}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
