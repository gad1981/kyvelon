"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { IsoGrid } from "@/components/iso-grid";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { FACE_ORDER, type CubeFaceId } from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

const TONE: Record<CubeFaceId, string> = {
  software: "from-[#0e1c48] to-[#06102b]",
  websites: "from-[#2a58ff] to-[#001a8a]",
  automation: "from-[#163a7a] to-[#071228]",
  services: "from-[#0a1838] to-[#020612]",
  method: "from-[#0038f8] to-[#001f9c]",
  contact: "from-[#122044] to-[#000828]",
};

export function FaceApp({
  locale,
  t,
  faceId,
}: {
  locale: Locale;
  t: Dictionary;
  faceId: CubeFaceId;
}) {
  const face = t.faces[faceId];
  const home = `/${locale}`;

  return (
    <div
      className={cn(
        "relative flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white",
        `bg-gradient-to-br ${TONE[faceId]}`,
      )}
    >
      <IsoGrid className="opacity-40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.45) 49%, transparent 52%),
            linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.08) 49%, transparent 52%)
          `,
          backgroundSize: "72px 42px",
        }}
      />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`${home}#cube`}
            className="inline-flex h-10 items-center border border-white/20 px-4 text-[0.68rem] tracking-[0.16em] uppercase transition hover:border-electric hover:text-electric-soft"
          >
            ← {t.cube.backToCube}
          </Link>
          <Link
            href={home}
            className="inline-flex h-10 items-center px-3 text-[0.68rem] tracking-[0.16em] text-white/50 uppercase transition hover:text-white"
          >
            {t.cube.backHome}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher
            locale={locale}
            label={t.lang.label}
            tone="dark"
          />
          <Link href={home} className="hidden sm:block">
            <Image
              src="/cube-mark.svg"
              alt="Kyvelon"
              width={28}
              height={28}
            />
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 pb-10 sm:px-8">
        <p className="text-[0.68rem] tracking-[0.22em] text-electric-soft uppercase">
          {t.cube.faceLabel} · {face.short}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
          {face.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
          {face.copy}
        </p>
        <ul className="mt-8 space-y-3 border-s border-electric/50 ps-5">
          {face.detail.map((line) => (
            <li
              key={line}
              className="text-sm leading-relaxed text-white/75 sm:text-base"
            >
              {line.includes("georgegad.com") && !line.includes("@") ? (
                <>
                  {line.split("georgegad.com")[0]}
                  <Link
                    href="https://georgegad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-soft underline underline-offset-4"
                  >
                    georgegad.com
                  </Link>
                  {line.split("georgegad.com")[1]}
                </>
              ) : line.includes("@") ? (
                <a href={`mailto:${line}`} className="hover:text-electric-soft">
                  {line}
                </a>
              ) : line.startsWith("+30") ? (
                <a
                  href={`tel:${line.replace(/\s/g, "")}`}
                  className="hover:text-electric-soft"
                >
                  {line}
                </a>
              ) : (
                line
              )}
            </li>
          ))}
        </ul>

        {faceId === "contact" ? (
          <div className="mt-10 max-w-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
            <ContactForm t={t.contactForm} />
          </div>
        ) : (
          <Link
            href={`/${locale}/faces/contact`}
            className="mt-10 inline-flex h-12 w-fit items-center bg-electric px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
          >
            {t.cube.briefFace}
          </Link>
        )}
      </div>

      <nav
        className="relative z-10 flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-4 [scrollbar-width:none] sm:px-7 [&::-webkit-scrollbar]:hidden"
        aria-label={t.cube.facesNav}
      >
        {FACE_ORDER.map((id) => (
          <Link
            key={id}
            href={`/${locale}/faces/${id}`}
            className={cn(
              "h-9 shrink-0 px-3 text-[0.65rem] leading-9 tracking-[0.14em] uppercase transition",
              id === faceId
                ? "bg-electric text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white",
            )}
            aria-current={id === faceId ? "page" : undefined}
          >
            {t.faces[id].short}
          </Link>
        ))}
      </nav>
    </div>
  );
}
