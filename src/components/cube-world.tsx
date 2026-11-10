"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ContactForm } from "@/components/contact-form";
import { IsoGrid } from "@/components/iso-grid";
import {
  CUBE_FACES,
  FACE_ORDER,
  FACE_ROTATIONS,
  type CubeFaceId,
} from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

const TONE: Record<CubeFaceId, string> = {
  software: "bg-[linear-gradient(160deg,#0e1c48_0%,#06102b_100%)]",
  websites: "bg-[linear-gradient(145deg,#3d6dff_0%,#0038f8_50%,#001a8a_100%)]",
  automation: "bg-[linear-gradient(160deg,#163a7a_0%,#071228_100%)]",
  services: "bg-[linear-gradient(200deg,#0a1838_0%,#020612_100%)]",
  method: "bg-[linear-gradient(135deg,#5b84ff_0%,#0038f8_55%,#001f9c_100%)]",
  contact: "bg-[linear-gradient(180deg,#122044_0%,#000828_100%)]",
};

export function CubeWorld() {
  const [size, setSize] = useState(280);
  const start = FACE_ROTATIONS.software;
  const [rot, setRot] = useState({ x: start.x - 22, y: start.y + 36 });
  const [active, setActive] = useState<CubeFaceId>("software");
  const [entered, setEntered] = useState<CubeFaceId | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(true);
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
    if (reduceMotion.current || entered) return;
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
  }, [entered]);

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
      snapTo(id);
      setEntered(id);
      idle.current = false;
    },
    [snapTo],
  );

  const exitFace = useCallback(() => {
    setEntered(null);
    window.setTimeout(() => {
      idle.current = true;
    }, 400);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && entered) exitFace();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, exitFace]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (entered || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-hud]")) return;
    idle.current = false;
    setDragging(true);
    setHint(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotRef.current.x,
      rotY: rotRef.current.y,
      moved: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
    const next = {
      x: Math.max(-78, Math.min(78, drag.current.rotX - dy * 0.45)),
      y: drag.current.rotY + dx * 0.45,
    };
    rotRef.current = next;
    setRot(next);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const wasDrag = drag.current.moved;
    suppressClick.current = wasDrag;
    drag.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
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
  };

  const face = CUBE_FACES[active];
  const open = entered ? CUBE_FACES[entered] : null;

  return (
    <div
      className={cn(
        "relative h-[100svh] w-full overflow-hidden bg-surface",
        dragging ? "cursor-grabbing" : entered ? "cursor-default" : "cursor-grab",
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="application"
      aria-label="Kyvelon cube world. Drag anywhere to rotate. Click a face to enter."
    >
      <IsoGrid />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_56_248_/_0.12),transparent_55%),linear-gradient(160deg,rgb(247_248_251)_0%,rgb(230_235_245)_100%)]" />

      {/* Full-screen cube stage */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${Math.round(size * 3.2)}px`,
          perspectiveOrigin: "50% 48%",
          opacity: entered ? 0.18 : 1,
          transform: entered ? "scale(1.35)" : "scale(1)",
          transition: "opacity 500ms ease, transform 500ms ease",
          pointerEvents: entered ? "none" : "auto",
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
                  active === id && "outline outline-2 outline-offset-[-3px] outline-white/55",
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
                aria-label={`${CUBE_FACES[id].title}. Enter this face.`}
              >
                <span className="text-[0.65rem] tracking-[0.32em] text-white/50 uppercase sm:text-[0.72rem]">
                  Face
                </span>
                <span
                  className="font-display font-semibold tracking-[0.14em] uppercase"
                  style={{ fontSize: `clamp(1.4rem, ${size * 0.09}px, 2.6rem)` }}
                >
                  {CUBE_FACES[id].short}
                </span>
                <span className="max-w-[11ch] text-[0.75rem] leading-snug tracking-wide text-white/75 sm:text-sm">
                  {CUBE_FACES[id].label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[18%] left-1/2 h-12 w-[42%] -translate-x-1/2 rounded-[100%] bg-navy/30 blur-2xl"
        />
      </div>

      {/* HUD */}
      <header
        data-hud
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-5 sm:p-7"
      >
        <Link
          href="/"
          className="pointer-events-auto block w-[132px] sm:w-[168px]"
          onClick={(e) => {
            if (entered) {
              e.preventDefault();
              exitFace();
            }
          }}
        >
          <Image
            src="/kyvelon-logo.png"
            alt="Kyvelon"
            width={1256}
            height={278}
            priority
            className="h-auto w-full"
          />
        </Link>
        <div className="pointer-events-none max-w-[14rem] text-right sm:max-w-xs">
          <p className="font-display text-lg leading-tight font-semibold tracking-[-0.03em] text-navy sm:text-2xl">
            Digital systems
            <span className="block text-electric">built as cubes.</span>
          </p>
        </div>
      </header>

      <div
        data-hud
        className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {hint && !entered && (
            <p className="text-center text-[0.68rem] tracking-[0.2em] text-navy/45 uppercase">
              Drag the screen · click a face to enter
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
                Active face · {face.short}
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
              Enter face
            </button>
          </div>

          <nav
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Cube faces"
          >
            {FACE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                data-hud
                onClick={() => {
                  if (entered) {
                    setEntered(id);
                    snapTo(id);
                  } else {
                    snapTo(id);
                  }
                }}
                className={cn(
                  "h-9 shrink-0 px-3 text-[0.65rem] tracking-[0.14em] uppercase transition",
                  active === id
                    ? "bg-navy text-white"
                    : "bg-white/55 text-navy/60 backdrop-blur-sm hover:bg-white hover:text-navy",
                )}
                aria-current={active === id ? "true" : undefined}
              >
                {CUBE_FACES[id].short}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Full-screen face room */}
      <div
        className={cn(
          "absolute inset-0 z-30 flex flex-col bg-navy text-white transition duration-500",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0",
        )}
        aria-hidden={!open}
      >
        {open && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.5) 49%, transparent 52%),
                  linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.08) 49%, transparent 52%)
                `,
                backgroundSize: "72px 42px",
              }}
            />
            <div className="relative flex items-center justify-between gap-4 p-5 sm:p-7">
              <button
                type="button"
                onClick={exitFace}
                className="inline-flex h-10 items-center border border-white/20 px-4 text-[0.68rem] tracking-[0.16em] uppercase transition hover:border-electric hover:text-electric-soft"
              >
                ← Back to cube
              </button>
              <p className="text-[0.68rem] tracking-[0.22em] text-electric-soft uppercase">
                Face · {open.short}
              </p>
            </div>
            <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 pb-16 sm:px-8">
              <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
                {open.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
                {open.copy}
              </p>
              <ul className="mt-8 space-y-3 border-l border-electric/50 pl-5">
                {open.detail.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-white/75 sm:text-base">
                    {line.includes("georgegad.com") ? (
                      <>
                        Led by George Gad ·{" "}
                        <Link
                          href="https://georgegad.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-electric-soft underline underline-offset-4"
                        >
                          georgegad.com
                        </Link>{" "}
                        · Athens, Greece.
                      </>
                    ) : line.includes("@") ? (
                      <a
                        href={`mailto:${line}`}
                        className="hover:text-electric-soft"
                      >
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
              {open.id === "contact" && (
                <div className="mt-10 max-w-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
                  <ContactForm />
                </div>
              )}
              {open.id !== "contact" && (
                <button
                  type="button"
                  onClick={() => {
                    snapTo("contact");
                    setEntered("contact");
                  }}
                  className="mt-10 inline-flex h-12 w-fit items-center bg-electric px-6 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:bg-white hover:text-navy"
                >
                  Brief this face
                </button>
              )}
            </div>
          </>
        )}
      </div>
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
