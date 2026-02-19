import styles from "./about.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>О себе</h2>
        <p className={styles.text}>Краткое описание: опыт в создании SPA и SSR-приложений, практическая работа с Next.js, TypeScript и Tailwind. Люблю чистую архитектуру и простые интерфейсы.</p>
      </div>
    </section>
  );
}
