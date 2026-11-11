"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteMenu } from "@/components/site-menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function CaseFeedbackLoop({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const w = t.work;
  const c = t.caseFeedbackLoop;

  return (
    <main className="bg-surface text-navy">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 pt-6 sm:px-8">
        <div className="flex items-center gap-4">
          <BrandLogo href={`/${locale}`} tone="white" width={128} />
          <Link
            href={`/${locale}/work`}
            className="hidden text-[0.62rem] tracking-[0.16em] text-white/50 uppercase transition hover:text-white sm:inline"
          >
            {w.backToWork}
          </Link>
        </div>
        <SiteMenu locale={locale} t={t} tone="dark" />
      </header>

      {/* Full-bleed hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
        <Image
          src="/work/feedback-loop/hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/35" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.35) 49%, transparent 52%),
              linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.06) 49%, transparent 52%)
            `,
            backgroundSize: "72px 42px",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {c.eyebrow} · {c.product}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            {c.summary}
          </p>
          <p className="mt-3 max-w-xl text-sm text-white/50">{c.heroSupport}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center bg-electric px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
            >
              {w.visitLive}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center border border-white/30 px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:border-white hover:bg-white/10"
            >
              {t.footer.startBrief}
            </Link>
          </div>
          <Waveform className="mt-12 w-full max-w-3xl opacity-90" />
        </div>
      </section>

      {/* Challenge split */}
      <section className="border-b border-navy/10 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
              {c.challengeEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {c.challengeTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/65 sm:text-lg">
              {c.challengeBody}
            </p>
          </div>
          <div className="grid gap-4 self-center">
            <div className="border border-navy/15 bg-white/60 px-5 py-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-navy/40 uppercase">
                Before
              </p>
              <p className="font-display mt-2 text-lg text-navy/55 line-through decoration-navy/30">
                {c.challengeBefore}
              </p>
            </div>
            <div className="border border-electric/40 bg-electric/5 px-5 py-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-electric uppercase">
                After
              </p>
              <p className="font-display mt-2 text-lg text-navy">
                {c.challengeAfter}
              </p>
            </div>
            <PrivacyOrbit />
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="border-b border-navy/10 bg-mist/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {c.structureEyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.structureTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-navy/65">{c.structureBody}</p>
          <StructureViz className="mt-12" />
        </div>
      </section>

      {/* Product system visuals */}
      <section className="border-b border-navy/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {c.systemEyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.systemTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-navy/65">{c.systemBody}</p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <TimelineMock
              title={c.systemPanels[0]?.title ?? ""}
              body={c.systemPanels[0]?.body ?? ""}
            />
            <VersionsMock
              title={c.systemPanels[1]?.title ?? ""}
              body={c.systemPanels[1]?.body ?? ""}
            />
            <PoolsMock
              title={c.systemPanels[2]?.title ?? ""}
              body={c.systemPanels[2]?.body ?? ""}
            />
            <AiMock
              title={c.systemPanels[3]?.title ?? ""}
              body={c.systemPanels[3]?.body ?? ""}
            />
          </div>
        </div>
      </section>

      {/* Loop steps */}
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.45) 49%, transparent 52%),
              linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.08) 49%, transparent 52%)
            `,
            backgroundSize: "72px 42px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {c.loopEyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.loopTitle}
          </h2>
          <LoopFlow steps={c.loopSteps} className="mt-14" />
        </div>
      </section>

      {/* Faces */}
      <section className="border-b border-navy/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {c.facesEyebrow}
          </p>
          <div className="mt-10 grid gap-px bg-navy/10 sm:grid-cols-2">
            {c.faces.map((face, i) => (
              <article
                key={face.short}
                className="bg-surface px-6 py-10 sm:px-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.18em] text-electric uppercase">
                      {face.short}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold">
                      {face.face}
                    </h3>
                  </div>
                  <FaceGlyph index={i} />
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/70">
                  {face.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Assemble + outcomes */}
      <section className="border-b border-navy/10 bg-mist/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {c.assembleEyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.assembleTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-navy/65">{c.assembleBody}</p>
          <AssembleViz className="mt-12" />
          <ul className="mt-14 grid gap-8 border-t border-navy/10 pt-12 sm:grid-cols-3">
            {c.outcomes.map((item) => (
              <li key={item.label}>
                <p className="text-[0.65rem] tracking-[0.18em] text-electric uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stack */}
      <section className="border-b border-navy/10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
            {c.stackEyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {c.stackTitle}
          </h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {c.stackItems.map((item) => (
              <li
                key={item}
                className="border border-navy/15 bg-white/70 px-4 py-3 text-sm text-navy/75"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.closeTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/65">{c.closeBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center bg-electric px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:bg-navy"
            >
              {t.footer.startBrief}
            </Link>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center border border-navy/20 px-6 text-[0.72rem] tracking-[0.16em] text-navy uppercase transition hover:border-electric hover:text-electric"
            >
              {c.urlLabel}
            </a>
            <Link
              href={`/${locale}/work`}
              className="inline-flex h-12 items-center px-4 text-[0.72rem] tracking-[0.16em] text-navy/50 uppercase transition hover:text-navy"
            >
              {w.backToWork}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Waveform({ className = "" }: { className?: string }) {
  const bars = [
    18, 34, 22, 48, 30, 56, 26, 62, 38, 50, 28, 44, 20, 58, 32, 46, 24, 54, 36,
    42, 22, 60, 28, 48, 18, 40, 30, 52, 24, 46,
  ];
  return (
    <div className={`case-wave flex h-14 items-end gap-[3px] ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="case-wave-bar w-[3px] bg-electric-soft/80 sm:w-1"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

function PrivacyOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[280px]"
      aria-hidden="true"
    >
      <div className="case-ring absolute inset-[12%] rounded-full border border-electric/25" />
      <div className="case-ring absolute inset-[24%] rounded-full border border-electric/35 [animation-delay:0.4s]" />
      <div className="case-ring absolute inset-[36%] rounded-full border border-electric/50 [animation-delay:0.8s]" />
      <div className="absolute inset-[42%] flex items-center justify-center rounded-full bg-electric text-[0.65rem] tracking-[0.16em] text-white uppercase">
        Private
      </div>
    </div>
  );
}

function StructureViz({ className = "" }: { className?: string }) {
  const nodes = ["Goals", "Users", "Data", "Constraints"];
  return (
    <div
      className={`grid gap-3 sm:grid-cols-4 ${className}`}
      aria-hidden="true"
    >
      {nodes.map((node, i) => (
        <div
          key={node}
          className="case-rise border border-navy/15 bg-white px-4 py-5"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <p className="text-[0.6rem] tracking-[0.18em] text-electric uppercase">
            0{i + 1}
          </p>
          <p className="font-display mt-2 text-lg">{node}</p>
          <div className="mt-4 h-1 w-full overflow-hidden bg-navy/10">
            <div
              className="case-fill h-full bg-electric"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineMock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy/65">{body}</p>
      <div className="relative mt-6 overflow-hidden border border-navy/15 bg-navy p-5 text-white">
        <div className="flex items-center justify-between text-[0.65rem] tracking-[0.14em] text-white/45 uppercase">
          <span>Demo · v3</span>
          <span>2:48</span>
        </div>
        <div className="relative mt-6 h-16">
          <Waveform className="h-full opacity-70" />
          <div className="case-playhead absolute inset-y-0 w-px bg-electric-soft" />
          {[18, 42, 68].map((left, i) => (
            <div
              key={left}
              className="case-pin absolute top-1"
              style={{ left: `${left}%`, animationDelay: `${0.4 + i * 0.25}s` }}
            >
              <span className="block h-3 w-3 rounded-full bg-electric ring-4 ring-electric/30" />
              <span className="mt-2 block max-w-[110px] border border-white/15 bg-white/10 px-2 py-1 text-[0.6rem] leading-snug text-white/80 backdrop-blur-sm">
                {i === 0
                  ? "Snare too dry"
                  : i === 1
                    ? "Love this chord"
                    : "Build into drop"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VersionsMock({ title, body }: { title: string; body: string }) {
  const versions = [
    { name: "Final Mix", when: "Today" },
    { name: "Added drums", when: "3 days ago" },
    { name: "Rough demo", when: "1 week ago" },
  ];
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy/65">{body}</p>
      <ol className="mt-6 space-y-0 border border-navy/15 bg-white">
        {versions.map((v, i) => (
          <li
            key={v.name}
            className="case-rise flex items-center justify-between border-b border-navy/10 px-4 py-4 last:border-b-0"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-electric/10 text-[0.65rem] text-electric">
                v{3 - i}
              </span>
              <span className="font-display text-sm">{v.name}</span>
            </div>
            <span className="text-[0.65rem] tracking-[0.12em] text-navy/40 uppercase">
              {v.when}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PoolsMock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy/65">{body}</p>
      <div className="mt-6 border border-navy/15 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg">Indie Producers</p>
          <p className="text-[0.65rem] tracking-[0.14em] text-electric uppercase">
            8 / 12
          </p>
        </div>
        <div className="mt-5 flex -space-x-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="case-rise inline-flex h-9 w-9 items-center justify-center border-2 border-white bg-electric/20 text-[0.6rem] text-navy"
              style={{
                animationDelay: `${i * 0.08}s`,
                backgroundColor: `color-mix(in srgb, #0038f8 ${20 + i * 8}%, white)`,
              }}
            >
              {String.fromCharCode(65 + i)}
            </span>
          ))}
        </div>
        <div className="mt-5 h-2 overflow-hidden bg-navy/10">
          <div className="case-fill h-full w-2/3 bg-electric" />
        </div>
      </div>
    </div>
  );
}

function AiMock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy/65">{body}</p>
      <div className="mt-6 border border-electric/30 bg-navy p-5 text-white">
        <p className="text-[0.65rem] tracking-[0.16em] text-electric-soft uppercase">
          AI producer
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">
          Strong foundation with clean drums. Focus on tightening the mid-range
          and adding depth.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-white/55">
          <li className="border-s border-electric ps-3">
            Low-mids muddy · cut ~300Hz on bass
          </li>
          <li className="border-s border-electric ps-3">
            Energy into the drop · add a breakdown
          </li>
          <li className="border-s border-electric ps-3">
            Hook is catchy · subtle vocal reverb tail
          </li>
        </ul>
      </div>
    </div>
  );
}

function LoopFlow({
  steps,
  className = "",
}: {
  steps: { title: string; body: string }[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="pointer-events-none absolute inset-x-8 top-10 hidden h-8 w-[calc(100%-4rem)] sm:block"
        viewBox="0 0 900 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M20 20 H880"
          fill="none"
          stroke="rgb(42 88 255 / 0.55)"
          strokeWidth="2"
          strokeDasharray="8 10"
          className="case-dash"
        />
        <circle
          r="5"
          fill="#2a58ff"
          className="safari-path-packet"
          style={{ offsetPath: "path('M20 20 H880')" }}
        />
      </svg>
      <ol className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <p className="text-[0.7rem] tracking-[0.2em] text-white/40 uppercase">
              0{i + 1}
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FaceGlyph({ index }: { index: number }) {
  const paths = [
    "M8 28h40v8H8zm4-12h32v8H12zm4-12h24v8H16z",
    "M12 40h40v4H12zm8-12h24v20H20zm4-12h16v8H24z",
    "M10 20h12v12H10zm24-8h12v12H34zm12 20h12v12H46zM28 32l8 8-8 8-8-8z",
    "M28 8l20 12v24L28 56 8 44V20z",
  ];
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      className="shrink-0 text-electric"
      aria-hidden="true"
    >
      <path d={paths[index] ?? paths[0]} fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function AssembleViz({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[2/1] w-full max-w-3xl ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 320" className="h-full w-full">
        <defs>
          <linearGradient id="case-cube" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a58ff" />
            <stop offset="100%" stopColor="#0038f8" />
          </linearGradient>
        </defs>
        {[
          { x: 80, y: 60, label: "SOFT" },
          { x: 480, y: 60, label: "WEB" },
          { x: 80, y: 220, label: "AUTO" },
          { x: 480, y: 220, label: "SERV" },
        ].map((n, i) => (
          <g key={n.label} className="case-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect
              x={n.x}
              y={n.y}
              width="80"
              height="36"
              fill="#06102b"
              stroke="#2a58ff"
              strokeWidth="1.5"
            />
            <text
              x={n.x + 40}
              y={n.y + 23}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              letterSpacing="0.14em"
            >
              {n.label}
            </text>
            <line
              x1={n.x + 40}
              y1={n.y + (n.y < 160 ? 36 : 0)}
              x2="320"
              y2="160"
              stroke="rgb(0 56 248 / 0.45)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              className="case-dash"
            />
          </g>
        ))}
        <g className="case-pulse" style={{ transformOrigin: "320px 160px" }}>
          <path
            d="M280 130 L320 110 L360 130 L360 170 L320 190 L280 170 Z"
            fill="url(#case-cube)"
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
        <circle
          r="4"
          fill="#7aa0ff"
          className="safari-path-packet"
          style={{
            offsetPath: "path('M120 78 C200 100, 260 140, 300 150')",
            animationDuration: "4s",
          }}
        />
        <circle
          r="4"
          fill="white"
          className="safari-path-packet"
          style={{
            offsetPath: "path('M520 78 C440 100, 380 140, 340 150')",
            animationDuration: "4s",
            animationDelay: "1s",
          }}
        />
      </svg>
    </div>
  );
}
