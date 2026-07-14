import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import logoUrl from "@/assets/pixelbrook-mark.png";
import svcWeb from "@/assets/svc-web.jpg";
import svcUiux from "@/assets/svc-uiux.jpg";
import svcBrand from "@/assets/svc-brand.jpg";
import svcAi from "@/assets/svc-ai.jpg";
import svcSaas from "@/assets/svc-saas.jpg";
import svcMobile from "@/assets/svc-mobile.jpg";

// =================== BRAND CONSTANTS ===================
export const BRAND = {
  name: "Pixel Brook",
  tagline: "Design · Develop · Automate",
  email: "pixelbrookstudio@gmail.com",
  phones: ["+91 82188 28273", "+91 80770 67635"],
  instagram: "https://www.instagram.com/pixelbrook.store?igsh=dXJiNGl4aHJjZG9u",
  linkedin: "https://www.linkedin.com/company/pixelbrook-studio/",
  twitter: "https://twitter.com/pixelbrookstudio",
  github: "https://github.com/Neetesh1541",
  founder: { name: "Neetesh Sharma", site: "https://www.neetesh.tech" },
  cofounder: { name: "Deependra Pal Singh" },
};

// Small inline social icon set (no external icon font needed)
export function SocialIcon({
  id,
  className = "h-4 w-4",
}: {
  id: "instagram" | "linkedin" | "twitter" | "github" | "mail" | "phone";
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10" x2="7.5" y2="17" />
        <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        <path d="M11 17v-4.2c0-1.5 1-2.3 2.3-2.3 1.3 0 2.2.8 2.2 2.3V17" />
      </>
    ),
    twitter: (
      <path
        d="M21 4.9c-.7.3-1.4.5-2.2.6a3.7 3.7 0 0 0 1.6-2.1 7.4 7.4 0 0 1-2.4.9 3.7 3.7 0 0 0-6.4 3.4A10.6 10.6 0 0 1 3.9 3.9a3.7 3.7 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.07 3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 16.4a10.5 10.5 0 0 0 5.7 1.7c6.9 0 10.6-5.7 10.6-10.6v-.5A7.6 7.6 0 0 0 21 4.9z"
        fill="currentColor"
        stroke="none"
      />
    ),
    github: (
      <path
        d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
        fill="currentColor"
        stroke="none"
      />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M4 7l8 6 8-6" />
      </>
    ),
    phone: (
      <path
        d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[id]}
    </svg>
  );
}

// =================== SHARED ===================

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
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

export function MagneticButton({
  children,
  variant = "primary",
  href,
  to,
  target,
  rel,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}) {
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
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const base =
    "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all overflow-hidden group";
  const styles =
    variant === "primary" ? "text-white glow-brand" : "glass hover:glass-strong text-foreground";
  const inner = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--gradient-brand)" }}
        />
      )}
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
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => {
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
      },
      { threshold: 0.3 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
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
    const saved =
      (typeof window !== "undefined" && (localStorage.getItem("pb-theme") as ThemeId)) || "light";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);
  const change = (t: ThemeId) => {
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("pb-theme", t);
    } catch {
      /* ignore */
    }
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
        <span
          className="h-4 w-4 rounded-full"
          style={{ background: THEMES.find((t) => t.id === theme)?.swatch }}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl glass-strong p-2 z-50">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
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
  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300 ${mobileOpen ? "rounded-[28px]" : "rounded-full"} ${scrolled ? "glass-strong" : "glass"}`}
      style={{ width: "min(96vw, 1040px)" }}
    >
      <nav className="flex items-center justify-between px-3 py-2.5">
        <Link to="/" className="flex items-center gap-2 pl-2" data-cursor="hover">
          <img
            src={logoUrl}
            alt="Pixel Brook"
            width={32}
            height={32}
            loading="eager"
            decoding="async"
            className="h-8 w-8 object-contain"
          />
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
            <MagneticButton to="/contact" variant="primary">
              Start <span aria-hidden>→</span>
            </MagneticButton>
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
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
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
        <div
          key={i}
          className="absolute animate-float-slow rounded-full opacity-40 blur-2xl"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle, var(--gradient-orb-from), var(--gradient-orb-to) 60%, transparent 75%)`,
            animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}

function BlobsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--gradient-orb-from), transparent 60%)" }}
      />
      <div
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background: "radial-gradient(circle, var(--gradient-orb-to), transparent 60%)",
          animationDelay: "2s",
        }}
      />
    </div>
  );
}

function GridBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 grid-bg animate-grid-move opacity-40"
        style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)" }}
      />
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
      <motion.div
        style={{ y: heroY }}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 + li * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={li === 1 ? "text-gradient" : ""}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          A small senior team building premium websites, brands, SaaS platforms and AI automations
          for founders shaping the next decade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton to="/contact" variant="primary">
            Start Project <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton to="/work" variant="ghost">
            View Work
          </MagneticButton>
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
                <span className="ml-3 text-[10px] text-muted-foreground">
                  pixelbrook.studio/dashboard
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1 space-y-3">
                  {["Overview", "Projects", "Automations", "Clients", "Reports"].map((t) => (
                    <div
                      key={t}
                      className="rounded-lg glass px-3 py-2 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div className="col-span-3 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { l: "Revenue", v: "$62K", d: "+18%" },
                      { l: "Active Users", v: "2.4K", d: "+9%" },
                      { l: "Automations", v: "184", d: "+22%" },
                    ].map((k) => (
                      <div key={k.l} className="rounded-xl glass p-4 text-left">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {k.l}
                        </div>
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
                      <path
                        d="M0,90 C40,70 80,50 120,55 C160,60 200,30 240,25 C280,20 320,45 360,30 L400,20 L400,120 L0,120 Z"
                        fill="url(#ch)"
                      />
                      <path
                        d="M0,90 C40,70 80,50 120,55 C160,60 200,30 240,25 C280,20 320,45 360,30 L400,20"
                        stroke="var(--brand-mid)"
                        strokeWidth="2"
                        fill="none"
                      />
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
  const items = [
    "Design",
    "Development",
    "Branding",
    "AI Automation",
    "SaaS",
    "SEO",
    "Mobile Apps",
    "Software",
    "Marketing",
  ];
  return (
    <div className="relative border-y border-border py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((t, i) => (
          <div
            key={i}
            className="mx-8 flex items-center gap-8 font-display text-4xl font-semibold text-muted-foreground/60"
          >
            {t}
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SERVICES ===================

export const services = [
  {
    title: "Website Development",
    desc: "Cinematic, performance-first sites engineered for conversion.",
    img: svcWeb,
  },
  {
    title: "UI / UX Design",
    desc: "Interfaces that feel inevitable — clarity, hierarchy, delight.",
    img: svcUiux,
  },
  { title: "Branding", desc: "Identity systems that make you unforgettable.", img: svcBrand },
  { title: "AI Automation", desc: "Custom AI workflows that replace repetitive work.", img: svcAi },
  {
    title: "SaaS Development",
    desc: "Ship production-grade platforms with real product craft.",
    img: svcSaas,
  },
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
            title={
              <>
                Services engineered for <span className="text-gradient">outliers</span>
              </>
            }
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
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="relative p-7">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                    Explore{" "}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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
  {
    slug: "engineers-colony-school",
    title: "Engineers Colony School",
    tag: "Education · Website",
    img: "/projects/school.svg",
    liveUrl: "https://www.engineerscolonyschool.org/",
  },
  {
    slug: "hackloop",
    title: "Hackloop Community",
    tag: "Community · Web Platform",
    img: "/projects/hackloop.svg",
    liveUrl: "https://www.hackloop.me/",
  },
  {
    slug: "billora",
    title: "Billora",
    tag: "SaaS · Billing",
    img: "/projects/billora.svg",
    liveUrl: "https://billora-sparkle.vercel.app/",
  },
  {
    slug: "aakriti-dental-clinic",
    title: "Dr. Aakriti Patel Dental Clinic",
    tag: "Healthcare · Website",
    img: "/projects/dental.svg",
    liveUrl: "https://mydental-clinicc.netlify.app/",
  },
];

// Consistent, accessible "external link" transition classes reused everywhere a live site opens in a new tab.
const LIVE_LINK_CLASS =
  "inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-medium transition-all duration-300 hover:glass-strong hover:glow-brand hover:-translate-y-0.5 focus-visible:glow-brand";

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
            title={
              <>
                Projects shaping <span className="text-gradient">tomorrow</span>
              </>
            }
            subtitle="Real sites we designed, built and shipped for real clients — click through to see them live."
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
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label={`Open ${p.title} live site in a new tab`}
                  className="relative block aspect-[16/10] overflow-hidden rounded-2xl"
                >
                  <img
                    src={p.img}
                    alt={`${p.title} website preview`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </a>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-xl font-semibold">{p.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {p.tag}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      data-cursor="hover"
                      className={LIVE_LINK_CLASS}
                    >
                      Case Study
                    </Link>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className={LIVE_LINK_CLASS}
                    >
                      Live ↗
                    </a>
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
  {
    n: "01",
    t: "Discover",
    duration: "Week 1",
    d: "We map goals, users and constraints — no fluff.",
    detail:
      "Kickoff workshop with stakeholders, success metrics defined, technical & budget constraints mapped out before a single pixel is drawn.",
    deliverables: ["Discovery brief", "Success metrics", "Project roadmap"],
    icon: (
      <>
        <circle cx="24" cy="24" r="9" />
        <path d="M24 3v6M24 39v6M45 24h-6M9 24H3M38 10l-4.2 4.2M14.2 33.8 10 38M38 38l-4.2-4.2M14.2 14.2 10 10" />
      </>
    ),
  },
  {
    n: "02",
    t: "Research",
    duration: "Week 1–2",
    d: "Competitive audit, data dives, positioning.",
    detail:
      "We study your competitors, your users and your market, then translate findings into a positioning strategy and information architecture.",
    deliverables: ["Competitive audit", "User insights", "Sitemap / IA"],
    icon: (
      <>
        <circle cx="21" cy="21" r="14" />
        <path d="M31 31 43 43" />
      </>
    ),
  },
  {
    n: "03",
    t: "Design",
    duration: "Week 2–4",
    d: "Systems, interfaces, motion — pixel by pixel.",
    detail:
      "High-fidelity UI, a reusable design system, and motion prototypes — reviewed with you at every milestone, not just at the end.",
    deliverables: ["Design system", "Hi-fi screens", "Motion prototypes"],
    icon: (
      <>
        <path d="M6 40 32 14a4 4 0 0 1 6 6L12 46 4 44l2-8z" />
        <path d="M28 18l6 6" />
      </>
    ),
  },
  {
    n: "04",
    t: "Develop",
    duration: "Week 3–6",
    d: "Production-grade engineering with obsessive polish.",
    detail:
      "Clean, fast, accessible code — built on modern frameworks with real performance and SEO budgets, not just visuals.",
    deliverables: ["Responsive build", "CMS / integrations", "QA across devices"],
    icon: (
      <>
        <path d="M16 14 4 24l12 10M32 14l12 10-12 10M28 10 20 38" />
      </>
    ),
  },
  {
    n: "05",
    t: "Launch",
    duration: "Week 6–7",
    d: "Ship with confidence. Instrument everything.",
    detail:
      "Final QA, analytics, performance and accessibility checks, then a coordinated go-live with rollback plans in place.",
    deliverables: ["Pre-launch QA", "Analytics setup", "Go-live support"],
    icon: (
      <>
        <path d="M24 4c8 6 12 14 10 26-4 2-10 2-10-4 0 6-6 6-10 4-2-12 2-20 10-26z" />
        <circle cx="24" cy="20" r="4" />
        <path d="M17 33l-5 9M31 33l5 9" />
      </>
    ),
  },
  {
    n: "06",
    t: "Grow",
    duration: "Ongoing",
    d: "Iterate, automate, compound the metric.",
    detail:
      "Post-launch we monitor real usage, run experiments, and layer in AI automations that keep compounding value month over month.",
    deliverables: ["Monthly reporting", "A/B experiments", "AI automations"],
    icon: (
      <>
        <path d="M6 38 18 26l8 8 16-18" />
        <path d="M34 14h10v10" />
      </>
    ),
  },
];

export function Process({ intro = true }: { intro?: boolean }) {
  return (
    <section className="relative py-24 md:py-32 noise">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {intro && (
          <SectionHeading
            eyebrow="Our Process"
            title={
              <>
                From idea to <span className="text-gradient">launch</span> — in weeks
              </>
            }
            subtitle="A transparent, six-stage process — you'll always know exactly what stage your project is in and what's coming next."
          />
        )}
        <div className="mt-20 relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className={`grid grid-cols-1 items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
              >
                <div className={`flex ${i % 2 ? "md:justify-start" : "md:justify-end"}`}>
                  <TiltCard className="w-full max-w-md rounded-3xl glass p-8 hover:glass-strong transition-all">
                    <div className="flex items-baseline justify-between">
                      <div className="font-display text-6xl font-bold text-gradient">{s.n}</div>
                      <span className="rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                      {s.detail}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>
                <div
                  className={`flex ${i % 2 ? "md:justify-end" : "md:justify-start"} justify-center`}
                >
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full glass hover:glass-strong hover:glow-brand transition-all sm:h-32 sm:w-32">
                    <div className="absolute inset-0 rounded-full animate-pulse-ring border border-primary/30" />
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="url(#processIconGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative h-12 w-12 sm:h-14 sm:w-14"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="processIconGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="var(--brand-a)" />
                          <stop offset="1" stopColor="var(--brand-b)" />
                        </linearGradient>
                      </defs>
                      {s.icon}
                    </svg>
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
          title={
            <>
              Numbers that <span className="text-gradient">compound</span>
            </>
          }
          subtitle="Not a factory. A small team of engineers, designers and strategists obsessed with outcomes."
        />
        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl glass p-8 text-center hover:glass-strong hover:glow-brand transition-all"
            >
              <div className="font-display text-5xl font-bold text-gradient sm:text-6xl">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Pixel Brook vs Typical Agency</h3>
            <div className="mt-6 space-y-3">
              {[
                ["Ship velocity", 95, 45],
                ["Design craft", 98, 60],
                ["AI depth", 92, 30],
                ["Post-launch care", 90, 40],
              ].map(([label, us, them]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{label as string}</span>
                    <span>
                      {us}% vs {them}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${us}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-brand)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Built for founders who ship</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                "Senior team only — no juniors on your project",
                "Weekly demos, async by default, transparent roadmap",
                "Design + engineering + AI under one roof",
                "Fixed timelines, fixed price options available",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    ✓
                  </span>
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
  {
    n: "Elena R.",
    r: "CEO, Lumen AI",
    q: "Pixel Brook redefined what shipping fast and looking incredible means. Best partner we've hired.",
  },
  {
    n: "Marcus V.",
    r: "Founder, Orbit",
    q: "Our conversions tripled within 30 days of launch. The craft is on a different level.",
  },
  {
    n: "Priya S.",
    r: "Product Lead, Helix",
    q: "The design system they built is still setting the tone two years later. Timeless work.",
  },
  {
    n: "Daniel K.",
    r: "CTO, Nova",
    q: "AI automations they built save us ~40 hours a week. Felt like magic.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-aurora animate-aurora opacity-30" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by <span className="text-gradient">founders</span>
            </>
          }
        />
        <div className="mt-16 overflow-hidden">
          <div className="flex gap-6 animate-marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[380px] shrink-0 rounded-3xl glass p-7 hover:glass-strong transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full font-display font-bold text-white"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {t.n[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold">
                      {t.n}
                      <span className="text-primary">✓</span>
                    </div>
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
          title={
            <>
              A studio for <span className="text-gradient">ambitious founders</span>
            </>
          }
          subtitle="We're engineers, designers and strategists who care about the last 5% — the polish that turns products into brands."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">Our story</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pixel Brook started as a small collaboration between engineers and designers tired of
              shipping middling work. Today we're a tight team of seniors partnering with founders
              across continents.
            </p>
          </div>
          <div className="rounded-3xl glass p-8">
            <h3 className="font-display text-xl font-semibold">How we work</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              One senior on your project full-stack, weekly demos, transparent boards, and a fixed
              scope with room to iterate. We treat every project like it's our own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== FOUNDERS ===================

const founders = [
  {
    name: BRAND.founder.name,
    role: "Founder & Lead Engineer",
    initial: "N",
    site: BRAND.founder.site,
    message:
      "I started Pixel Brook because most agencies ship 80% of the work and call it done. We don't. Every project that comes through here gets the same obsession I'd give my own product — clean engineering, honest timelines, and design that actually earns its polish. If you're building something you're proud of, I want to help you ship it right.",
  },
  {
    name: BRAND.cofounder.name,
    role: "Co-Founder",
    initial: "D",
    message:
      "Great products come from teams who care about the details nobody asks for. My focus at Pixel Brook is making sure every client feels like our only client — clear communication, real accountability, and work that holds up long after launch.",
  },
];

export function FoundersMessage() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="A note from the founders"
          title={
            <>
              Built by people who <span className="text-gradient">actually ship</span>
            </>
          }
          subtitle="Pixel Brook is led by two founders who still do the work — not just manage it."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard className="relative h-full rounded-3xl glass p-8 hover:glass-strong transition-all">
                <span
                  className="absolute right-6 top-6 font-display text-6xl text-foreground/10"
                  aria-hidden
                >
                  "
                </span>
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-bold text-white"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {f.initial}
                  </div>
                  <div>
                    {f.site ? (
                      <a
                        href={f.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="text-base font-semibold hover:text-gradient transition-colors"
                      >
                        {f.name}
                      </a>
                    ) : (
                      <div className="text-base font-semibold">{f.name}</div>
                    )}
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {f.role}
                    </div>
                  </div>
                </div>
                <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">
                  {f.message}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== CONTACT ===================

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement)?.value.trim() ?? "";
    const email = (f.elements.namedItem("email") as HTMLInputElement)?.value.trim() ?? "";
    const project = (f.elements.namedItem("project") as HTMLSelectElement)?.value ?? "";
    const message = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim() ?? "";

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email.";
    if (!message) nextErrors.message = "Tell us a little about your project.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, message }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      f.reset();
    } catch {
      // Reliable fallback that works with zero backend config: open the user's
      // mail client pre-filled so the message is never lost.
      const body = `Name: ${name}%0AEmail: ${email}%0AProject: ${project}%0A%0A${encodeURIComponent(message)}`;
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent("New project inquiry — " + project)}&body=${body}`;
      setStatus("success");
      f.reset();
    }
  }

  return (
    <section className="relative py-24 md:py-32 noise">
      <AuroraBg />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title={
            <>
              Let's build <span className="text-gradient">the future</span>
            </>
          }
          subtitle="Tell us about your project. We reply within 24 hours."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form className="rounded-3xl glass p-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus-visible:border-primary transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus-visible:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="project"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Project
                </label>
                <select
                  id="project"
                  name="project"
                  className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus-visible:border-primary transition-colors"
                >
                  {[
                    "Website",
                    "SaaS Platform",
                    "Branding",
                    "AI Automation",
                    "Mobile App",
                    "Other",
                  ].map((o) => (
                    <option key={o} className="bg-background">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Tell us more
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="mt-2 w-full rounded-xl bg-foreground/5 border border-border px-4 py-3 text-sm outline-none focus-visible:border-primary transition-colors resize-none"
                  placeholder="What are you building?"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground" role="status" aria-live="polite">
                  {status === "success"
                    ? "Thanks — your message is on its way. We reply within 24 hours."
                    : "We reply within 24 hours."}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full px-7 py-3.5 text-sm font-medium text-white glow-brand disabled:opacity-60 transition-opacity"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {status === "sending"
                    ? "Sending…"
                    : status === "success"
                      ? "Sent ✓"
                      : "Send Message →"}
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {[
              { l: "Email", v: BRAND.email, href: `mailto:${BRAND.email}`, icon: "mail" as const },
              {
                l: "Phone",
                v: BRAND.phones[0],
                href: `tel:${BRAND.phones[0].replace(/\s/g, "")}`,
                icon: "phone" as const,
              },
              {
                l: "Phone",
                v: BRAND.phones[1],
                href: `tel:${BRAND.phones[1].replace(/\s/g, "")}`,
                icon: "phone" as const,
              },
              {
                l: "Instagram",
                v: "@pixelbrook.store",
                href: BRAND.instagram,
                icon: "instagram" as const,
              },
              {
                l: "LinkedIn",
                v: "Pixel Brook Studio",
                href: BRAND.linkedin,
                icon: "linkedin" as const,
              },
            ].map((c, idx) => (
              <a
                key={idx}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="hover"
                className="block rounded-2xl glass p-5 transition-all duration-300 hover:glass-strong hover:glow-brand hover:-translate-y-0.5 focus-visible:glow-brand"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-gradient glass-strong">
                    <SocialIcon id={c.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.l}
                    </div>
                    <div className="text-sm font-medium">{c.v}</div>
                  </div>
                </div>
              </a>
            ))}
            <div className="rounded-2xl glass p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Follow us
              </div>
              <div className="mt-3 flex items-center gap-3">
                {[
                  { id: "instagram" as const, href: BRAND.instagram, label: "Instagram" },
                  { id: "linkedin" as const, href: BRAND.linkedin, label: "LinkedIn" },
                  { id: "twitter" as const, href: BRAND.twitter, label: "Twitter / X" },
                  { id: "github" as const, href: BRAND.github, label: "GitHub" },
                ].map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-foreground/80 transition-all duration-300 hover:text-foreground hover:glow-brand hover:-translate-y-0.5 focus-visible:glow-brand"
                  >
                    <SocialIcon id={s.id} className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
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
                <img
                  src={logoUrl}
                  alt="Pixel Brook"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 object-contain"
                />
                <span className="font-display text-2xl font-bold">Pixel Brook</span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Design. Develop. Automate. We build digital experiences that define the future.
              </p>
              <div className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                <div>
                  <a href={`mailto:${BRAND.email}`} className="hover:text-foreground">
                    {BRAND.email}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${BRAND.phones[0].replace(/\s/g, "")}`}
                    className="hover:text-foreground"
                  >
                    {BRAND.phones[0]}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${BRAND.phones[1].replace(/\s/g, "")}`}
                    className="hover:text-foreground"
                  >
                    {BRAND.phones[1]}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Company</div>
              <ul className="mt-4 space-y-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Connect</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={BRAND.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
              <div className="mt-4 flex items-center gap-2">
                {[
                  { id: "instagram" as const, href: BRAND.instagram, label: "Instagram" },
                  { id: "linkedin" as const, href: BRAND.linkedin, label: "LinkedIn" },
                  { id: "twitter" as const, href: BRAND.twitter, label: "Twitter / X" },
                  { id: "github" as const, href: BRAND.github, label: "GitHub" },
                ].map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full glass text-foreground/70 transition-all duration-300 hover:text-foreground hover:glow-brand hover:-translate-y-0.5 focus-visible:glow-brand"
                  >
                    <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
            <div>© {new Date().getFullYear()} Pixel Brook. All rights reserved.</div>
            <div>
              Made with <span className="text-rose-500">♥</span> by{" "}
              <a
                href="https://www.neetesh.tech"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-medium text-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-gradient"
              >
                Neetesh Sharma
              </a>
            </div>
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
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass-strong transition-all duration-500 hover:glow-brand ${show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
    >
      ↑
    </button>
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
      <path
        d="M8 18l-1.5 2.5M16 18l1.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ChatMsg = { role: "user" | "assistant"; content: string };

// Rule-based fallback so the widget always feels alive even when the AI
// gateway is unavailable or unconfigured — no dead "error" messages.
function fallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (/price|cost|budget|quote/.test(t)) {
    return `Great question — pricing depends on scope, but most projects start with a fixed-scope quote after a quick call. Email ${BRAND.email} or call ${BRAND.phones[0]} and we'll send options within a day.`;
  }
  if (/time|deadline|launch|how long|weeks/.test(t)) {
    return "Most sites and MVPs ship in 4–7 weeks depending on scope — see the Process page for the full breakdown. Want us to scope your timeline? Drop your email in the contact form.";
  }
  if (/service|offer|do you|website|app|saas|brand|ai/.test(t)) {
    return "We build websites, brands, SaaS platforms, mobile apps and AI automations. Check out the Services page, or tell me a bit more about what you're building and I'll point you in the right direction.";
  }
  if (/contact|email|phone|call|reach/.test(t)) {
    return `You can reach us anytime at ${BRAND.email} or ${BRAND.phones[0]} — or use the contact form and we'll get back within 24 hours.`;
  }
  return `Thanks for sharing that! Our live AI assistant is warming up — meanwhile, email ${BRAND.email} or call ${BRAND.phones[0]} and a real human will get right back to you.`;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi there 👋 I'm Pixel Brook AI. Tell me about your project — what are you building and when do you need to launch?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);
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
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));

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
          } catch {
            /* ignore malformed lines */
          }
        }
      }
      if (!received) throw new Error("empty stream");
      setOnline(true);
    } catch (err) {
      console.error("chat error", err);
      setOnline(false);
      // Never show a raw "connection issue" — reply helpfully instead.
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = { role: "assistant", content: fallbackReply(text) };
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            role="dialog"
            aria-label="Pixel Brook AI chat"
            className="mb-3 w-[340px] max-w-[calc(100vw-3rem)] rounded-3xl glass-strong p-4"
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                <ChatBotIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Pixel Brook AI</div>
                <div className={`text-[10px] ${online ? "text-emerald-500" : "text-amber-500"}`}>
                  {online ? "● Online" : "● Reply mode"}
                </div>
              </div>
            </div>
            <div
              ref={scrollRef}
              aria-live="polite"
              className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "ml-6 text-white" : "mr-6 bg-foreground/5 text-foreground/90"}`}
                  style={m.role === "user" ? { background: "var(--gradient-brand)" } : undefined}
                >
                  {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="mt-3 flex items-center gap-2"
            >
              <label htmlFor="chat-input" className="sr-only">
                Type a message
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full bg-foreground/5 border border-border px-4 py-2 text-xs outline-none focus-visible:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-full px-3 py-2 text-xs text-white disabled:opacity-50"
                style={{ background: "var(--gradient-brand)" }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white glow-brand focus-visible:glow-brand"
        style={{ background: "var(--gradient-brand)" }}
      >
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
    } catch {
      /* ignore */
    }

    let cancelled = false;

    // Chrome/Android often return an empty voice list on the very first
    // getVoices() call of a page — warm it up early (no gesture needed for
    // this part) so a voice is actually available by the time we speak.
    let cachedVoices: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();
    const onVoicesChanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener?.("voiceschanged", onVoicesChanged);

    const pickVoice = () => {
      const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
      return (
        voices.find(
          (v) => /en-(US|GB)/i.test(v.lang) && /female|zira|samantha|jenny|aria/i.test(v.name),
        ) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0]
      );
    };

    const speak = () => {
      if (cancelled) return;
      // Clear any stuck/paused queue from a previous page load in this tab.
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      const u = new SpeechSynthesisUtterance(
        "Welcome to Pixel Brook. We design, develop and automate premium digital experiences. Explore our work, and let's build something great together.",
      );
      u.rate = 1;
      u.pitch = 1;
      u.volume = 0.9;
      const preferred = pickVoice();
      if (preferred) u.voice = preferred;

      let started = false;
      u.onstart = () => {
        started = true;
      };
      u.onerror = () => {
        // Some engines fail silently the first time — one retry is usually
        // enough once voices have actually finished loading.
        if (!started && !cancelled) {
          setTimeout(() => {
            try {
              window.speechSynthesis.speak(u);
            } catch {
              /* ignore */
            }
          }, 300);
        }
      };
      window.speechSynthesis.speak(u);
      try {
        sessionStorage.setItem("pb-welcomed", "1");
      } catch {
        /* ignore */
      }
    };

    // Speech requires a real user gesture — "scroll" does NOT count as one
    // in Chrome/Safari's activation model, so it's deliberately excluded
    // here (using it previously silently burned the one-shot trigger).
    const trigger = () => {
      speak();
      window.removeEventListener("click", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("touchend", trigger);
    };
    window.addEventListener("click", trigger, { once: true });
    window.addEventListener("keydown", trigger, { once: true });
    window.addEventListener("touchend", trigger, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("click", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("touchend", trigger);
      window.speechSynthesis.removeEventListener?.("voiceschanged", onVoicesChanged);
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    };
  }, []);
  return null;
}

// =================== SITE SHELL ===================

export function SiteShell({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("pb-loaded")) setShowLoader(true);
    } catch {
      setShowLoader(true);
    }
  }, []);
  return (
    <>
      {showLoader && (
        <LoadingScreen
          onDone={() => {
            setShowLoader(false);
            try {
              sessionStorage.setItem("pb-loaded", "1");
            } catch {
              /* ignore */
            }
          }}
        />
      )}
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
      <BackToTop />
      <ChatWidget />
      <VoiceWelcome />
    </>
  );
}
