"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { SERVICE_FACE_IDS } from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

type SiteMenuProps = {
  locale: Locale;
  t: Dictionary;
  tone?: "light" | "dark";
  className?: string;
  /** Right-side chrome (tagline, extras) — sits with the mobile burger. */
  trailing?: ReactNode;
  /** Extra controls inside the mobile sheet (and beside desktop lang). */
  menuExtra?: ReactNode;
};

export function SiteMenu({
  locale,
  t,
  tone = "dark",
  className,
  trailing,
  menuExtra,
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname() || `/${locale}`;
  const home = `/${locale}`;
  const f = t.footer;
  const m = t.menu;

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

  // Cover every fixed layer (header, cube HUD, noise, cookies) while open.
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    if (open) header.setAttribute("data-menu-open", "");
    else header.removeAttribute("data-menu-open");
    return () => header.removeAttribute("data-menu-open");
  }, [open]);

  const linkCls =
    tone === "dark"
      ? "text-white/75 transition hover:text-white"
      : "text-navy/70 transition hover:text-navy";

  const deskLink =
    tone === "dark"
      ? "text-[0.62rem] tracking-[0.14em] text-white/55 uppercase transition hover:text-white"
      : "text-[0.62rem] tracking-[0.14em] text-navy/55 uppercase transition hover:text-navy";

  const deskLinks = (
    <>
      <Link href={`${home}#cube`} className={deskLink}>
        {f.theCube}
      </Link>
      <Link href={`/${locale}/work`} className={deskLink}>
        {f.work}
      </Link>
      <Link href={`/${locale}/insights`} className={deskLink}>
        {f.insights}
      </Link>
      <Link href={`/${locale}/people`} className={deskLink}>
        {f.people}
      </Link>
      <Link href={`/${locale}/contact`} className={deskLink}>
        {f.startBrief}
      </Link>
    </>
  );

  return (
    <>
      {/* Desktop: centered nav + language dropdown */}
      <div
        data-hud
        className="pointer-events-auto absolute start-1/2 top-1/2 z-[90] hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 md:flex rtl:translate-x-1/2"
      >
        <nav className="flex items-center gap-5" aria-label={m.title}>
          {deskLinks}
        </nav>
        <span
          className={cn(
            "h-3 w-px shrink-0",
            tone === "dark" ? "bg-white/20" : "bg-navy/15",
          )}
          aria-hidden="true"
        />
        <LanguageSwitcher
          locale={locale}
          label={t.lang.label}
          tone={tone}
          variant="dropdown"
        />
        {menuExtra ? (
          <div className="flex items-center">{menuExtra}</div>
        ) : null}
      </div>

      <div
        className={cn(
          "pointer-events-auto relative z-[1] flex items-center gap-3",
          className,
        )}
        data-hud
      >
        {trailing}
        {/* Mobile burger */}
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

        {open && typeof document !== "undefined"
          ? createPortal(
              <div
                id={panelId}
                className={cn(
                  "fixed inset-0 z-[300] flex flex-col md:hidden",
                  tone === "dark"
                    ? "bg-[#040a18] text-white"
                    : "bg-surface text-navy",
                )}
                role="dialog"
                aria-modal="true"
                aria-label={m.title}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-current/10 px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 sm:px-8">
                  <p className="text-[0.62rem] tracking-[0.22em] text-electric uppercase">
                    {m.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-electric text-current"
                    aria-label={m.close}
                  >
                    <span className="block h-px w-4 origin-center translate-y-[3.5px] rotate-45 bg-current" />
                    <span className="block h-px w-4 opacity-0 bg-current" />
                    <span className="block h-px w-4 origin-center -translate-y-[3.5px] -rotate-45 bg-current" />
                  </button>
                </div>

                <nav
                  className="min-h-0 flex-1 overflow-y-auto px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8"
                  aria-label={m.title}
                >
                  <p className="text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                    {f.explore}
                  </p>
                  <ul className="mt-5 space-y-4">
                    <li>
                      <Link
                        href={`${home}#cube`}
                        className={cn("font-display text-2xl sm:text-3xl", linkCls)}
                      >
                        {f.theCube}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${locale}/work`}
                        className={cn("font-display text-2xl sm:text-3xl", linkCls)}
                      >
                        {f.work}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${locale}/insights`}
                        className={cn("font-display text-2xl sm:text-3xl", linkCls)}
                      >
                        {f.insights}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${locale}/people`}
                        className={cn("font-display text-2xl sm:text-3xl", linkCls)}
                      >
                        {f.people}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${locale}/contact`}
                        className={cn("font-display text-2xl sm:text-3xl", linkCls)}
                      >
                        {f.startBrief}
                      </Link>
                    </li>
                  </ul>

                  <p className="mt-12 text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                    {f.faces}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {SERVICE_FACE_IDS.map((id) => (
                      <li key={id}>
                        <Link
                          href={`/${locale}/faces/${id}`}
                          className={cn("text-base sm:text-lg", linkCls)}
                        >
                          {t.faces[id].title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 border-t border-current/10 pt-8">
                    <p className="text-[0.58rem] tracking-[0.2em] text-electric/80 uppercase">
                      {t.lang.label}
                    </p>
                    <LanguageSwitcher
                      locale={locale}
                      label={t.lang.label}
                      tone={tone === "dark" ? "dark" : "light"}
                      compact
                      className="mt-4"
                    />
                  </div>

                  {menuExtra ? (
                    <div className="mt-10 border-t border-current/10 pt-8">
                      {menuExtra}
                    </div>
                  ) : null}
                </nav>
              </div>,
              document.body,
            )
          : null}
      </div>
    </>
  );
}
