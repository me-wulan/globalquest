"use client";

import { motion } from "framer-motion";

type OrgId = "pbb" | "asean" | "g20" | "eu";

const logos: Record<OrgId, string> = {
  pbb:   "/logo-pbb.png",
  asean: "/logo-asean.png",
  g20:   "/logo-g20.png",
  eu:    "/logo-eu.png",
};

const glowColors: Record<OrgId, string> = {
  pbb:   "#6EC6FF",
  asean: "#FFD700",
  g20:   "#FFE66D",
  eu:    "#4169E1",
};

export default function ARScene3D({ orgId, visible }: { orgId: OrgId; visible: boolean }) {
  if (!visible) return null;
  const color = glowColors[orgId];

  return (
    <div style={{
      width: "240px", height: "240px",
      display: "flex", alignItems: "center", justifyContent: "center",
      perspective: "600px", position: "relative",
    }}>
      <motion.div animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "230px", height: "230px", borderRadius: "50%", border: `2px solid ${color}66`, boxShadow: `0 0 25px ${color}55` }} />

      <motion.div animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "195px", height: "195px", borderRadius: "50%", border: `1.5px dashed ${color}44` }} />

      {[0, 1, 2].map(i => (
        <motion.div key={i} animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
          style={{ position: "absolute", width: "215px", height: "215px", borderRadius: "50%" }}>
          <div style={{
            position: "absolute", top: i === 1 ? "auto" : 0, bottom: i === 1 ? 0 : "auto",
            left: "50%", transform: "translateX(-50%)",
            width: i === 1 ? "7px" : "10px", height: i === 1 ? "7px" : "10px",
            borderRadius: "50%", background: i === 1 ? "#fff" : color,
            boxShadow: `0 0 14px ${color}, 0 0 28px ${color}66`,
          }} />
        </motion.div>
      ))}

      <motion.div animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", zIndex: 2 }}>
        <motion.div animate={{ rotateY: [0, 25, 0, -25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}>
          <div style={{
            width: "148px", height: "148px", borderRadius: "50%", overflow: "hidden",
            background: "rgba(255,255,255,0.96)", border: `3px solid ${color}99`,
            boxShadow: `0 0 50px ${color}99, 0 0 100px ${color}44, 0 25px 50px rgba(0,0,0,0.35), inset 0 3px 8px rgba(255,255,255,0.9)`,
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
          }}>
            <img src={logos[orgId]} alt={orgId} style={{ width: "88%", height: "88%", objectFit: "contain" }} />
            <motion.div animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              style={{ position: "absolute", top: 0, bottom: 0, width: "35%", background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)", transform: "skewX(-15deg)", pointerEvents: "none" }} />
          </div>
        </motion.div>
        <motion.div animate={{ scaleX: [1, 0.82, 1], opacity: [0.4, 0.18, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "-18px", left: "50%", transform: "translateX(-50%)", width: "100px", height: "12px", borderRadius: "50%", background: `radial-gradient(ellipse, ${color}77 0%, transparent 70%)`, filter: "blur(5px)" }} />
      </motion.div>
    </div>
  );
}