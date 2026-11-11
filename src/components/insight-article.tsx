"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteMenu } from "@/components/site-menu";
import {
  InsightHeroArt,
  InsightStatStrip,
  InsightTrendGraph,
} from "@/components/insight-visuals";
import {
  formatInsightDate,
  type InsightArticle as InsightArticleType,
} from "@/content/insights";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function InsightArticleView({
  locale,
  t,
  article,
}: {
  locale: Locale;
  t: Dictionary;
  article: InsightArticleType;
}) {
  const i = t.insights;
  const face = t.faces[article.face];

  const bars = article.stats.slice(0, 3).map((s, idx) => ({
    label: ["Signal", "Scale", "Gap"][idx] ?? s.label.slice(0, 8),
    value: Math.min(Math.abs(s.value), 100) || 20 + idx * 15,
  }));

  return (
    <main className="bg-navy text-white">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 pt-6 sm:px-8">
        <BrandLogo href={`/${locale}`} tone="white" width={128} />
        <SiteMenu locale={locale} t={t} tone="dark" />
      </header>

      <section className="relative min-h-[70svh] overflow-hidden sm:min-h-[78svh]">
        <Image
          src={`/insights/${article.slug}/hero.jpg`}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <InsightHeroArt tone={article.heroTone} short={face.short} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/40" />

        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:min-h-[78svh] sm:px-8 sm:pb-16">
          <Link
            href={`/${locale}/insights`}
            className="w-fit text-[0.65rem] tracking-[0.16em] text-white/55 uppercase transition hover:text-white"
          >
            ← {i.backToInsights}
          </Link>
          <p className="mt-5 text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {i.eyebrow} · {face.short}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            {article.excerpt}
          </p>
          <p className="mt-4 text-[0.68rem] tracking-[0.14em] text-white/45 uppercase">
            {formatInsightDate(article.publishedAt, locale)} ·{" "}
            {article.readingMinutes} {i.minRead}
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#040a18]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <InsightStatStrip stats={article.stats} />
        </div>
      </section>

      <article className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] lg:gap-16">
        <div className="min-w-0">
          {article.sections.map((section) => (
            <section key={section.heading} className="mb-12 sm:mb-14">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {section.heading}
              </h2>
              {section.body.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="mt-4 text-base leading-relaxed text-white/70 sm:text-[1.05rem]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <aside className="border border-electric/40 bg-electric/10 p-5 sm:p-6">
            <p className="text-[0.62rem] tracking-[0.2em] text-electric-soft uppercase">
              {i.takeaway}
            </p>
            <p className="font-display mt-3 text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl">
              {article.takeaway}
            </p>
          </aside>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <InsightTrendGraph title={i.signalGraph} bars={bars} />

          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-[0.62rem] tracking-[0.18em] text-electric-soft uppercase">
              {i.relatedFace}
            </p>
            <p className="font-display mt-2 text-lg font-semibold">
              {face.title}
            </p>
            <p className="mt-2 text-sm text-white/60">{face.copy}</p>
            <Link
              href={`/${locale}/faces/${article.face}`}
              className="mt-4 inline-flex h-10 items-center bg-electric px-4 text-[0.62rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
            >
              {i.enterFace}
            </Link>
          </div>

          <div className="border border-white/10 p-5">
            <p className="text-[0.62rem] tracking-[0.18em] text-electric-soft uppercase">
              {i.sources}
            </p>
            <ul className="mt-3 space-y-3">
              {article.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 underline-offset-4 transition hover:text-electric-soft hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="flex h-12 items-center justify-center border border-white/25 text-[0.68rem] tracking-[0.16em] uppercase transition hover:border-electric hover:text-electric-soft"
          >
            {t.footer.startBrief}
          </Link>
        </aside>
      </article>
    </main>
  );
}
