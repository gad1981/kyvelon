import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads GTM when configured. GA4 is loaded directly so measurement works
 * immediately; once a Google tag for the same Measurement ID is published in
 * GTM, remove the GoogleAnalytics component to avoid double-counting.
 */
export function Analytics() {
  return (
    <>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
}

export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;

  const dataLayer = (window.dataLayer ??= []);
  dataLayer.push({ event, ...params });

  if (typeof window.gtag === "function" && GA_ID) {
    window.gtag("event", event, params);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
