"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  BookOpen,
  Beaker,
  Home,
  Trophy,
  PenTool,
  Users,
  X,
  Sparkles,
  GraduationCap,
  Wifi,
  Bus,
  Sun,
  Leaf,
  ShieldCheck,
  Utensils,
  HeartPulse,
  Dumbbell,
  Landmark,
  Globe,
  Code2,
  Bot,
  Brain,
  Music2,
  Drama,
  Brush,
  ScrollText,
  TreePine,
  Shield,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   GLASS CARD style helper
───────────────────────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow:
    "0 8px 40px rgba(183,119,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
};

const gradBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #b77700 0%, #dc2626 100%)",
  boxShadow:
    "0 8px 32px rgba(183,119,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
};

/* ─────────────────────────────────────────────────────────
   LIQUID GLASS BLOB BACKGROUND
───────────────────────────────────────────────────────── */
const LiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const blobs = [
      {
        x: 0.15,
        y: 0.2,
        r: 0.38,
        color: "rgba(183,119,0,0.07)",
        speed: 0.0006,
      },
      {
        x: 0.75,
        y: 0.15,
        r: 0.32,
        color: "rgba(220,38,38,0.06)",
        speed: 0.0008,
      },
      { x: 0.5, y: 0.6, r: 0.45, color: "rgba(183,119,0,0.05)", speed: 0.0005 },
      {
        x: 0.85,
        y: 0.75,
        r: 0.28,
        color: "rgba(220,38,38,0.05)",
        speed: 0.0009,
      },
      { x: 0.1, y: 0.8, r: 0.3, color: "rgba(251,191,36,0.06)", speed: 0.0007 },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#fff9f0");
      grad.addColorStop(0.5, "#fff5e6");
      grad.addColorStop(1, "#fef3e2");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b, i) => {
        const ox = Math.sin(t * b.speed * 1000 + i * 1.3) * 0.06;
        const oy = Math.cos(t * b.speed * 1000 + i * 0.9) * 0.05;
        const px = (b.x + ox) * canvas.width;
        const py = (b.y + oy) * canvas.height;
        const pr = b.r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(px, py, 0, px, py, pr);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(px, py, pr, pr * 0.85, t * b.speed * 200, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 16;
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

/* ─────────────────────────────────────────────────────────
   REUSABLE SECTION HEADER
───────────────────────────────────────────────────────── */
const SectionHeader = ({
  eyebrow,
  titleParts,
  desc,
}: {
  eyebrow: string;
  titleParts: React.ReactNode;
  desc?: string;
}) => (
  <div className="scroll-reveal mb-14">
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-red-500 flex-shrink-0" />
      <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">
        {eyebrow}
      </span>
    </div>
    <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-slate-900 mb-4 font-light leading-tight">
      {titleParts}
    </h2>
    {desc && <p className="text-slate-500 max-w-xl leading-relaxed">{desc}</p>}
  </div>
);

/* ─────────────────────────────────────────────────────────
   REUSABLE GLASS CARD COMPONENT
───────────────────────────────────────────────────────── */
const GlassInfoCard = ({
  badge,
  icon,
  title,
  desc,
  list,
}: {
  badge?: string;
  icon: React.ReactElement;
  title: string;
  desc: string;
  list: string[];
}) => (
  <div
    className="glass-card group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 cursor-default"
    style={glassCard}
  >
    <div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(183,119,0,0.05) 0%, rgba(220,38,38,0.03) 100%)",
      }}
    />
    {badge && (
      <div
        className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold text-amber-700 border border-amber-300/50"
        style={{ background: "rgba(251,191,36,0.12)" }}
      >
        {badge}
      </div>
    )}
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white transition-all group-hover:scale-110 group-hover:shadow-lg flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #b77700, #dc2626)",
        boxShadow:
          "0 6px 18px rgba(183,119,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
      {React.cloneElement(icon, { size: 26 } as any)}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
    <ul className="space-y-1.5">
      {list.map((li) => (
        <li key={li} className="text-slate-400 text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex-shrink-0" />
          {li}
        </li>
      ))}
    </ul>
  </div>
);

/* ─────────────────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────────────────── */
const Divider = () => (
  <div className="max-w-[1380px] mx-auto px-[8vw]">
    <div className="h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
  </div>
);

/* ─────────────────────────────────────────────────────────
   TOAST COMPONENT
───────────────────────────────────────────────────────── */
const Toast = ({
  message,
  icon,
  visible,
}: {
  message: string;
  icon: string;
  visible: boolean;
}) => (
  <div
    className="fixed bottom-8 right-8 z-[600] flex items-center gap-3 px-5 py-4 rounded-2xl text-slate-700 font-semibold text-sm transition-all duration-500"
    style={{
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.95)",
      boxShadow:
        "0 16px 48px rgba(183,119,0,0.18), 0 4px 16px rgba(0,0,0,0.06)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(80px)",
      pointerEvents: visible ? "auto" : "none",
    }}
  >
    <span className="text-lg">{icon}</span>
    {message}
  </div>
);

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
const AIETCampus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    desc: "",
    placeholder: "",
  });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    icon: "✅",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    extra: "",
  });
  const clubsTrackRef = useRef<HTMLDivElement>(null);

  /* Toast helper */
  const showToast = useCallback((icon: string, message: string) => {
    setToast({ visible: true, message, icon });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3800);
  }, []);

  /* GSAP */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".hero-title-line",
          { opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: "expo.out" },
          "-=0.3",
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".hero-btns",
          { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".hero-float-card",
          {
            opacity: 0,
            scale: 0.85,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.6",
        );

      gsap.utils.toArray(".scroll-reveal").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          opacity: 0,
          y: 40,
          duration: 0.75,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".glass-card").forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          delay: i * 0.07,
          ease: "back.out(1.3)",
        });
      });

      gsap.utils.toArray(".club-card").forEach((c: any, i: number) => {
        gsap.from(c, {
          scrollTrigger: { trigger: "#clubs-track", start: "top 85%" },
          opacity: 0,
          x: 30,
          duration: 0.6,
          delay: i * 0.07,
          ease: "expo.out",
        });
      });

      gsap.utils.toArray(".testimonial-card").forEach((c: any, i: number) => {
        gsap.from(c, {
          scrollTrigger: {
            trigger: c,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.14,
          ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* Drag scroll for clubs */
  useEffect(() => {
    const track = clubsTrackRef.current;
    if (!track) return;
    let drag = false,
      sx = 0,
      sl = 0;
    const onDown = (e: MouseEvent) => {
      drag = true;
      sx = e.pageX;
      sl = track.scrollLeft;
      track.style.cursor = "grabbing";
    };
    const onUp = () => {
      drag = false;
      track.style.cursor = "grab";
    };
    const onMove = (e: MouseEvent) => {
      if (!drag) return;
      track.scrollLeft = sl - (e.pageX - sx) * 1.6;
    };
    track.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    track.addEventListener("mousemove", onMove);
    return () => {
      track.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      track.removeEventListener("mousemove", onMove);
    };
  }, []);

  /* Card tilt effect */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const handlers: [HTMLElement, (e: MouseEvent) => void, () => void][] = [];
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.01)`;
      };
      const onLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push([card, onMove, onLeave]);
    });
    return () => {
      handlers.forEach(([card, onMove, onLeave]) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const MODAL_CONFIGS: Record<
    string,
    { title: string; desc: string; placeholder: string }
  > = {
    apply: {
      title: "Apply for 2025 Batch",
      desc: "Fill in your details and our admissions team will reach out within 24 hours.",
      placeholder: "Preferred Programme",
    },
    tour: {
      title: "Schedule a Campus Visit",
      desc: "Share your details and we'll arrange a personalised campus tour.",
      placeholder: "Preferred Visit Date",
    },
    brochure: {
      title: "Download Brochure",
      desc: "Enter your details and we'll send the full AIET brochure to your inbox.",
      placeholder: "Course of Interest",
    },
    placements: {
      title: "Placement Enquiry",
      desc: "Interested in recruiting from AIET? Our placement cell will connect with you.",
      placeholder: "Company / Organisation",
    },
  };

  const openModal = (type: string) => {
    setModalConfig(MODAL_CONFIGS[type] || MODAL_CONFIGS.apply);
    setFormData({ name: "", email: "", phone: "", extra: "" });
    setIsModalOpen(true);
  };

  const submitModal = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("⚠️", "Please enter your name and email.");
      return;
    }
    setIsModalOpen(false);
    showToast("✅", `Thank you, ${formData.name}! We'll be in touch soon.`);
  };

  /* ── DATA ────────────────────────────────────────────── */
  const infraCards = [
    {
      badge: "Smart",
      icon: <BookOpen />,
      title: "Smart Classrooms",
      desc: "Interactive learning spaces with smartboards, projectors & AV systems.",
      list: [
        "Smartboards & projector systems",
        "Ergonomic seating & lighting",
        "Campus-wide Wi-Fi access",
      ],
    },
    {
      badge: "30K+",
      icon: <PenTool />,
      title: "Central Library",
      desc: "Knowledge hub for UG, PG, and research scholars with digital & print resources.",
      list: [
        "IEEE, J-Gate, Springer, NPTEL",
        "Digital library & multimedia zone",
        "Separate UG, PG & research areas",
      ],
    },
    {
      badge: "IIC",
      icon: <Beaker />,
      title: "Research & Innovation",
      desc: "Industry-sponsored labs and an active Innovation Council nurturing next-gen thinkers.",
      list: [
        "Startup incubation via IIC",
        "Industry-funded R&D projects",
        "Hackathons, seminars & workshops",
      ],
    },
  ];

  const studentLifeCards = [
    {
      badge: "Separate",
      icon: <Home />,
      title: "Hostel Accommodation",
      desc: "Comfortable, well-maintained separate hostels for boys and girls, built for safety and focus.",
      list: [
        "24/7 security with CCTV",
        "Solar-powered hot water",
        "High-speed internet in rooms",
      ],
    },
    {
      badge: undefined,
      icon: <Utensils />,
      title: "Mess & Cafeteria",
      desc: "Nutritious hygienic meals daily, with a multi-cuisine cafeteria available around the clock.",
      list: [
        "Dietician-curated menus",
        "Veg & non-veg options",
        "Modern hygienic kitchens",
      ],
    },
    {
      badge: "24/7",
      icon: <HeartPulse />,
      title: "Health & Wellness",
      desc: "On-campus health centre tied to Alva's Health Centre, with ambulance and mental wellness support.",
      list: [
        "In-house ambulance service",
        "Regular health check-ups",
        "Mental health counselling",
      ],
    },
  ];

  const sportsCards = [
    {
      badge: undefined,
      icon: <Trophy />,
      title: "Outdoor Sports",
      desc: "Championship-level grounds for cricket, football, basketball, volleyball and athletics.",
      list: [
        "Cricket & Football grounds",
        "Basketball & Volleyball courts",
        "Full athletics track",
      ],
    },
    {
      badge: undefined,
      icon: <Landmark />,
      title: "Indoor Sports Complex",
      desc: "A covered multi-sport arena for badminton, table tennis, chess, carrom, and yoga.",
      list: [
        "Badminton & table tennis",
        "Chess, carrom & indoor games",
        "Yoga hall & meditation space",
      ],
    },
    {
      badge: undefined,
      icon: <Dumbbell />,
      title: "Gymnasium",
      desc: "Fully equipped gym with certified instructors, cardio & strength machines.",
      list: [
        "Certified fitness instructors",
        "Full cardio & strength equipment",
        "Separate timing for all genders",
      ],
    },
  ];

  const digitalCards = [
    {
      badge: undefined,
      icon: <Wifi />,
      title: "Digital Campus Infrastructure",
      desc: "Campus-wide Wi-Fi, smart ERP, and Alva's LMS keep every student connected and academics accessible anytime.",
      list: [
        "Campus-wide high-speed Wi-Fi",
        "Smart attendance & ERP system",
        "Alva's LMS for assignments & materials",
      ],
    },
    {
      badge: undefined,
      icon: <Bus />,
      title: "Transport Network",
      desc: "GPS-tracked buses cover Mangalore, Udupi and surrounding towns with professional drivers.",
      list: [
        "Real-time GPS tracking",
        "Mangalore, Udupi & beyond",
        "Professionally vetted drivers",
      ],
    },
    {
      badge: "Green",
      icon: <Sun />,
      title: "Eco-Friendly Campus",
      desc: "Solar panels, rainwater harvesting, and a strict plastic-free policy make AIET a model green institution.",
      list: [
        "Solar-powered hostels & blocks",
        "Rainwater harvesting systems",
        "Plastic-free campus policy",
      ],
    },
    {
      badge: undefined,
      icon: <Leaf />,
      title: "Eco Club",
      desc: "Student-led Eco Club driving plantation drives, awareness campaigns, and environmental literacy year-round.",
      list: [
        "Tree plantation & green drives",
        "Environmental campaigns",
        "Student-led sustainability projects",
      ],
    },
  ];

  const clubs = [
    { emoji: "💻", name: "Coding Club", count: "120+ members" },
    { emoji: "🤖", name: "Robotics Club", count: "80+ members" },
    { emoji: "🧠", name: "AI Society", count: "95+ members" },
    { emoji: "🎵", name: "Music Club", count: "60+ members" },
    { emoji: "💃", name: "Dance Troupe", count: "75+ members" },
    { emoji: "🎭", name: "Drama Society", count: "50+ members" },
    { emoji: "🎨", name: "Fine Arts Club", count: "40+ members" },
    { emoji: "📝", name: "Literary Club", count: "55+ members" },
    { emoji: "🌿", name: "NSS Wing", count: "200+ members" },
    { emoji: "🪖", name: "NCC Battalion", count: "150+ members" },
  ];

  const testimonials = [
    {
      quote:
        "The smart classrooms and R&D labs here are genuinely world-class. I landed my first internship through the TCS tie-up in 3rd year — AIET opened that door.",
      name: "Aditya Shenoy",
      role: "B.E. Computer Science, 2024",
      initials: "A",
      gradient: "from-orange-400 to-red-500",
    },
    {
      quote:
        "Hostel life at AIET is wonderful. The food, security, Wi-Fi — everything is taken care of. I feel completely at home 300km away from my family.",
      name: "Priya Nair",
      role: "B.E. Electronics, 2023",
      initials: "P",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      quote:
        "The Robotics Club changed my trajectory entirely. We competed nationally, and AIET's IIC helped me launch my own startup right after graduation.",
      name: "Rahul Kumar",
      role: "B.E. Mechanical Engineering, 2024",
      initials: "R",
      gradient: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <div
      className="min-h-screen text-slate-800 font-sans overflow-x-hidden selection:bg-amber-200 selection:text-amber-900"
      style={{ background: "transparent" }}
    >
      <LiquidBackground />

      <div className="relative z-10 pt-24">
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="min-h-[92vh] flex flex-col justify-center px-[8vw] relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(183,119,0,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-10 left-[5%] w-[320px] h-[320px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="hero-badge flex items-center gap-3 mb-6">
            <span
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-amber-700 border border-amber-300/60"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 2px 12px rgba(183,119,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Moodbidri, Karnataka · Est. 2001
            </span>
          </div>

          <h1 className="font-serif text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.95] mb-8 font-light tracking-tighter text-slate-900">
            <span className="hero-title-line block">Explore the</span>
            <span className="hero-title-line block">
              <em className="not-italic font-bold bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">
                Campus
              </em>{" "}
              That
            </span>
            <span className="hero-title-line block">Shapes Leaders</span>
          </h1>

          <p className="hero-sub text-slate-500 text-lg max-w-xl leading-relaxed mb-10 font-light">
            Alva's Institute of Engineering &amp; Technology — a world-class
            learning ecosystem where modern infrastructure, vibrant culture, and
            industry-ready programmes converge in one thriving campus.
          </p>

          <div className="hero-btns flex gap-4 flex-wrap">
            <button
              onClick={() => openModal("apply")}
              className="group relative px-9 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={gradBtn}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={16} /> Explore Campus ↓
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </button>
            <button
              onClick={() => openModal("brochure")}
              className="px-9 py-4 rounded-2xl font-bold text-slate-700 border border-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(16px)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              Download Brochure
            </button>
          </div>

          {/* Hero Float Cards */}
          <div className="hidden lg:grid absolute right-[6vw] top-1/2 -translate-y-1/2 grid-cols-2 gap-4 w-[360px]">
            {[
              {
                icon: <BookOpen size={28} />,
                title: "Library",
                sub: "30,000+ Books",
              },
              {
                icon: <Beaker size={28} />,
                title: "R&D Labs",
                sub: "Innovation Centers",
              },
              {
                icon: <Home size={28} />,
                title: "Hostel",
                sub: "24/7 Security",
              },
              {
                icon: <Trophy size={28} />,
                title: "Sports",
                sub: "10+ Sports",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="hero-float-card tilt-card group p-5 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow:
                    "0 8px 32px rgba(183,119,0,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 text-white transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #b77700, #dc2626)",
                    boxShadow:
                      "0 4px 12px rgba(183,119,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  {c.icon}
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {c.title}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">
                  {c.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────── */}
        <section className="px-[8vw] pb-20">
          <div
            className="scroll-reveal rounded-3xl p-10 flex flex-wrap justify-around gap-8 text-center"
            style={{ ...glassCard }}
          >
            {[
              { num: "30K", label: "Books & Journals" },
              { num: "95%", label: "Placement Rate" },
              { num: "200+", label: "Hiring Partners" },
              { num: "50+", label: "Industry MoUs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-5xl font-bold mb-1 bg-gradient-to-br from-amber-600 to-red-600 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── ACADEMIC INFRASTRUCTURE ──────────────────── */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Academic Infrastructure"
            titleParts={
              <>
                Built for{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Brilliance
                </em>
              </>
            }
            desc="State-of-the-art classrooms, research facilities, and digital tools that power a world-class education."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infraCards.map((card, i) => (
              <div key={i} className="tilt-card">
                <GlassInfoCard {...card} />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── STUDENT LIVING ───────────────────────────── */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Student Living"
            titleParts={
              <>
                A Campus You'll{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Call Home
                </em>
              </>
            }
            desc="Every daily need — from nutritious food to healthcare and security — thoughtfully taken care of."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentLifeCards.map((card, i) => (
              <div key={i} className="tilt-card">
                <GlassInfoCard {...card} />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SPORTS ───────────────────────────────────── */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Sports & Fitness"
            titleParts={
              <>
                Play. Train.{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Thrive.
                </em>
              </>
            }
            desc="A complete athletic ecosystem that keeps body and mind performing at their peak all year round."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sportsCards.map((card, i) => (
              <div key={i} className="tilt-card">
                <GlassInfoCard {...card} />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── DIGITAL & ECO ────────────────────────────── */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Digital & Sustainability"
            titleParts={
              <>
                Connected.{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Responsibly.
                </em>
              </>
            }
            desc="Cutting-edge digital infrastructure, reliable transport, and a deeply eco-conscious campus model."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalCards.map((card, i) => (
              <div key={i} className="tilt-card">
                <GlassInfoCard {...card} />
              </div>
            ))}
          </div>
        </section>

        {/* ── INDUSTRY PANEL ───────────────────────────── */}
        <section className="px-[8vw] py-20">
          <div
            className="scroll-reveal rounded-[32px] p-12 grid md:grid-cols-2 gap-12 items-center"
            style={{
              ...glassCard,
              boxShadow:
                "0 20px 70px rgba(183,119,0,0.10), 0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div>
              <div className="flex items-center gap-3 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-red-500" />
                Industry &amp; Careers
              </div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-slate-900 mb-5 font-light">
                Bridging Campus to{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Career
                </em>
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Strategic partnerships with industry leaders and international
                institutions ensure every AIET graduate is career-ready and
                globally competitive.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Infosys MoU",
                  "Wipro TalentNext",
                  "TCS iON",
                  "IIC Certified",
                  "Exchange Programmes",
                ].map((p) => (
                  <span
                    key={p}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200/80 transition-colors hover:border-amber-300/70 hover:text-amber-700"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <button
                onClick={() => openModal("placements")}
                className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #b77700 0%, #dc2626 100%)",
                  boxShadow:
                    "0 6px 24px rgba(183,119,0,0.30), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                Explore Placements →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "95%", label: "Placement Rate" },
                { num: "200+", label: "Hiring Partners" },
                { num: "50+", label: "Industry MoUs" },
                { num: "8+", label: "Countries Reached" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="tilt-card p-8 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.95)",
                    boxShadow:
                      "0 4px 20px rgba(183,119,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
                  }}
                >
                  <div className="font-serif text-4xl font-bold bg-gradient-to-br from-amber-600 to-red-600 bg-clip-text text-transparent mb-1">
                    {s.num}
                  </div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── CLUBS ────────────────────────────────────── */}
        <section
          className="max-w-[1380px] mx-auto px-[8vw] py-20"
          id="clubs-section"
        >
          <SectionHeader
            eyebrow="Student Life"
            titleParts={
              <>
                Clubs &amp;{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Societies
                </em>
              </>
            }
            desc="Discover passion beyond the classroom. Lead, create, and belong — AIET's culture has something for everyone."
          />
          <div
            id="clubs-track"
            ref={clubsTrackRef}
            className="flex gap-5 overflow-x-auto pb-4 cursor-grab select-none"
            style={{ scrollbarWidth: "none" }}
          >
            {clubs.map((club, i) => (
              <div
                key={i}
                className="club-card flex-shrink-0 w-[180px] p-7 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow:
                    "0 6px 24px rgba(183,119,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <span
                  className="text-4xl block mb-3"
                  style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))" }}
                >
                  {club.emoji}
                </span>
                <div className="font-bold text-slate-800 text-sm mb-2">
                  {club.name}
                </div>
                <div
                  className="text-[10px] font-semibold text-amber-700 border border-amber-300/50 rounded-full px-3 py-1 inline-block"
                  style={{ background: "rgba(251,191,36,0.10)" }}
                >
                  {club.count}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── TESTIMONIALS ─────────────────────────────── */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Student Voices"
            titleParts={
              <>
                What They Say About{" "}
                <em className="font-bold not-italic bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  AIET
                </em>
              </>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card tilt-card relative p-9 rounded-3xl transition-all duration-300 hover:-translate-y-2"
                style={{ ...glassCard }}
              >
                {/* Decorative quote mark */}
                <div className="absolute top-5 left-7 font-serif text-7xl leading-none text-amber-200/60 select-none pointer-events-none">
                  "
                </div>
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed italic mb-7 mt-7">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white bg-gradient-to-br ${t.gradient} flex-shrink-0`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">
                      {t.name}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER CTA ───────────────────────────────── */}
        <section className="px-[8vw] py-20">
          <div
            className="scroll-reveal rounded-[32px] p-16 grid md:grid-cols-[1fr_auto] gap-12 items-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(183,119,0,0.08) 0%, rgba(255,255,255,0.75) 40%, rgba(220,38,38,0.06) 100%)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow:
                "0 20px 70px rgba(183,119,0,0.12), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div
              className="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(183,119,0,0.10) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-amber-700 uppercase tracking-[3px] text-xs font-bold mb-4">
                <GraduationCap size={14} /> Your Journey Starts Here
              </div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-slate-900 mb-4 font-light">
                Ready to Be Part of the{" "}
                <span className="font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  AIET Story?
                </span>
              </h2>
              <p className="text-slate-500 max-w-xl leading-relaxed">
                Join thousands of students who chose AIET and never looked back.
                Your future is waiting — and it begins in Moodbidri.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <button
                onClick={() => openModal("apply")}
                className="px-10 py-4 rounded-xl font-black text-white transition-all hover:-translate-y-1 hover:shadow-2xl whitespace-nowrap"
                style={{ ...gradBtn }}
              >
                Apply for 2025 Batch ✦
              </button>
              <button
                onClick={() => openModal("tour")}
                className="px-10 py-4 rounded-xl font-bold text-slate-700 border border-slate-200/80 transition-all hover:-translate-y-1 hover:border-amber-400/60 whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                Schedule a Campus Visit
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── MODAL ────────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center p-6 transition-all"
          style={{
            background: "rgba(255,255,255,0.30)",
            backdropFilter: "blur(20px)",
          }}
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div
            className="relative p-10 rounded-[28px] max-w-lg w-full"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow:
                "0 30px 80px rgba(183,119,0,0.18), 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(183,119,0,0.18) 0%, transparent 70%)",
              }}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-600 transition-all hover:rotate-90 hover:bg-amber-50"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-3xl text-slate-900 mb-2">
              {modalConfig.title}
            </h3>
            <p className="text-slate-400 text-sm mb-8">{modalConfig.desc}</p>

            <div className="flex flex-col gap-4">
              {[
                {
                  ph: "Full Name",
                  val: formData.name,
                  key: "name",
                  type: "text",
                },
                {
                  ph: "Email Address",
                  val: formData.email,
                  key: "email",
                  type: "email",
                },
                {
                  ph: "Phone Number",
                  val: formData.phone,
                  key: "phone",
                  type: "tel",
                },
                {
                  ph: modalConfig.placeholder,
                  val: formData.extra,
                  key: "extra",
                  type: "text",
                },
              ].map(({ ph, val, key, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={ph}
                  value={val}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className="px-5 py-4 rounded-xl outline-none transition-all text-slate-700 placeholder-slate-400"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1.5px solid rgba(203,213,225,0.8)",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(183,119,0,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(203,213,225,0.8)")
                  }
                />
              ))}
              <button
                onClick={submitModal}
                className="py-4 rounded-xl font-bold text-white mt-1 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #b77700 0%, #dc2626 100%)",
                  boxShadow: "0 6px 24px rgba(183,119,0,0.30)",
                }}
              >
                Submit →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ────────────────────────────────────── */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        visible={toast.visible}
      />
    </div>
  );
};

export default AIETCampus;
