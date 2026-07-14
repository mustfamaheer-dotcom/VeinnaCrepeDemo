import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { SITE_CONFIG } from "../utils/constants";

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  const sizeLabel = { s: "صغير", m: "وسط", l: "كبير" };
  const getPrice = (ci: typeof items[0]) => {
    if (ci.size === "l" && ci.item.priceL) return ci.item.priceL;
    if (ci.size === "m" && ci.item.priceM) return ci.item.priceM;
    return ci.item.price;
  };

  const orderText = items
    .map((ci) => `${ci.item.nameAr} (${sizeLabel[ci.size]}) × ${ci.quantity} = ${getPrice(ci) * ci.quantity} ج.م`)
    .join("\n");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`مرحبًا فينا كريب! أود طلب:\n${orderText}\n\nالإجمالي: ${total} ج.م`)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            style={{
              position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 61,
              width: 380, maxWidth: "90vw",
              background: "#0a0a12", borderRight: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column",
              boxShadow: "4px 0 40px rgba(0,0,0,0.5)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShoppingBag size={20} color="#d4af37" />
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>سلة الطلبات</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>({itemCount})</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 4 }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
                  <ShoppingBag size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                  <p>السلة فارغة</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map((ci) => {
                    const id = ci.item.id + ci.size;
                    const price = getPrice(ci);
                    return (
                      <div key={id} style={{
                        background: "rgba(255,255,255,0.04)", borderRadius: 12,
                        padding: "12px", border: "1px solid rgba(255,255,255,0.06)",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>{ci.item.nameAr}</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{sizeLabel[ci.size]} · {price} ج.م</div>
                          </div>
                          <button onClick={() => removeItem(id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: 2 }}>
                            <X size={16} />
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <button onClick={() => updateQuantity(id, ci.quantity - 1)} style={{
                            width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)",
                            background: "transparent", color: "#fff", cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                          }}>
                            <Minus size={14} />
                          </button>
                          <span style={{ color: "#fff", fontWeight: 600, minWidth: 24, textAlign: "center" }}>{ci.quantity}</span>
                          <button onClick={() => updateQuantity(id, ci.quantity + 1)} style={{
                            width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)",
                            background: "transparent", color: "#fff", cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                          }}>
                            <Plus size={14} />
                          </button>
                          <span style={{ color: "#d4af37", fontWeight: 700, marginRight: "auto" }}>{price * ci.quantity} ج.م</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>الإجمالي</span>
                  <span style={{ color: "#d4af37", fontWeight: 700, fontSize: "1.2rem" }}>{total} ج.م</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={clearCart} style={{
                    flex: 1, padding: "10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 500,
                  }}>
                    تفريغ
                  </button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{
                    flex: 2, padding: "10px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg, #d4af37, #f5d76e)", color: "#0a0a12",
                    fontWeight: 700, cursor: "pointer", textDecoration: "none", textAlign: "center",
                  }}>
                    طلب عبر واتساب
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
