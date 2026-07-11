import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Portfolio, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — NexGen" },
      { name: "description", content: "Selected projects: SaaS platforms, fintech, brand systems and mobile apps built with obsessive craft." },
      { property: "og:title", content: "Work — NexGen" },
      { property: "og:description", content: "A glimpse into what we ship — bold identities and category-defining products." },
    ],
  }),
});

function WorkPage() {
  return (
    <SiteShell>
      <section className="relative pt-40 pb-8 noise">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Selected Work"
            title={<>Projects shaping <span className="text-gradient">tomorrow</span></>}
            subtitle="A glimpse into what we ship — bold identities, category-defining products, quiet AI infrastructure."
          />
        </div>
      </section>
      <Portfolio intro={false} />
    </SiteShell>
  );
}
