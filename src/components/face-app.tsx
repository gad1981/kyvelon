"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ContactForm } from "@/components/contact-form";
import { FaceSoundToggle } from "@/components/face-atmosphere";
import { CubeEnterSequence } from "@/components/cube-portal";
import { CubeInteriorRoom } from "@/components/cube-interior";
import { FaceGraph } from "@/components/face-graph";
import { SiteMenu } from "@/components/site-menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { FACE_ORDER, type CubeFaceId } from "@/lib/cube-faces";
import { consumeCubeEntry } from "@/lib/cube-entry";
import { cn } from "@/lib/utils";

function DetailLine({ line }: { line: string }) {
  if (line.includes("georgegad.com") && !line.includes("@")) {
    return (
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
    );
  }
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
  // pending until mount — avoids SSR/client portal mismatch (hydration)
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

  // Safety: never leave the Sophon overlay stuck if timers are interrupted
  useEffect(() => {
    if (portal !== "full" && portal !== "short") return;
    const failsafe = window.setTimeout(() => setPortal("done"), 2500);
    return () => window.clearTimeout(failsafe);
  }, [portal]);
  const [assembling, setAssembling] = useState(false);

  useEffect(() => {
    if (portal !== "done") {
      setAssembling(false);
      return;
    }
    setAssembling(true);
    const id = window.setTimeout(() => setAssembling(false), 1400);
    return () => window.clearTimeout(id);
  }, [portal]);

  const wallCopy = (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-2xl flex-col justify-center">
      <p className="text-[0.62rem] tracking-[0.28em] text-electric-soft uppercase">
        {t.cube.faceLabel} · {face.short}
      </p>
      <h1 className="font-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
        {face.title}
      </h1>
      <p className="mt-4 max-w-[42ch] text-[clamp(0.95rem,1.8vw,1.2rem)] leading-relaxed text-white/85">
        {face.copy}
      </p>

      <ul className="mt-8 grid gap-4 border-s-2 border-electric ps-5">
        {face.detail.map((line, i) => (
          <li
            key={line}
            className="grid gap-1 text-[clamp(0.85rem,1.4vw,1.05rem)] leading-snug text-white/88"
          >
            {face.graph[i] ? (
              <span className="text-[0.58rem] tracking-[0.2em] text-[#7aa0ff] uppercase">
                {face.graph[i]}
              </span>
            ) : null}
            <DetailLine line={line} />
          </li>
        ))}
      </ul>

      {faceId === "contact" ? (
        <div className="mt-6 max-w-full shrink-0 border border-white/15 bg-black/25 p-4 backdrop-blur-sm [&_form]:space-y-2.5 [&_textarea]:min-h-[56px]">
          <ContactForm t={t.contactForm} />
        </div>
      ) : (
        <Link
          href={`/${locale}/faces/contact`}
          className="mt-8 inline-flex h-12 w-fit shrink-0 items-center bg-electric px-6 text-[0.68rem] tracking-[0.18em] text-white uppercase transition hover:bg-white hover:text-navy"
        >
          {t.cube.briefFace}
        </Link>
      )}
    </div>
  );

  const wallVisual = (
    <FaceGraph
      key={faceId}
      faceId={faceId}
      title={face.title}
      labels={face.graph}
      hubLabel={face.graphHub}
      onWall
      className="h-full w-full max-w-none"
    />
  );

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

      {/* Full-bleed chamber — the page IS the inside of the cube */}
      <div
        className={cn(
          "absolute inset-0",
          portal !== "done"
            ? "pointer-events-none opacity-0"
            : "face-content-in",
        )}
      >
        <CubeInteriorRoom
          faceId={faceId}
          short={face.short}
          arriving={assembling}
          text={wallCopy}
          visual={wallVisual}
          copyLabel={t.cube.sideCopy}
          graphLabel={t.cube.sideGraph}
          nextLabel={t.cube.toGraph}
          prevLabel={t.cube.toCopy}
        />
      </div>

      {/* HUD — floats in front of the volume */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <Link
            href={`${home}#cube`}
            className="inline-flex h-9 items-center border border-white/25 bg-black/35 px-3 text-[0.62rem] tracking-[0.16em] uppercase backdrop-blur-md transition hover:border-electric hover:text-electric-soft"
          >
            ← {t.cube.backToCube}
          </Link>
          <Link
            href={home}
            className="inline-flex h-9 items-center px-2 text-[0.62rem] tracking-[0.16em] text-white/45 uppercase transition hover:text-white"
          >
            {t.cube.backHome}
          </Link>
        </div>
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          <FaceSoundToggle
            key={faceId}
            faceId={faceId}
            soundOnLabel={t.cube.soundOn}
            soundOffLabel={t.cube.soundOff}
            soundHint={t.cube.soundHint}
          />
          <BrandLogo
            href={home}
            tone="white"
            width={110}
            className="hidden sm:block"
          />
          <SiteMenu locale={locale} t={t} tone="dark" />
        </div>
      </header>

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
