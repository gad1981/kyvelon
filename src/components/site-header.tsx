"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BrandLogo } from "@/components/brand-logo";
import { SiteMenu } from "@/components/site-menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";
type Slot = ReactNode | ((tone: Tone) => ReactNode);

type SiteHeaderProps = {
  locale: Locale;
  t: Dictionary;
  /** Starting tone before the first paint/sample. */
  tone?: Tone;
  /** Defaults to `/${locale}`. */
  logoHref?: string;
  priority?: boolean;
  /** Extra controls beside the logo (e.g. back link). */
  startExtra?: Slot;
  /** Extra controls beside the tagline (e.g. sound toggle). */
  endExtra?: Slot;
  /** Cube HUD: ignore pointer events except interactive children. */
  hud?: boolean;
  className?: string;
};

function resolveSlot(slot: Slot | undefined, tone: Tone) {
  return typeof slot === "function" ? slot(tone) : slot;
}

function sampleTone(fallback: Tone): Tone {
  if (typeof document === "undefined") return fallback;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const y = header
    ? Math.min(
        Math.max(header.getBoundingClientRect().bottom - 10, 12),
        window.innerHeight - 2,
      )
    : 40;
  const xs = [0.18, 0.5, 0.82].map((p) =>
    Math.min(Math.max(Math.round(window.innerWidth * p), 0), window.innerWidth - 1),
  );

  for (const x of xs) {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (!(el instanceof Element)) continue;
      if (el.closest("[data-site-header]")) continue;
      if (el.closest(".cookie-banner")) continue;
      const marked = el.closest("[data-nav-tone]");
      if (!marked) continue;
      const value = marked.getAttribute("data-nav-tone");
      if (value === "light" || value === "dark") return value;
    }
  }

  return fallback;
}

/**
 * Canonical top bar: logo (128) · centered menu · brand message on the right.
 * Tone flips to stay readable over light/dark sections while fixed.
 */
export function SiteHeader({
  locale,
  t,
  tone: initialTone = "dark",
  logoHref,
  priority = false,
  startExtra,
  endExtra,
  hud = false,
  className,
}: SiteHeaderProps) {
  const [tone, setTone] = useState<Tone>(initialTone);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTone(initialTone);
  }, [initialTone]);

  useEffect(() => {
    let frame = 0;

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        setTone(sampleTone(initialTone));
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [initialTone]);

  return (
    <header
      data-site-header
      data-hud={hud ? true : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 pt-6 pb-4 transition-[background-color,border-color,backdrop-filter] duration-300 sm:px-8 data-[menu-open]:z-[110]",
        scrolled &&
          (tone === "dark"
            ? "border-b border-white/10 bg-navy/80 backdrop-blur-md"
            : "border-b border-navy/10 bg-surface/85 backdrop-blur-md"),
        hud && "pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-[1] flex min-w-0 items-center gap-3 sm:gap-4",
          hud && "pointer-events-auto",
        )}
      >
        <BrandLogo
          href={logoHref ?? `/${locale}`}
          tone={tone === "dark" ? "white" : "color"}
          width={128}
          priority={priority}
        />
        {resolveSlot(startExtra, tone)}
      </div>

      <SiteMenu
        locale={locale}
        t={t}
        tone={tone}
        trailing={
          <>
            <p className="pointer-events-none hidden max-w-[11rem] text-end sm:block sm:max-w-[14rem]">
              <span
                className={cn(
                  "font-display text-base leading-tight font-semibold tracking-[-0.03em] transition-colors duration-300 sm:text-lg",
                  tone === "dark" ? "text-white" : "text-navy",
                )}
              >
                {t.brand.taglineLead}
                <span className="block text-electric">
                  {t.brand.taglineAccent}
                </span>
              </span>
            </p>
            {resolveSlot(endExtra, tone)}
          </>
        }
      />
    </header>
  );
}
