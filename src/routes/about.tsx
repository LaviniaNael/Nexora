import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nexora" },
      {
        name: "description",
        content:
          "Nexora is a global engineering studio building custom software, AI, and cloud systems for ambitious companies.",
      },
      { property: "og:title", content: "About — Nexora" },
      {
        property: "og:description",
        content:
          "A global engineering studio building elite software for ambitious companies.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A studio of"
        highlight="staff engineers."
        subtitle="Nexora is a 70-person engineering studio with offices in London, New York, and Singapore. We partner with companies that take their software seriously."
      />
      <section className="container-px mx-auto max-w-5xl pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {[
            ["Mission", "Build the systems that move the next decade forward — calmly, predictably, and at the highest possible standard of craft."],
            ["Approach", "Small senior teams. Weekly shipping rhythm. Architecture that ages well. We optimize for the system you'll still be running in ten years."],
            ["Operating model", "Embedded squads, transparent process, and direct access to the engineers building your system. No layers, no surprises."],
            ["Standards", "SOC 2 Type II, ISO 27001, and a culture that treats security and reliability as features, not afterthoughts."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6">
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Stats />
      <Process />
      <Testimonials />
    </>
  );
}
