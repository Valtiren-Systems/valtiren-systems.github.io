"use client";

import { useEffect, useState } from "react";

interface BookMeetingButtonProps {
  /** Full Calendly scheduling link, e.g. https://calendly.com/your-team/intro-call */
  url: string;
  /** Button label. Defaults to "Book a meeting". */
  label?: string;
  /** Tailwind classes to style the trigger button. */
  className?: string;
}

export default function BookMeetingButton({
  url,
  label = "Book a meeting",
  className,
}: BookMeetingButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

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

  // Plain inline embed params — no Calendly-supplied popup card involved,
  // so there's no separate white wrapper for it to ship hardcoded.
  // embed_domain + embed_type still need to be present for Calendly's page
  // to treat this as an embed rather than a directly-loaded page.
  const embedUrl = (() => {
    const params = new URLSearchParams({
      embed_domain:
        typeof window !== "undefined" ? window.location.hostname : "",
      embed_type: "Inline",
      background_color: "12141f",
      text_color: "f8fafc",
      primary_color: "4f39f6",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a meeting"
        >
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0"
            aria-hidden="true"
          />
          <div className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141f]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-slate-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F39F6]/50 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <iframe
              key={embedUrl}
              src={embedUrl}
              title="Schedule a meeting"
              className="h-full w-full flex-1 border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
