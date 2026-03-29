"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import {
  sendContactEmail,
  type ContactFormState,
} from "@/app/actions/send-email";

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

  const inputClasses =
    variant === "light"
      ? "w-full rounded-lg border border-black/20 bg-black/[0.07] px-4 py-3 text-sm text-inherit placeholder:text-inherit/60 focus:border-[var(--color-dark-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--color-dark-bg)]"
      : "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]";

  if (state?.success) {
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 py-8 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <p className="text-lg font-semibold text-white">Takk for henvendelsen!</p>
        <p className="text-sm text-white opacity-70">
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

      <textarea
        name="message"
        rows={3}
        aria-label="Melding"
        placeholder="Fortell kort om prosjektet ditt"
        className={inputClasses}
      />

      {state && !state.success && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={`${RAINBOW_BUTTON_CLASSES} w-full gap-2 px-8 py-3 text-sm font-bold sm:w-auto`}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Send forespørsel"
        )}
      </button>
    </form>
  );
}
