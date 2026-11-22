import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
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
    path: "/people",
    title: t.people.eyebrow,
    description: t.people.body,
  });
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
    <main className="relative bg-surface" data-nav-tone="light">
      <SiteHeader locale={locale} t={t} tone="light" />

      <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
          {p.eyebrow}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-4 max-w-2xl text-navy/65">{p.body}</p>

        <article className="mt-16 grid gap-10 border-t border-navy/10 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <figure className="relative aspect-square w-full max-w-md overflow-hidden bg-navy/5">
            <Image
              src="/people/george-gad.jpg"
              alt={p.founderPhotoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </figure>

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
            <p className="mt-6 border-s-2 border-electric ps-5 font-display text-xl leading-snug text-navy sm:text-2xl">
              “{p.founderQuote}”
            </p>
            <p className="mt-4 text-[0.72rem] tracking-[0.18em] text-navy/50 uppercase">
              {p.founderMeta}
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-11 items-center bg-navy px-5 text-[0.7rem] tracking-[0.16em] text-white uppercase transition hover:bg-electric"
              >
                {t.footer.startBrief}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
