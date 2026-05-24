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
      position: "absolute",
      top: "50%",
      left: "25%",
      transform: "translate(-50%, -50%)",
      zIndex: 15,
      pointerEvents: "none",
      width: "260px",
      height: "260px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Slow outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "230px",
          height: "230px",
          borderRadius: "50%",
          border: `2px solid ${color}55`,
          boxShadow: `0 0 20px ${color}44`,
        }}
      />

      {/* Slow dashed ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "195px",
          height: "195px",
          borderRadius: "50%",
          border: `1.5px dashed ${color}33`,
        }}
      />

      {/* 2 dots orbiting slowly */}
      {[0, 1].map(i => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 + i * 6, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "210px",
            height: "210px",
            borderRadius: "50%",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
            opacity: 0.8,
          }} />
        </motion.div>
      ))}

      {/* Logo — gentle float only */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "155px",
          height: "155px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: `0 0 35px ${color}66, 0 0 70px ${color}22`,
          border: `2px solid ${color}88`,
          background: "rgba(255,255,255,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={logos[orgId]}
          alt={orgId}
          style={{ width: "88%", height: "88%", objectFit: "contain" }}
        />
      </motion.div>
    </div>
  );
}