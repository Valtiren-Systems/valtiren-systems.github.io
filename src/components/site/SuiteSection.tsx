import { SUITE, SOLUTIONS } from "@/lib/content";
import { SolutionIcon, ArrowRight } from "./icons";
import Reveal from "./Reveal";

/**
 * Reference box: bg #060810, 112px bottom padding, 6.5vw display heading,
 * 23px/35.65 body capped at 928px, 3-col card grid on a 1200px rail with
 * 16.8px row / 19.2px column gaps.
 */
export default function SuiteSection() {
  return (
    <section id="solutions" className="bg-ink-raised pb-[112px] pt-[96px]">
      <div className="shell px-6 md:px-[57.6px]">
        <Reveal>
          <h2 className="max-w-[15ch] text-[clamp(2.4rem,6.5vw,5.85rem)] font-bold leading-[1.15] tracking-[-0.025em]">
            {SUITE.title}
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <p className="mt-8 max-w-[928px] text-[clamp(1rem,1.6vw,1.4375rem)] leading-[1.55] text-[#e1e1e1]">
            {SUITE.body}
          </p>
        </Reveal>

        <div className="mt-[64px] grid max-w-[1200px] grid-cols-1 gap-x-[19.2px] gap-y-[16.8px] sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((sol, i) => (
            <Reveal key={sol.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <a
                href={sol.href}
                className="group flex h-full flex-col rounded-[14px] border border-hairline bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet/50 hover:bg-white/[0.06]"
              >
                <SolutionIcon name={sol.icon} />
                <h3 className="mt-5 text-[15px] font-bold tracking-[-0.005em]">{sol.title}</h3>
                <p className="mt-2 text-[11px] font-medium leading-[18px] text-paper/60">
                  {sol.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
