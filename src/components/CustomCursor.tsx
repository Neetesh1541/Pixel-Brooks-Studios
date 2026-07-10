import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);

    const isInteractive = (el: Element | null) =>
      !!el && !!el.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]');
    const onOver = (e: MouseEvent) => setHover(isInteractive(e.target as Element));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 rounded-full bg-white mix-blend-difference" />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 rounded-full border border-white/40 backdrop-blur-sm transition-[width,height,opacity,background] duration-300"
        style={{
          width: hover ? 64 : 40,
          height: hover ? 64 : 40,
          marginLeft: hover ? -12 : 0,
          marginTop: hover ? -12 : 0,
          background: hover ? "radial-gradient(circle, oklch(0.7 0.28 320 / 0.25), transparent 70%)" : "transparent",
        }}
      />
    </>
  );
}
