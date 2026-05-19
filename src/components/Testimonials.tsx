import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import content from "@/content.json";

const items = content.testimonials.items;

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header Animation: Cinematic Focus Blur
      gsap.fromTo(
        "[data-testimonials-head]",
        { opacity: 0, filter: "blur(20px)", scale: 0.95 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-testimonials-head]",
            start: "top 85%",
          },
        },
      );

      // 2. Cards Entrance: 3D Perspective Unfold
      gsap.fromTo(
        "[data-testimonial-card]",
        {
          opacity: 0,
          y: 80,
          z: -150,
          rotateX: -25,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          duration: 1.8, // Increased duration for a more deliberate feel
          stagger: 0.3, // Increased stagger for a clearer sequential entrance
          ease: "expo.out",
          scrollTrigger: {
            trigger: "[data-testimonials-grid]",
            start: "top 75%", // Triggers slightly later (higher in viewport)
          },
        },
      );

      // 3. Micro-Interactions: Magnetic Pull & Internal Parallax
      const cards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");
      cards.forEach((card) => {
        const avatar = card.querySelector("[data-avatar-parallax]");

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const xc = rect.width / 2;
          const yc = rect.height / 2;

          const dx = x - xc;
          const dy = y - yc;

          // Tilt card
          gsap.to(card, {
            rotateY: dx / 15,
            rotateX: -dy / 10,
            duration: 0.5,
            ease: "power2.out",
          });

          // Parallax avatar
          if (avatar) {
            gsap.to(avatar, {
              x: dx / 8,
              y: dy / 8,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          if (avatar) {
            gsap.to(avatar, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-32 overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <div data-testimonials-head className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
            {content.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.testimonials.title}{" "}
            <span className="text-gradient-magenta">{content.testimonials.titleHighlight}</span>{" "}
            {content.testimonials.titleSuffix}
          </h2>
        </div>

        <div data-testimonials-grid className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              data-testimonial-card
              className="glass relative rounded-2xl p-6 transition-colors duration-500 hover:bg-white/[0.02] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent" />
              <blockquote className="text-sm leading-relaxed text-foreground/90 mb-8">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <div
                  data-avatar-parallax
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow font-display text-sm font-semibold text-white shadow-glow"
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
