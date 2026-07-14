import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Portfolio, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Pixel Brook Case Studies" },
      {
        name: "description",
        content:
          "Selected Pixel Brook projects: SaaS platforms, fintech, brand systems and mobile apps built with obsessive craft.",
      },
      { property: "og:title", content: "Work — Pixel Brook" },
      {
        property: "og:description",
        content: "Projects shaping tomorrow — bold identities and category-defining products.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkPage() {
  return (
    <SiteShell>
      <section className="relative pt-40 pb-8 noise">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Projects shaping <span className="text-gradient">tomorrow</span>
              </>
            }
            subtitle="A glimpse into what we ship — bold identities, category-defining products, quiet AI infrastructure."
          />
        </div>
      </section>
      <Portfolio intro={false} />
    </SiteShell>
  );
}
