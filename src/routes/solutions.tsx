import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Showcase } from "@/components/Showcase";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Nexora" },
      {
        name: "description",
        content:
          "Enterprise platforms, AI operations, cloud control planes, and zero-trust security solutions.",
      },
      { property: "og:title", content: "Solutions — Nexora" },
      {
        property: "og:description",
        content: "One control plane for every system you ship.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Platforms for"
        highlight="every layer."
        subtitle="A unified control plane covering AI operations, cloud delivery, and continuous security — built for the way modern teams ship."
      />
      <Showcase />
      <Stats />
      <CTA />
    </>
  );
}
