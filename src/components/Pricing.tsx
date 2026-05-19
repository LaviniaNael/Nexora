import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import content from "@/content.json";

export function Pricing() {
  return (
    <section className="relative py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
            {content.pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.pricing.title}{" "}
            <span className="text-gradient-magenta">{content.pricing.titleHighlight}</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {content.pricing.tiers.map((t) => (
            <div
              key={t.name}
              className={`group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                t.featured
                  ? "border-primary/40 bg-gradient-to-b from-primary/15 to-surface shadow-glow"
                  : "border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40"
              }`}
            >
              {t.featured && (
                <span className="absolute right-6 top-6 rounded-full border border-primary/40 bg-primary/15 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-primary-glow">
                  Most chosen
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-gradient">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/85">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                      <Check size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  t.featured
                    ? "bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow hover:scale-[1.02]"
                    : "border border-white/10 bg-white/[0.03] text-foreground hover:border-primary/40 hover:bg-primary/10"
                }`}
              >
                {content.pricing.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
