"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

export default function AboutCollege() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    // Interactive movable logo background
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 25;
      const y = (clientY - window.innerHeight / 2) / 25;

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans cursor-default overflow-x-hidden">
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Hero Section */}
      <section className="relative h-[65vh] w-full mt-[80px] overflow-hidden">
        <img
          src="/DJI_0135.jpg"
          alt="AIET Campus Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl font-serif italic uppercase tracking-wider">
              About <span className="text-yellow-400">AIET</span>
            </h1>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
            <p className="text-white/80 mt-4 font-bold tracking-widest uppercase text-sm">
              Shaping Future Engineers Since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area with Movable Background */}
      <div className="relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.04]">
          <img
            ref={logoRef}
            src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/logo.png"
            alt="AIET Logo Background"
            className="w-[70vw] max-w-[900px] h-auto object-contain"
          />
        </div>

        <main className="relative z-10 container mx-auto px-6 py-16 max-w-6xl">
          <div className="space-y-16 relative z-10">
            {/* Introduction */}
            <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/20">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                Alva’s Institute of Engineering and Technology (AIET),
                established in 2008, is ranked among the best engineering
                colleges in Karnataka. Located in the lush green town of
                Moodubidri, near Mangalore, AIET is part of the reputed Alva’s
                Education Foundation. The institution was founded by Dr. M.
                Mohan Alva, a visionary in the field of education and social
                development.
                <br />
                <br />
                With a mission to make high-quality technical education
                accessible and inclusive,{" "}
                <span className="text-blue-900 font-bold">AIET</span> offers a
                diverse range of academic programs and career opportunities for
                aspiring engineers and business leaders.
              </p>
            </section>

            {/* Why Choose AIET */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 font-serif italic border-l-8 border-yellow-400 pl-6">
                Why Choose Alva’s Institute of Engineering and Technology
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-yellow-200 transition-colors">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    National Affiliations and Recognitions
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <span className="text-yellow-500 mt-1">●</span>
                      <p className="text-slate-700 font-medium">
                        Affiliated to Visvesvaraya Technological University
                        (VTU)
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-yellow-500 mt-1">●</span>
                      <p className="text-slate-700 font-medium">
                        Approved by AICTE and UGC
                      </p>
                    </li>
                  </ul>
                  <p className="mt-4 text-slate-600 italic">
                    These approvals ensure that all programs offered meet
                    national academic standards and provide students with
                    globally competitive skills and credentials.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-yellow-200 transition-colors">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    NBA Accreditation
                  </h3>
                  <p className="text-slate-700 mb-4 font-medium">
                    AIET holds NBA Accreditation for its departments of:
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full font-bold text-sm">
                      Computer Science and Engineering
                    </span>
                    <span className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full font-bold text-sm">
                      Electronics and Communication Engineering
                    </span>
                  </div>
                  <p className="text-slate-600 italic">
                    This accreditation validates AIET’s excellence in teaching
                    quality, research outputs, and graduate employability.
                  </p>
                </div>
              </div>
            </section>

            {/* Programs Offered */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 font-serif italic border-l-8 border-yellow-400 pl-6">
                Programs Offered
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 -mr-16 -mt-16 rounded-full opacity-20 group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">
                    Undergraduate (B. Tech)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Mechanical Engineering",
                      "Electronics and Communication",
                      "Computer Science",
                      "Information Science",
                      "Civil Engineering",
                    ].map((prog) => (
                      <div
                        key={prog}
                        className="flex items-center gap-3 bg-white/5 p-3 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="font-medium">{prog}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 -mr-16 -mt-16 rounded-full opacity-10 group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-900">
                    Postgraduate Program
                  </h3>
                  <p className="text-xl font-black text-slate-800 mb-4">
                    Master of Business Administration (MBA)
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    A full-time, two-year program that focuses on leadership,
                    innovation, and entrepreneurship.
                  </p>
                  <Link
                    href="/department/mba"
                    className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all"
                  >
                    Visit Department Page <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Faculty & Environment */}
            <section className="bg-blue-900 text-white rounded-[3rem] p-10 md:p-16 shadow-2xl">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black mb-6 font-serif italic text-yellow-400">
                  Faculty and Learning Environment
                </h2>
                <p className="text-lg md:text-xl leading-relaxed opacity-90 font-medium">
                  At AIET, experienced faculty members from academic and
                  industry backgrounds create a learning environment that blends
                  theory with real-world application. Students gain hands-on
                  experience through labs, projects, internships, and industry
                  interactions, ensuring they are ready to excel in their
                  careers.
                </p>
              </div>
            </section>

            {/* Scholarships */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 font-serif italic border-l-8 border-yellow-400 pl-6">
                Scholarships and Financial Assistance
              </h2>
              <p className="text-slate-700 mb-8 font-medium italic">
                AIET is committed to supporting students through several
                financial assistance programs, such as:
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: "Alva’s Foundation Scholarship",
                    desc: "For exceptional students",
                  },
                  {
                    title: "Karnataka e-Pass Scholarship",
                    desc: "For OBC students",
                  },
                  {
                    title: "Merit-cum-Means Scholarships",
                    desc: "For minority communities",
                  },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-400"
                  >
                    <h4 className="font-bold text-blue-900 mb-2">{s.title}</h4>
                    <p className="text-sm text-slate-600 font-medium">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Infrastructure */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6 font-serif italic text-blue-900">
                  World-Class Campus Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Smart classrooms and digital library",
                    "High-speed Wi-Fi across campus",
                    "Incubation centers and labs",
                    "Separate hostel facilities",
                    "Sports and fitness facilities",
                    "Wellness center and gym",
                    "On-campus cafeteria",
                    "Medical support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 bg-slate-100 p-4 rounded-xl font-bold text-slate-700 text-sm"
                    >
                      <i className="fas fa-check-circle text-blue-600"></i>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-200">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                  alt="Library"
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            {/* Placement Section */}
            <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-10 opacity-10">
                <i className="fas fa-briefcase text-[10rem]"></i>
              </div>
              <h2 className="text-3xl font-black mb-8 font-serif italic text-yellow-400 text-center">
                Placement and Career Opportunities
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <p className="text-lg opacity-90 font-medium text-center md:text-left">
                    AIET’s dedicated Training and Placement Cell ensures that
                    students are well-prepared for their careers through:
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      "100% placement support",
                      "Resume-building workshops",
                      "Soft skills and aptitude training",
                      "Industry partnerships",
                    ].map((pt) => (
                      <div
                        key={pt}
                        className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl font-bold"
                      >
                        <i className="fas fa-star text-yellow-400"></i>
                        {pt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                  <p className="text-xl font-bold text-yellow-400 mb-4 underline italic decoration-white/20">
                    Our Graduates at Top Companies
                  </p>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    AIET graduates are successfully placed in top companies
                    across sectors like IT, manufacturing, consulting, and
                    finance.
                  </p>
                </div>
              </div>
            </section>

            {/* Research & Admissions */}
            <section className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h2 className="text-2xl font-black text-blue-900 mb-6 font-serif italic">
                  Research and Innovation
                </h2>
                <div className="space-y-4 text-slate-700 font-medium">
                  <p>Focus Areas:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg">
                      AI & Machine Learning
                    </span>
                    <span className="px-3 py-1 bg-slate-100 rounded-lg">
                      Renewable Energy
                    </span>
                    <span className="px-3 py-1 bg-slate-100 rounded-lg">
                      Data Science
                    </span>
                  </div>
                  <p className="italic text-slate-500 text-sm">
                    Promoting patent filing, research paper publication, and
                    conference participation.
                  </p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 border-b-8 border-b-blue-900">
                <h2 className="text-2xl font-black text-blue-900 mb-6 font-serif italic">
                  Admissions – Join AIET
                </h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      B. Tech Admission Criteria
                    </h4>
                    <p className="text-xs text-slate-500 font-black mb-2 uppercase tracking-tighter">
                      10+2 with PCM | 45% (Gen) | 40% (SC/ST)
                    </p>
                    <p className="text-sm font-bold text-blue-600 italic">
                      Entrance: KCET or COMEDK
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">
                      MBA Admission Criteria
                    </h4>
                    <p className="text-xs text-slate-500 font-black mb-2 uppercase tracking-tighter">
                      Recognized UG Degree | 50% (Gen) | 45% (SC/ST)
                    </p>
                    <p className="text-sm font-bold text-blue-600 italic">
                      Entrance: CAT, KMAT, GMAT
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Call to Action */}
            <section className="text-center py-10">
              <h2 className="text-4xl font-black text-slate-900 mb-6 font-serif italic">
                Choose AIET for a Bright Future
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-medium">
                Alva’s Institute of Engineering and Technology is not just an
                institution—it’s a platform for growth, discovery, and
                transformation.
              </p>
              <Link
                href="/admissions"
                className="inline-block bg-blue-900 text-white font-black px-12 py-5 rounded-full shadow-2xl hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
              >
                Apply Now
              </Link>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      <style jsx global>{`
        #main-header {
          background-color: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.1) !important;
        }
        #main-header .nav-btn,
        #main-header span,
        #main-header i,
        #main-header h1,
        #main-header h3,
        #top-bar span,
        #top-bar a {
          color: #b77a00 !important;
        }
        #main-header img {
          filter: none !important;
          opacity: 1 !important;
        }
        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.2) !important;
        }
        footer {
          background-color: #071a34 !important;
        }
      `}</style>
    </div>
  );
}
