import { useMemo } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "../types";
import { ProductCard3D } from "./ProductCard3D";

interface MenuGridProps {
  items: MenuItem[];
  category?: string;
  columns?: 2 | 3 | 4;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const columnTemplates: Record<number, string> = {
  2: "repeat(2, 1fr)",
  3: "repeat(3, 1fr)",
  4: "repeat(4, 1fr)",
};

export function MenuGrid({
  items,
  category = "all",
  columns = 3,
}: MenuGridProps) {
  const filtered = useMemo(() => {
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  if (filtered.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          padding: "64px 24px",
          color: "#999",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🍽️</div>
        <p style={{ fontSize: "1.1rem", margin: 0 }}>
          No items found in this category.
        </p>
      </motion.div>
    );
  }

  const desktopCols = columnTemplates[columns];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
        }}
        className="menu-grid"
      >
        <style>{`
          @media (min-width: 640px) {
            .menu-grid {
              grid-template-columns: ${desktopCols} !important;
            }
          }
        `}</style>
        {filtered.map((item, i) => (
          <ProductCard3D key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
