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
  liveUrl: string;
};

const DETAILS: Record<string, Omit<ProjectDetail, "slug" | "title" | "tag" | "liveUrl">> = {
  "engineers-colony-school": {
    tagline: "A modern, welcoming home for a growing school",
    overview:
      "Engineers Colony School needed a public-facing site that felt trustworthy to parents and easy for staff to keep updated — admissions info, academics, notices and campus life in one clean, fast experience. We designed and built a responsive site with a clear admissions funnel, a notices/announcements section, and an accessible, mobile-first layout so it reads well on the phones most parents actually browse on.",
    role: "Web design, front-end development, content structure",
    year: "2026",
    services: ["Web Design", "Front-end Dev", "Accessibility", "SEO Basics"],
    metrics: [
      { label: "Mobile Score", value: "95+" },
      { label: "Pages Shipped", value: "10+" },
      { label: "Load Time", value: "<1.5s" },
    ],
    gallery: ["/projects/school.svg"],
    accent: "linear-gradient(135deg,#3fb6d9,#1a4a8a)",
  },
  hackloop: {
    tagline: "A home base for a builder & hackathon community",
    overview:
      "Hackloop is a community of developers, hackers and makers who needed a site that felt as fast and energetic as the community itself — events, member spotlights, and a clean way to join. We built a snappy, dark-themed platform with a terminal-inspired visual language, optimized for quick scanning and easy contribution from community organizers.",
    role: "Web design, front-end development, community UX",
    year: "2026",
    services: ["Web Design", "Front-end Dev", "Community UX", "Performance"],
    metrics: [
      { label: "Load Time", value: "<1s" },
      { label: "Core Web Vitals", value: "Pass" },
      { label: "Mobile Ready", value: "100%" },
    ],
    gallery: ["/projects/hackloop.svg"],
    accent: "linear-gradient(135deg,#7b5cff,#00e5c7)",
  },
  billora: {
    tagline: "Beautiful, instant invoicing for small teams",
    overview:
      "Billora makes creating and sending professional invoices fast and painless. We designed and built the product's marketing surface and core billing UI — invoice generation, live totals, and a clean payment-status flow — with an emphasis on clarity and speed so users can go from idea to sent invoice in under a minute.",
    role: "Product design, front-end engineering",
    year: "2026",
    services: ["Product Design", "Front-end Dev", "UI System"],
    metrics: [
      { label: "Time to Invoice", value: "<60s" },
      { label: "UI Components", value: "40+" },
      { label: "Load Time", value: "<1.2s" },
    ],
    gallery: ["/projects/billora.svg"],
    accent: "linear-gradient(135deg,#22d3a8,#5fe6a8)",
  },
  "aakriti-dental-clinic": {
    tagline: "A calm, trustworthy site for a modern dental practice",
    overview:
      "Dr. Aakriti Patel's dental clinic needed a warm, professional online presence that makes booking an appointment effortless. We designed a clean, reassuring site covering services, an easy appointment flow, and clinic information — built to load fast and feel calm, which matters a lot for a healthcare audience.",
    role: "Web design, front-end development",
    year: "2026",
    services: ["Web Design", "Front-end Dev", "Booking UX"],
    metrics: [
      { label: "Mobile Score", value: "95+" },
      { label: "Services Listed", value: "8+" },
      { label: "Load Time", value: "<1.5s" },
    ],
    gallery: ["/projects/dental.svg"],
    accent: "linear-gradient(135deg,#5ecbe0,#ff8fa3)",
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
      liveUrl: base.liveUrl,
      ...extra,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} — Pixel Brook Case Study` },
        {
          name: "description",
          content: `${loaderData.title}: ${loaderData.tagline}. A Pixel Brook case study.`,
        },
        { property: "og:title", content: `${loaderData.title} — Pixel Brook` },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/work/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: loaderData.title,
            description: loaderData.tagline,
            about: loaderData.overview,
            url: `https://www.pixelbrook.studio/work/${loaderData.slug}`,
            image: `https://www.pixelbrook.studio${loaderData.hero}`,
            dateCreated: loaderData.year,
            creator: { "@type": "Organization", name: "Pixel Brook" },
            mainEntityOfPage: loaderData.liveUrl,
          }),
        },
      ],
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
          <Link
            to="/work"
            className="mt-6 inline-flex glass rounded-full px-6 py-3 text-sm hover:glow-brand transition-all"
          >
            Back to Work
          </Link>
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
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{d.tag}</div>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-gradient">{d.title}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{d.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={d.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white glow-brand transition-all duration-300 hover:-translate-y-0.5 focus-visible:glow-brand"
                style={{ background: "var(--gradient-brand)" }}
              >
                Visit Live Site ↗
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-12 overflow-hidden rounded-3xl glass-strong p-3 glow-brand"
          >
            <a
              href={d.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="block aspect-[16/9] overflow-hidden rounded-2xl"
              aria-label={`Open ${d.title} live site in a new tab`}
            >
              <img
                src={d.hero}
                alt={d.title}
                width={1600}
                height={900}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </a>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl glass p-8">
              <h2 className="font-display text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{d.overview}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {d.metrics.map((m: { label: string; value: string }) => (
                  <div key={m.label} className="rounded-2xl glass-strong p-5">
                    <div className="font-display text-3xl font-bold text-gradient">{m.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {m.label}
                    </div>
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
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Services
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.services.map((s: string) => (
                    <span key={s} className="rounded-full glass-strong px-3 py-1 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={d.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="block rounded-3xl glass p-6 text-center transition-all duration-300 hover:glass-strong hover:glow-brand hover:-translate-y-0.5"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Live Website
                </div>
                <div className="mt-2 text-sm font-medium text-gradient">Open in new tab ↗</div>
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6">
            {d.gallery.map((src: string, i: number) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl glass p-3"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt={`${d.title} screen ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl glass-strong p-10 text-center">
            <h3 className="font-display text-3xl font-bold">Have a project like this?</h3>
            <p className="mt-3 text-muted-foreground">
              Tell us about your goals — we reply within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton to="/contact" variant="primary">
                Start a project →
              </MagneticButton>
              <MagneticButton href={`mailto:${BRAND.email}`} variant="ghost">
                {BRAND.email}
              </MagneticButton>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
