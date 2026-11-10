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
    title: `${t.people.title} · Kyvelon`,
    description: t.people.body,
  };
}

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  const p = t.people;

  return (
    <main className="bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-8 sm:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-lg tracking-[-0.02em] text-navy"
        >
          Kyvelon
        </Link>
        <LanguageSwitcher locale={locale} label={t.lang.label} />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
          {p.eyebrow}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-4 max-w-2xl text-navy/65">{p.body}</p>

        <article className="mt-16 grid gap-10 border-t border-navy/10 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] text-electric uppercase">
              {p.founderRole}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-navy sm:text-4xl">
              {p.founderName}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg">
              {p.founderBio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://georgegad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center bg-navy px-5 text-[0.7rem] tracking-[0.16em] text-white uppercase transition hover:bg-electric"
              >
                {p.founderCta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-11 items-center border border-navy/20 px-5 text-[0.7rem] tracking-[0.16em] text-navy uppercase transition hover:border-electric hover:text-electric"
              >
                {t.footer.startBrief}
              </Link>
            </div>
          </div>
          <aside className="border-s-2 border-electric ps-6 sm:ps-8">
            <p className="font-display text-xl leading-snug text-navy sm:text-2xl">
              “{p.founderQuote}”
            </p>
            <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-navy/50 uppercase">
              {p.founderMeta}
            </p>
          </aside>
        </article>
      </div>
    </main>
  );
}
