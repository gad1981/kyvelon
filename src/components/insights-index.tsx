"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteMenu } from "@/components/site-menu";
import { InsightHeroArt } from "@/components/insight-visuals";
import {
  formatInsightDate,
  INSIGHTS,
} from "@/content/insights";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function InsightsIndex({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const i = t.insights;

  return (
    <main className="bg-navy text-white">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 pt-6 sm:px-8">
        <BrandLogo href={`/${locale}`} tone="white" width={128} />
        <SiteMenu locale={locale} t={t} tone="dark" />
      </header>

      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <InsightHeroArt tone="electric" short="INSIGHTS" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {i.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
            {i.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            {i.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <ul className="grid gap-8 lg:grid-cols-2">
          {INSIGHTS.map((article, idx) => (
            <li key={article.slug}>
              <Link
                href={`/${locale}/insights/${article.slug}`}
                className="group grid gap-0 overflow-hidden border border-white/10 transition hover:border-electric/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#06102b]">
                  <Image
                    src={`/insights/${article.slug}/hero.jpg`}
                    alt=""
                    fill
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                  <span className="absolute start-4 top-4 text-[0.58rem] tracking-[0.18em] text-electric-soft uppercase">
                    {t.faces[article.face].short}
                  </span>
                </div>
                <div className="bg-[#040a18] p-5 sm:p-6">
                  <p className="text-[0.62rem] tracking-[0.16em] text-white/40 uppercase">
                    {formatInsightDate(article.publishedAt, locale)} ·{" "}
                    {article.readingMinutes} {i.minRead}
                  </p>
                  <h2 className="font-display mt-3 text-xl font-semibold tracking-[-0.02em] text-white transition group-hover:text-electric-soft sm:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex text-[0.62rem] tracking-[0.16em] text-electric uppercase">
                    {i.readArticle} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
