import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";
import { useRouterState } from "@tanstack/react-router";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const lenisRef = useRef<Lenis>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false, // We handle RAF manually
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      // Force scroll to top instantly on route change
      lenisRef.current.scrollTo(0, { immediate: true });
      // Wait for next tick to let DOM update and scroll to settle
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return null;
}
