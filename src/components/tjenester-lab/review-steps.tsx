"use client";

import { useState } from "react";
import { JobRow, ReviewMail, ReviewPage } from "@/components/tjenester-lab/seo-parts";
import { REVIEW_STEPS } from "@/components/tjenester-lab/seo-content";

/** From a finished job to a review on Google, in four steps. Choose a step and the screen it happens on shows. */
export function ReviewSteps() {
  const [cur, setCur] = useState(0);
  return (
    <div className="rs">
      <ol className="rs-steps">
        {REVIEW_STEPS.map((s, i) => (
          <li key={s.t}>
            <button type="button" aria-pressed={i === cur} className={i === cur ? "on" : i < cur ? "past" : undefined} onClick={() => setCur(i)}>
              <span className="rs-n">{i + 1}</span>
              <span>
                <b>{s.t}</b>
                <span className="rs-p">{s.p}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="rs-screen" aria-live="polite">
        <div className="rs-in" key={cur}>
          {cur === 0 && <JobRow />}
          {cur === 1 && <ReviewMail />}
          {cur === 2 && <ReviewPage />}
          {cur === 3 && <ReviewPage filled />}
        </div>
      </div>
    </div>
  );
}
