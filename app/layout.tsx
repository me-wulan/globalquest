import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobalQuest - Jelajahi Organisasi Global",
  description: "Belajar PBB, ASEAN, G20, dan Uni Eropa dengan cara seru!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#f0f4ff" }}>
        {children}
      </body>
    </html>
  );
}