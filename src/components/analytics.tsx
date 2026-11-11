"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads GTM/GA4 only after cookie consent is accepted.
 */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(hasAnalyticsConsent());
    const onChange = (ev: Event) => {
      const detail = (ev as CustomEvent<CookieConsent>).detail;
      setAllowed(detail === "accepted");
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  if (!allowed) return null;

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
  if (!hasAnalyticsConsent()) return;

  const dataLayer = (window.dataLayer ??= []);
  dataLayer.push({ event, ...params });

  if (typeof window.gtag === "function" && GA_ID) {
    window.gtag("event", event, params);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Object[];
  }
}
