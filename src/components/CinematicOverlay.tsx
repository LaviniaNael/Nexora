import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

declare global {
  interface Window {
    triggerCinematicNav?: (target: string) => void;
    lenis?: Lenis;
  }
}

export function CinematicOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose trigger globally for easier access from nav links
    window.triggerCinematicNav = (target: string) => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const tl = gsap.timeline({
        onStart: () => {
          // Disable interactions during transition
          document.body.style.pointerEvents = "none";
        },
        onComplete: () => {
          document.body.style.pointerEvents = "";
        },
      });

      // 1. Current Section Exits + Overlay Sweeps In
      tl.set(overlay, { x: "-100%", opacity: 1 });

      tl.to(overlay, {
        x: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      });

      tl.to(
        "main",
        {
          opacity: 0,
          scale: 0.96,
          filter: "blur(12px)",
          duration: 0.6,
          ease: "power2.in",
        },
        "-=0.7",
      );

      // 2. Invisible Position Change (with small buffer to ensure coverage)
      tl.add(() => {
        const lenis = window.lenis;
        if (target === "#") {
          if (lenis) lenis.scrollTo(0, { immediate: true });
          else window.scrollTo(0, 0);
        } else {
          const el = document.querySelector(target);
          if (el) {
            if (lenis) lenis.scrollTo(el, { immediate: true });
            else el.scrollIntoView();
          }
        }
        // Force GSAP to recalculate positions (critical for pinned sections)
        ScrollTrigger.refresh();
      }, "+=0.1");

      // 3. New Section Reveals + Overlay Sweeps Out
      tl.to(overlay, {
        x: "100%",
        duration: 0.7,
        ease: "power4.out",
      });

      tl.fromTo(
        "main",
        { opacity: 0, scale: 1.02, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.5",
      );
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-background border-x border-white/5 pointer-events-none"
      style={{ transform: "translateX(-100%)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      {/* Centered line detail */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
