export function IsoGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="animate-grid-drift absolute -inset-[20%] opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgb(0 56 248 / 0.22) 49%, rgb(0 56 248 / 0.22) 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, rgb(6 16 43 / 0.14) 49%, rgb(6 16 43 / 0.14) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgb(0 56 248 / 0.08) 49%, rgb(0 56 248 / 0.08) 51%, transparent 52%)
          `,
          backgroundSize: "80px 46px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgb(243_245_248_/_0.92)_78%)]" />
    </div>
  );
}
