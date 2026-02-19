import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привет — я Frontend-разработчик</h1>
        <p className={styles.text}>Создаю интерфейсы с фокусом на производительность и удобство. Next.js + TypeScript + Tailwind.</p>
        <a href="#projects" className={styles.cta}>Мои проекты</a>
      </div>
    </section>
  );
}
