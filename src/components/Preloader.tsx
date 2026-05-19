import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on every refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
        // Enable pointer events after loading
        document.body.style.overflow = "auto";
      },
    });

    // Initial state
    document.body.style.overflow = "hidden";

    tl.to("[data-loader-progress]", {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    });

    tl.to("[data-loader-overlay]", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2,
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      data-loader-overlay
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0610]"
    >
      <div className="relative flex flex-col items-center">
        <img src="/logo.webp" alt="Logo" className="h-8 w-auto mb-8 animate-pulse opacity-50" />
        <div className="h-[1px] w-48 bg-white/5 overflow-hidden rounded-full">
          <div
            data-loader-progress
            className="h-full w-0 bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_15px] shadow-primary/50"
          />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Initializing Systems
        </p>
      </div>
    </div>
  );
}
