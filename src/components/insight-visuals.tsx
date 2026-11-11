"use client";

import { useEffect, useRef, useState } from "react";
import type { InsightStat } from "@/content/insights";
import { cn } from "@/lib/utils";

export function InsightStatStrip({
  stats,
  className,
}: {
  stats: InsightStat[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <InsightStatCard key={stat.label} stat={stat} delay={i * 0.12} />
      ))}
    </div>
  );
}

function InsightStatCard({
  stat,
  delay,
}: {
  stat: InsightStat;
  delay: number;
}) {
  const value = useCountUp(stat.value, 1200, delay);

  return (
    <div className="insight-stat border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
      <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        {stat.prefix}
        {Number.isInteger(stat.value) ? value : value.toFixed(0)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm leading-snug text-white/75">{stat.label}</p>
      <p className="mt-2 text-[0.58rem] tracking-[0.14em] text-electric-soft uppercase">
        {stat.source}
      </p>
      <div className="insight-stat-bar mt-4 h-1 overflow-hidden bg-white/10">
        <span
          className="insight-stat-fill block h-full bg-electric"
          style={{
            animationDelay: `${delay + 0.2}s`,
            width: `${Math.min(Math.abs(stat.value), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function useCountUp(target: number, duration: number, delaySec: number) {
  const [n, setN] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) {
      setN(target);
      return;
    }
    let raf = 0;
    const startAt = performance.now() + delaySec * 1000;
    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startAt) / duration);
      const eased = 1 - (1 - t) ** 3;
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delaySec]);

  return n;
}

/** Living bar chart — cube-face energy for articles */
export function InsightTrendGraph({
  title,
  bars,
  className,
}: {
  title: string;
  bars: { label: string; value: number }[];
  className?: string;
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-electric/35 bg-[#06102b]/80 p-5 sm:p-6",
        className,
      )}
      role="img"
      aria-label={title}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <p className="relative z-[1] text-[0.62rem] tracking-[0.2em] text-electric-soft uppercase">
        {title}
      </p>
      <div className="relative z-[1] mt-6 flex h-40 items-end gap-3 sm:h-48 sm:gap-4">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end justify-center">
              <span
                className="insight-bar w-full max-w-[3.5rem] bg-gradient-to-t from-[#0038f8] to-[#7aa0ff]"
                style={{
                  height: `${(bar.value / max) * 100}%`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            </div>
            <span className="text-center text-[0.58rem] tracking-[0.12em] text-white/55 uppercase">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <span className="insight-pulse-dot absolute top-5 end-5 h-2 w-2 rounded-full bg-electric" />
    </div>
  );
}

export function InsightHeroArt({
  tone,
  short,
}: {
  tone: "navy" | "electric" | "deep" | "grid" | "pulse";
  short: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("insight-hero-art absolute inset-0 overflow-hidden", `tone-${tone}`)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,rgb(0_56_248_/_0.45),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_20%_80%,rgb(42_88_255_/_0.25),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 65% 45%, black 0%, transparent 75%)",
        }}
      />
      <div className="insight-hero-cube">
        <span />
        <span />
        <span />
      </div>
      <p className="absolute bottom-[18%] end-[10%] font-display text-6xl tracking-[0.2em] text-white/10 uppercase sm:text-8xl">
        {short}
      </p>
    </div>
  );
}
