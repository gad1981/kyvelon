"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  className,
  tone = "light",
}: {
  locale: Locale;
  label: string;
  className?: string;
  tone?: "light" | "dark";
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
          className={cn(
            "px-2 py-1 text-[0.65rem] tracking-[0.12em] uppercase transition",
            tone === "dark"
              ? code === locale
                ? "bg-electric text-white"
                : "border border-white/20 text-white/60 hover:border-white hover:text-white"
              : code === locale
                ? "bg-navy text-white"
                : "bg-white/50 text-navy/55 hover:bg-white hover:text-navy",
          )}
          aria-current={code === locale ? "page" : undefined}
        >
          {localeNames[code]}
        </Link>
      ))}
    </div>
  );
}
