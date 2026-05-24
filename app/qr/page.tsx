"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { organizations } from "../data";

function QRCard({ org, baseUrl }: { org: typeof organizations[0]; baseUrl: string }) {
  const arUrl = `${baseUrl}/ar/${org.id}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(arUrl)}&color=${encodeURIComponent(org.color.replace("#", ""))}&bgcolor=ffffff&qzone=2&format=png`;
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(arUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: "white", borderRadius: "24px", overflow: "hidden",
        boxShadow: `0 10px 40px ${org.color}33`,
        border: `3px solid ${org.color}44`,
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        background: org.gradient, padding: "1.5rem 1.2rem 1rem",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20,
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }} />
        <div style={{ fontSize: "3rem", marginBottom: "0.3rem" }}>{org.emoji}</div>
        <h3 style={{
          fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem",
          color: "white", margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}>{org.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: "0.78rem", margin: "0.2rem 0 0" }}>
          {org.fullName}
        </p>
      </div>

      <div style={{
        padding: "1.5rem", display: "flex", flexDirection: "column",
        alignItems: "center", gap: "1rem", flex: 1,
      }}>
        <div style={{
          padding: "12px", borderRadius: "16px",
          border: `3px solid ${org.color}33`, background: "white",
          boxShadow: `0 4px 20px ${org.color}22`, position: "relative",
        }}>
          {[
            { top: -2, left: -2, borderTop: true, borderLeft: true },
            { top: -2, right: -2, borderTop: true, borderRight: true },
            { bottom: -2, left: -2, borderBottom: true, borderLeft: true },
            { bottom: -2, right: -2, borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: "16px", height: "16px",
              ...Object.fromEntries(
                Object.entries(pos)
                  .filter(([k]) => ["top","bottom","left","right"].includes(k))
                  .map(([k, v]) => [k, `${v}px`])
              ),
              borderTop: pos.borderTop ? `3px solid ${org.color}` : "none",
              borderBottom: pos.borderBottom ? `3px solid ${org.color}` : "none",
              borderLeft: pos.borderLeft ? `3px solid ${org.color}` : "none",
              borderRight: pos.borderRight ? `3px solid ${org.color}` : "none",
              borderRadius: pos.borderTop && pos.borderLeft ? "4px 0 0 0" :
                pos.borderTop && pos.borderRight ? "0 4px 0 0" :
                pos.borderBottom && pos.borderLeft ? "0 0 0 4px" : "0 0 4px 0",
            }} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrApiUrl} alt={`QR ${org.name}`} width={160} height={160}
            style={{ display: "block", borderRadius: "8px" }} />
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: `${org.color}18`, padding: "0.45rem 1rem",
          borderRadius: "50px", border: `1.5px solid ${org.color}44`,
        }}>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontWeight: 800, fontSize: "0.8rem", color: "#2a2a4a" }}>📡 Scan → AR Live</span>
        </div>

        <div style={{
          width: "100%", background: "#f8f9ff", borderRadius: "10px",
          padding: "0.5rem 0.8rem", border: "1.5px solid #e8eaf0",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem",
        }}>
          <span style={{
            fontFamily: "monospace", fontSize: "0.7rem", color: "#666",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
          }}>/ar/{org.id}</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={copyUrl} style={{
            background: copied ? "#22c55e" : org.color, color: "white", border: "none",
            borderRadius: "6px", padding: "0.25rem 0.6rem", fontWeight: 800,
            fontSize: "0.7rem", cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
          }}>
            {copied ? "✓" : "Copy"}
          </motion.button>
        </div>

        <motion.a href={`/ar/${org.id}`} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
          style={{
            width: "100%", padding: "0.8rem", background: org.gradient,
            color: "white", borderRadius: "12px", fontWeight: 900, fontSize: "0.9rem",
            textDecoration: "none", textAlign: "center",
            boxShadow: `0 6px 20px ${org.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          }}>
          📷 Buka AR {org.name}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function QRPage() {
  const [baseUrl, setBaseUrl] = useState("https://globalquest.vercel.app");
  const router = useRouter();

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E0F7FF 0%, #F0FFF8 40%, #FFF8E7 70%, #F3EEFF 100%)",
      fontFamily: "'Nunito', sans-serif",
      padding: "0 0 4rem",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #6EC6FF, #C8B6FF)",
        padding: "4rem 1.5rem 5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {["rgba(255,255,255,0.1)", "rgba(255,255,255,0.07)", "rgba(255,255,255,0.12)"].map((bg, i) => (
          <div key={i} style={{
            position: "absolute", width: `${150 + i * 80}px`, height: `${150 + i * 80}px`,
            borderRadius: "50%", background: bg,
            top: i % 2 === 0 ? "-40px" : "30%",
            left: i === 0 ? "-30px" : i === 1 ? "60%" : "80%",
          }} />
        ))}

        {/* Tombol kembali — pakai router.push */}
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute", top: "1.2rem", left: "1.2rem",
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            color: "white", border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800, fontSize: "0.85rem",
            padding: "0.45rem 1rem", borderRadius: "50px",
            cursor: "pointer",
          }}
        >
          ← Beranda
        </motion.button>

        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
          📱
        </motion.div>
        <h1 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          color: "white", margin: "0 0 0.5rem",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          QR Code AR Explorer
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "1rem",
          maxWidth: "500px", margin: "0 auto", lineHeight: 1.6,
        }}>
          Scan QR di bawah → Kamera HP aktif → Info organisasi muncul di dunia nyata! 🌍✨
        </p>

        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {[
            { icon: "1️⃣", text: "Scan QR" }, { icon: "→", text: "" },
            { icon: "📷", text: "Kamera Aktif" }, { icon: "→", text: "" },
            { icon: "✨", text: "AR Muncul!" }, { icon: "→", text: "" },
            { icon: "🎯", text: "Main Kuis" },
          ].map((step, i) => step.text ? (
            <div key={i} style={{
              background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
              padding: "0.4rem 0.9rem", borderRadius: "50px", color: "white",
              fontWeight: 800, fontSize: "0.82rem",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", gap: "0.35rem",
            }}>
              {step.icon} {step.text}
            </div>
          ) : (
            <span key={i} style={{ color: "rgba(255,255,255,0.7)", fontWeight: 900, fontSize: "1.1rem", alignSelf: "center" }}>→</span>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 Z" fill="url(#heroGrad)" />
          <defs>
            <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6EC6FF" />
              <stop offset="100%" stopColor="#C8B6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* QR Grid */}
      <div style={{
        maxWidth: "900px", margin: "2rem auto 0", padding: "0 1.2rem",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem",
      }}>
        {organizations.map((org, i) => (
          <motion.div key={org.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
            <QRCard org={org} baseUrl={baseUrl} />
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ maxWidth: "640px", margin: "3rem auto 0", padding: "0 1.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{
            background: "white", borderRadius: "24px", padding: "2rem",
            boxShadow: "0 10px 40px rgba(110,198,255,0.15)",
            border: "2px solid rgba(110,198,255,0.2)",
          }}>
          <h2 style={{
            fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem",
            color: "#2a2a4a", marginBottom: "1.2rem", textAlign: "center",
          }}>💡 Cara Pakai</h2>
          {[
            { icon: "📱", title: "Buka kamera HP", desc: "Gunakan kamera bawaan HP atau scan dengan browser Chrome/Safari" },
            { icon: "🎯", title: "Scan QR Code", desc: "Arahkan ke salah satu QR di atas. Link akan terbuka otomatis" },
            { icon: "📷", title: "Izinkan kamera", desc: "Tekan 'Izinkan' saat browser minta akses kamera" },
            { icon: "✨", title: "AR muncul!", desc: "Informasi organisasi akan muncul floating di atas layar kamera kamu" },
            { icon: "❓", title: "Jawab kuis", desc: "Selesai baca info? Tekan 'Mulai Kuis' untuk dapat XP!" },
          ].map((step, i) => (
            <div key={i} style={{
              display: "flex", gap: "1rem", alignItems: "flex-start",
              marginBottom: i < 4 ? "1rem" : 0,
              paddingBottom: i < 4 ? "1rem" : 0,
              borderBottom: i < 4 ? "1px solid #f0f0f8" : "none",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "linear-gradient(135deg, #6EC6FF22, #C8B6FF22)",
                border: "2px solid #6EC6FF44",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem", flexShrink: 0,
              }}>{step.icon}</div>
              <div>
                <div style={{ fontWeight: 900, color: "#2a2a4a", fontSize: "0.95rem" }}>{step.title}</div>
                <div style={{ fontWeight: 700, color: "#888", fontSize: "0.82rem", lineHeight: 1.5, marginTop: "0.1rem" }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
      `}</style>
    </div>
  );
}