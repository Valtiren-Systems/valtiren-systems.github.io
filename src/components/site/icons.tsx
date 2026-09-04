import type { IconName } from "@/lib/content";

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<IconName, React.ReactNode> = {
  assetMap: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" {...s} />
      <rect x="9" y="4.6" width="6" height="6" rx="1.4" {...s} />
      <circle cx="12" cy="6.6" r="0.65" fill="currentColor" />
    </>
  ),
  fieldAnalytics: (
    <>
      <path d="M4 19h16" {...s} />
      <path d="M4.5 19v-5M9.5 19v-8M14.5 19v-11M19.5 19v-14" {...s} />
      <path d="M4.5 12.5 9.5 9.8 14.5 7 19.5 4.2" {...s} />
      <path d="M16.2 4.2h3.3v3.3" {...s} />
    </>
  ),
  systemsOps: (
    <>
      <circle cx="9" cy="9.6" r="3.3" {...s} />
      <circle cx="9" cy="9.6" r="1" {...s} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <rect
          key={`big-${a}`}
          x="7.9"
          y="4.1"
          width="2.2"
          height="2.2"
          rx="0.6"
          fill="currentColor"
          transform={`rotate(${a} 9 9.6)`}
        />
      ))}
      <circle cx="16.3" cy="15.9" r="2.3" {...s} />
      <circle cx="16.3" cy="15.9" r="0.7" {...s} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <rect
          key={`small-${a}`}
          x="15.55"
          y="12.1"
          width="1.5"
          height="1.5"
          rx="0.4"
          fill="currentColor"
          transform={`rotate(${a} 16.3 15.9)`}
        />
      ))}
    </>
  ),
};

export function SolutionIcon({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden
      className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[14px] bg-violet text-white shadow-[0_10px_24px_-10px_rgba(103,30,255,0.9)]"
    >
      <svg viewBox="0 0 24 24" className="h-[36px] w-[36px]">
        {PATHS[name]}
      </svg>
    </span>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12h13M12 5.5 18.5 12 12 18.5" {...s} />
    </svg>
  );
}
