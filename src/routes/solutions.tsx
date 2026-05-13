import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Showcase } from "@/components/Showcase";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Procode Egypt" },
      {
        name: "description",
        content:
          "Digital Marketing, Media Production, Data Backup, and comprehensive technology solutions for Egyptian businesses.",
      },
      { property: "og:title", content: "Solutions — Procode Egypt" },
      {
        property: "og:description",
        content: "Complete technology solutions for SMEs and NGOs.",
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
        title="Complete"
        highlight="Digital Ecosystem."
        subtitle="From digital marketing to media production and data backup, Procode provides end-to-end solutions for your business growth."
      />
      <Showcase />
      <Stats />
      <CTA />
    </>
  );
}
