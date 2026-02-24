import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section 
      id="hero" 
      className="relative min-h-[80vh] flex items-center"
    >
      <div className="relative max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl rounded-sm border border-emerald-400/20 bg-gray-950/45 backdrop-blur-[2px] px-6 py-8">
          <h1 className="text-5xl font-bold text-gray-100">
            {t("title")}
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
          <a 
            href="#projects" 
            className="inline-block mt-10 rounded-sm bg-emerald-400 text-black px-8 py-3 text-base font-medium no-underline hover:bg-emerald-300 transition-colors shadow-md shadow-emerald-500/20 border border-emerald-300/60"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
