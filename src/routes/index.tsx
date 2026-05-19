import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procode — High-Performance Web, Mobile & IT Engineering" },
      {
        name: "description",
        content:
          "Procode is a premium digital engineering agency specializing in robust web ecosystems, high-performance mobile applications, and strategic IT infrastructure.",
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
      <About />
      <Services />
      <Showcase />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <Contact />
    </>
  );
}
