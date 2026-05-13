import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procode Egypt — Hassle-Free Technology" },
      {
        name: "description",
        content:
          "Procode Egypt provides Hassle-Free Technology for SMEs and NGOs, including IT Management, Web Development, Mobile Apps, Digital Marketing, and Media Production.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <Showcase />
      <Stats />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
