export function HeroCube() {
  return (
    <div
      className="relative mx-auto aspect-square w-[min(78vw,420px)] [perspective:900px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[12%] animate-float-y">
        <div className="animate-cube-spin iso-shadow relative h-full w-full [transform-style:preserve-3d]">
          {/* front */}
          <div className="absolute inset-0 flex items-center justify-center border border-white/10 bg-[linear-gradient(145deg,#0a1a44_0%,#06102b_100%)] text-center text-sm font-medium tracking-[0.2em] text-white/80 uppercase [transform:translateZ(110px)] sm:text-base">
            Soft
          </div>
          {/* back */}
          <div className="absolute inset-0 border border-white/10 bg-[linear-gradient(145deg,#001a66_0%,#06102b_100%)] [transform:rotateY(180deg)_translateZ(110px)]" />
          {/* right */}
          <div className="absolute inset-0 flex items-center justify-center border border-white/10 bg-[linear-gradient(160deg,#0038f8_0%,#001a8a_100%)] text-sm font-medium tracking-[0.2em] text-white uppercase [transform:rotateY(90deg)_translateZ(110px)] sm:text-base">
            Auto
          </div>
          {/* left */}
          <div className="absolute inset-0 border border-white/5 bg-[linear-gradient(200deg,#020818_0%,#0a1638_100%)] [transform:rotateY(-90deg)_translateZ(110px)]" />
          {/* top */}
          <div className="absolute inset-0 border border-white/20 bg-[linear-gradient(135deg,#2a58ff_0%,#0038f8_55%,#001f9c_100%)] [transform:rotateX(90deg)_translateZ(110px)]" />
          {/* bottom */}
          <div className="absolute inset-0 border border-white/5 bg-[#020612] [transform:rotateX(-90deg)_translateZ(110px)]" />
        </div>
      </div>
      <div className="animate-pulse-edge absolute inset-x-[18%] bottom-[6%] h-8 rounded-[100%] bg-navy/25 blur-xl" />
    </div>
  );
}
