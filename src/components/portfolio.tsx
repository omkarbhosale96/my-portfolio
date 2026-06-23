import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import {
  Download, Mail, Github, Linkedin, Twitter, ArrowRight, MapPin, Phone,
  Code2, Database, Cloud, Zap, Layers, Server, Send, CheckCircle2,
  Briefcase, GraduationCap, Award, Sparkles, Menu, X,
} from "lucide-react";
import { CursorGlow, ScrollProgress, Particles, Typing, Counter, Loader } from "@/components/effects";
import profileAsset from "@/assets/omkar-profile.webp.asset.json";
import resumeAsset from "@/assets/omkar-resume.pdf.asset.json";

const GITHUB_URL = "https://github.com/omkarbhosale96";
const LINKEDIN_URL = "https://www.linkedin.com/in/omkar-bhosale-923982182/";
const TWITTER_URL = "https://twitter.com/me_omkar96";
const EMAIL = "bhosaleomkar9606@gmail.com";
const PHONE = "+91 7030245258";

// ----- Data -----
const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "M+", label: "Users Impacted" },
  { value: 3, suffix: "", label: "Companies" },
  { value: 20, suffix: "+", label: "Major Features" },
];

const SKILLS = [
  { icon: Code2, title: "Backend", items: ["Java", "Spring Boot", "JPA / Hibernate", "JDBC", "REST APIs", "Microservices"] },
  { icon: Database, title: "Databases", items: ["PostgreSQL", "MongoDB", "Cassandra", "Redis", "Elasticsearch"] },
  { icon: Zap, title: "Messaging", items: ["Apache Kafka", "Event-Driven Architecture"] },
  { icon: Cloud, title: "Cloud & DevOps", items: ["Docker", "AWS", "Git", "Linux"] },
  { icon: Layers, title: "Frontend", items: ["React JS", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { icon: Server, title: "Architecture", items: ["API Gateway", "Service Registry", "Config Server", "Load Balancer"] },
];

const SKILL_BARS = [
  { name: "Java / Spring Boot", level: 95 },
  { name: "Microservices & APIs", level: 92 },
  { name: "Kafka & Event-Driven", level: 88 },
  { name: "PostgreSQL / SQL", level: 90 },
  { name: "Elasticsearch", level: 82 },
  { name: "Docker & AWS", level: 78 },
];

const EXPERIENCE = [
  {
    company: "Tekdi Technologies",
    role: "Senior Software Engineer",
    period: "2024 — Present",
    highlights: [
      "Built and scaled the SIDH platform for national-scale citizen services",
      "Integrated Juspay payments, Aadhaar eKYC and DigiLocker",
      "Designed a Kafka-based OTP service handling millions of requests",
      "Led Elasticsearch migration and Java 21 platform upgrade",
      "Shipped Community Module and a multi-channel Notification Service",
    ],
  },
  {
    company: "Bombay Stock Exchange",
    role: "Software Engineer",
    period: "2021 — 2023",
    highlights: [
      "Engineered low-latency trading APIs used by institutional traders",
      "Migrated legacy services to Spring Boot with hardened security",
      "Implemented real-time WebSocket feeds for market data",
      "Owned production deployments and on-call for critical systems",
    ],
  },
  {
    company: "MatchPointGPS",
    role: "Backend Developer",
    period: "2021",
    highlights: [
      "Designed REST APIs powering high-throughput GPS ingestion",
      "Implemented Kafka pipelines feeding Cassandra and MongoDB",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: Award, title: "12M+ Users Secured", text: "Built auth and KYC flows trusted at national scale." },
  { icon: Sparkles, title: "Java 21 Migration", text: "Led platform-wide upgrade with zero downtime." },
  { icon: Server, title: "Government Integrations", text: "Aadhaar eKYC, DigiLocker, Juspay payments." },
  { icon: Zap, title: "National Scale Apps", text: "Designed systems for millions of concurrent users." },
];

// ----- Building blocks -----
function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-28 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 max-w-2xl"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
        <span className="h-1 w-1 rounded-full bg-primary glow-pulse" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

function MagneticButton({ href, variant = "primary", children, download }: {
  href: string; variant?: "primary" | "ghost"; children: ReactNode; download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setT({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={move}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
    >
      {children}
    </motion.a>
  );
}

// ----- Sections -----
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed left-1/2 top-6 z-50 w-[min(95%,1100px)] -translate-x-1/2"
    >
      <div className="glass flex items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">OB</span>
          <span className="hidden sm:inline">Omkar Bhosale</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">Hire Me <ArrowRight className="h-4 w-4" /></a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm hover:bg-primary/10">{l.label}</a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <Particles count={50} />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for senior backend roles · <MapPin className="h-3 w-3" /> India
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient">Omkar Bhosale</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.7 }} className="mt-6 text-xl text-muted-foreground md:text-2xl">
          Senior Software Engineer · Java Backend Developer
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.6 }} className="mt-8 flex min-h-[2.5rem] items-center text-lg md:text-2xl">
          <span className="mr-3 text-muted-foreground">→</span>
          <Typing phrases={[
            "Building Scalable Systems",
            "Designing High-Performance APIs",
            "Microservices Enthusiast",
            "Java & Spring Boot Expert",
          ]} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.6 }} className="mt-12 flex flex-wrap gap-4">
          <MagneticButton href={resumeAsset.url} download>
            <Download className="h-4 w-4" /> Download Resume
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <Mail className="h-4 w-4" /> Contact Me
          </MagneticButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="mt-16 flex items-center gap-4 text-muted-foreground">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange"><Github className="h-4 w-4" /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange"><Linkedin className="h-4 w-4" /></a>
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange"><Twitter className="h-4 w-4" /></a>
          <a href={`mailto:${EMAIL}`} aria-label="Email" className="rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange"><Mail className="h-4 w-4" /></a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
          Scroll
          <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div>
          <SectionHeader eyebrow="About" title="Senior backend engineer building systems at scale" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 max-w-sm"
          >
            <div aria-hidden className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/40 to-primary-glow/10 blur-2xl" />
            <div className="glass relative p-2">
              <div className="profile-frame">
                <img
                  src={profileAsset.url}
                  alt="Omkar Bhosale"
                  loading="lazy"
                  className="profile-photo aspect-square w-full"
                />
                <div className="profile-edge-mask" aria-hidden />
              </div>
            </div>
          </motion.div>
        </div>
        <div>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            Software Engineer with <span className="text-foreground font-semibold">5+ years</span> of experience building scalable enterprise applications and high-performance backend systems. Specialized in <span className="text-primary">Java, Spring Boot, Microservices, Kafka, Elasticsearch, Redis and PostgreSQL</span>.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I've worked on critical infrastructure for stock exchanges, national-scale citizen platforms and high-throughput data systems — focusing on reliability, low latency and clean architecture.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover rounded-2xl p-5"
              >
                <div className="text-3xl font-bold text-gradient-orange md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Tech Stack" title="Skills & expertise" sub="A modern toolkit for building reliable, scalable backend platforms." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="glass glass-hover group rounded-2xl p-6"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:glow-orange">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span key={it} className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">{it}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        {SKILL_BARS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium">{b.name}</span>
              <span className="font-mono text-sm text-primary">{b.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${b.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                style={{ boxShadow: "0 0 12px rgba(255,107,0,0.6)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <SectionHeader eyebrow="Career" title="Experience timeline" />
      <div className="relative">
        <div aria-hidden className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2" />
        <div className="space-y-12">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col gap-6 md:flex-row md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                <div className="h-4 w-4 rounded-full bg-primary glow-orange" />
              </div>
              <div className="hidden md:block md:w-1/2" />
              <div className="ml-12 flex-1 md:ml-0 md:w-1/2">
                <div className="glass glass-hover rounded-2xl p-6">
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <Briefcase className="h-3 w-3" /> {e.period}
                  </div>
                  <h3 className="text-xl font-semibold">{e.company}</h3>
                  <p className="text-muted-foreground">{e.role}</p>
                  <ul className="mt-4 space-y-2">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader eyebrow="Featured Work" title="Enterprise Microservices Platform" sub="A production-grade architecture built end-to-end." />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"><Sparkles className="h-3 w-3" /> Featured Project</div>
            <h3 className="text-3xl font-bold md:text-4xl">Enterprise Microservices Platform</h3>
            <p className="mt-4 text-muted-foreground">
              A complete microservices ecosystem with secured API Gateway, centralized configuration, service discovery, client-side load balancing and containerised deployments — built for horizontal scale and zero-downtime releases.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Spring Boot", "Spring Security", "API Gateway", "Config Server", "Service Registry", "Load Balancer", "PostgreSQL", "Docker"].map((t) => (
                <span key={t} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 text-sm"><Github className="h-4 w-4" /> View on GitHub</a>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { l: "api-gateway", c: "Routing · Auth · Rate-limit" },
                { l: "config-server", c: "Centralized config" },
                { l: "service-registry", c: "Eureka · Discovery" },
                { l: "auth-service", c: "JWT · OAuth2" },
                { l: "user-service", c: "Spring Boot · JPA" },
                { l: "order-service", c: "Kafka · PostgreSQL" },
                { l: "notification-svc", c: "Async · Multi-channel" },
                { l: "search-service", c: "Elasticsearch" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-primary/20 bg-background/40 p-3 transition-all hover:border-primary hover:glow-orange">
                  <div className="text-primary">{s.l}</div>
                  <div className="mt-1 text-muted-foreground">{s.c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-20">
        <h3 className="mb-8 text-2xl font-semibold">Key achievements</h3>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <a.icon className="h-6 w-6 text-primary" />
              <h4 className="mt-4 font-semibold">{a.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section className="!py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass flex flex-col items-start gap-4 rounded-2xl p-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><GraduationCap className="h-5 w-5" /></div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary">Education</div>
            <h3 className="mt-1 text-xl font-semibold">Bachelor of Engineering (Mechanical)</h3>
            <p className="text-muted-foreground">Shivaji University, Kolhapur</p>
          </div>
        </div>
        <div className="font-mono text-sm text-muted-foreground">2014 — 2018</div>
      </motion.div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact">
      <SectionHeader eyebrow="Get in touch" title="Let's build something great" sub="Open to senior backend roles, consulting and interesting collaborations." />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE.replace(/\s+/g, "")}` },
            { icon: Linkedin, label: "LinkedIn", value: "/in/omkar-bhosale-923982182", href: LINKEDIN_URL },
            { icon: Github, label: "GitHub", value: "@omkarbhosale96", href: GITHUB_URL },
            { icon: Twitter, label: "Twitter", value: "@me_omkar96", href: TWITTER_URL },
            { icon: Download, label: "Resume", value: "Download PDF", href: resumeAsset.url },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 rounded-2xl p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
          className="glass rounded-3xl p-8"
        >
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Name</label>
                <input required type="text" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Email</label>
                <input required type="email" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Subject</label>
              <input required type="text" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange" placeholder="What's this about?" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Message</label>
              <textarea required rows={5} className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className="btn-primary mt-2 w-full">
              {sent ? (<><CheckCircle2 className="h-4 w-4" /> Message Sent</>) : (<><Send className="h-4 w-4" /> Send Message</>)}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-glow text-xs font-bold text-primary-foreground">OB</span>
          © {new Date().getFullYear()} Omkar Bhosale. Crafted with care.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary"><Github className="h-4 w-4" /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin className="h-4 w-4" /></a>
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
