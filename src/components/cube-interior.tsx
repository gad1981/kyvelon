"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
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

type Panel = "copy" | "graph";

type CubeInteriorRoomProps = {
  faceId: CubeFaceId;
  short: string;
  arriving?: boolean;
  text: ReactNode;
  visual: ReactNode;
  copyLabel: string;
  graphLabel: string;
  nextLabel: string;
  prevLabel: string;
  className?: string;
};

/**
 * Inside a face: two full cube sides — copy (front) and graph (right).
 * Flip yaw like turning the cube; arrows + swipe.
 */
export function CubeInteriorRoom({
  faceId,
  short,
  arriving = false,
  text,
  visual,
  copyLabel,
  graphLabel,
  nextLabel,
  prevLabel,
  className,
}: CubeInteriorRoomProps) {
  const color = FACE_COLOR[faceId];
  const [panel, setPanel] = useState<Panel>("copy");
  const [depth, setDepth] = useState(480);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; decided?: "x" | "y" } | null>(
    null,
  );
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    setPanel("copy");
  }, [faceId]);

  useEffect(() => {
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

  const go = useCallback((next: Panel) => {
    setPanel(next);
  }, []);

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
    if (dx < 0) go("graph");
    else go("copy");
  };

  const half = depth / 2;
  const yaw = panel === "copy" ? 0 : -90;

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
        ref={sceneRef}
        className="chamber-scene absolute inset-0 z-[1] touch-pan-y"
        style={{
          perspective: `${Math.round(depth * 2.1)}px`,
          perspectiveOrigin: "50% 48%",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={cubeRef}
          className="chamber-carousel absolute inset-[3%_3%_11%] sm:inset-[4%_6%_13%]"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${-half}px) rotateY(${yaw}deg)`,
            transition: reduced.current
              ? "none"
              : "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* FRONT — copy */}
          <section
            className="chamber-side chamber-side-copy absolute inset-0 overflow-hidden border border-white/15"
            style={{
              transform: `rotateY(0deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: `linear-gradient(165deg, ${color} 0%, #071228 48%, #020612 100%)`,
              boxShadow: `
                inset 0 0 80px rgb(0 56 248 / 0.22),
                0 0 60px rgb(0 0 0 / 0.35)
              `,
            }}
            aria-hidden={panel !== "copy"}
          >
            <div className="chamber-wall-grid" aria-hidden="true" />
            <div className="chamber-scan" aria-hidden="true" />
            <div className="relative z-[1] flex h-full flex-col justify-center overflow-y-auto p-[clamp(1.25rem,4vw,2.75rem)] pb-16">
              {text}
            </div>
            <p className="chamber-side-tag" aria-hidden="true">
              {copyLabel}
            </p>
          </section>

          {/* RIGHT — graph */}
          <section
            className="chamber-side chamber-side-graph absolute inset-0 overflow-hidden border border-electric/45"
            style={{
              transform: `rotateY(90deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: `linear-gradient(210deg, ${color} 0%, #030918 50%, #01040c 100%)`,
              boxShadow: `
                inset 0 0 100px rgb(0 56 248 / 0.35),
                0 0 60px rgb(0 0 0 / 0.35)
              `,
            }}
            aria-hidden={panel !== "graph"}
          >
            <div className="chamber-wall-grid" aria-hidden="true" />
            <div
              className="chamber-scan chamber-scan-slow"
              aria-hidden="true"
            />
            <div className="relative z-[1] flex h-full items-center justify-center p-[clamp(0.75rem,3vw,2rem)] pb-14">
              {visual}
            </div>
            <p className="chamber-side-tag" aria-hidden="true">
              {graphLabel}
            </p>
          </section>

          {/* Thin edge so the flip reads as a solid cube */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-px"
            style={{
              transform: `rotateY(-90deg) translateZ(${half}px)`,
              background:
                "linear-gradient(180deg, transparent, rgb(122 160 255 / 0.55), transparent)",
            }}
          />
        </div>
      </div>

      {/* Flip arrows */}
      <div
        data-carousel-ctrl
        className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-2 sm:px-4"
      >
        <button
          type="button"
          data-carousel-ctrl
          disabled={panel === "copy"}
          onClick={() => go("copy")}
          className={cn(
            "pointer-events-auto flex h-12 w-12 items-center justify-center border backdrop-blur-md transition sm:h-14 sm:w-14",
            panel === "copy"
              ? "border-white/10 text-white/20"
              : "border-white/30 bg-black/40 text-white hover:border-electric hover:text-electric-soft",
          )}
          aria-label={prevLabel}
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          data-carousel-ctrl
          disabled={panel === "graph"}
          onClick={() => go("graph")}
          className={cn(
            "pointer-events-auto flex h-12 w-12 items-center justify-center border backdrop-blur-md transition sm:h-14 sm:w-14",
            panel === "graph"
              ? "border-white/10 text-white/20"
              : "border-white/30 bg-black/40 text-white hover:border-electric hover:text-electric-soft chamber-arrow-pulse",
          )}
          aria-label={nextLabel}
        >
          <Arrow dir="right" />
        </button>
      </div>

      <div
        data-carousel-ctrl
        className="absolute inset-x-0 bottom-[4.75rem] z-20 flex flex-col items-center gap-2 sm:bottom-[5.25rem]"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-carousel-ctrl
            onClick={() => go("copy")}
            className={cn(
              "h-1.5 w-6 transition",
              panel === "copy" ? "bg-electric" : "bg-white/25 hover:bg-white/45",
            )}
            aria-label={copyLabel}
            aria-current={panel === "copy" ? "true" : undefined}
          />
          <button
            type="button"
            data-carousel-ctrl
            onClick={() => go("graph")}
            className={cn(
              "h-1.5 w-6 transition",
              panel === "graph" ? "bg-electric" : "bg-white/25 hover:bg-white/45",
            )}
            aria-label={graphLabel}
            aria-current={panel === "graph" ? "true" : undefined}
          />
        </div>
        <p className="text-[0.55rem] tracking-[0.2em] text-white/40 uppercase">
          {panel === "copy" ? nextLabel : prevLabel} · {short}
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
