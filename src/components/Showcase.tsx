import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

const panels = [
  {
    tag: "AI Operations",
    title: "Observe every model in production.",
    desc: "Real-time metrics, drift detection, and cost attribution across every inference, every region.",
    bullets: ["Drift & quality monitors", "Multi-tenant cost tracking", "Auto-rollback on regression"],
  },
  {
    tag: "Cloud Platform",
    title: "Ship to anywhere. Operate from one place.",
    desc: "Unified control plane for multi-cloud workloads with policy as code and zero-downtime delivery.",
    bullets: ["IaC blueprints", "Progressive delivery", "FinOps dashboards"],
  },
  {
    tag: "Security",
    title: "Zero-trust by default, by design.",
    desc: "Continuous compliance, threat modeling, and runtime protection baked into every release.",
    bullets: ["SOC 2 / ISO 27001", "Runtime threat detection", "Secrets governance"],
  },
];

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const panelsEl = gsap.utils.toArray<HTMLElement>("[data-showcase-panel]");
      const mediaEl = gsap.utils.toArray<HTMLElement>("[data-showcase-media]");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.max(1, panelsEl.length) * 800}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      panelsEl.forEach((panel, i) => {
        const media = mediaEl[i];
        const label = `p${i}`;
        tl.addLabel(label);

        // enter
        tl.fromTo(
          panel,
          { autoAlpha: 0, y: 40, filter: "blur(14px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" },
          label,
        );

        if (media) {
          tl.fromTo(
            media,
            { yPercent: 10, rotateX: -8, transformPerspective: 1000, autoAlpha: 0.7 },
            { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" },
            label,
          );
        }

        // hold
        tl.to({}, { duration: 0.35 });

        // exit (except last)
        if (i < panelsEl.length - 1) {
          tl.to(panel, { autoAlpha: 0, y: -30, filter: "blur(12px)", duration: 0.22, ease: "power2.inOut" });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-22 h-screen">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Platform</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One control plane for <span className="text-gradient-magenta">every system</span> you ship.
          </h2>
        </div>

        <div className="relative min-h-[min(85vh,52rem)] lg:min-h-[min(85vh,24rem)]">
          {panels.map((p, i) => (
            <div
              key={p.title}
              data-showcase-panel
              className={`absolute inset-0 isolate grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            >
              <div>
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary-glow">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-foreground/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_8px] shadow-primary-glow" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-10 rounded-[2rem] opacity-60 blur-3xl"
                  style={{ background: "var(--gradient-radial)" }}
                />
                <div data-showcase-media className="will-change-transform">
                  <MockPanel index={i} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockPanel({ index }: { index: number }) {
  return (
    <div className="glow-ring relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-surface-elevated p-5 shadow-elegant">
      <div className="mb-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span>nexora / panel-{index + 1}</span>
        <span className="text-primary-glow">● synced</span>
      </div>
      {index === 0 && (
        <div className="grid grid-cols-6 items-end gap-1.5 h-44">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm bg-gradient-to-t from-primary to-primary-glow/80"
              style={{ height: `${15 + Math.abs(Math.sin(i * 0.7)) * 80}%` }}
            />
          ))}
        </div>
      )}
      {index === 1 && (
        <div className="space-y-2 font-mono text-[11px] text-muted-foreground">
          {[
            ["us-east-1", "ok", "120ms"],
            ["eu-west-2", "ok", "98ms"],
            ["ap-south-1", "ok", "142ms"],
            ["sa-east-1", "deploying", "—"],
            ["af-south-1", "ok", "188ms"],
          ].map(([r, s, l]) => (
            <div key={r} className="flex items-center justify-between rounded-md bg-black/30 px-3 py-2">
              <span className="text-foreground/80">{r}</span>
              <span className={s === "ok" ? "text-primary-glow" : "text-yellow-300/80"}>{s}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      )}
      {index === 2 && (
        <div className="grid grid-cols-2 gap-3">
          {["SOC 2", "ISO 27001", "GDPR", "HIPAA"].map((c) => (
            <div key={c} className="rounded-xl border border-white/5 bg-black/30 p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Compliant</div>
              <div className="mt-1 font-display text-lg font-semibold">{c}</div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[92%] bg-gradient-to-r from-primary to-primary-glow" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
