import { FOOTER_COLUMNS, SOCIALLINKS, IconShape } from "@/lib/content";

function renderShape(shape: IconShape, key: number) {
  switch (shape.type) {
    case "path":
      return <path key={key} d={shape.d} fill={shape.fill} />;
    case "circle":
      return <circle key={key} cx={shape.cx} cy={shape.cy} r={shape.r} />;
    case "line":
      return (
        <line
          key={key}
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
        />
      );
    case "rect":
      return (
        <rect
          key={key}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
        />
      );
    default:
      return null;
  }
}

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
              <img
                src="/images/logo.png"
                alt="Valtiren Systems"
                width={459}
                height={139}
                className="h-8 w-auto"
              />
            </div>
            <p className="mt-5 max-w-[320px] text-[13px] leading-[21px] text-paper/50">
              Valtiren Systems brings live operational data and location data
              together in one simple layer. Track asset issues, manage inventory
              across job sites, fix billing errors, and stay on top of
              regulatory deadlines without replacing your existing hardware or
              core systems.
            </p>

            <div className="social-links">
              {SOCIALLINKS.map(({ name, href, color, stroke, shapes }) => {
                // GitHub's brand black is invisible on a dark background — use white instead
                const displayColor = name === "GitHub" ? "#FFFFFF" : color;

                return (
                  <a
                    key={name}
                    href={href}
                    target={name === "Email" ? undefined : "_blank"}
                    rel={name === "Email" ? undefined : "noopener noreferrer"}
                    aria-label={name}
                    className="social-links__item"
                    style={{
                      ["--icon-color" as string]:
                        displayColor || "currentColor",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={stroke ? "none" : displayColor || "currentColor"}
                      stroke={stroke ? displayColor : undefined}
                      strokeWidth={stroke ? 1.75 : undefined}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {shapes.map((shape, i) => renderShape(shape, i))}
                    </svg>
                  </a>
                );
              })}
            </div>
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
              <a
                key={l}
                href="#"
                className="text-[12px] text-paper/40 hover:text-lime"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
