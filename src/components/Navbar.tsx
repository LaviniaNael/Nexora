// import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/case-studies", label: "Case Studies" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/5" : "bg-transparent"
        }`}
    >
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <a href="/" className="group flex items-center gap-2">
          <img src="/logo.webp" alt="Procode Logo" className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = currentPath === l.to || (l.to !== "/" && currentPath.startsWith(l.to));
            return (
              <a
                key={l.to}
                href={l.to}
                className={`group relative rounded-md px-3 py-2 text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span className="relative z-10">{l.label}</span>
                <span className={`absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-primary-glow to-transparent transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
              </a>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_10px] shadow-primary-glow animate-glow-pulse" />
            Start a project
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
            {links.map((l) => {
              const isActive = currentPath === l.to || (l.to !== "/" && currentPath.startsWith(l.to));
              return (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm transition-colors ${isActive ? "bg-white/10 text-foreground font-medium" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                >
                  {l.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  );
}
