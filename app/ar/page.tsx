"use client";

import { motion } from "framer-motion";
import { organizations } from "../data";

export default function ARIndexPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #E0F7FF 0%, #F0FFF8 40%, #F3EEFF 100%)",
      fontFamily: "'Nunito', sans-serif",
      paddingBottom: "3rem",
    }}>
      {/* Top bar */}
      <div style={{
        background: "linear-gradient(135deg, #6EC6FF, #A389F5)",
        padding: "3.5rem 1.5rem 4.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {[
          { w: 200, h: 200, top: "-50px", left: "-40px", opacity: 0.1 },
          { w: 150, h: 150, top: "20%", right: "-30px", opacity: 0.08 },
          { w: 120, h: 120, bottom: "-20px", left: "50%", opacity: 0.07 },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            width: b.w, height: b.h,
            borderRadius: "50%",
            background: `rgba(255,255,255,${b.opacity})`,
            ...{ top: b.top, left: b.left, right: b.right, bottom: b.bottom },
          }} />
        ))}

        <a href="/" style={{
          position: "absolute", top: "1.2rem", left: "1.2rem",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
          color: "white", textDecoration: "none",
          fontWeight: 800, fontSize: "0.85rem",
          padding: "0.45rem 1rem", borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}>← Beranda</a>

        <a href="/qr" style={{
          position: "absolute", top: "1.2rem", right: "1.2rem",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
          color: "white", textDecoration: "none",
          fontWeight: 800, fontSize: "0.85rem",
          padding: "0.45rem 1rem", borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>🖨️ Print QR</a>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "4.5rem", marginBottom: "0.5rem" }}
        >
          📷
        </motion.div>

        <h1 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
          color: "white",
          margin: "0 0 0.5rem",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          Pilih Organisasi AR
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.9)",
          fontWeight: 700, fontSize: "0.95rem",
          maxWidth: "380px", margin: "0 auto",
          lineHeight: 1.6,
        }}>
          Aktifkan kamera → info organisasi muncul di dunia nyata kamu! ✨
        </p>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6EC6FF" />
              <stop offset="100%" stopColor="#A389F5" />
            </linearGradient>
          </defs>
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 Z" fill="url(#wg)" />
        </svg>
      </div>

      {/* How it works strip */}
      <div style={{
        display: "flex", gap: "0.5rem", overflowX: "auto",
        padding: "1.2rem 1.5rem",
        maxWidth: "600px", margin: "0 auto",
        scrollbarWidth: "none",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {[
          { icon: "👆", text: "Pilih org" },
          { icon: "📷", text: "Kamera aktif" },
          { icon: "✨", text: "AR muncul" },
          { icon: "❓", text: "Main kuis" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "white",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              fontWeight: 800, fontSize: "0.82rem",
              color: "#3a3a5c",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1.5px solid rgba(110,198,255,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            {s.icon} {s.text}
            {i < 3 && <span style={{ color: "#aaa", marginLeft: "0.2rem" }}>→</span>}
          </motion.div>
        ))}
      </div>

      {/* Org cards */}
      <div style={{
        maxWidth: "560px",
        margin: "0.5rem auto 0",
        padding: "0 1.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        {organizations.map((org, i) => (
          <motion.a
            key={org.id}
            href={`/ar/${org.id}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "white",
              borderRadius: "20px",
              padding: "1.2rem 1.4rem",
              textDecoration: "none",
              boxShadow: `0 6px 25px ${org.color}22`,
              border: `2.5px solid ${org.color}44`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gradient edge */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: "6px",
              background: org.gradient,
            }} />

            {/* Emoji orb */}
            <div style={{
              width: "58px", height: "58px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${org.color}33, ${org.color}11)`,
              border: `2px solid ${org.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem",
              flexShrink: 0,
              boxShadow: `0 4px 15px ${org.color}33`,
            }}>
              {org.emoji}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                <span style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "1.25rem",
                  color: "#2a2a4a",
                }}>{org.name}</span>
                <span style={{
                  background: org.diffColor,
                  color: "white",
                  fontWeight: 900, fontSize: "0.68rem",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "50px",
                }}>{org.difficulty}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#999", marginBottom: "0.3rem" }}>
                {org.fullName}
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                <span style={{
                  background: `${org.color}18`,
                  color: org.color === "#FFE66D" ? "#8a6000" : org.color,
                  fontWeight: 800, fontSize: "0.72rem",
                  padding: "0.2rem 0.6rem", borderRadius: "50px",
                  border: `1px solid ${org.color}44`,
                }}>🌍 {org.members}</span>
                <span style={{
                  background: "#f0fff8",
                  color: "#22a060",
                  fontWeight: 800, fontSize: "0.72rem",
                  padding: "0.2rem 0.6rem", borderRadius: "50px",
                  border: "1px solid #22a06044",
                }}>⚡ +{org.xp} XP</span>
              </div>
            </div>

            {/* AR arrow */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.2rem", flexShrink: 0,
            }}>
              <div style={{
                background: org.gradient,
                color: "white",
                width: "40px", height: "40px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
                boxShadow: `0 4px 15px ${org.color}55`,
              }}>→</div>
              <span style={{
                fontWeight: 800, fontSize: "0.65rem",
                color: "#aaa", textAlign: "center",
              }}>AR Live</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* QR Code section link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          maxWidth: "560px",
          margin: "2rem auto 0",
          padding: "0 1.2rem",
        }}
      >
        <a href="/qr" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "0.8rem",
          background: "linear-gradient(135deg, #FFE66D22, #FFB86B22)",
          border: "2px dashed #FFB86B88",
          borderRadius: "16px",
          padding: "1.2rem",
          textDecoration: "none",
          color: "#7a4800",
          fontWeight: 800, fontSize: "0.9rem",
        }}>
          🖨️ Guru? Cetak QR Code untuk kelas → <strong>Halaman QR</strong>
        </a>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
      `}</style>
    </div>
  );
}
