import { notFound } from "next/navigation";
import { LocaleHtml } from "@/components/locale-html";
import { dirFor, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

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
  return {
    title: t.meta.title,
    description: t.meta.description,
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

  const fontClass =
    locale === "ar"
      ? "font-[family-name:var(--font-arabic)]"
      : locale === "el"
        ? "font-[family-name:var(--font-greek)]"
        : undefined;

  return (
    <div lang={locale} dir={dirFor(locale)} className={fontClass}>
      <LocaleHtml locale={locale} />
      {children}
    </div>
  );
}
