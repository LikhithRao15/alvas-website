"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  BookOpen,
  Beaker,
  Home,
  Trophy,
  Wifi,
  Bus,
  Sun,
  Leaf,
  Code,
  Cpu,
  Brain,
  Music,
  Ghost,
  Palette,
  PenTool,
  Users,
  ShieldCheck,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AIETCampus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    desc: "",
    placeholder: "",
  });
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const clubsTrackRef = useRef<HTMLDivElement>(null);

  // --- WebGL Background Logic ---
  useLayoutEffect(() => {
    const canvas = glCanvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `attribute vec2 a_position; void main(){ gl_Position = vec4(a_position,0.0,1.0); }`;
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      void main(){
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec3 top = vec3(0.04, 0.09, 0.18);
        vec3 mid = vec3(0.07, 0.14, 0.26);
        vec3 bottom = vec3(0.05, 0.10, 0.20);
        vec3 col = mix(top, mid, smoothstep(0.0, 0.55, uv.y));
        col = mix(col, bottom, smoothstep(0.5, 1.0, uv.y));
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Basic Shader Setup (Simplified for TSX brevity, keeping the navy theme)
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    const render = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    requestAnimationFrame(render);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- GSAP Animations ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.to(".hero-title-line", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
      }).to(
        ".hero-anim-item",
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        "-=0.8",
      );

      // Scroll Animations
      gsap.utils.toArray(".sk-card").forEach((card: any) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const openModal = (type: string) => {
    const config: any = {
      apply: {
        title: "Apply for 2025 Batch",
        desc: "Fill in your details for admissions.",
        placeholder: "Preferred Programme",
      },
      brochure: {
        title: "Download Brochure",
        desc: "Get the full AIET prospectus.",
        placeholder: "Course of Interest",
      },
      placements: {
        title: "Placement Enquiry",
        desc: "Connect with our placement cell.",
        placeholder: "Company Name",
      },
    };
    setModalConfig(config[type] || config.apply);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#0F1B2D] text-[#F0EAE0] font-sans selection:bg-[#D4A843] selection:text-[#0F1B2D] overflow-x-hidden">
      {/* Background */}
      <canvas
        ref={glCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10">
        {/* --- HERO --- */}
        <section className="min-h-screen flex flex-col justify-center px-[8vw] relative overflow-hidden">
          <div className="hero-anim-item opacity-0 translate-y-4 flex items-center gap-3 text-[#D4A843] uppercase tracking-[3.5px] text-xs font-semibold mb-7">
            <span className="w-2 h-2 bg-[#D4A843] rounded-full animate-ping" />
            Moodbidri, Karnataka · Est. 2001
          </div>
          <h1 className="hero-title font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.95] mb-9 font-light tracking-tighter">
            <span className="hero-title-line block overflow-hidden [clip-path:inset(0_0_100%_0)]">
              Explore the
            </span>
            <span className="hero-title-line block overflow-hidden [clip-path:inset(0_0_100%_0)]">
              <em className="italic text-[#D4A843]">Campus</em> That
            </span>
            <span className="hero-title-line block overflow-hidden [clip-path:inset(0_0_100%_0)]">
              Shapes Leaders
            </span>
          </h1>
          <p className="hero-anim-item opacity-0 translate-y-4 text-[#8AAABB] text-lg max-w-xl leading-relaxed mb-12 font-light">
            Alva's Institute of Engineering & Technology — a world-class
            learning ecosystem where modern infrastructure, vibrant culture, and
            industry-ready programmes converge.
          </p>
          <div className="hero-anim-item opacity-0 translate-y-4 flex gap-4 flex-wrap">
            <button
              onClick={() => openModal("apply")}
              className="bg-gradient-to-br from-[#D4A843] to-[#A87E28] text-[#0F1B2D] px-10 py-4 rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-transform"
            >
              Explore Campus ↓
            </button>
            <button
              onClick={() => openModal("brochure")}
              className="bg-white/5 border border-[#D4A843]/20 px-10 py-4 rounded-xl font-bold backdrop-blur-md hover:bg-[#D4A843]/10 transition-colors"
            >
              Download Brochure
            </button>
          </div>

          <div className="hidden lg:grid absolute right-[6vw] top-1/2 -translate-y-1/2 grid-cols-2 gap-4 w-[360px]">
            <FloatCard
              icon={<BookOpen size={32} />}
              title="Library"
              sub="30,000+ Books"
            />
            <FloatCard
              icon={<Beaker size={32} />}
              title="R&D Labs"
              sub="Innovation Centers"
            />
            <FloatCard
              icon={<Home size={32} />}
              title="Hostel"
              sub="24/7 Security"
            />
            <FloatCard
              icon={<Trophy size={32} />}
              title="Sports"
              sub="10+ Sports"
            />
          </div>
        </section>

        {/* --- STATS --- */}
        <section className="px-[8vw] pb-20">
          <div className="bg-gradient-to-br from-[#162438] to-[#0E1C2E] rounded-3xl p-12 border border-[#D4A843]/10 flex flex-wrap justify-around gap-8 text-center shadow-2xl">
            <StatItem num="30K" label="Books & Journals" />
            <StatItem num="95%" label="Placement Rate" />
            <StatItem num="200+" label="Hiring Partners" />
            <StatItem num="50+" label="Industry MoUs" />
          </div>
        </section>

        {/* --- INFRASTRUCTURE --- */}
        <section className="max-w-[1380px] mx-auto px-[8vw] py-20">
          <SectionHeader
            eyebrow="Academic Infrastructure"
            title={
              <>
                Built for <em>Brilliance</em>
              </>
            }
            desc="State-of-the-art classrooms and research facilities."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <SkillCard
              badge="Smart"
              icon={<BookOpen />}
              title="Smart Classrooms"
              desc="Interactive learning spaces with AV systems."
              list={["Smartboards", "Ergonomic seating"]}
            />
            <SkillCard
              badge="30K+"
              icon={<PenTool />}
              title="Central Library"
              desc="Knowledge hub for UG, PG, and researchers."
              list={["IEEE Access", "Digital library"]}
            />
            <SkillCard
              badge="IIC"
              icon={<Beaker />}
              title="Research & Innovation"
              desc="Industry-sponsored labs for next-gen thinkers."
              list={["Startup incubation", "Hackathons"]}
            />
          </div>
        </section>

        {/* --- INDUSTRY PANEL --- */}
        <section className="px-[8vw] py-20">
          <div className="bg-[#162438] rounded-[32px] p-12 border border-[#D4A843]/15 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-8 h-0.5 bg-[#D4A843]" /> Industry & Careers
              </div>
              <h2 className="font-serif text-5xl mb-6">
                Bridging Campus to <em>Career</em>
              </h2>
              <p className="text-[#8AAABB] mb-8 leading-relaxed">
                Strategic partnerships with industry leaders ensure every
                graduate is globally competitive.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Infosys MoU",
                  "Wipro TalentNext",
                  "TCS iON",
                  "IIC Certified",
                ].map((p) => (
                  <span
                    key={p}
                    className="px-4 py-2 bg-[#1E3050] border border-[#D4A843]/10 rounded-lg text-xs font-semibold text-[#8AAABB]"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <button
                onClick={() => openModal("placements")}
                className="bg-gradient-to-r from-[#D4A843] to-[#A87E28] text-[#0F1B2D] px-8 py-3 rounded-xl font-bold"
              >
                Explore Placements →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SqCard num="95%" label="Placement" />
              <SqCard num="200+" label="Hiring Partners" />
              <SqCard num="50+" label="MoUs" />
              <SqCard num="8+" label="Countries" />
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="px-[8vw] py-20">
          <div className="bg-gradient-to-br from-[#1A3A6A] to-[#0A1A38] rounded-[32px] p-16 text-center border border-[#D4A843]/20 shadow-2xl">
            <div className="text-[#D4A843] uppercase tracking-[3px] text-xs font-bold mb-4">
              Your Journey Starts Here
            </div>
            <h2 className="font-serif text-5xl mb-6">
              Ready to Be Part of the AIET Story?
            </h2>
            <p className="text-[#8AAABB] mb-10 max-w-2xl mx-auto">
              Join thousands of students who chose AIET and never looked back.
              Your future begins in Moodbidri.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => openModal("apply")}
                className="bg-[#D4A843] text-[#0F1B2D] px-12 py-4 rounded-xl font-black shadow-xl"
              >
                Apply for 2025 Batch ✦
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 backdrop-blur-xl p-6">
          <div className="bg-[#1A2E48] border border-[#D4A843]/20 p-10 rounded-[28px] max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#D4A843] hover:rotate-90 transition-transform"
            >
              <X size={24} />
            </button>
            <h3 className="font-serif text-3xl mb-2">{modalConfig.title}</h3>
            <p className="text-[#8AAABB] text-sm mb-8">{modalConfig.desc}</p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-white/5 border border-[#D4A843]/15 p-4 rounded-xl outline-none focus:border-[#D4A843] transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-[#D4A843]/15 p-4 rounded-xl outline-none focus:border-[#D4A843] transition-colors"
              />
              <input
                type="text"
                placeholder={modalConfig.placeholder}
                className="bg-white/5 border border-[#D4A843]/15 p-4 rounded-xl outline-none focus:border-[#D4A843] transition-colors"
              />
              <button className="bg-[#D4A843] text-[#0F1B2D] py-4 rounded-xl font-bold mt-2">
                Submit →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components for Cleanliness ---

const FloatCard = ({ icon, title, sub }: any) => (
  <div className="bg-white/10 backdrop-blur-2xl border border-white/5 p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-all">
    <div className="text-[#D4A843] mb-3">{icon}</div>
    <div className="text-white font-bold text-sm">{title}</div>
    <div className="text-[#8AAABB] text-[10px] uppercase tracking-wider">
      {sub}
    </div>
  </div>
);

const StatItem = ({ num, label }: any) => (
  <div>
    <div className="font-serif text-5xl text-[#D4A843] font-bold mb-2">
      {num}
    </div>
    <div className="text-[#6A8A9A] text-xs font-bold uppercase tracking-widest">
      {label}
    </div>
  </div>
);

const SectionHeader = ({ eyebrow, title, desc }: any) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-4">
      <span className="w-8 h-0.5 bg-[#D4A843]" /> {eyebrow}
    </div>
    <h2 className="font-serif text-5xl text-white mb-4">{title}</h2>
    <p className="text-[#8AAABB] max-w-xl">{desc}</p>
  </div>
);

const SkillCard = ({ badge, icon, title, desc, list }: any) => (
  <div className="sk-card opacity-0 translate-y-10 bg-gradient-to-br from-[#1A2E48] to-[#142238] p-8 rounded-3xl border border-white/5 relative group hover:border-[#D4A843]/30 transition-all">
    {badge && (
      <div className="absolute top-6 right-6 bg-[#D4A843]/10 text-[#D4A843] text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4A843]/20">
        {badge}
      </div>
    )}
    <div className="w-14 h-14 bg-[#D4A843] text-[#0F1B2D] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-[#8AAABB] text-sm leading-relaxed mb-6">{desc}</p>
    <ul className="space-y-2">
      {list.map((li: string) => (
        <li key={li} className="text-[#6A8A9A] text-xs flex items-center gap-2">
          <span className="w-1 h-1 bg-[#D4A843] rounded-full" /> {li}
        </li>
      ))}
    </ul>
  </div>
);

const SqCard = ({ num, label }: any) => (
  <div className="bg-[#1A2E48] p-8 rounded-2xl border border-white/5 text-center hover:border-[#D4A843]/30 transition-all shadow-xl">
    <div className="font-serif text-4xl font-bold bg-gradient-to-r from-[#D4A843] to-white bg-clip-text text-transparent mb-1">
      {num}
    </div>
    <div className="text-[#6A8A9A] text-[10px] font-bold uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default AIETCampus;
