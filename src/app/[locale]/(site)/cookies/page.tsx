import { notFound } from "next/navigation";
import { LegalDoc } from "@/components/legal-doc";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/cookies",
    title: t.cookiePolicy.title,
    description: t.cookiePolicy.sections[0]?.body ?? t.meta.description,
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return <LegalDoc locale={locale} t={t} doc={t.cookiePolicy} />;
}
