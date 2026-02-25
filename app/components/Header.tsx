"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const phone = "+7 777 229 97 44";
  const phoneHref = "tel:+77772299744";
  const email = "jronima8@gmail.com";
  const emailHref = "mailto:jronima8@gmail.com";
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePhoneClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 640) return;

    event.preventDefault();

    try {
      await navigator.clipboard.writeText("+77772299744");
      setIsPhoneCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setIsPhoneCopied(false);
      }, 1500);
    } catch {
      return;
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 640;

      if (!isMobile) {
        setIsHiddenOnMobile(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 24) {
        setIsHiddenOnMobile(false);
      } else if (currentScrollY > lastScrollY + 8) {
        setIsHiddenOnMobile(true);
      } else if (currentScrollY < lastScrollY - 8) {
        setIsHiddenOnMobile(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full border-b border-gray-800/70 bg-gray-950/70 backdrop-blur-md sticky top-0 z-40 transition-transform duration-300 ${
        isHiddenOnMobile ? "-translate-y-full sm:translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href={`/${locale}`} className="text-base sm:text-lg font-semibold text-emerald-300 text-center sm:text-left">Pak Pavel</Link>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <nav className="text-sm text-gray-200 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <a href="#about" className="hover:text-emerald-300">{t("about")}</a>
            <a href="#projects" className="hover:text-emerald-300">{t("projects")}</a>
            <a href="#contact" className="hover:text-emerald-300">{t("contact")}</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap justify-center">
            <div className="inline-flex items-center gap-2">
              <a
                href={phoneHref}
                onClick={handlePhoneClick}
                aria-label="Phone"
                title="Click to copy on desktop"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-sm border border-emerald-400/35 bg-gray-900/60 px-2.5 sm:px-3 py-1.5 text-gray-200 hover:border-emerald-300/60 hover:text-emerald-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-emerald-300"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3a11 11 0 0 0 3.4.5c.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.2c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.3.5 3.4.1.4 0 .8-.3 1.1l-2.2 2.1z"/></svg>
                <span>{phone}</span>
              </a>
              {isPhoneCopied && <span className="text-emerald-300 text-[11px] sm:text-xs">Скопировано</span>}
            </div>
            <a
              href={emailHref}
              aria-label="Email"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-sm border border-emerald-400/35 bg-gray-900/60 px-2.5 sm:px-3 py-1.5 text-gray-200 hover:border-emerald-300/60 hover:text-emerald-200 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-emerald-300"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <span>{email}</span>
            </a>
          </div>
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
