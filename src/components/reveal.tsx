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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReady(true);
      setInView(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    if (rect.top < vh * 0.92 && rect.bottom > vh * 0.08) {
      setInView(true);
    }
    setReady(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
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
