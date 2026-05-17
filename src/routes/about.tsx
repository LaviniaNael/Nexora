import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Procode" },
      {
        name: "description",
        content:
          "Procode provides Hassle-Free Technology for SMEs and NGOs, bridging the gap between business passion and technical complexities.",
      },
      { property: "og:title", content: "About — Procode" },
      {
        property: "og:description",
        content: "Hassle-Free Technology provider for businesses worldwide.",
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
        title="Your Digital Reality"
        highlight="Engineering Partner."
        subtitle="Procode is a high-end digital engineering agency specializing in AI solutions, bespoke mobile applications, and enterprise web ecosystems for the global market."
      />
      <section className="container-px mx-auto max-w-5xl pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {[
            [
              "Mission",
              "To accelerate enterprise growth by deploying intelligent software ecosystems. we transition businesses from legacy cost-centers to high-velocity profit-centers.",
            ],
            [
              "Approach",
              "DevOps-native engineering combined with strategic AI integration. We don't just write code; we architect secure, scalable digital realities.",
            ],
            [
              "Operating model",
              "Outcome-driven engineering with absolute transparency. We guarantee 100% ownership of source code, domains, and infrastructure for our clients.",
            ],
            [
              "Standards",
              "Professional experts with deep expertise in LLMs, predictive analytics, and high-performance mobile architectures.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6"
            >
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
