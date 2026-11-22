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
import { CubeExitPortal } from "@/components/cube-portal";
import { IsoGrid } from "@/components/iso-grid";
import { SiteHeader } from "@/components/site-header";
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
  /** CSS transform transition only while snapping — never during idle rAF spin (breaks Safari). */
  const [snapAnimating, setSnapAnimating] = useState(false);
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
  const snapTimer = useRef<number | null>(null);
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
      // Fixed center band: ignore side HUD width so the cube area stays stable.
      const sideReserve = window.innerWidth >= 768 ? 360 : 168;
      const usableW = Math.max(window.innerWidth - sideReserve, 200);
      const usableH = window.innerHeight * 0.72;
      const edge = Math.min(usableW, usableH);
      setSize(Math.round(Math.min(Math.max(edge * 0.78, 200), 420)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const tick = () => {
      // Skip while a snap CSS transition is running (idle ref is false then too).
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
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
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
    setSnapAnimating(true);
    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      setSnapAnimating(false);
      snapTimer.current = null;
    }, reduceMotion.current ? 0 : 560);
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
  const activeIndex = Math.max(0, FACE_ORDER.indexOf(active));
  const [hudIn, setHudIn] = useState(false);
  const [stageLive, setStageLive] = useState(true);
  const [railOpen, setRailOpen] = useState(false);
  const prevFaceIndex = useRef(activeIndex);
  const [dossierDir, setDossierDir] = useState<"next" | "prev">("next");

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHudIn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const prev = prevFaceIndex.current;
    setDossierDir(activeIndex >= prev ? "next" : "prev");
    prevFaceIndex.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const syncNavOffset = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const h = header ? Math.ceil(header.getBoundingClientRect().height) : 76;
      stageRef.current?.style.setProperty("--cube-nav-offset", `${h}px`);
    };

    const sync = () => {
      const live = window.scrollY < window.innerHeight * 0.72;
      setStageLive(live);
      idle.current = live && !drag.current;
      if (!live) setRailOpen(false);
      syncNavOffset();
    };
    sync();

    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const ro =
      header && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncNavOffset)
        : null;
    if (header && ro) ro.observe(header);

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!railOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRailOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [railOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setRailOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    {/* Keeps page flow while the cube stage stays fixed in the viewport */}
    <div className="h-[100svh] w-full" aria-hidden="true" />
    {/* Outside #cube so nav/menu aren't trapped in the stage stacking context */}
    <SiteHeader
      locale={locale}
      t={t}
      tone="light"
      logoHref={`/${locale}#cube`}
      priority
      hud={stageLive}
    />
    <div
      id="cube"
      ref={stageRef}
      data-nav-tone="light"
      className={cn(
        "fixed inset-0 z-10 h-[100svh] w-full overflow-hidden bg-surface",
        stageLive
          ? dragging
            ? "cursor-grabbing touch-none"
            : "cursor-grab touch-pan-y"
          : "pointer-events-none",
      )}
      onPointerDown={stageLive ? onPointerDown : undefined}
      onPointerMove={stageLive ? onPointerMove : undefined}
      onPointerUp={stageLive ? onPointerUp : undefined}
      onPointerCancel={stageLive ? onPointerUp : undefined}
      role="application"
      aria-label={t.cube.dragAria}
      aria-hidden={stageLive ? undefined : true}
    >

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          stageLive ? "opacity-100" : "opacity-0",
        )}
      >
      <IsoGrid />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_56_248_/_0.12),transparent_55%),linear-gradient(160deg,rgb(247_248_251)_0%,rgb(230_235_245)_100%)]" />

      {/* Fixed center stage — cube stays locked in the middle band */}
      <div
        className={cn(
          "absolute inset-x-[min(22vw,11rem)] top-[12%] bottom-[14%] flex items-center justify-center sm:inset-x-[min(26vw,14rem)] sm:top-[10%] sm:bottom-[12%]",
          "transition duration-700",
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
              WebkitTransformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
              // Idle spin is rAF; a standing CSS transition fights every tick on iOS Safari.
              transition: dragging
                ? "none"
                : exiting
                  ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : snapAnimating
                    ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
                    : "none",
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
          className="pointer-events-none absolute bottom-[18%] start-1/2 h-12 w-[42%] -translate-x-1/2 rounded-[100%] bg-navy/25 blur-2xl rtl:translate-x-1/2"
        />
      </div>

      {/* Hint — floats low-center, never a bar across the cube */}
      {hint && (
        <p
          data-hud
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 text-center text-[0.62rem] tracking-[0.2em] text-navy/40 uppercase transition duration-700 sm:bottom-8",
            hudIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {t.cube.hint}
        </p>
      )}

      {railOpen ? (
        <button
          type="button"
          data-hud
          className="cube-rail-scrim absolute inset-x-0 bottom-0 z-30 bg-navy/30 backdrop-blur-[2px] lg:hidden"
          style={{ top: "var(--cube-nav-offset, 4.75rem)" }}
          aria-label={t.cube.facesClose}
          onClick={() => setRailOpen(false)}
        />
      ) : null}

      {/* Big screens: same bottom tab strip as inside a face */}
      <nav
        data-hud
        className={cn(
          "pointer-events-auto absolute inset-x-0 bottom-0 z-40 hidden gap-1.5 overflow-x-auto bg-gradient-to-t from-surface via-surface/80 to-transparent px-4 pt-10 pb-3 [scrollbar-width:none] lg:flex sm:gap-2 sm:px-5 sm:pb-4 [&::-webkit-scrollbar]:hidden",
          hudIn ? "opacity-100" : "opacity-0",
        )}
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
              "h-8 shrink-0 border px-2.5 text-[0.58rem] leading-8 tracking-[0.14em] uppercase backdrop-blur-md transition sm:px-3",
              id === active
                ? "border-electric bg-electric text-white"
                : "border-navy/15 bg-white/75 text-navy/50 hover:border-navy/30 hover:text-navy",
            )}
            aria-current={id === active ? "true" : undefined}
          >
            {t.faces[id].short}
          </button>
        ))}
      </nav>

      {/* Small screens: drawer + ear */}
      <aside
        id="cube-face-rail"
        data-hud
        className={cn(
          "cube-hud-slider cube-hud-slider-left absolute start-0 top-[25%] z-40 flex items-stretch lg:hidden",
          railOpen ? "is-drawer-open" : "is-drawer-closed",
          hudIn && "is-in",
        )}
        aria-label={t.cube.facesNav}
      >
        <div className="cube-hud-slider-shell relative flex w-[min(7.25rem,48vw)] flex-col overflow-hidden rounded-none border border-navy/10 border-e-0 bg-white/85 backdrop-blur-md sm:w-[7.75rem]">
          <div className="flex items-center border-b border-navy/10 px-2.5 py-2">
            <p className="text-[0.52rem] tracking-[0.16em] text-electric uppercase">
              {t.cube.facesNav}
            </p>
          </div>
          <nav
            className="flex flex-col gap-1.5 p-2.5"
            aria-label={t.cube.facesNav}
          >
            {FACE_ORDER.map((id, index) => (
              <button
                key={id}
                type="button"
                data-hud
                onClick={() => {
                  snapTo(id);
                  setRailOpen(false);
                }}
                onDoubleClick={() => enterFace(id)}
                style={{
                  transitionDelay: railOpen ? `${90 + index * 40}ms` : "0ms",
                }}
                className={cn(
                  "cube-hud-rail-item h-8 w-full border px-2.5 text-center text-[0.58rem] leading-8 tracking-[0.14em] uppercase backdrop-blur-md transition sm:px-3",
                  active === id
                    ? "border-electric bg-electric text-white"
                    : "border-navy/15 bg-white/75 text-navy/50 hover:border-navy/30 hover:text-navy",
                )}
                aria-current={active === id ? "true" : undefined}
                aria-label={t.faces[id].title}
              >
                {t.faces[id].short}
              </button>
            ))}
          </nav>
        </div>

        <button
          type="button"
          data-hud
          className="cube-rail-ear flex shrink-0 flex-col items-center justify-center gap-2 self-end border border-navy/10 border-s-0 bg-white/85 py-4 ps-2 pe-2.5 backdrop-blur-md sm:py-5 sm:pe-3"
          aria-expanded={railOpen}
          aria-controls="cube-face-rail"
          aria-label={railOpen ? t.cube.facesClose : t.cube.facesOpen}
          onClick={() => setRailOpen((open) => !open)}
        >
          <span className="font-mono text-[0.55rem] tracking-[0.14em] text-electric tabular-nums">
            0{activeIndex + 1}
          </span>
          <span className="cube-rail-tab-label text-[0.58rem] font-semibold tracking-[0.22em] text-navy uppercase">
            {face.short}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "leading-none",
              railOpen ? "text-[0.95rem] text-navy/55" : "text-electric/80",
            )}
          >
            {railOpen ? "×" : "›"}
          </span>
        </button>
      </aside>

      {/* Right slider — active face dossier */}
      <aside
        data-hud
        className={cn(
          "cube-hud-slider cube-hud-slider-right absolute bottom-[max(4.25rem,env(safe-area-inset-bottom))] z-20",
          "inset-x-3 w-auto",
          "md:inset-x-auto md:start-auto md:end-5 md:bottom-8 md:w-[19rem] lg:end-7 lg:w-[20rem]",
          hudIn && "is-in",
        )}
        aria-live="polite"
      >
        <div className="cube-hud-slider-shell overflow-hidden rounded-none border border-navy/10 bg-white/70 backdrop-blur-md">
          <div
            key={active}
            className={cn(
              "cube-face-dossier rounded-none p-4 sm:p-5",
              dossierDir === "next"
                ? "cube-dossier-slide-next"
                : "cube-dossier-slide-prev",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.58rem] tracking-[0.22em] text-electric uppercase sm:text-[0.62rem]">
                {t.cube.activeFace}
              </p>
              <p className="font-mono text-[0.58rem] tracking-[0.12em] text-navy/40 tabular-nums">
                0{activeIndex + 1}
                <span className="text-navy/20"> / </span>
                0{FACE_ORDER.length}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="cube-dossier-meter mt-3 h-px overflow-hidden bg-navy/10"
            >
              <span
                className="cube-dossier-meter-fill block h-full bg-electric"
                style={{
                  width: `${((activeIndex + 1) / FACE_ORDER.length) * 100}%`,
                }}
              />
            </div>
            <h1 className="font-display mt-3 text-xl font-semibold tracking-[-0.02em] text-navy sm:text-2xl">
              {face.title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-navy/65">
              {face.copy}
            </p>
            <button
              type="button"
              data-hud
              onClick={() => enterFace(active)}
              className="group mt-4 inline-flex h-11 w-full items-center justify-between gap-3 bg-electric px-4 text-[0.68rem] tracking-[0.16em] text-white uppercase transition hover:bg-navy"
            >
              <span>{t.cube.enterFace}</span>
              <span
                aria-hidden="true"
                className="transition duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </aside>

      </div>

      <CubeExitPortal
        active={Boolean(exiting)}
        faceId={exiting ?? active}
        label={exiting ? t.faces[exiting].short : face.short}
        enteringLabel={t.cube.entering}
      />
    </div>
    </>
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
