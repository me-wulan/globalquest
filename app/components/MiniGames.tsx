"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type GameId = "pbb" | "asean" | "g20" | "eu";
type GameScreen = "select" | "playing" | "result";

interface Badge {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  color: string;
}

// ─── Badge definitions ────────────────────────────────────────────────────────

const BADGES: Record<string, Badge> = {
  pbb_master:   { id: "pbb_master",   emoji: "🌐", name: "PBB Master",      desc: "Kuasai semua soal PBB!",    color: "#6EC6FF" },
  asean_hero:   { id: "asean_hero",   emoji: "🌺", name: "ASEAN Hero",      desc: "Pecinta Asia Tenggara!",    color: "#8BE9B3" },
  g20_guru:     { id: "g20_guru",     emoji: "💰", name: "G20 Guru",        desc: "Ekonom Global sejati!",     color: "#FFE66D" },
  eu_explorer:  { id: "eu_explorer",  emoji: "⭐", name: "EU Explorer",     desc: "Petualang Eropa terbaik!",  color: "#C8B6FF" },
  perfect:      { id: "perfect",      emoji: "🏆", name: "Sempurna!",       desc: "Skor 100% tanpa salah!",    color: "#FFB86B" },
  speedster:    { id: "speedster",    emoji: "⚡", name: "Kilat!",          desc: "Selesai dalam 30 detik!",   color: "#FF9ECF" },
};

// ─── Game data per org ────────────────────────────────────────────────────────

const GAMES = {
  pbb: {
    name: "PBB",
    fullName: "Perserikatan Bangsa-Bangsa",
    emoji: "🌐",
    color: "#6EC6FF",
    gradient: "linear-gradient(135deg, #6EC6FF 0%, #3AAFEE 60%, #C8B6FF 100%)",
    dark: "#1a6fa0",
    xpReward: 500,
    badge: "pbb_master",
    description: "Uji pengetahuanmu tentang organisasi internasional terbesar di dunia!",
    questions: [
      {
        q: "PBB didirikan pada tanggal berapa?",
        opts: ["24 Oktober 1945", "1 Januari 1946", "8 Agustus 1945", "24 April 1946"],
        correct: 0,
        fact: "🎉 PBB resmi berdiri pada 24 Oktober 1945, kini diperingati sebagai Hari PBB!",
      },
      {
        q: "Berapa jumlah negara anggota PBB saat ini?",
        opts: ["185 negara", "193 negara", "197 negara", "200 negara"],
        correct: 1,
        fact: "🌍 193 negara adalah anggota PBB — hampir semua negara di dunia!",
      },
      {
        q: "Di kota mana markas besar PBB berada?",
        opts: ["Washington DC", "London", "New York", "Geneva"],
        correct: 2,
        fact: "🏢 Markas besar PBB berada di Manhattan, New York City, AS!",
      },
      {
        q: "Organ utama PBB yang bertanggung jawab atas perdamaian dunia adalah?",
        opts: ["Majelis Umum", "Dewan Keamanan", "Sekretariat", "ICJ"],
        correct: 1,
        fact: "🛡️ Dewan Keamanan PBB punya 5 anggota tetap: AS, Rusia, China, UK, dan Prancis!",
      },
      {
        q: "Berapa bahasa resmi yang digunakan PBB?",
        opts: ["4 bahasa", "5 bahasa", "6 bahasa", "8 bahasa"],
        correct: 2,
        fact: "🗣️ 6 bahasa resmi PBB: Arab, Mandarin, Inggris, Prancis, Rusia, Spanyol!",
      },
    ],
  },
  asean: {
    name: "ASEAN",
    fullName: "Association of Southeast Asian Nations",
    emoji: "🌺",
    color: "#8BE9B3",
    gradient: "linear-gradient(135deg, #8BE9B3 0%, #5DD4A0 60%, #6EC6FF 100%)",
    dark: "#1a7a50",
    xpReward: 400,
    badge: "asean_hero",
    description: "Seberapa tahu kamu tentang keluarga besar Asia Tenggara kita?",
    questions: [
      {
        q: "Berapa negara pendiri ASEAN pada 1967?",
        opts: ["3 negara", "5 negara", "7 negara", "10 negara"],
        correct: 1,
        fact: "🌟 5 negara pendiri ASEAN: Indonesia, Malaysia, Filipina, Singapura, Thailand!",
      },
      {
        q: "Di mana Sekretariat ASEAN berada?",
        opts: ["Singapura", "Bangkok", "Jakarta", "Kuala Lumpur"],
        correct: 2,
        fact: "🇮🇩 Bangga! Sekretariat ASEAN ada di Jakarta, Indonesia!",
      },
      {
        q: "Negara ASEAN dengan populasi terbesar adalah?",
        opts: ["Filipina", "Vietnam", "Indonesia", "Thailand"],
        correct: 2,
        fact: "🏝️ Indonesia adalah negara ASEAN terbesar dengan 270+ juta penduduk!",
      },
      {
        q: "ASEAN Free Trade Area (AFTA) bertujuan untuk?",
        opts: ["Militer bersama", "Perdagangan bebas", "Mata uang tunggal", "Visa bersama"],
        correct: 1,
        fact: "💸 AFTA mengurangi tarif dagang antar negara ASEAN untuk mendorong ekonomi!",
      },
      {
        q: "Motto ASEAN adalah?",
        opts: ["Satu Visi", "One Vision, One Identity, One Community", "Unity in Diversity", "Together We Stand"],
        correct: 1,
        fact: "✨ 'One Vision, One Identity, One Community' — satu visi, satu identitas, satu komunitas!",
      },
    ],
  },
  g20: {
    name: "G20",
    fullName: "Group of Twenty",
    emoji: "💰",
    color: "#FFE66D",
    gradient: "linear-gradient(135deg, #FFE66D 0%, #FFB86B 60%, #FF9ECF 100%)",
    dark: "#8a5200",
    xpReward: 450,
    badge: "g20_guru",
    description: "Tes pengetahuanmu soal forum ekonomi paling berpengaruh di dunia!",
    questions: [
      {
        q: "G20 didirikan pada tahun berapa?",
        opts: ["1995", "1997", "1999", "2001"],
        correct: 2,
        fact: "📅 G20 dibentuk tahun 1999 sebagai respons krisis keuangan Asia 1997-98!",
      },
      {
        q: "G20 mewakili berapa persen GDP dunia?",
        opts: ["65%", "75%", "80%", "85%"],
        correct: 3,
        fact: "💪 G20 mengontrol 85% ekonomi dunia — kekuatan finansial luar biasa!",
      },
      {
        q: "Indonesia menjadi presidensi G20 pada tahun?",
        opts: ["2019", "2020", "2021", "2022"],
        correct: 3,
        fact: "🏝️ Indonesia sukses jadi Presidensi G20 di Bali 2022 dengan tema 'Recover Together, Recover Stronger'!",
      },
      {
        q: "Selain 19 negara, siapa anggota ke-20 G20?",
        opts: ["NATO", "ASEAN", "Uni Eropa", "PBB"],
        correct: 2,
        fact: "⭐ Uni Eropa adalah anggota ke-20 G20, mewakili seluruh blok Eropa!",
      },
      {
        q: "Pertemuan G20 diadakan berapa kali setahun?",
        opts: ["1 kali", "2 kali", "4 kali", "Setiap bulan"],
        correct: 0,
        fact: "📋 KTT G20 diadakan 1 kali per tahun, tapi pertemuan Menteri lebih sering!",
      },
    ],
  },
  eu: {
    name: "Uni Eropa",
    fullName: "European Union",
    emoji: "⭐",
    color: "#C8B6FF",
    gradient: "linear-gradient(135deg, #C8B6FF 0%, #A389F5 60%, #FF9ECF 100%)",
    dark: "#4a2080",
    xpReward: 480,
    badge: "eu_explorer",
    description: "Jelajahi persatuan unik 27 negara Eropa yang memukau!",
    questions: [
      {
        q: "Uni Eropa secara resmi berdiri dengan Perjanjian?",
        opts: ["Roma 1957", "Paris 1951", "Maastricht 1993", "Lisbon 2009"],
        correct: 2,
        fact: "📜 Perjanjian Maastricht 1993 resmi mendirikan Uni Eropa seperti yang kita kenal!",
      },
      {
        q: "Berapa negara anggota Uni Eropa setelah Brexit?",
        opts: ["25", "26", "27", "28"],
        correct: 2,
        fact: "🇬🇧 Setelah Inggris keluar (Brexit 2020), Uni Eropa kini punya 27 anggota!",
      },
      {
        q: "Mata uang resmi Uni Eropa adalah?",
        opts: ["Franc", "Euro", "Mark", "Pound"],
        correct: 1,
        fact: "💶 Euro digunakan oleh 20 dari 27 negara EU — disebut 'Eurozone'!",
      },
      {
        q: "Uni Eropa memenangkan Nobel Perdamaian pada tahun?",
        opts: ["2004", "2008", "2012", "2016"],
        correct: 2,
        fact: "🏆 UE meraih Nobel Perdamaian 2012 atas kontribusinya menjaga perdamaian Eropa!",
      },
      {
        q: "Zona perjalanan bebas visa antar negara EU disebut?",
        opts: ["Zona Euro", "Zona Schengen", "Zona Free Trade", "Zona Brussels"],
        correct: 1,
        fact: "✈️ Zona Schengen memungkinkan 26 negara bebas dikunjungi tanpa pemeriksaan paspor!",
      },
    ],
  },
};

// ─── Confetti particle ────────────────────────────────────────────────────────

function ConfettiPiece({ color, delay }: { color: string; delay: number }) {
  const left = Math.random() * 100;
  const rotate = Math.random() * 720 - 360;
  return (
    <motion.div
      initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: "110vh", rotate, opacity: [1, 1, 0], scale: [1, 0.8, 0.4] }}
      transition={{ duration: 2.5 + Math.random(), delay, ease: "easeIn" }}
      style={{
        position: "fixed", top: 0, width: 10 + Math.random() * 8, height: 10 + Math.random() * 8,
        background: color, borderRadius: Math.random() > 0.5 ? "50%" : "2px", zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

function Confetti() {
  const colors = ["#FFE66D", "#FF9ECF", "#6EC6FF", "#8BE9B3", "#C8B6FF", "#FFB86B"];
  return (
    <>
      {Array.from({ length: 60 }).map((_, i) => (
        <ConfettiPiece key={i} color={colors[i % colors.length]} delay={i * 0.03} />
      ))}
    </>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total, color }: { current: number; total: number; color: string }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: "100%", background: "rgba(0,0,0,0.08)", borderRadius: 99, height: 12, overflow: "hidden", position: "relative" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 12px ${color}80` }}
      />
      <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 9, fontWeight: 900, color: "rgba(0,0,0,0.4)", fontFamily: "'Nunito', sans-serif" }}>
        {current}/{total}
      </div>
    </div>
  );
}

// ─── Score XP Popup ───────────────────────────────────────────────────────────

function XPPopup({ xp, show }: { xp: number; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: 1.2, y: -30, opacity: 1 }}
          exit={{ scale: 0, y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            background: "linear-gradient(135deg, #FFE66D, #FFB86B)",
            color: "#7a4200", fontFamily: "'Fredoka One', cursive", fontSize: "2rem",
            padding: "0.75rem 2rem", borderRadius: 50,
            boxShadow: "0 10px 40px rgba(255,184,107,0.7)", zIndex: 9998,
            pointerEvents: "none",
          }}
        >
          +{xp} XP ⚡
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Answer feedback popup ────────────────────────────────────────────────────

function FeedbackPopup({ correct, fact, onNext }: { correct: boolean; fact: string; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 900, padding: "1rem",
        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.05 }}
        style={{
          background: correct ? "linear-gradient(135deg, #8BE9B3, #5DD4A0)" : "linear-gradient(135deg, #FF9ECF, #FF6B9D)",
          borderRadius: 28, padding: "2.5rem 2rem", maxWidth: 440, width: "100%", textAlign: "center",
          boxShadow: correct ? "0 20px 60px rgba(139,233,179,0.5)" : "0 20px 60px rgba(255,158,207,0.5)",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "4rem", marginBottom: "0.5rem" }}
        >
          {correct ? "🎉" : "😅"}
        </motion.div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "white", marginBottom: "0.75rem" }}>
          {correct ? "Benar Banget!" : "Hampir Tepat!"}
        </div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: "1.5rem", background: "rgba(255,255,255,0.2)", borderRadius: 16, padding: "1rem" }}>
          {fact}
        </div>
        <motion.button
          whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.95 }}
          onClick={onNext}
          style={{
            background: "white", color: correct ? "#2a8a5a" : "#c02060",
            fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
            border: "none", borderRadius: 50, padding: "0.75rem 2.5rem",
            cursor: "pointer", boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        >
          {correct ? "Lanjut! 🚀" : "Coba Lagi! 💪"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Badge popup ──────────────────────────────────────────────────────────────

function BadgePopup({ badge, onClose }: { badge: Badge; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 15 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        style={{
          background: "rgba(255,255,255,0.95)",
          border: `3px solid ${badge.color}`,
          borderRadius: 32, padding: "3rem 2.5rem", maxWidth: 380, width: "92%",
          textAlign: "center", boxShadow: `0 30px 80px ${badge.color}60, 0 0 0 1px ${badge.color}40`,
          backdropFilter: "blur(20px)",
        }}
      >
        <motion.div animate={{ rotate: [0, -10, 10, -5, 5, 0] }} transition={{ duration: 0.8, delay: 0.3 }} style={{ fontSize: "5rem", marginBottom: "0.75rem" }}>
          {badge.emoji}
        </motion.div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "0.85rem", color: badge.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Badge Baru!
        </div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2rem", color: "#3a3a5c", marginBottom: "0.5rem" }}>
          {badge.name}
        </div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#7a7aaa", fontSize: "1rem", marginBottom: "2rem" }}>
          {badge.desc}
        </div>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={onClose}
          style={{
            background: `linear-gradient(135deg, ${badge.color}, ${badge.color}99)`,
            color: "white", fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
            border: "none", borderRadius: 50, padding: "0.75rem 2.5rem", cursor: "pointer",
            boxShadow: `0 8px 25px ${badge.color}60`,
          }}
        >
          Mantap! 🎉
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Game selector card ───────────────────────────────────────────────────────

function GameCard({ gameKey, onClick, earnedBadges }: { gameKey: GameId; onClick: () => void; earnedBadges: string[] }) {
  const g = GAMES[gameKey];
  const done = earnedBadges.includes(g.badge);
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        background: g.gradient, borderRadius: 28, padding: "2rem 1.5rem",
        cursor: "pointer", textAlign: "center", position: "relative", overflow: "hidden",
        boxShadow: `0 12px 40px ${g.color}50`,
        border: done ? `3px solid #FFE66D` : "3px solid transparent",
      }}
    >
      {done && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: "absolute", top: 12, right: 12, background: "#FFE66D", color: "#7a4200", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.7rem", borderRadius: 50, padding: "0.2rem 0.6rem", display: "flex", alignItems: "center", gap: 3 }}>
          ✓ Selesai
        </motion.div>
      )}
      <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>{g.emoji}</div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{g.name}</div>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", marginTop: "0.25rem" }}>{g.fullName}</div>
      <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "0.4rem 0.75rem", display: "inline-block", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.85rem", color: "white" }}>
        ⚡ +{g.xpReward} XP
      </div>
      <div style={{ marginTop: "0.5rem", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>
        5 pertanyaan • Badge: {g.emoji}
      </div>
    </motion.div>
  );
}

// ─── Main MiniGames component ─────────────────────────────────────────────────

export default function MiniGames({ onXpEarned }: { onXpEarned: (xp: number) => void }) {
  const [screen, setScreen] = useState<GameScreen>("select");
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBadge, setShowBadge] = useState<Badge | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStartTime, setGameStartTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const quizId = params.get("quiz") as GameId | null;
  if (quizId && GAMES[quizId]) {
    document.getElementById("minigames")?.scrollIntoView({ behavior: "smooth" });
    startGame(quizId);
    window.history.replaceState({}, "", "/#minigames");
  }
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const game = activeGame ? GAMES[activeGame] : null;
  const question = game ? game.questions[questionIdx] : null;

  // Timer
  useEffect(() => {
    if (screen === "playing") {
      setTimeLeft(60);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [screen, questionIdx]);

  const startGame = (id: GameId) => {
    setActiveGame(id);
    setQuestionIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setWrongAnswers([]);
    setGameStartTime(Date.now());
    setScreen("playing");
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);
    const correct = optIdx === question!.correct;
    if (correct) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(w => [...w, questionIdx]);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOpt(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (questionIdx + 1 >= game!.questions.length) {
      // End game
      setScreen("result");
      const finalScore = score + (selectedOpt === question!.correct ? 1 : 0);
      const xpEarned = Math.round((finalScore / game!.questions.length) * game!.xpReward);
      onXpEarned(xpEarned);
      setShowXpPopup(true);
      setTimeout(() => setShowXpPopup(false), 2200);

      if (finalScore === game!.questions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      // Badge logic
      const elapsed = (Date.now() - gameStartTime) / 1000;
      const newBadges: Badge[] = [];
      if (!earnedBadges.includes(game!.badge) && finalScore >= 4) {
        newBadges.push(BADGES[game!.badge]);
      }
      if (finalScore === game!.questions.length && !earnedBadges.includes("perfect")) {
        newBadges.push(BADGES["perfect"]);
      }
      if (elapsed < 30 && !earnedBadges.includes("speedster")) {
        newBadges.push(BADGES["speedster"]);
      }
      if (newBadges.length > 0) {
        setEarnedBadges(b => [...b, ...newBadges.map(b => b.id)]);
        setTimeout(() => setShowBadge(newBadges[0]), 2400);
      }
    } else {
      setQuestionIdx(i => i + 1);
    }
  };

  const finalScore = score; // at result screen this is already final

  const timerColor = timeLeft > 30 ? "#8BE9B3" : timeLeft > 10 ? "#FFB86B" : "#FF6B6B";

  return (
    <section id="minigames" style={{ padding: "4rem 1.5rem", position: "relative" }}>
      {/* Confetti */}
      {showConfetti && <Confetti />}
      <XPPopup xp={game?.xpReward ?? 0} show={showXpPopup} />
      <AnimatePresence>{showBadge && <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />}</AnimatePresence>

      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ display: "inline-block", background: "linear-gradient(135deg, #FFE66D, #FFB86B)", padding: "0.4rem 1.2rem", borderRadius: 50, fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#7a4200", marginBottom: "1rem" }}>
          🎮 Mini Games
        </div>
        <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#3a3a5c", margin: "0 0 0.75rem" }}>
          Tantang Dirimu! 🏆
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#7a7aaa", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
          Mainkan kuis interaktif per organisasi, kumpulkan XP dan badge eksklusif!
        </p>
      </motion.div>

      {/* Earned badges strip */}
      {earnedBadges.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {earnedBadges.map(bid => {
            const b = BADGES[bid];
            return (
              <motion.div key={bid} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                style={{ background: `linear-gradient(135deg, ${b.color}30, ${b.color}15)`, border: `2px solid ${b.color}`, borderRadius: 50, padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.8rem", color: "#3a3a5c" }}>
                {b.emoji} {b.name}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Game selector */}
      <AnimatePresence mode="wait">
        {screen === "select" && (
          <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: 960, margin: "0 auto" }}>
            {(["pbb", "asean", "g20", "eu"] as GameId[]).map((id, i) => (
              <motion.div key={id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GameCard gameKey={id} onClick={() => startGame(id)} earnedBadges={earnedBadges} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {screen === "playing" && game && question && (
          <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            style={{ maxWidth: 640, margin: "0 auto" }}>
            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("select")}
                style={{ background: "rgba(255,255,255,0.8)", border: "2px solid rgba(0,0,0,0.1)", borderRadius: 50, padding: "0.4rem 1rem", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", color: "#5a5a8a" }}>
                ← Kembali
              </motion.button>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Fredoka One', cursive", fontSize: "1.2rem" }}>
                {game.emoji} {game.name}
              </div>
              {/* Timer */}
              <motion.div
                animate={timeLeft <= 10 ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{
                  background: `linear-gradient(135deg, ${timerColor}40, ${timerColor}20)`,
                  border: `2px solid ${timerColor}`,
                  borderRadius: 50, padding: "0.4rem 0.9rem",
                  fontFamily: "'Fredoka One', cursive", fontSize: "1rem", color: timeLeft <= 10 ? "#cc3333" : "#3a3a5c",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                }}
              >
                ⏱ {timeLeft}s
              </motion.div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "1.25rem" }}>
              <ProgressBar current={questionIdx + 1} total={game.questions.length} color={game.color} />
            </div>

            {/* Score */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.9rem", color: "#5a5a8a" }}>
              <span>Pertanyaan {questionIdx + 1} dari {game.questions.length}</span>
              <span style={{ color: "#3AAFEE" }}>✅ {score} Benar</span>
            </div>

            {/* Question card */}
            <motion.div
              key={questionIdx}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: game.gradient, borderRadius: 28, padding: "2.5rem 2rem",
                marginBottom: "1.5rem", textAlign: "center",
                boxShadow: `0 16px 50px ${game.color}40`,
              }}
            >
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "white", lineHeight: 1.4, textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                {question.q}
              </div>
            </motion.div>

            {/* Options */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {question.opts.map((opt, i) => {
                const isSelected = selectedOpt === i;
                const isCorrect = i === question.correct;
                let bg = "rgba(255,255,255,0.9)";
                let border = "2px solid rgba(0,0,0,0.08)";
                let color = "#3a3a5c";
                if (selectedOpt !== null) {
                  if (isCorrect) { bg = "linear-gradient(135deg, #8BE9B3, #5DD4A0)"; border = "2px solid #5DD4A0"; color = "white"; }
                  else if (isSelected) { bg = "linear-gradient(135deg, #FF9ECF, #FF6B9D)"; border = "2px solid #FF6B9D"; color = "white"; }
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={selectedOpt === null ? { scale: 1.04, y: -3 } : {}}
                    whileTap={selectedOpt === null ? { scale: 0.96 } : {}}
                    onClick={() => handleAnswer(i)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      background: bg, border, borderRadius: 18, padding: "1rem 0.75rem",
                      fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem",
                      color, cursor: selectedOpt === null ? "pointer" : "default",
                      boxShadow: isSelected || (selectedOpt !== null && isCorrect) ? "0 8px 25px rgba(0,0,0,0.15)" : "0 4px 12px rgba(0,0,0,0.06)",
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      textAlign: "left", transition: "background 0.3s, border 0.3s",
                    }}
                  >
                    <span style={{ background: "rgba(0,0,0,0.08)", borderRadius: "50%", width: 24, height: 24, minWidth: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 900 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showFeedback && (
                <FeedbackPopup
                  correct={selectedOpt === question.correct}
                  fact={question.fact}
                  onNext={handleNext}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {screen === "result" && game && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ fontSize: "5rem", marginBottom: "0.5rem" }}
            >
              {finalScore === game.questions.length ? "🏆" : finalScore >= 3 ? "🎉" : "💪"}
            </motion.div>

            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.5rem", color: "#3a3a5c", margin: "0 0 0.5rem" }}>
              {finalScore === game.questions.length ? "Sempurna!" : finalScore >= 3 ? "Bagus Sekali!" : "Terus Semangat!"}
            </h2>

            {/* Score display */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{
                background: game.gradient, borderRadius: 28, padding: "2rem", marginBottom: "1.5rem",
                boxShadow: `0 16px 50px ${game.color}40`,
              }}
            >
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "4rem", color: "white", lineHeight: 1 }}>
                {finalScore}/{game.questions.length}
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "rgba(255,255,255,0.9)", fontSize: "1rem", marginTop: "0.25rem" }}>
                Jawaban Benar
              </div>
              {/* Star rating */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", fontSize: "2rem" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 400 }}>
                    {i <= Math.round((finalScore / game.questions.length) * 5) ? "⭐" : "☆"}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* XP earned */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <div style={{ background: "linear-gradient(135deg, #FFE66D, #FFB86B)", borderRadius: 16, padding: "0.75rem 1.5rem", fontFamily: "'Fredoka One', cursive", fontSize: "1.3rem", color: "#7a4200", boxShadow: "0 6px 20px rgba(255,184,107,0.4)" }}>
                ⚡ +{Math.round((finalScore / game.questions.length) * game.xpReward)} XP
              </div>
              {earnedBadges.includes(game.badge) && (
                <div style={{ background: `linear-gradient(135deg, ${game.color}40, ${game.color}20)`, border: `2px solid ${game.color}`, borderRadius: 16, padding: "0.75rem 1.5rem", fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem", color: "#3a3a5c" }}>
                  {game.emoji} Badge Didapat!
                </div>
              )}
            </motion.div>

            {/* Progress bar for result */}
            <div style={{ marginBottom: "2rem" }}>
              <ProgressBar current={finalScore} total={game.questions.length} color={game.color} />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.95 }}
                onClick={() => startGame(activeGame!)}
                style={{ padding: "0.9rem 2rem", borderRadius: 50, fontFamily: "'Fredoka One', cursive", fontSize: "1.05rem", color: "white", background: game.gradient, border: "none", cursor: "pointer", boxShadow: `0 8px 25px ${game.color}50` }}>
                🔄 Main Lagi
              </motion.button>
              <motion.button whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("select")}
                style={{ padding: "0.9rem 2rem", borderRadius: 50, fontFamily: "'Fredoka One', cursive", fontSize: "1.05rem", color: "#5a5a8a", background: "rgba(255,255,255,0.9)", border: "2px solid rgba(0,0,0,0.1)", cursor: "pointer", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
                🌍 Pilih Game Lain
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


