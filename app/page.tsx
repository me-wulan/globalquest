"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MiniGames from "./components/MiniGames";

export default function Home() {
  const [xp, setXp] = useState(0);

  return (
    <main>
      <Navbar xp={xp} />
      <HeroSection onStartQuest={() => {
        document.getElementById("minigames")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <MiniGames onXpEarned={(earned) => setXp(prev => prev + earned)} />
    </main>
  );
}