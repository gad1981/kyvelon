"use client";

import { useEffect, useState } from "react";
import type { CubeFaceId } from "@/lib/cube-faces";
import { useFaceSound } from "@/hooks/use-face-sound";
import { cn } from "@/lib/utils";

export function FaceImmersion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        !reducedMotion && "face-immersive",
      )}
    >
      <div className="face-glow face-glow-a" />
      <div className="face-glow face-glow-b" />
      <div className="face-glow face-glow-c" />
      {!reducedMotion ? (
        <>
          <span className="face-orb face-orb-1" />
          <span className="face-orb face-orb-2" />
          <span className="face-orb face-orb-3" />
        </>
      ) : null}
      <div className="face-horizon" />
    </div>
  );
}

export function FaceSoundToggle({
  faceId,
  soundOnLabel,
  soundOffLabel,
  soundHint,
}: {
  faceId: CubeFaceId;
  soundOnLabel: string;
  soundOffLabel: string;
  soundHint: string;
}) {
  const { enabled, needsGesture, toggle } = useFaceSound(faceId);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => void toggle()}
        className={cn(
          "inline-flex h-9 items-center gap-2 border px-3 text-[0.62rem] tracking-[0.16em] uppercase transition",
          enabled
            ? "border-electric/70 bg-electric/20 text-electric-soft"
            : "border-white/20 text-white/60 hover:border-white/40 hover:text-white",
        )}
        aria-pressed={enabled}
        title={soundHint}
      >
        <SoundIcon on={enabled} />
        {enabled ? soundOnLabel : soundOffLabel}
      </button>
      {needsGesture && !enabled ? (
        <span className="hidden max-w-[9rem] text-[0.58rem] leading-tight tracking-[0.1em] text-white/40 uppercase sm:inline">
          {soundHint}
        </span>
      ) : null}
    </div>
  );
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
        opacity={on ? 1 : 0.7}
      />
      {on ? (
        <>
          <path
            d="M16 8.5c1.2 1 1.8 2.3 1.8 3.5s-.6 2.5-1.8 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
          <path
            d="M18.5 6c2 1.7 3 3.8 3 6s-1 4.3-3 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            opacity="0.7"
          />
        </>
      ) : (
        <path
          d="M16 9l5 5M21 9l-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      )}
    </svg>
  );
}
