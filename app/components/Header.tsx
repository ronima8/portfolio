"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <header className="w-full border-b border-gray-800/70 bg-gray-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href={`/${locale}`} className="text-base sm:text-lg font-semibold text-emerald-300 text-center sm:text-left">Pak Pavel</Link>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <nav className="text-sm text-gray-200 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <a href="#about" className="hover:text-emerald-300">{t("about")}</a>
            <a href="#projects" className="hover:text-emerald-300">{t("projects")}</a>
            <a href="#contact" className="hover:text-emerald-300">{t("contact")}</a>
          </nav>
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/ru"
              className={`px-2 py-1 rounded border transition-colors ${
                locale === "ru"
                  ? "bg-emerald-400 text-black border-emerald-300"
                  : "border-gray-700 text-gray-300 hover:border-emerald-400/50"
              }`}
            >
              RU
            </Link>
            <Link
              href="/en"
              className={`px-2 py-1 rounded border transition-colors ${
                locale === "en"
                  ? "bg-emerald-400 text-black border-emerald-300"
                  : "border-gray-700 text-gray-300 hover:border-emerald-400/50"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
