import {
  TERMS_INTRO,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
} from "./terms-content";

function toOrdinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

// Splits into two columns for the jump-nav, left-to-right then wrapping —
// matches "01, 03, 05..." left / "02, 04, 06..." right from the reference.
function splitColumns<T>(items: T[]): [T[], T[]] {
  const left: T[] = [];
  const right: T[] = [];
  items.forEach((item, i) => (i % 2 === 0 ? left : right).push(item));
  return [left, right];
}

export default function TermsOfService() {
  const [leftColumn, rightColumn] = splitColumns(TERMS_SECTIONS);

  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-6 py-20">
        <header>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm font-bold text-violet-600">
            Last updated {TERMS_LAST_UPDATED}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            {TERMS_INTRO}
          </p>
        </header>

        {/* Jump nav — two columns, numbered to match the sections below */}
        <nav
          aria-label="Sections"
          className="mt-10 grid grid-cols-1 gap-x-12 gap-y-3 border-y border-slate-200 py-8 sm:grid-cols-2"
        >
          {[leftColumn, rightColumn].map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3">
              {column.map((section) => {
                const globalIndex = TERMS_SECTIONS.indexOf(section);
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-slate-600 transition hover:text-violet-600"
                    >
                      {toOrdinal(globalIndex)} — {section.heading}
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </nav>

        <div>
          {TERMS_SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-slate-200 py-10 first:pt-14"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                <span className="text-violet-600">{toOrdinal(index)}</span>
                {" — "}
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-3 leading-relaxed text-slate-600 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
