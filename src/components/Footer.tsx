// import { Link } from "@tanstack/react-router";
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
              <img src="/logo.webp" alt="Procode Logo" className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Hassle-Free Technology for SMEs and NGOs. We bridge the gap between your business
              passion and technical complexities.
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
                { to: "/services", label: "IT Management" },
                { to: "/services", label: "Web Development" },
                { to: "/services", label: "Mobile Apps" },
              ]}
            />
            <FooterCol
              title="Solutions"
              items={[
                { to: "/solutions", label: "Digital Marketing" },
                { to: "/solutions", label: "Media Production" },
                { to: "/solutions", label: "Data Backup" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Procode Egypt. All rights reserved.</p>
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
  items: {
    to: "/about" | "/case-studies" | "/contact" | "/services" | "/solutions";
    label: string;
  }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.to} className="text-foreground/80 transition-colors hover:text-foreground">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
