import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kyvelon.com";

export const SITE_NAME = "Kyvelon";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  el: "el_GR",
  ar: "ar",
};

export function localePath(locale: Locale, path = ""): string {
  const normalized =
    !path || path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl("en", path),
  };
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  return languages;
}

type PageMetaInput = {
  locale: Locale;
  /** Path after locale, e.g. "" | "/work" | "/insights/slug" */
  path?: string;
  /** Segment title — template appends "· Kyvelon" unless absoluteTitle */
  title: string;
  description: string;
  absoluteTitle?: boolean;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string | string[];
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  absoluteTitle = false,
  images,
  type = "website",
  publishedTime,
  keywords,
  robots,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, path);
  const displayTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  const ogImages = images?.length
    ? images
    : [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    robots,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
