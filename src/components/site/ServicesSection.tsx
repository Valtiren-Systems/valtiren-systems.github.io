import { SERVICES } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Reference box: white ground, 115.2px block padding, asymmetric two-column
 * grid (526px / 726px) with a 72px gutter. Heading is 66.67px/73.33 in violet.
 */
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white py-[clamp(64px,8vw,115.2px)] text-midnight"
    >
      <div className="shell px-6 md:px-[57.6px]">
        <div className="grid gap-[72px] lg:grid-cols-[526px_minmax(0,726px)]">
          <Reveal>
            <h2 className="text-[clamp(2.25rem,4.6vw,4.167rem)] font-bold leading-[1.1] tracking-[-0.03em] text-violet">
              {SERVICES.heading}
            </h2>
          </Reveal>

          <div>
            <Reveal delay={1}>
              <p className="text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-midnight/70">
                {SERVICES.body}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {SERVICES.items.map((item, i) => (
                <Reveal key={item.title} delay={((i % 2) + 1) as 1 | 2}>
                  <div className="border-t border-midnight/12 pt-5">
                    <h3 className="text-[22px] font-bold tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[22px] text-midnight/60">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
