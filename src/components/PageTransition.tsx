import { useEffect, useMemo, useRef } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

export function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const skipOverlayOnce = useRef(true);
  const skipFrameOnce = useRef(true);

  // `location.search` is parsed object form — never coerce it to string (SSR can throw).
  const key = useRouterState({
    select: (s) => s.location.href,
  });

  const reduce = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    registerGsapPlugins();
    if (reduce) return;

    if (skipOverlayOnce.current) {
      skipOverlayOnce.current = false;
      return;
    }

    const o = overlay.current;
    if (!o) return;

    // wipe up, then down – covers the content swap; fully hide so no fixed layer lingers
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    tl.set(o, { yPercent: 110, autoAlpha: 1, visibility: "visible" });
    tl.to(o, { yPercent: 0, duration: 0.34 });
    tl.to(o, {
      yPercent: -110,
      duration: 0.42,
      delay: 0.04,
      autoAlpha: 0,
      onComplete: () => {
        gsap.set(o, { visibility: "hidden" });
      },
    });
    return () => {
      tl.kill();
    };
  }, [key, reduce]);

  useEffect(() => {
    if (reduce) return;
    const f = frame.current;
    if (!f) return;

    if (skipFrameOnce.current) {
      skipFrameOnce.current = false;
      return;
    }
    gsap.fromTo(
      f,
      { y: 8, autoAlpha: 0.94 },
      { y: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out" },
    );
  }, [key, reduce]);

  return (
    <div className="relative">
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[60] translate-y-full opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,16,0) 0%, rgba(10,6,16,0.92) 35%, rgba(10,6,16,1) 50%, rgba(10,6,16,0.92) 65%, rgba(10,6,16,0) 100%)",
        }}
      />

      <div ref={frame} key={key}>
        <Outlet />
      </div>
    </div>
  );
}

