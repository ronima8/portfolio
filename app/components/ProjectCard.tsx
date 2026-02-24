'use client'

import { useRef, useEffect, useState } from "react";
import type { Project } from "../../types/project";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <article 
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16"
    >
      {/* Карточка с информацией */}
      <div 
        className={`
          transition-all duration-700 ease-out transform-gpu will-change-transform
          bg-gray-950/70 border border-gray-800 rounded-sm p-6 shadow-sm
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}
          ${!isEven ? "lg:order-2" : ""}
        `}
      >
        <h3 className="text-2xl font-bold mb-3 text-emerald-300">{project.title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
        
        {/* Технологии по категориям */}
        <div className="space-y-4 mb-6">
          {project.tech.map((category) => (
            <div key={category.name}>
              <h4 className="text-sm font-semibold text-emerald-200 mb-2">{category.name}</h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span 
                    key={item}
                    className="text-xs px-3 py-1 rounded-full bg-gray-950/60 text-emerald-100 border border-emerald-400/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ссылки */}
        <div className="flex gap-4 flex-wrap">
          {project.presentation && (
            <a 
              href={project.presentation} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 bg-emerald-400 text-black rounded-sm text-sm hover:bg-emerald-300 transition-colors border border-emerald-300/60"
            >
              Презентация
            </a>
          )}
          {project.repo && (
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 border border-emerald-400/40 rounded-sm text-sm text-emerald-200 hover:bg-emerald-500/10 transition-colors"
            >
              Репозиторий
            </a>
          )}
          {project.href && (
            <a 
              href={project.href} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 border border-teal-400/40 rounded-sm text-sm text-teal-200 hover:bg-teal-500/10 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Изображение проекта */}
      <div 
        className={`
          transition-all duration-700 ease-out transform-gpu will-change-transform
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}
          ${!isEven ? "lg:order-1" : ""}
        `}
      >
        <div className="rounded-sm overflow-hidden shadow-md bg-gray-950/70 border border-gray-800 aspect-video">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}
