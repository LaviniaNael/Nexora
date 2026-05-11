import { useEffect, useRef } from "react";
import {
  Brain, Cloud, Code2, Globe, ShieldCheck, Smartphone,
} from "lucide-react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

const services = [
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke platforms engineered for performance, scale, and longevity.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Production-grade LLM, RAG, and agent systems woven into your workflows.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Multi-region, IaC-driven cloud systems with predictable costs.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Zero-trust architecture, threat modeling, and continuous compliance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile experiences with cinematic UX.",
  },
  {
    icon: Globe,
    title: "UI/UX Engineering",
    desc: "Award-winning interfaces with measurable conversion impact.",
  },
];

export function Services() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 35%",
          scrub: 0.7,
        },
      });

      tl.fromTo(
        "[data-services-head]",
        { opacity: 0, y: 24, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.6 },
        0,
      );

      // "cinematic" stagger that feels more like waves than cards popping in.
      tl.fromTo(
        "[data-services-card]",
        { opacity: 0, y: 90, rotateX: -18, transformPerspective: 1000, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1,
          stagger: { each: 0.08, from: "center" },
        },
        0.12,
      );

      // subtle ambient drift on the hover-radial, tied to scroll.
      gsap.to("[data-services-glow]", {
        opacity: 1,
        xPercent: 8,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div data-services-head className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Capabilities</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A complete engineering <span className="text-gradient-magenta">stack.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six disciplines, one team. We design, build, and operate the systems
            that move your business forward.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              data-services-card
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6 will-change-transform transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div
                data-services-glow
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)",
                }}
              />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary-glow transition-all group-hover:scale-110 group-hover:shadow-glow">
                <s.icon size={20} />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
              <div className="relative mt-6 flex items-center text-xs font-medium text-primary-glow opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
