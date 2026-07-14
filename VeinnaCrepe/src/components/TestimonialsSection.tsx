import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../data/menu";

const goldGradient = "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)";
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: "40px 32px",
  boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
  textAlign: "center",
  width: "100%",
};

const btnBase: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  backdropFilter: "blur(8px)",
  transition: "background 0.25s, border-color 0.25s",
};

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, #0a0a0f 0%, #111120 50%, #0a0a0f 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
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
        ماذا يقول عملاؤنا
      </motion.h2>

      <div
        style={{
          position: "relative",
          maxWidth: 580,
          margin: "0 auto",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          style={{ ...btnBase, left: -8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,168,83,0.2)";
            e.currentTarget.style.borderColor = "rgba(212,168,83,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={next}
          aria-label="Next testimonial"
          style={{ ...btnBase, right: -8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,168,83,0.2)";
            e.currentTarget.style.borderColor = "rgba(212,168,83,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronRight size={22} />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={glassCard}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                margin: "0 auto 16px",
                background: goldGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "serif",
              }}
            >
              {t.name.charAt(0)}
            </div>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 2,
              }}
            >
              {t.name}
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 14,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              زبون
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                marginBottom: 18,
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={17}
                  fill={i < t.rating ? "#d4af37" : "none"}
                  color={i < t.rating ? "#d4af37" : "rgba(255,255,255,0.15)"}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 28,
        }}
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === current ? "#d4af37" : "rgba(255,255,255,0.15)",
              transition: "background 0.3s, transform 0.3s",
              transform: i === current ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
