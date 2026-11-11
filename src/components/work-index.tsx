"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteMenu } from "@/components/site-menu";
import { CASES } from "@/content/cases";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function WorkIndex({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const w = t.work;

  return (
    <main className="bg-navy text-white">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 pt-6 sm:px-8">
        <BrandLogo href={`/${locale}`} tone="white" width={128} />
        <SiteMenu locale={locale} t={t} tone="dark" />
      </header>

      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 55% 50% at 70% 20%, rgb(0 56 248 / 0.45) 0%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 15% 80%, rgb(14 28 72 / 0.8) 0%, transparent 65%)
            `,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgb(122 160 255 / 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgb(122 160 255 / 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {w.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
            {w.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            {w.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <ul className="grid gap-8">
          {CASES.map((study, idx) => {
            const c = t[study.dictKey];
            return (
              <li key={study.slug}>
                <article className="group grid overflow-hidden border border-white/10 transition hover:border-electric/50 lg:grid-cols-[1.15fr_0.85fr]">
                  <Link
                    href={`/${locale}/work/${study.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-[#06102b] lg:aspect-auto lg:min-h-[320px]"
                  >
                    <Image
                      src={study.hero}
                      alt=""
                      fill
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-95"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy/40" />
                  </Link>
                  <div className="flex flex-col justify-center bg-[#040a18] p-6 sm:p-8 lg:p-10">
                    <p className="text-[0.62rem] tracking-[0.18em] text-electric-soft uppercase">
                      {c.eyebrow} · {c.product}
                    </p>
                    <h2 className="font-display mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                      <Link
                        href={`/${locale}/work/${study.slug}`}
                        className="transition group-hover:text-electric-soft"
                      >
                        {c.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                      {c.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.faces.map((faceId) => (
                        <span
                          key={faceId}
                          className="border border-white/15 px-2.5 py-1 text-[0.55rem] tracking-[0.14em] text-white/45 uppercase"
                        >
                          {t.faces[faceId].short}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/work/${study.slug}`}
                        className="inline-flex h-11 items-center bg-electric px-5 text-[0.65rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
                      >
                        {w.readCase}
                      </Link>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center border border-white/25 px-5 text-[0.65rem] tracking-[0.16em] text-white/70 uppercase transition hover:border-white hover:text-white"
                      >
                        {w.visitLive}
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
