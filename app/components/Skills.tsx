'use client'

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type SkillGroup = {
  category: string;
  items: string[];
};

export default function Skills() {
  const t = useTranslations("Skills");
  const skillGroups = t.raw("groups") as SkillGroup[];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-6">
      <div className="max-w-3xl mx-auto px-6" ref={sectionRef}>
        <div className="bg-gray-900/80 border border-gray-800 rounded-sm px-6 py-8">
          <h3
            className={`text-xl font-semibold text-emerald-300 transition-all duration-700 ease-out transform-gpu will-change-transform ${
              visible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-16"
            }`}
          >
            {t("title")}
          </h3>
          <div className="mt-5 space-y-5">
            {skillGroups.map((group, groupIndex) => (
              <div
                key={group.category}
                className={`transition-all duration-700 ease-out transform-gpu will-change-transform ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={visible ? { transitionDelay: `${0.15 + groupIndex * 0.2}s` } : {}}
              >
                <h4 className="text-sm font-semibold text-emerald-200 mb-2">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIndex) => (
                    <span
                      key={item}
                      className={`inline-block px-3 py-1 rounded-full bg-gray-950/70 border border-emerald-400/30 text-sm text-gray-200 transition-all duration-700 ease-out transform-gpu will-change-transform ${
                        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
                      }`}
                      style={visible ? { transitionDelay: `${0.3 + groupIndex * 0.2 + itemIndex * 0.05}s` } : {}}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
