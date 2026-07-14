import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/menu";

const goldGradient = "linear-gradient(135deg, #d4a853, #f5d77b, #d4a853)";
const cardStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  cursor: "pointer",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
};

export function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCols(4);
      else if (w >= 640) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((p) => (p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setSelectedIndex((p) => (p !== null ? (p + 1) % galleryImages.length : null));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, prev, next]);

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#0a0a0f",
        textAlign: "center",
      }}
    >
      <motion.h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
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
        معرض الصور
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 16,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            onClick={() => open(i)}
            style={cardStyle}
            whileHover={{ scale: 1.03, borderColor: "rgba(212,168,83,0.4)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 280,
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
              />
            </div>
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                display: "flex",
                alignItems: "flex-end",
                padding: 20,
                opacity: 0,
                transition: "opacity 0.3s ease",
                borderRadius: 16,
              }}
              whileHover={{ opacity: 1 }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {img.alt}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={close}
              aria-label="Close lightbox"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 10,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              <X size={22} />
            </button>

            <button
              onClick={prev}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 20,
                zIndex: 10,
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronLeft size={26} />
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 20,
                zIndex: 10,
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronRight size={26} />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={selectedIndex}
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 320 : -320, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -320 : 320, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  maxWidth: "88vw",
                  maxHeight: "84vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              />
            </AnimatePresence>

            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: 1,
                background: "rgba(0,0,0,0.5)",
                padding: "6px 16px",
                borderRadius: 20,
                backdropFilter: "blur(8px)",
              }}
            >
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
