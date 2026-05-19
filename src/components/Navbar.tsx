import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/content.json";

declare global {
  interface Window {
    triggerCinematicNav?: (id: string) => void;
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Wait for elements to be fully rendered
    const timeout = setTimeout(() => {
      const stTriggers: ScrollTrigger[] = [];

      content.nav.links.forEach((link) => {
        if (link.to === "#") return;
        const id = link.to.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 30%",
            end: "bottom 30%",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(link.to);
            },
            onLeaveBack: (self) => {
              // If leaving the first section (About) upwards, set active back to Home
              if (link.to === "#about" && !self.isActive) {
                setActiveSection("#");
              }
            },
          });
          stTriggers.push(st);
        }
      });

      // Special case for initial load at top
      if (window.scrollY < 100) setActiveSection("#");

      return () => {
        stTriggers.forEach((st) => st.kill());
      };
    }, 500); // 500ms delay to allow DOM/GSAP to settle

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setOpen(false); // Close mobile menu if open
    if (typeof window.triggerCinematicNav === "function") {
      window.triggerCinematicNav(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView();
      else if (target === "#") window.scrollTo(0, 0);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="group flex items-center gap-2"
        >
          <img src="/logo.webp" alt="Procode Logo" className="md:h-7 h-5 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {content.nav.links.map((l) => {
            const isActive = activeSection === l.to;
            return (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className={`group relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-primary-glow font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{l.label}</span>
                <span
                  className={`absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-primary-glow to-transparent transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { y: -1, scale: 1.02, duration: 0.3, ease: "power2.out" });
              const ray = e.currentTarget.querySelector(".glass-ray") as HTMLElement;
              if (ray) {
                gsap.set(ray, { x: "-100%", opacity: 0 });
                gsap.to(ray, { x: "100%", opacity: 1, duration: 0.6, ease: "power2.inOut" });
              }
            }}
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
            }
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40"
          >
            <div
              className="glass-ray absolute inset-0 -skew-x-[35deg] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none w-[120%] blur-[1px]"
              style={{ transform: "translateX(-100%)" }}
            />
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_10px] shadow-primary-glow animate-glow-pulse" />
            <span className="relative z-10">{content.nav.cta}</span>
          </a>
        </div>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background/90 backdrop-blur-xl md:hidden">
          <div className="container-px mx-auto flex max-w-7xl flex-col py-3">
            {content.nav.links.map((l) => {
              const isActive = activeSection === l.to;
              return (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={(e) => handleNavClick(e, l.to)}
                  className={`rounded-md px-3 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-primary-glow font-medium"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
