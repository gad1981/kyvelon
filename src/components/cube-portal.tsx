"use client";

import { useEffect, useState } from "react";
import type { CubeFaceId } from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

const FACE_COLOR: Record<CubeFaceId, string> = {
  software: "#0e1c48",
  websites: "#0038f8",
  automation: "#163a7a",
  services: "#0a1838",
  method: "#2a58ff",
  contact: "#122044",
};

const PANEL_IDS = ["front", "back", "left", "right", "top", "bottom"] as const;

/**
 * Sophon-style unfold: dense folded body → panels peel into a plane → bloom.
 */
function SophonUnfold({
  color,
  phase,
  label,
}: {
  color: string;
  phase: "dense" | "crack" | "unfold" | "bloom" | "void";
  label: string;
}) {
  return (
    <div
      className={cn("sophon", `sophon-${phase}`)}
      aria-hidden="true"
    >
      <div className="sophon-stage">
        <div className="sophon-body">
          {PANEL_IDS.map((id) => (
            <div
              key={id}
              className={cn("sophon-panel", `sophon-panel-${id}`)}
              style={{
                background: `linear-gradient(145deg, ${color} 0%, #020612 78%)`,
                boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 70%, white), 0 0 40px ${color}66`,
              }}
            >
              <span className="sophon-grid" />
              {id === "front" ? (
                <span className="sophon-glyph">{label}</span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="sophon-core" style={{ borderColor: color }} />
        <div className="sophon-ring" style={{ borderColor: `${color}aa` }} />
        <div className="sophon-ring sophon-ring-2" style={{ borderColor: `${color}66` }} />
      </div>
      <div
        className="sophon-flare"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, ${color}cc 28%, #020612 72%)`,
        }}
      />
    </div>
  );
}

/** Exit: cube world collapses into a Sophon unfold before route change. */
export function CubeExitPortal({
  faceId,
  label,
  enteringLabel,
  active,
}: {
  faceId: CubeFaceId;
  label: string;
  enteringLabel: string;
  active: boolean;
}) {
  const [phase, setPhase] = useState<"dense" | "crack" | "unfold" | "bloom">(
    "dense",
  );

  useEffect(() => {
    if (!active) {
      setPhase("dense");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("bloom");
      return;
    }
    const crack = window.setTimeout(() => setPhase("crack"), 220);
    const unfold = window.setTimeout(() => setPhase("unfold"), 520);
    const bloom = window.setTimeout(() => setPhase("bloom"), 1280);
    return () => {
      window.clearTimeout(crack);
      window.clearTimeout(unfold);
      window.clearTimeout(bloom);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="cube-exit-portal pointer-events-none fixed inset-0 z-[80]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 48%, ${FACE_COLOR[faceId]}99 0%, #020612 58%)`,
        }}
      />
      <SophonUnfold color={FACE_COLOR[faceId]} phase={phase} label={label} />
      <div className="absolute inset-x-0 bottom-[14%] z-10 text-center">
        <p className="text-[0.7rem] tracking-[0.28em] text-electric-soft uppercase">
          {enteringLabel}
        </p>
        <p className="font-display mt-3 text-2xl tracking-[0.08em] text-white uppercase sm:text-3xl">
          {label}
        </p>
      </div>
    </div>
  );
}

/** Arrival: after cube exit, only the bloom residue — never replay the unfold. */
export function CubeEnterSequence({
  faceId,
  short,
  title,
  enteringLabel,
  insideLabel,
  variant = "full",
  onDone,
}: {
  faceId: CubeFaceId;
  short: string;
  title: string;
  enteringLabel: string;
  insideLabel: string;
  variant?: "full" | "short";
  onDone: () => void;
}) {
  // Full = continue from exit bloom (no second unfold). Short = compact Sophon for deep links.
  const [phase, setPhase] = useState<
    "dense" | "crack" | "unfold" | "bloom" | "void"
  >(variant === "full" ? "bloom" : "dense");

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    if (variant === "short") {
      later(() => setPhase("unfold"), 60);
      later(() => setPhase("bloom"), 420);
      later(() => setPhase("void"), 820);
      later(() => onDone(), 1100);
    } else {
      /* Exit already unfolded — brief bloom hold, then void into the chamber */
      later(() => setPhase("void"), 380);
      later(() => onDone(), 720);
    }

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onDone, variant]);

  const color = FACE_COLOR[faceId];
  // From cube: exit already showed the name — stay silent on arrival.
  // Refresh / deep link: show the name once during short enter.
  const showCopy =
    variant === "short" &&
    (phase === "dense" || phase === "crack" || phase === "unfold");

  return (
    <div
      className={cn(
        "cube-enter-seq fixed inset-0 z-[70] flex items-center justify-center overflow-hidden",
        phase === "void" && "cube-enter-seq-out",
      )}
      role="status"
      aria-live="polite"
      aria-label={`${enteringLabel} ${title}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${color}ee 0%, #020612 64%)`,
        }}
      />

      <SophonUnfold
        color={color}
        phase={phase}
        label={variant === "short" ? short : ""}
      />

      <div
        className={cn(
          "sophon-copy relative z-10 text-center transition-opacity duration-500",
          !showCopy && "opacity-0",
          phase !== "dense" && "sophon-copy-live",
        )}
        aria-hidden={!showCopy}
      >
        <p className="text-[0.72rem] tracking-[0.32em] text-electric-soft uppercase">
          {phase === "dense" || phase === "crack" ? enteringLabel : insideLabel}
        </p>
        <p className="font-display mt-4 text-5xl font-semibold tracking-[-0.03em] text-white sm:text-7xl">
          {short}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/70 sm:text-base">
          {title}
        </p>
      </div>
    </div>
  );
}
