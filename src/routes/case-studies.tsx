import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Procode Egypt" },
      {
        name: "description",
        content:
          "How Procode Egypt helped SMEs and NGOs with Hassle-Free Technology — selected success stories.",
      },
      { property: "og:title", content: "Case Studies — Procode Egypt" },
      {
        property: "og:description",
        content: "Success stories from Egyptian businesses.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

const cases = [
  {
    client: "Cairo NGO",
    industry: "Non-profit",
    headline: "Complete IT infrastructure setup with unlimited support.",
    metric: "Zero downtime",
  },
  {
    client: "Alexandria Retail",
    industry: "Retail",
    headline: "E-commerce platform with digital marketing integration.",
    metric: "+150% sales",
  },
  {
    client: "Giza Manufacturing",
    industry: "Manufacturing",
    headline: "Network security and data backup implementation.",
    metric: "100% secure",
  },
  {
    client: "Mansoura Education",
    industry: "Education",
    headline: "Custom web application and mobile app development.",
    metric: "5000+ users",
  },
  {
    client: "Aswan Healthcare",
    industry: "Healthcare",
    headline: "Patient management system with HIPAA compliance.",
    metric: "24/7 access",
  },
  {
    client: "Luxor Tourism",
    industry: "Tourism",
    headline: "Digital marketing campaign and media production.",
    metric: "+200% bookings",
  },
];

function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Success"
        highlight="Stories."
        subtitle="How Procode Egypt has helped SMEs and NGOs across Egypt with Hassle-Free Technology solutions."
      />
      <section className="container-px mx-auto max-w-7xl pb-32">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              to="/contact"
              key={c.client}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)",
                }}
              />
              <div className="relative flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{c.industry}</span>
                <ArrowUpRight
                  size={14}
                  className="text-primary-glow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <div className="relative mt-6 font-display text-2xl font-semibold leading-tight">
                {c.headline}
              </div>
              <div className="relative mt-6 flex items-center justify-between text-sm">
                <span className="text-foreground/80">{c.client}</span>
                <span className="font-mono text-primary-glow">{c.metric}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
