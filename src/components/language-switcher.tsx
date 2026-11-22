"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const SHORT: Record<Locale, string> = {
  en: "EN",
  el: "ΕΛ",
  ar: "ع",
};

export function LanguageSwitcher({
  locale,
  label,
  className,
  tone = "light",
  compact = false,
  variant = "pills",
}: {
  locale: Locale;
  label: string;
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  variant?: "pills" | "dropdown";
}) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|el|ar)(?=\/|$)/, "") || "";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  if (variant === "dropdown") {
    return (
      <div ref={rootRef} className={cn("relative", className)}>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.14em] uppercase transition",
            tone === "dark"
              ? "text-white/55 hover:text-white"
              : "text-navy/55 hover:text-navy",
            open && (tone === "dark" ? "text-white" : "text-navy"),
          )}
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-label={label}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{SHORT[locale]}</span>
          <svg
            viewBox="0 0 10 6"
            className={cn(
              "h-1.5 w-2.5 opacity-60 transition",
              open && "rotate-180",
            )}
            aria-hidden="true"
          >
            <path
              d="M1 1l4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
          </svg>
        </button>

        {open ? (
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className={cn(
              "absolute top-[calc(100%+0.55rem)] end-0 z-[100] min-w-[9.5rem] border py-1 shadow-lg",
              tone === "dark"
                ? "border-white/12 bg-[#040a18] text-white"
                : "border-navy/10 bg-white text-navy",
            )}
          >
            {locales.map((code) => (
              <li key={code} role="option" aria-selected={code === locale}>
                <Link
                  href={`/${code}${rest}`}
                  hrefLang={code}
                  className={cn(
                    "flex items-center justify-between gap-4 px-3 py-2 text-[0.68rem] tracking-[0.06em] transition",
                    tone === "dark"
                      ? code === locale
                        ? "bg-white/8 text-electric-soft"
                        : "text-white/70 hover:bg-white/6 hover:text-white"
                      : code === locale
                        ? "bg-navy/[0.06] text-electric"
                        : "text-navy/70 hover:bg-navy/[0.04] hover:text-navy",
                  )}
                  aria-current={code === locale ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span>{localeNames[code]}</span>
                  <span className="text-[0.58rem] tracking-[0.14em] uppercase opacity-50">
                    {SHORT[code]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="navigation"
      aria-label={label}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${rest}`}
          hrefLang={code}
          title={localeNames[code]}
          className={cn(
            "transition",
            compact
              ? "min-w-10 px-2.5 py-2 text-center text-[0.7rem] tracking-[0.14em] uppercase"
              : "px-2 py-1 text-[0.65rem] tracking-[0.12em] uppercase",
            tone === "dark"
              ? code === locale
                ? "bg-electric text-white"
                : "border border-white/20 text-white/60 hover:border-white hover:text-white"
              : code === locale
                ? "bg-navy text-white"
                : "border border-navy/15 bg-white/50 text-navy/55 hover:border-navy/35 hover:text-navy",
          )}
          aria-current={code === locale ? "page" : undefined}
        >
          {compact ? SHORT[code] : localeNames[code]}
        </Link>
      ))}
    </div>
  );
}
