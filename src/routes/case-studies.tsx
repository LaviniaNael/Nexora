import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Nexora" },
      {
        name: "description",
        content:
          "How Nexora helped enterprises ship intelligent systems at scale — selected case studies.",
      },
      { property: "og:title", content: "Case Studies — Nexora" },
      {
        property: "og:description",
        content: "Selected work shipping intelligent systems at scale.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

const cases = [
  {
    client: "Northwind Logistics",
    industry: "Supply chain",
    headline: "Real-time route optimization across 14 countries.",
    metric: "−42% fuel cost",
  },
  {
    client: "Atlas Health",
    industry: "Healthcare",
    headline: "AI triage assistant deployed across 200 clinics.",
    metric: "3.1× throughput",
  },
  {
    client: "Kairos AI",
    industry: "AI infrastructure",
    headline: "Multi-region inference platform handling 1.2B requests/mo.",
    metric: "99.997% uptime",
  },
  {
    client: "Helios Energy",
    industry: "Climate",
    headline: "Grid forecasting platform powering 8 utilities.",
    metric: "+18% accuracy",
  },
  {
    client: "Obsidian Bank",
    industry: "Fintech",
    headline: "Zero-trust core banking modernization in 11 months.",
    metric: "SOC 2 + PCI",
  },
  {
    client: "Vantage Retail",
    industry: "Commerce",
    headline: "Personalization engine across 38M monthly shoppers.",
    metric: "+27% AOV",
  },
];

function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Selected"
        highlight="work."
        subtitle="A small sample of the systems we've shipped with teams across logistics, healthcare, fintech, and climate."
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
                style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)" }}
              />
              <div className="relative flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{c.industry}</span>
                <ArrowUpRight size={14} className="text-primary-glow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
