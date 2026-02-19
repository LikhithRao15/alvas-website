"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Added for navigation

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  pageBg:        "#EEECEA",
  bgAlt:         "#E5E3E0",
  surface:       "#F7F6F5",
  surfaceHover:  "#FFFFFF",
  border:        "#D4D0CB",
  borderHover:   "#B0A99E",
  accent:        "#6B5B4E",   // warm taupe
  accentDeep:    "#4A3B30",   // espresso
  accentLight:   "#9A8578",   // mocha
  gold:          "#A8895C",   // antique gold
  goldLight:     "#C8AC7A",   // light gold
  text:          "#2A2320",
  textSub:       "#5A504A",
  textMuted:     "#8A807A",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const studentAchievements = [
  {
    id: 1,
    name: "Arjun Sharma",
    title: "National Robotics Champion",
    category: "Technical",
    year: "2024",
    medal: "🥇",
    members: "120+ Members",
    description: "Led the school robotics team to victory at the National Robotics Olympiad, defeating 120+ teams across India.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&h=450&fit=crop",
    about: "Arjun Sharma's journey with robotics began in Grade 9, when he built his first line-following robot from scratch. Over three years of relentless practice, he rose to captain the school's robotics team and led them to a historic national-level victory.",
    longDesc: "The National Robotics Olympiad was held across 14 cities and brought together over 120 of the finest school-level robotics teams in the country. Arjun's team designed an autonomous navigation system that outperformed all competitors in accuracy, speed, and obstacle handling. The robot's vision module — built entirely using open-source hardware — was praised by judges as the most innovative system in the competition's history. Beyond the trophy, Arjun also mentored 8 junior students through the process, creating a sustainable learning culture within the school's robotics lab.",
    highlights: ["National Robotics Olympiad Winner", "Self-built autonomous vision system", "Mentored 8 junior students", "Featured in State Engineering Digest"],
  },
  {
    id: 2,
    name: "Priya Nair",
    title: "International Science Fair Winner",
    category: "Science",
    year: "2024",
    medal: "🥇",
    members: "Global Recognition",
    description: "Secured first place at the International Science & Engineering Fair with her project on biodegradable polymers.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700&h=450&fit=crop",
    about: "Priya Nair's passion for sustainable chemistry led her to develop a breakthrough process for creating biodegradable packaging polymers from agricultural waste — a project two years in the making.",
    longDesc: "Her project, titled 'BioWrap: Low-Cost Biodegradable Polymers from Agro-Waste,' was selected out of 1,800 global submissions to compete at the International Science & Engineering Fair. The polymer she developed decomposes fully within 60 days under natural conditions, making it a viable eco-friendly alternative to conventional plastic packaging. Judges lauded the real-world applicability of the research. Priya has since filed a provisional patent and is in discussions with two sustainability-focused startups for commercialization.",
    highlights: ["ISEF First Place — Materials Science", "Provisional patent filed", "1 of 12 Indians selected globally", "Published in Young Researchers Journal"],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    title: "State Debate Champion",
    category: "Arts",
    year: "2024",
    medal: "🥈",
    members: "Oratory Excellence",
    description: "Won the State Level Parliamentary Debate Championship representing the school with outstanding oratory skills.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&h=450&fit=crop",
    about: "Rohan Mehta has been a formidable presence on the debate circuit since Grade 10. Known for his sharp reasoning and commanding delivery, he has represented the school at over 12 inter-school competitions.",
    longDesc: "The State Parliamentary Debate Championship is one of the most prestigious oratory contests for school students, with participants from 80+ institutions. Rohan argued on complex policy motions including climate legislation and digital privacy rights. His articulate rebuttals and structured arguments earned him a near-perfect score from judges, who described his performance as 'a masterclass in structured persuasion.' He was named Best Speaker of the tournament and received a special citation for exemplary sportsmanship.",
    highlights: ["State Debate Champion 2024", "Best Speaker Award", "Competed in 12+ tournaments", "Coached juniors for district rounds"],
  },
  {
    id: 4,
    name: "Kavya Reddy",
    title: "National Coding Hackathon",
    category: "Technical",
    year: "2023",
    medal: "🥇",
    members: "IIT Bombay",
    description: "Built an AI-powered accessibility tool that won the National Student Hackathon organized by IIT Bombay.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&h=450&fit=crop",
    about: "Kavya Reddy has been coding since age 12, building small tools and apps in her free time. Her interest in accessibility-focused tech led her to create a tool that genuinely changes lives for visually impaired users.",
    longDesc: "At the 36-hour IIT Bombay National Hackathon, Kavya and her two-member team built 'VoiceNav' — an AI-powered mobile app that enables visually impaired users to navigate websites using natural language voice commands. The app uses on-device NLP and real-time DOM parsing to convert user intent into precise navigation actions without requiring internet connectivity. Out of 320 competing teams, VoiceNav was unanimously selected as the winner by a panel of professors and industry leaders. The app has since been open-sourced and adopted by a government digital accessibility initiative.",
    highlights: ["IIT Bombay Hackathon Winner", "Open-sourced on GitHub (2.4k stars)", "Adopted by Govt accessibility program", "Invited to present at TechFest 2024"],
  },
  {
    id: 5,
    name: "Aditya Kumar",
    title: "Young Author Award",
    category: "Arts",
    year: "2023",
    medal: "🏆",
    members: "5 Countries",
    description: "Received the prestigious Young Author Award for his debut novel published at age 16, now sold in 5 countries.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=450&fit=crop",
    about: "Aditya Kumar wrote the first draft of his debut novel 'The Weight of Silence' in just six months during his summer break. At 16, he became one of the youngest published novelists in the country.",
    longDesc: "Aditya's debut novel 'The Weight of Silence' explores themes of identity, belonging, and intergenerational trauma through the eyes of a 14-year-old navigating family secrets in a small coastal town. The book was picked up by a Bangalore-based independent publisher and has since sold over 8,000 copies across India, Sri Lanka, UAE, Canada, and the UK. It was shortlisted for the Crossword Book Award's Young Adult category and named one of the Top 10 Debut Novels of 2023 by a leading literary magazine. Aditya now conducts monthly creative writing workshops for younger students at the school.",
    highlights: ["Young Author Award 2023", "8,000+ copies sold across 5 countries", "Crossword Book Award shortlist", "Monthly creative writing workshops"],
  },
  {
    id: 6,
    name: "Sneha Patel",
    title: "National Swimming Record",
    category: "Sports",
    year: "2023",
    medal: "🥇",
    members: "National Record",
    description: "Set a new national record in 200m freestyle swimming at the Junior National Aquatics Championship.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=500&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&h=450&fit=crop",
    about: "Sneha Patel has been training in competitive swimming since age 7. At 17, she shattered a national junior record that had stood for six years — cementing her status as one of India's most promising young swimmers.",
    longDesc: "At the Junior National Aquatics Championship held in Hyderabad, Sneha completed the 200m freestyle in 1:58.34 — breaking the previous national junior record by 1.8 seconds. Her performance drew attention from the Sports Authority of India, which has since included her in the national junior talent pool programme. Sneha trains six days a week under a certified national-level coach and balances her rigorous academic schedule without compromise. She is currently preparing for the Youth Commonwealth Games trials scheduled later this year.",
    highlights: ["National Junior Record — 200m Freestyle", "Selected for SAI talent pool", "Youth Commonwealth Games aspirant", "Trains 30+ hours per week"],
  },
];

const academicExcellence = [
  { id: 1, title: "Board Toppers 2024", description: "15 students scored above 95% in Class XII Board Examinations, with 3 students achieving perfect 100%.", icon: "📜", stat: "15 Toppers" },
  { id: 2, title: "IIT & NIT Selections", description: "Record 42 students qualified for IIT JEE Advanced in 2024, with 12 securing seats in prestigious IITs.", icon: "🎓", stat: "42 Qualifiers" },
  { id: 3, title: "NEET Excellence", description: "28 students cleared NEET 2024 with exceptional scores, with 5 students securing rank under 1000 nationally.", icon: "⚕️", stat: "28 Qualifiers" },
  { id: 4, title: "Olympiad Medals", description: "Our students bagged 18 medals at various national and international olympiads in Mathematics, Physics, and Chemistry.", icon: "🏅", stat: "18 Medals" },
  { id: 5, title: "Scholarship Recipients", description: "32 students received merit-based scholarships from prestigious institutions including KVPY, INSPIRE, and state awards.", icon: "💡", stat: "32 Scholars" },
  { id: 6, title: "100% Pass Rate", description: "For the 8th consecutive year, our school has maintained a 100% pass rate in both Class X and Class XII.", icon: "✅", stat: "8 Years" },
];

// ── Animated orb background ───────────────────────────────────────────────────
function AnimatedBackground({ tick }: { tick: number }) {
  const t = tick * 0.016;
  const orbs = [
    { x: 5  + Math.sin(t * 0.55) * 10, y: 5  + Math.cos(t * 0.42) * 8,  size: 520, color: "#D8D4CE" },
    { x: 60 + Math.sin(t * 0.38+ 1)*13, y: 45 + Math.cos(t * 0.52+2)*11, size: 420, color: "#CCC8C2" },
    { x: 80 + Math.sin(t * 0.48+ 3)* 9, y: 15 + Math.cos(t * 0.28+1)*10, size: 370, color: "#D4D0CA" },
    { x: 25 + Math.sin(t * 0.52+ 2)*12, y: 70 + Math.cos(t * 0.38+3)* 8, size: 310, color: "#C8C4BE" },
  ];
  return (
    <>
      {orbs.map((orb, i) => (
        <div key={i} style={{
          position: "fixed", borderRadius: "50%",
          width: orb.size, height: orb.size, background: orb.color,
          left: `${orb.x}%`, top: `${orb.y}%`,
          transform: "translate(-50%,-50%)",
          filter: "blur(90px)", opacity: 0.5,
          pointerEvents: "none", zIndex: 0,
          transition: "left 0.12s linear, top 0.12s linear",
        }} />
      ))}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(100,90,80,0.09) 1px, transparent 1px)`,
        backgroundSize: "34px 34px",
      }} />
    </>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function DetailPage({ achievement, onBack }: { achievement: typeof studentAchievements[0], onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, position: "relative", fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      {/* Hero banner */}
      <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src={achievement.image} alt={achievement.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,22,18,0.3) 0%, rgba(30,22,18,0.75) 70%, rgba(42,35,32,0.95) 100%)" }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: "absolute", top: 28, left: 36,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
            borderRadius: 50, padding: "8px 20px", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, letterSpacing: 0.8,
          }}
        >
          ← Back to Achievements
        </button>

        {/* Hero text */}
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{
              background: `linear-gradient(135deg, ${C.accentDeep}, ${C.gold})`,
              color: "#fff", borderRadius: 50, padding: "5px 16px",
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            }}>
              {achievement.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{achievement.year}</span>
            <span style={{ fontSize: 22 }}>{achievement.medal}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 46, fontWeight: 700, margin: "0 0 8px", letterSpacing: "0.5px", lineHeight: 1.15 }}>
            {achievement.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, fontStyle: "italic" }}>
              {achievement.name}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", borderRadius: 30, padding: "4px 14px", fontSize: 12, fontWeight: 600,
            }}>
              {achievement.members}
            </span>
          </div>
        </div>
      </div>

      {/* Curved white card below hero */}
      <div style={{
        background: C.surface, borderRadius: "32px 32px 0 0",
        marginTop: -32, position: "relative", zIndex: 2,
        padding: "0 0 60px",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.1)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", display: "flex", gap: 48, alignItems: "flex-start" }}>

          {/* Left — main content */}
          <div style={{ flex: 1, paddingTop: 44 }}>
            <h2 style={{ color: C.accentDeep, fontSize: 24, fontWeight: 700, margin: "0 0 12px", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
              About the Achievement
            </h2>
            <p style={{ color: C.textSub, fontSize: 15.5, lineHeight: 1.75, margin: "0 0 28px" }}>
              {achievement.about}
            </p>

            {/* Drop-cap paragraphs */}
            {[achievement.longDesc].map((para, i) => (
              <div key={i} style={{
                background: C.bgAlt, borderRadius: 14, padding: "28px 30px", marginBottom: 24,
                border: `1px solid ${C.border}`,
              }}>
                <p style={{ color: C.textSub, fontSize: 14.5, lineHeight: 1.8, margin: 0 }}>
                  <span style={{ float: "left", fontSize: 52, fontWeight: 700, color: C.accentDeep, lineHeight: 0.78, marginRight: 8, marginTop: 6 }}>
                    {para[0]}
                  </span>
                  {para.slice(1)}
                </p>
              </div>
            ))}

            {/* Photo below text */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 4px 20px rgba(0,0,0,0.08)` }}>
              <img src={achievement.detailImage} alt="achievement" style={{ width: "100%", height: 300, objectFit: "cover", display: "block", filter: "saturate(0.85) brightness(0.92)" }} />
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: 280, flexShrink: 0, paddingTop: 44 }}>

            {/* Key Highlights */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "24px 22px", marginBottom: 20,
              border: `1px solid ${C.border}`,
              boxShadow: `0 2px 16px rgba(92,74,58,0.07)`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ color: C.accentDeep, fontSize: 16, fontWeight: 700, margin: 0 }}>Key Highlights</h3>
                <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>Ongoing</span>
              </div>
              {achievement.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${C.gold}`, color: C.gold,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ color: C.textSub, fontSize: 13.5, lineHeight: 1.5, paddingTop: 4 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Did you know */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "20px 20px",
              border: `1px solid ${C.border}`,
              boxShadow: `0 2px 16px rgba(92,74,58,0.07)`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accentDeep}, ${C.gold})`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                }}>
                  💡
                </div>
                <h4 style={{ color: C.accentDeep, fontSize: 14, fontWeight: 700, margin: 0 }}>Did you know?</h4>
              </div>
              <p style={{ color: C.textMuted, fontSize: 12.5, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                "{achievement.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ACHIEVEMENTS PAGE ────────────────────────────────────────────────────
export default function Achievements() {
  const router = useRouter(); // Initialize router
  const [activeTab, setActiveTab]   = useState<"student" | "academic">("student");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof studentAchievements[0] | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 55);
    return () => clearInterval(id);
  }, []);

  // If a card is selected, show detail page
  if (selectedAchievement) {
    return <DetailPage achievement={selectedAchievement} onBack={() => setSelectedAchievement(null)} />;
  }

  return (
    <div style={{
      fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif",
      minHeight: "100vh",
      background: `linear-gradient(150deg, ${C.pageBg} 0%, ${C.bgAlt} 45%, #E2DFDB 75%, ${C.pageBg} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes shimmer-g {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .acv-card  { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
        .acv-card:hover { transform: translateY(-6px) scale(1.012); }
        .acv-tab:hover  { background: rgba(100,90,78,0.07) !important; }
        .acv-btn        { transition: all 0.22s; cursor: pointer; }
        .acv-btn:hover  { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(74,59,48,0.28) !important; }
        .acv-back:hover { background: rgba(100,90,78,0.1) !important; }
      `}</style>

      <AnimatedBackground tick={tick} />

      {/* Top gold line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.goldLight}, ${C.gold}, transparent)`,
        animation: "pulse-gold 3.5s ease-in-out infinite",
        pointerEvents: "none", zIndex: 10,
      }} />

      {/* ── HEADER ── */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "28px 0 0",
        borderBottom: `1px solid ${C.border}`,
        background: "rgba(238,236,234,0.75)",
        backdropFilter: "blur(14px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <button 
            className="acv-back" 
            onClick={() => router.back()} // Added actual back navigation
            style={{
              background: "rgba(100,90,78,0.07)", border: `1px solid ${C.border}`,
              color: C.accentDeep, borderRadius: 50, padding: "8px 22px",
              cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              marginBottom: 36, letterSpacing: 0.8, transition: "all 0.2s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            ← Back to Home
          </button>
          <div style={{ textAlign: "center", paddingBottom: 44 }}>
            <p style={{ color: C.gold, fontSize: 11, letterSpacing: 3.5, textTransform: "uppercase", margin: "0 0 14px", fontWeight: 600 }}>
              ✦ &nbsp; Hall of Excellence &nbsp; ✦
            </p>
            <h1 style={{
              fontSize: 56, fontWeight: 700, margin: "0 0 18px", letterSpacing: "2px",
              background: `linear-gradient(135deg, ${C.accentDeep} 0%, ${C.accent} 35%, ${C.gold} 65%, ${C.accentDeep} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer-g 5s linear infinite",
            }}>
              Achievements
            </h1>
            <div style={{ width: 100, height: 1.5, margin: "0 auto 18px", background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.goldLight}, ${C.gold}, transparent)` }} />
            <p style={{ color: C.textMuted, fontSize: 15, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: 400 }}>
              Celebrating Excellence · Inspiring Greatness
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 40px", display: "flex", gap: 36, alignItems: "flex-start", position: "relative", zIndex: 10 }}>

        {/* Sidebar */}
        <div style={{
          width: 230, flexShrink: 0, position: "sticky", top: 24,
          background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)",
          borderRadius: 20, border: `1px solid ${C.border}`,
          padding: "26px 18px 30px",
          boxShadow: `0 8px 40px rgba(74,59,48,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}>
          <p style={{ color: C.gold, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", margin: "0 0 4px" }}>Browse</p>
          <h3 style={{ color: C.text, fontSize: 17, fontWeight: 700, margin: "0 0 18px" }}>All Achievements</h3>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)`, marginBottom: 20 }} />

          {(["student", "academic"] as const).map((tab) => (
            <div key={tab} className="acv-tab" onClick={() => setActiveTab(tab)} style={{
              padding: "13px 14px", cursor: "pointer",
              borderLeft: activeTab === tab ? `2px solid ${C.gold}` : `2px solid ${C.border}`,
              borderRadius: "0 12px 12px 0", marginBottom: 8, transition: "all 0.2s",
              background: activeTab === tab ? "rgba(168,137,92,0.1)" : "transparent",
            }}>
              <span style={{
                color: activeTab === tab ? C.accentDeep : C.textMuted,
                fontSize: 14, fontWeight: activeTab === tab ? 700 : 400,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {activeTab === tab && <span style={{ color: C.gold, fontSize: 12 }}>▸</span>}
                {tab === "student" ? "Student Achievements" : "Academic Excellence"}
              </span>
            </div>
          ))}

          <div style={{ marginTop: 44, textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.bgAlt}, ${C.goldLight})`,
              border: `1px solid ${C.border}`,
              margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, animation: "float 3.5s ease-in-out infinite",
              boxShadow: `0 4px 18px rgba(168,137,92,0.22)`,
            }}>🏆</div>
            <p style={{ color: C.textMuted, fontSize: 10, letterSpacing: 1.5, margin: 0, textTransform: "uppercase" }}>Pride of Our School</p>
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1 }}>

          {/* STUDENT ACHIEVEMENTS */}
          {activeTab === "student" && (
            <>
              <div style={{ marginBottom: 30, textAlign: "center" }}>
                <p style={{ color: C.gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 8px", fontWeight: 600 }}>Hall of Fame</p>
                <h2 style={{ color: C.text, fontSize: 34, fontWeight: 700, margin: "0 0 10px" }}>Student Achievements</h2>
                <div style={{ width: 60, height: 1.5, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto 10px" }} />
                <p style={{ color: C.textMuted, fontSize: 14 }}>Our Stars Who Made Us Proud</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {studentAchievements.map((a) => (
                  <div key={a.id} className="acv-card"
                    onMouseEnter={() => setHoveredCard(a.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedAchievement(a)}
                    style={{
                      background: hoveredCard === a.id ? C.surfaceHover : C.surface,
                      borderRadius: 18, overflow: "hidden",
                      border: hoveredCard === a.id ? `1px solid ${C.borderHover}` : `1px solid ${C.border}`,
                      boxShadow: hoveredCard === a.id
                        ? `0 20px 56px rgba(74,59,48,0.15), 0 0 0 1px rgba(168,137,92,0.12)`
                        : `0 2px 18px rgba(74,59,48,0.07)`,
                    }}
                  >
                    <div style={{ position: "relative", height: 152, overflow: "hidden" }}>
                      <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) saturate(0.88)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 28%, rgba(42,35,32,0.65))" }} />
                      <div style={{
                        position: "absolute", top: 11, right: 11,
                        background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)",
                        border: `1px solid ${C.border}`, borderRadius: "50%",
                        width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                      }}>{a.medal}</div>
                      <span style={{
                        position: "absolute", bottom: 10, left: 11,
                        background: `linear-gradient(135deg, ${C.accentDeep}, ${C.accent})`,
                        color: "#fff", borderRadius: 20, padding: "3px 9px",
                        fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase",
                      }}>{a.category}</span>
                      <span style={{ position: "absolute", bottom: 11, right: 11, color: C.goldLight, fontSize: 10, fontWeight: 600 }}>{a.year}</span>
                    </div>
                    <div style={{ padding: "15px 16px 18px" }}>
                      <h3 style={{ color: C.text, fontSize: 13.5, margin: "0 0 3px", fontWeight: 700, lineHeight: 1.35 }}>{a.title}</h3>
                      <p style={{ color: C.accentLight, fontSize: 11, margin: "0 0 9px", fontStyle: "italic" }}>{a.name}</p>
                      <p style={{ color: C.textSub, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{a.description}</p>
                      <button className="acv-btn" onClick={(e) => { e.stopPropagation(); setSelectedAchievement(a); }} style={{
                        marginTop: 14, width: "100%", padding: "10px",
                        background: `linear-gradient(135deg, ${C.accentDeep} 0%, ${C.accent} 60%, ${C.accentLight} 100%)`,
                        color: "#fff", border: "none", borderRadius: 10,
                        fontFamily: "inherit", fontWeight: 700,
                        fontSize: 10.5, letterSpacing: 1.8, textTransform: "uppercase",
                        boxShadow: `0 4px 16px rgba(74,59,48,0.2)`,
                      }}>
                        Know More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ACADEMIC EXCELLENCE */}
          {activeTab === "academic" && (
            <>
              <div style={{ marginBottom: 30, textAlign: "center" }}>
                <p style={{ color: C.gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 8px", fontWeight: 600 }}>Our Legacy</p>
                <h2 style={{ color: C.text, fontSize: 34, fontWeight: 700, margin: "0 0 10px" }}>Academic Excellence</h2>
                <div style={{ width: 60, height: 1.5, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto 10px" }} />
                <p style={{ color: C.textMuted, fontSize: 14 }}>Milestones That Define Our Legacy</p>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${C.accentDeep} 0%, ${C.accent} 50%, ${C.gold} 100%)`,
                borderRadius: 18, padding: "28px 32px",
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
                marginBottom: 26, textAlign: "center",
                boxShadow: `0 8px 40px rgba(74,59,48,0.18)`,
              }}>
                {[
                  { stat: "98.6%", label: "Average Board Score", icon: "📊" },
                  { stat: "100%",  label: "Pass Rate · 8 Years", icon: "🎯" },
                  { stat: "120+",  label: "National Awards",     icon: "🏆" },
                ].map((item, i) => (
                  <div key={item.label} style={{ animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                    <p style={{ fontSize: 36, fontWeight: 700, margin: "0 0 5px", letterSpacing: -1, color: "#fff" }}>{item.stat}</p>
                    <p style={{ fontSize: 11.5, margin: 0, color: "rgba(255,255,255,0.7)", letterSpacing: 0.6 }}>{item.label}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {academicExcellence.map((item, i) => (
                  <div key={item.id} className="acv-card"
                    onMouseEnter={() => setHoveredCard(item.id + 100)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: hoveredCard === item.id + 100 ? C.surfaceHover : C.surface,
                      borderRadius: 16, padding: "22px 20px",
                      border: hoveredCard === item.id + 100 ? `1px solid ${C.borderHover}` : `1px solid ${C.border}`,
                      borderLeft: `3px solid ${i % 2 === 0 ? C.accentDeep : C.gold}`,
                      boxShadow: hoveredCard === item.id + 100 ? `0 16px 40px rgba(74,59,48,0.14)` : `0 2px 14px rgba(74,59,48,0.06)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                        background: i % 2 === 0 ? "rgba(74,59,48,0.08)" : "rgba(168,137,92,0.12)",
                        border: `1px solid ${C.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                      }}>{item.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
                          <h3 style={{ color: C.text, fontSize: 14.5, margin: 0, fontWeight: 700 }}>{item.title}</h3>
                          <span style={{
                            background: i % 2 === 0 ? "rgba(74,59,48,0.09)" : "rgba(168,137,92,0.15)",
                            color: i % 2 === 0 ? C.accentDeep : C.accent,
                            borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700,
                            border: `1px solid ${C.border}`, whiteSpace: "nowrap", flexShrink: 0,
                          }}>{item.stat}</span>
                        </div>
                        <p style={{ color: C.textSub, fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
        position: "fixed", bottom: 30, right: 30,
        width: 46, height: 46, borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.accentDeep}, ${C.gold})`,
        color: "#fff", border: `1px solid ${C.border}`,
        cursor: "pointer", fontSize: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 4px 20px rgba(74,59,48,0.28)`,
        animation: "pulse-gold 2.5s ease-in-out infinite",
        zIndex: 100,
      }}>↑</button>
    </div>
  );
}
