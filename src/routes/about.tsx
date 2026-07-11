import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, AboutContent, Why, Testimonials } from "@/components/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — NexGen" },
      { name: "description", content: "A small senior studio of engineers, designers and strategists partnering with ambitious founders." },
      { property: "og:title", content: "About — NexGen" },
      { property: "og:description", content: "A small studio for ambitious founders." },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="pt-16">
        <AboutContent />
        <Why />
        <Testimonials />
      </div>
    </SiteShell>
  );
}
