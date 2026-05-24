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
        left: `${x}%`,
        top: `${y}%`,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "50px",
        padding: "0.35rem 0.8rem",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: "0.75rem",
        color: "white",
        border: `1.5px solid ${color}66`,
        boxShadow: `0 4px 15px ${color}33`,
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        whiteSpace: "nowrap",
        zIndex: 20,
        pointerEvents: "none",
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
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        boxShadow: `0 0 20px ${color}66, inset 0 2px 6px rgba(255,255,255,0.3)`,
        border: `2px solid ${color}88`,
        flexShrink: 0,
      }}
    >
      {emoji}
    </motion.div>
  );
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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
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

  useEffect(() => {
    startCamera("environment");
    return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); };
  }, [startCamera]);

  useEffect(() => {
    if (!showInfo) return;
    const t = setInterval(() => setCurrentFact(p => (p + 1) % facts.length), 4000);
    return () => clearInterval(t);
  }, [showInfo, facts.length]);

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'Nunito', sans-serif", overflow: "hidden" }}>
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay playsInline muted
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transform: facingMode === "user" ? "scaleX(-1)" : "none",
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none",
      }} />

      {/* Top color bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px", zIndex: 20,
        background: org.gradient,
        boxShadow: `0 0 15px ${org.color}`,
      }} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 15,
        padding: "1rem 1.2rem 0.8rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
      }}>
        <motion.a href="/" whileTap={{ scale: 0.92 }} style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "50px",
          padding: "0.5rem 1.1rem",
          fontWeight: 900, fontSize: "0.85rem",
          color: "white",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          ← Kembali
        </motion.a>

        <div style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "50px",
          padding: "0.5rem 1.1rem",
          fontFamily: "'Fredoka One', cursive",
          fontSize: "1rem", color: "white",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          🌍 AR Mode
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={flipCamera} style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "50px",
          padding: "0.5rem 1rem",
          fontWeight: 900, fontSize: "1.1rem",
          border: "1px solid rgba(255,255,255,0.25)",
          cursor: "pointer", color: "white",
        }}>
          🔄
        </motion.button>
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
              <motion.div key={i}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  position: "absolute",
                  width: "40px", height: "40px",
                  borderTop: `3px solid ${org.color}`,
                  borderLeft: `3px solid ${org.color}`,
                  transform: `rotate(${pos.rotate})`,
                  borderRadius: "4px 0 0 0",
                  ...pos,
                }}
              />
            ))}
            <motion.div
              animate={{ top: ["22%", "78%", "22%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", left: "10%", right: "10%", height: "2px",
                background: `linear-gradient(90deg, transparent, ${org.color}, transparent)`,
                boxShadow: `0 0 12px ${org.color}`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80px", height: "80px", borderRadius: "50%",
                border: `2px solid ${org.color}`,
                boxShadow: `0 0 30px ${org.color}66`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2.5rem",
              }}>
              {org.emoji}
            </motion.div>
            <div style={{
              position: "absolute", bottom: "18%", left: "15%", right: "15%",
              background: "rgba(255,255,255,0.1)", borderRadius: "99px", height: "6px",
            }}>
              <motion.div style={{
                height: "100%", borderRadius: "99px",
                background: `linear-gradient(90deg, ${org.color}, ${org.accentColor})`,
                width: `${scanProgress}%`,
                boxShadow: `0 0 10px ${org.color}`,
              }} />
            </div>
            <p style={{
              position: "absolute", bottom: "13%", width: "100%", textAlign: "center",
              color: "rgba(255,255,255,0.9)", fontWeight: 800, fontSize: "0.9rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}>
              🔍 Mendeteksi {org.name}... {Math.round(scanProgress)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <>
            {/* Particles */}
            <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Particle key={i} color={i % 2 === 0 ? org.color : org.accentColor} delay={i * 0.4} />
              ))}
            </div>

            {/* Floating badges */}
            <FloatingBadge icon="📅" text={org.founded} color={org.color} x={5} y={30} delay={0.3} />
            <FloatingBadge icon="🌍" text={org.members} color={org.accentColor} x={60} y={18} delay={0.6} />

            {/* 3D Logo */}
            <ARScene3D orgId={org.id as "pbb" | "asean" | "g20" | "eu"} visible={showInfo} />

            {/* Info panel — HUD style, kanan bawah, transparan */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 180, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "25%",
                right: "3%",
                width: "46%",
                zIndex: 10,
                background: "transparent",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
              }}
            >
              {/* Org identity */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(14px)",
                borderRadius: "16px",
                padding: "0.65rem 0.75rem",
                border: `1px solid ${org.color}44`,
              }}>
                <OrbEmoji emoji={org.emoji} color={org.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    <h2 style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "1.4rem", margin: 0,
                      background: org.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                      filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.4))",
                    }}>{org.name}</h2>
                    <span style={{
                      background: org.diffColor, color: "white",
                      fontWeight: 900, fontSize: "0.65rem",
                      padding: "0.15rem 0.55rem", borderRadius: "50px",
                    }}>{org.difficulty}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>
                    {org.fullName}
                  </p>
                </div>
              </div>

              {/* AR detected */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${org.color}44`,
                  borderRadius: "12px",
                  padding: "0.5rem 0.8rem",
                }}
              >
                <div style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                  animation: "pulse 1.5s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <span style={{ fontWeight: 800, fontSize: "0.78rem", color: "rgba(255,255,255,0.9)" }}>
                  📡 AR Terdeteksi — {org.name} ditemukan!
                </span>
              </motion.div>

              {/* Fact card */}
              <div style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                padding: "0.75rem",
                border: `1px solid ${org.color}33`,
                minHeight: "60px",
                display: "flex", alignItems: "center", gap: "0.6rem",
                overflow: "hidden",
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFact}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%" }}
                  >
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{facts[currentFact].icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.62rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {facts[currentFact].label}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: "0.82rem", color: "white", lineHeight: 1.3 }}>
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
                <motion.a
                  href={`/${org.id}`}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, padding: "0.75rem",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                    color: "white", borderRadius: "12px",
                    fontWeight: 900, fontSize: "0.82rem",
                    textDecoration: "none", textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
                  }}
                >
                  📖 Detail
                </motion.a>
                <AnimatePresence>
                  {quizReady && (
                    <motion.a
                      href={`/?quiz=${org.id}#minigames`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 2, padding: "0.75rem",
                        background: org.gradient,
                        color: org.textColor, borderRadius: "12px",
                        fontWeight: 900, fontSize: "0.85rem",
                        textDecoration: "none", textAlign: "center",
                        boxShadow: `0 6px 20px ${org.color}55`,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
                      }}
                    >
                      ❓ Kuis +{org.xp} XP →
                    </motion.a>
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
              background: "white", borderRadius: "28px",
              padding: "2.5rem 2rem", textAlign: "center", maxWidth: "360px",
              boxShadow: `0 20px 60px ${org.color}44`,
              border: `3px solid ${org.color}44`,
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
                  width: "100%", padding: "1rem",
                  background: org.gradient, color: "white", border: "none",
                  borderRadius: "14px", cursor: "pointer",
                  fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
                  boxShadow: `0 8px 25px ${org.color}66`,
                }}>
                📷 Izinkan Kamera
              </motion.button>
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
              background: "white", borderRadius: "28px",
              padding: "2.5rem 2rem", textAlign: "center", maxWidth: "360px",
              boxShadow: "0 20px 60px rgba(255,80,80,0.15)",
              border: "3px solid #ffdddd",
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😅</div>
              <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: "#2a2a4a", marginBottom: "0.75rem" }}>
                Kamera Tidak Tersedia
              </h2>
              <p style={{ color: "#888", fontWeight: 700, lineHeight: 1.6, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                {errorMsg || "Kamera tidak dapat diakses."}
              </p>
              <a href={`/${org.id}`} style={{
                display: "block", padding: "1rem",
                background: org.gradient, color: "white", borderRadius: "14px",
                fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
                textDecoration: "none", boxShadow: `0 8px 25px ${org.color}66`,
              }}>
                📖 Lihat Info {org.name}
              </a>
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