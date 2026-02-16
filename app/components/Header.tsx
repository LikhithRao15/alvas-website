"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoText1Ref = useRef<HTMLHeadingElement>(null);
  const logoText2Ref = useRef<HTMLSpanElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Create refs for ALL mega menu groups
  const aboutGroupRef = useRef<HTMLDivElement>(null);
  const academicsGroupRef = useRef<HTMLDivElement>(null);
  const researchGroupRef = useRef<HTMLDivElement>(null);
  const placementsGroupRef = useRef<HTMLDivElement>(null);
  const campusGroupRef = useRef<HTMLDivElement>(null);
  const admissionsGroupRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Create refs for ALL dropdowns
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const academicsDropdownRef = useRef<HTMLDivElement>(null);
  const researchDropdownRef = useRef<HTMLDivElement>(null);
  const placementsDropdownRef = useRef<HTMLDivElement>(null);
  const campusDropdownRef = useRef<HTMLDivElement>(null);
  const admissionsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    const logoImg = logoImgRef.current;
    const logoText1 = logoText1Ref.current;
    const logoText2 = logoText2Ref.current;
    const topBar = topBarRef.current;

    ScrollTrigger.create({
      trigger: "body",
      start: "top -50",
      toggleClass: { targets: header, className: "header-scrolled" },
      onEnter: () => {
        gsap.to([logoText1, logoText2], { color: "#b77a00", duration: 0.2 });
        gsap.to(".nav-btn", { color: "#b77a00", duration: 0.4 });
        if (logoImg) {
          logoImg.src =
            "https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/logo.png";
        }
        gsap.to(logoImg, { width: "3.5rem", height: "4.5rem", duration: 0.4 });
        gsap.to(logoText1, { fontSize: "1.875rem", duration: 0.4 });
        gsap.to(topBar, {
          height: 0,
          opacity: 0,
          padding: 0,
          marginBottom: 0,
          duration: 0.4,
          overflow: "hidden",
        });
      },
      onLeaveBack: () => {
        gsap.to([logoText1, logoText2], { color: "#ffffff", duration: 0.4 });
        gsap.to(".nav-btn", { color: "#ffffff", duration: 0.4 });
        if (logoImg) {
          logoImg.src =
            "https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/alvas-org-logo-white.png";
        }
        gsap.to(logoImg, { width: "3rem", height: "4rem", duration: 0.4 });
        gsap.to(logoText1, {
          fontSize: window.innerWidth < 768 ? "1.5rem" : "1.875rem",
          duration: 0.4,
        });
        gsap.to(topBar, {
          height: "auto",
          opacity: 0.9,
          paddingBottom: "0.5rem",
          marginBottom: "0.75rem",
          duration: 0.4,
        });
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // FULL-WIDTH MEGA MENU POSITIONING FOR ALL TABS
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Controllers for cleanup
    const controllers = new AbortController();
    const { signal } = controllers;

    // Array of all mega menu groups and their dropdowns
    const megaMenus = [
      { group: aboutGroupRef.current, dd: aboutDropdownRef.current },
      { group: academicsGroupRef.current, dd: academicsDropdownRef.current },
      { group: researchGroupRef.current, dd: researchDropdownRef.current },
      { group: placementsGroupRef.current, dd: placementsDropdownRef.current },
      { group: campusGroupRef.current, dd: campusDropdownRef.current },
      { group: admissionsGroupRef.current, dd: admissionsDropdownRef.current },
    ];

    function positionDropdown(dd: HTMLElement) {
      const nav = navRef.current;
      if (!dd || !nav) return;

      const navRect = nav.getBoundingClientRect();

      dd.style.position = "fixed";
      dd.style.left = "50%";
      dd.style.width = "100%";
      dd.style.maxWidth = "1200px";

      // ✅ Anchor dropdown to NAV (stable height)
      dd.style.setProperty("top", `${navRect.bottom - 0.5}px`, "important");
    }

    // === MEGA MENU STATE ===
    let activeMenu: HTMLElement | null = null;
    let activeGroup: HTMLElement | null = null;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    function isInside(el: HTMLElement | null, target: Node | null) {
      return !!el && !!target && el.contains(target);
    }

    window.addEventListener(
      "mousemove",
      (e) => {
        if (!activeMenu) return;

        const target = e.target as Node;

        // If mouse is inside ACTIVE TAB GROUP OR inside active dropdown → do nothing
        if (isInside(activeGroup, target) || isInside(activeMenu, target)) {
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          return;
        }

        // Delay closure slightly to bridge accidental gaps (e.g. while moving from tab to card)
        if (!closeTimer && activeMenu) {
          closeTimer = setTimeout(() => {
            if (activeMenu) closeMenu(activeMenu);
            closeTimer = null;
          }, 100); // 100ms bridge remains snappy but prevents flicker
        }
      },
      { passive: true, signal },
    );

    function openMenu(group: HTMLElement, dd: HTMLElement) {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      if (activeMenu && activeMenu !== dd) {
        closeMenu(activeMenu);
      }

      positionDropdown(dd);

      dd.style.setProperty("opacity", "1", "important");
      dd.style.setProperty("visibility", "visible", "important");
      dd.style.setProperty("pointer-events", "auto", "important");
      dd.style.setProperty(
        "transform",
        "translateX(-50%) translateY(0)",
        "important",
      );

      activeMenu = dd;
      activeGroup = group;

      // Update button color
      const btn = group.querySelector("button");
      if (btn) {
        const headerEl = headerRef.current;
        const useColor = headerEl?.classList.contains("header-scrolled")
          ? "#b77a00"
          : "#ffffff";
        btn.style.color = useColor;
      }
    }

    function closeMenu(dd: HTMLElement) {
      dd.style.setProperty("opacity", "0", "important");
      dd.style.setProperty("visibility", "hidden", "important");
      dd.style.setProperty("pointer-events", "none", "important");
      dd.style.setProperty(
        "transform",
        "translateX(-50%) translateY(6px)",
        "important",
      );

      if (activeMenu === dd) {
        // Reset button colors when menu closes
        megaMenus.forEach(({ group, dd: menuDd }) => {
          if (menuDd === dd) {
            const btn = group?.querySelector("button");
            if (btn) btn.style.color = "";
          }
        });
        activeMenu = null;
        activeGroup = null;
      }
    }

    // Attach event listeners to all mega menus

    megaMenus.forEach(({ group, dd }) => {
      if (!group || !dd) return;

      const handleEnter = () => openMenu(group, dd);

      const handleLeave = (e: Event) => {
        const related = (e as MouseEvent).relatedTarget as Node;
        if (group.contains(related) || dd.contains(related)) return;
        closeMenu(dd);
      };

      group.addEventListener("mouseenter", handleEnter, { signal });

      dd.addEventListener("mouseenter", handleEnter, { signal });
    });

    window.addEventListener(
      "resize",
      () => {
        megaMenus.forEach(({ dd }) => {
          if (dd && dd.style.visibility === "visible") {
            positionDropdown(dd);
          }
        });
      },
      { signal },
    );

    window.addEventListener(
      "scroll",
      () => {
        megaMenus.forEach(({ dd }) => {
          if (dd && dd.style.visibility === "visible") {
            positionDropdown(dd);
          }
        });
      },
      { passive: true, signal },
    );

    return () => {
      controllers.abort();
    };
  }, []);

  return (
    <header
      id="main-header"
      ref={headerRef}
      className="fixed top-0 w-full z-50 text-white pt-2 pb-2 bg-black/10 backdrop-blur-sm border-b border-white/10 transition-all duration-500"
    >
      {/* Top Bar - unchanged */}
      <div
        id="top-bar"
        ref={topBarRef}
        className="hidden md:flex container mx-auto px-6 lg:px-12 justify-between items-center text-[11px] font-semibold opacity-80 mb-3 border-b border-white/20 pb-2 transition-all duration-300"
      >
        <div className="flex gap-6">
          <span className="hover:text-[#b77a00] cursor-pointer transition">
            <i className="fas fa-envelope mr-2 text-[#b77a00]"></i>
            principalaiet08@gmail.com
          </span>
          <span className="hover:text-[#b77a00] cursor-pointer transition">
            <i className="fas fa-phone mr-2 text-[#b77a00]"></i>
            8050579606, 8050585606
          </span>
          <span className="hover:text-[#b77a00] cursor-pointer transition">
            CET CODE-E169
          </span>
          <span className="hover:text-[#b77a00] cursor-pointer transition">
            PGCET CODE-
          </span>
        </div>

        <div className="flex gap-6 tracking-wide items-center font-bold">
          <a
            href="#"
            className="flex items-center gap-2 bg-slate-800 text-[#b77a00] px-4 py-1.5 rounded-full hover:bg-[#b77a00] hover:text-slate-900 transition"
          >
            <i className="fas fa-cube text-lg"></i>
            360° View
          </a>
          <a href="#" className="text-[#b77a00]">
            Admissions Enquiry
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navRef}
        className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative"
      >
        {/* Logo Area - clickable */}
        <Link
          href="/"
          className="flex items-center gap-3 lg:gap-4 group cursor-pointer z-50"
        >
          <img
            id="logo-img"
            ref={logoImgRef}
            src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/alvas-org-logo-white.png"
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md transition-all duration-500"
            alt="Alvas Institute Logo"
          />
          <div className="flex flex-col justify-center">
            <h1
              id="logo-text-1"
              ref={logoText1Ref}
              className="font-serif text-2xl md:text-3xl font-black leading-none tracking-tight transition-all duration-500 text-white"
            >
              ALVA&apos;S
            </h1>
            <span
              id="logo-text-2"
              ref={logoText2Ref}
              className="text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase opacity-90 font-sans mt-1 transition-all duration-500 text-white"
            >
              INSTITUTE OF ENGINEERING & TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          id="nav-links"
        >
          {/* ============ ABOUT - FULL WIDTH MEGA MENU ============ */}
          <div ref={aboutGroupRef} className="relative group py-4">
            <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 text-white group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
              ABOUT
              <i className="fas fa-chevron-down text-[10px] ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"></i>
            </button>

            <div
              ref={aboutDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-4 gap-6 px-2">
                  {/* Column 1 - Institution */}
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Institution
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        AEF
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        About College
                      </a>
                      <Link
                        href="/about/vision-mission"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Vision Mission
                      </Link>

                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Milestones
                      </a>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4 mt-6">
                        Accreditations
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        AICTE
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NBA
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NAAC
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Autonomous
                      </a>
                    </div>
                  </div>

                  {/* Column 2 - Disclosure & Contact */}
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Mandatory Disclosure
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        College Info
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        AICTE
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NBA
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NAAC
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Autonomous
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Audit Reports
                      </a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <div>
                        <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                          Administration
                        </h3>
                        <Link
                          href="/about/administration"
                          className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                        >
                          Administration
                        </Link>
                      </div>
                      <div>
                        <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                          MOU&apos;s
                        </h3>
                        <a
                          href="#"
                          className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                        >
                          MOU&apos;s
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 - Chairman's Message */}
                  <div className="space-y-4 overflow-hidden min-w-0">
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Chairman's Message
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-[#b77a00]/20">
                        <img
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
                          alt="Chairman"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[0.85rem] font-bold text-[#b77a00] uppercase mb-1">
                          Dr. Mohan Alva
                        </h4>
                        <p className="text-[0.82rem] text-[#475569] leading-relaxed italic border-l-2 border-[#b77a00]/30 pl-3 whitespace-normal break-words">
                          "Welcome to Alva's! Our mission is to provide
                          world-class technical education infused with cultural
                          values, shaping students into innovative leaders who
                          serve society."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 overflow-hidden min-w-0">
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Principal&apos;s Message
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-[#b77a00]/20">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
                          alt="Principal"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[0.85rem] font-bold text-[#b77a00] uppercase mb-1">
                          Dr. Peter Fernandes
                        </h4>
                        <p className="text-[0.82rem] text-[#475569] leading-relaxed italic border-l-2 border-[#b77a00]/30 pl-3 whitespace-normal break-words">
                          "We foster an environment of academic excellence and
                          personal growth. Our state-of-the-art facilities
                          ensure students are well-prepared for the challenges
                          of future industries."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ ADMISSIONS - FULL WIDTH MEGA MENU ============ */}
          <div ref={admissionsGroupRef} className="relative group py-4">
            <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
              ADMISSIONS
              <i className="fas fa-chevron-down text-[10px] ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"></i>
            </button>

            <div
              ref={admissionsDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-3 gap-10">
                  {/* Column 1 - Admission Procedure */}
                  <div>
                    <div
                      style={{
                        color: "#b77a00",
                        fontWeight: "800",
                        fontSize: "1.1rem",
                        marginBottom: "1rem",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "0.5rem",
                        display: "block",
                        visibility: "visible",
                        opacity: 1,
                      }}
                    >
                      ADMISSION PROCEDURE
                    </div>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Admission Through KCET
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Admission Through COMED-K
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Admission Through Management
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Documents Required
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Disclaimer – Eligibility Criteria
                      </a>
                    </div>
                  </div>

                  {/* Column 2 - Fees Structures */}
                  <div>
                    <div
                      style={{
                        color: "#b77a00",
                        fontWeight: "800",
                        fontSize: "1.1rem",
                        marginBottom: "1rem",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "0.5rem",
                        display: "block",
                        visibility: "visible",
                        opacity: 1,
                      }}
                    >
                      FEES STRUCTURES
                    </div>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        KCET Students
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        COMED-K Students
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Management
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Tuition Fees 2025–26
                      </a>
                    </div>
                  </div>

                  {/* Column 3 - Scholarships */}
                  <div>
                    <div
                      style={{
                        color: "#b77a00",
                        fontWeight: "800",
                        fontSize: "1.1rem",
                        marginBottom: "1rem",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "0.5rem",
                        display: "block",
                        visibility: "visible",
                        opacity: 1,
                      }}
                    >
                      SCHOLARSHIPS
                    </div>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        List of Scholarships Schemes
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Scholarships Schemes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ ACADEMICS - FULL WIDTH MEGA MENU ============ */}
          <div ref={academicsGroupRef} className="relative group py-4">
            <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
              ACADEMICS
              <i className="fas fa-chevron-down text-[10px] ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"></i>
            </button>

            <div
              ref={academicsDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-3 gap-10">
                  {/* Column 1 - UG Programmes */}
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      UG Programmes
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Agriculture Engineering
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Artificial Intelligence & ML
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Computer Science & Engineering
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Civil Engineering
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Electronics & Communication Engg
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Information Science & Engineering
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Mechanical Engineering
                      </a>
                    </div>

                    {/* <h4 className="text-[0.85rem] font-semibold text-[#334155] mt-6 mb-2">
                      Department Resources
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0]">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        About Department
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        PEO, PO, PSO
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Scheme Syllabus
                      </a>
                    </div> */}
                  </div>

                  {/* Column 2 - PG Programmes */}
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      PG Programmes
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        MBA Programme
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        M.Tech
                      </a>
                    </div>

                    {/* <h4 className="text-[0.85rem] font-semibold text-[#334155] mt-6 mb-2">
                      Department Activities
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0]">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Faculty & Staff
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Placements
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Research
                      </a>
                    </div> */}
                  </div>

                  {/* Column 3 - Basic Sciences */}
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Basic Sciences
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Chemistry
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Mathematics
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Physics
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        English
                      </a>
                    </div>

                    {/* <h4 className="text-[0.85rem] font-semibold text-[#334155] mt-6 mb-2">
                      Facilities
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0]">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Labs
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Workshops
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Student Achievements
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ RESEARCH - FULL WIDTH MEGA MENU ============ */}
          <div ref={researchGroupRef} className="relative group py-4">
            <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
              RESEARCH
              <i className="fas fa-chevron-down text-[10px] ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"></i>
            </button>

            <div
              ref={researchDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Research Areas
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Funding
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        IPR
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Publication
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Patent Application
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Multidisciplinary Research Ideas
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Resources
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Research Team
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Research Policies
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Research Supervisors
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Journals
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Conference
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Facilities
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Facilities
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Yearwise Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={placementsGroupRef} className="relative group py-4">
            <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
              PLACEMENTS
              <i className="text-[10px] ml-1 opacity-70 "></i>
            </button>

            {/* <div
              ref={placementsDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Overview
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Team
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Placed Students
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Recruitment
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Companies Visited
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Recruiters
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Placement Posters
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Statistics
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        List of Students Placed Last 5 Years
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* ============ CAMPUS LIFE - FULL WIDTH MEGA MENU ============ */}

          <div ref={campusGroupRef} className="relative group py-4">
            <Link href="/campus-life">
              <button className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] flex items-center gap-1 group-hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-200 hover:after:w-full">
                CAMPUS LIFE
                <i className=" text-[10px] ml-1 opacity-70 "></i>
              </button>
            </Link>
            {/* <div
              ref={campusDropdownRef}
              className="dropdown-menu transition-all duration-200 z-[9999]"
            >
              <div className="bg-white border border-[#edf2f7] border-t-[3px] border-t-[#b77a00] rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Explore
                    </h3>

                    <h4 className="text-[0.85rem] font-semibold text-[#334155] mb-1">
                      Hostel
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0] mb-3">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Overview
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Amenities / Facilities
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Rules and timings
                      </a>
                    </div>

                    <a
                      href="#"
                      className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5 mb-2"
                    >
                      Sports
                    </a>
                    <a
                      href="#"
                      className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5 mb-2"
                    >
                      Care Facilities
                    </a>

                    <h4 className="text-[0.85rem] font-semibold text-[#334155] mb-1 mt-2">
                      Transportation
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0] mb-3">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Rules and regulations
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Bus Rules
                      </a>
                    </div>

                    <h4 className="text-[0.85rem] font-semibold text-[#334155] mb-1">
                      Campus
                    </h4>
                    <div className="space-y-1 pl-2 border-l-2 border-[#e2e8f0]">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Campus
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Student Academic Information Desk
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#64748b] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Internet and Email Services
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Clubs & Activities
                    </h3>
                    <div className="max-h-96 overflow-y-auto pr-2 space-y-1">
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Pragna Sanskrith Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Rostrum Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Srishti The Nature Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Edwin Linex Lab
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Algoris Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Apple IOS Lab
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Auto Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NSS
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        NCC
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Kannada Sangha
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Tulu Sangha
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Fin Art
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Swachh Mijar
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Readers Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Chirtp Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Photography Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Rovers And Rangers
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Women Empowerment Cell
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        SSB Club
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Language Lab
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Adyathma
                      </a>
                      <a
                        href="#"
                        className="block text-[0.85rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Live skills
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Facilities
                    </h3>
                    <div className="space-y-1 mb-6">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Library
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Hostel
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Fitness
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Health & Medical
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Transport
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Auditorium
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Digital Infrastructure
                      </a>
                    </div>

                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Library
                    </h3>
                    <div className="space-y-1 mb-6">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Rules and Regulations
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Library books, journals
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Library Services / sections
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        E-resources
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Accession register
                      </a>
                    </div>

                    <h3 className="text-[0.9rem] font-bold text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 mb-4">
                      Achievements
                    </h3>
                    <div className="space-y-1 mb-6">
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Student
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] text-[#475569] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Academic
                      </a>
                    </div>

                    <div className="space-y-1">
                      <a
                        href="#"
                        className="block text-[0.9rem] font-semibold text-[#334155] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Gallery
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] font-semibold text-[#334155] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Celebration
                      </a>
                      <a
                        href="#"
                        className="block text-[0.9rem] font-semibold text-[#334155] hover:text-[#b77a00] hover:pl-1 transition-all py-0.5"
                      >
                        Sport
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Contact Us - Simple link */}
          <Link
            href="/contact"
            className="nav-btn font-bold tracking-[1px] uppercase text-[1rem] py-[5px] hover:text-[#b77a00] transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#b77a00] after:transition-all after:duration-400 hover:after:w-full"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div
          className="lg:hidden text-2xl cursor-pointer z-50 p-2"
          id="hamburger-btn"
          onClick={onMenuToggle}
        >
          <i
            className="fas fa-bars transition-colors duration-300 text-white"
            id="mobile-menu-icon"
          ></i>
        </div>
      </nav>
    </header>
  );
}
