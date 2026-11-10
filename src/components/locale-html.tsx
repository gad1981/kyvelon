"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { dirFor } from "@/i18n/config";

export function LocaleHtml({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirFor(locale);
    document.documentElement.classList.toggle("rtl", locale === "ar");
  }, [locale]);

  return null;
}
