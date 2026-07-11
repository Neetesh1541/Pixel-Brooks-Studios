import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Hero, Marquee, Services, Portfolio, Testimonials } from "@/components/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NexGen — Design. Develop. Automate." },
      { name: "description", content: "A small senior studio building premium websites, brands, SaaS platforms and AI automations." },
      { property: "og:title", content: "NexGen — Design. Develop. Automate." },
      { property: "og:description", content: "Premium websites, brands, SaaS and AI automations for founders shaping the next decade." },
    ],
  }),
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Testimonials />
    </SiteShell>
  );
}
