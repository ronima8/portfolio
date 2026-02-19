'use client'

import { useRef, useEffect, useState } from "react";
import styles from "./skills.module.css";

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
    <section id="skills" className={styles.section}>
      <div className={styles.container} ref={sectionRef}>
        <h3
          className={
            styles.title +
            " " +
            (visible ? styles.titleIn : styles.titleHidden)
          }
        >
          Навыки
        </h3>
        <div className={styles.list}>
          {skills.map((s, i) => (
            <span
              key={s}
              className={
                styles.item +
                " " +
                (visible ? styles.itemIn : styles.itemHidden)
              }
              style={visible ? { transitionDelay: `${0.6 + i * 0.3}s` } : {}}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
