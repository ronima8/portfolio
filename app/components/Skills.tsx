'use client'

import { useRef, useEffect, useState } from "react";

const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"];

export default function Skills() {
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
            Навыки
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={s}
                className={`inline-block px-3 py-1 rounded-full bg-gray-950/70 border border-emerald-400/30 text-sm text-gray-200 transition-all duration-700 ease-out transform-gpu will-change-transform ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-16"
                }`}
                style={visible ? { transitionDelay: `${0.6 + i * 0.3}s` } : {}}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
