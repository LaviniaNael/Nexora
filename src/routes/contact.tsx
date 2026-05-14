import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Procode Egypt" },
      {
        name: "description",
        content:
          "Contact Procode Egypt for Hassle-Free Technology services. We typically reply within one business day.",
      },
      { property: "og:title", content: "Contact — Procode Egypt" },
      {
        property: "og:description",
        content: "Start a project with Procode Egypt. We reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in"
        highlight="touch."
        subtitle="We'll reply within one business day to discuss your Hassle-Free Technology needs."
      />
      <section className="container-px mx-auto max-w-6xl pb-32">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6">
              <Mail className="text-primary-glow" size={18} />
              <h3 className="mt-3 font-display text-lg font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">info@procode.eg</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6">
              <MapPin className="text-primary-glow" size={18} />
              <h3 className="mt-3 font-display text-lg font-semibold">Location</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                51 Beirut, Almazah, Heliopolis, Cairo Governorate 4460264
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
              <p className="font-display text-sm font-semibold text-primary-glow">Phone</p>
              <p className="mt-1 text-sm text-foreground/85">01553838208</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glow-ring lg:col-span-3 space-y-5 rounded-2xl border border-white/10 bg-gradient-to-b from-surface to-surface-elevated p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" type="text" name="name" placeholder="Ada Lovelace" />
              <Field label="Work email" type="email" name="email" placeholder="ada@company.com" />
            </div>
            <Field label="Company" type="text" name="company" placeholder="Acme Inc." />
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Project
              </label>
              <textarea
                rows={5}
                placeholder="What are you building, and what does success look like?"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/40"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.01]"
            >
              {sent ? "Message received — we'll be in touch" : "Send message"}
              {!sent && (
                <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field(props: { label: string; type: string; name: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {props.label}
      </label>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/40"
      />
    </div>
  );
}
