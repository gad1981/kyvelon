import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = await getDictionary(raw);
  return {
    title: `${t.terms.title} · Kyvelon`,
    description: t.terms.sections[0]?.body,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return (
    <main className="bg-surface">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 pt-8 sm:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-lg tracking-[-0.02em] text-navy"
        >
          Kyvelon
        </Link>
        <LanguageSwitcher locale={locale} label={t.lang.label} />
      </div>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
          {t.terms.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
          {t.terms.title}
        </h1>
        <p className="mt-3 text-sm text-navy/50">{t.terms.updated}</p>
        <div className="mt-12 space-y-10">
          {t.terms.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold text-navy">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
