import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-10 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900/80 border border-gray-800 rounded-sm backdrop-blur-sm px-4 sm:px-6 py-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-emerald-300">{t("title")}</h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
