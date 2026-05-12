import { useEffect, useRef } from "react";
import {
  Brain,
  Cloud,
  Code2,
  Globe,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

type StackT = { x: number; y: number; rot: number; scale: number };

function computeStackTargets(
  wrap: HTMLElement,
  cards: HTMLElement[],
): StackT[] {
  if (cards.length === 0) return [];
  const cr = wrap.getBoundingClientRect();
  const tcx = cr.left + cr.width / 2;
  const tcy = cr.top + cr.height * 0.38;
  const n = cards.length;
  return cards.map((el, i) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return {
      x: tcx - cx,
      y: tcy - cy + i * 12,
      rot: (i - (n - 1) / 2) * 3.2,
      scale: 1 - i * 0.026,
    };
  });
}

export function Services() {
  const root = useRef<HTMLElement>(null);
  const cardsWrap = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const stackTs = useRef<StackT[]>([]);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const section = root.current;
    const wrap = cardsWrap.current;
    if (!section || !wrap) return;

    const refreshStack = () => {
      const els = cardRefs.current.filter(Boolean) as HTMLElement[];
      stackTs.current =
        els.length > 0 ? computeStackTargets(wrap, els) : [];
    };

    const ctx = gsap.context(() => {
      refreshStack();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.6)}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: refreshStack,
        },
      });

      tl.fromTo(
        "[data-services-head]",
        { opacity: 0, y: 28, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 0.08,
        },
        0,
      );

      const cardEls = gsap.utils.toArray<HTMLElement>("[data-services-card]");
      const n = cardEls.length;
      const dealStart = 0.1;
      const dealEnd = 0.72;
      const segment = n > 0 ? (dealEnd - dealStart) / n : 0.1;

      tl.set(
        cardEls,
        {
          opacity: 0,
          y: 96,
          scale: 0.92,
          transformOrigin: "50% 50%",
        },
        0,
      );

      cardEls.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: segment * 0.88,
          },
          dealStart + i * segment,
        );
      });

      const stackLabel = dealEnd + 0.04;
      cardEls.forEach((el, i) => {
        tl.to(
          el,
          {
            x: () => stackTs.current[i]?.x ?? 0,
            y: () => stackTs.current[i]?.y ?? 0,
            rotation: () => stackTs.current[i]?.rot ?? 0,
            scale: () => stackTs.current[i]?.scale ?? 1,
            zIndex: 10 + i,
            boxShadow: "0 22px 48px rgba(0,0,0,0.42)",
            ease: "power2.inOut",
            duration: 0.14,
          },
          stackLabel + i * 0.018,
        );
      });

      gsap.to("[data-services-glow]", {
        opacity: 1,
        xPercent: 8,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    const raf = requestAnimationFrame(() => {
      refreshStack();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
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

        <div
          ref={cardsWrap}
          className="relative mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <article
              key={s.title}
              data-services-card
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6 will-change-transform transition-colors hover:border-primary/35"
            >
              <div
                data-services-glow
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)",
                }}
              />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary-glow transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
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
