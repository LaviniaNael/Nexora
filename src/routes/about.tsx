import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Procode Egypt" },
      {
        name: "description",
        content:
          "Procode Egypt provides Hassle-Free Technology for SMEs and NGOs, bridging the gap between business passion and technical complexities.",
      },
      { property: "og:title", content: "About — Procode Egypt" },
      {
        property: "og:description",
        content: "Hassle-Free Technology provider for Egyptian businesses.",
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
        title="Your External"
        highlight="IT Department."
        subtitle="Procode Egypt is your Hassle-Free Technology partner, providing unlimited technical support, web development, and digital marketing for SMEs and NGOs across Egypt."
      />
      <section className="container-px mx-auto max-w-5xl pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {[
            [
              "Mission",
              "Bridge the gap between your business passion and technical complexities. We handle the technicalities so you can focus on growth.",
            ],
            [
              "Approach",
              "Unlimited technical support with monthly on-site visits. We're your external IT department, always available when you need us.",
            ],
            [
              "Operating model",
              "Hassle-Free Technology with predictable costs. No surprises, just reliable IT management and digital services.",
            ],
            [
              "Standards",
              "Professional experts with years of experience serving SMEs and NGOs across Egypt. We treat your business like our own.",
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
