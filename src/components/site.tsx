import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/pixelbrook-mark.png";
import svcWeb from "@/assets/svc-web.jpg";
import svcUiux from "@/assets/svc-uiux.jpg";
import svcBrand from "@/assets/svc-brand.jpg";
import svcAi from "@/assets/svc-ai.jpg";
import svcSaas from "@/assets/svc-saas.jpg";
import svcMobile from "@/assets/svc-mobile.jpg";
import projLumen from "@/assets/proj-lumen.jpg";
import projOrbit from "@/assets/proj-orbit.jpg";
import projNova from "@/assets/proj-nova.jpg";
import projHelix from "@/assets/proj-helix.jpg";

// =================== BRAND CONSTANTS ===================
export const BRAND = {
  name: "Pixel Brook",
  tagline: "Design · Develop · Automate",
  email: "pixelbrookstudio@gmail.com",
  phones: ["+91 82188 28273", "+91 80770 67635"],
  instagram: "https://www.instagram.com/pixelbrook.store?igsh=dXJiNGl4aHJjZG9u",
  linkedin: "https://www.linkedin.com/company/pixelbrook-studio/",
};

// =================== SHARED ===================

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        {eyebrow}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function MagneticButton({ children, variant = "primary", href, to, target, rel }: { children: ReactNode; variant?: "primary" | "ghost"; href?: string; to?: string; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };
  const base = "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all overflow-hidden group";
  const styles = variant === "primary" ? "text-white glow-brand" : "glass hover:glass-strong text-foreground";
  const inner = (
    <>
      {variant === "primary" && <span className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-brand)" }} />}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} data-cursor="hover" className={`${base} ${styles}`}>
        {inner}
      </Link>
    );
  }
  return (
    <motion.a
      ref={ref}
      href={href ?? "#"}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="hover"
      className={`${base} ${styles}`}
    >
      {inner}
    </motion.a>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12); rx.set(-py * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / 1800, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// =================== THEME ===================

export type ThemeId = "light" | "dark" | "brand";
const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "light", label: "Light", swatch: "linear-gradient(135deg,#f5f7fb,#dfe7f5)" },
  { id: "dark", label: "Dark", swatch: "linear-gradient(135deg,#1a1f2e,#0b1220)" },
  { id: "brand", label: "Brand", swatch: "linear-gradient(135deg,#3fb6d9,#e97b3a 55%,#1a4a8a)" },
];

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>("light");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("pb-theme") as ThemeId)) || "light";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);
  const change = (t: ThemeId) => {
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("pb-theme", t); } catch { /* ignore */ }
  };
  return { theme, setTheme: change };
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="hover"
        aria-label="Change theme"
        className="flex h-9 w-9 items-center justify-center rounded-full glass hover:glass-strong transition-all"
      >
        <span className="h-4 w-4 rounded-full" style={{ background: THEMES.find((t) => t.id === theme)?.swatch }} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl glass-strong p-2 z-50">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs transition-colors ${theme === t.id ? "bg-foreground/10" : "hover:bg-foreground/5"}`}
            >
              <span className="h-4 w-4 rounded-full" style={{ background: t.swatch }} />
              <span className="text-foreground">{t.label}</span>
              {theme === t.id && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =================== NAV ===================

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full transition-all duration-500 ${scrolled ? "glass-strong" : "glass"}`}
      style={{ width: "min(96vw, 1040px)" }}
    >
      <nav className="flex items-center justify-between px-3 py-2.5">
        <Link to="/" className="flex items-center gap-2 pl-2" data-cursor="hover">
          <img src={logoUrl} alt="Pixel Brook" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg font-bold tracking-tight">Pixel Brook</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                data-cursor="hover"
                activeProps={{ className: "text-foreground bg-foreground/10" }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/5"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <div className="hidden sm:block">
            <MagneticButton to="/contact" variant="primary">Start <span aria-hidden>→</span></MagneticButton>
          </div>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden h-9 w-9 rounded-full glass flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileOpen ? "×" : "≡"}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden rounded-2xl glass-strong m-2 p-3">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}

// =================== BACKGROUNDS ===================

export function AuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[900px] w-[1200px] -translate-x-1/2 bg-aurora animate-aurora blur-3xl opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      {[
        { size: 220, x: "8%", y: "20%", delay: "0s" },
        { size: 160, x: "78%", y: "30%", delay: "1.5s" },
        { size: 120, x: "60%", y: "70%", delay: "0.8s" },
      ].map((o, i) => (
        <div key={i} className="absolute animate-float-slow rounded-full opacity-40 blur-2xl"
          style={{
            width: o.size, height: o.size, left: o.x, top: o.y,
            background: `radial-gradient(circle, var(--gradient-orb-from), var(--gradient-orb-to) 60%, transparent 75%)`,
            animationDelay: o.delay,
          }} />
      ))}
    </div>
  );
}

function BlobsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--gradient-orb-from), transparent 60%)" }} />
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--gradient-orb-to), transparent 60%)", animationDelay: "2s" }} />
    </div>
  );
}

function GridBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)" }} />
    </div>
  );
}

// =================== HERO ===================

export function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <section className="relative min-h-dvh overflow-hidden pt-32 noise">
      <AuroraBg />
      <motion.div style={{ y: heroY }} className="relative z-10 mx-auto max-w-7xl px-6 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new projects · 2026
        </motion.div>
        <h1 className="mx-auto mt-8 max-w-5xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[92px]">
          {["We Build", "Digital Experiences", "That Define The Future."].map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ delay: 0.2 + li * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={li === 1 ? "text-gradient" : ""}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          A small senior team building premium websites, brands, SaaS platforms and AI automations for founders shaping the next decade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton to="/contact" variant="primary">Start Project <span aria-hidden>→</span></MagneticButton>
          <MagneticButton to="/work" variant="ghost">View Work</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 25 }}
          animate={{ opacity: 1, y: 0, rotateX: 12 }}
          transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="relative rounded-3xl glass-strong p-3 glow-brand">
            <div className="rounded-2xl surface-elev p-6">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-[10px] text-muted-foreground">pixelbrook.studio/dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1 space-y-3">
                  {["Overview", "Projects", "Automations", "Clients", "Reports"].map((t) => (
                    <div key={t} className="rounded-lg glass px-3 py-2 text-[11px] text-muted-foreground">{t}</div>
                  ))}
                </div>
                <div className="col-span-3 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[{ l: "Revenue", v: "$62K", d: "+18%" }, { l: "Active Users", v: "2.4K", d: "+9%" }, { l: "Automations", v: "184", d: "+22%" }].map((k) => (
                      <div key={k.l} className="rounded-xl glass p-4 text-left">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                        <div className="mt-1 font-display text-2xl font-bold">{k.v}</div>
                        <div className="text-[10px] text-emerald-500">{k.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-40 rounded-xl glass p-4 relative overflow-hidden">
                    <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="ch" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="var(--brand-mid)" stopOpacity="0.6" />
                          <stop offset="1" stopColor="var(--brand-mid)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,90 C40,70 80,50 120,55 C160,60 200,30 240,25 C280,20 320,45 360,30 L400,20 L400,120 L0,120 Z" fill="url(#ch)" />
                      <path d="M0,90 C40,70 80,50 120,55 C160,60 200,30 240,25 C280,20 320,45 360,30 L400,20" stroke="var(--brand-mid)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function Marquee() {
  const items = ["Design", "Development", "Branding", "AI Automation", "SaaS", "SEO", "Mobile Apps", "Software", "Marketing"];
  return (
    <div className="relative border-y border-border py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="mx-8 flex items-center gap-8 font-display text-4xl font-semibold text-muted-foreground/60">
            {t}<span className="h-2 w-2 rounded-full" style={{ background: "var(--gradient-brand)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SERVICES ===================

export const services = [
  { title: "Website Development", desc: "Cinematic, performance-first sites engineered for conversion.", img: svcWeb },
  { title: "UI / UX Design", desc: "Interfaces that feel inevitable — clarity, hierarchy, delight.", img: svcUiux },
  { title: "Branding", desc: "Identity systems that make you unforgettable.", img: svcBrand },
  { title: "AI Automation", desc: "Custom AI workflows that replace repetitive work.", img: svcAi },
  { title: "SaaS Development", desc: "Ship production-grade platforms with real product craft.", img: svcSaas },
  { title: "Mobile Apps", desc: "Native-feeling iOS & Android experiences.", img: svcMobile },
];

export function Services({ intro = true }: { intro?: boolean }) {
  return (
    <section className="relative py-24 md:py-32 noise">
      <BlobsBg />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {intro && (
          <SectionHeading
            eyebrow="What we do"
            title={<>Services engineered for <span className="text-gradient">outliers</span></>}
            subtitle="Six disciplines, one obsession: craft that moves the metric."
          />
        )}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl glass transition-all hover:glass-strong hover:glow-brand">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" decoding="async" width={1024} height={640}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="relative p-7">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                    Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== PORTFOLIO ===================

export const projects = [
  { slug: "lumen-ai", title: "Lumen AI", tag: "SaaS · Platform", img: projLumen },
  { slug: "orbit-finance", title: "Orbit Finance", tag: "Fintech · Web", img: projOrbit },
  { slug: "nova-studio", title: "Nova Studio", tag: "Brand · Identity", img: projNova },
  { slug: "helix-health", title: "Helix Health", tag: "Mobile · App", img: projHelix },
];

export function Portfolio({ intro = true }: { intro?: boolean }) {
  return (
    <section className="relative py-24 md:py-32 noise">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-aurora animate-aurora opacity-40 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {intro && (
          <SectionHeading
            eyebrow="Selected Work"
            title={<>Projects shaping <span className="text-gradient">tomorrow</span></>}
            subtitle="A glimpse into what we ship — bold identities, category-defining products, quiet AI infrastructure."
          />
        )}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
            >
              <TiltCard className="group relative overflow-hidden rounded-3xl glass p-4 hover:glass-strong transition-all">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <img src={p.img} alt={p.title} loading="lazy" decoding="async" width={1280} height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/work/$slug" params={{ slug: p.slug }} data-cursor="hover" className="rounded-full glass px-4 py-2 text-xs hover:glow-brand transition-all">Live Site →</Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== PROCESS ===================

const steps = [
  { n: "01", t: "Discover", d: "We map goals, users and constraints. No fluff." },
  { n: "02", t: "Research", d: "Competitive audit, data dives, positioning." },
  { n: "03", t: "Design", d: "Systems, interfaces, motion — pixel by pixel." },
  { n: "04", t: "Develop", d: "Production-grade engineering with obsessive polish." },
  { n: "05", t: "Launch", d: "Ship with confidence. Instrument everything." },
  { n: "06", t: "Grow", d: "Iterate, automate, compound the metric." },
];

export function Process({ intro = true }: { intro?: boolean }) {
  return (
    <section className="relative py-24 md:py-32 noise">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {intro && (
          <SectionHeading
            eyebrow="Our Process"
            title={<>From idea to <span className="text-gradient">launch</span> — in weeks</>}
          />
        )}
        <div className="mt-20 relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.05 * i }}
                className={`grid grid-cols-1 items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
              >
                <div className={`flex ${i % 2 ? "md:justify-start" : "md:justify-end"}`}>
                  <TiltCard className="w-full max-w-md rounded-3xl glass p-8 hover:glass-strong transition-all">
                    <div className="font-display text-6xl font-bold text-gradient">{s.n}</div>
                    <h3 className="mt-4 font-display text-2xl font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  </TiltCard>
                </div>
                <div className={`hidden md:flex ${i % 2 ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="relative h-4 w-4">
                    <div className="absolute inset-0 rounded-full bg-primary" />
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== WHY ===================

export function Why() {
  const stats = [
    { v: 48, s: "+", l: "Projects Shipped" },
    { v: 96, s: "%", l: "Client Retention" },
    { v: 12, s: "+", l: "Countries Served" },
    { v: 5, s: "×", l: "Avg ROI" },
  ];
  return (
    <section className="relative py-24 md:py-32 noise">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Pixel Brook"
          title={<>Numbers that <span className="text-gradient">compound</span></>}
          subtitle="Not a factory. A small team of engineers, designers and strategists obsessed with outcomes."
        />
        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl glass p-8 text-center hover:glass-strong hover:glow-brand transition-all"
            >
              <div className="font-display text-5xl font-bold text-gradient sm:text-6xl">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Pixel Brook vs Typical Agency</h3>
            <div className="mt-6 space-y-3">
              {[["Ship velocity", 95, 45], ["Design craft", 98, 60], ["AI depth", 92, 30], ["Post-launch care", 90, 40]].map(([label, us, them]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{label as string}</span><span>{us}% vs {them}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${us}%` }} viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: "var(--gradient-brand)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Built for founders who ship</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {["Senior team only — no juniors on your project",
                "Weekly demos, async by default, transparent roadmap",
                "Design + engineering + AI under one roof",
                "Fixed timelines, fixed price options available"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white" style={{ background: "var(--gradient-brand)" }}>✓</span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== TESTIMONIALS ===================

const testimonials = [
  { n: "Elena R.", r: "CEO, Lumen AI", q: "Pixel Brook redefined what shipping fast and looking incredible means. Best partner we've hired." },
  { n: "Marcus V.", r: "Founder, Orbit", q: "Our conversions tripled within 30 days of launch. The craft is on a different level." },
  { n: "Priya S.", r: "Product Lead, Helix", q: "The design system they built is still setting the tone two years later. Timeless work." },
  { n: "Daniel K.", r: "CTO, Nova", q: "AI automations they built save us ~40 hours a week. Felt like magic." },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-aurora animate-aurora opacity-30" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Testimonials" title={<>Loved by <span className="text-gradient">founders</span></>} />
        <div className="mt-16 overflow-hidden">
          <div className="flex gap-6 animate-marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[380px] shrink-0 rounded-3xl glass p-7 hover:glass-strong transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full font-display font-bold text-white" style={{ background: "var(--gradient-brand)" }}>{t.n[0]}</div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold">{t.n}<span className="text-primary">✓</span></div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.q}"</p>
                <div className="mt-4 text-xs text-amber-500">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== ABOUT ===================

export function AboutContent() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <AuroraBg />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="About Pixel Brook"
          title={<>A studio for <span className="text-gradient">ambitious founders</span></>}
          subtitle="We're engineers, designers and strategists who care about the last 5% — the polish that turns products into brands."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Our story</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pixel Brook started as a small collaboration between engineers and designers tired of shipping middling work. Today we're a tight team of seniors partnering with founders across continents.
            </p>
          </div>
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">How we work</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              One senior on your project full-stack, weekly demos, transparent boards, and a fixed scope with room to iterate. We treat every project like it's our own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== CONTACT ===================

export function ContactForm() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <AuroraBg />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title={<>Let's build <span className="text-gradient">the future</span></>}
          subtitle="Tell us about your project. We reply within 24 hours."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="rounded-3xl glass p-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.currentTarget;
                const name = (f.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
                const email = (f.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
                const project = (f.elements.namedItem("project") as HTMLSelectElement)?.value ?? "";
                const message = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
                const body = `Name: ${name}%0AEmail: ${email}%0AProject: ${project}%0A%0A${encodeURIComponent(message)}`;
                window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent("New project inquiry — " + project)}&body=${body}`;
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <input id="name" name="name" required className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label htmlFor="project" className="text-xs uppercase tracking-widest text-muted-foreground">Project</label>
                <select id="project" name="project" className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors">
                  {["Website", "SaaS Platform", "Branding", "AI Automation", "Mobile App", "Other"].map((o) => (
                    <option key={o} className="bg-background">{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Tell us more</label>
                <textarea id="message" name="message" rows={5} className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none" placeholder="What are you building?" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">We reply within 24 hours.</div>
                <button type="submit" className="rounded-full px-7 py-3.5 text-sm font-medium text-white glow-brand" style={{ background: "var(--gradient-brand)" }}>
                  Send Message →
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {[
              { l: "Email", v: BRAND.email, href: `mailto:${BRAND.email}`, i: "✉" },
              { l: "Phone", v: BRAND.phones[0], href: `tel:${BRAND.phones[0].replace(/\s/g, "")}`, i: "☎" },
              { l: "Phone", v: BRAND.phones[1], href: `tel:${BRAND.phones[1].replace(/\s/g, "")}`, i: "☎" },
              { l: "Instagram", v: "@pixelbrook.store", href: BRAND.instagram, i: "◈" },
              { l: "LinkedIn", v: "Pixel Brook Studio", href: BRAND.linkedin, i: "in" },
            ].map((c, idx) => (
              <a key={idx} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noreferrer" : undefined} data-cursor="hover" className="block rounded-2xl glass p-5 hover:glass-strong hover:glow-brand transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-lg text-gradient glass-strong font-bold">{c.i}</div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</div>
                    <div className="text-sm font-medium">{c.v}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== FOOTER ===================

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-10 noise">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="rounded-3xl glass p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Pixel Brook" className="h-10 w-10 object-contain" />
                <span className="font-display text-2xl font-bold">Pixel Brook</span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Design. Develop. Automate. We build digital experiences that define the future.
              </p>
              <div className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                <div><a href={`mailto:${BRAND.email}`} className="hover:text-foreground">{BRAND.email}</a></div>
                <div><a href={`tel:${BRAND.phones[0].replace(/\s/g, "")}`} className="hover:text-foreground">{BRAND.phones[0]}</a></div>
                <div><a href={`tel:${BRAND.phones[1].replace(/\s/g, "")}`} className="hover:text-foreground">{BRAND.phones[1]}</a></div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Company</div>
              <ul className="mt-4 space-y-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}><Link to={l.to} className="text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Connect</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href={`mailto:${BRAND.email}`} className="text-muted-foreground hover:text-foreground transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
            <div>© {new Date().getFullYear()} Pixel Brook. All rights reserved.</div>
            <div>Made with <span className="text-rose-500">♥</span> by the Pixel Brook team</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// =================== BACK TO TOP + CHAT ===================

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass-strong transition-all duration-500 hover:glow-brand ${show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
    >↑</button>
  );
}

// Chatbot icon (SVG) — real chatbot look
function ChatBotIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="6" width="17" height="12" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="3.5" y="6" width="17" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="12" r="1.4" fill="currentColor" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" />
      <path d="M12 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="2.5" r="1.1" fill="currentColor" />
      <path d="M8 18l-1.5 2.5M16 18l1.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type ChatMsg = { role: "user" | "assistant"; content: string };

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi there 👋 I'm Pixel Brook AI. Tell me about your project — what are you building and when do you need to launch?" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    // placeholder assistant slot
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    let assistant = "";
    let received = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += value;
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            const delta = j.choices?.[0]?.delta?.content ?? j.choices?.[0]?.message?.content ?? "";
            if (delta) {
              received = true;
              assistant += delta;
              setMessages((m) => {
                const copy = m.slice();
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch { /* ignore malformed lines */ }
        }
      }
      if (!received) {
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = {
            role: "assistant",
            content: `Sorry — I couldn't reach the AI. Please email ${BRAND.email} or call ${BRAND.phones[0]}.`,
          };
          return copy;
        });
      }
    } catch (err) {
      console.error("chat error", err);
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = {
          role: "assistant",
          content: `Connection issue. Please email ${BRAND.email} or call ${BRAND.phones[0]}.`,
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-[340px] rounded-3xl glass-strong p-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}>
                <ChatBotIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Pixel Brook AI</div>
                <div className="text-[10px] text-emerald-500">● Online</div>
              </div>
            </div>
            <div ref={scrollRef} className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "ml-6 text-white" : "mr-6 bg-foreground/5 text-foreground/90"}`}
                  style={m.role === "user" ? { background: "var(--gradient-brand)" } : undefined}>
                  {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-3 flex items-center gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…"
                className="flex-1 rounded-full bg-foreground/5 border border-border px-4 py-2 text-xs outline-none focus:border-primary" />
              <button type="submit" disabled={loading || !input.trim()}
                className="rounded-full px-3 py-2 text-xs text-white disabled:opacity-50" style={{ background: "var(--gradient-brand)" }}>
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((o) => !o)} aria-label="Open chat"
        className="flex h-14 w-14 items-center justify-center rounded-full text-white glow-brand"
        style={{ background: "var(--gradient-brand)" }}>
        {open ? <span className="text-xl">×</span> : <ChatBotIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}

// =================== VOICE WELCOME ===================

function VoiceWelcome() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    try {
      if (sessionStorage.getItem("pb-welcomed") === "1") return;
    } catch { /* ignore */ }

    let cancelled = false;
    const speak = () => {
      if (cancelled) return;
      const u = new SpeechSynthesisUtterance(
        "Welcome to Pixel Brook. We design, develop and automate premium digital experiences. Explore our work, and let's build something great together.",
      );
      u.rate = 1;
      u.pitch = 1;
      u.volume = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /en-(US|GB)/i.test(v.lang) && /female|zira|samantha|jenny|aria/i.test(v.name)) ||
        voices.find((v) => /en/i.test(v.lang));
      if (preferred) u.voice = preferred;
      window.speechSynthesis.speak(u);
      try { sessionStorage.setItem("pb-welcomed", "1"); } catch { /* ignore */ }
    };

    // Speech requires user gesture in most browsers — attach one-shot listener.
    const trigger = () => {
      speak();
      window.removeEventListener("click", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("touchstart", trigger);
    };
    window.addEventListener("click", trigger, { once: true });
    window.addEventListener("keydown", trigger, { once: true });
    window.addEventListener("scroll", trigger, { once: true });
    window.addEventListener("touchstart", trigger, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("click", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("touchstart", trigger);
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    };
  }, []);
  return null;
}

// =================== SITE SHELL ===================

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
      <BackToTop />
      <ChatWidget />
      <VoiceWelcome />
    </>
  );
}
