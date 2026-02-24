import type { Metadata } from "next";
import "./globals.css";
import HexBackground from "./components/HexBackground";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased relative overflow-x-hidden">
        <HexBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
