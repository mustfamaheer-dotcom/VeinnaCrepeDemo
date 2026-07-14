import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { MenuGrid } from "../components/MenuGrid";
import { menuItems, menuCategories } from "../data/menu";

const styles = {
  page: { paddingTop: "5rem", background: "var(--bg-dark)", minHeight: "100vh" },
  header: {
    padding: "4rem 1rem 3rem",
    textAlign: "center" as const,
    background: "linear-gradient(180deg, rgba(10,22,40,0.8), var(--bg-dark))",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 700,
    background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "0.75rem",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "1.1rem",
    maxWidth: "500px",
    margin: "0 auto",
  },
  filterBar: {
    position: "sticky" as const,
    top: "5rem",
    zIndex: 30,
    padding: "1rem",
    background: "rgba(8, 14, 26, 0.95)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  filterInner: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabs: {
    display: "flex",
    gap: "0.5rem",
    overflowX: "auto" as const,
    paddingBottom: "0.25rem",
    width: "100%",
  },
  tab: (active: boolean) => ({
    padding: "0.5rem 1.25rem",
    borderRadius: "50px",
    fontSize: "0.875rem",
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
    border: "1px solid",
    borderColor: active ? "var(--accent)" : "rgba(255,255,255,0.1)",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#0a1628" : "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.3s",
  }),
  searchWrap: { position: "relative" as const, width: "100%", maxWidth: "320px" },
  searchIcon: {
    position: "absolute" as const,
    right: "1rem",
    left: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
    pointerEvents: "none" as const,
  },
  search: {
    width: "100%",
    padding: "0.65rem 2.75rem 0.65rem 1rem",
    borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  content: { padding: "3rem 1rem", minHeight: "60vh" },
  empty: { textAlign: "center" as const, padding: "4rem 0", color: "var(--text-muted)", fontSize: "1.1rem" },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.nameAr.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div dir="rtl" style={{ ...styles.page, fontFamily: "var(--font-arabic)" }}>
      <section style={styles.header}>
        <motion.h1 style={styles.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          قائمتنا الكاملة
        </motion.h1>
        <motion.p style={styles.subtitle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          تصفح تشكيلتنا الواسعة من الكريب والبيتزا والبرجر والساندوتشات
        </motion.p>
      </section>

      <div style={styles.filterBar}>
        <div className="container" style={styles.filterInner}>
          <div style={styles.tabs}>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={styles.tab(activeCategory === cat.id)}
                onMouseEnter={(e) => { if (activeCategory !== cat.id) e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { if (activeCategory !== cat.id) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          <div style={styles.searchWrap}>
            <Search size={16} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="ابحث في القائمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.search}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>
        </div>
      </div>

      <section style={styles.content}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length > 0 ? (
                <MenuGrid items={filtered} columns={3} />
              ) : (
                <div style={styles.empty}>لا توجد نتائج مطابقة لبحثك</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
