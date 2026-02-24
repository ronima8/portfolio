import Socials from "./Socials";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-20 border-t border-gray-800 bg-gray-950/80 text-center text-sm text-gray-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-3 text-xs sm:text-sm leading-relaxed"><strong className="text-emerald-300">Pak Pavel</strong> — {t("builtWith")}</div>
        <Socials />
        <div className="mt-4 text-xs sm:text-sm">© {new Date().getFullYear()} Pak Pavel. {t("rights")}</div>
      </div>
    </footer>
  );
}
