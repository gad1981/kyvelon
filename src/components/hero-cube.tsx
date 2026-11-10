export function HeroCube() {
  return (
    <div className="relative mx-auto flex aspect-square w-[min(86vw,460px)] items-center justify-center">
      {/* Stable isometric cube — always visible, no WebGL */}
      <svg
        viewBox="0 0 420 420"
        className="animate-float-y iso-shadow absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d78ff" />
            <stop offset="55%" stopColor="#0038f8" />
            <stop offset="100%" stopColor="#001f9c" />
          </linearGradient>
          <linearGradient id="leftFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#142044" />
            <stop offset="100%" stopColor="#06102b" />
          </linearGradient>
          <linearGradient id="rightFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4dff" />
            <stop offset="100%" stopColor="#001a66" />
          </linearGradient>
        </defs>
        {/* soft ground shadow */}
        <ellipse cx="210" cy="360" rx="118" ry="18" fill="#06102b" opacity="0.18" />
        {/* cube body */}
        <g className="origin-center animate-[cube-yaw_14s_ease-in-out_infinite]">
          <path d="M210 78 L330 148 L210 218 L90 148 Z" fill="url(#topFace)" />
          <path d="M90 148 L210 218 L210 338 L90 268 Z" fill="url(#leftFace)" />
          <path d="M210 218 L330 148 L330 268 L210 338 Z" fill="url(#rightFace)" />
          {/* edge highlights */}
          <path
            d="M210 78 L330 148 L210 218 L90 148 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />
          <path
            d="M210 218 L210 338"
            stroke="#ffffff"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />
          {/* face labels */}
          <text
            x="210"
            y="155"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontFamily="var(--font-display), sans-serif"
            letterSpacing="4"
            opacity="0.9"
          >
            BUILD
          </text>
          <text
            x="145"
            y="250"
            textAnchor="middle"
            fill="#c9d4ef"
            fontSize="14"
            fontFamily="var(--font-display), sans-serif"
            letterSpacing="3"
            opacity="0.85"
            transform="rotate(-28 145 250)"
          >
            SOFT
          </text>
          <text
            x="275"
            y="250"
            textAnchor="middle"
            fill="#dfe7ff"
            fontSize="14"
            fontFamily="var(--font-display), sans-serif"
            letterSpacing="3"
            opacity="0.9"
            transform="rotate(28 275 250)"
          >
            AUTO
          </text>
        </g>
      </svg>

      {/* Orbiting mini cubes for motion */}
      <div
        aria-hidden="true"
        className="animate-pulse-edge absolute top-[12%] right-[8%] h-8 w-8"
        style={{
          clipPath:
            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
          background: "linear-gradient(145deg,#2a58ff,#0038f8)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] left-[10%] h-5 w-5 opacity-70"
        style={{
          clipPath:
            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
          background: "#06102b",
        }}
      />
    </div>
  );
}
