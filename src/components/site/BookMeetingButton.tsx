"use client";

import { useEffect, useState } from "react";

interface BookMeetingButtonProps {
  /** Full Calendly scheduling link, e.g. https://calendly.com/your-team/intro-call */
  url: string;
  /** Tailwind classes to style the trigger button. */
  className?: string;
  /** Button label. Defaults to "Book a meeting". */
  label?: string;
}

const THEME = {
  ink: "14131f", // no leading '#' — Calendly's params want raw hex
  accent: "5b4fe5",
  muted: "9ca3af",
};

export default function BookMeetingButton({
  url,
  className,
  label = "Book a meeting",
}: BookMeetingButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // reset the skeleton each time the modal is reopened
    if (open) setLoaded(false);
  }, [open]);

  const embedUrl = (() => {
    const params = new URLSearchParams({
      embed_type: "Inline",
      background_color: THEME.ink,
      primary_color: THEME.accent,
      hide_gdpr_banner: "1",
      hide_event_type_details: "1",
    });
    return `${url}?${params.toString()}`;
  })();

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: `#${THEME.ink}cc` }}
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a meeting"
        >
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-2xl"
              style={{ backgroundColor: `#${THEME.accent}` }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b4fe5]/50"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              className="relative flex h-[85vh] w-full flex-col overflow-hidden rounded-2xl"
              style={{
                backgroundColor: `#${THEME.ink}`,
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset",
              }}
            >
              {!loaded && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center gap-3"
                  style={{ backgroundColor: `#${THEME.ink}` }}
                >
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-2 border-white/10"
                    style={{ borderTopColor: `#${THEME.accent}` }}
                  />
                </div>
              )}

              <iframe
                key={embedUrl}
                src={embedUrl}
                title="Schedule a meeting"
                onLoad={() => setLoaded(true)}
                className="h-full w-full flex-1 border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
