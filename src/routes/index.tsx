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
      { title: "Procode — Next-Gen AI & Digital Reality Engineering" },
      {
        name: "description",
        content:
          "Procode is a high-end digital engineering agency specializing in bespoke AI solutions, enterprise web ecosystems, and high-performance mobile applications.",
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
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
    </>
  );
}
