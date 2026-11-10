export const locales = ["en", "el", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  el: "Ελληνικά",
  ar: "العربية",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
