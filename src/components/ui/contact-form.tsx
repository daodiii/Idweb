"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface ContactFormProps {
  showExtendedFields?: boolean;
  className?: string;
}

export function ContactForm({
  showExtendedFields = false,
  className = "",
}: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Noe gikk galt");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Noe gikk galt. Prøv igjen eller send e-post direkte.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 py-8 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <p className="text-lg font-semibold">Takk for henvendelsen!</p>
        <p className="text-sm opacity-70">
          Jeg tar kontakt innen 24 timer.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Ditt navn"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Din e-post"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      {showExtendedFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            placeholder="Telefon (valgfritt)"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
          />
          <input
            type="text"
            name="company"
            placeholder="Bedriftsnavn (valgfritt)"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>
      )}

      <textarea
        name="message"
        rows={3}
        placeholder="Fortell kort om prosjektet ditt"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
      />

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 py-3 text-sm font-bold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Send forespørsel"
        )}
      </button>
    </form>
  );
}
