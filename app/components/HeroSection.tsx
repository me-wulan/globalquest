"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

function FloatingEmoji({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", fontSize: "2rem", userSelect: "none", pointerEvents: "none", zIndex: 2, ...style }}
    >
      {emoji}
    </motion.div>
  );
}

export default function HeroSection({ onStartQuest }: { onStartQuest: () => void }) {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem 3rem", position: "relative", overflow: "hidden" }}>
      <div className="blob-anim" style={{ position: "absolute", width: "500px", height: "500px", background: "rgba(110,198,255,0.25)", borderRadius: "60%", top: "-100px", left: "-100px", zIndex: 0 }} />
      <div className="blob-anim" style={{ position: "absolute", width: "400px", height: "400px", background: "rgba(200,182,255,0.2)", borderRadius: "60%", bottom: "-80px", right: "-80px", zIndex: 0, animationDelay: "-4s" }} />
      <div className="blob-anim" style={{ position: "absolute", width: "300px", height: "300px", background: "rgba(139,233,179,0.2)", borderRadius: "60%", top: "40%", right: "10%", zIndex: 0, animationDelay: "-2s" }} />

      <FloatingEmoji emoji="🌐" style={{ top: "15%", left: "8%", fontSize: "2.5rem" }} />
      <FloatingEmoji emoji="⭐" style={{ top: "25%", right: "8%" }} />
      <FloatingEmoji emoji="🎯" style={{ bottom: "25%", left: "6%" }} />
      <FloatingEmoji emoji="🏆" style={{ bottom: "30%", right: "6%" }} />
      <FloatingEmoji emoji="🚀" style={{ top: "10%", right: "25%" }} />
      <FloatingEmoji emoji="✨" style={{ top: "60%", left: "15%" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "900px", position: "relative", zIndex: 5, gap: "1.5rem" }}>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ background: "linear-gradient(135deg, #C8B6FF, #FF9ECF)", padding: "0.5rem 1.5rem", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "white", boxShadow: "0 6px 25px rgba(200,182,255,0.5)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          🎮 Petualangan Edukasi Global #1
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }} style={{ width: "100%", maxWidth: "420px" }}>
          <Globe3D />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.1, margin: 0 }}>
          <span className="shimmer-text">Jelajahi Dunia</span><br />
          <span style={{ background: "linear-gradient(135deg, #FFE66D, #FFB86B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Organisasi Global!</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#5a5a8a", maxWidth: "560px", lineHeight: 1.6 }}>
          Pelajari <strong style={{ color: "#3AAFEE" }}>PBB</strong>, <strong style={{ color: "#5DD4A0" }}>ASEAN</strong>, <strong style={{ color: "#F5D23A" }}>G20</strong>, dan <strong style={{ color: "#A389F5" }}>Uni Eropa</strong> lewat petualangan seru seperti bermain game! 🎮
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🌍", val: "4", label: "Organisasi" },
            { icon: "❓", val: "20+", label: "Kuis Seru" },
            { icon: "🏆", val: "1830", label: "Pelajar Aktif" },
            { icon: "⚡", val: "2000+", label: "XP Max" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "0.75rem 1.2rem", fontFamily: "'Nunito', sans-serif", textAlign: "center", boxShadow: "0 4px 20px rgba(110,198,255,0.15)", border: "2px solid rgba(110,198,255,0.2)" }}>
              <div style={{ fontSize: "1.4rem" }}>{stat.icon}</div>
              <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#3a3a5c" }}>{stat.val}</div>
              <div style={{ fontWeight: 600, fontSize: "0.75rem", color: "#8888aa" }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.button whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.95 }} onClick={onStartQuest}
   style={{ padding: "1rem 2rem", borderRadius: "50px", fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem", color: "#5a3800", background: "linear-gradient(135deg, #FFE66D, #FFB86B)", border: "none", cursor: "pointer", textDecoration: "none", boxShadow: "0 8px 25px rgba(255,230,109,0.45)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
  🌍 Lihat Organisasi
</motion.button>
<motion.a href="/ar" whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.95 }}
  style={{ padding: "1rem 2.5rem", borderRadius: "50px", fontFamily: "'Fredoka One', cursive", fontSize: "1.2rem", color: "white", background: "linear-gradient(135deg, #6EC6FF, #3AAFEE)", border: "none", cursor: "pointer", textDecoration: "none", boxShadow: "0 8px 30px rgba(110,198,255,0.5)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
  🚀 Mulai Petualangan!
</motion.a>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: "#aaaacc", fontSize: "0.85rem", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          ↓ Scroll untuk explore ↓
        </motion.div>
      </div>
    </section>
  );
}