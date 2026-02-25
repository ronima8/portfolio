"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2500;
const MIN_FILL_TIME_MS = 3500;
const RATE_LIMIT_KEY = "contact_form_submissions_v1";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const HAS_EMAILJS_CONFIG = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const readRecentSubmissions = () => {
  if (typeof window === "undefined") return [] as number[];

  const raw = window.localStorage.getItem(RATE_LIMIT_KEY);
  if (!raw) return [] as number[];

  try {
    const now = Date.now();
    const parsed = JSON.parse(raw) as number[];
    if (!Array.isArray(parsed)) return [] as number[];
    return parsed.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  } catch {
    return [] as number[];
  }
};

const writeRecentSubmissions = (timestamps: number[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
};

const ContactForm = () => {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<null | "ok" | "invalid" | "error" | "sending" | "rate" | "bot" | "config">(null);
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const onSubmit = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();
    const company = data.get("company")?.toString().trim() ?? "";

    if (company) {
      setStatus("bot");
      form.reset();
      return;
    }

    if (Date.now() - openedAtRef.current < MIN_FILL_TIME_MS) {
      setStatus("bot");
      return;
    }

    if (!name || !email || !message) {
      setStatus("invalid");
      return;
    }

    if (!EMAIL_REGEX.test(email) || message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      setStatus("invalid");
      return;
    }

    const recentSubmissions = readRecentSubmissions();
    if (recentSubmissions.length >= RATE_LIMIT_MAX_REQUESTS) {
      setStatus("rate");
      return;
    }

    setStatus("sending");

    try {
      if (!HAS_EMAILJS_CONFIG || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        setStatus("config");
        return;
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          reply_to: email,
          message,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      writeRecentSubmissions([...recentSubmissions, Date.now()]);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900/80 border border-gray-800 rounded-sm backdrop-blur-sm px-4 sm:px-6 py-6 sm:py-8">
          <h3 className="text-xl font-medium text-emerald-300">{t("title")}</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit(event.currentTarget);
            }}
            className="mt-4 flex flex-col gap-3"
          >
            <input name="name" required maxLength={100} placeholder={t("namePlaceholder")} className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-sm sm:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <input name="email" required type="email" inputMode="email" maxLength={254} placeholder={t("emailPlaceholder")} className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-sm sm:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <textarea name="message" required minLength={10} maxLength={2500} rows={4} placeholder={t("messagePlaceholder")} className="border border-gray-800 rounded-sm bg-gray-950/70 px-3 py-2 text-sm sm:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)] pointer-events-none"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={status === "sending" || !HAS_EMAILJS_CONFIG}
                className="w-full sm:w-auto bg-emerald-400 text-black rounded-sm px-4 py-2 border border-emerald-300/60 hover:bg-emerald-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t("sending") : t("submit")}
              </button>
              {status === "ok" && <span className="text-sm text-emerald-300">{t("success")}</span>}
              {status === "invalid" && <span className="text-sm text-amber-300">{t("invalid")}</span>}
              {status === "error" && <span className="text-sm text-rose-400">{t("error")}</span>}
              {status === "config" && <span className="text-sm text-amber-300">{t("configError")}</span>}
              {status === "rate" && <span className="text-sm text-amber-300">{t("rateLimited")}</span>}
              {status === "bot" && <span className="text-sm text-amber-300">{t("botDetected")}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
