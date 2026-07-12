import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Hero, Marquee, Services, Portfolio, Testimonials, Why } from "@/components/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pixel Brook — Design. Develop. Automate." },
      { name: "description", content: "Pixel Brook is a premium digital agency building websites, brands, SaaS platforms, mobile apps and AI automations for founders shaping the next decade." },
      { property: "og:title", content: "Pixel Brook — Design. Develop. Automate." },
      { property: "og:description", content: "Premium websites, brands, SaaS and AI automations by a small senior team." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Why />
      <Testimonials />
    </SiteShell>
  );
}
