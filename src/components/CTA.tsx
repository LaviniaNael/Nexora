import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build the system your <span className="text-gradient-magenta">next decade</span> deserves.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Tell us where you're headed. We'll show you how to get there — calmly, predictably, and fast.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Start a project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
