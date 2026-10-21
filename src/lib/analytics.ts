declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tells Google Analytics that a form was sent, as GA4's recommended «generate_lead» event. Does nothing when the
 * visitor has not accepted statistics cookies, since gtag is only loaded after consent.
 */
export function trackLead(form: "kontakt" | "pristilbud") {
  window.gtag?.("event", "generate_lead", { form });
}
