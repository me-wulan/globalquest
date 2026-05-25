"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { organizations } from "../data";
import { isLoggedIn, login, logout } from "./auth";

// ─── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!username || !password) { setError("Username dan password wajib diisi!"); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = login(username, password);
      if (ok) { onLogin(); }
      else    { setError("Username atau password salah!"); setLoading(false); }
    }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E0F7FF 0%, #F0FFF8 40%, #FFF8E7 70%, #F3EEFF 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem", fontFamily: "'Nunito', sans-serif",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        style={{
          background: "white", borderRadius: "32px",
          padding: "2.5rem 2rem", width: "100%", maxWidth: "380px",
          boxShadow: "0 20px 60px rgba(110,198,255,0.2)",
          border: "2px solid rgba(110,198,255,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}
          >🔐</motion.div>
          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "#2a2a4a", margin: "0 0 0.3rem" }}>
            Portal Guru
          </h1>
          <p style={{ color: "#888", fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>
            Masuk untuk akses QR Code AR
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Username */}
          <div>
            <label style={{ fontWeight: 800, fontSize: "0.85rem", color: "#5a5a8a", display: "block", marginBottom: "0.4rem" }}>
              👤 Username
            </label>
            <input
              type="text" value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Masukkan username"
              style={{
                width: "100%", padding: "0.85rem 1rem",
                borderRadius: "14px", border: "2px solid #e8eaf0",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "#2a2a4a",
                outline: "none", boxSizing: "border-box",
              }}
              onFocus={e => (e.target.style.borderColor = "#6EC6FF")}
              onBlur={e  => (e.target.style.borderColor = "#e8eaf0")}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontWeight: 800, fontSize: "0.85rem", color: "#5a5a8a", display: "block", marginBottom: "0.4rem" }}>
              🔑 Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"} value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Masukkan password"
                style={{
                  width: "100%", padding: "0.85rem 3rem 0.85rem 1rem",
                  borderRadius: "14px", border: "2px solid #e8eaf0",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                  fontSize: "0.95rem", color: "#2a2a4a",
                  outline: "none", boxSizing: "border-box",
                }}
                onFocus={e => (e.target.style.borderColor = "#6EC6FF")}
                onBlur={e  => (e.target.style.borderColor = "#e8eaf0")}
              />
              <button onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: "0.75rem", top: "50%",
                transform: "translateY(-50%)", background: "none",
                border: "none", cursor: "pointer", fontSize: "1.1rem",
              }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{
                  background: "#fff0f0", border: "1.5px solid #ffcccc",
                  borderRadius: "10px", padding: "0.6rem 1rem",
                  color: "#cc3333", fontWeight: 800, fontSize: "0.85rem",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                }}
              >⚠️ {error}</motion.div>
            )}
          </AnimatePresence>

          {/* Login button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={handleLogin} disabled={loading}
            style={{
              padding: "1rem", borderRadius: "14px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #6EC6FF, #A389F5)",
              color: "white", border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
              boxShadow: loading ? "none" : "0 8px 25px rgba(110,198,255,0.45)",
            }}
          >
            {loading ? "⏳ Memverifikasi..." : "🚀 Masuk"}
          </motion.button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#bbb", fontWeight: 700, fontSize: "0.8rem" }}>
          GlobalQuest AR • Portal Guru
        </p>
      </motion.div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}

// ─── QR Card ──────────────────────────────────────────────────────────────────
function QRCard({ org }: { org: typeof organizations[0] }) {
  const localQrPath = `/qr/${org.id}.png`;

const handlePrint = () => {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`
    <!DOCTYPE html><html><head>
      <title>QR ${org.name}</title>
      <style>
        @page { margin: 0; size: auto; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: white;
        }
        img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          display: block;
          object-fit: contain;
        }
      </style>
    </head><body>
      <img src="${window.location.origin}${localQrPath}" alt="QR ${org.name}" />
      <script>
        window.onload = () => {
          const img = document.querySelector('img');
          if (img.complete) { window.print(); window.onafterprint = () => window.close(); }
          else { img.onload = () => { window.print(); window.onafterprint = () => window.close(); }; }
        };
      <\/script>
    </body></html>
  `);
  win.document.close();
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
      {/* Header */}
      <div style={{ background: org.gradient, padding: "1.5rem 1.2rem 1rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ fontSize: "3rem", marginBottom: "0.3rem" }}>{org.emoji}</div>
        <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: "white", margin: 0 }}>{org.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: "0.78rem", margin: "0.2rem 0 0" }}>{org.fullName}</p>
      </div>

      {/* Body */}
      <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem", flex: 1 }}>

        {/* QR Image — full width, diperbesar */}
        <div style={{ padding: "10px", borderRadius: "16px", border: `3px solid ${org.color}44`, background: "white", boxShadow: `0 6px 25px ${org.color}33`, position: "relative", width: "100%" }}>
          {[
            { top: -2, left: -2,   bT: true, bL: true },
            { top: -2, right: -2,  bT: true, bR: true },
            { bottom: -2, left: -2,  bB: true, bL: true },
            { bottom: -2, right: -2, bB: true, bR: true },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute", width: 18, height: 18,
              top:    c.top    !== undefined ? `${c.top}px`    : undefined,
              bottom: c.bottom !== undefined ? `${c.bottom}px` : undefined,
              left:   c.left   !== undefined ? `${c.left}px`   : undefined,
              right:  c.right  !== undefined ? `${c.right}px`  : undefined,
              borderTop:    c.bT ? `3px solid ${org.color}` : "none",
              borderBottom: c.bB ? `3px solid ${org.color}` : "none",
              borderLeft:   c.bL ? `3px solid ${org.color}` : "none",
              borderRight:  c.bR ? `3px solid ${org.color}` : "none",
              borderRadius: c.bT && c.bL ? "4px 0 0 0" : c.bT && c.bR ? "0 4px 0 0" : c.bB && c.bL ? "0 0 0 4px" : "0 0 4px 0",
            }} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={localQrPath}
            alt={`QR Code ${org.name}`}
            style={{ display: "block", borderRadius: "10px", width: "100%", height: "auto" }}
            onError={e => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${window.location.origin}/ar/${org.id}`)}&color=${org.color.replace("#","")}&bgcolor=ffffff&qzone=2`;
              }
            }}
          />
        </div>

        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: `${org.color}18`, padding: "0.4rem 1rem", borderRadius: "50px", border: `1.5px solid ${org.color}44` }}>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontWeight: 800, fontSize: "0.8rem", color: "#2a2a4a" }}>📡 Scan → AR Live</span>
        </div>

        {/* Tombol Buka AR + Cetak */}
        <div style={{ display: "flex", gap: "0.6rem", width: "100%" }}>
          <motion.a href={`/ar/${org.id}`} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ flex: 1, padding: "0.75rem 0.5rem", background: org.gradient, color: "white", borderRadius: "12px", fontWeight: 900, fontSize: "0.82rem", textDecoration: "none", textAlign: "center", boxShadow: `0 6px 20px ${org.color}55`, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" }}>
            📷 Buka AR
          </motion.a>
          <motion.button onClick={handlePrint} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ flex: 1, padding: "0.75rem 0.5rem", background: "linear-gradient(135deg, #f0f4ff, #e8eeff)", color: "#5a5a8a", border: `2px solid ${org.color}44`, borderRadius: "12px", fontWeight: 900, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" }}>
            🖨️ Cetak
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function QRPage() {
  const [authed,   setAuthed]   = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setAuthed(isLoggedIn());
    setChecking(false);
  }, []);

  // ✅ Logout → ke beranda (/), bukan ke login screen
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (checking) return null;
  if (!authed)  return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E0F7FF 0%, #F0FFF8 40%, #FFF8E7 70%, #F3EEFF 100%)",
      fontFamily: "'Nunito', sans-serif", paddingBottom: "4rem",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #6EC6FF, #C8B6FF)",
        padding: "4rem 1.5rem 5rem",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {["rgba(255,255,255,0.1)","rgba(255,255,255,0.07)","rgba(255,255,255,0.12)"].map((bg, i) => (
          <div key={i} style={{
            position: "absolute", width: `${150 + i * 80}px`, height: `${150 + i * 80}px`,
            borderRadius: "50%", background: bg,
            top: i % 2 === 0 ? "-40px" : "30%",
            left: i === 0 ? "-30px" : i === 1 ? "60%" : "80%",
          }} />
        ))}

        {/* ← Beranda */}
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute", top: "1.2rem", left: "1.2rem",
            background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
            color: "white", border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem",
            padding: "0.45rem 1rem", borderRadius: "50px", cursor: "pointer",
          }}
        >← Beranda</motion.button>

        {/* ✅ Keluar → beranda langsung */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
            color: "white", border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem",
            padding: "0.45rem 1rem", borderRadius: "50px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
        >🚪 Keluar</motion.button>

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "4rem", marginBottom: "0.5rem" }}
        >📱</motion.div>

        <h1 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          color: "white", margin: "0 0 0.5rem",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>QR Code AR Explorer</h1>

        <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
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
            }}>{step.icon} {step.text}</div>
          ) : (
            <span key={i} style={{ color: "rgba(255,255,255,0.7)", fontWeight: 900, fontSize: "1.1rem", alignSelf: "center" }}>→</span>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 Z" fill="url(#hg)" />
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#6EC6FF" />
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
            <QRCard org={org} />
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ maxWidth: "640px", margin: "3rem auto 0", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{ background: "white", borderRadius: "24px", padding: "2rem", boxShadow: "0 10px 40px rgba(110,198,255,0.15)", border: "2px solid rgba(110,198,255,0.2)" }}
        >
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem", color: "#2a2a4a", marginBottom: "1.2rem", textAlign: "center" }}>
            💡 Cara Pakai
          </h2>
          {[
            { icon: "📱", title: "Buka kamera HP",  desc: "Gunakan kamera bawaan HP atau scan dengan browser Chrome/Safari" },
            { icon: "🎯", title: "Scan QR Code",     desc: "Arahkan ke salah satu QR di atas. Link akan terbuka otomatis" },
            { icon: "📷", title: "Izinkan kamera",   desc: "Tekan 'Izinkan' saat browser minta akses kamera" },
            { icon: "✨", title: "AR 3D muncul!",    desc: "Objek 3D organisasi melayang di atas kamera kamu secara real-time" },
            { icon: "❓", title: "Jawab kuis",        desc: "Selesai eksplorasi? Tekan 'Mulai Kuis' untuk dapat XP!" },
          ].map((step, i) => (
            <div key={i} style={{
              display: "flex", gap: "1rem", alignItems: "flex-start",
              marginBottom: i < 4 ? "1rem" : 0,
              paddingBottom: i < 4 ? "1rem" : 0,
              borderBottom: i < 4 ? "1px solid #f0f0f8" : "none",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "12px",
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

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}