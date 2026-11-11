import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { LocaleHtml } from "@/components/locale-html";
import { dirFor, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "el" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  // Shared defaults only — home sets absolute title; child routes use the root "%s · Kyvelon" template.
  return {
    description: t.meta.description,
    openGraph: {
      siteName: SITE_NAME,
      locale: locale === "el" ? "el_GR" : locale === "ar" ? "ar" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  const fontClass =
    locale === "ar"
      ? "font-[family-name:var(--font-arabic)]"
      : locale === "el"
        ? "font-[family-name:var(--font-greek)]"
        : undefined;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/cube-mark.svg`,
    foundingLocation: {
      "@type": "Place",
      name: "Athens, Greece",
    },
    sameAs: [] as string[],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    description: t.meta.description,
  };

  return (
    <div lang={locale} dir={dirFor(locale)} className={fontClass}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LocaleHtml locale={locale} />
      {children}
      <CookieBanner locale={locale} t={t.cookies} />
    </div>
  );
}
