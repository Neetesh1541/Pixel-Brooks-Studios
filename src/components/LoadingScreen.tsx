import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@/assets/pixelbrook-mark.png";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 14 + 4;
        if (next >= 100) {
          clearInterval(t);
          setTimeout(() => {
            setGone(true);
            setTimeout(onDone, 700);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 140);
    return () => clearInterval(t);
  }, [onDone]);

  const word = "Pixel Brook";

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7 }}
          role="status"
          aria-live="polite"
          aria-label="Loading Pixel Brook"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div className="absolute inset-0 bg-aurora animate-aurora opacity-70" />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-[-14px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--brand-a), var(--brand-mid), var(--brand-b), var(--brand-a))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
              />
              <div className="absolute inset-[-10px] rounded-full bg-background" />
              <div className="absolute inset-0 rounded-full animate-pulse-ring border border-foreground/20" />
              <div
                className="absolute inset-0 rounded-full animate-pulse-ring border border-foreground/10"
                style={{ animationDelay: "0.6s" }}
              />
              <motion.div
                className="relative h-32 w-32 rounded-3xl glass-strong flex items-center justify-center glow-brand"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
              >
                <img
                  src={logoUrl}
                  alt="Pixel Brook"
                  width={96}
                  height={96}
                  className="h-24 w-24 object-contain"
                />
              </motion.div>
            </div>

            <h1 className="mt-8 flex text-4xl font-bold tracking-tight font-display" aria-hidden>
              {word.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.035, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={ch === " " ? "inline-block w-2" : "text-gradient inline-block"}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h1>
            <span className="sr-only">Pixel Brook</span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              Design · Develop · Automate
            </motion.p>

            <div className="mt-10 h-[2px] w-64 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, background: "var(--gradient-brand)" }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="mt-3 text-[10px] tabular-nums tracking-widest text-muted-foreground">
              {Math.floor(progress).toString().padStart(3, "0")}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
