import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { MenuItem } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCard3DProps {
  item: MenuItem;
  index: number;
}

const categoryImage: Record<string, string> = {
  pizza: "https://foodish-api.com/images/pizza/pizza34.jpg",
  burger: "https://foodish-api.com/images/burger/burger54.jpg",
  savory: "https://foodish-api.com/images/pasta/pasta33.jpg",
  sweet: "https://foodish-api.com/images/dessert/dessert29.jpg",
  sandwich: "https://foodish-api.com/images/biryani/biryani34.jpg",
};

type Size = "s" | "m" | "l";

const sizeLabels: Record<Size, string> = { s: "صغير", m: "وسط", l: "كبير" };

function getAvailableSizes(item: MenuItem): Size[] {
  const sizes: Size[] = ["s"];
  if (item.priceM != null) sizes.push("m");
  if (item.priceL != null) sizes.push("l");
  return sizes;
}

function getPriceForSize(item: MenuItem, size: Size): number {
  if (size === "l" && item.priceL != null) return item.priceL;
  if (size === "m" && item.priceM != null) return item.priceM;
  return item.price;
}

export function ProductCard3D({ item, index }: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsOpen } = useCart();
  const sizes = getAvailableSizes(item);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[0]);
  const multiSize = sizes.length > 1;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, []);

  const resetTilt = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  }, []);

  const handleAdd = () => {
    addItem(item, selectedSize);
    setIsOpen(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring", stiffness: 260, damping: 24, delay: index * 0.07,
      }}
      whileHover={{
        y: multiSize ? -4 : -8,
        boxShadow: "0 20px 60px rgba(212, 175, 55, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      dir="rtl"
      style={{
        borderRadius: 16, overflow: "hidden", cursor: "default",
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        background: "rgba(20, 20, 40, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          width: "100%", height: 160, position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={categoryImage[item.category] || "/images/gallery-6.jpg"}
          alt={item.nameAr}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(8,14,26,0.85) 100%)",
            pointerEvents: "none",
          }}
        />
        {item.badge && (
          <span
            style={{
              position: "absolute", top: 10, left: 10,
              background: "linear-gradient(135deg, #d4af37, #f5d76e)",
              color: "#1a1a2e", padding: "3px 10px", borderRadius: 20,
              fontSize: "0.7rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.5px",
            }}
          >
            {item.badge}
          </span>
        )}
      </div>

      <div style={{ padding: "12px 14px 16px", textAlign: "right" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700,
            margin: 0, marginBottom: 1, color: "#fff",
          }}
        >
          {item.nameAr}
        </h3>
        <p
          style={{
            fontSize: "0.75rem", fontWeight: 400, margin: 0, marginBottom: 4,
            color: "rgba(255, 255, 255, 0.35)", direction: "ltr", textAlign: "right",
          }}
        >
          {item.name}
        </p>

        {multiSize && (
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
                style={{
                  padding: "3px 10px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 600,
                  border: selectedSize === s ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                  background: selectedSize === s ? "rgba(212,175,55,0.15)" : "transparent",
                  color: selectedSize === s ? "#d4af37" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {sizeLabels[s]}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#d4af37" }}>
            {getPriceForSize(item, selectedSize)} ج.م
          </span>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "linear-gradient(135deg, #d4af37, #f5d76e)",
              color: "#1a1a2e", fontWeight: 600, fontSize: "0.8rem",
              padding: "6px 14px", borderRadius: 8,
              border: "none", cursor: "pointer",
              transition: "box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 25px rgba(212, 175, 55, 0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.3)"; }}
          >
            <ShoppingCart size={14} />
            أضف للسلة
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
