import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[500px] w-[500px] rounded-full transition-opacity duration-300"
      style={{
        left: pos.x - 250,
        top: pos.y - 250,
        opacity: visible ? 1 : 0,
        background: "radial-gradient(circle, rgba(255,107,0,0.12), transparent 60%)",
      }}
    />
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[100] h-0.5 w-full bg-transparent">
      <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-[width] duration-100" style={{ width: `${p}%` }} />
    </div>
  );
}

export function Particles({ count = 40 }: { count?: number }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      dur: Math.random() * 10 + 10,
    }))
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.d, height: p.d }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Typing({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[i];
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, text.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1500);
      } else {
        const next = cur.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((p) => (p + 1) % phrases.length); }
      }
    }, del ? 40 : 75);
    return () => clearTimeout(t);
  }, [text, del, i, phrases]);
  return (
    <span className="font-mono text-primary">
      {text}<span className="cursor-blink">|</span>
    </span>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}{suffix}</span>;
}

export function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }, [onDone]);
  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-20 w-20"
          >
            <div className="absolute inset-0 rounded-2xl border border-primary/30" />
            <div className="absolute inset-0 rounded-2xl glow-orange flex items-center justify-center text-2xl font-display font-bold text-gradient-orange">OB</div>
          </motion.div>
          <motion.div className="h-px w-40 overflow-hidden bg-border">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, ease: "easeInOut" }} className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
