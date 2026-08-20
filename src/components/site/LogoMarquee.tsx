import { LOGOS } from "@/lib/content";

/**
 * Reference box: bg #060810, 38.4px block padding, continuous track built
 * from two identical sets translated -50% so the loop is seamless.
 * Gap between marks: 56px.
 */
export default function LogoMarquee() {
  const sets = [0, 1];
  return (
    <section
      aria-label="Trusted by"
      className="marquee overflow-hidden border-y border-hairline bg-ink-raised py-[38.4px]"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="marquee-track">
        {sets.map((set) => (
          <div key={set} className="flex shrink-0 items-center gap-[56px] pr-[56px]" aria-hidden={set === 1}>
            {LOGOS.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap text-[19px] font-bold tracking-[-0.01em] text-paper/40 transition-colors duration-300 hover:text-paper/80"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
