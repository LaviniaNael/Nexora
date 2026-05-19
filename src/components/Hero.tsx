import { useEffect, useRef } from "react";
// import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBackdrop } from "./HeroBackdrop";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import content from "@/content.json";

declare global {
  interface Window {
    triggerCinematicNav?: (id: string) => void;
  }
}

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

      // Looping Typewriter Effect
      const typewriterElement = document.querySelector("[data-hero-typewriter]");
      if (typewriterElement && content.hero.typewriterStrings.length > 0) {
        const words = content.hero.typewriterStrings;
        const mainTl = gsap.timeline({ repeat: -1 });

        words.forEach((word) => {
          // Type word
          mainTl.to(typewriterElement, {
            duration: word.length * 0.08,
            text: word,
            ease: "none",
          });

          // Wait
          mainTl.to({}, { duration: 2 });

          // Erase word
          mainTl.to(typewriterElement, {
            duration: word.length * 0.04,
            text: "",
            ease: "none",
          });

          // Small pause before next word
          mainTl.to({}, { duration: 0.3 });
        });
      }

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
        delay: 1.2,
      });
      gsap.from("[data-hero-cta]", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 1.5,
      });
      gsap.from("[data-hero-stat]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 1.8,
      });
      gsap.from("[data-hero-dashboard]", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
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
    <section ref={root} id="home" className="relative isolate overflow-hidden pt-16 sm:pt-24">
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
            <span>{content.hero.eyebrow}</span>
          </div>

          <h1 className="mt-6 font-display uppercase text-[clamp(2.5rem,6.5vw,4.8rem)] font-bold leading-[0.95] tracking-tighter text-balance min-h-[2.2em]">
            <span data-hero-line className="block text-gradient">
              {content.hero.titleFirstLine}
            </span>
            <span className="block">
              <span data-hero-typewriter className="text-gradient-magenta"></span>
              <span className="inline-block w-[2px] h-[0.8em] bg-primary-glow ml-1 animate-pulse align-middle" />
            </span>
          </h1>

          <p data-hero-sub className="mt-6 max-w-lg text-balance text-md font-light text-muted-foreground/80 md:text-lg">
            {content.hero.subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#contact"
              data-hero-cta
              onClick={(e) => {
                e.preventDefault();
                if (typeof window.triggerCinematicNav === "function") {
                  window.triggerCinematicNav("#contact");
                }
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -2, scale: 1.02, duration: 0.3, ease: "power2.out" });
                const ray = e.currentTarget.querySelector(".glass-ray") as HTMLElement;
                if (ray) {
                  gsap.set(ray, { x: "-100%", opacity: 0 });
                  gsap.to(ray, {
                    x: "200%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                  });
                }
              }}
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
              }
              className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent bg-gradient-to-r from-primary to-primary-glow px-8 text-sm font-medium text-white shadow-glow"
            >
              <div
                className="glass-ray absolute inset-0 -skew-x-[35deg] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none w-[150%] blur-[2px]"
                style={{ transform: "translateX(-100%)" }}
              />
              <span className="relative z-10">{content.hero.cta}</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#solutions"
              data-hero-cta
              onClick={(e) => {
                e.preventDefault();
                if (typeof window.triggerCinematicNav === "function") {
                  window.triggerCinematicNav("#solutions");
                }
              }}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  y: -2,
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
              className="group relative flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              {content.hero.secondaryCta}
            </a>
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
              <div className="font-mono text-[10px] text-muted-foreground">
                procode.eg / monitoring
              </div>
              <div className="font-mono text-[10px] text-primary-glow animate-glow-pulse">
                ● live
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Latency p95
                </div>
                <div className="mt-2 font-display text-2xl font-semibold">42ms</div>
                <div className="mt-3 h-16 w-full overflow-hidden rounded-md bg-gradient-to-t from-primary/20 to-transparent">
                  <Spark />
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Inferences / sec
                </div>
                <div className="mt-2 font-display text-2xl font-semibold text-gradient-magenta">
                  12,480
                </div>
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
                <div>
                  <span className="text-primary-glow">$</span> deploy production
                </div>
                <div>
                  → build <span className="text-foreground">ok</span>
                </div>
                <div>
                  → test <span className="text-foreground">142 passed</span>
                </div>
                <div>
                  → scan <span className="text-foreground">0 vulns</span>
                </div>
                <div>
                  → ship <span className="text-primary-glow">live ✦</span>
                </div>
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
