"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** up | left | right | scale | fade */
  variant?: "up" | "left" | "right" | "scale" | "fade";
  /** delay in ms after entering view */
  delay?: number;
  /** once (default) or every time it enters */
  once?: boolean;
  as?: "div" | "li" | "article" | "p" | "h2" | "h3" | "span" | "ol" | "ul";
  style?: CSSProperties;
};

function scheduleReveal(show: () => void) {
  // Two frames: paint hidden state first so Safari actually runs the transition.
  requestAnimationFrame(() => {
    requestAnimationFrame(show);
  });
}

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  once = true,
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReady(true);
      setInView(true);
      shown.current = true;
      return;
    }

    const show = () => {
      if (shown.current && once) return;
      shown.current = true;
      setInView(true);
    };

    setReady(true);

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    if (rect.top < vh * 0.94 && rect.bottom > vh * 0.02) {
      scheduleReveal(show);
    }

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            scheduleReveal(show);
            if (once) io?.disconnect();
          } else if (!once) {
            shown.current = false;
            setInView(false);
          }
        },
        // Pixel rootMargin — % margins are unreliable on WebKit.
        { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
      );
      io.observe(el);
    } catch {
      scheduleReveal(show);
    }

    // Never leave content stuck at opacity 0 if IO never fires (iOS quirk).
    const failsafe = window.setTimeout(() => scheduleReveal(show), 2200);

    return () => {
      io?.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "story-reveal",
        `story-reveal-${variant}`,
        ready && "is-ready",
        inView && "is-in",
        className,
      )}
      style={
        {
          ...style,
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
