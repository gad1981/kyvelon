"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/utils";

export function CookieBanner({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["cookies"];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  const decide = (value: CookieConsent) => {
    writeCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
      className={cn(
        "cookie-banner fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-5",
        "pointer-events-none",
      )}
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 border border-white/15 bg-[#040a18]/95 p-4 shadow-[0_-20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-md sm:flex-row sm:items-end sm:gap-6 sm:p-5">
        <div className="min-w-0 flex-1">
          <p className="text-[0.62rem] tracking-[0.2em] text-electric-soft uppercase">
            {t.eyebrow}
          </p>
          <p className="font-display mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
            {t.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            {t.body}{" "}
            <Link
              href={`/${locale}/terms`}
              className="text-electric-soft underline underline-offset-4 transition hover:text-white"
            >
              {t.policy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="inline-flex h-10 items-center border border-white/25 px-4 text-[0.62rem] tracking-[0.16em] text-white/70 uppercase transition hover:border-white/50 hover:text-white"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex h-10 items-center bg-electric px-4 text-[0.62rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
