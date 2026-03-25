"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[3px] text-red-500">
        Feil
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Noe gikk galt
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-[var(--color-text-muted)]">
        Beklager, det oppstod en uventet feil. Prøv å laste siden på nytt.
      </p>
      <button
        onClick={reset}
        className="mt-10 rounded-xl bg-[var(--color-accent)] px-8 py-3 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Prøv igjen
      </button>
    </div>
  );
}
