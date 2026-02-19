import type { Project } from "../../../types/project";
import styles from "./projectcard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={project.image} alt={project.title} className={styles.image} />
      </div>
      <h4 className={styles.title}>{project.title}</h4>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.tech}>
        {project.tech.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
      <div className={styles.links}>
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer" className={styles.live}>Live</a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer" className={styles.code}>Code</a>
        )}
      </div>
    </article>
  );
}
