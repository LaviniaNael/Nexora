import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="container-px mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          {title} {highlight && <span className="text-gradient-magenta">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
