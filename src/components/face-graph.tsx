"use client";

import type { ReactNode } from "react";
import type { CubeFaceId } from "@/lib/cube-faces";
import { cn } from "@/lib/utils";

type FaceGraphProps = {
  faceId: CubeFaceId;
  title: string;
  labels: string[];
  hubLabel?: string;
  className?: string;
  /** Flush to a cube wall — no card chrome */
  onWall?: boolean;
};

function Frame({
  title,
  children,
  className,
  onWall = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  onWall?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        onWall
          ? "h-full w-full bg-transparent"
          : "aspect-square w-full max-w-[420px] shrink-0 border border-electric/40 bg-[#06102b]/55 shadow-[0_0_60px_rgb(0_56_248_/_0.22)]",
        className,
      )}
      role="img"
      aria-label={title}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          onWall ? "opacity-25" : "opacity-40",
        )}
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: onWall ? "36px 36px" : "28px 28px",
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="relative z-[1] h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fg-electric" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a58ff" />
            <stop offset="100%" stopColor="#0038f8" />
          </linearGradient>
          <filter id="fg-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  );
}

function NodeBox({
  x,
  y,
  w = 84,
  h = 44,
  label,
  delay = "0s",
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  delay?: string;
  accent?: boolean;
}) {
  return (
    <g className="fg-rise" style={{ animationDelay: delay }}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill={accent ? "rgb(0 56 248 / 0.55)" : "rgb(6 16 43 / 0.75)"}
        stroke={accent ? "#7aa0ff" : "rgb(255 255 255 / 0.35)"}
        strokeWidth={accent ? 2 : 1.5}
        filter={accent ? "url(#fg-glow)" : undefined}
        className={accent ? "fg-pulse" : undefined}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontFamily="var(--font-display), ui-sans-serif, system-ui"
        letterSpacing="0.12em"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function HubBox({
  x,
  y,
  w,
  h,
  lines,
  delay = "0.4s",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  delay?: string;
}) {
  const lineStart = y - ((lines.length - 1) * 18) / 2 + 4;
  return (
    <g className="fg-rise" style={{ animationDelay: delay }}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill="rgb(0 56 248 / 0.55)"
        stroke="#7aa0ff"
        strokeWidth="2"
        filter="url(#fg-glow)"
        className="fg-pulse"
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x={x}
          y={lineStart + i * 18}
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontFamily="var(--font-display), ui-sans-serif, system-ui"
          letterSpacing="0.14em"
        >
          {line.toUpperCase()}
        </text>
      ))}
    </g>
  );
}

/** Path `d` by FlowPath id — used instead of SMIL <animateMotion> (unsupported in Safari). */
const PACKET_PATHS: Record<string, string> = {
  "sw-a": "M110 280 C110 230, 110 200, 110 170",
  "sw-b": "M200 280 C200 230, 200 200, 200 170",
  "sw-c": "M290 280 C290 230, 290 200, 290 170",
  "sw-hub-c": "M200 148 C200 130, 200 115, 200 100",
  "web-a": "M90 110 C120 150, 150 190, 175 230",
  "web-b": "M200 110 C200 150, 200 190, 200 230",
  "web-c": "M310 110 C280 150, 250 190, 225 230",
  "web-out": "M200 268 C200 290, 200 305, 200 318",
  "fg-flow-a": "M100 110 C140 110, 160 70, 180 70",
  "fg-flow-b": "M220 70 C260 70, 280 130, 300 130",
  "fg-flow-c": "M200 92 C200 140, 200 190, 200 232",
  "sv-a": "M100 100 C140 130, 170 160, 190 210",
  "sv-b": "M300 100 C260 130, 230 160, 210 210",
  "sv-c": "M200 120 C200 150, 200 180, 200 215",
  "sv-loop": "M120 300 C150 330, 250 330, 280 300",
  "md-a": "M100 120 C140 140, 170 170, 190 210",
  "md-b": "M300 120 C260 140, 230 170, 210 210",
  "md-c": "M200 150 C200 170, 200 190, 200 215",
  "ct-a": "M200 78 C200 110, 200 140, 200 168",
  "ct-b": "M318 250 C280 235, 245 215, 220 200",
  "ct-c": "M82 250 C120 235, 155 215, 180 200",
  "ct-loop": "M200 55 A145 145 0 1 1 199.9 55",
};

function Packet({
  pathId,
  path,
  color,
  dur,
  begin,
}: {
  pathId?: string;
  path?: string;
  color: string;
  dur: string;
  begin: string;
}) {
  const d = path ?? (pathId ? PACKET_PATHS[pathId] : undefined);
  if (!d) return null;
  return (
    <circle
      r="5"
      fill={color}
      filter="url(#fg-glow)"
      className="safari-path-packet"
      style={{
        offsetPath: `path('${d}')`,
        animationDuration: dur,
        animationDelay: begin,
      }}
    />
  );
}

function FlowPath({
  id,
  d,
  strong = false,
  dashed = false,
  delay = "0s",
}: {
  id: string;
  d: string;
  strong?: boolean;
  dashed?: boolean;
  delay?: string;
}) {
  return (
    <path
      id={id}
      d={d}
      fill="none"
      stroke={
        dashed
          ? "rgb(255 255 255 / 0.25)"
          : strong
            ? "rgb(0 56 248 / 0.85)"
            : "rgb(42 88 255 / 0.55)"
      }
      strokeWidth={strong ? 2.5 : 2}
      strokeDasharray={dashed ? "5 7" : undefined}
      className={dashed ? "fg-dash" : "fg-draw"}
      style={{ animationDelay: delay }}
    />
  );
}

/** Architecture → UX → Scale pipeline into a living platform core */
function SoftwareGraph({ labels }: { labels: string[] }) {
  return (
    <>
      <FlowPath id="sw-a" d="M110 280 C110 230, 110 200, 110 170" delay="0s" />
      <FlowPath
        id="sw-b"
        d="M200 280 C200 230, 200 200, 200 170"
        delay="0.1s"
      />
      <FlowPath
        id="sw-c"
        d="M290 280 C290 230, 290 200, 290 170"
        delay="0.2s"
      />
      <FlowPath
        id="sw-hub"
        d="M110 148 C140 120, 170 100, 200 100"
        strong
        delay="0.25s"
      />
      <FlowPath
        id="sw-hub-b"
        d="M290 148 C260 120, 230 100, 200 100"
        dashed
        delay="0.35s"
      />
      <FlowPath
        id="sw-hub-c"
        d="M200 148 C200 130, 200 115, 200 100"
        strong
        delay="0.3s"
      />

      <Packet pathId="sw-a" color="#2a58ff" dur="2.2s" begin="0.2s" />
      <Packet pathId="sw-b" color="#7aa0ff" dur="2.4s" begin="0.7s" />
      <Packet pathId="sw-c" color="white" dur="2.6s" begin="1.1s" />
      <Packet pathId="sw-hub-c" color="#2a58ff" dur="1.8s" begin="0.5s" />

      <NodeBox x={110} y={300} label={labels[0] ?? ""} delay="0s" />
      <NodeBox x={200} y={300} label={labels[1] ?? ""} delay="0.12s" />
      <NodeBox x={290} y={300} label={labels[2] ?? ""} delay="0.24s" />

      <NodeBox x={110} y={148} label="CORE" delay="0.3s" w={72} h={40} />
      <NodeBox x={200} y={148} label="API" delay="0.36s" w={72} h={40} />
      <NodeBox x={290} y={148} label="DATA" delay="0.42s" w={72} h={40} />

      <HubBox x={200} y={70} w={160} h={48} lines={["Platform"]} delay="0.5s" />
    </>
  );
}

/** Channels → System → Convert funnel with traffic packets */
function WebsitesGraph({ labels }: { labels: string[] }) {
  return (
    <>
      {/* browser frame */}
      <rect
        x="48"
        y="40"
        width="304"
        height="320"
        fill="rgb(255 255 255 / 0.03)"
        stroke="rgb(255 255 255 / 0.2)"
        strokeWidth="1.5"
      />
      <rect x="48" y="40" width="304" height="26" fill="rgb(0 56 248 / 0.4)" />
      <circle cx="68" cy="53" r="4" fill="rgb(255 255 255 / 0.45)" />
      <circle cx="84" cy="53" r="4" fill="rgb(255 255 255 / 0.3)" />
      <circle cx="100" cy="53" r="4" fill="rgb(255 255 255 / 0.2)" />

      <FlowPath
        id="web-a"
        d="M90 110 C120 150, 150 190, 175 230"
        delay="0s"
      />
      <FlowPath
        id="web-b"
        d="M200 110 C200 150, 200 190, 200 230"
        strong
        delay="0.1s"
      />
      <FlowPath
        id="web-c"
        d="M310 110 C280 150, 250 190, 225 230"
        delay="0.2s"
      />
      <FlowPath
        id="web-out"
        d="M200 268 C200 290, 200 305, 200 318"
        dashed
        delay="0.35s"
      />

      <Packet pathId="web-a" color="#2a58ff" dur="2.3s" begin="0.3s" />
      <Packet pathId="web-b" color="white" dur="2.1s" begin="0.8s" />
      <Packet pathId="web-c" color="#7aa0ff" dur="2.5s" begin="1.2s" />
      <Packet pathId="web-out" color="#2a58ff" dur="1.6s" begin="0.6s" />

      <NodeBox x={90} y={100} label={labels[0] ?? ""} delay="0s" w={90} />
      <NodeBox x={200} y={100} label={labels[1] ?? ""} delay="0.12s" w={90} />
      <NodeBox x={310} y={100} label={labels[2] ?? ""} delay="0.24s" w={90} />

      <HubBox
        x={200}
        y={255}
        w={150}
        h={48}
        lines={["Convert"]}
        delay="0.4s"
      />
      <circle
        cx="200"
        cy="330"
        r="8"
        fill="#2a58ff"
        filter="url(#fg-glow)"
        className="fg-blink"
      />
    </>
  );
}

function AutomationGraph({
  labels,
  hubLabel = "Agentic marketing",
}: {
  labels: string[];
  hubLabel?: string;
}) {
  const hubLines = hubLabel.toUpperCase().split(" ");

  return (
    <>
      <FlowPath
        id="fg-flow-a"
        d="M100 110 C140 110, 160 70, 180 70"
        delay="0s"
      />
      <FlowPath
        id="fg-flow-b"
        d="M220 70 C260 70, 280 130, 300 130"
        delay="0.15s"
      />
      <FlowPath
        id="fg-flow-c"
        d="M200 92 C200 140, 200 190, 200 232"
        strong
        delay="0.3s"
      />
      <FlowPath
        id="fg-flow-d"
        d="M100 132 C120 200, 160 240, 160 255"
        dashed
        delay="0.35s"
      />
      <FlowPath
        id="fg-flow-e"
        d="M300 150 C280 200, 240 240, 240 255"
        dashed
        delay="0.4s"
      />

      <Packet
        path="M100 110 C140 110, 160 70, 180 70"
        color="#2a58ff"
        dur="2.4s"
        begin="0.4s"
      />
      <Packet
        path="M220 70 C260 70, 280 130, 300 130"
        color="#7aa0ff"
        dur="2.4s"
        begin="1.1s"
      />
      <Packet
        path="M200 92 C200 140, 200 190, 200 232"
        color="white"
        dur="2.8s"
        begin="0.8s"
      />

      <NodeBox x={80} y={110} label={labels[0] ?? ""} delay="0.1s" />
      <NodeBox x={200} y={70} label={labels[1] ?? ""} delay="0.22s" />
      <NodeBox x={320} y={130} label={labels[2] ?? ""} delay="0.34s" />

      <HubBox
        x={200}
        y={280}
        w={184}
        h={64}
        lines={hubLines}
        delay="0.45s"
      />
    </>
  );
}

/** Strategy / Channels / Delivery locking into commercial results */
function ServicesGraph({
  labels,
  hubLabel = "Results",
}: {
  labels: string[];
  hubLabel?: string;
}) {
  const hubLines = hubLabel.toUpperCase().split(" ");

  return (
    <>
      <FlowPath
        id="sv-a"
        d="M100 100 C140 130, 170 160, 190 210"
        delay="0s"
      />
      <FlowPath
        id="sv-b"
        d="M300 100 C260 130, 230 160, 210 210"
        delay="0.12s"
      />
      <FlowPath
        id="sv-c"
        d="M200 120 C200 150, 200 180, 200 215"
        strong
        delay="0.2s"
      />
      <FlowPath
        id="sv-loop"
        d="M120 300 C150 330, 250 330, 280 300"
        dashed
        delay="0.35s"
      />

      <Packet pathId="sv-a" color="#2a58ff" dur="2.3s" begin="0.3s" />
      <Packet pathId="sv-b" color="#7aa0ff" dur="2.3s" begin="0.9s" />
      <Packet pathId="sv-c" color="white" dur="2s" begin="0.6s" />
      <Packet pathId="sv-loop" color="#2a58ff" dur="2.8s" begin="1.2s" />

      <NodeBox x={100} y={90} label={labels[0] ?? ""} delay="0s" w={110} />
      <NodeBox x={300} y={90} label={labels[1] ?? ""} delay="0.12s" w={110} />
      <NodeBox x={200} y={110} label={labels[2] ?? ""} delay="0.24s" w={110} />

      <HubBox
        x={200}
        y={260}
        w={150}
        h={56}
        lines={hubLines}
        delay="0.4s"
      />

      <circle
        cx="200"
        cy="330"
        r="7"
        fill="#2a58ff"
        filter="url(#fg-glow)"
        className="fg-blink"
      />
    </>
  );
}

/** Structure → Faces → Assemble with packets locking the cube */
function MethodGraph({ labels }: { labels: string[] }) {
  return (
    <>
      <FlowPath
        id="md-a"
        d="M100 120 C140 140, 170 170, 190 210"
        delay="0s"
      />
      <FlowPath
        id="md-b"
        d="M300 120 C260 140, 230 170, 210 210"
        delay="0.15s"
      />
      <FlowPath
        id="md-c"
        d="M200 150 C200 170, 200 190, 200 215"
        strong
        delay="0.25s"
      />

      <Packet pathId="md-a" color="#2a58ff" dur="2.3s" begin="0.3s" />
      <Packet pathId="md-b" color="#7aa0ff" dur="2.3s" begin="0.9s" />
      <Packet pathId="md-c" color="white" dur="2s" begin="0.6s" />

      <NodeBox x={100} y={100} label={labels[0] ?? ""} delay="0s" w={100} />
      <NodeBox x={300} y={100} label={labels[1] ?? ""} delay="0.15s" w={100} />
      <NodeBox x={200} y={130} label="LOCK" delay="0.25s" w={72} h={36} />

      {/* living assembled cube */}
      <g className="fg-pulse" style={{ transformOrigin: "200px 280px" }}>
        <path
          d="M140 250 L200 220 L260 250 L200 280 Z"
          fill="rgb(42 88 255 / 0.55)"
          stroke="white"
          strokeWidth="1.5"
          filter="url(#fg-glow)"
        />
        <path
          d="M140 250 L140 300 L200 330 L200 280 Z"
          fill="rgb(0 56 248 / 0.75)"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M200 280 L200 330 L260 300 L260 250 Z"
          fill="rgb(6 16 43 / 0.9)"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>

      <HubBox
        x={200}
        y={360}
        w={160}
        h={40}
        lines={[labels[2] ?? "Assemble"]}
        delay="0.4s"
      />
    </>
  );
}

/** Brief → Reply → Build signal loop into the cube */
function ContactGraph({ labels }: { labels: string[] }) {
  return (
    <>
      {[55, 95, 135, 175].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="rgb(42 88 255 / 0.28)"
          strokeWidth="1.5"
          className="fg-ring"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      <FlowPath
        id="ct-a"
        d="M200 78 C200 110, 200 140, 200 168"
        strong
        delay="0s"
      />
      <FlowPath
        id="ct-b"
        d="M318 250 C280 235, 245 215, 220 200"
        delay="0.1s"
      />
      <FlowPath
        id="ct-c"
        d="M82 250 C120 235, 155 215, 180 200"
        delay="0.2s"
      />
      <path
        id="ct-loop"
        d="M200 55 A145 145 0 1 1 199.9 55"
        fill="none"
        stroke="rgb(42 88 255 / 0.18)"
        strokeWidth="1"
      />

      <Packet pathId="ct-a" color="white" dur="2s" begin="0.2s" />
      <Packet pathId="ct-b" color="#2a58ff" dur="2.3s" begin="0.7s" />
      <Packet pathId="ct-c" color="#7aa0ff" dur="2.3s" begin="1.2s" />
      <Packet pathId="ct-loop" color="#2a58ff" dur="5.5s" begin="0s" />

      <NodeBox x={200} y={70} label={labels[0] ?? ""} delay="0s" />
      <NodeBox x={330} y={250} label={labels[1] ?? ""} delay="0.12s" />
      <NodeBox x={70} y={250} label={labels[2] ?? ""} delay="0.24s" />

      <g className="fg-pulse" style={{ transformOrigin: "200px 200px" }}>
        <path
          d="M170 185 L200 160 L230 185 L230 225 L200 250 L170 225 Z"
          fill="url(#fg-electric)"
          stroke="white"
          strokeWidth="1.5"
          filter="url(#fg-glow)"
        />
      </g>
    </>
  );
}

const GRAPH: Record<
  CubeFaceId,
  (props: { labels: string[]; hubLabel?: string }) => ReactNode
> = {
  software: SoftwareGraph,
  websites: WebsitesGraph,
  automation: AutomationGraph,
  services: ServicesGraph,
  method: MethodGraph,
  contact: ContactGraph,
};

export function FaceGraph({
  faceId,
  title,
  labels,
  hubLabel,
  className,
  onWall = false,
}: FaceGraphProps) {
  const Viz = GRAPH[faceId];

  return (
    <Frame
      title={title}
      onWall={onWall}
      className={cn(!onWall && "animate-face-in", className)}
    >
      <Viz labels={labels} hubLabel={hubLabel} />
    </Frame>
  );
}
