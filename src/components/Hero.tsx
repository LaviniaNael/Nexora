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
      className="relative isolate overflow-hidden pt-32 sm:pt-40"
    >
      <HeroBackdrop />
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />

      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <Sparkles size={12} className="text-primary-glow" />
            <span>Hassle-Free Technology for Egyptian Businesses</span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">
            <span className="block">
              <span data-hero-line className="block text-gradient">Hassle-Free</span>
            </span>
            <span className="block">
              <span data-hero-line className="block ">
                <span className="text-gradient-magenta">Technology</span> for
              </span>
            </span>
            <span className="block">
              <span data-hero-line className="block text-gradient">Your Business.</span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            Procode provides unlimited IT support, web development, and digital marketing
            for SMEs and NGOs across Egypt. Focus on your passion, we'll handle the technicalities.
          </p>

          <div className="mt-8 flex flex-col justify-center items-center gap-3 sm:flex-row">
            <a
              data-hero-cta
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Start a project</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              data-hero-cta
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              View case studies
            </a>
          </div>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 text-left">
            {[
              { k: "500+", v: "Clients served" },
              { k: "24/7", v: "Support available" },
              { k: "15+", v: "Years experience" },
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
