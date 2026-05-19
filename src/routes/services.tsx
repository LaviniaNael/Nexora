import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Services as ServicesGrid } from "@/components/Services";
import { CTA } from "@/components/CTA";
import content from "@/content.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Procode" },
      {
        name: "description",
        content:
          "IT Management, Web Development, Mobile Apps, Digital Marketing, Social Media Management, and Media Production services for SMEs and NGOs.",
      },
      { property: "og:title", content: "Services — Procode" },
      {
        property: "og:description",
        content: "Hassle-Free Technology services for businesses worldwide.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = content.pages;
  return (
    <>
      <PageHeader
        eyebrow={services.eyebrow}
        title={services.title}
        highlight={services.highlight}
        subtitle={services.subtitle}
      />
      <ServicesGrid />
      <CTA />
    </>
  );
}
