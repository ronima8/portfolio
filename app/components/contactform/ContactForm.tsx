"use client";

import { useState } from "react";
import styles from "./contactform.module.css";

export default function ContactForm() {
  const [status, setStatus] = useState<null | "ok" | "error">(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    
    console.log({ name, email, message });
    setStatus("ok");
    form.reset();
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>Связаться</h3>
        <form onSubmit={onSubmit} className={styles.form}>
          <input name="name" placeholder="Имя" className={styles.input} />
          <input name="email" placeholder="Email" className={styles.input} />
          <textarea name="message" rows={4} placeholder="Сообщение" className={styles.input} />
          <div className={styles.row}>
            <button type="submit" className={styles.btn}>Отправить</button>
            {status === "ok" && <span className={styles.ok}>Отправлено!</span>}
            {status === "error" && <span className={styles.error}>Заполните все поля.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
