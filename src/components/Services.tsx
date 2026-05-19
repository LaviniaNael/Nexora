import { useEffect, useRef } from "react";
import { Brain, Cloud, Code2, Globe, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import content from "@/content.json";

const iconMap: Record<string, LucideIcon> = {
  "AI & Automation": Brain,
  "Enterprise Web": Code2,
  "Mobile Innovation": Smartphone,
  "DevOps & Cloud": ShieldCheck,
  "Predictive Analytics": Globe,
  "Intelligent Dashboards": Cloud,
};

const services = content.services.items.map((item) => ({
  ...item,
  icon: iconMap[item.title] || Brain,
}));

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  STACK TARGET TYPE
 *  Each card receives an (x, y, rotation, scale) target
 *  for the "stacking" phase at the end of the scroll.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
type StackT = { x: number; y: number; rot: number; scale: number };

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  computeStackTargets()
 *  Calculates where each card should fly to when they "stack"
 *  into a fanned pile at the center of the container.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
function computeStackTargets(wrap: HTMLElement, cards: HTMLElement[]): StackT[] {
  if (cards.length === 0) return [];
  const cr = wrap.getBoundingClientRect();
  const tcx = cr.left + cr.width / 2; // horizontal center of container
  const tcy = cr.top + cr.height * 0.38; // vertical target (38% from top)
  const n = cards.length;
  return cards.map((el, i) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2; // card's current horizontal center
    const cy = r.top + r.height / 2; // card's current vertical center
    return {
      x: tcx - cx, // horizontal distance to fly
      y: tcy - cy + i * 12, // vertical distance + stagger offset
      rot: (i - (n - 1) / 2) * 3.2, // fan rotation (cards fan out from center)
      scale: 1 - i * 0.026, // each card slightly smaller than the last
    };
  });
}

export function Services() {
  const root = useRef<HTMLElement>(null); // the <section> — ScrollTrigger's trigger & pin target
  const cardsWrap = useRef<HTMLDivElement>(null); // the grid container — used for stack target math
  const cardRefs = useRef<(HTMLElement | null)[]>([]); // individual card DOM refs
  const stackTs = useRef<StackT[]>([]); // cached stack positions (recalculated on resize)

  useEffect(() => {
    registerGsapPlugins();

    if (prefersReducedMotion()) return;

    const section = root.current;
    const wrap = cardsWrap.current;
    if (!section || !wrap) return;

    const refreshStack = () => {
      const els = cardRefs.current.filter(Boolean) as HTMLElement[];
      stackTs.current = els.length > 0 ? computeStackTargets(wrap, els) : [];
    };

    const ctx = gsap.context(() => {
      refreshStack();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 7.5)}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: refreshStack,
        },
      });

      const cardEls = gsap.utils.toArray<HTMLElement>("[data-services-card]");
      const firstRow = cardEls.slice(0, 3);
      const secondRow = cardEls.slice(3, 6);
      const headEl = "[data-services-head]";
      const innerEl = "[data-services-inner]";

      // INITIAL STATE (t=0)
      // We make the title and first row partially visible at start
      // so it's not empty when jumping to the section
      tl.set(
        cardEls,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          transformOrigin: "50% 50%",
        },
        0,
      );

      tl.set(
        headEl,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        },
        0,
      );

      // PHASE 1 — TITLE FADES IN (Starts IMMEDIATELY at t=0)
      tl.to(
        headEl,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 0.1,
        },
        0,
      );

      // PHASE 2 — FIRST 3 CARDS ANIMATE IN (Earlier start)
      firstRow.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.08,
          },
          0.02 + i * 0.03,
        );
      });

      // PHASE 4 — TRANSITION: TITLE OUT, SECOND ROW IN (t = 0.35)
      tl.to(
        headEl,
        {
          opacity: 0,
          y: -120,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.35,
      );

      tl.to(
        innerEl,
        {
          y: () => {
            const headHeight =
              (section.querySelector("[data-services-head]") as HTMLElement)?.offsetHeight ?? 160;
            return -(headHeight - 25);
          },
          ease: "power2.inOut",
          duration: 0.15,
        },
        0.36,
      );

      secondRow.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.08,
          },
          0.4 + i * 0.04,
        );
      });

      // PHASE 6 — STACK ANIMATION (t = 0.7)
      const stackStart = 0.7;
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
            duration: 0.15,
          },
          stackStart + i * 0.02,
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
    <div>
      <section ref={root} id="services" className="services-section relative overflow-hidden">
        <div data-services-inner className="container-px mx-auto max-w-7xl will-change-transform">
          <div data-services-head className="mx-auto max-w-2xl text-center pt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
              {content.services.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {content.services.title}{" "}
              <span className="text-gradient-magenta">{content.services.titleHighlight}</span>{" "}
              {content.services.titleSuffix}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              {content.services.description}
            </p>
          </div>

          <div
            ref={cardsWrap}
            className="relative mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s, i) => (
              <article
                key={s.title}
                data-services-card
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-5 will-change-transform transition-colors hover:border-primary/35"
              >
                <div
                  data-services-glow
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)",
                  }}
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary-glow transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  <s.icon size={18} />
                </div>
                <h3 className="relative mt-4 font-display text-base font-semibold sm:text-lg">
                  {s.title}
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="relative mt-4 flex items-center text-xs font-medium text-primary-glow opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
