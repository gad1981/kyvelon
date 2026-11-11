"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { BrandLogo } from "@/components/brand-logo";
import { CubeExitPortal } from "@/components/cube-portal";
import { IsoGrid } from "@/components/iso-grid";
import { SiteMenu } from "@/components/site-menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import {
  FACE_ORDER,
  FACE_ROTATIONS,
  type CubeFaceId,
} from "@/lib/cube-faces";
import { markCubeEntry } from "@/lib/cube-entry";
import { cn } from "@/lib/utils";

const TONE: Record<CubeFaceId, string> = {
  software: "bg-[linear-gradient(160deg,#0e1c48_0%,#06102b_100%)]",
  websites: "bg-[linear-gradient(145deg,#3d6dff_0%,#0038f8_50%,#001a8a_100%)]",
  automation: "bg-[linear-gradient(160deg,#163a7a_0%,#071228_100%)]",
  services: "bg-[linear-gradient(200deg,#0a1838_0%,#020612_100%)]",
  method: "bg-[linear-gradient(135deg,#5b84ff_0%,#0038f8_55%,#001f9c_100%)]",
  contact: "bg-[linear-gradient(180deg,#122044_0%,#000828_100%)]",
};

export function CubeWorld({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const router = useRouter();
  const [size, setSize] = useState(280);
  const start = FACE_ROTATIONS.software;
  const [rot, setRot] = useState({ x: start.x - 22, y: start.y + 36 });
  const [active, setActive] = useState<CubeFaceId>("software");
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(true);
  const [exiting, setExiting] = useState<CubeFaceId | null>(null);
  const rotRef = useRef(rot);
  const drag = useRef<{
    x: number;
    y: number;
    rotX: number;
    rotY: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const idle = useRef(true);
  const frame = useRef<number | null>(null);
  const reduceMotion = useRef(false);
  /** pending → decide rotate vs page-scroll; rotate only preventDefaults touch */
  const gesture = useRef<"pending" | "rotate" | "scroll" | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rotRef.current = rot;
  }, [rot]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      const edge = Math.min(window.innerWidth, window.innerHeight);
      setSize(Math.round(Math.min(Math.max(edge * 0.52, 220), 460)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const tick = () => {
      if (idle.current && !drag.current) {
        setRot((r) => {
          const next = { ...r, y: r.y + 0.2 };
          rotRef.current = next;
          return next;
        });
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const half = size / 2;
  const faceTransforms: Record<CubeFaceId, string> = {
    software: `rotateY(0deg) translateZ(${half}px)`,
    websites: `rotateY(90deg) translateZ(${half}px)`,
    automation: `rotateY(180deg) translateZ(${half}px)`,
    services: `rotateY(-90deg) translateZ(${half}px)`,
    method: `rotateX(90deg) translateZ(${half}px)`,
    contact: `rotateX(-90deg) translateZ(${half}px)`,
  };

  const snapTo = useCallback((id: CubeFaceId) => {
    idle.current = false;
    setActive(id);
    const base = FACE_ROTATIONS[id];
    const next = { x: base.x - 22, y: base.y + 28 };
    setRot(next);
    rotRef.current = next;
    setHint(false);
  }, []);

  const enterFace = useCallback(
    (id: CubeFaceId) => {
      if (exiting) return;
      snapTo(id);
      markCubeEntry(id);
      setExiting(id);
      const delay = reduceMotion.current ? 120 : 1850;
      window.setTimeout(() => {
        router.push(`/${locale}/faces/${id}`);
      }, delay);
    },
    [exiting, locale, router, snapTo],
  );

  const endRotateGesture = useCallback(
    (el: HTMLDivElement, pointerId: number, wasDrag: boolean) => {
      drag.current = null;
      gesture.current = null;
      setDragging(false);
      try {
        if (el.hasPointerCapture?.(pointerId)) {
          el.releasePointerCapture(pointerId);
        }
      } catch {
        /* already released */
      }
      if (wasDrag) {
        snapTo(nearestFace(rotRef.current.x, rotRef.current.y));
        window.setTimeout(() => {
          idle.current = true;
        }, 2800);
      } else {
        idle.current = true;
      }
    },
    [snapTo],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-hud]")) return;
    idle.current = false;
    setHint(false);
    gesture.current = "pending";
    // Do not capture yet — let vertical pans scroll the page until we claim rotate.
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotRef.current.x,
      rotY: rotRef.current.y,
      moved: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || gesture.current === "scroll") return;

    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    const dist = Math.hypot(dx, dy);

    if (gesture.current === "pending") {
      if (dist < 10) return;
      // Vertical-dominant → page scroll; horizontal / deliberate drag → cube
      if (Math.abs(dy) > Math.abs(dx) * 1.1) {
        gesture.current = "scroll";
        drag.current = null;
        idle.current = true;
        return;
      }
      gesture.current = "rotate";
      setDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    if (gesture.current !== "rotate") return;
    e.preventDefault();
    drag.current.moved = true;
    const next = {
      x: Math.max(-78, Math.min(78, drag.current.rotX - dy * 0.45)),
      y: drag.current.rotY + dx * 0.45,
    };
    rotRef.current = next;
    setRot(next);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (gesture.current === "scroll" || gesture.current === "pending") {
      // Tap or page-scroll: do not snap the cube
      drag.current = null;
      gesture.current = null;
      idle.current = true;
      return;
    }
    if (gesture.current !== "rotate") return;
    const moved = Boolean(drag.current?.moved);
    suppressClick.current = moved;
    endRotateGesture(e.currentTarget, e.pointerId, moved);
  };

  // Only while rotating: non-passive touchmove so the page does not scroll with the drag.
  // Keep it off otherwise — a standing non-passive listener blocks page scroll on iOS.
  useEffect(() => {
    if (!dragging) return;
    const el = stageRef.current;
    if (!el) return;
    const onTouchMove = (ev: TouchEvent) => {
      if (gesture.current === "rotate") ev.preventDefault();
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [dragging]);

  const face = t.faces[active];

  return (
    <div
      id="cube"
      ref={stageRef}
      className={cn(
        "relative h-[100svh] w-full overflow-hidden bg-surface",
        dragging ? "cursor-grabbing touch-none" : "cursor-grab touch-pan-y",
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="application"
      aria-label={t.cube.dragAria}
    >
      <IsoGrid />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_56_248_/_0.12),transparent_55%),linear-gradient(160deg,rgb(247_248_251)_0%,rgb(230_235_245)_100%)]" />

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition duration-700",
          exiting && "cube-world-dive",
        )}
        style={{
          perspective: `${Math.round(size * 3.2)}px`,
          perspectiveOrigin: "50% 48%",
        }}
      >
        <div style={{ transformStyle: "preserve-3d" }}>
          <div
            style={{
              width: size,
              height: size,
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
              transition: dragging
                ? "none"
                : exiting
                  ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {FACE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  enterFace(id);
                }}
                className={cn(
                  "absolute flex flex-col items-center justify-center gap-2 border border-white/20 p-5 text-center text-white shadow-[inset_0_0_48px_rgb(255_255_255_/_0.07)] outline-none",
                  "focus-visible:ring-2 focus-visible:ring-white/80",
                  TONE[id],
                  active === id &&
                    "outline outline-2 outline-offset-[-3px] outline-white/55",
                )}
                style={{
                  width: size,
                  height: size,
                  left: 0,
                  top: 0,
                  transform: faceTransforms[id],
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                aria-pressed={active === id}
                aria-label={`${t.faces[id].title}. ${t.cube.enterFace}`}
              >
                <span className="text-[0.65rem] tracking-[0.32em] text-white/50 uppercase sm:text-[0.72rem]">
                  {t.cube.faceLabel}
                </span>
                <span
                  className="font-display font-semibold tracking-[0.14em] uppercase"
                  style={{
                    fontSize: `clamp(1.4rem, ${size * 0.09}px, 2.6rem)`,
                  }}
                >
                  {t.faces[id].short}
                </span>
                <span className="max-w-[11ch] text-[0.75rem] leading-snug tracking-wide text-white/75 sm:text-sm">
                  {t.faces[id].label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[18%] start-1/2 h-12 w-[42%] -translate-x-1/2 rounded-[100%] bg-navy/30 blur-2xl rtl:translate-x-1/2"
        />
      </div>

      <header
        data-hud
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-5 sm:p-7"
      >
        <div className="pointer-events-auto">
          <BrandLogo
            href={`/${locale}#cube`}
            tone="color"
            width={168}
            priority
            className="w-[120px] sm:w-[168px] [&_img]:w-full"
          />
        </div>
        <div className="pointer-events-auto flex items-start gap-3">
          <p className="pointer-events-none hidden max-w-[12rem] text-end sm:block sm:max-w-xs">
            <span className="font-display text-lg leading-tight font-semibold tracking-[-0.03em] text-navy sm:text-2xl">
              {t.brand.taglineLead}
              <span className="block text-electric">{t.brand.taglineAccent}</span>
            </span>
          </p>
          <SiteMenu locale={locale} t={t} tone="light" />
        </div>
      </header>

      <div data-hud className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {hint && (
            <p className="text-center text-[0.68rem] tracking-[0.2em] text-navy/45 uppercase">
              {t.cube.hint}
            </p>
          )}

          <div
            className="flex flex-wrap items-end justify-between gap-4 border border-navy/10 bg-white/70 p-4 backdrop-blur-md sm:p-5"
            style={{
              clipPath:
                "polygon(1.5% 0, 100% 0, 100% 86%, 98.5% 100%, 0 100%, 0 14%)",
            }}
            aria-live="polite"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] tracking-[0.22em] text-electric uppercase">
                {t.cube.activeFace} · {face.short}
              </p>
              <h1 className="font-display mt-1 text-xl font-semibold tracking-[-0.02em] text-navy sm:text-3xl">
                {face.title}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-navy/65 sm:text-base">
                {face.copy}
              </p>
            </div>
            <button
              type="button"
              data-hud
              onClick={() => enterFace(active)}
              className="inline-flex h-11 shrink-0 items-center bg-electric px-5 text-[0.7rem] tracking-[0.16em] text-white uppercase transition hover:bg-navy"
            >
              {t.cube.enterFace}
            </button>
          </div>

          <nav
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={t.cube.facesNav}
          >
            {FACE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                data-hud
                onClick={() => snapTo(id)}
                onDoubleClick={() => enterFace(id)}
                className={cn(
                  "h-9 shrink-0 px-3 text-[0.65rem] tracking-[0.14em] uppercase transition",
                  active === id
                    ? "bg-navy text-white"
                    : "bg-white/55 text-navy/60 backdrop-blur-sm hover:bg-white hover:text-navy",
                )}
                aria-current={active === id ? "true" : undefined}
              >
                {t.faces[id].short}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <CubeExitPortal
        active={Boolean(exiting)}
        faceId={exiting ?? active}
        label={exiting ? t.faces[exiting].short : face.short}
        enteringLabel={t.cube.entering}
      />
    </div>
  );
}

function nearestFace(x: number, y: number): CubeFaceId {
  let ny = ((y % 360) + 360) % 360;
  if (ny > 180) ny -= 360;

  if (x < -40) return "method";
  if (x > 40) return "contact";

  const candidates: { id: CubeFaceId; y: number }[] = [
    { id: "software", y: 0 },
    { id: "websites", y: -90 },
    { id: "automation", y: 180 },
    { id: "services", y: 90 },
  ];

  let best: CubeFaceId = "software";
  let bestDist = Infinity;
  for (const c of candidates) {
    let d = Math.abs(ny - c.y);
    if (d > 180) d = 360 - d;
    if (c.id === "automation") d = Math.min(d, Math.abs(ny - -180));
    if (d < bestDist) {
      bestDist = d;
      best = c.id;
    }
  }
  return best;
}
