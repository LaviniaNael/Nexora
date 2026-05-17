const items = [
  {
    quote:
      "Procode rebuilt our core platform in nine months. Latency dropped 70%, costs by half, and we shipped AI features we'd been planning for years.",
    name: "Elena Marsh",
    role: "CTO, Northwind Logistics",
  },
  {
    quote:
      "They operate like an extension of our staff engineering team. The architecture they delivered is genuinely the best I've worked with.",
    name: "Daniel Ivanov",
    role: "VP Engineering, Atlas Health",
  },
  {
    quote:
      "From discovery to deployment was unusually calm. The polish on every layer — UX, infra, security — was world-class.",
    name: "Priya Kapoor",
    role: "CEO, Kairos AI",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Voices</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Trusted by teams shipping at the <span className="text-gradient-magenta">edge.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="glass relative rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent" />
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow font-display text-sm font-semibold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
