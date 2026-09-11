"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/content";

/**
 * ================================================================
 * HERO
 * ================================================================
 *
 * Initial state:
 *   Video = full viewport
 *   Background = completely fixed
 *
 * Final state:
 *   Video = inside TV
 *   Background = unchanged
 *
 * IMPORTANT:
 * Only the video/display layer is animated.
 * The RoomPlate NEVER receives a transform.
 */

const TV = {
  left: 35.97,
  top: 20.2,
  width: 28.0,
  height: 37.5,
};

/**
 * How far the TV glow spreads beyond the TV bezel, in % of stage size.
 */
const GLOW_PAD = 7;

export default function ScrollHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;

    if (!track || !stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      stage.style.setProperty("--p", "1");
      stage.style.setProperty("--bright", "1");
      return;
    }

    let frame = 0;
    let targetProgress = 0;
    let smoothedProgress = 0;

    /**
     * How quickly the animation catches up to the actual
     * scroll position. Lower = more delay/lag, higher = snappier.
     * 0.08 gives a noticeably smooth, delayed follow.
     */
    const LAG = 0.08;

    /**
     * The docking animation completes at this fraction of the
     * track's scrollable distance — the remaining fraction is a
     * "hold" buffer where the TV just sits there (glowing) before
     * the sticky section releases. Without this, the shrink
     * animation and the release happen at the exact same scroll
     * position, which feels like an abrupt jolt.
     */
    const DOCK_FRACTION = 0.7;

    const readScroll = () => {
      const rect = track.getBoundingClientRect();

      const distance =
        Math.max(1, rect.height - window.innerHeight) * DOCK_FRACTION;

      const rawProgress = -rect.top / distance;

      targetProgress = Math.min(1, Math.max(0, rawProgress));

      /**
       * Once the track has scrolled completely out of view below
       * the viewport (user hasn't reached it yet) or the section
       * is long gone above it, snap immediately instead of easing
       * — prevents any stale glow/haze value from lingering when
       * jumping around the page (e.g. via anchor links).
       */
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        smoothedProgress = targetProgress;
      }
    };

    const render = () => {
      smoothedProgress += (targetProgress - smoothedProgress) * LAG;

      // Snap once the gap is imperceptible, so the loop can settle.
      if (Math.abs(targetProgress - smoothedProgress) < 0.0005) {
        smoothedProgress = targetProgress;
      }

      /**
       * Smooth landing into the TV.
       */
      const p = 1 - Math.pow(1 - smoothedProgress, 2);

      stage.style.setProperty("--p", p.toFixed(4));

      /**
       * TV glow only appears once the video has essentially
       * finished docking (near the very end of the scroll, well
       * into the hold buffer), and fades out immediately when
       * scrolling back up.
       *
       * IMPORTANT: this is gated on smoothedProgress (the raw
       * scroll fraction), NOT on p. p is an ease-out curve that
       * flattens near 1, so small reversals in scroll barely move
       * p — gating on p made the glow appear "stuck" on for a long
       * time after the user started scrolling back up.
       */
      const DOCK_START = 0.97; // glow starts fading in here
      const rawGlow =
        smoothedProgress <= DOCK_START
          ? 0
          : (smoothedProgress - DOCK_START) / (1 - DOCK_START);
      const bright = rawGlow * rawGlow * (3 - 2 * rawGlow); // smoothstep

      stage.style.setProperty("--bright", bright.toFixed(4));

      frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      readScroll();
    };

    readScroll();
    smoothedProgress = targetProgress; // avoid animating in from 0 on load
    frame = requestAnimationFrame(render);

    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);

      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      ref={trackRef}
      className="
        relative
        h-[210vh]
        bg-[#02030a]
      "
    >
      {/*
       * ==========================================================
       * STICKY STAGE
       * ==========================================================
       *
       * The stage itself stays fixed while the user scrolls.
       */}

      <div
        ref={stageRef}
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
        "
        style={
          {
            "--p": 0,
            "--bright": 0,
          } as React.CSSProperties
        }
      >
        {/* ======================================================
            FIXED BACKGROUND
            ======================================================

            NO transform.
            NO scale.
            NO translate.
            NO animation.

            This stays exactly where it is while scrolling.
        */}

        <div className="absolute inset-0 z-0">
          <RoomPlate />
        </div>

        {/* ======================================================
            TV GLOW (ambient)
            ======================================================

            Soft, wide brightening around the TV bezel. Paired with
            the crisp TV NEON RING below. Fades in once the video
            has essentially finished docking into the TV (see
            DOCK_START in render()). The rest of the room is
            unaffected.
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            z-10
          "
          style={{
            left: `${TV.left - GLOW_PAD}%`,
            top: `${TV.top - GLOW_PAD}%`,
            width: `${TV.width + GLOW_PAD * 2}%`,
            height: `${TV.height + GLOW_PAD * 2}%`,
            opacity: "var(--bright)",
            background: `
              radial-gradient(
                60% 60% at 50% 50%,
                rgba(120, 110, 255, 0.4) 0%,
                rgba(90, 80, 210, 0.22) 45%,
                rgba(255, 255, 255, 0.0) 80%
              )
            `,
          }}
        />

        {/* ======================================================
            TV NEON RING
            ======================================================

            A crisp glowing outline hugging the TV bezel, layered
            on top of the soft ambient glow above. Only visible once
            docked (shares --bright with the glow above), with a
            slow pulse so it reads as "neon" rather than static.
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            z-10
            tv-neon-ring
          "
          style={{
            left: `${TV.left - 0.5}%`,
            top: `${TV.top - 0.5}%`,
            width: `${TV.width + 1}%`,
            height: `${TV.height + 1}%`,
            borderRadius: "8px",
            opacity: "var(--bright)",
            border: "1px solid rgba(180, 225, 255, 0.65)",
            boxShadow: `
              0 0 8px rgba(140, 210, 255, 0.9),
              0 0 20px rgba(90, 170, 255, 0.7),
              0 0 45px rgba(80, 120, 255, 0.5),
              0 0 90px rgba(70, 100, 255, 0.3)
            `,
          }}
        />

        {/*
          Plain <style>, NOT <style jsx>.

          styled-jsx's babel plugin rewrites every className in this
          file to inject its scoping hash via string concatenation —
          but this codebase's multiline, whitespace-formatted
          className strings contain literal newlines, which aren't
          valid inside the rewritten JS string literals. That broke
          the whole file's parsing ("Unterminated string constant").
          A plain <style> tag needs no such transform. The class and
          keyframe names below are specific enough that they don't
          need scoping anyway.
        */}
        <style>{`
          .tv-neon-ring {
            animation: tvNeonPulse 2.6s ease-in-out infinite;
          }

          @keyframes tvNeonPulse {
            0%,
            100% {
              filter: brightness(1);
            }
            50% {
              filter: brightness(1.18);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tv-neon-ring {
              animation: none;
            }
          }
        `}</style>

        {/* ======================================================
            FINAL LIGHT TRANSITION
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            z-10
          "
          style={{
            left: `${TV.left}%`,
            top: `${TV.top}%`,
            width: `${TV.width}%`,
            height: `${TV.height}%`,
            opacity: "calc(var(--p) * var(--p) * 0.72)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.72))",
          }}
        />

        {/* ======================================================
            VIDEO DISPLAY
            ======================================================

            p = 0
              → full viewport

            p = 1
              → TV position
        */}

        <div
          className="
            absolute
            z-20
            overflow-hidden
            bg-black
          "
          style={{
            left: `calc(${TV.left}% * var(--p))`,

            top: `calc(${TV.top}% * var(--p))`,

            width: `calc(100% - ${100 - TV.width}% * var(--p))`,

            height: `calc(100% - ${100 - TV.height}% * var(--p))`,

            borderRadius: "calc(6px * var(--p))",

            boxShadow: "0 0 calc(70px * var(--p)) rgba(65, 45, 255, 0.4)",
          }}
        >
          <ScreenContent />
        </div>

        {/* ======================================================
            HERO COPY
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-6
            text-center
          "
          style={{
            opacity: "calc(1 - var(--p) * 2.5)",

            transform: "translateY(calc(var(--p) * -70px))",
          }}
        >
          <div className="max-w-[1000px]">
            <p className="eyebrow text-lime">{HERO.eyebrow}</p>

            <h1
              className="
                mt-4
                text-[clamp(2.6rem,6.6vw,6.5rem)]
                font-extrabold
                leading-[1.04]
                tracking-[-0.025em]
                text-white
              "
            >
              {HERO.title}
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-[650px]
                text-[clamp(1rem,1.6vw,1.4rem)]
                font-medium
                leading-relaxed
                text-white/70
              "
            >
              {HERO.subtitle}
            </p>
          </div>
        </div>

        {/* ======================================================
            SCROLL INDICATOR
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-8
            z-40
            flex
            justify-center
          "
          style={{
            opacity: "calc(1 - var(--p) * 3)",
          }}
        >
          <span
            className="
              grid
              h-10
              w-6
              place-items-start
              rounded-full
              border
              border-white/30
              pt-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-bounce
                rounded-full
                bg-lime
              "
            />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FIXED CONTROL ROOM BACKGROUND
   ================================================================ */

function RoomPlate() {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#02030a]
      "
    >
      <img
        src="/images/hero-control-room.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          select-none
        "
      />

      {/* Static cinematic overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(1,2,10,0.25) 0%, rgba(1,2,8,0.05) 45%, rgba(1,2,8,0.48) 100%)",
        }}
      />

      {/* Static glow behind TV */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(38% 48% at 50% 45%, rgba(67,45,220,0.18) 0%, rgba(35,20,100,0.07) 45%, transparent 75%)",
        }}
      />

      {/* Static floor reflection */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[38%]
        "
        style={{
          background:
            "linear-gradient(to top, rgba(25,18,80,0.24), transparent)",
        }}
      />
    </div>
  );
}

/* ================================================================
   VIDEO
   ================================================================ */

function ScreenContent() {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* ========================================================
          ACTUAL HERO VIDEO

          This is visible immediately on the first screen.
      ======================================================== */}

      <video
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Subtle dashboard atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
        "
        style={{
          background:
            "radial-gradient(90% 80% at 20% 15%, rgba(80,45,255,0.20) 0%, rgba(45,25,100,0.06) 45%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      {/* Screen glass reflection */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
        "
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.07) 0%, transparent 30%, transparent 75%, rgba(255,255,255,0.025) 100%)",
        }}
      />

      {/* Screen vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
        "
        style={{
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}
