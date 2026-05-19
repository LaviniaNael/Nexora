import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Showcase } from "@/components/Showcase";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";
import content from "@/content.json";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Procode" },
      {
        name: "description",
        content:
          "Digital Marketing, Media Production, Data Backup, and comprehensive technology solutions for businesses worldwide.",
      },
      { property: "og:title", content: "Solutions — Procode" },
      {
        property: "og:description",
        content: "Complete technology solutions for SMEs and NGOs.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const { solutions } = content.pages;
  return (
    <>
      <PageHeader
        eyebrow={solutions.eyebrow}
        title={solutions.title}
        highlight={solutions.highlight}
        subtitle={solutions.subtitle}
      />
      <Showcase />
      <Stats />
      <CTA />
    </>
  );
}
