"use client";

import { useState, useEffect } from "react";
import { OrgData } from "../data";

export default function OrgInfoPage({ org }: { org: OrgData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const infoItems = [
    { icon: "📅", label: "Didirikan", value: org.founded },
    { icon: "🌍", label: "Anggota", value: org.members },
    { icon: "🏢", label: "Markas Besar", value: org.hq },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${org.color}22 0%, #f0f4ff 50%, ${org.accentColor}11 100%)`,
      fontFamily: "'Nunito', sans-serif",
      paddingBottom: "6rem",
    }}>
      {/* Header */}
      <div style={{
        background: org.gradient,
        padding: "3rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.1)" }}/>
        <div style={{ position:"absolute", bottom:-60, left:-30, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>

        {/* Back button */}
        <a href="/" style={{
          position: "absolute", top: "1rem", left: "1rem",
          background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
          color: "white", textDecoration: "none", fontWeight: 800, fontSize: "0.85rem",
          padding: "0.4rem 1rem", borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}>← Beranda</a>

        {/* Emoji besar */}
        <div style={{
          fontSize: "5rem", marginBottom: "0.5rem",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))",
          animation: visible ? "bounce 0.6s ease" : "none",
        }}>{org.emoji}</div>

        <h1 style={{
          color: "white", fontSize: "2.5rem",
          fontFamily: "'Fredoka One', cursive",
          textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          marginBottom: "0.3rem",
        }}>{org.name}</h1>

        <p style={{
          color: "rgba(255,255,255,0.9)", fontSize: "1rem",
          fontWeight: 700, marginBottom: "1rem",
        }}>{org.fullName}</p>

        {/* XP + Difficulty badge */}
        <div style={{ display:"flex", gap:"0.7rem", justifyContent:"center", flexWrap:"wrap" }}>
          <span style={{
            background: "rgba(255,255,255,0.25)", color: "white",
            padding: "0.4rem 1rem", borderRadius: "50px",
            fontWeight: 900, fontSize: "0.9rem",
            border: "1px solid rgba(255,255,255,0.4)",
          }}>⚡ {org.xp} XP</span>
          <span style={{
            background: org.diffColor, color: "white",
            padding: "0.4rem 1rem", borderRadius: "50px",
            fontWeight: 900, fontSize: "0.9rem",
          }}>🎯 {org.difficulty}</span>
        </div>
      </div>

      {/* Wave separator */}
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:"100%", height:"60px" }}>
          <defs>
            <linearGradient id={`waveGrad-${org.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={org.color}/>
              <stop offset="100%" stopColor={org.accentColor}/>
            </linearGradient>
          </defs>
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 Z" fill={`url(#waveGrad-${org.id})`}/>
        </svg>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 1.2rem" }}>

        {/* Info cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem", marginTop:"1.5rem" }}>
          {infoItems.map((item, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px",
              padding: "1rem 1.3rem",
              display: "flex", alignItems: "center", gap: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              border: `2px solid ${org.color}33`,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              opacity: visible ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.1}s`,
            }}>
              <span style={{ fontSize:"1.8rem" }}>{item.icon}</span>
              <div>
                <div style={{ fontSize:"0.75rem", color:"#999", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>{item.label}</div>
                <div style={{ fontSize:"1rem", fontWeight:900, color:"#2a2a4a" }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Deskripsi */}
        <div style={{
          background: "white", borderRadius: "20px",
          padding: "1.5rem", marginTop: "1.2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          border: `2px solid ${org.color}33`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.3s",
        }}>
          <h2 style={{ color: org.color, fontSize:"1.1rem", fontWeight:900, marginBottom:"0.7rem" }}>📖 Tentang</h2>
          <p style={{ color:"#444", lineHeight:1.7, fontSize:"0.95rem" }}>{org.description}</p>
        </div>

        {/* Misi */}
        <div style={{
          background: `linear-gradient(135deg, ${org.color}18, ${org.accentColor}18)`,
          borderRadius: "20px", padding: "1.5rem", marginTop: "1rem",
          border: `2px solid ${org.color}44`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.4s",
        }}>
          <h2 style={{ color: org.color, fontSize:"1.1rem", fontWeight:900, marginBottom:"0.7rem" }}>🎯 Misi Utama</h2>
          <p style={{ color:"#444", lineHeight:1.7, fontSize:"0.95rem" }}>{org.mission}</p>
        </div>

        {/* Fun Fact */}
        <div style={{
          background: `linear-gradient(135deg, ${org.accentColor}33, ${org.accentColor}11)`,
          borderRadius: "20px", padding: "1.5rem", marginTop: "1rem",
          border: `2px solid ${org.accentColor}66`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.5s",
        }}>
          <h2 style={{ color:"#f59e0b", fontSize:"1.1rem", fontWeight:900, marginBottom:"0.7rem" }}>💡 Fun Fact</h2>
          <p style={{ color:"#444", lineHeight:1.7, fontSize:"0.95rem" }}>{org.funFact}</p>
        </div>

        {/* Pencapaian */}
        <div style={{
          background: "white", borderRadius: "20px",
          padding: "1.5rem", marginTop: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          border: `2px solid ${org.color}33`,
          opacity: visible ? 1 : 0,
          transition: "all 0.5s ease 0.6s",
        }}>
          <h2 style={{ color: org.color, fontSize:"1.1rem", fontWeight:900, marginBottom:"1rem" }}>🏆 Pencapaian</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
            {org.achievements.map((a, i) => (
              <span key={i} style={{
                background: `${org.color}22`,
                color: org.color, fontWeight:800, fontSize:"0.85rem",
                padding:"0.4rem 0.9rem", borderRadius:"50px",
                border:`1.5px solid ${org.color}55`,
              }}>{a}</span>
            ))}
          </div>
        </div>

        {/* CTA — Mulai Kuis */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "1rem 1.5rem",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "2px solid rgba(110,198,255,0.2)",
          display: "flex", gap: "0.8rem",
          zIndex: 100,
        }}>
          <a href="/" style={{
            flex: 1, padding: "0.9rem",
            background: "rgba(110,198,255,0.15)",
            color: "#3a3a5c", borderRadius: "14px",
            fontWeight: 900, fontSize: "0.85rem",
            textDecoration: "none", textAlign: "center",
            border: "2px solid rgba(110,198,255,0.3)",
          }}>🏠</a>
          <a href={`/ar/${org.id}`} style={{
            flex: 1, padding: "0.9rem",
            background: "linear-gradient(135deg, #C8B6FF, #A389F5)",
            color: "white", borderRadius: "14px",
            fontWeight: 900, fontSize: "0.85rem",
            textDecoration: "none", textAlign: "center",
            boxShadow: "0 6px 20px rgba(200,182,255,0.5)",
          }}>📷 AR</a>
          <a href={`/?quiz=${org.id}`} style={{
            flex: 2, padding: "0.9rem",
            background: org.gradient,
            color: "white", borderRadius: "14px",
            fontWeight: 900, fontSize: "0.85rem",
            textDecoration: "none", textAlign: "center",
            boxShadow: `0 6px 20px ${org.color}66`,
          }}>❓ Kuis +{org.xp} XP →</a>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes bounce {
          0% { transform: scale(0.5) translateY(20px); opacity: 0; }
          70% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}