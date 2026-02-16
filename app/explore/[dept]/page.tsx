'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const tabData = {
  initiatives: {
    title: "Initiatives",
    body: `✅ Dummy information for Initiatives will appear here.
<br><br>
• Smart classroom activities<br>
• Coding competitions<br>
• Hackathons & workshops<br>
• Department clubs & student chapters`,
    highlights: [
      "Regular student activities and project-based learning.",
      "Industry workshops and guest lectures.",
      "Student chapter activities and tech clubs."
    ]
  },
  peo: {
    title: "PEO, PO, PSO and COs",
    body: `✅ Dummy information for PEO, PO, PSO and COs.
<br><br>
• Program Educational Objectives (PEO)<br>
• Program Outcomes (PO)<br>
• Program Specific Outcomes (PSO)<br>
• Course Outcomes (CO)`,
    highlights: [
      "Well-defined educational objectives aligned with industry needs.",
      "Clear program outcomes for skill development.",
      "Course outcomes mapped to program objectives."
    ]
  },
  syllabus: {
    title: "Scheme Syllabus",
    body: `✅ Dummy syllabus information.
<br><br>
• Semester wise syllabus available<br>
• Updated scheme alignment<br>
• Labs and practical sessions included`,
    highlights: [
      "Comprehensive semester-wise syllabus structure.",
      "Updated curriculum with latest industry trends.",
      "Hands-on lab sessions and practical training."
    ]
  },
  thrust: {
    title: "Thrust Area",
    body: `✅ Dummy thrust area details.
<br><br>
• Artificial Intelligence<br>
• Machine Learning<br>
• Cyber Security<br>
• Cloud Computing`,
    highlights: [
      "Focus on emerging technologies and research areas.",
      "Industry-relevant specialization tracks.",
      "Research projects in cutting-edge domains."
    ]
  },
  facultyStaff: {
    title: "Faculty and Staff",
    body: `✅ Dummy faculty & staff information.
<br><br>
• Highly qualified faculty<br>
• Experienced lab instructors<br>
• Strong student mentoring system`,
    highlights: [
      "Doctoral and postgraduate qualified faculty members.",
      "Industry-experienced teaching staff.",
      "Dedicated student mentoring and guidance."
    ]
  },
  placements: {
    title: "Placements",
    body: `✅ Dummy placement details.
<br><br>
• Placement training & mock interviews<br>
• Career guidance programs<br>
• Strong recruiter network`,
    highlights: [
      "Comprehensive placement training programs.",
      "Regular mock interviews and aptitude tests.",
      "Strong network of recruiting companies."
    ]
  },
  research: {
    title: "Research",
    body: `✅ Dummy research details.
<br><br>
• Research publications<br>
• Funded projects<br>
• Conferences & journals participation`,
    highlights: [
      "Faculty publications in reputed journals.",
      "Government and industry-funded projects.",
      "Active participation in national/international conferences."
    ]
  },
  facilities: {
    title: "Facilities",
    body: `✅ Dummy facilities details.
<br><br>
• Modern computer labs<br>
• Smart classrooms<br>
• High speed internet`,
    highlights: [
      "State-of-the-art computer laboratories.",
      "Smart classrooms with audio-visual aids.",
      "High-speed internet and network infrastructure."
    ]
  },
  workshop: {
    title: "Workshop/Conference Organized",
    body: `✅ Dummy workshop/conference information.
<br><br>
• National workshops<br>
• Guest lectures<br>
• Industry expert sessions`,
    highlights: [
      "Regular organization of national-level workshops.",
      "Guest lectures by industry experts.",
      "Technical seminars and conferences."
    ]
  },
  facultyAch: {
    title: "Faculty Achievement",
    body: `✅ Dummy faculty achievements.
<br><br>
• Research awards<br>
• Publications<br>
• Recognitions`,
    highlights: [
      "Awards for research excellence.",
      "Publications in reputed international journals.",
      "Professional recognitions and certifications."
    ]
  },
  studentAch: {
    title: "Student Achievement",
    body: `✅ Dummy student achievements.
<br><br>
• Hackathon winners<br>
• Coding contest champions<br>
• Project awards`,
    highlights: [
      "Winners in national hackathons and coding competitions.",
      "Awards for innovative projects and research.",
      "Scholarships and academic excellence awards."
    ]
  },
  clubs: {
    title: "Professional Bodies/Club Activities",
    body: `✅ Dummy clubs/activities.
<br><br>
• IEEE / CSI / ISTE chapters<br>
• Club meetups and events<br>
• Student leadership activities`,
    highlights: [
      "Active student chapters of professional bodies.",
      "Regular technical and cultural events.",
      "Student leadership and organizational activities."
    ]
  },
  alumni: {
    title: "Alumni Interaction",
    body: `✅ Dummy alumni interaction details.
<br><br>
• Alumni guest talks<br>
• Mentorship programs<br>
• Alumni networking`,
    highlights: [
      "Regular alumni interaction sessions.",
      "Mentorship programs by successful alumni.",
      "Strong alumni network for career guidance."
    ]
  },
  newsletter: {
    title: "NewsLetter",
    body: `✅ Dummy newsletter content.
<br><br>
• Department news<br>
• Achievements<br>
• Events & workshops`,
    highlights: [
      "Quarterly department newsletter publication.",
      "Updates on achievements and events.",
      "Student and faculty contributions."
    ]
  },
  calendar: {
    title: "Academic Calendar",
    body: `✅ Dummy academic calendar.
<br><br>
• Semester start/end dates<br>
• Exam schedules<br>
• Holidays & events`,
    highlights: [
      "Well-planned academic schedule.",
      "Clear exam and evaluation timelines.",
      "Important events and holiday schedules."
    ]
  }
}

const departmentMap = {
  cse: { name: 'Computer Science and Engineering', shortName: 'Computer Science' },
  ece: { name: 'Electronics & Communication Engineering', shortName: 'Electronics & Comm.' },
  mech: { name: 'Mechanical Engineering', shortName: 'Mechanical' },
  civil: { name: 'Civil Engineering', shortName: 'Civil' },
  ai: { name: 'Artificial Intelligence', shortName: 'AI' },
  ise: { name: 'Information Science & Engineering', shortName: 'Information Science' },
  icb: { name: 'Industrial & Computer Engineering', shortName: 'ICB' },
}

export default function ExplorePage() {
  const params = useParams()
  const deptKey = params?.dept || 'cse'
  const department = departmentMap[deptKey] || departmentMap.cse
  
  const [activeTab, setActiveTab] = useState('initiatives')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Set page title
    document.title = `Explore ${department.name} | AIET`

    // Scroll header effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [department.name])

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  const tabs = [
    { id: 'initiatives', label: 'Initiatives' },
    { id: 'peo', label: 'PEO, PO, PSO and COs' },
    { id: 'syllabus', label: 'Scheme Syllabus' },
    { id: 'thrust', label: 'Thrust Area' },
    { id: 'facultyStaff', label: 'Faculty and Staff' },
    { id: 'placements', label: 'Placements' },
    { id: 'research', label: 'Research' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'workshop', label: 'Workshop/Conference Organized' },
    { id: 'facultyAch', label: 'Faculty Achievement' },
    { id: 'studentAch', label: 'Student Achievement' },
    { id: 'clubs', label: 'Professional Bodies/Club Activities' },
    { id: 'alumni', label: 'Alumni Interaction' },
    { id: 'newsletter', label: 'NewsLetter' },
    { id: 'calendar', label: 'Academic Calendar' }
  ]

  const currentData = tabData[activeTab]

  return (
    <>
      <style jsx global>{`
        .page-bg {
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

        .tab-btn.active {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(139, 92, 246, 0.6);
          color: #4338ca;
        }

        .content-enter {
          animation: slideInRight 0.5s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(20px) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
          padding-top: 8px !important;
          padding-bottom: 8px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>

      {/* Header */}
      <header 
        id="main-header" 
        className={`fixed top-0 w-full z-50 text-white pt-4 pb-4 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-500 ${
          isScrolled ? 'header-scrolled' : ''
        }`}
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
                <h1 className="font-serif text-xl md:text-2xl font-black leading-none tracking-tight text-blue-900">
                  ALVA&apos;S
                </h1>
                <span className="text-[8px] md:text-[9px] font-bold tracking-[0.1em] uppercase opacity-90 mt-0.5 text-blue-900">
                  INSTITUTE OF ENGINEERING & TECHNOLOGY
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:block text-right">
              <div className="text-[9px] font-bold tracking-[0.2em] text-blue-900/40 uppercase mb-0.5">
                Explore Page
              </div>
              <div className="font-serif text-xl font-black text-blue-900 leading-none">
                Highlights
              </div>
            </div>
            <Link 
              href={`/departments/${deptKey}`}
              className="flex items-center gap-2 bg-[#4f46e5] text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-bold text-sm shadow-lg shadow-indigo-200"
            >
              <FaArrowLeft className="text-xs" /> Back
            </Link>
          </div>
        </nav>
      </header>

      {/* Top padding for fixed header */}
      <div className="h-20 md:h-24"></div>

      {/* Main Content */}
      <div className="page-bg">
        <div className="max-w-[1500px] mx-auto px-3 md:px-5 py-10 grid lg:grid-cols-12 gap-6">
          {/* LEFT SIDE: Tab List */}
          <aside className="lg:col-span-3 bg-white border border-gray-300 rounded-3xl p-4 backdrop-blur-xl shadow-md">
            <h3 className="text-lg font-black text-indigo-700 mb-4">Explore Tabs</h3>

            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn w-full text-left px-4 py-3 rounded-2xl border border-gray-300 hover:bg-gray-200 transition font-bold text-gray-900 ${
                    activeTab === tab.id 
                      ? 'active bg-gray-100' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT SIDE: Content Area */}
          <section className="lg:col-span-9 bg-white border border-gray-300 rounded-3xl p-6 shadow-md content-enter">
            <h2 className="text-2xl font-black text-indigo-700 mb-3">
              {currentData.title}
            </h2>

            <div 
              className="text-sm md:text-base text-gray-800 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: currentData.body }}
            />

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                  Highlights
                </p>
                <p className="font-semibold text-gray-900 mt-2">
                  {currentData.highlights?.[0] || 'Regular student activities and project-based learning.'}
                </p>
              </div>

              <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                  Outcome
                </p>
                <p className="font-semibold text-gray-900 mt-2">
                  {currentData.highlights?.[1] || 'Industry-ready skills and strong placement performance.'}
                </p>
              </div>
            </div>

            {currentData.highlights?.[2] && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
                  Additional Information
                </p>
                <p className="font-semibold text-blue-900 mt-2">
                  {currentData.highlights[2]}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-[#071a34] text-white pt-16 pb-6 mt-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Logo + Contact */}
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
                      Alva&apos;s Campus, Moodbidri <br />
                      Karnataka, India - 574227
                    </p>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                  Facilities
                </h4>
                <ul className="space-y-3 text-sm text-white/70 font-semibold">
                  <li><Link href="#" className="hover:text-yellow-300 transition">Placements</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Campus</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Library</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Hostel</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Transportation</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">CSR</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Core Facilities</Link></li>
                </ul>
              </div>

              {/* Academics */}
              <div>
                <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                  Academics
                </h4>
                <ul className="space-y-3 text-sm text-white/70 font-semibold">
                  <li><Link href="#" className="hover:text-yellow-300 transition">Academics</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Courses Offered</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Academic Calendar</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Research</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Value Added Courses</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Results</Link></li>
                  <li><Link href="#" className="hover:text-yellow-300 transition">Useful Links</Link></li>
                </ul>
              </div>

              {/* Map */}
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
                © {new Date().getFullYear()} Alvas Institute of Engineering and Technology. All Rights Reserved.
              </p>
              <p className="text-xs text-white/40 font-semibold mt-2">
                Managed by <span className="text-yellow-300">Alva&apos;s Web Team</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}