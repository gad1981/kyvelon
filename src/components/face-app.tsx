"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { FaceSoundToggle } from "@/components/face-atmosphere";
import { CubeEnterSequence } from "@/components/cube-portal";
import { CubeInteriorRoom } from "@/components/cube-interior";
import { FaceGraph } from "@/components/face-graph";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/i18n/config";
import type { Dictionary, FaceSlidePoint } from "@/i18n/types";
import { FACE_ORDER, type CubeFaceId } from "@/lib/cube-faces";
import { consumeCubeEntry } from "@/lib/cube-entry";
import { cn } from "@/lib/utils";

function DetailLine({ line }: { line: string }) {
  if (line.includes("@")) {
    return (
      <a href={`mailto:${line}`} className="hover:text-electric-soft">
        {line}
      </a>
    );
  }
  if (line.startsWith("+30")) {
    return (
      <a
        href={`tel:${line.replace(/\s/g, "")}`}
        className="hover:text-electric-soft"
      >
        {line}
      </a>
    );
  }
  return line;
}

function SlideShell({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-2xl flex-col justify-center">
      <p className="text-[0.62rem] tracking-[0.28em] text-electric-soft uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-[clamp(1.85rem,5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-[42ch] text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-white/85">
          {body}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function CraftPoints({ points }: { points: FaceSlidePoint[] }) {
  return (
    <ul className="mt-8 grid gap-4 border-s-2 border-electric ps-5">
      {points.map((point) => (
        <li
          key={point.label}
          className="grid gap-1 text-[clamp(0.85rem,1.4vw,1.05rem)] leading-snug text-white/88"
        >
          <span className="text-[0.58rem] tracking-[0.2em] text-[#7aa0ff] uppercase">
            {point.label}
          </span>
          <DetailLine line={point.body} />
        </li>
      ))}
    </ul>
  );
}

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
  const slides = face.slides;
  const home = `/${locale}`;
  const [portal, setPortal] = useState<"pending" | "full" | "short" | "done">(
    "pending",
  );

  useEffect(() => {
    const crossed = consumeCubeEntry(faceId);
    setPortal(crossed ? "full" : "short");
  }, [faceId]);

  const finishEnter = useCallback(() => {
    setPortal("done");
  }, []);

  useEffect(() => {
    if (portal !== "full" && portal !== "short") return;
    const failsafe = window.setTimeout(() => setPortal("done"), 2500);
    return () => window.clearTimeout(failsafe);
  }, [portal]);

  const walls = [
    {
      label: t.cube.sideBrief,
      content: (
        <SlideShell
          eyebrow={slides.brief.eyebrow}
          title={slides.brief.title}
          body={slides.brief.body}
        />
      ),
    },
    {
      label: t.cube.sideCraft,
      content: (
        <SlideShell
          eyebrow={slides.craft.eyebrow}
          title={slides.craft.title}
        >
          <CraftPoints points={slides.craft.points} />
        </SlideShell>
      ),
    },
    {
      label: t.cube.sideSystem,
      mode: "visual" as const,
      content: (
        <div className="mx-auto flex w-full max-w-3xl flex-col justify-center gap-3 pt-[max(4.5rem,env(safe-area-inset-top))] pb-4 sm:gap-4">
          <div className="shrink-0 px-1">
            <p className="text-[0.58rem] tracking-[0.24em] text-electric-soft uppercase">
              {slides.system.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-[clamp(1.35rem,3.5vw,2.25rem)] font-semibold tracking-[-0.03em]">
              {slides.system.title}
            </h2>
            <p className="mt-2 max-w-[46ch] text-sm text-white/70 sm:text-base">
              {slides.system.body}
            </p>
          </div>
          <FaceGraph
            key={`${faceId}-system`}
            faceId={faceId}
            title={slides.system.title}
            labels={face.graph}
            hubLabel={face.graphHub}
            onWall
            className="h-[min(42vh,20rem)] w-full max-w-none shrink-0"
          />
        </div>
      ),
    },
    {
      label: t.cube.sideMove,
      content: (
        <SlideShell
          eyebrow={slides.move.eyebrow}
          title={slides.move.title}
          body={slides.move.body}
        >
          {faceId === "contact" ? (
            <div className="mt-6 max-w-full shrink-0 border border-white/15 bg-black/25 p-4 backdrop-blur-sm [&_form]:space-y-2.5 [&_textarea]:min-h-[56px]">
              <ContactForm t={t.contactForm} />
            </div>
          ) : (
            <Link
              href={`/${locale}/faces/contact`}
              className="mt-8 inline-flex h-12 w-fit shrink-0 items-center bg-electric px-6 text-[0.68rem] tracking-[0.18em] text-white uppercase transition hover:bg-white hover:text-navy"
            >
              {slides.move.cta}
            </Link>
          )}
        </SlideShell>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "relative h-[100svh] overflow-hidden bg-[#020612] text-white",
        portal === "done" && "face-arrived",
      )}
    >
      {portal === "full" || portal === "short" ? (
        <CubeEnterSequence
          faceId={faceId}
          short={face.short}
          title={face.title}
          enteringLabel={t.cube.entering}
          insideLabel={t.cube.inside}
          variant={portal}
          onDone={finishEnter}
        />
      ) : null}

      <div
        className={cn(
          "absolute inset-0",
          portal !== "done" && "pointer-events-none",
        )}
      >
        <CubeInteriorRoom
          faceId={faceId}
          short={face.short}
          walls={walls}
          nextLabel={t.cube.toNext}
          prevLabel={t.cube.toPrev}
        />
      </div>

      <SiteHeader
        locale={locale}
        t={t}
        tone="dark"
        logoHref={home}
        hud
        menuExtra={
          <FaceSoundToggle
            key={faceId}
            faceId={faceId}
            soundOnLabel={t.cube.soundOn}
            soundOffLabel={t.cube.soundOff}
            soundHint={t.cube.soundHint}
          />
        }
      />

      <nav
        className="absolute inset-x-0 bottom-0 z-30 flex gap-1.5 overflow-x-auto bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-10 pb-3 [scrollbar-width:none] sm:gap-2 sm:px-5 sm:pb-4 [&::-webkit-scrollbar]:hidden"
        aria-label={t.cube.facesNav}
      >
        {FACE_ORDER.map((id) => (
          <Link
            key={id}
            href={`/${locale}/faces/${id}`}
            className={cn(
              "h-8 shrink-0 border px-2.5 text-[0.58rem] leading-8 tracking-[0.14em] uppercase backdrop-blur-md transition sm:px-3",
              id === faceId
                ? "border-electric bg-electric text-white"
                : "border-white/15 bg-black/40 text-white/55 hover:border-white/35 hover:text-white",
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
