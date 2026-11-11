import { notFound } from "next/navigation";
import { CaseFeedbackLoop } from "@/components/case-feedback-loop";
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
  const c = t.caseFeedbackLoop;
  return buildPageMetadata({
    locale: raw,
    path: "/work/feedback-loop",
    title: `${c.product} · ${t.work.eyebrow}`,
    description: c.summary,
    images: [
      {
        url: "/work/feedback-loop/hero.png",
        width: 1200,
        height: 630,
        alt: c.title,
      },
    ],
  });
}

export default async function FeedbackLoopCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return <CaseFeedbackLoop locale={locale} t={t} />;
}
