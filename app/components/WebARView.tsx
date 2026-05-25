"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrgData } from "../data";
import ARScene3D from "./ARScene3D";

function Particle({ color, delay }: { color: string; delay: number }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: `${6 + Math.random() * 10}px`,
    height: `${6 + Math.random() * 10}px`,
    borderRadius: "50%",
    background: color,
    opacity: 0.7,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 30}%`,
    pointerEvents: "none",
    animation: `particleFloat ${4 + Math.random() * 4}s ease-in-out ${delay}s infinite`,
    boxShadow: `0 0 10px ${color}`,
  };
  return <div style={style} />;
}

function FloatingBadge({ icon, text, color, x, y, delay }: {
  icon: string; text: string; color: string; x: number; y: number; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ delay, duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      style={{
        position: "absolute",
        left: `${x}%`, top: `${y}%`,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "50px",
        padding: "0.35rem 0.8rem",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800, fontSize: "0.75rem", color: "white",
        border: `1.5px solid ${color}66`,
        boxShadow: `0 4px 15px ${color}33`,
        display: "flex", alignItems: "center", gap: "0.35rem",
        whiteSpace: "nowrap", zIndex: 20, pointerEvents: "none",
      }}
    >
      {icon} {text}
    </motion.div>
  );
}

function OrbEmoji({ emoji, color }: { emoji: string; color: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: "48px", height: "48px", borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.6rem",
        boxShadow: `0 0 20px ${color}66, inset 0 2px 6px rgba(255,255,255,0.3)`,
        border: `2px solid ${color}88`, flexShrink: 0,
      }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Org 3D decoration per organisasi ────────────────────────────────────────

function OrgDecoration({ orgId, color }: { orgId: string; color: string }) {

  if (orgId === "pbb") return (
    <>
      {/* Burung 1 — kiri atas, gerak diagonal */}
      <motion.div
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], rotate: [-5, 10, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "22%", left: "8%", zIndex: 7, pointerEvents: "none",
          fontSize: "2.2rem", filter: `drop-shadow(0 0 12px ${color}) drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }}>
        🕊️
      </motion.div>
      {/* Burung 2 — tengah kanan, gerak naik turun */}
      <motion.div
        animate={{ x: [-15, 15, -15], y: [0, -25, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{ position: "absolute", top: "35%", right: "8%", zIndex: 7, pointerEvents: "none",
          fontSize: "1.8rem", filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }}>
        🕊️
      </motion.div>
      {/* Burung 3 — bawah kiri, gerak melayang bebas */}
      <motion.div
        animate={{ x: [0, 40, 10, 0], y: [0, -15, -30, 0], rotate: [-8, 8, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        style={{ position: "absolute", bottom: "30%", left: "15%", zIndex: 7, pointerEvents: "none",
          fontSize: "1.5rem", filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }}>
        🕊️
      </motion.div>
      {/* Daun olive melayang */}
      <motion.div animate={{ rotate: [-10, 10, -10], y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ position: "absolute", top: "28%", left: "22%", zIndex: 6, pointerEvents: "none",
          fontSize: "1.4rem", filter: "drop-shadow(0 0 8px #5aad4e)" }}>
        🌿
      </motion.div>
      <motion.div animate={{ rotate: [10, -10, 10], y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ position: "absolute", top: "25%", right: "18%", zIndex: 6, pointerEvents: "none",
          fontSize: "1.2rem", filter: "drop-shadow(0 0 8px #5aad4e)" }}>
        🌿
      </motion.div>
      {/* Bintang berkilau */}
      {[
        { top: "18%", left: "35%", size: "1rem", delay: 0 },
        { top: "40%", left: "5%", size: "0.8rem", delay: 0.8 },
        { top: "20%", right: "25%", size: "0.9rem", delay: 1.5 },
      ].map((s, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
          style={{ position: "absolute", ...s, zIndex: 6, pointerEvents: "none",
            fontSize: s.size, filter: `drop-shadow(0 0 6px ${color})` }}>✨</motion.div>
      ))}
    </>
  );

  if (orgId === "asean") return (
    <>
      {/* Lotus utama berputar pelan */}
      <motion.div animate={{ rotate: [0, 360], y: [0, -15, 0] }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        style={{ position: "absolute", top: "20%", left: "10%", zIndex: 7, pointerEvents: "none",
          fontSize: "2.5rem", filter: `drop-shadow(0 0 14px ${color})` }}>🌺</motion.div>
      <motion.div animate={{ rotate: [360, 0], y: [0, -12, 0] }}
        transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        style={{ position: "absolute", top: "30%", right: "10%", zIndex: 7, pointerEvents: "none",
          fontSize: "1.8rem", filter: `drop-shadow(0 0 12px ${color})` }}>🌸</motion.div>
      <motion.div animate={{ rotate: [0, 360], y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        style={{ position: "absolute", bottom: "28%", left: "12%", zIndex: 7, pointerEvents: "none",
          fontSize: "1.5rem", filter: `drop-shadow(0 0 10px ${color})` }}>🌼</motion.div>
      {["🌟","✨","💫"].map((e, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
          style={{ position: "absolute", top: i === 0 ? "18%" : i === 1 ? "45%" : "25%", left: i === 0 ? "40%" : i === 1 ? "6%" : "auto", right: i === 2 ? "20%" : "auto", zIndex: 6, pointerEvents: "none", fontSize: "1rem", filter: `drop-shadow(0 0 8px ${color})` }}>{e}</motion.div>
      ))}
    </>
  );

  if (orgId === "g20") return (
    <>
      <motion.div animate={{ y: [0, -18, 0], scaleY: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "20%", left: "8%", zIndex: 7, pointerEvents: "none",
          fontSize: "2.5rem", filter: `drop-shadow(0 0 14px ${color})` }}>📈</motion.div>
      <motion.div animate={{ rotate: [0, 15, 0, -15, 0], y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{ position: "absolute", top: "28%", right: "10%", zIndex: 7, pointerEvents: "none",
          fontSize: "2rem", filter: `drop-shadow(0 0 12px ${color})` }}>💰</motion.div>
      <motion.div animate={{ rotate: [0, 360], y: [0, -12, 0] }}
        transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
        style={{ position: "absolute", bottom: "30%", left: "14%", zIndex: 7, pointerEvents: "none",
          fontSize: "1.8rem", filter: `drop-shadow(0 0 10px ${color})` }}>🪙</motion.div>
      {["💵","💹","⚡"].map((e, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
          style={{ position: "absolute", top: i === 0 ? "18%" : i === 1 ? "42%" : "22%", left: i === 0 ? "38%" : i === 1 ? "5%" : "auto", right: i === 2 ? "22%" : "auto", zIndex: 6, pointerEvents: "none", fontSize: "0.95rem", filter: `drop-shadow(0 0 8px ${color})` }}>{e}</motion.div>
      ))}
    </>
  );

  if (orgId === "eu") return (
    <>
      {/* 12 bintang melingkar besar */}
      <motion.div animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ rotate: { duration: 16, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        style={{ position: "absolute", top: "16%", left: "6%", zIndex: 7, pointerEvents: "none", width: "100px", height: "100px" }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.div key={i} animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
              style={{ position: "absolute", left: 50 + Math.cos(rad) * 40, top: 50 + Math.sin(rad) * 40, fontSize: "0.9rem", transform: "translate(-50%,-50%)", filter: `drop-shadow(0 0 6px ${color})` }}>⭐</motion.div>
          );
        })}
      </motion.div>
      {/* Bintang lepas melayang */}
      {[
        { top: "22%", right: "10%", size: "2rem", delay: 0, dx: [-10,10,-10], dy: [0,-18,0] },
        { bottom: "32%", left: "10%", size: "1.5rem", delay: 1, dx: [0,12,0], dy: [0,-12,0] },
        { top: "38%", right: "18%", size: "1.2rem", delay: 2, dx: [-8,8,-8], dy: [0,-8,0] },
      ].map((s, i) => (
        <motion.div key={i}
          animate={{ x: s.dx, y: s.dy, rotate: [0, 360] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          style={{ position: "absolute", top: s.top, bottom: (s as any).bottom, left: (s as any).left, right: (s as any).right, zIndex: 7, pointerEvents: "none", fontSize: s.size, filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}88)` }}>⭐</motion.div>
      ))}
    </>
  );

  return null;
}

export default function WebARView({ org }: { org: OrgData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<"loading" | "permission" | "active" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [quizReady, setQuizReady] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const facts = [
    { icon: "📅", label: "Didirikan", value: org.founded },
    { icon: "🌍", label: "Anggota", value: org.members },
    { icon: "🏢", label: "Markas", value: org.hq },
    { icon: "💡", label: "Fun Fact", value: org.funFact.substring(0, 60) + "..." },
  ];

  const startCamera = useCallback(async (mode: "environment" | "user" = "environment") => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setPhase("active");
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1.5;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setShowInfo(true);
          setTimeout(() => setQuizReady(true), 800);
        }
      }, 50);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") setPhase("permission");
        else { setErrorMsg(err.message); setPhase("error"); }
      }
    }
  }, []);

  useEffect(() => { startCamera("environment"); return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); }; }, [startCamera]);
  useEffect(() => { if (!showInfo) return; const t = setInterval(() => setCurrentFact(p => (p + 1) % facts.length), 4000); return () => clearInterval(t); }, [showInfo, facts.length]);

  const flipCamera = () => { const next = facingMode === "environment" ? "user" : "environment"; setFacingMode(next); startCamera(next); };

  // Responsive positions
  // Mobile: logo top-center, info bottom-center
  // Desktop: logo left, info right
const logoStyle = {
  position: "absolute" as const,
  top: isMobile ? "auto" : "30%",
  bottom: isMobile ? "calc(3% + 260px)" : "auto",
  left: isMobile ? "20%" : "22%",
  transform: isMobile ? "translateX(-50%)" : "translate(-50%, -50%)",
  zIndex: 15,
  pointerEvents: "none" as const,
};

  const infoStyle = isMobile ? {
    bottom: "3%", left: "3%", right: "3%",
    width: "auto",
  } : {
    bottom: "25%", right: "3%",
    width: "44%",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'Nunito', sans-serif", overflow: "hidden" }}>
      <video ref={videoRef} autoPlay playsInline muted style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover",
        transform: facingMode === "user" ? "scaleX(-1)" : "none", zIndex: 1,
      }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px", zIndex: 20,
        background: org.gradient, boxShadow: `0 0 15px ${org.color}`,
      }} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 15,
        padding: "0.8rem 1rem 0.6rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
      }}>
        <motion.a href="/" whileTap={{ scale: 0.92 }} style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
          borderRadius: "50px", padding: "0.45rem 1rem",
          fontWeight: 900, fontSize: "0.82rem", color: "white",
          textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>← Kembali</motion.a>

        <div style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
          borderRadius: "50px", padding: "0.45rem 1rem",
          fontFamily: "'Fredoka One', cursive", fontSize: "0.95rem", color: "white",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>🌍 AR Mode</div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={flipCamera} style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
          borderRadius: "50px", padding: "0.45rem 0.9rem",
          fontWeight: 900, fontSize: "1rem",
          border: "1px solid rgba(255,255,255,0.25)",
          cursor: "pointer", color: "white",
        }}>🔄</motion.button>
      </div>

      {/* Scan overlay */}
      <AnimatePresence>
        {phase === "active" && !showInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
            {[
              { top: "20%", left: "10%", rotate: "0deg" },
              { top: "20%", right: "10%", rotate: "90deg" },
              { bottom: "20%", left: "10%", rotate: "270deg" },
              { bottom: "20%", right: "10%", rotate: "180deg" },
            ].map((pos, i) => (
              <motion.div key={i} animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  position: "absolute", width: "35px", height: "35px",
                  borderTop: `3px solid ${org.color}`, borderLeft: `3px solid ${org.color}`,
                  transform: `rotate(${pos.rotate})`, borderRadius: "4px 0 0 0", ...pos,
                }} />
            ))}
            <motion.div animate={{ top: ["22%", "78%", "22%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", left: "10%", right: "10%", height: "2px",
                background: `linear-gradient(90deg, transparent, ${org.color}, transparent)`,
                boxShadow: `0 0 12px ${org.color}`,
              }} />
            <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70px", height: "70px", borderRadius: "50%",
                border: `2px solid ${org.color}`,
                boxShadow: `0 0 30px ${org.color}66`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem",
              }}>{org.emoji}</motion.div>
            <div style={{
              position: "absolute", bottom: "18%", left: "15%", right: "15%",
              background: "rgba(255,255,255,0.1)", borderRadius: "99px", height: "6px",
            }}>
              <motion.div style={{
                height: "100%", borderRadius: "99px",
                background: `linear-gradient(90deg, ${org.color}, ${org.accentColor})`,
                width: `${scanProgress}%`, boxShadow: `0 0 10px ${org.color}`,
              }} />
            </div>
            <p style={{
              position: "absolute", bottom: "13%", width: "100%", textAlign: "center",
              color: "rgba(255,255,255,0.9)", fontWeight: 800, fontSize: "0.85rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}>🔍 Mendeteksi {org.name}... {Math.round(scanProgress)}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR overlay */}
      <AnimatePresence>
        {showInfo && (
          <>
            {/* Particles */}
            <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Particle key={i} color={i % 2 === 0 ? org.color : org.accentColor} delay={i * 0.5} />
              ))}
            </div>

            {/* Floating badges — only on desktop */}
            {!isMobile && (
              <>
                <FloatingBadge icon="📅" text={org.founded} color={org.color} x={5} y={30} delay={0.3} />
                <FloatingBadge icon="🌍" text={org.members} color={org.accentColor} x={60} y={18} delay={0.6} />
              </>
            )}

            {/* Org 3D decoration */}
            <OrgDecoration orgId={org.id} color={org.color} />
            
  {/* Logo 3D */}
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", damping: 15, delay: 0.2 }}
  style={logoStyle}
>
  <ARScene3D orgId={org.id as "pbb" | "asean" | "g20" | "eu"} visible={showInfo} />
</motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 60 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180, delay: 0.3 }}
              style={{
                position: "absolute",
                zIndex: 10,
                background: "transparent",
                display: "flex", flexDirection: "column", gap: "0.5rem",
                ...infoStyle,
              }}
            >
              {/* Org identity */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(14px)",
                borderRadius: "16px", padding: "0.6rem 0.75rem",
                border: `1px solid ${org.color}44`,
              }}>
                <OrbEmoji emoji={org.emoji} color={org.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                    <h2 style={{
                      fontFamily: "'Fredoka One', cursive", fontSize: "1.3rem", margin: 0,
                      background: org.gradient,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.4))",
                    }}>{org.name}</h2>
                    <span style={{
                      background: org.diffColor, color: "white",
                      fontWeight: 900, fontSize: "0.62rem",
                      padding: "0.12rem 0.5rem", borderRadius: "50px",
                    }}>{org.difficulty}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>
                    {org.fullName}
                  </p>
                </div>
              </div>

              {/* AR detected */}
              <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
                  border: `1px solid ${org.color}44`, borderRadius: "12px",
                  padding: "0.45rem 0.75rem",
                }}>
                <div style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                  animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0,
                }} />
                <span style={{ fontWeight: 800, fontSize: "0.75rem", color: "rgba(255,255,255,0.9)" }}>
                  📡 AR Terdeteksi — {org.name} ditemukan!
                </span>
              </motion.div>

              {/* Fact card */}
              <div style={{
                background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
                borderRadius: "14px", padding: "0.7rem",
                border: `1px solid ${org.color}33`,
                minHeight: "56px", display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden",
              }}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentFact}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.55rem", width: "100%" }}>
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{facts[currentFact].icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {facts[currentFact].label}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: "0.8rem", color: "white", lineHeight: 1.3 }}>
                        {facts[currentFact].value}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                  {facts.map((_, i) => (
                    <div key={i} style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: i === currentFact ? org.color : "rgba(255,255,255,0.2)",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <motion.a href={`/${org.id}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "0.7rem",
                    background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                    color: "white", borderRadius: "12px",
                    fontWeight: 900, fontSize: "0.8rem",
                    textDecoration: "none", textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
                  }}>📖 Detail</motion.a>
                <AnimatePresence>
                  {quizReady && (
                    <motion.a href={`/?quiz=${org.id}`}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 2, padding: "0.7rem", background: org.gradient,
                        color: org.textColor, borderRadius: "12px",
                        fontWeight: 900, fontSize: "0.82rem",
                        textDecoration: "none", textAlign: "center",
                        boxShadow: `0 6px 20px ${org.color}55`,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
                      }}>❓ Kuis +{org.xp} XP →</motion.a>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Permission screen */}
      <AnimatePresence>
        {phase === "permission" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              position: "absolute", inset: 0, zIndex: 50,
              background: `linear-gradient(160deg, ${org.color}33, #f0f4ff, ${org.accentColor}22)`,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
            }}>
            <div style={{
              background: "white", borderRadius: "28px", padding: "2.5rem 2rem",
              textAlign: "center", maxWidth: "360px",
              boxShadow: `0 20px 60px ${org.color}44`, border: `3px solid ${org.color}44`,
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📷</div>
              <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: "#2a2a4a", marginBottom: "0.75rem" }}>
                Izin Kamera
              </h2>
              <p style={{ color: "#666", fontWeight: 700, lineHeight: 1.6, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                GlobalQuest AR butuh kamera untuk menampilkan info <strong style={{ color: org.color }}>{org.name}</strong> di dunia nyata! 🌍
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => startCamera(facingMode)}
                style={{
                  width: "100%", padding: "1rem", background: org.gradient,
                  color: "white", border: "none", borderRadius: "14px", cursor: "pointer",
                  fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
                  boxShadow: `0 8px 25px ${org.color}66`,
                }}>📷 Izinkan Kamera</motion.button>
              <a href="/" style={{ display: "block", marginTop: "0.8rem", color: "#aaa", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                ← Kembali
              </a>
            </div>
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              position: "absolute", inset: 0, zIndex: 50,
              background: "linear-gradient(160deg, #fff0f0, #fff8f0)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
            }}>
            <div style={{
              background: "white", borderRadius: "28px", padding: "2.5rem 2rem",
              textAlign: "center", maxWidth: "360px",
              boxShadow: "0 20px 60px rgba(255,80,80,0.15)", border: "3px solid #ffdddd",
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😅</div>
              <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: "#2a2a4a", marginBottom: "0.75rem" }}>
                Kamera Tidak Tersedia
              </h2>
              <p style={{ color: "#888", fontWeight: 700, lineHeight: 1.6, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                {errorMsg || "Kamera tidak dapat diakses."}
              </p>
              <a href={`/${org.id}`} style={{
                display: "block", padding: "1rem", background: org.gradient,
                color: "white", borderRadius: "14px",
                fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
                textDecoration: "none", boxShadow: `0 8px 25px ${org.color}66`,
              }}>📖 Lihat Info {org.name}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-50px) scale(1.1) translateX(8px); opacity: 0.4; }
          100% { transform: translateY(-100px) scale(0.5) translateX(-5px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}