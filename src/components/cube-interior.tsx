"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type TransitionEvent as ReactTransitionEvent,
} from "react";
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

/** Wall placement around Y: front, right, back, left */
const WALL_Y = [0, 90, 180, -90] as const;

export type FaceWall = {
  label: string;
  content: ReactNode;
  /** Centered visual (e.g. system graph) vs scrollable copy */
  mode?: "copy" | "visual";
};

type CubeInteriorRoomProps = {
  faceId: CubeFaceId;
  short: string;
  arriving?: boolean;
  walls: FaceWall[];
  nextLabel: string;
  prevLabel: string;
  className?: string;
};

/**
 * Inside a face: four full-bleed walls — Brief → Craft → System → Move.
 * First wall rests flat; 3D engages while flipping between walls.
 */
export function CubeInteriorRoom({
  faceId,
  short,
  arriving = false,
  walls,
  nextLabel,
  prevLabel,
  className,
}: CubeInteriorRoomProps) {
  const color = FACE_COLOR[faceId];
  const count = walls.length;
  const [index, setIndex] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [solid, setSolid] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [depth, setDepth] = useState(() =>
    typeof window !== "undefined" ? Math.round(window.innerWidth) : 1024,
  );
  const cubeRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; decided?: "x" | "y" } | null>(
    null,
  );
  const reduced = useRef(false);
  const indexRef = useRef(index);
  indexRef.current = index;
  const snapAfter = useRef<number | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    setIndex(0);
    setYaw(0);
    setSolid(false);
    setFlipping(false);
    snapAfter.current = null;
  }, [faceId]);

  useLayoutEffect(() => {
    const el = cubeRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setDepth(Math.round(w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const finishAt = useCallback((at: number) => {
    setFlipping(false);
    if (at === 0) setSolid(false);
  }, []);

  const go = useCallback(
    (next: number) => {
      if (count < 1) return;
      const from = indexRef.current;
      const target = ((next % count) + count) % count;
      if (target === from) return;

      if (reduced.current) {
        setIndex(target);
        setYaw(-target * 90);
        setSolid(target !== 0);
        setFlipping(false);
        return;
      }

      setIndex(target);

      // Leaving flat brief wall — seat in 3D at yaw 0, then turn.
      if (from === 0 && !solid) {
        setSolid(true);
        setYaw(0);
        setFlipping(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setFlipping(true);
            setYaw(-target * 90);
          });
        });
        return;
      }

      setSolid(true);
      setFlipping(true);

      // Wrap forward 3 → 0 via -360, then snap.
      if (from === count - 1 && target === 0) {
        snapAfter.current = 0;
        setYaw(-count * 90);
        return;
      }
      // Wrap back 0 → last via +90, then snap to canonical yaw.
      if (from === 0 && target === count - 1) {
        snapAfter.current = -(count - 1) * 90;
        setYaw(90);
        return;
      }

      snapAfter.current = null;
      setYaw(-target * 90);
    },
    [count, solid],
  );

  const onFlipEnd = (e: ReactTransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    if (snapAfter.current !== null) {
      const snap = snapAfter.current;
      snapAfter.current = null;
      setFlipping(false);
      setYaw(snap);
      finishAt(indexRef.current);
      return;
    }
    finishAt(indexRef.current);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-carousel-ctrl]")) return;
    drag.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.decided) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.hypot(dx, dy) < 14) return;
    drag.current.decided = Math.abs(dx) > Math.abs(dy) * 1.05 ? "x" : "y";
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (!start || start.decided === "y") return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) go(indexRef.current + 1);
    else go(indexRef.current - 1);
  };

  const half = depth / 2;
  const active = walls[index];
  const hint =
    index < count - 1
      ? `${nextLabel} · ${walls[(index + 1) % count]?.label ?? ""}`
      : `${prevLabel} · ${walls[Math.max(0, index - 1)]?.label ?? ""}`;

  return (
    <div
      className={cn(
        "chamber relative h-full min-h-0 w-full overflow-hidden",
        arriving && "chamber-arriving",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, ${color}88 0%, transparent 70%),
            #01040c
          `,
        }}
      />

      <div
        className="chamber-scene absolute inset-0 z-[1] touch-pan-y"
        style={
          solid
            ? {
                perspective: `${Math.round(depth * 2.1)}px`,
                perspectiveOrigin: "50% 50%",
              }
            : undefined
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={cubeRef}
          className="chamber-carousel absolute inset-0"
          style={{
            transformStyle: solid ? "preserve-3d" : undefined,
            transform: solid
              ? `translateZ(${-half}px) rotateY(${yaw}deg)`
              : "none",
            transition:
              flipping && !reduced.current
                ? "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
          }}
          onTransitionEnd={onFlipEnd}
        >
          {walls.map((wall, i) => {
            const live = solid || i === 0;
            return (
              <section
                key={wall.label}
                className="chamber-side absolute inset-0 overflow-hidden"
                style={{
                  transform: solid
                    ? `rotateY(${WALL_Y[i] ?? 0}deg) translateZ(${half}px)`
                    : i === 0
                      ? "none"
                      : `rotateY(${WALL_Y[i] ?? 0}deg) translateZ(100%)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `linear-gradient(${165 + i * 15}deg, ${color} 0%, #071228 48%, #020612 100%)`,
                  boxShadow: "inset 0 0 80px rgb(0 56 248 / 0.22)",
                  visibility: live ? "visible" : "hidden",
                }}
                aria-hidden={index !== i}
              >
                <div className="chamber-wall-grid" aria-hidden="true" />
                <div
                  className={cn(
                    "chamber-scan",
                    i % 2 === 1 && "chamber-scan-slow",
                  )}
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    "relative z-[1] flex h-full overflow-y-auto p-[clamp(1.25rem,4vw,2.75rem)] pb-20",
                    wall.mode === "visual"
                      ? "items-center justify-center"
                      : "flex-col justify-center",
                  )}
                >
                  {wall.content}
                </div>
                <p className="chamber-side-tag" aria-hidden="true">
                  {wall.label}
                </p>
              </section>
            );
          })}
        </div>
      </div>

      <div
        data-carousel-ctrl
        className="absolute inset-x-0 bottom-[4.75rem] z-20 flex flex-col items-center gap-3 sm:bottom-[5.25rem]"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            data-carousel-ctrl
            onClick={() => go(index - 1)}
            className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:border-electric hover:text-electric-soft sm:h-11 sm:w-11"
            aria-label={prevLabel}
          >
            <Arrow dir="left" />
          </button>
          <div className="flex items-center gap-2">
            {walls.map((wall, i) => (
              <button
                key={wall.label}
                type="button"
                data-carousel-ctrl
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 w-6 transition",
                  i === index ? "bg-electric" : "bg-white/25 hover:bg-white/45",
                )}
                aria-label={wall.label}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            data-carousel-ctrl
            onClick={() => go(index + 1)}
            className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:border-electric hover:text-electric-soft chamber-arrow-pulse sm:h-11 sm:w-11"
            aria-label={nextLabel}
          >
            <Arrow dir="right" />
          </button>
        </div>
        <p className="text-[0.55rem] tracking-[0.2em] text-white/40 uppercase">
          {active?.label} · {short}
          <span className="mx-2 text-white/20">·</span>
          {hint}
        </p>
      </div>

      <div aria-hidden="true" className="chamber-vignette" />
      <p className="chamber-tag" aria-hidden="true">
        INSIDE · {short}
      </p>
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={dir === "left" ? "-scale-x-100" : undefined}
    >
      <path
        d="M8 5 L16 12 L8 19"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
