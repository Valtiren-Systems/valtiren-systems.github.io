import type { IconName } from "@/lib/content";

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<IconName, React.ReactNode> = {
  signage: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" {...s} />
      <path d="M12 16v4M8 20h8" {...s} />
    </>
  ),
  menu: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" {...s} />
      <path d="M7 9h10M7 13h6" {...s} />
    </>
  ),
  kiosk: (
    <>
      <rect x="6" y="2" width="12" height="18" rx="2" {...s} />
      <path d="M10 20h4M9 16h6" {...s} />
      <circle cx="12" cy="9" r="2.4" {...s} />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" {...s} />
      <circle cx="7" cy="18" r="2" {...s} />
      <circle cx="17" cy="16" r="2" {...s} />
    </>
  ),
  hold: (
    <>
      <path
        d="M5 4h3l2 5-2.2 1.4a12 12 0 0 0 5.8 5.8L15 14l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z"
        {...s}
      />
    </>
  ),
  scent: (
    <>
      <path d="M8 21h8a2 2 0 0 0 2-2v-6a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v6a2 2 0 0 0 2 2Z" {...s} />
      <path d="M10 5h4M12 5V3M9 14c1.5-1.5 4.5-1.5 6 0" {...s} />
    </>
  ),
  driveThru: (
    <>
      <path d="M3 16h18M5 16l1.6-5.2A2 2 0 0 1 8.5 9.4h7a2 2 0 0 1 1.9 1.4L19 16" {...s} />
      <circle cx="7.5" cy="18.5" r="1.6" {...s} />
      <circle cx="16.5" cy="18.5" r="1.6" {...s} />
      <path d="M12 3v3" {...s} />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10.5 10.5 0 0 1 13 0M8.5 16a6 6 0 0 1 7 0" {...s} />
      <circle cx="12" cy="19.5" r="1.2" fill="currentColor" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...s} />
    </>
  ),
};

export function SolutionIcon({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden
      className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[14px] bg-violet text-white shadow-[0_10px_24px_-10px_rgba(103,30,255,0.9)]"
    >
      <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]">
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
