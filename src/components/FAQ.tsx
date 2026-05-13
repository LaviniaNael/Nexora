import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do engagements typically start?",
    a: "Every project begins with a paid discovery sprint where we map the problem, validate technical approach, and produce a delivery plan with clear milestones.",
  },
  {
    q: "Do you work with existing teams?",
    a: "Often. We embed alongside your engineers, transfer knowledge continuously, and make sure your team owns the system long after we leave.",
  },
  {
    q: "Which industries do you serve?",
    a: "Fintech, healthcare, logistics, climate, and AI-native startups make up most of our work. The common thread: complex, mission-critical systems.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Zero-trust by default. We've delivered systems certified to SOC 2, ISO 27001, HIPAA, and PCI-DSS, and bake controls into the SDLC from day one.",
  },
  {
    q: "Can you integrate AI into legacy systems?",
    a: "Yes. We specialize in safely retrofitting LLM, RAG, and agent capabilities onto existing platforms with measurable ROI.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32">
      <div className="container-px mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-white/5 rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium">{f.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-primary-glow transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden px-6 transition-[grid-template-rows,opacity,padding] duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1.25rem" : "0",
                  }}
                >
                  <div className="min-h-0 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
