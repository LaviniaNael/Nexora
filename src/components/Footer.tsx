// import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import content from "@/content.json";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="container-px relative mx-auto max-w-7xl py-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <img src="/logo.webp" alt="Procode Logo" className="lg:h-6 h-5 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{content.footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <FooterCol
              title="Company"
              items={[
                { to: "/about", label: "About" },
                { to: "/solutions", label: "Solutions" },
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
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Procode. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href={content.footer.links.facebook}
              target="_blank"
              className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              aria-label="social"
            >
              <Facebook size={15} />
            </a>
            <a
              href={content.footer.links.linkedin}
              target="_blank"
              className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              aria-label="social"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={content.footer.links.whatsapp}
              target="_blank"
              className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              aria-label="social"
            >
              <FaWhatsapp size={15} />
            </a>
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
    to: "/about" | "/contact" | "/services" | "/solutions";
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
