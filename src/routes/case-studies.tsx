import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Procode" },
      {
        name: "description",
        content:
          "How Procode helped SMEs and NGOs with Hassle-Free Technology — selected success stories.",
      },
      { property: "og:title", content: "Case Studies — Procode" },
      {
        property: "og:description",
        content: "Success stories from businesses worldwide.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

const cases = [
  {
    client: "Global NGO",
    industry: "Non-profit",
    headline: "Autonomous AI Agent integration for multilingual donor support.",
    metric: "95% automation",
  },
  {
    client: "MENA Retail",
    industry: "Retail",
    headline: "Predictive Analytics dashboard for dynamic inventory optimization.",
    metric: "+40% margin",
  },
  {
    client: "GCC Logistics",
    industry: "Logistics",
    headline: "DevOps-native replatforming of legacy supply chain software.",
    metric: "Zero downtime",
  },
  {
    client: "Euro EduTech",
    industry: "Education",
    headline: "Hyper-personalized mobile learning app with embedded ML.",
    metric: "10k+ active users",
  },
  {
    client: "Swiss Health",
    industry: "Healthcare",
    headline: "Secure DXP for patient management with HIPAA-grade security.",
    metric: "100% compliant",
  },
  {
    client: "Global Fintech",
    industry: "Financing",
    headline: "AI-powered credit scoring engine and mobile wallet ecosystem.",
    metric: "+200% conversion",
  },
];
function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Success"
        highlight="Stories."
        subtitle="How Procode has helped SMEs and NGOs with Hassle-Free Technology solutions."
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
