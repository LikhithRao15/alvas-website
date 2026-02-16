"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { FaArrowLeft } from "react-icons/fa";

const departmentMap = {
  cse: {
    name: "Computer Science and Engineering",
    shortName: "Computer Science",
  },
  ece: {
    name: "Electronics & Communication Engineering",
    shortName: "Electronics & Comm.",
  },
  mech: { name: "Mechanical Engineering", shortName: "Mechanical" },
  civil: { name: "Civil Engineering", shortName: "Civil" },
  ai: { name: "Artificial Intelligence", shortName: "AI" },
  ise: {
    name: "Information Science & Engineering",
    shortName: "Information Science",
  },
  icb: { name: "Industrial & Computer Engineering", shortName: "ICB" },
  agri: { name: "Agricultural Engineering", shortName: "Agriculture" },
  aiml: { name: "AI & Machine Learning", shortName: "AI & Machine Learning" },
  me: { name: "Mechanical Engineering", shortName: "Mechanical" },
  mba: { name: "Master of Business Administration", shortName: "MBA" },
  mtech: { name: "Master of Technology", shortName: "M.Tech" },
  basic: { name: "Basic Science", shortName: "Basic Science" },
};

const facultyMembers = [
  {
    id: 1,
    name: "Prof. Faculty 1",
    designation: "Assistant Professor",
    qualification: "M.Tech, Ph.D (Pursuing)",
    experience: "8 Years",
    email: "faculty1@alvas.edu.in",
    phone: "+91 90000 00001",
    aoi: "AI, Machine Learning, Data Structures",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Prof. Faculty 2",
    designation: "Associate Professor",
    qualification: "M.Tech, Ph.D",
    experience: "12 Years",
    email: "faculty2@alvas.edu.in",
    phone: "+91 90000 00002",
    aoi: "Cloud Computing, Cyber Security",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Prof. Faculty 3",
    designation: "Professor",
    qualification: "M.E, Ph.D",
    experience: "18 Years",
    email: "faculty3@alvas.edu.in",
    phone: "+91 90000 00003",
    aoi: "Distributed Systems, IoT",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Prof. Faculty 4",
    designation: "Assistant Professor",
    qualification: "M.Tech",
    experience: "5 Years",
    email: "faculty4@alvas.edu.in",
    phone: "+91 90000 00004",
    aoi: "Web Development, DBMS",
    photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80",
  },
];

const recruiters = [
  { name: "Infosys" },
  { name: "TCS" },
  { name: "Wipro" },
  { name: "Accenture" },
  { name: "Capgemini" },
  { name: "Amazon" },
  { name: "Google" },
  { name: "Microsoft" },
];

export default function DepartmentPage() {
  const params = useParams();
  const deptKey = params?.dept || "cse";
  const department = departmentMap[deptKey] || departmentMap.cse;

  // REMOVED: isSidePanelOpen state
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const facultyTrackRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    // Set page title
    document.title = `${department.name} | AIET`;

    // Ensure scroll is enabled when component mounts (Fixes the stuck page issue)
    document.body.style.overflow = "auto";

    // Update department header
    const deptHeaderName = document.getElementById("deptHeaderName");
    if (deptHeaderName) {
      deptHeaderName.textContent = department.shortName;
    }

    // Scroll header effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Show floating button after video section
      const videoSection = document.getElementById("videoSection");
      const footer = document.getElementById("siteFooter");

      if (videoSection && footer) {
        const videoBottom = videoSection.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        setShowFloatingButton(
          videoBottom < 0 && footerTop > windowHeight - 100
        );
      }

      // Header scroll effect
      const header = document.getElementById("main-header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Reveal on scroll animation
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Animate divider
            const divider = entry.target.querySelector(".divider");
            if (divider) {
              setTimeout(() => {
                divider.style.width = "100%";
              }, 300);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealItems.forEach((item) => observer.unobserve(item));
      // Safety: Ensure body is scrollable when leaving the page
      document.body.style.overflow = "auto";
    };
  }, [department.name, department.shortName]);

  const scrollFaculty = (direction) => {
    if (!facultyTrackRef.current) return;

    const track = facultyTrackRef.current;
    const scrollAmount = 290;
    const currentX = parseInt(
      track.style.transform?.replace("translateX(-", "").replace("px)", "") ||
        "0"
    );
    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;

    let newX =
      direction === "next"
        ? Math.min(currentX + scrollAmount, maxScroll)
        : Math.max(currentX - scrollAmount, 0);

    gsap.to(track, {
      x: -newX,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const openFacultyModal = (faculty) => {
    setCurrentFaculty(faculty);
    setIsFacultyModalOpen(true);
    document.body.style.overflow = "hidden";

    // Animate modal in
    setTimeout(() => {
      const modalBox = document.getElementById("facultyModalBox");
      if (modalBox) {
        modalBox.classList.add("show");
      }
    }, 10);
  };

  const closeFacultyModal = () => {
    const modalBox = document.getElementById("facultyModalBox");
    if (modalBox) {
      modalBox.classList.remove("show");
    }

    setTimeout(() => {
      setIsFacultyModalOpen(false);
      document.body.style.overflow = "auto";
    }, 200);
  };

  // REMOVED: openSidePanel and closeSidePanel functions

  // Add CSS styles
  const styles = `
    .dept-bg {
      background:
        radial-gradient(
          circle at top left,
          rgba(251, 191, 36, 0.12),
          transparent 55%
        ),
        radial-gradient(
          circle at bottom right,
          rgba(59, 130, 246, 0.08),
          transparent 55%
        ),
        linear-gradient(to bottom, #fffbf0, #fef9f3, #fffbf0);
      min-height: 100vh;
      color: #1a1a1a;
    }

    .dept-title {
      background: linear-gradient(135deg, #1e3a8a, #7c2d12, #d97706);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% auto;
      animation: shine 5s linear infinite;
    }

    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }

    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reveal.show {
      opacity: 1;
      transform: translateY(0px);
    }

    .divider {
      height: 1px;
      width: 0%;
      background: linear-gradient(
        to right,
        rgba(139, 92, 246, 1),
        rgba(59, 130, 246, 1),
        rgba(148, 163, 184, 0)
      );
      transition: width 1s ease;
      border-radius: 999px;
    }

    .reveal.show .divider {
      width: 100%;
    }

    .wave-btn {
      position: relative;
      overflow: visible;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .wave-btn::before {
      content: "";
      position: absolute;
      inset: -10px;
      border-radius: 9999px;
      background: radial-gradient(
        circle,
        rgba(99, 102, 241, 0.35),
        transparent 60%
      );
      animation: wavePulse 1.8s infinite ease-in-out;
      z-index: -1;
    }

    .wave-btn::after {
      content: "";
      position: absolute;
      inset: -18px;
      border-radius: 9999px;
      border: 2px solid rgba(99, 102, 241, 0.25);
      animation: waveRing 1.8s infinite ease-in-out;
      z-index: -1;
    }

    @keyframes wavePulse {
      0% {
        transform: scale(0.95);
        opacity: 0.55;
      }
      50% {
        transform: scale(1.07);
        opacity: 0.9;
      }
      100% {
        transform: scale(0.95);
        opacity: 0.55;
      }
    }

    @keyframes waveRing {
      0% {
        transform: scale(0.85);
        opacity: 0;
      }
      40% {
        transform: scale(1.05);
        opacity: 0.6;
      }
      100% {
        transform: scale(1.25);
        opacity: 0;
      }
    }

    .marquee-track {
      display: inline-flex;
      gap: 2rem;
      white-space: nowrap;
      animation: marquee 20s linear infinite;
      padding-left: 100%;
    }

    @keyframes marquee {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .faculty-card {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(99, 102, 241, 0.3);
      backdrop-filter: blur(14px);
      transition: 0.4s ease;
      cursor: pointer;
    }

    .faculty-card:hover {
      transform: translateY(-6px);
      border-color: rgba(139, 92, 246, 0.7);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
    }

    .modalBox {
      transform: translateY(20px) scale(0.98);
      opacity: 0;
      transition: all 0.25s ease;
    }

    .modalBox.show {
      transform: translateY(0px) scale(1);
      opacity: 1;
    }

    .header-scrolled {
      background-color: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(20px) !important;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    }
  `;

  return (
    <>
      <style jsx global>
        {styles}
      </style>

      {/* Header */}
      <header
        id="main-header"
        className="fixed top-0 w-full z-50 text-white pt-4 pb-4 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-500"
      >
        <nav className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative">
          <Link href="/">
            <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer z-50">
              <img
                id="logo-img"
                src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/logo.png"
                alt="Alvas Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />

              <div className="flex flex-col justify-center">
                <h1
                  id="logo-text-1"
                  className="font-serif text-xl md:text-2xl font-black leading-none tracking-tight text-blue-900"
                >
                  ALVA'S
                </h1>
                <span
                  id="logo-text-2"
                  className="text-[8px] md:text-[9px] font-bold tracking-[0.1em] uppercase opacity-90 mt-0.5 text-blue-900"
                >
                  INSTITUTE OF ENGINEERING & TECHNOLOGY
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:block text-right">
              <div className="text-[9px] font-bold tracking-[0.2em] text-blue-900/40 uppercase mb-0.5">
                Department Page
              </div>
              <div
                id="deptHeaderName"
                className="font-serif text-xl font-black text-blue-900 leading-none"
              >
                {department.shortName}
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 bg-[#4f46e5] text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-bold text-sm shadow-lg shadow-indigo-200"
            >
              <FaArrowLeft className="text-xs" /> Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Top padding for fixed header */}
      <div className="h-20 md:h-24"></div>

      {/* Floating Explore Button - MODIFIED */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-300 ${
          showFloatingButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* REPLACED THE WRAPPED BUTTON WITH DIRECT LINK */}
        <Link
          href={`/explore/${deptKey}`}
          className="wave-btn bg-indigo-600 text-white font-extrabold px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition text-xs md:text-sm uppercase tracking-widest relative"
        >
          Explore More
        </Link>
      </div>

      {/* REMOVED SIDE PANEL OVERLAY AND CONTENT */}

      {/* Faculty Modal */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] flex items-center justify-center px-4 transition-opacity duration-300 ${
          isFacultyModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeFacultyModal}
      >
        <div
          id="facultyModalBox"
          className="modalBox w-full max-w-2xl rounded-3xl border border-gray-300 bg-white/98 backdrop-blur-2xl shadow-2xl p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeFacultyModal}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-indigo-600 text-white font-black hover:bg-indigo-700 transition shadow-md"
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={currentFaculty?.photo || ""}
              className="w-full md:w-52 h-52 object-cover rounded-3xl border border-gray-300 shadow-xl"
              alt="Faculty Photo"
            />

            <div className="flex-1">
              <h3 className="text-2xl font-black text-indigo-700">
                {currentFaculty?.name}
              </h3>
              <p className="text-sm font-bold text-gray-600 mt-1">
                {currentFaculty?.designation}
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                    Qualification
                  </p>
                  <p className="font-semibold text-gray-900">
                    {currentFaculty?.qualification}
                  </p>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                    Experience
                  </p>
                  <p className="font-semibold text-gray-900">
                    {currentFaculty?.experience}
                  </p>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                    Email
                  </p>
                  <p className="font-semibold text-gray-900">
                    {currentFaculty?.email}
                  </p>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-900">
                    {currentFaculty?.phone}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-gray-100 border border-gray-300 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                  Area of Interest
                </p>
                <p className="font-semibold text-gray-900">
                  {currentFaculty?.aoi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dept-bg min-h-screen">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Title Section */}
          <section
            className="text-center mb-14 reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <h1 className="dept-title font-serif text-4xl md:text-6xl font-black leading-tight text-blue-900">
              {department.name}
            </h1>
            <br />
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Innovate|Code|Design|Deploy
            </p>

            <div className="divider mt-8"></div>
          </section>
        </main>

        {/* Video Section */}
        <section
          id="videoSection"
          className="mb-16 reveal w-full"
          ref={(el) => (revealRefs.current[1] = el)}
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Department Video
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Watch a quick overview about the department.
            </p>
          </div>

          <div className="w-screen mx-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-300 bg-gray-900">
              <div className="aspect-video w-full">
                <video
                  className="w-full h-full object-cover block"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://cdn.pixabay.com/video/2023/04/17/159162_tiny.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="divider mt-10"></div>
          </div>
        </section>

        {/* Continue Main */}
        <main className="max-w-7xl mx-auto px-6 pb-12">
          {/* Vision / Mission */}
          <section className="mb-16 grid md:grid-cols-2 gap-10">
            <div
              id="visionSection"
              className="reveal"
              ref={(el) => (revealRefs.current[2] = el)}
            >
              <h2 className="text-3xl font-black text-indigo-700 mb-3">
                Vision
              </h2>
              <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                To become a center of excellence in {department.name} by
                nurturing innovation, ethics, and research-driven learning to
                serve society and industry globally.
              </p>
              <div className="divider mt-8"></div>
            </div>

            <div
              id="missionSection"
              className="reveal"
              ref={(el) => (revealRefs.current[3] = el)}
            >
              <h2 className="text-3xl font-black text-indigo-700 mb-3">
                Mission
              </h2>
              <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                To impart quality technical education through modern curriculum,
                hands-on projects, industry collaboration, and skill development
                for strong career growth.
              </p>
              <div className="divider mt-8"></div>
            </div>
          </section>

          {/* HOD */}
          <section
            className="mb-16 reveal"
            ref={(el) => (revealRefs.current[4] = el)}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Head of the Department
            </h2>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80"
                  className="w-44 h-44 rounded-3xl object-cover shadow-2xl border border-gray-300"
                  alt="HOD Photo"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-black text-indigo-700">
                  Dr. ABC XYZ
                </h3>
                <p className="text-sm font-bold text-gray-700 mb-4">
                  Professor & HOD - {department.shortName}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                      Qualification
                    </p>
                    <p className="font-semibold text-gray-900">
                      Ph.D, M.Tech
                    </p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                      Experience
                    </p>
                    <p className="font-semibold text-gray-900">15+ Years</p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900">
                      hod{deptKey}@alvas.edu.in
                    </p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                      Contact
                    </p>
                    <p className="font-semibold text-gray-900">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider mt-10"></div>
          </section>

          {/* Faculty */}
          <section
            id="facultySection"
            className="mb-16 reveal"
            ref={(el) => (revealRefs.current[5] = el)}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                Faculty List
              </h2>
            </div>

            <div className="relative">
              <button
                onClick={() => scrollFaculty("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gray-200 border border-gray-400 text-gray-900 font-black hover:bg-indigo-600 hover:text-white transition shadow-lg"
              >
                ‹
              </button>

              <div className="overflow-hidden px-14">
                <div
                  ref={facultyTrackRef}
                  id="facultyTrack"
                  className="flex gap-5 transition-transform duration-500"
                >
                  {facultyMembers.map((faculty) => (
                    <div
                      key={faculty.id}
                      className="faculty-card min-w-[260px] rounded-3xl p-5 cursor-pointer"
                      onClick={() => openFacultyModal(faculty)}
                      data-name={faculty.name}
                      data-designation={faculty.designation}
                      data-qualification={faculty.qualification}
                      data-experience={faculty.experience}
                      data-email={faculty.email}
                      data-phone={faculty.phone}
                      data-aoi={faculty.aoi}
                      data-photo={faculty.photo}
                    >
                      <img
                        src={faculty.photo}
                        className="w-full h-44 rounded-2xl object-cover mb-4"
                        alt={faculty.name}
                      />
                      <h3 className="font-black text-gray-900">
                        {faculty.name}
                      </h3>
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                        {faculty.designation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollFaculty("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gray-200 border border-gray-400 text-gray-900 font-black hover:bg-indigo-600 hover:text-white transition shadow-lg"
              >
                ›
              </button>
            </div>

            <div className="divider mt-10"></div>
          </section>

          {/* Top Recruiters */}
          <section
            className="mb-8 reveal"
            ref={(el) => (revealRefs.current[6] = el)}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Top Recruiters
            </h2>

            <div className="bg-gray-100 border border-gray-300 rounded-3xl overflow-hidden py-6">
              <div className="marquee-track text-sm font-black text-indigo-700 flex items-center">
                {[...recruiters, ...recruiters].map((recruiter, index) => (
                  <div
                    key={index}
                    className="px-8 flex flex-col items-center"
                  >
                    <div className="h-10 w-20 bg-gray-300 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-800">
                        {recruiter.name}
                      </span>
                    </div>
                    <span>{recruiter.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          id="siteFooter"
          className="bg-[#071a34] text-white pt-16 pb-6 mt-16"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/logos/alvaslogo.png"
                    alt="Alvas Logo"
                    className="w-16 h-16 object-contain drop-shadow-xl"
                  />
                  <div>
                    <h3 className="text-xl font-black leading-tight">
                      ALVAS
                      <span className="block text-sm font-bold tracking-widest text-white/80">
                        INSTITUTE OF ENGINEERING AND TECHNOLOGY
                      </span>
                    </h3>
                    <p className="text-xs text-white/60 font-semibold mt-1">
                      (An Autonomous Institution)
                    </p>
                  </div>
                </div>

                <div className="space-y-5 text-sm text-white/70 font-medium">
                  <div className="flex gap-3">
                    <p className="font-extrabold text-white w-20">Phone</p>
                    <p>
                      +91 98765 43210 <br />
                      +91 98765 43211
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p className="font-extrabold text-white w-20">Email</p>
                    <p>
                      info@alvas.edu.in <br />
                      principal@alvas.edu.in
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p className="font-extrabold text-white w-20">Address</p>
                    <p>
                      Alva's Campus, Moodbidri <br />
                      Karnataka, India - 574227
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                  Facilities
                </h4>
                <ul className="space-y-3 text-sm text-white/70 font-semibold">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Placements
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Campus
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Library
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Hostel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Transportation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      CSR
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Core Facilities
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                  Academics
                </h4>
                <ul className="space-y-3 text-sm text-white/70 font-semibold">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Academics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Courses Offered
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Academic Calendar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Value Added Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Results
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-yellow-300 transition"
                    >
                      Useful Links
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                  Location
                </h4>
                <a
                  href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <iframe
                    src="https://www.google.com/maps?q=Alva's+Institute+of+Engineering+and+Technology&output=embed"
                    className="w-full h-44 rounded-lg border border-white/10 hover:opacity-90 transition"
                    loading="lazy"
                    title="Alvas Institute Location"
                  ></iframe>
                </a>
              </div>
            </div>

            <div className="mt-14 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/50 font-semibold tracking-wide">
                © {new Date().getFullYear()} Alvas Institute of Engineering and
                Technology. All Rights Reserved.
              </p>
              <p className="text-xs text-white/40 font-semibold mt-2">
                Managed by{" "}
                <span className="text-yellow-300">Alva's Web Team</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}