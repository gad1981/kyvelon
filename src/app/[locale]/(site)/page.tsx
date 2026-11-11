import { notFound } from "next/navigation";
import { CubeWorld } from "@/components/cube-world";
import { StorySections } from "@/components/story-sections";
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
    path: "",
    title: t.meta.title,
    description: t.meta.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return (
    <main>
      <CubeWorld locale={locale} t={t} />
      <StorySections locale={locale} t={t} />
    </main>
  );
}
