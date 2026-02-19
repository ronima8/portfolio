import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "./components";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
