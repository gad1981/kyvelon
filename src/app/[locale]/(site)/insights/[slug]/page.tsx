import { notFound } from "next/navigation";
import { InsightArticleView } from "@/components/insight-article";
import {
  getInsight,
  getInsightSlugs,
} from "@/content/insights";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getInsightSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const article = getInsight(slug);
  if (!article) return {};
  return buildPageMetadata({
    locale: raw,
    path: `/insights/${article.slug}`,
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    type: "article",
    publishedTime: article.publishedAt,
    images: [
      {
        url: `/insights/${article.slug}/hero.jpg`,
        width: 1200,
        height: 630,
        alt: article.title,
      },
    ],
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const article = getInsight(slug);
  if (!article) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  return <InsightArticleView locale={locale} t={t} article={article} />;
}
