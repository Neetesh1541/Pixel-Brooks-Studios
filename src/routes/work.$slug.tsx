import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell, projects, MagneticButton, BRAND } from "@/components/site";

type ProjectDetail = {
  slug: string;
  title: string;
  tag: string;
  tagline: string;
  overview: string;
  role: string;
  year: string;
  services: string[];
  metrics: { label: string; value: string }[];
  gallery: string[];
  accent: string;
};

const DETAILS: Record<string, Omit<ProjectDetail, "slug" | "title" | "tag">> = {
  "lumen-ai": {
    tagline: "AI-native SaaS platform for revenue teams",
    overview:
      "Lumen AI needed a product surface that felt as intelligent as the model behind it. We designed and shipped a full workspace — pipeline dashboards, agent chat, workflow builder — in 11 weeks.",
    role: "Product design, front-end engineering, brand system",
    year: "2025",
    services: ["Product Design", "Design System", "Front-end", "Brand"],
    metrics: [
      { label: "Trial → Paid", value: "+38%" },
      { label: "TTV", value: "6 min" },
      { label: "NPS", value: "72" },
    ],
    gallery: ["/proj-lumen-hero.jpg"],
    accent: "linear-gradient(135deg,#7b5cff,#3b9dff)",
  },
  "orbit-finance": {
    tagline: "A fintech that finally feels honest",
    overview:
      "Orbit is a modern brokerage for the next generation of investors. We rebuilt the marketing site, onboarding, and portfolio dashboard around a single principle: no dark patterns, ever.",
    role: "Marketing site, product web, motion",
    year: "2025",
    services: ["Web", "Product UI", "Motion", "SEO"],
    metrics: [
      { label: "Signups", value: "3.2×" },
      { label: "CVR", value: "+140%" },
      { label: "TTI", value: "0.9s" },
    ],
    gallery: ["/proj-orbit-hero.jpg"],
    accent: "linear-gradient(135deg,#00d4ff,#0057ff)",
  },
  "nova-studio": {
    tagline: "Editorial identity for a creative studio",
    overview:
      "Nova wanted an identity that could sit on billboards and business cards with the same confidence. We built a full brand system: mark, type, motion, and a printable guideline.",
    role: "Brand, art direction, print",
    year: "2024",
    services: ["Brand", "Art Direction", "Print", "Web"],
    metrics: [
      { label: "Inbound", value: "+220%" },
      { label: "Awards", value: "3" },
      { label: "Press", value: "12" },
    ],
    gallery: ["/proj-nova-hero.jpg"],
    accent: "linear-gradient(135deg,#111827,#e5e7eb)",
  },
  "helix-health": {
    tagline: "A calmer companion for daily wellness",
    overview:
      "Helix is a health app that never nags. We designed the full iOS + Android experience — from onboarding quiz to habit rings — with an obsessive focus on quiet, supportive tone.",
    role: "Mobile design, motion, engineering support",
    year: "2025",
    services: ["Mobile UX", "Design System", "Motion"],
    metrics: [
      { label: "DAU/MAU", value: "0.58" },
      { label: "Day-7 retention", value: "61%" },
      { label: "App Store", value: "4.9★" },
    ],
    gallery: ["/proj-helix-hero.jpg"],
    accent: "linear-gradient(135deg,#ff8fa3,#7fe6d1)",
  },
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const base = projects.find((p) => p.slug === params.slug);
    if (!base) throw notFound();
    const extra = DETAILS[params.slug];
    if (!extra) throw notFound();
    return {
      slug: params.slug,
      title: base.title,
      tag: base.tag,
      hero: base.img,
      ...extra,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} — Pixel Brook Case Study` },
        { name: "description", content: `${loaderData.title}: ${loaderData.tagline}. A Pixel Brook case study.` },
        { property: "og:title", content: `${loaderData.title} — Pixel Brook` },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/work/${loaderData.slug}` }],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="flex min-h-dvh items-center justify-center px-6 pt-24">
        <div className="text-center">
          <div className="text-sm uppercase tracking-widest text-muted-foreground">Project</div>
          <h1 className="mt-3 font-display text-4xl font-bold">Not found</h1>
          <p className="mt-2 text-muted-foreground">This case study doesn't exist yet.</p>
          <Link to="/work" className="mt-6 inline-flex glass rounded-full px-6 py-3 text-sm hover:glow-brand transition-all">Back to Work</Link>
        </div>
      </div>
    </SiteShell>
  ),
});

function ProjectPage() {
  const d = Route.useLoaderData();
  return (
    <SiteShell>
      <article className="relative pt-32 pb-24 noise">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 bg-aurora animate-aurora opacity-70 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Link to="/work" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{d.tag}</div>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-gradient">{d.title}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{d.tagline}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-12 overflow-hidden rounded-3xl glass-strong p-3 glow-brand"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-2xl">
              <img src={d.hero} alt={d.title} width={1600} height={900} loading="eager" decoding="async"
                className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl glass p-8">
              <h2 className="font-display text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{d.overview}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {d.metrics.map((m: { label: string; value: string }) => (
                  <div key={m.label} className="rounded-2xl glass-strong p-5">
                    <div className="font-display text-3xl font-bold text-gradient">{m.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl glass p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Role</div>
                <div className="mt-2 text-sm">{d.role}</div>
              </div>
              <div className="rounded-3xl glass p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Year</div>
                <div className="mt-2 text-sm">{d.year}</div>
              </div>
              <div className="rounded-3xl glass p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Services</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.services.map((s: string) => (
                    <span key={s} className="rounded-full glass-strong px-3 py-1 text-[11px]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6">
            {d.gallery.map((src: string, i: number) => (
              <motion.div key={src} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl glass p-3">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <img src={src} alt={`${d.title} screen ${i + 1}`} loading="lazy" decoding="async" width={1600} height={900} className="h-full w-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl glass-strong p-10 text-center">
            <h3 className="font-display text-3xl font-bold">Have a project like this?</h3>
            <p className="mt-3 text-muted-foreground">Tell us about your goals — we reply within 24 hours.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton to="/contact" variant="primary">Start a project →</MagneticButton>
              <MagneticButton href={`mailto:${BRAND.email}`} variant="ghost">{BRAND.email}</MagneticButton>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
