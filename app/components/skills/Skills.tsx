import styles from "./skills.module.css";

const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"];

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>Навыки</h3>
        <div className={styles.list}>
          {skills.map((s) => (
            <span key={s} className={styles.item}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
