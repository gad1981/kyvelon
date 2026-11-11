import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function StorySections({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const s = t.story;
  const w = t.work;
  const c = t.caseFeedbackLoop;

  return (
    <div className="relative bg-surface">
      <section
        id="origin"
        className="scroll-mt-8 border-b border-navy/10 py-20 sm:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal variant="up">
            <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
              {s.originEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
              {s.originTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/65 sm:text-lg">
              {s.originBody}
            </p>
          </Reveal>
          <ul className="space-y-8">
            {s.originPoints.map((point, index) => (
              <Reveal
                key={point.title}
                as="li"
                variant="left"
                delay={120 + index * 140}
                className="relative ps-5"
              >
                <span
                  aria-hidden="true"
                  className="story-origin-rule absolute inset-y-0 start-0 w-0.5 bg-electric"
                />
                <p className="text-[0.65rem] tracking-[0.2em] text-navy/40 uppercase">
                  0{index + 1}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-navy">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="connections"
        className="scroll-mt-8 border-b border-navy/10 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal variant="up" className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
              {s.connectEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
              {s.connectTitle}
            </h2>
            <p className="mt-4 max-w-xl text-navy/65">{s.connectBody}</p>
          </Reveal>

          <div className="mt-14 grid gap-px bg-navy/10 sm:grid-cols-2">
            {s.threads.map((thread, index) => (
              <Reveal
                key={`${thread.from}-${thread.to}`}
                as="article"
                variant={index % 2 === 0 ? "left" : "right"}
                delay={80 + index * 110}
                className="bg-surface px-6 py-8 sm:px-8"
              >
                <p className="font-display text-sm tracking-[0.08em] text-electric">
                  {thread.from}
                  <span className="mx-2 inline-block text-navy/30 transition-transform duration-500">
                    →
                  </span>
                  {thread.to}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
                  {thread.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="method"
        className="relative scroll-mt-8 overflow-hidden bg-navy py-20 text-white sm:py-28"
      >
        <div
          aria-hidden="true"
          className="story-method-grid pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.45) 49%, transparent 52%),
              linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.08) 49%, transparent 52%)
            `,
            backgroundSize: "72px 42px, 72px 42px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal variant="fade" className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
              {s.methodEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {s.methodTitle}
            </h2>
            <p className="mt-4 max-w-xl text-white/65">{s.methodBody}</p>
          </Reveal>
          <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {s.steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                variant="scale"
                delay={100 + index * 160}
              >
                <div
                  className={
                    index === 0
                      ? "story-hex-live mb-5 h-14 w-14"
                      : index === 1
                        ? "story-hex-live story-hex-live-delay mb-5 h-14 w-14"
                        : "story-hex-live story-hex-live-delay-2 mb-5 h-14 w-14"
                  }
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background:
                      index === 1
                        ? "linear-gradient(145deg,#2a58ff,#0038f8)"
                        : "linear-gradient(145deg,#1a2748,#0a1638)",
                  }}
                  aria-hidden="true"
                />
                <p className="text-[0.7rem] tracking-[0.2em] text-white/40 uppercase">
                  0{index + 1} · {step.greek}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="work"
        className="scroll-mt-8 border-b border-navy/10 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal variant="up" className="max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
              {w.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
              {w.title}
            </h2>
            <p className="mt-4 max-w-xl text-navy/65">{w.body}</p>
          </Reveal>

          <Reveal
            as="article"
            variant="up"
            delay={160}
            className="mt-12 grid gap-8 border-t border-navy/10 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div>
              <p className="text-[0.65rem] tracking-[0.18em] text-electric uppercase">
                {c.product}
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-navy sm:text-3xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/70 sm:text-base">
                {c.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href={`/${locale}/work/feedback-loop`}
                className="inline-flex h-11 items-center bg-navy px-5 text-[0.7rem] tracking-[0.16em] text-white uppercase transition hover:bg-electric"
              >
                {w.readCase}
              </Link>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center border border-navy/20 px-5 text-[0.7rem] tracking-[0.16em] text-navy uppercase transition hover:border-electric hover:text-electric"
              >
                {w.visitLive}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-navy/10 py-20 sm:py-24">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl px-5 text-center sm:px-8"
        >
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {s.closeEyebrow}
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
            {s.closeTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/65">{s.closeBody}</p>
          <a
            href={`/${locale}#cube`}
            className="story-cta-live mt-8 inline-flex h-12 items-center px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:brightness-110"
          >
            {s.closeCta}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
