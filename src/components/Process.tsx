import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import content from "@/content.json";

export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const stepsEl = gsap.utils.toArray<HTMLElement>("[data-step]");

      gsap.fromTo(
        "[data-process-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );

      // Reveal each step with a "scan" feeling + slight horizontal drift.
      stepsEl.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "top 45%",
            scrub: 0.8,
          },
        });
        tl.fromTo(
          el,
          { autoAlpha: 0, x: -36, filter: "blur(12px)" },
          { autoAlpha: 1, x: 0, filter: "blur(0px)", ease: "power3.out", duration: 1 },
        );
        const dot = el.querySelector("[data-step-dot]");
        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0.65, boxShadow: "0 0 0px rgba(0,0,0,0)" },
            {
              scale: 1,
              boxShadow: "0 0 50px rgba(255, 91, 138, 0.25)",
              duration: 1,
              ease: "power3.out",
            },
            0,
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
            {content.process.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.process.title}{" "}
            <span className="text-gradient-magenta">{content.process.titleHighlight}</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
          <div
            data-process-line
            className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary-glow via-primary to-transparent shadow-[0_0_20px] shadow-primary/50"
          />
          <ul className="space-y-10">
            {content.process.steps.map((s) => (
              <li key={s.n} data-step className="relative pl-16">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background font-mono text-xs text-primary-glow shadow-glow">
                  {s.n}
                </span>
                <span
                  data-step-dot
                  className="absolute left-[1.375rem] top-[3.25rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary/70 shadow-[0_0_10px] shadow-primary"
                />
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
