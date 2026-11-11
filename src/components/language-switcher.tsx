"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
}: {
  locale: Locale;
  label: string;
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|el|ar)(?=\/|$)/, "") || "";

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
