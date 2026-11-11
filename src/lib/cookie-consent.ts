export const COOKIE_CONSENT_KEY = "kyvelon-cookie-consent";

export type CookieConsent = "accepted" | "rejected";

export const COOKIE_CONSENT_EVENT = "kyvelon:cookie-consent";

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* private mode — still broadcast for this session */
  }
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }),
  );
}

export function hasAnalyticsConsent() {
  return readCookieConsent() === "accepted";
}
