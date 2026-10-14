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
    <div className="ka">
      <section className="lost">
        <div className="wrap">
          <p className="code">Feil</p>
          <h1>Noe gikk galt</h1>
          <p className="lede">Beklager, det oppstod en uventet feil. Prøv å laste siden på nytt.</p>
          <div className="actions">
            <button type="button" onClick={reset} className="btn">
              Prøv igjen
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
