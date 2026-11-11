import type { MetadataRoute } from "next";
import { getCaseSlugs } from "@/content/cases";
import { getInsightSlugs } from "@/content/insights";
import { locales } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kyvelon.com";

const paths = [
  "",
  "/contact",
  "/people",
  "/work",
  ...getCaseSlugs().map((slug) => `/work/${slug}`),
  "/insights",
  ...getInsightSlugs().map((slug) => `/insights/${slug}`),
  "/terms",
  "/faces/software",
  "/faces/websites",
  "/faces/automation",
  "/faces/services",
  "/faces/method",
  "/faces/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
