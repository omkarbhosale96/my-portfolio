import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Briefcase, CheckCircle2, Cloud, Code2, Database, Download, Github, GraduationCap, Layers, Linkedin, Mail, MapPin, Menu, Phone, Send, Server, Sparkles, Twitter, X, Zap } from "lucide-react";
//#region src/components/effects.tsx
function CursorGlow() {
	const [pos, setPos] = useState({
		x: -200,
		y: -200
	});
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const move = (e) => {
			setPos({
				x: e.clientX,
				y: e.clientY
			});
			setVisible(true);
		};
		const leave = () => setVisible(false);
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseleave", leave);
		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseleave", leave);
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed z-[1] h-[500px] w-[500px] rounded-full transition-opacity duration-300",
		style: {
			left: pos.x - 250,
			top: pos.y - 250,
			opacity: visible ? 1 : 0,
			background: "radial-gradient(circle, rgba(255,107,0,0.12), transparent 60%)"
		}
	});
}
function ScrollProgress() {
	const [p, setP] = useState(0);
	useEffect(() => {
		const onScroll = () => {
			const h = document.documentElement;
			const total = h.scrollHeight - h.clientHeight;
			setP(total > 0 ? h.scrollTop / total * 100 : 0);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "fixed left-0 top-0 z-[100] h-0.5 w-full bg-transparent",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-full bg-gradient-to-r from-primary to-primary-glow transition-[width] duration-100",
			style: { width: `${p}%` }
		})
	});
}
function Particles({ count = 40 }) {
	const [items] = useState(() => Array.from({ length: count }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		d: Math.random() * 4 + 2,
		delay: Math.random() * 5,
		dur: Math.random() * 10 + 10
	})));
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: items.map((p) => /* @__PURE__ */ jsx(motion.span, {
			className: "absolute rounded-full bg-primary/40",
			style: {
				left: `${p.x}%`,
				top: `${p.y}%`,
				width: p.d,
				height: p.d
			},
			animate: {
				y: [
					0,
					-30,
					0
				],
				opacity: [
					.2,
					.8,
					.2
				]
			},
			transition: {
				duration: p.dur,
				repeat: Infinity,
				delay: p.delay,
				ease: "easeInOut"
			}
		}, p.id))
	});
}
function Typing({ phrases }) {
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
				if (next === "") {
					setDel(false);
					setI((p) => (p + 1) % phrases.length);
				}
			}
		}, del ? 40 : 75);
		return () => clearTimeout(t);
	}, [
		text,
		del,
		i,
		phrases
	]);
	return /* @__PURE__ */ jsxs("span", {
		className: "font-mono text-primary",
		children: [text, /* @__PURE__ */ jsx("span", {
			className: "cursor-blink",
			children: "|"
		})]
	});
}
function Counter({ to, suffix = "" }) {
	const [n, setN] = useState(0);
	useEffect(() => {
		const dur = 1800;
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min((t - start) / dur, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			setN(Math.floor(eased * to));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [to]);
	return /* @__PURE__ */ jsxs("span", { children: [n, suffix] });
}
function Loader({ onDone }) {
	useEffect(() => {
		const t = setTimeout(onDone, 1400);
		return () => clearTimeout(t);
	}, [onDone]);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(motion.div, {
		exit: { opacity: 0 },
		transition: { duration: .6 },
		className: "fixed inset-0 z-[200] flex items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center gap-6",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					scale: .6,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				className: "relative h-20 w-20",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl border border-primary/30" }), /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 rounded-2xl glow-orange flex items-center justify-center text-2xl font-display font-bold text-gradient-orange",
					children: "OB"
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				className: "h-px w-40 overflow-hidden bg-border",
				children: /* @__PURE__ */ jsx(motion.div, {
					initial: { x: "-100%" },
					animate: { x: "100%" },
					transition: {
						duration: 1.4,
						ease: "easeInOut"
					},
					className: "h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
				})
			})]
		})
	}, "loader") });
}
var omkar_profile_webp_asset_default = { url: "/omkar-profile.webp" };
var omkar_resume_pdf_asset_default = { url: "/omkar-resume.pdf" };
//#endregion
//#region src/components/portfolio.tsx
var GITHUB_URL = "https://github.com/omkarbhosale96";
var LINKEDIN_URL = "https://www.linkedin.com/in/omkar-bhosale-923982182/";
var TWITTER_URL = "https://twitter.com/me_omkar96";
var EMAIL = "bhosaleomkar9606@gmail.com";
var PHONE = "+91 7030245258";
var STATS = [
	{
		value: 5,
		suffix: "+",
		label: "Years Experience"
	},
	{
		value: 12,
		suffix: "M+",
		label: "Users Impacted"
	},
	{
		value: 3,
		suffix: "",
		label: "Companies"
	},
	{
		value: 20,
		suffix: "+",
		label: "Major Features"
	}
];
var SKILLS = [
	{
		icon: Code2,
		title: "Backend",
		items: [
			"Java",
			"Spring Boot",
			"JPA / Hibernate",
			"JDBC",
			"REST APIs",
			"Microservices"
		]
	},
	{
		icon: Database,
		title: "Databases",
		items: [
			"PostgreSQL",
			"MongoDB",
			"Cassandra",
			"Redis",
			"Elasticsearch"
		]
	},
	{
		icon: Zap,
		title: "Messaging",
		items: ["Apache Kafka", "Event-Driven Architecture"]
	},
	{
		icon: Cloud,
		title: "Cloud & DevOps",
		items: [
			"Docker",
			"AWS",
			"Git",
			"Linux"
		]
	},
	{
		icon: Layers,
		title: "Frontend",
		items: [
			"React JS",
			"JavaScript",
			"TypeScript",
			"HTML",
			"CSS"
		]
	},
	{
		icon: Server,
		title: "Architecture",
		items: [
			"API Gateway",
			"Service Registry",
			"Config Server",
			"Load Balancer"
		]
	}
];
var SKILL_BARS = [
	{
		name: "Java / Spring Boot",
		level: 95
	},
	{
		name: "Microservices & APIs",
		level: 92
	},
	{
		name: "Kafka & Event-Driven",
		level: 88
	},
	{
		name: "PostgreSQL / SQL",
		level: 90
	},
	{
		name: "Elasticsearch",
		level: 82
	},
	{
		name: "Docker & AWS",
		level: 78
	}
];
var EXPERIENCE = [
	{
		company: "Tekdi Technologies",
		role: "Senior Software Engineer",
		period: "2024 — Present",
		highlights: [
			"Built and scaled the SIDH platform for national-scale citizen services",
			"Integrated Juspay payments, Aadhaar eKYC and DigiLocker",
			"Designed a Kafka-based OTP service handling millions of requests",
			"Led Elasticsearch migration and Java 21 platform upgrade",
			"Shipped Community Module and a multi-channel Notification Service"
		]
	},
	{
		company: "Bombay Stock Exchange",
		role: "Software Engineer",
		period: "2021 — 2023",
		highlights: [
			"Engineered low-latency trading APIs used by institutional traders",
			"Migrated legacy services to Spring Boot with hardened security",
			"Implemented real-time WebSocket feeds for market data",
			"Owned production deployments and on-call for critical systems"
		]
	},
	{
		company: "MatchPointGPS",
		role: "Backend Developer",
		period: "2021",
		highlights: ["Designed REST APIs powering high-throughput GPS ingestion", "Implemented Kafka pipelines feeding Cassandra and MongoDB"]
	}
];
var ACHIEVEMENTS = [
	{
		icon: Award,
		title: "12M+ Users Secured",
		text: "Built auth and KYC flows trusted at national scale."
	},
	{
		icon: Sparkles,
		title: "Java 21 Migration",
		text: "Led platform-wide upgrade with zero downtime."
	},
	{
		icon: Server,
		title: "Government Integrations",
		text: "Aadhaar eKYC, DigiLocker, Juspay payments."
	},
	{
		icon: Zap,
		title: "National Scale Apps",
		text: "Designed systems for millions of concurrent users."
	}
];
function Section({ id, children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		id,
		className: `relative mx-auto w-full max-w-7xl px-6 py-28 md:py-36 ${className}`,
		children
	});
}
function SectionHeader({ eyebrow, title, sub }) {
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "mb-16 max-w-2xl",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary",
				children: [/* @__PURE__ */ jsx("span", { className: "h-1 w-1 rounded-full bg-primary glow-pulse" }), eyebrow]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-gradient",
					children: title
				})
			}),
			sub && /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: sub
			})
		]
	});
}
function MagneticButton({ href, variant = "primary", children, download }) {
	const ref = useRef(null);
	const [t, setT] = useState({
		x: 0,
		y: 0
	});
	const move = (e) => {
		const r = ref.current.getBoundingClientRect();
		setT({
			x: (e.clientX - r.left - r.width / 2) * .25,
			y: (e.clientY - r.top - r.height / 2) * .25
		});
	};
	return /* @__PURE__ */ jsx(motion.a, {
		ref,
		href,
		download,
		onMouseMove: move,
		onMouseLeave: () => setT({
			x: 0,
			y: 0
		}),
		animate: {
			x: t.x,
			y: t.y
		},
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 15
		},
		className: variant === "primary" ? "btn-primary" : "btn-ghost",
		children
	});
}
function Nav() {
	const [open, setOpen] = useState(false);
	const links = [
		{
			href: "#about",
			label: "About"
		},
		{
			href: "#skills",
			label: "Skills"
		},
		{
			href: "#experience",
			label: "Experience"
		},
		{
			href: "#projects",
			label: "Projects"
		},
		{
			href: "#contact",
			label: "Contact"
		}
	];
	return /* @__PURE__ */ jsxs(motion.header, {
		initial: {
			y: -20,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			delay: 1.5,
			duration: .6
		},
		className: "fixed left-1/2 top-6 z-50 w-[min(95%,1100px)] -translate-x-1/2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "glass flex items-center justify-between rounded-full px-5 py-3",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#top",
					className: "flex items-center gap-2 font-display font-bold",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground",
						children: "OB"
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden sm:inline",
						children: "Omkar Bhosale"
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: links.map((l) => /* @__PURE__ */ jsx("a", {
						href: l.href,
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ jsxs("a", {
					href: "#contact",
					className: "hidden md:inline-flex btn-primary !py-2 !px-4 text-sm",
					children: ["Hire Me ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => setOpen(!open),
					className: "md:hidden text-foreground",
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: -8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden",
			children: links.map((l) => /* @__PURE__ */ jsx("a", {
				href: l.href,
				onClick: () => setOpen(false),
				className: "rounded-lg px-4 py-3 text-sm hover:bg-primary/10",
				children: l.label
			}, l.href))
		})]
	});
}
function Hero() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	return /* @__PURE__ */ jsxs("section", {
		id: "top",
		ref,
		className: "relative flex min-h-screen items-center overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "absolute inset-0 grid-bg"
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				style: { background: "var(--gradient-glow)" }
			}),
			/* @__PURE__ */ jsx(Particles, { count: 50 }),
			/* @__PURE__ */ jsxs(motion.div, {
				style: {
					y,
					opacity
				},
				className: "relative z-10 mx-auto w-full max-w-7xl px-6 pt-32",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.6,
							duration: .6
						},
						className: "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" }), /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })]
							}),
							"Available for senior backend roles · ",
							/* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
							" India"
						]
					}),
					/* @__PURE__ */ jsx(motion.h1, {
						initial: {
							opacity: 0,
							y: 40
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.7,
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl",
						children: /* @__PURE__ */ jsx("span", {
							className: "text-gradient",
							children: "Omkar Bhosale"
						})
					}),
					/* @__PURE__ */ jsx(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.9,
							duration: .7
						},
						className: "mt-6 text-xl text-muted-foreground md:text-2xl",
						children: "Senior Software Engineer · Java Backend Developer"
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							delay: 2.1,
							duration: .6
						},
						className: "mt-8 flex min-h-[2.5rem] items-center text-lg md:text-2xl",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mr-3 text-muted-foreground",
							children: "→"
						}), /* @__PURE__ */ jsx(Typing, { phrases: [
							"Building Scalable Systems",
							"Designing High-Performance APIs",
							"Microservices Enthusiast",
							"Java & Spring Boot Expert"
						] })]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 2.3,
							duration: .6
						},
						className: "mt-12 flex flex-wrap gap-4",
						children: [/* @__PURE__ */ jsxs(MagneticButton, {
							href: omkar_resume_pdf_asset_default.url,
							download: true,
							children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), " Download Resume"]
						}), /* @__PURE__ */ jsxs(MagneticButton, {
							href: "#contact",
							variant: "ghost",
							children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), " Contact Me"]
						})]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: 2.6 },
						className: "mt-16 flex items-center gap-4 text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("a", {
								href: GITHUB_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "GitHub",
								className: "rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange",
								children: /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsx("a", {
								href: LINKEDIN_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "LinkedIn",
								className: "rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange",
								children: /* @__PURE__ */ jsx(Linkedin, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsx("a", {
								href: TWITTER_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Twitter",
								className: "rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange",
								children: /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${EMAIL}`,
								"aria-label": "Email",
								className: "rounded-full border border-border p-2.5 transition-all hover:border-primary hover:text-primary hover:glow-orange",
								children: /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: 3 },
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground",
				children: /* @__PURE__ */ jsxs(motion.div, {
					animate: { y: [
						0,
						8,
						0
					] },
					transition: {
						duration: 2,
						repeat: Infinity
					},
					className: "flex flex-col items-center gap-2",
					children: ["Scroll", /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-gradient-to-b from-primary to-transparent" })]
				})
			})
		]
	});
}
function About() {
	return /* @__PURE__ */ jsx(Section, {
		id: "about",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionHeader, {
				eyebrow: "About",
				title: "Senior backend engineer building systems at scale"
			}), /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					scale: .9
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: { once: true },
				transition: {
					duration: .8,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative mt-4 max-w-sm",
				children: [/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/40 to-primary-glow/10 blur-2xl"
				}), /* @__PURE__ */ jsx("div", {
					className: "glass relative p-2",
					children: /* @__PURE__ */ jsxs("div", {
						className: "profile-frame",
						children: [/* @__PURE__ */ jsx("img", {
							src: omkar_profile_webp_asset_default.url,
							alt: "Omkar Bhosale",
							loading: "lazy",
							className: "profile-photo aspect-square w-full"
						}), /* @__PURE__ */ jsx("div", {
							className: "profile-edge-mask",
							"aria-hidden": true
						})]
					})
				})]
			})] }), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs(motion.p, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .7 },
					className: "text-lg leading-relaxed text-muted-foreground md:text-xl",
					children: [
						"Software Engineer with ",
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground font-semibold",
							children: "5+ years"
						}),
						" of experience building scalable enterprise applications and high-performance backend systems. Specialized in ",
						/* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: "Java, Spring Boot, Microservices, Kafka, Elasticsearch, Redis and PostgreSQL"
						}),
						"."
					]
				}),
				/* @__PURE__ */ jsx(motion.p, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .7,
						delay: .1
					},
					className: "mt-6 text-lg leading-relaxed text-muted-foreground",
					children: "I've worked on critical infrastructure for stock exchanges, national-scale citizen platforms and high-throughput data systems — focusing on reliability, low latency and clean architecture."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4",
					children: STATS.map((s, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .5,
							delay: i * .1
						},
						className: "glass glass-hover rounded-2xl p-5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-3xl font-bold text-gradient-orange md:text-4xl",
							children: /* @__PURE__ */ jsx(Counter, {
								to: s.value,
								suffix: s.suffix
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: s.label
						})]
					}, s.label))
				})
			] })]
		})
	});
}
function Skills() {
	return /* @__PURE__ */ jsxs(Section, {
		id: "skills",
		children: [
			/* @__PURE__ */ jsx(SectionHeader, {
				eyebrow: "Tech Stack",
				title: "Skills & expertise",
				sub: "A modern toolkit for building reliable, scalable backend platforms."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: SKILLS.map((s, i) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-50px"
					},
					transition: {
						duration: .6,
						delay: i * .06
					},
					className: "glass glass-hover group rounded-2xl p-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:glow-orange",
							children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-semibold",
							children: s.title
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: s.items.map((it) => /* @__PURE__ */ jsx("span", {
								className: "rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground",
								children: it
							}, it))
						})
					]
				}, s.title))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-20 grid gap-10 lg:grid-cols-2",
				children: SKILL_BARS.map((b, i) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: i * .05
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex items-baseline justify-between",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: b.name
						}), /* @__PURE__ */ jsxs("span", {
							className: "font-mono text-sm text-primary",
							children: [b.level, "%"]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-secondary",
						children: /* @__PURE__ */ jsx(motion.div, {
							initial: { width: 0 },
							whileInView: { width: `${b.level}%` },
							viewport: { once: true },
							transition: {
								duration: 1.2,
								delay: .1 + i * .05,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "h-full rounded-full bg-gradient-to-r from-primary to-primary-glow",
							style: { boxShadow: "0 0 12px rgba(255,107,0,0.6)" }
						})
					})]
				}, b.name))
			})
		]
	});
}
function Experience() {
	return /* @__PURE__ */ jsxs(Section, {
		id: "experience",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: "Career",
			title: "Experience timeline"
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-12",
				children: EXPERIENCE.map((e, i) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: `relative flex flex-col gap-6 md:flex-row md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2",
							children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full bg-primary glow-orange" })
						}),
						/* @__PURE__ */ jsx("div", { className: "hidden md:block md:w-1/2" }),
						/* @__PURE__ */ jsx("div", {
							className: "ml-12 flex-1 md:ml-0 md:w-1/2",
							children: /* @__PURE__ */ jsxs("div", {
								className: "glass glass-hover rounded-2xl p-6",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary",
										children: [
											/* @__PURE__ */ jsx(Briefcase, { className: "h-3 w-3" }),
											" ",
											e.period
										]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-semibold",
										children: e.company
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: e.role
									}),
									/* @__PURE__ */ jsx("ul", {
										className: "mt-4 space-y-2",
										children: e.highlights.map((h) => /* @__PURE__ */ jsxs("li", {
											className: "flex gap-2 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ jsx("span", { children: h })]
										}, h))
									})
								]
							})
						})
					]
				}, e.company))
			})]
		})]
	});
}
function Projects() {
	return /* @__PURE__ */ jsxs(Section, {
		id: "projects",
		children: [
			/* @__PURE__ */ jsx(SectionHeader, {
				eyebrow: "Featured Work",
				title: "Enterprise Microservices Platform",
				sub: "A production-grade architecture built end-to-end."
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "glass relative overflow-hidden rounded-3xl p-8 md:p-12",
				children: [/* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "absolute -right-32 -top-32 h-96 w-96 rounded-full",
					style: { background: "var(--gradient-glow)" }
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative grid gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }), " Featured Project"]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-3xl font-bold md:text-4xl",
							children: "Enterprise Microservices Platform"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground",
							children: "A complete microservices ecosystem with secured API Gateway, centralized configuration, service discovery, client-side load balancing and containerised deployments — built for horizontal scale and zero-downtime releases."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [
								"Spring Boot",
								"Spring Security",
								"API Gateway",
								"Config Server",
								"Service Registry",
								"Load Balancer",
								"PostgreSQL",
								"Docker"
							].map((t) => /* @__PURE__ */ jsx("span", {
								className: "rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-foreground",
								children: t
							}, t))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8 flex gap-3",
							children: /* @__PURE__ */ jsxs("a", {
								href: GITHUB_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "btn-primary !py-2.5 !px-5 text-sm",
								children: [/* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }), " View on GitHub"]
							})
						})
					] }), /* @__PURE__ */ jsx("div", {
						className: "relative",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-2 gap-3 font-mono text-xs",
							children: [
								{
									l: "api-gateway",
									c: "Routing · Auth · Rate-limit"
								},
								{
									l: "config-server",
									c: "Centralized config"
								},
								{
									l: "service-registry",
									c: "Eureka · Discovery"
								},
								{
									l: "auth-service",
									c: "JWT · OAuth2"
								},
								{
									l: "user-service",
									c: "Spring Boot · JPA"
								},
								{
									l: "order-service",
									c: "Kafka · PostgreSQL"
								},
								{
									l: "notification-svc",
									c: "Async · Multi-channel"
								},
								{
									l: "search-service",
									c: "Elasticsearch"
								}
							].map((s) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-primary/20 bg-background/40 p-3 transition-all hover:border-primary hover:glow-orange",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-primary",
									children: s.l
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-1 text-muted-foreground",
									children: s.c
								})]
							}, s.l))
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-20",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-8 text-2xl font-semibold",
					children: "Key achievements"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4",
					children: ACHIEVEMENTS.map((a, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .5,
							delay: i * .08
						},
						className: "glass glass-hover rounded-2xl p-6",
						children: [
							/* @__PURE__ */ jsx(a.icon, { className: "h-6 w-6 text-primary" }),
							/* @__PURE__ */ jsx("h4", {
								className: "mt-4 font-semibold",
								children: a.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: a.text
							})
						]
					}, a.title))
				})]
			})
		]
	});
}
function Education() {
	return /* @__PURE__ */ jsx(Section, {
		className: "!py-20",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: 30
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .6 },
			className: "glass flex flex-col items-start gap-4 rounded-2xl p-8 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs uppercase tracking-wider text-primary",
						children: "Education"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-1 text-xl font-semibold",
						children: "Bachelor of Engineering (Mechanical)"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground",
						children: "Shivaji University, Kolhapur"
					})
				] })]
			}), /* @__PURE__ */ jsx("div", {
				className: "font-mono text-sm text-muted-foreground",
				children: "2014 — 2018"
			})]
		})
	});
}
function Contact() {
	const [sent, setSent] = useState(false);
	return /* @__PURE__ */ jsxs(Section, {
		id: "contact",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: "Get in touch",
			title: "Let's build something great",
			sub: "Open to senior backend roles, consulting and interesting collaborations."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-10 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: [
					{
						icon: Mail,
						label: "Email",
						value: EMAIL,
						href: `mailto:${EMAIL}`
					},
					{
						icon: Phone,
						label: "Phone",
						value: PHONE,
						href: `tel:${PHONE.replace(/\s+/g, "")}`
					},
					{
						icon: Linkedin,
						label: "LinkedIn",
						value: "/in/omkar-bhosale-923982182",
						href: LINKEDIN_URL
					},
					{
						icon: Github,
						label: "GitHub",
						value: "@omkarbhosale96",
						href: GITHUB_URL
					},
					{
						icon: Twitter,
						label: "Twitter",
						value: "@me_omkar96",
						href: TWITTER_URL
					},
					{
						icon: Download,
						label: "Resume",
						value: "Download PDF",
						href: omkar_resume_pdf_asset_default.url
					}
				].map((c) => /* @__PURE__ */ jsxs("a", {
					href: c.href,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "glass glass-hover flex items-center gap-4 rounded-2xl p-5",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: c.label
							}), /* @__PURE__ */ jsx("div", {
								className: "font-medium",
								children: c.value
							})]
						}),
						/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" })
					]
				}, c.label))
			}), /* @__PURE__ */ jsx(motion.form, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .7 },
				onSubmit: (e) => {
					e.preventDefault();
					setSent(true);
					setTimeout(() => setSent(false), 4e3);
				},
				className: "glass rounded-3xl p-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "mb-2 block text-xs font-medium text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "text",
								className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange",
								placeholder: "Your name"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "mb-2 block text-xs font-medium text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "email",
								className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange",
								placeholder: "you@email.com"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "mb-2 block text-xs font-medium text-muted-foreground",
							children: "Subject"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange",
							placeholder: "What's this about?"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "mb-2 block text-xs font-medium text-muted-foreground",
							children: "Message"
						}), /* @__PURE__ */ jsx("textarea", {
							required: true,
							rows: 5,
							className: "w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition-all focus:border-primary focus:glow-orange",
							placeholder: "Tell me about your project..."
						})] }),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "btn-primary mt-2 w-full",
							children: sent ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }), " Message Sent"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }), " Send Message"] })
						})
					]
				})
			})]
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "relative border-t border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-glow text-xs font-bold text-primary-foreground",
						children: "OB"
					}),
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Omkar Bhosale. Crafted with care."
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: GITHUB_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "GitHub",
						className: "hover:text-primary",
						children: /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ jsx("a", {
						href: LINKEDIN_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "LinkedIn",
						className: "hover:text-primary",
						children: /* @__PURE__ */ jsx(Linkedin, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ jsx("a", {
						href: TWITTER_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Twitter",
						className: "hover:text-primary",
						children: /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" })
					})
				]
			})]
		})
	});
}
function Portfolio() {
	const [loading, setLoading] = useState(true);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		loading && /* @__PURE__ */ jsx(Loader, { onDone: () => setLoading(false) }),
		/* @__PURE__ */ jsx(ScrollProgress, {}),
		/* @__PURE__ */ jsx(CursorGlow, {}),
		/* @__PURE__ */ jsx(Nav, {}),
		/* @__PURE__ */ jsxs("main", {
			className: "relative",
			children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(About, {}),
				/* @__PURE__ */ jsx(Skills, {}),
				/* @__PURE__ */ jsx(Experience, {}),
				/* @__PURE__ */ jsx(Projects, {}),
				/* @__PURE__ */ jsx(Education, {}),
				/* @__PURE__ */ jsx(Contact, {})
			]
		}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var SplitComponent = Portfolio;
//#endregion
export { SplitComponent as component };
