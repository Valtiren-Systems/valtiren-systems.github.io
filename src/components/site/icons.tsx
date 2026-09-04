import type { IconName } from "@/lib/content";

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<IconName, React.ReactNode> = {
  // Asset Mapping
  assetMap: (
    <>
      <path d="M12 21s7-5.7 7-11.2a7 7 0 1 0-14 0C5 15.3 12 21 12 21Z" {...s} />
      <circle cx="12" cy="9.5" r="2.5" {...s} />
      <path d="M12 7v5M9.5 9.5h5" {...s} />
    </>
  ),

  // Field Analytics
  fieldAnalytics: (
    <>
      <path d="M4 19.5h16" {...s} />

      <path d="M6 17v-4M10 17v-7M14 17v-9M18 17V7" {...s} />

      <path d="M5.5 11.5 10 9l4-3 4.5-2.5" {...s} />

      <circle cx="5.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14" cy="6" r="1" fill="currentColor" />
      <circle cx="18.5" cy="3.5" r="1" fill="currentColor" />
    </>
  ),

  // Systems & Operations
  systemsOps: (
    <>
      <rect x="4" y="5" width="6" height="6" rx="1.5" {...s} />
      <rect x="14" y="5" width="6" height="6" rx="1.5" {...s} />
      <rect x="9" y="14" width="6" height="6" rx="1.5" {...s} />

      <path d="M10 8h4M7 11v3M17 11v3M12 14V11" {...s} />

      <circle cx="7" cy="8" r="0.8" fill="currentColor" />
      <circle cx="17" cy="8" r="0.8" fill="currentColor" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" />
    </>
  ),
};

export function SolutionIcon({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden
      className="
        grid h-[52px] w-[52px] shrink-0 place-items-center
        rounded-[12px]
        bg-gradient-to-br from-violet to-violet/80
        text-white
        shadow-[0_8px_20px_-10px_rgba(103,30,255,0.75)]
      "
    >
      <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]">
        {PATHS[name]}
      </svg>
    </span>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12h13M13 6l6 6-6 6" {...s} />
    </svg>
  );
}
