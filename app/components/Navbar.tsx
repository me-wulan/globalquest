"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  highlight: boolean;
}

export default function Navbar({ xp }: { xp: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "🏠 Beranda", href: isHome ? "#hero" : "/", highlight: false },
    { label: "❓ Kuis", href: isHome ? "#minigames" : "/#minigames", highlight: false },
    { label: "📷 AR Scan", href: "/ar", highlight: true },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0.75rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "2px solid rgba(110,198,255,0.4)" : "2px solid rgba(110,198,255,0.15)",
        boxShadow: scrolled ? "0 4px 30px rgba(110,198,255,0.2)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <motion.a href="/" whileHover={{ scale: 1.05 }} style={{
        fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", textDecoration: "none",
        background: "linear-gradient(135deg, #3AAFEE, #A389F5)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        filter: "drop-shadow(0 2px 8px rgba(110,198,255,0.35))",
        display: "flex", alignItems: "center", gap: "0.4rem",
      }}>
        <span style={{ fontSize: "1.5rem" }}>🌍</span> GlobalQuest AR
      </motion.a>

      {/* Desktop nav */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }} className="hidden-mobile">
        {navItems.map((item, i) => (
          <motion.a key={i} href={item.href}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.45rem 1.1rem", borderRadius: "50px",
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem",
              cursor: "pointer", textDecoration: "none",
              color: item.highlight ? "#fff" : "#3a3a5c",
              background: item.highlight
                ? "linear-gradient(135deg, #6EC6FF, #C8B6FF)"
                : "rgba(110,198,255,0.12)",
              border: "2px solid transparent",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              if (!item.highlight) {
                (e.target as HTMLElement).style.background = "rgba(110,198,255,0.25)";
                (e.target as HTMLElement).style.borderColor = "#6EC6FF";
              }
            }}
            onMouseLeave={e => {
              if (!item.highlight) {
                (e.target as HTMLElement).style.background = "rgba(110,198,255,0.12)";
                (e.target as HTMLElement).style.borderColor = "transparent";
              }
            }}
          >{item.label}</motion.a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <motion.div whileHover={{ scale: 1.08 }} style={{
          background: "linear-gradient(135deg, #FFE66D, #FFB86B)",
          padding: "0.45rem 1.1rem", borderRadius: "50px",
          fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.9rem",
          color: "#7a4200", boxShadow: "0 4px 15px rgba(255,184,107,0.45)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          ⚡ {xp.toLocaleString()} XP
        </motion.div>

        {/* Hamburger mobile */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "linear-gradient(135deg, #6EC6FF, #C8B6FF)", border: "none",
            borderRadius: "12px", width: "40px", height: "40px", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px",
          }}>
          {[0, 1, 2].map(i => (
            <motion.span key={i}
              animate={menuOpen
                ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 10 : i === 2 ? -10 : 0, opacity: i === 1 ? 0 : 1 }
                : { rotate: 0, y: 0, opacity: 1 }}
              style={{ display: "block", width: "18px", height: "2.5px", background: "white", borderRadius: "99px", transformOrigin: "center" }}
            />
          ))}
        </motion.button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)",
              padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem",
              borderBottom: "2px solid rgba(110,198,255,0.3)", boxShadow: "0 10px 30px rgba(110,198,255,0.2)",
            }}>
            {navItems.map((item, i) => (
              <motion.a key={i} href={item.href}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }} onClick={() => setMenuOpen(false)}
                style={{
                  padding: "0.75rem 1rem", borderRadius: "12px",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1rem",
                  cursor: "pointer", textDecoration: "none",
                  color: item.highlight ? "#fff" : "#3a3a5c",
                  background: item.highlight
                    ? "linear-gradient(135deg, #6EC6FF, #C8B6FF)"
                    : "rgba(110,198,255,0.1)",
                }}>{item.label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 639px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </motion.nav>
  );
}