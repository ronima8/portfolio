import Socials from "../socials/Socials";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.credit}><strong>Your Name</strong> — built with Next.js</div>
        <Socials />
        <div className={styles.copy}>© {new Date().getFullYear()} Your Name. All rights reserved.</div>
      </div>
    </footer>
  );
}
