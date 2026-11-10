import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => (await import("@/i18n/dictionaries/en")).default,
  el: async () => (await import("@/i18n/dictionaries/el")).default,
  ar: async () => (await import("@/i18n/dictionaries/ar")).default,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
