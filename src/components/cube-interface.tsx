"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  CUBE_FACES,
  FACE_ORDER,
  FACE_ROTATIONS,
  type CubeFaceId,
} from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

const SIZE = 220;
const HALF = SIZE / 2;

const FACE_TRANSFORMS: Record<CubeFaceId, string> = {
  software: `rotateY(0deg) translateZ(${HALF}px)`,
  websites: `rotateY(90deg) translateZ(${HALF}px)`,
  automation: `rotateY(180deg) translateZ(${HALF}px)`,
  services: `rotateY(-90deg) translateZ(${HALF}px)`,
  method: `rotateX(90deg) translateZ(${HALF}px)`,
  contact: `rotateX(-90deg) translateZ(${HALF}px)`,
};

const TONE: Record<CubeFaceId, string> = {
  software: "bg-[linear-gradient(160deg,#0e1c48_0%,#06102b_100%)]",
  websites: "bg-[linear-gradient(145deg,#3d6dff_0%,#0038f8_55%,#001a8a_100%)]",
  automation: "bg-[linear-gradient(160deg,#163a7a_0%,#071228_100%)]",
  services: "bg-[linear-gradient(200deg,#0a1838_0%,#020612_100%)]",
  method: "bg-[linear-gradient(135deg,#5b84ff_0%,#0038f8_55%,#001f9c_100%)]",
  contact: "bg-[linear-gradient(180deg,#122044_0%,#000828_100%)]",
};

type Props = {
  className?: string;
  onFaceSelect?: (id: CubeFaceId) => void;
  initialFace?: CubeFaceId;
};

export function CubeInterface({
  className,
  onFaceSelect,
  initialFace = "software",
}: Props) {
  const start = FACE_ROTATIONS[initialFace];
  const [rot, setRot] = useState({ x: start.x - 18, y: start.y + 32 });
  const [active, setActive] = useState<CubeFaceId>(initialFace);
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
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const tick = () => {
      if (idle.current && !drag.current) {
        setRot((r) => {
          const next = { ...r, y: r.y + 0.22 };
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

  const snapTo = useCallback(
    (id: CubeFaceId, tilted = true) => {
      idle.current = false;
      setActive(id);
      const base = FACE_ROTATIONS[id];
      const next = tilted
        ? { x: base.x - 18, y: base.y + 28 }
        : { ...base };
      setRot(next);
      rotRef.current = next;
      setHint(false);
      onFaceSelect?.(id);
    },
    [onFaceSelect],
  );

  const enterFace = useCallback(
    (id: CubeFaceId) => {
      snapTo(id);
      const target = document.querySelector(CUBE_FACES[id].href);
      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 280);
      }
    },
    [snapTo],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
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
      x: Math.max(-75, Math.min(75, drag.current.rotX - dy * 0.5)),
      y: drag.current.rotY + dx * 0.5,
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
      const nearest = nearestFace(rotRef.current.x, rotRef.current.y);
      snapTo(nearest);
      window.setTimeout(() => {
        idle.current = true;
      }, 3200);
    } else {
      idle.current = true;
    }
  };

  const face = CUBE_FACES[active];

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="relative shrink-0">
          <div
            className={cn(
              "relative mx-auto touch-none select-none",
              "h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]",
              dragging ? "cursor-grabbing" : "cursor-grab",
            )}
            style={{ perspective: "1000px", perspectiveOrigin: "50% 45%" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="application"
            aria-label="Interactive Kyvelon cube. Drag to rotate. Click a face to open it."
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="relative"
                style={{
                  width: SIZE,
                  height: SIZE,
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
                      if (suppressClick.current) {
                        ev.preventDefault();
                        suppressClick.current = false;
                        return;
                      }
                      enterFace(id);
                    }}
                    className={cn(
                      "absolute flex flex-col items-center justify-center gap-2 border border-white/20 p-4 text-center text-white shadow-[inset_0_0_40px_rgb(255_255_255_/_0.06)] outline-none",
                      "focus-visible:ring-2 focus-visible:ring-white/80",
                      TONE[id],
                      active === id && "outline outline-2 outline-offset-[-2px] outline-white/50",
                    )}
                    style={{
                      width: SIZE,
                      height: SIZE,
                      left: 0,
                      top: 0,
                      transform: FACE_TRANSFORMS[id],
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    aria-pressed={active === id}
                    aria-label={`${CUBE_FACES[id].title}. Open this face.`}
                  >
                    <span className="text-[0.62rem] tracking-[0.3em] text-white/50 uppercase">
                      Face
                    </span>
                    <span className="font-display text-[1.65rem] font-semibold tracking-[0.12em] uppercase">
                      {CUBE_FACES[id].short}
                    </span>
                    <span className="max-w-[10ch] text-[0.72rem] leading-snug tracking-wide text-white/75">
                      {CUBE_FACES[id].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[20%] bottom-2 h-10 rounded-[100%] bg-navy/35 blur-2xl"
            />
          </div>

          {hint && (
            <p className="mt-2 text-center text-[0.7rem] tracking-[0.18em] text-navy/45 uppercase">
              Drag to rotate · click a face
            </p>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {FACE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => snapTo(id)}
                className={cn(
                  "h-8 px-2.5 text-[0.65rem] tracking-[0.14em] uppercase transition",
                  active === id
                    ? "bg-electric text-white"
                    : "bg-navy/5 text-navy/60 hover:bg-navy/10 hover:text-navy",
                )}
                aria-current={active === id ? "true" : undefined}
              >
                {CUBE_FACES[id].short}
              </button>
            ))}
          </div>
        </div>

        <aside
          className="w-full max-w-md border-l-2 border-electric bg-white/60 px-5 py-6 backdrop-blur-sm sm:px-7"
          aria-live="polite"
        >
          <p className="text-[0.68rem] tracking-[0.22em] text-electric uppercase">
            Active face
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.02em] text-navy sm:text-3xl">
            {face.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy/65 sm:text-[0.95rem]">
            {face.copy}
          </p>
          <button
            type="button"
            onClick={() => enterFace(active)}
            className="mt-6 inline-flex h-11 items-center bg-navy px-5 text-[0.7rem] tracking-[0.16em] text-white uppercase transition hover:bg-electric"
          >
            Enter this face
          </button>
        </aside>
      </div>
    </div>
  );
}

function nearestFace(x: number, y: number): CubeFaceId {
  let ny = ((y % 360) + 360) % 360;
  if (ny > 180) ny -= 360;
  const nx = x;

  if (nx < -40) return "method";
  if (nx > 40) return "contact";

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
    if (c.id === "automation") {
      d = Math.min(d, Math.abs(ny - -180));
    }
    if (d < bestDist) {
      bestDist = d;
      best = c.id;
    }
  }
  return best;
}
