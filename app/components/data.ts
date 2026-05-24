export interface OrgData {
  id: string;
  name: string;
  fullName: string;
  emoji: string;
  founded: string;
  members: string;
  hq: string;
  color: string;
  gradient: string;
  textColor: string;
  accentColor: string;
  description: string;
  mission: string;
  funFact: string;
  achievements: string[];
  xp: number;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  diffColor: string;
}

export const organizations: OrgData[] = [
  {
    id: "pbb",
    name: "PBB",
    fullName: "Perserikatan Bangsa-Bangsa",
    emoji: "🌐",
    founded: "1945",
    members: "193 negara",
    hq: "New York, AS",
    color: "#6EC6FF",
    gradient: "linear-gradient(135deg, #6EC6FF 0%, #3AAFEE 50%, #C8B6FF 100%)",
    textColor: "#ffffff",
    accentColor: "#FFE66D",
    description: "PBB adalah organisasi internasional terbesar di dunia yang didirikan setelah Perang Dunia II untuk menjaga perdamaian dan keamanan dunia.",
    mission: "Menjaga perdamaian dunia, mengembangkan hubungan persahabatan, dan memajukan kemajuan sosial dan standar hidup yang lebih baik.",
    funFact: "PBB memiliki 6 bahasa resmi: Arab, Mandarin, Inggris, Prancis, Rusia, dan Spanyol! 🗣️",
    achievements: [
      "Mencegah Perang Dunia III",
      "Deklarasi HAM Universal",
      "Program Pangan Dunia",
      "UNICEF untuk Anak",
    ],
    xp: 500,
    difficulty: "Sedang",
    diffColor: "#FFB86B",
  },
  {
    id: "asean",
    name: "ASEAN",
    fullName: "Association of Southeast Asian Nations",
    emoji: "🌺",
    founded: "1967",
    members: "10 negara",
    hq: "Jakarta, Indonesia 🇮🇩",
    color: "#8BE9B3",
    gradient: "linear-gradient(135deg, #8BE9B3 0%, #5DD4A0 50%, #6EC6FF 100%)",
    textColor: "#fff",
    accentColor: "#FFE66D",
    description: "ASEAN adalah organisasi regional Asia Tenggara yang didirikan untuk meningkatkan kerja sama ekonomi, sosial, dan budaya antar negara anggota.",
    mission: "Mempercepat pertumbuhan ekonomi, kemajuan sosial, dan perkembangan budaya di kawasan Asia Tenggara serta mempromosikan perdamaian.",
    funFact: "Populasi ASEAN mencapai 680 juta orang — lebih besar dari seluruh Eropa! 🤯",
    achievements: [
      "Zona Perdagangan Bebas ASEAN",
      "Komunitas ASEAN 2025",
      "Kawasan Bebas Nuklir",
      "Kerja Sama Bencana Alam",
    ],
    xp: 400,
    difficulty: "Mudah",
    diffColor: "#8BE9B3",
  },
  {
    id: "g20",
    name: "G20",
    fullName: "Group of Twenty",
    emoji: "💰",
    founded: "1999",
    members: "20 negara + EU",
    hq: "Presidensi Bergilir",
    color: "#FFE66D",
    gradient: "linear-gradient(135deg, #FFE66D 0%, #FFB86B 50%, #FF9ECF 100%)",
    textColor: "#5a3800",
    accentColor: "#6EC6FF",
    description: "G20 adalah forum utama kerja sama internasional dalam bidang ekonomi dan keuangan yang anggotanya terdiri dari 19 negara plus Uni Eropa.",
    mission: "Mengkoordinasikan kebijakan ekonomi global, mengatur sistem keuangan internasional, dan mendorong pembangunan berkelanjutan.",
    funFact: "G20 mewakili 85% dari total ekonomi dunia! Indonesia pernah jadi tuan rumah di Bali 2022 🏝️",
    achievements: [
      "Respons Krisis 2008",
      "Reformasi Pajak Global",
      "Pendanaan Iklim",
      "Presidensi Indonesia 2022",
    ],
    xp: 450,
    difficulty: "Sulit",
    diffColor: "#FF9ECF",
  },
  {
    id: "eu",
    name: "Uni Eropa",
    fullName: "European Union (Uni Eropa)",
    emoji: "⭐",
    founded: "1993",
    members: "27 negara",
    hq: "Brussels, Belgia",
    color: "#C8B6FF",
    gradient: "linear-gradient(135deg, #C8B6FF 0%, #A389F5 50%, #FF9ECF 100%)",
    textColor: "#ffffff",
    accentColor: "#FFE66D",
    description: "Uni Eropa adalah persatuan politik dan ekonomi yang unik antara 27 negara Eropa, dengan mata uang bersama Euro dan kebebasan bergerak antar negara.",
    mission: "Mendorong perdamaian, nilai-nilai bersama, dan kesejahteraan warga negaranya melalui integrasi ekonomi dan politik yang mendalam.",
    funFact: "Kamu bisa bepergian ke 26 negara EU hanya dengan 1 paspor! Bayangkan petualangannya! ✈️",
    achievements: [
      "Mata Uang Euro",
      "Pasar Tunggal Eropa",
      "Nobel Perdamaian 2012",
      "Zona Schengen",
    ],
    xp: 480,
    difficulty: "Sulit",
    diffColor: "#FF9ECF",
  },
];

export const quizData = [
  {
    question: "PBB didirikan pada tahun berapa?",
    options: ["1939", "1945", "1950", "1960"],
    correct: 1,
    org: "pbb",
    explanation: "PBB didirikan pada 24 Oktober 1945 setelah berakhirnya Perang Dunia II.",
  },
  {
    question: "Di mana markas besar ASEAN berada?",
    options: ["Singapura", "Bangkok", "Jakarta", "Manila"],
    correct: 2,
    org: "asean",
    explanation: "Sekretariat ASEAN berlokasi di Jakarta, Indonesia 🇮🇩 — negara kita!",
  },
  {
    question: "G20 mewakili berapa persen ekonomi dunia?",
    options: ["50%", "65%", "75%", "85%"],
    correct: 3,
    org: "g20",
    explanation: "G20 mewakili sekitar 85% dari total GDP dunia dan 75% perdagangan global.",
  },
  {
    question: "Berapa negara anggota Uni Eropa saat ini?",
    options: ["25 negara", "27 negara", "28 negara", "30 negara"],
    correct: 1,
    org: "eu",
    explanation: "Setelah Brexit (keluarnya Inggris), Uni Eropa kini memiliki 27 negara anggota.",
  },
  {
    question: "ASEAN didirikan pada tahun?",
    options: ["1955", "1960", "1967", "1975"],
    correct: 2,
    org: "asean",
    explanation: "ASEAN didirikan pada 8 Agustus 1967 di Bangkok, Thailand oleh 5 negara pendiri.",
  },
];
