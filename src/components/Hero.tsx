import { useEffect, useRef } from "react";
// import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBackdrop } from "./HeroBackdrop";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-eyebrow]", {
        opacity: 0,
        y: 14,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.08,
      });
      gsap.from("[data-hero-sub]", {
        opacity: 0,
        y: 16,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from("[data-hero-cta]", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.75,
      });
      gsap.from("[data-hero-stat]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.95,
      });
      gsap.from("[data-hero-dashboard]", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // parallax dashboard on scroll
      gsap.to("[data-hero-dashboard]", {
        yPercent: -6,
        rotateX: -4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden pt-16 sm:pt-24"
    >
      <HeroBackdrop />
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />

      <div className="container-px mx-auto max-w-5xl">
        <div className="mx-auto mt-10 lg:mt-4 flex max-w-3xl flex-col items-center text-center">
          <div
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 text-xs text-muted-foreground backdrop-blur px-4"
          >
            <Sparkles size={12} className="text-primary-glow" />
            <span>Next-Gen AI & Digital Solutions</span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,4.8vw,3.6rem)] font-semibold leading-[0.98] tracking-tight text-balance">
            <span>
              <span data-hero-line className="block text-gradient">Build your Business’s</span>
            </span>
            <span>
              <span data-hero-line >
                <span className="text-gradient-magenta"> Online</span>
              </span>
            </span>
            <span >
              <span data-hero-line className="text-gradient"> Presence.</span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-xl text-balance text-sm text-muted-foreground"
          >
            Procode accelerates enterprise growth through bespoke AI solutions, high-performance mobile apps, and 
            advanced web ecosystems. We transition your business from maintenance to acceleration.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <a
              href="/contact"
              className="group relative inline-flex h-11 md:h-12 px-8 lg:px-6 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-white shadow-glow transition-transform hover:shadow-glow"
            >
              <span className="relative z-10">Start a project</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="relative z-10 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>

            <a
              href="/case-studies"
              className="group relative inline-flex h-11 md:h-12 px-8 lg:px-6 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              View case studies
            </a>

          </div>

          <div className="mt-12 grid w-72 md:w-auto max-w-2xl grid-cols-2 gap-4 text-left lg:grid-cols-3">
            {[
              { k: "99.9%", v: "Uptime SLA" },
              { k: "250+", v: "Engagements" },
              { k: "DevOps", v: "Native DNA" },
            ].map((s) => (
              <div
                key={s.k}
                data-hero-stat
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur"
              >
                <div className="font-display text-2xl font-semibold text-gradient-magenta">
                  {s.k}
                </div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating dashboard */}
        <div
          data-hero-dashboard
          className="relative mx-auto mt-20 w-full max-w-5xl"
          style={{ perspective: "1400px" }}
        >
          <div className="glow-ring relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-surface-elevated shadow-elegant">
            <div className="flex items-center justify-between border-b border-white/5 bg-black/30 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70 shadow-[0_0_10px] shadow-primary" />
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">procode.eg / monitoring</div>
              <div className="font-mono text-[10px] text-primary-glow animate-glow-pulse">● live</div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Latency p95</div>
                <div className="mt-2 font-display text-2xl font-semibold">42ms</div>
                <div className="mt-3 h-16 w-full overflow-hidden rounded-md bg-gradient-to-t from-primary/20 to-transparent">
                  <Spark />
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Inferences / sec</div>
                <div className="mt-2 font-display text-2xl font-semibold text-gradient-magenta">12,480</div>
                <div className="mt-3 grid grid-cols-12 items-end gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-gradient-to-t from-primary to-primary-glow"
                      style={{ height: `${20 + ((i * 37) % 80)}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                <div><span className="text-primary-glow">$</span> deploy production</div>
                <div>→ build  <span className="text-foreground">ok</span></div>
                <div>→ test   <span className="text-foreground">142 passed</span></div>
                <div>→ scan   <span className="text-foreground">0 vulns</span></div>
                <div>→ ship   <span className="text-primary-glow">live ✦</span></div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-10 -bottom-8 h-16 rounded-full bg-primary/30 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function Spark() {
  const path =
    "M0 40 L20 36 L40 38 L60 28 L80 32 L100 22 L120 26 L140 18 L160 22 L180 12 L200 16 L220 8";
  return (
    <svg viewBox="0 0 220 48" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff5b8a" />
          <stop offset="100%" stopColor="#8b1744" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
