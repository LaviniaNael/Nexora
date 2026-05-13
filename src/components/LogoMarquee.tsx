export function LogoMarquee() {
  const logos = [
    "ATLAS",
    "NORTHWIND",
    "KAIROS",
    "HELIOS",
    "OBSIDIAN",
    "VANTAGE",
    "AURORA",
    "QUANTUM",
    "MERIDIAN",
    "STRATA",
  ];
  const row = [...logos, ...logos];
  return (
    <section className="container-px mx-auto mt-24 max-w-7xl">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Trusted by engineering teams at
      </p>
      <div className="mask-fade-x mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-14 opacity-70">
          {row.map((name, i) => (
            <span
              key={i}
              className="font-display text-xl font-semibold tracking-[0.2em] text-muted-foreground/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
