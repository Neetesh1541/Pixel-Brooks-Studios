import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, AboutContent, FoundersMessage, Why, Testimonials } from "@/components/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Pixel Brook" },
      {
        name: "description",
        content:
          "Pixel Brook is a small senior studio of engineers, designers and strategists partnering with ambitious founders.",
      },
      { property: "og:title", content: "About — Pixel Brook" },
      { property: "og:description", content: "A small studio for ambitious founders." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="pt-16">
        <AboutContent />
        <FoundersMessage />
        <Why />
        <Testimonials />
      </div>
    </SiteShell>
  );
}
