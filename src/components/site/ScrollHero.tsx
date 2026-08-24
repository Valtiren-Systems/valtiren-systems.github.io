"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/content";

/**
 * The reference hero is a 250vh scroll track with a sticky 100vh stage.
 * Scroll progress (0 → 1) drives one thing: the screen content starts
 * full-bleed and shrinks back into the display mounted in the room, while
 * the room itself pushes in from an oversized scale and the headline
 * lifts away.
 *
 * Progress is written to a CSS custom property so every transform is a
 * compositor-only interpolation — no per-frame React renders.
 */
export default function ScrollHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const raw = distance > 0 ? -rect.top / distance : 0;
      const p = Math.min(1, Math.max(0, raw));
      // Ease-out so the display settles rather than snapping.
      const eased = 1 - Math.pow(1 - p, 2);
      stage.style.setProperty("--p", eased.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} id="top" className="relative h-[250vh] bg-black">
      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ ["--p" as string]: 0 }}
      >
        {/* ---- Room plate: swap for /public/hero-room.jpg ---- */}
        <div
          className="absolute inset-0 origin-center"
          style={{
            transform: "scale(calc(1.45 - 0.45 * var(--p)))",
            transition: "transform 60ms linear",
          }}
        >
          <RoomPlate />
        </div>

        {/* ---- Screen content: full-bleed → seated in the display ---- */}
        <div
          className="absolute z-20 overflow-hidden bg-black"
          style={{
            // Interpolates from the full viewport to the display's rect.
            left: "calc(0% + 27.5% * var(--p))",
            top: "calc(0% + 20% * var(--p))",
            width: "calc(100% - 55% * var(--p))",
            height: "calc(100% - 58% * var(--p))",
            borderRadius: "calc(0px + 6px * var(--p))",
            boxShadow: "0 0 calc(60px * var(--p)) rgba(103,30,255,0.35)",
            transition: "all 60ms linear",
          }}
        >
          <ScreenContent />
        </div>

        {/* ---- Headline overlay: fades out as the display seats ---- */}
        <div
          className="pointer-events-none absolute inset-0 z-30 grid place-items-center px-6 text-center"
          style={{
            opacity: "calc(1 - var(--p) * 2.4)",
            transform: "translateY(calc(var(--p) * -60px))",
          }}
        >
          <div className="max-w-[1000px]">
            <p className="eyebrow text-lime">{HERO.eyebrow}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,6.6vw,6.5rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
              {HERO.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-[clamp(1rem,1.6vw,1.45rem)] font-medium text-paper/75">
              {HERO.subtitle}
            </p>
          </div>
        </div>

        {/* ---- Scroll affordance ---- */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center"
          style={{ opacity: "calc(1 - var(--p) * 3)" }}
        >
          <span className="grid h-10 w-6 place-items-start rounded-full border border-paper/35 pt-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime" />
          </span>
        </div>
      </div>
    </section>
  );
}

/** Placeholder retail-interior plate. Replace with a photographic asset. */
function RoomPlate() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, #2a1c4a 0%, #140f27 45%, #06060c 100%)",
        }}
      />
      {/* floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,10,24,0) 0%, #0b0916 40%, #050409 100%)",
        }}
      />
      {/* wall wash from the display */}
      <div
        className="absolute left-1/2 top-[18%] h-[64%] w-[62%] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(103,30,255,0.45), transparent)",
        }}
      />
      {/* display bezel */}
      <div
        className="absolute left-[26.4%] top-[18.6%] h-[63.4%] w-[47.2%] rounded-[10px]"
        style={{
          background: "linear-gradient(160deg,#1b1b22,#0a0a0f)",
          boxShadow:
            "0 40px 90px -30px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

/** Rotating brand slides shown inside the display. */
function ScreenContent() {
  return (
    // container-type lets the slide type scale to the display's own box (cqw),
    // not the viewport — so it reads correctly at both ends of the zoom.
    <div
      className="relative h-full w-full bg-[#0a0620]"
      style={{ containerType: "inline-size" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 80% at 20% 15%, rgba(103,30,255,0.45) 0%, rgba(75,28,135,0.2) 45%, rgba(6,6,14,0.6) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 35%, transparent 70%, rgba(255,255,255,0.05) 100%)",
        }}
      />
    </div>
  );
}
