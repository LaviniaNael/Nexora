import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import content from "@/content.json";

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
  const { about } = content.pages;
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.title}
        highlight={about.highlight}
        subtitle={about.subtitle}
      />
      <section className="container-px mx-auto max-w-5xl pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {about.points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6"
            >
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
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
