import { ArrowRight } from "lucide-react";
import content from "@/content.json";

export function CTA() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-surface via-surface-elevated to-background p-12 text-center shadow-elegant sm:p-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{ background: "var(--gradient-radial)" }}
        />
        <div className="absolute inset-0 bg-grid-sm opacity-40 mask-fade-b" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-[0.95] tracking-tighter sm:text-5xl">
            {content.cta.title}{" "}
            <span className="text-gradient-magenta">{content.cta.titleHighlight}</span>{" "}
            {content.cta.titleSuffix}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-sm">
            {content.cta.description}
          </p>
          <a
            href={`mailto:${content.contact.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            {content.cta.button}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
