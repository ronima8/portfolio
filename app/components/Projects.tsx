import projects from "../../data/projects";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900/80 border border-gray-800 rounded-sm backdrop-blur-sm px-4 sm:px-6 py-6 sm:py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center text-emerald-300">{t("title")}</h2>
          <div className="space-y-8">
            {projects.map((p, index) => (
              <ProjectCard key={p.id} project={p} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
