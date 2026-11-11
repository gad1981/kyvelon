"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { SERVICE_FACE_IDS } from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

type SiteMenuProps = {
  locale: Locale;
  t: Dictionary;
  tone?: "light" | "dark";
  className?: string;
};

const SHORT: Record<Locale, string> = { en: "EN", el: "ΕΛ", ar: "ع" };

export function SiteMenu({
  locale,
  t,
  tone = "dark",
  className,
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname() || `/${locale}`;
  const home = `/${locale}`;
  const f = t.footer;
  const m = t.menu;
  const rest = pathname.replace(/^\/(en|el|ar)(?=\/|$)/, "") || "";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkCls =
    tone === "dark"
      ? "text-white/75 transition hover:text-white"
      : "text-navy/70 transition hover:text-navy";

  const deskLink =
    tone === "dark"
      ? "text-[0.62rem] tracking-[0.14em] text-white/55 uppercase transition hover:text-white"
      : "text-[0.62rem] tracking-[0.14em] text-navy/55 uppercase transition hover:text-navy";

  return (
    <div className={cn("relative flex items-center gap-4", className)} data-hud>
      {/* Desktop — no burger: links + compact language */}
      <nav
        className="hidden items-center gap-4 md:flex"
        aria-label={m.title}
      >
        <Link href={`${home}#cube`} className={deskLink}>
          {f.theCube}
        </Link>
        <Link href={`/${locale}/work`} className={deskLink}>
          {f.work}
        </Link>
        <Link href={`/${locale}/insights`} className={deskLink}>
          {f.insights}
        </Link>
        <Link href={`/${locale}/contact`} className={deskLink}>
          {f.startBrief}
        </Link>
        <span
          className={cn(
            "mx-1 h-3 w-px",
            tone === "dark" ? "bg-white/20" : "bg-navy/15",
          )}
          aria-hidden="true"
        />
        <div
          className="flex items-center gap-1"
          role="navigation"
          aria-label={t.lang.label}
        >
          {locales.map((code) => (
            <Link
              key={code}
              href={`/${code}${rest}`}
              hrefLang={code}
              title={localeNames[code]}
              className={cn(
                "px-1.5 py-0.5 text-[0.58rem] tracking-[0.12em] uppercase transition",
                tone === "dark"
                  ? code === locale
                    ? "text-electric-soft"
                    : "text-white/35 hover:text-white"
                  : code === locale
                    ? "text-electric"
                    : "text-navy/35 hover:text-navy",
              )}
              aria-current={code === locale ? "page" : undefined}
            >
              {SHORT[code]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile burger only */}
      <button
        type="button"
        className={cn(
          "relative z-[96] flex h-10 w-10 flex-col items-center justify-center gap-1.5 border transition md:hidden",
          tone === "dark"
            ? "border-white/25 bg-black/35 text-white backdrop-blur-md hover:border-electric"
            : "border-navy/20 bg-white/70 text-navy backdrop-blur-md hover:border-electric",
          open && "border-electric",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? m.close : m.open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            "block h-px w-4 origin-center bg-current transition",
            open && "translate-y-[3.5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-px w-4 bg-current transition",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-px w-4 origin-center bg-current transition",
            open && "-translate-y-[3.5px] -rotate-45",
          )}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[95] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={m.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            aria-label={m.close}
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            className={cn(
              "absolute inset-y-0 end-0 flex w-[min(100%,22rem)] flex-col border-s shadow-2xl",
              tone === "dark"
                ? "border-white/10 bg-[#040a18] text-white"
                : "border-navy/10 bg-surface text-navy",
            )}
          >
            <div className="flex items-center justify-between border-b border-current/10 px-5 py-4">
              <p className="text-[0.62rem] tracking-[0.22em] text-electric uppercase">
                {m.title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[0.62rem] tracking-[0.16em] uppercase opacity-50 transition hover:opacity-100"
              >
                {m.close}
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label={m.title}>
              <p className="text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                {f.company}
              </p>
              <ul className="mt-3 space-y-3">
                <li>
                  <Link
                    href={`${home}#cube`}
                    className={cn("font-display text-xl", linkCls)}
                  >
                    {f.theCube}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/work`}
                    className={cn("font-display text-xl", linkCls)}
                  >
                    {f.work}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/insights`}
                    className={cn("font-display text-xl", linkCls)}
                  >
                    {f.insights}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/people`}
                    className={cn("font-display text-xl", linkCls)}
                  >
                    {f.people}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className={cn("font-display text-xl", linkCls)}
                  >
                    {f.startBrief}
                  </Link>
                </li>
              </ul>

              <p className="mt-10 text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                {f.faces}
              </p>
              <ul className="mt-3 space-y-2.5">
                {SERVICE_FACE_IDS.map((id) => (
                  <li key={id}>
                    <Link
                      href={`/${locale}/faces/${id}`}
                      className={cn("text-sm", linkCls)}
                    >
                      {t.faces[id].title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-current/10 pt-6">
                <p className="text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                  {t.lang.label}
                </p>
                <LanguageSwitcher
                  locale={locale}
                  label={t.lang.label}
                  tone={tone === "dark" ? "dark" : "light"}
                  compact
                  className="mt-3"
                />
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
