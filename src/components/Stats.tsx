import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import content from "@/content.json";

const stats = content.stats.items;

export function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stats-head]",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        "[data-stats-shell]",
        { opacity: 0, y: 26, rotateX: -10, transformPerspective: 1200, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
        const target = parseFloat(el.dataset.target!);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div data-stats-head className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
            {content.stats.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.stats.title}{" "}
            <span className="text-gradient-magenta">{content.stats.titleHighlight}</span>{" "}
            {content.stats.titleSuffix}
          </h2>
        </div>

        <div
          data-stats-shell
          className="rounded-3xl border border-white/5 bg-gradient-to-b from-surface/60 to-surface-elevated/30 p-10 backdrop-blur"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl font-semibold tracking-tight">
                  <span
                    data-stat
                    data-target={s.value}
                    data-decimals={s.decimals || 0}
                    className="text-gradient-magenta"
                  >
                    0
                  </span>
                  <span className="text-gradient-magenta">{s.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
