import { FOOTER_COLUMNS } from "@/lib/content";

/**
 * Reference box: black ground, 86.4px top / 32px bottom padding,
 * four-column top row (352.8 / 252 / 252 / 252) with a 72px gutter.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black pb-8 pt-[86.4px]">
      <div className="shell px-6 md:px-[57.6px]">
        <div className="grid gap-[48px] lg:grid-cols-[352.8px_repeat(3,252px)] lg:gap-[72px]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-violet text-[13px] font-black text-white">
                V
              </span>
              <span className="text-[17px] font-extrabold tracking-[-0.01em]">Valtiren</span>
            </div>
            <p className="mt-5 max-w-[320px] text-[13px] leading-[21px] text-paper/50">
              The Intelligent Engagement Suite — sight, sound, scent, data, and
              services, unified under one platform and one partner.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-paper/85">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-paper/50 transition-colors hover:text-lime"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-[56px] flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-paper/40">
            © {year} Valtiren Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility"].map((l) => (
              <a key={l} href="#" className="text-[12px] text-paper/40 hover:text-lime">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
