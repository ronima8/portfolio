'use client'

import { useRef, useEffect, useState } from "react";
import type { Project } from "../../types/project";
import { useTranslations } from "next-intl";

type ProjectCardProps = Readonly<{
  project: Project;
  index: number;
}>;

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const t = useTranslations("ProjectCard");

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  const localizedTitle = t(`items.${project.id}.title`);
  const localizedDescription = t(`items.${project.id}.description`);
  const imageSrc = project.image ?? "/images/project-placeholder.svg";

  return (
    <article 
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center mb-10 sm:mb-16"
    >
      <div 
        className={`
          transition-all duration-700 ease-out transform-gpu will-change-transform
          bg-gray-950/70 border border-gray-800 rounded-sm p-4 sm:p-6 shadow-sm
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}
          ${!isEven ? "lg:order-2" : ""}
        `}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-emerald-300">{localizedTitle}</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">{localizedDescription}</p>
        
        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
          {project.tech.map((category) => (
            <div key={category.name}>
              <h4 className="text-xs sm:text-sm font-semibold text-emerald-200 mb-2">{category.name}</h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span 
                    key={item}
                    className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-gray-950/60 text-emerald-100 border border-emerald-400/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:flex gap-2.5 sm:gap-4">
          {project.presentation && (
            <a 
              href={project.presentation} 
              target="_blank" 
              rel="noreferrer" 
              className="text-center px-4 py-2 bg-emerald-400 text-black rounded-sm text-sm hover:bg-emerald-300 transition-colors border border-emerald-300/60"
            >
              {t("presentation")}
            </a>
          )}
          {project.repo && (
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noreferrer" 
              className="text-center px-4 py-2 border border-emerald-400/40 rounded-sm text-sm text-emerald-200 hover:bg-emerald-500/10 transition-colors"
            >
              {t("repository")}
            </a>
          )}
          {project.href && (
            <a 
              href={project.href} 
              target="_blank" 
              rel="noreferrer" 
              className="text-center px-4 py-2 border border-teal-400/40 rounded-sm text-sm text-teal-200 hover:bg-teal-500/10 transition-colors"
            >
              {t("liveDemo")}
            </a>
          )}
        </div>
      </div>

      <div 
        className={`
          transition-all duration-700 ease-out transform-gpu will-change-transform
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}
          ${!isEven ? "lg:order-1" : ""}
        `}
      >
        <div className="rounded-sm overflow-hidden shadow-md bg-gray-950/70 border border-gray-800 aspect-video">
          <img 
            src={imageSrc} 
            alt={localizedTitle} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}
