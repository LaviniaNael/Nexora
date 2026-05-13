import { useEffect, useMemo, useRef } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

export function PageTransition() {
  const frame = useRef<HTMLDivElement>(null);
  const skipFrameOnce = useRef(true);

  // Use the full URL as a key so the component remounts on route change
  const key = useRouterState({
    select: (s) => s.location.href,
  });

  const reduce = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    registerGsapPlugins();
    if (reduce) return;

    const f = frame.current;
    if (!f) return;

    // Skip animation on the initial page load to avoid layout flashes
    if (skipFrameOnce.current) {
      skipFrameOnce.current = false;
      return;
    }

    // Kill any active animations
    gsap.killTweensOf(f);

    // Clean, modern fade in, slide up, and blur reveal
    gsap.fromTo(
      f,
      { y: 24, opacity: 0, filter: "blur(8px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: 0.6, 
        ease: "power3.out",
        clearProps: "transform,filter" // Crucial: clean up so we don't break position:fixed pinning in children
      }
    );
  }, [key, reduce]);

  return (
    <div className="relative min-h-screen">
      {/* 
        By passing `key` here, React destroys the old DOM and creates a fresh one 
        every time the route changes. This makes the animation hook fire reliably.
      */}
      <div ref={frame} key={key} className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

