import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section 
      id="hero" 
      className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center"
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="mx-auto max-w-3xl rounded-sm border border-emerald-400/20 bg-gray-950/45 backdrop-blur-[2px] px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 leading-tight">
            {t("title")}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#projects"
              className="inline-block rounded-sm bg-emerald-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium no-underline hover:bg-emerald-300 transition-colors shadow-md shadow-emerald-500/20 border border-emerald-300/60"
            >
              {t("cta")}
            </a>
            <Link
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-sm border border-emerald-400/45 bg-gray-900/65 text-emerald-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:border-emerald-300/70 hover:text-emerald-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 20h14v-2H5v2zM12 2v12.2l3.6-3.6L17 12l-5 5-5-5 1.4-1.4 3.6 3.6V2h2z"/></svg>
              <span>{t("resume")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
