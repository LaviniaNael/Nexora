import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import content from "@/content.json";

// export const Route = createFileRoute("/contact")({
//   head: () => ({
//     meta: [
//       { title: "Contact Us — Procode" },
//       {
//         name: "description",
//         content:
//           "Contact Procode for Hassle-Free Technology services. We typically reply within one business day.",
//       },
//       { property: "og:title", content: "Contact — Procode" },
//       {
//         property: "og:description",
//         content: "Start a project with Procode. We reply within one business day.",
//       },
//     ],
//   }),
//   component: ContactPage,
// });

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
    // or use your email if it's a new form: https://formspree.io/f/info@procode.eg
    const endpoint = `https://formspree.io/f/${content.contact.email}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="container-px mx-auto max-w-6xl py-32">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
            {content.contact.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.contact.title}{" "}
            <span className="text-gradient-magenta">{content.contact.titleHighlight}</span>
            {content.contact.titleSuffix}
          </h2>
          <p className="mt-4 text-muted-foreground">{content.contact.description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6">
              <Mail className="text-primary-glow" size={18} />
              <h3 className="mt-3 font-display text-lg font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">{content.contact.email}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-6">
              <MapPin className="text-primary-glow" size={18} />
              <h3 className="mt-3 font-display text-lg font-semibold">Location</h3>
              <p className="mt-1 text-sm text-muted-foreground">{content.contact.address}</p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
              <p className="font-display text-sm font-semibold text-primary-glow">Phone</p>
              <p className="mt-1 text-sm text-foreground/85">{content.contact.phone}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
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
                name="message"
                placeholder="What are you building, and what does success look like?"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/40"
              />
            </div>
            <button
              type="submit"
              disabled={loading || sent}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent
                ? "Message received — we'll be in touch"
                : loading
                  ? "Sending..."
                  : "Send message"}
              {!sent && !loading && (
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
