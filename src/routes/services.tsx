import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Services as ServicesGrid } from "@/components/Services";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nexora" },
      {
        name: "description",
        content:
          "Custom software, AI integration, cloud infrastructure, cybersecurity, mobile, and UI/UX engineering services.",
      },
      { property: "og:title", content: "Services — Nexora" },
      {
        property: "og:description",
        content: "Six engineering disciplines, one team building elite systems.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Engineered for"
        highlight="serious systems."
        subtitle="From greenfield platforms to mission-critical modernization, Nexora delivers across the full software lifecycle."
      />
      <ServicesGrid />
      <CTA />
    </>
  );
}
