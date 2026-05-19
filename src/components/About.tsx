import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import content from "@/content.json";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Reveal Animation
      const lines = headlineRef.current?.querySelectorAll(".line-wrapper > span");
      if (lines) {
        gsap.from(lines, {
          y: 100,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
          },
        });
      }

      // 2. DOMINANCE. Animation (Special reveal)
      const dominance = headlineRef.current?.querySelector(".dominance-text");
      if (dominance) {
        gsap.fromTo(
          dominance,
          { scaleX: 1.1, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: dominance,
              start: "top 85%",
            },
          },
        );

        // Animated gradient shift & glow pulse
        gsap.to(dominance, {
          filter: "drop-shadow(0 0 15px rgba(255, 91, 138, 0.3))",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Scroll Scale Effect
      gsap.to(containerRef.current, {
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 4. Mini Points Animation
      const points = featuresRef.current?.querySelectorAll(".feature-point");
      if (points) {
        gsap.from(points, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 90%",
          },
        });

        // Line animations for features
        const lines = featuresRef.current?.querySelectorAll(".feature-line");
        if (lines) {
          gsap.from(lines, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1,
            stagger: 0.15,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 90%",
            },
          });
        }
      }

      // 5. Ambient Background Motion
      gsap.to(".ambient-glow", {
        x: "20%",
        y: "10%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative flex min-h-[120vh] flex-col items-center justify-center py-32"
    >
      {/* Background Elements */}
      <div className="ambient-glow absolute -top-1/4 -left-1/4 h-full w-full rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      {/* <div className="ambient-glow absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-primary-glow/5 blur-[120px] pointer-events-none" /> */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="container-px relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* Top Label */}
        <div
          ref={labelRef}
          className="mb-8 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground"
        >
          {content.about.eyebrow}
        </div>

        {/* Main Headline */}
        <div
          ref={headlineRef}
          className="flex flex-col font-display text-[clamp(3.5rem,10vw,5.5rem)] font-bold leading-[0.9] tracking-tighter"
        >
          {content.about.headline.map((line, i) => (
            <div
              key={line}
              className={`line-wrapper ${i === content.about.headline.length - 1 ? "pb-4" : "overflow-hidden"}`}
            >
              <span
                className={`block ${i === content.about.headline.length - 1 ? "dominance-text text-gradient-magenta" : "text-white"}`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Supporting Paragraph */}
        <p
          ref={paragraphRef}
          className="mt-12 max-w-xl text-balance text-lg font-light text-muted-foreground/80 md:text-xl"
        >
          {content.about.description}
        </p>

        {/* Bottom Mini Points */}
        <div
          ref={featuresRef}
          className="mt-20 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16"
        >
          {content.about.features.map((point) => (
            <div key={point} className="feature-point group relative py-2">
              <span className="text-sm font-medium tracking-wide text-muted-foreground transition-colors group-hover:text-primary-glow md:text-md">
                {point}
              </span>
              <div className="feature-line absolute -bottom-1 left-0 h-[1px] w-full bg-white/10 transition-colors group-hover:bg-primary-glow" />
              <div className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary-glow transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(255,91,138,0.5)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
