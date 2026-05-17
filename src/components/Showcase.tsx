import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

const panels = [
  {
    tag: "Enterprise Web",
    title: "DXP & Headless Ecosystems.",
    desc: "Migrate from brittle legacy systems to modern, highly secure Digital Experience Platforms and Headless CMS architectures built for scale.",
    bullets: ["DXP Replatforming", "Headless CMS Integration", "Core Web Vitals Mastery"],
  },
  {
    tag: "Mobile Innovation",
    title: "Intelligent Mobile Experiences.",
    desc: "High-fidelity applications with embedded on-device AI, hyper-personalization engines, and 5G-optimized cloud computations.",
    bullets: ["Embedded ML Models", "Hyper-Personalization", "Cross-platform Agility"],
  },
  {
    tag: "Agentic AI",
    title: "Autonomous Workflow Engines.",
    desc: "Deploy autonomous AI agents that handle complex business logic, customer care, and cross-platform automation with absolute precision.",
    bullets: ["Autonomous AI Agents", "Predictive Analytics", "DevOps-Native Deployment"],
  },
];

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop: Pinned cross-fade
      const panelsEl = gsap.utils.toArray<HTMLElement>("[data-showcase-panel]");
      const mediaEl = gsap.utils.toArray<HTMLElement>("[data-showcase-media]");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.max(1, panelsEl.length) * 800}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      panelsEl.forEach((panel, i) => {
        const media = mediaEl[i];
        const label = `p${i}`;
        tl.addLabel(label);

        // enter
        tl.fromTo(
          panel,
          { autoAlpha: 0, y: 40, filter: "blur(14px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" },
          label,
        );

        if (media) {
          tl.fromTo(
            media,
            { yPercent: 10, rotateX: -8, transformPerspective: 1000, autoAlpha: 0.7 },
            { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" },
            label,
          );
        }

        // hold
        tl.to({}, { duration: 0.35 });

        // exit (except last)
        if (i < panelsEl.length - 1) {
          tl.to(panel, {
            autoAlpha: 0,
            y: -30,
            filter: "blur(12px)",
            duration: 0.22,
            ease: "power2.inOut",
          });
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile: Simple scroll-triggered entrance
      const panelsEl = gsap.utils.toArray<HTMLElement>("[data-showcase-panel]");
      const mediaEl = gsap.utils.toArray<HTMLElement>("[data-showcase-media]");

      panelsEl.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const media = mediaEl[i];
        if (media) {
          gsap.fromTo(
            media,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-22 lg:h-screen">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Platform</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Engineering your <span className="text-gradient-magenta">digital reality</span>.
          </h2>
        </div>

        <div className="relative mt-16 space-y-24 lg:mt-0 lg:space-y-0 lg:min-h-[min(85vh,24rem)]">
          {panels.map((p, i) => (
            <div
              key={p.title}
              data-showcase-panel
              className={`isolate grid items-center gap-10 lg:absolute lg:inset-0 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
              style={{ 
                // Initial state for desktop GSAP context
                // On mobile these will be overwritten by classes/GSAP
              }}
            >
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary-glow">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md mx-auto lg:mx-0 text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:block lg:space-y-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-foreground/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_8px] shadow-primary-glow" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-10 rounded-[2rem] opacity-60 blur-3xl"
                  style={{ background: "var(--gradient-radial)" }}
                />
                <div data-showcase-media className="will-change-transform">
                  <MockPanel index={i} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockPanel({ index }: { index: number }) {
  if (index === 0) {
    // Web & Marketing Mockup
    return (
      <div className="glow-ring relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-surface-elevated p-5 shadow-elegant h-full flex flex-col aspect-[4/3] lg:aspect-auto min-h-[18.75rem]">
        <div className="flex gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex-1 rounded-xl border border-white/5 bg-black/40 p-5 relative overflow-hidden flex flex-col">
          {/* Fake Web layout */}
          <div className="w-1/2 h-5 rounded-md bg-primary/20 mb-6"></div>
          <div className="w-full h-2.5 rounded bg-white/10 mb-3"></div>
          <div className="w-5/6 h-2.5 rounded bg-white/10 mb-8"></div>
          
          {/* Fake Analytics Chart */}
          {/* <div className="flex items-end gap-2.5 h-10 mt-auto">
            {[30, 45, 25, 60, 85, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-primary-glow rounded-t-sm relative group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Mobile Solutions Mockup
    return (
      <div className="relative flex justify-center items-center h-full min-h-[18.75rem]">
        {/* Floating wrapper */}
        <div className="animate-float-slow w-full h-full flex justify-center items-center">
          <div className="w-[12.5rem] h-[23.75rem] glow-ring relative overflow-hidden rounded-[2.5rem] border-[0.375rem] border-surface-elevated bg-black shadow-elegant rotate-[-15deg] z-1">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-10">
            <div className="w-[6rem] h-[1.25rem] bg-surface-elevated rounded-b-2xl"></div>
          </div>
          {/* Screen Content */}
          <div className="pt-12 px-4 pb-4 flex flex-col gap-4 h-full relative z-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-glow"></div>
              <div className="flex flex-col gap-1.5">
                <div className="w-20 h-2 bg-white/20 rounded"></div>
                <div className="w-12 h-2 bg-white/10 rounded"></div>
              </div>
            </div>
            <div className="w-full flex-1 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 p-3">
               <div className="w-1/2 h-2 bg-primary-glow/50 rounded mb-2"></div>
               <div className="w-3/4 h-2 bg-primary-glow/30 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 h-28">
              <div className="rounded-xl bg-white/5 p-3 flex flex-col justify-end">
                <div className="w-8 h-8 rounded-full bg-white/10 mb-2"></div>
                <div className="w-12 h-2 bg-white/20 rounded"></div>
              </div>
              <div className="rounded-xl bg-white/5 p-3 flex flex-col justify-end">
                <div className="w-8 h-8 rounded-full bg-white/10 mb-2"></div>
                <div className="w-12 h-2 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  // IT & Infrastructure Mockup
  return (
    <div className="glow-ring relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-surface-elevated p-6 shadow-elegant h-full flex flex-col justify-center gap-4 min-h-[12.5rem]">
      <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        <span>Network Status</span>
        <span className="text-green-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Operational
        </span>
      </div>
      {[1, 2].map((rack) => (
        <div key={rack} className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/40 p-4">
          <div className="flex flex-col gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary-glow shadow-[0_0_8px_var(--color-primary-glow)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-primary-glow/40"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-1.5 w-1/3 bg-white/20 rounded-full"></div>
            <div className="flex gap-2">
              <div className="h-1.5 w-16 bg-primary/60 rounded-full"></div>
              <div className="h-1.5 w-10 bg-primary/30 rounded-full"></div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-glow w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
