"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  sendContactEmail,
  type ContactFormState,
} from "@/app/actions/send-email";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

interface ContactFormProps {
  showExtendedFields?: boolean;
  className?: string;
  variant?: "dark" | "light";
}

export function ContactForm({
  showExtendedFields = false,
  className = "",
  variant = "dark",
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(sendContactEmail, null);

  // Timestamp set on mount — bots typically submit within milliseconds.
  // Real users take at least a few seconds to fill the form.
  const loadedAtRef = useRef<number>(0);
  const [loadedAt, setLoadedAt] = useState<string>("");
  useEffect(() => {
    const ts = Date.now();
    loadedAtRef.current = ts;
    setLoadedAt(String(ts));
  }, []);

  const inputClasses =
    variant === "light"
      ? "w-full rounded-lg border border-black/20 bg-black/[0.07] px-4 py-3 text-sm text-inherit placeholder:text-inherit/60 focus:border-[var(--color-dark-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--color-dark-bg)]"
      : "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]";

  if (state?.success) {
    const successHeading =
      variant === "light" ? "text-[#0a0a0a]" : "text-white";
    const successBody =
      variant === "light" ? "text-[#0a0a0a]/70" : "text-white/70";
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 py-8 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 aria-hidden className="h-12 w-12 text-green-500" />
        <p className={`text-lg font-semibold ${successHeading}`}>
          Takk for henvendelsen!
        </p>
        <p className={`text-sm ${successBody}`}>
          Vi tar kontakt innen 24 timer.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          aria-label="Ditt navn"
          placeholder="Ditt navn"
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-label="Din e-post"
          placeholder="Din e-post"
          className={inputClasses}
        />
      </div>

      {showExtendedFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            aria-label="Telefon"
            placeholder="Telefon (valgfritt)"
            className={inputClasses}
          />
          <input
            type="text"
            name="company"
            autoComplete="organization"
            aria-label="Bedriftsnavn"
            placeholder="Bedriftsnavn (valgfritt)"
            className={inputClasses}
          />
        </div>
      )}

      {/* Honeypot — hidden from real users; bots fill it. Field name is
          intentionally bland so scanners that whitelist common honeypots
          ("website", "url") don't skip it. */}
      <input
        type="text"
        name="fax_number"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      {/* Timestamp — server rejects submissions faster than 3s (bots) */}
      <input type="hidden" name="loaded_at" value={loadedAt} />

      <textarea
        name="message"
        rows={3}
        required
        maxLength={5000}
        aria-label="Melding"
        placeholder="Fortell kort om prosjektet ditt"
        className={inputClasses}
      />

      {state && !state.success && (
        <p
          className={`text-sm ${
            variant === "light" ? "text-red-700" : "text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={
          variant === "light"
            ? "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(10,10,10,0.45)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            : "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        }
        style={{ transitionTimingFunction: ENTRY_EASE }}
      >
        {isPending ? (
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send forespørsel
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            />
          </>
        )}
      </button>
    </form>
  );
}
