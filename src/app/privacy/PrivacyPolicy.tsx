import { Inter } from "next/font/google";
import {
  privacyEffectiveDate,
  privacyIntro,
  privacySections,
} from "./privacy-content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

// Brand tokens lifted from the homepage screenshot. Swap these hex values
// for exact brand hex codes if they differ from this approximation.
const INK = "#0B0B14"; // near-black navy used for dark bands + headings
const INK_MUTED = "#A6A8C1"; // secondary text on dark backgrounds
const ACCENT_PURPLE = "#5B34E0"; // headline / link accent
const ACCENT_LIME = "#D7FF3E"; // CTA button, matches "Book a Demo"

export default function PrivacyPolicy() {
  return (
    <main className={`${inter.className} bg-white`}>
      {/* Hero */}
      <section className="px-6 pb-14 pt-20 md:px-16 md:pt-28 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: INK }}
          >
            Privacy Policy
          </h1>
          <p
            className="mt-4 text-sm font-semibold"
            style={{ color: ACCENT_PURPLE }}
          >
            Last updated {privacyEffectiveDate}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {privacyIntro}
          </p>
        </div>
      </section>

      {/* On-page index */}
      <nav aria-label="Jump to section" className="border-y border-gray-200">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 px-6 py-8 sm:grid-cols-2 md:px-16 lg:px-24">
          {privacySections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-gray-500 transition-colors hover:text-[#5B34E0]"
            >
              {section.number} — {section.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <section className="px-6 py-16 md:px-16 lg:px-24">
        <div className="mx-auto max-w-3xl divide-y divide-gray-200">
          {privacySections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-10 py-8 first:pt-0 last:pb-0"
            >
              <h2 className="text-xl font-bold" style={{ color: INK }}>
                <span style={{ color: ACCENT_PURPLE }}>{section.number}</span> —{" "}
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-gray-600">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  ) 
}
