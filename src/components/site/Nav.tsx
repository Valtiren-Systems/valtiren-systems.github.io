"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";

/**
 * Fixed 60px bar, rgba(5,6,10,.92) ground, 57.6px side gutters — matching the
 * reference header's computed box.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[60px] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : ""
      }`}
      style={{ background: "rgba(5,6,10,0.92)", backdropFilter: "blur(14px)" }}
    >
      <div className="flex h-full items-center justify-between px-6 md:px-[57.6px]">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Valtiren Systems home">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-violet text-[13px] font-black text-white">
            V
          </span>
          <span className="text-[17px] font-extrabold tracking-[-0.01em]">Valtiren</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] font-medium text-paper/80 transition-colors hover:text-lime"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden text-[14px] font-medium text-paper/80 hover:text-lime md:block">
            Support
          </a>
          <a href="#demo" className="btn-primary !py-[10px] !text-[13.5px]">
            Book a Demo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-hairline lg:hidden"
          >
            <span className="space-y-[5px]">
              <span className="block h-[1.5px] w-4 bg-paper" />
              <span className="block h-[1.5px] w-4 bg-paper" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-ink px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-paper/85"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
