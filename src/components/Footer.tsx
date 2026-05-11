import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="container-px relative mx-auto max-w-7xl py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-glow shadow-glow">
                <span className="font-display text-sm font-bold text-white">N</span>
              </span>
              <span className="font-display text-base font-semibold">Nexora.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Engineering intelligent digital systems for the next decade of enterprise software.
            </p>
            <form
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-4 focus-within:border-primary/40"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-br from-primary to-primary-glow px-4 py-2 text-sm font-medium text-white shadow-glow"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <FooterCol
              title="Company"
              items={[
                { to: "/about", label: "About" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/contact", label: "Contact" },
              ]}
            />
            <FooterCol
              title="Services"
              items={[
                { to: "/services", label: "Custom Software" },
                { to: "/services", label: "AI Solutions" },
                { to: "/services", label: "Cloud Systems" },
              ]}
            />
            <FooterCol
              title="Solutions"
              items={[
                { to: "/solutions", label: "Enterprise" },
                { to: "/solutions", label: "Cybersecurity" },
                { to: "/solutions", label: "Digital Transformation" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Nexora Systems. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                aria-label="social"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { to: "/about" | "/case-studies" | "/contact" | "/services" | "/solutions"; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i}>
            <Link to={it.to} className="text-foreground/80 transition-colors hover:text-foreground">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
