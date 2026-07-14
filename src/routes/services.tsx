import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Services, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Pixel Brook" },
      {
        name: "description",
        content:
          "Pixel Brook services: websites, UI/UX, branding, AI automation, SaaS and mobile apps — built by a senior team.",
      },
      { property: "og:title", content: "Services — Pixel Brook" },
      {
        property: "og:description",
        content: "Six disciplines, one obsession: craft that moves the metric.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesPage() {
  return (
    <SiteShell>
      <section className="relative pt-40 pb-8 noise">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Services engineered for <span className="text-gradient">outliers</span>
              </>
            }
            subtitle="Six disciplines, one obsession: craft that moves the metric."
          />
        </div>
      </section>
      <Services intro={false} />
    </SiteShell>
  );
}
