import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type LegalCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { title: string; body: string }[];
};

export function LegalDoc({
  locale,
  t,
  doc,
}: {
  locale: Locale;
  t: Dictionary;
  doc: LegalCopy;
}) {
  return (
    <main className="relative bg-surface" data-nav-tone="light">
      <SiteHeader locale={locale} t={t} tone="light" />
      <article className="mx-auto max-w-3xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
          {doc.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-navy/50">{doc.updated}</p>
        <div className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold text-navy">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-navy/70 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
