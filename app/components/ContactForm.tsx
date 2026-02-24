"use client";

import { useState } from "react";

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
    <section id="contact" className="py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-gray-900/80 border border-gray-800 rounded-sm backdrop-blur-sm px-6 py-8">
          <h3 className="text-xl font-medium text-emerald-300">Связаться</h3>
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
            <input name="name" placeholder="Имя" className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <input name="email" placeholder="Email" className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <textarea name="message" rows={4} placeholder="Сообщение" className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <div className="flex items-center gap-4">
              <button type="submit" className="bg-emerald-400 text-black rounded-sm px-4 py-2 border border-emerald-300/60 hover:bg-emerald-300 transition-colors">Отправить</button>
              {status === "ok" && <span className="text-sm text-emerald-300">Отправлено!</span>}
              {status === "error" && <span className="text-sm text-rose-400">Заполните все поля.</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
