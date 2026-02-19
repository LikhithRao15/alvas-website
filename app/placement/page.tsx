"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── Inline MobileMenu ───────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  const links = ['Home', 'About', 'Academics', 'Placements', 'Research', 'Contact'];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#071a34', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', marginBottom: '16px' }}>✕</button>
        {links.map(l => (
          <a key={l} href="#" style={{ color: '#fff', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1rem' }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

// ─── Inline Header ───────────────────────────────────────────────────────────
export const HEADER_HEIGHT = 64; // px — keep in sync with header height below



// ─── Inline Footer ───────────────────────────────────────────────────────────


// ─── TeamSlider ──────────────────────────────────────────────────────────────
type TeamMember = { name: string; role: string; branch: string; img: string };

function TeamSlider({ members }: { members: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VISIBLE = 4; // cards visible at once
  const total   = members.length;

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  // Auto-advance every 2.5 s
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 2500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, index]);

  // Build the visible window (wraps around)
  const visible = Array.from({ length: VISIBLE }, (_, i) => members[(index + i) % total]);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px', overflow: 'hidden' }}>
        {visible.map((m, i) => (
          <div key={`${index}-${i}`} style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease both' }}>
            {/* Portrait photo */}
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', background: '#e0e0e0' }}>
              <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{m.name}</h3>
            <p style={{ fontSize: '0.82rem', color: '#555', marginBottom: '4px' }}>{m.role}</p>
            <p style={{ fontSize: '0.82rem', color: '#888', margin: 0 }}>Branch : {m.branch}</p>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button onClick={prev} style={{ position: 'absolute', left: '-20px', top: '35%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'all 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#d4292a'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
      >‹</button>
      <button onClick={next} style={{ position: 'absolute', right: '-20px', top: '35%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'all 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#d4292a'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
      >›</button>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
        {members.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === index ? '#d4292a' : '#ddd', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

// ─── Main PlacementPage ──────────────────────────────────────────────────────
export default function PlacementPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const placementImages = [
    { id: 1, url: 'https://plus.unsplash.com/premium_photo-1733342469184-911ce8a85307?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placement Drive' },
    { id: 2, url: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Corporate Interaction' },
    { id: 3, url: 'https://media.istockphoto.com/id/1323167372/photo/indian-man-using-laptop-computer-mobile-phone-working-freelance-project-online-sitting.jpg?s=2048x2048&w=is&k=20&c=Me8adWylSX26EZHPD2vMS0JmAVPOacFP-mDz5jp8ejc=', alt: 'Student Success' },
    { id: 4, url: 'https://media.istockphoto.com/id/1757344400/photo/smiling-college-student-writing-during-a-class-at-the-university.jpg?s=2048x2048&w=is&k=20&c=uCVULGJ0mmMfnA300elNSsXdq-JwxURacnjys2Z4QqQ=', alt: 'Pre-Placement Talk' },
  ];

  const teamMembers: TeamMember[] = [
    { name: 'Dr. Priya Sharma', role: 'Placement Coordinator', branch: 'CSE', img: 'https://loremflickr.com/400/500/indian,teacher,woman,portrait?random=1' },
    { name: 'Prof. Rajesh Kumar', role: 'Training Head', branch: 'ECE', img: 'https://loremflickr.com/400/500/indian,teacher,man,portrait?random=2' },
    { name: 'Ms. Anjali Singh', role: 'Industry Liaison', branch: 'ME', img: 'https://loremflickr.com/400/500/indian,teacher,woman,portrait?random=3' },
    { name: 'Mr. Vikas Gupta', role: 'Career Counselor', branch: 'Civil', img: 'https://loremflickr.com/400/500/indian,teacher,man,portrait?random=4' },
    { name: 'Dr. Neha Reddy', role: 'Alumni Relations', branch: 'ISE', img: 'https://loremflickr.com/400/500/indian,teacher,woman,portrait?random=5' },
  ];

  const placedStudents = [
    { id: 1, name: 'Rahul Sharma', company: 'Infosys', package: '8 LPA', img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Priya Singh', company: 'TCS', package: '7.5 LPA', img: 'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Amit Kumar', company: 'Wipro', package: '7 LPA', img: 'https://media.istockphoto.com/id/1362063465/photo/female-teen-student-with-a-backpack-and-books-smiling-stock-photo.jpg?s=1024x1024&w=is&k=20&c=icOeeOTjj7yWUd98uFenL30IJbsW74EUgh8LazTdDbA=' },
    { id: 4, name: 'Sneha Patel', company: 'Capgemini', package: '6.8 LPA', img: 'https://plus.unsplash.com/premium_photo-1733342469184-911ce8a85307?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Vikram Rao', company: 'Cognizant', package: '7.2 LPA', img: 'https://loremflickr.com/400/500/indian,student,happy,graduate?random=5' },
    { id: 6, name: 'Deepika Devi', company: 'Accenture', package: '8.5 LPA', img: 'https://loremflickr.com/400/500/indian,student,happy,graduate?random=6' },
  ];

  const galleryImages = [
    { id: 1, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=1', alt: 'Corporate Interview' },
    { id: 2, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=2', alt: 'Placement Drive' },
    { id: 3, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=3', alt: 'Student Workshop' },
    { id: 4, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=4', alt: 'Campus Recruitment' },
    { id: 5, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=5', alt: 'Industry Expert Talk' },
    { id: 6, src: 'https://loremflickr.com/800/600/corporate,meeting,interview,seminar?random=6', alt: 'Job Fair' },
  ];

  const tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'team',      label: 'Team' },
    { id: 'students',  label: 'Placed Students' },
    { id: 'gallery',   label: 'Gallery' },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => setCurrentSlide(p => (p + 1) % placementImages.length), 5000);
    return () => {
      clearInterval(interval);
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    };
  }, []);

  const STICKY_OFFSET = HEADER_HEIGHT + 72; // header (64) + tab bar (72)
  // Lock that prevents scroll-spy from fighting tab clicks
  const isProgrammaticScroll = useRef(false);
  const programmaticTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll-spy: reliable scroll-event approach ─────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      // Do nothing while a tab-click scroll is in progress
      if (isProgrammaticScroll.current) return;

      const scrollY    = window.scrollY;
      const sectionIds = ['overview', 'team', 'students', 'gallery', 'companies'];

      // Walk sections from bottom up; first one whose top is above the sticky bar wins
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = contentRefs.current[id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + STICKY_OFFSET + 32 >= top) {
          current = id;
        }
      }
      setActiveTab(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSlide = (i: number) => setCurrentSlide(i);
  const nextSlide = () => setCurrentSlide(p => (p + 1) % placementImages.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + placementImages.length) % placementImages.length);

  const handleTabClick = (tabId: string) => {
    // 1. Immediately highlight the clicked tab
    setActiveTab(tabId);

    const el = contentRefs.current[tabId];
    if (!el) return;

    // 2. Lock scroll-spy so it can't override us during the smooth scroll
    isProgrammaticScroll.current = true;
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current);

    const targetY = el.getBoundingClientRect().top + window.pageYOffset - STICKY_OFFSET - 16;
    window.scrollTo({ top: targetY, behavior: 'smooth' });

    // 3. Unlock after scroll finishes (~600 ms is enough for smooth scroll)
    programmaticTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  const sectionStyle = { marginBottom: '120px', scrollMarginTop: '160px' };
  const h2Style: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 700, color: '#2c3e50', marginBottom: '64px', textAlign: 'center', paddingBottom: '24px' };

  return (
    <div style={{ width: '100%', fontFamily: "'Inter', -apple-system, sans-serif", background: '#f8f9fa' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .stat-card:hover      { transform:translateY(-12px) scale(1.02) !important; box-shadow:0 16px 48px rgba(0,0,0,0.2) !important; }
        .tab-item:hover       { transform:translateY(-2px) !important; box-shadow:0 6px 20px rgba(0,0,0,0.12) !important; }
        .team-card:hover      { transform:translateY(-12px) !important; box-shadow:0 16px 48px rgba(0,0,0,0.2) !important; }
        .student-card:hover   { transform:translateY(-12px) !important; box-shadow:0 16px 48px rgba(0,0,0,0.2) !important; }
        .company-item:hover   { background:#fff !important; border-color:#d4292a !important; transform:translateY(-8px) !important; box-shadow:0 8px 32px rgba(0,0,0,0.16) !important; }
        .highlight-item:hover { transform:translateX(8px) !important; }
        .slider-btn:hover     { background:rgba(255,255,255,0.3) !important; transform:translateY(-50%) scale(1.1) !important; }
        .gallery-card:hover .gallery-img     { transform: scale(1.06); }
        .gallery-card:hover .gallery-overlay { opacity: 1.3; }
        .company-grid-card:hover { transform: translateY(-5px) !important; box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important; }
        .company-grid-card:hover .company-cat-img { transform: scale(1.1); }

      `}</style>
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />


      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '500px', overflow: 'hidden', background: '#000' }}>
        <div style={{ display: 'flex', height: '100%', transition: 'transform 0.8s cubic-bezier(0.645,0.045,0.355,1)', transform: `translateX(-${currentSlide * 100}%)` }}>
          {placementImages.map(img => (
            <div key={img.id} style={{ position: 'relative', minWidth: '100%', height: '100%' }}>
              <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
              {/* <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(212,41,42,0.4),rgba(44,62,80,0.6))' }} /> */}
            </div>
          ))}
        </div>
        {[{ side: 'left', fn: prevSlide, ch: '‹' }, { side: 'right', fn: nextSlide, ch: '›' }].map(b => (
          <button key={b.side} className="slider-btn" onClick={b.fn} style={{
            position: 'absolute', [b.side]: '32px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', color: '#fff',
            border: '2px solid rgba(255,255,255,0.3)', width: '56px', height: '56px',
            borderRadius: '50%', cursor: 'pointer', zIndex: 20, fontSize: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s'
          }}>{b.ch}</button>
        ))}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '16px', zIndex: 20 }}>
          {placementImages.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{ width: currentSlide===i?'48px':'12px', height: '12px', borderRadius: currentSlide===i?'8px':'50%', background: currentSlide===i?'#fff':'rgba(255,255,255,0.4)', border: '2px solid rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.4s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', color: '#fff', zIndex: 10, width: '90%', opacity: isVisible?1:0, transition: 'opacity 0.8s' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem,8vw,5.5rem)', fontWeight: 900, marginBottom: '1.5rem', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>Placements at Alva&apos;s</h1>
          <p style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 500, textShadow: '0 2px 12px rgba(0,0,0,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Building Careers, Shaping Futures</p>
        </div>
      </section>

      {/* Tabs — sticks just below the header (top = 64px) */}
      <section style={{ position: 'sticky', top: `${HEADER_HEIGHT}px`, zIndex: 900, background: '#f8f9fa', padding: '16px 0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', padding: '16px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { id: 'overview',  label: 'Overview' },
              { id: 'team',      label: 'Team' },
              { id: 'students',  label: 'Placed Students' },
              { id: 'gallery',   label: 'Gallery' },
              { id: 'companies', label: 'Companies Visited' },
            ].map((tab, i) => (
              <button key={tab.id} className="tab-item" onClick={() => handleTabClick(tab.id)} style={{
                background: activeTab===tab.id?'#dedc00':'#fff', color: '#000', border: 'none', borderRadius: '8px',
                padding: '12px 32px', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'Inter, sans-serif',
                fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', minWidth: '140px',
                animation: `fadeInUp 0.6s ease ${i*0.1}s backwards`
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ padding: '80px 24px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Overview */}
        <div ref={el => { contentRefs.current['overview'] = el; }} data-section="overview" style={sectionStyle}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', margin:0, letterSpacing:'-0.5px' }}>Placement Overview</h2>
            <div style={{ height:'4px', width:'60px', background:'#d4292a', margin:'16px auto 0', borderRadius:'2px' }} />
          </div>

          {/* ── Head of Placement: 65% details | 35% photo ── */}
          <div style={{ display:'flex', flexWrap:'wrap', background:'#f4f4f4', borderRadius:'24px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', overflow:'hidden', marginBottom:'40px', maxWidth:'1250px', margin:'0 auto 48px', animation:'fadeInUp 0.7s ease both' }}>
            
            {/* 65% — Details (Left, Large) */}
            <div style={{ flex:'0 0 65%', minWidth:'350px', padding:'56px', display:'flex', flexDirection:'column', justifyContent:'center', background:'#f4f4f4' }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', marginBottom:'8px', lineHeight:1.2 }}>Dr. Radhakrishna</h3>
              <p style={{ fontSize:'1.1rem', fontWeight:600, color:'#555', marginBottom:'32px' }}>Professor & Head, Placement Cell</p>
              
              {/* Contact details */}
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {[
                  { icon:'envelope', text:'rb.placement@alvas.org' },
                  { icon:'envelope', text:'placements@alvas.org' },
                  { icon:'phone',    text:'+91 99864 75517' },
                  { icon:'phone',    text:'+91 824 2277222' },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'16px', fontSize:'1rem', color:'#333', fontWeight:500 }}>
                    <i className={`fas fa-${item.icon}`} style={{ fontSize:'1.1rem', color:'#1a1a2e', width:'24px', textAlign:'center' }}></i>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image (Right) */}
            <div style={{ flex:'1 1 350px', background:'#eee', position:'relative', minHeight:'300px' }}>
              <img 
                src="https://imgs.search.brave.com/dAQKlfwGAEHYtDctmvxLSKqUIP2o0gAwVJLgoz3Jtz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzczLzE0LzU2/LzM2MF9GXzI3MzE0/NTY3Ml92ZkM4N2FV/QVBET0pWcVVxUDA5/Z1k3bTFzRGVUU0RD/RS5qcGc"
                alt="Head of Placement"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }}
              />
            </div>
          </div>

          {/* ── Stats row ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'16px', marginBottom:'32px' }}>
            {[
              { number:'95%',   label:'Placement Rate',    icon:'📈', color:'#d4292a' },
              { number:'150+',  label:'Companies Visited', icon:'🏢', color:'#3498db' },
              { number:'₹8.5L', label:'Average Package',   icon:'💰', color:'#27ae60' },
              { number:'₹45L',  label:'Highest Package',   icon:'🎯', color:'#f39c12' },
            ].map((stat, i) => (
              <div key={i} className="stat-card" style={{ background:'#fff', padding:'20px 16px', borderRadius:'14px', boxShadow:'0 2px 10px rgba(0,0,0,0.07)', textAlign:'center', transition:'all 0.4s', animation:`fadeInUp 0.6s ease ${i*0.1}s backwards` }}>
                <div style={{ fontSize:'1.6rem', marginBottom:'6px' }}>{stat.icon}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:900, margin:'6px 0', lineHeight:1, color:stat.color }}>{stat.number}</h3>
                <p style={{ fontSize:'0.78rem', color:'#7f8c8d', fontWeight:500, margin:0 }}>{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Team */}
        <div ref={el => { contentRefs.current['team'] = el; }} data-section="team" style={sectionStyle}>

          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', margin:0, letterSpacing:'-0.5px' }}>Our Team</h2>
            <div style={{ height:'4px', width:'60px', background:'#d4292a', margin:'16px auto 0', borderRadius:'2px' }} />
          </div>

          {/* ── Auto-scrolling portrait slider ── */}
          <TeamSlider members={[
            { name:'Ms. Sneha Bose',   role:'Asst. Professor',       branch:'IS',              img:'https://images.unsplash.com/photo-1601655781320-205e34c94eb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name:'Ms. Kripa',         role:'Asst. Professor EC',    branch:'EC',              img:'https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name:'Ms. Pavanalaxmi',   role:'Asst. Professor – EC',  branch:'EC',              img:'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name:'Mr. Sunil H V',     role:'Asst. Professor – ME',  branch:'MECH',            img:'https://images.unsplash.com/photo-1574281570877-bd815ebb50a4?q=https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://loremflickr.com/500/667/indian,female,lecturer,portrait' },
            { name:'Mr. Arun Kumar',    role:'Asst. Professor – EE',  branch:'EEE',             img:'https://plus.unsplash.com/premium_photo-1663040495101-f075db581d57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name:'Ms. Divya Rao',     role:'Asst. Professor – CV',  branch:'CIVIL',           img:'https://plus.unsplash.com/premium_photo-1682089789852-e3023ff6df24?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { name:'Ms. Anjali Menon',  role:'Placement Coordinator', branch:'Dept. Placement', img:'https://media.istockphoto.com/id/1448069367/photo/portrait-of-happy-indian-mature-professor-of-university-or-college-or-standing-outdoor.jpg?s=2048x2048&w=is&k=20&c=bseO9hS81C9roCEYiwEmmUrj2udGtkZMgGqe623ARME=' },
            { name:'Mr. Rahul Hegde',   role:'Asst. Professor – ME',  branch:'ME',              img:'https://media.istockphoto.com/id/1180357615/photo/my-digital-partner-always-travels-with-me.jpg?s=2048x2048&w=is&k=20&c=csr4n2phYIDo3DN47Y7Yi-0OAEbTpP1A3QptdlZuHIE=' },
            { name:'Mr. Kiran Shetty',  role:'Asst. Professor – IT',  branch:'IT',              img:'https://media.istockphoto.com/id/1420959436/photo/smiling-indian-business-man-executive-using-digital-tablet-outdoors.jpg?s=2048x2048&w=is&k=20&c=xSuBVIic6s6M8YUppSf4mxD0gUJSCRtoCDucoVjPtQM=' },
          ]} />
        </div>

        {/* Students */}
        <div ref={el => { contentRefs.current['students'] = el; }} data-section="students" style={sectionStyle}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', margin:0, letterSpacing:'-0.5px' }}>Placed Students</h2>
            <div style={{ height:'4px', width:'60px', background:'#d4292a', margin:'16px auto 0', borderRadius:'2px' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'40px' }}>
            {[
              { name:'Rahul Sharma', branch:'Computer Science', company:'Google India', pkg:'₹42 LPA', year:'2024', quote:'The placement cell provided excellent support throughout the process.', img:'https://loremflickr.com/300/300/indian,student,male,smile' },
              { name:'Priya Patel',  branch:'Electronics',      company:'Microsoft',   pkg:'₹38 LPA', year:'2024', quote:'Training sessions helped me ace my interviews.',                      img:'https://loremflickr.com/300/300/indian,student,female,blazer' },
              { name:'Amit Kumar',   branch:'Mechanical',        company:'Bosch',       pkg:'₹12 LPA', year:'2023', quote:'Great exposure to industry standards and real-world challenges.',     img:'https://loremflickr.com/300/300/indian,student,man,formal' },
            ].map((s, i) => (
              <div key={i} className="student-card" style={{ background:'#fff', borderRadius:'24px', boxShadow:'0 4px 16px rgba(0,0,0,0.12)', overflow:'hidden', transition:'all 0.5s', position:'relative', animation:`fadeInUp 0.6s ease ${i*0.08}s backwards` }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'8px', background:'linear-gradient(90deg,#d4292a,#f39c12)' }} />
                <div style={{ position:'relative', padding:'48px 32px 32px', textAlign:'center' }}>
                  <div style={{ width:'120px', height:'120px', margin:'0 auto 16px', borderRadius:'50%', overflow:'hidden', border:'6px solid #fff', boxShadow:'0 44px 16px rgba(0,0,0,0.12)' }}>
                    <img src={s.img} alt={s.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
                  </div>
                  <div style={{ position:'absolute', top:'16px', right:'16px', background:'#d4292a', color:'#fff', padding:'6px 14px', borderRadius:'20px', fontSize:'0.85rem', fontWeight:600 }}>{s.year}</div>
                </div>
                <div style={{ padding:'8px 32px 32px', textAlign:'center' }}>
                  <h3 style={{ fontSize:'1.4rem', color:'#2c3e50', marginBottom:'6px' }}>{s.name}</h3>
                  <p style={{ fontSize:'0.9rem', color:'#7f8c8d', marginBottom:'16px' }}>{s.branch}</p>
                  <div style={{ display:'flex', justifyContent:'center', gap:'12px', marginBottom:'20px', flexWrap:'wrap' }}>
                    <span style={{ background:'linear-gradient(135deg,#d4292a,#ff5252)', color:'#fff', padding:'8px 16px', borderRadius:'10px', fontSize:'0.9rem', fontWeight:600 }}>{s.company}</span>
                    <span style={{ background:'linear-gradient(135deg,#27ae60,#2ecc71)', color:'#fff', padding:'8px 16px', borderRadius:'10px', fontSize:'0.95rem', fontWeight:700 }}>{s.pkg}</span>
                  </div>
                  <blockquote style={{ fontSize:'0.95rem', color:'#7f8c8d', fontStyle:'italic', lineHeight:1.7, paddingTop:'20px', borderTop:'2px solid #f8f9fa', margin:0 }}>
                    &quot;{s.quote}&quot;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div ref={el => { contentRefs.current['gallery'] = el; }} data-section="gallery" style={{ ...sectionStyle, marginBottom: '40px' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', margin:0, letterSpacing:'-0.5px' }}>Placement Gallery</h2>
            <div style={{ height:'4px', width:'60px', background:'#d4292a', margin:'16px auto 0', borderRadius:'2px' }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
            {[
              { company:'Cognizant',             img:'https://loremflickr.com/700/525/corporate,office,meeting' },
              { company:'iWave',                 img:'https://loremflickr.com/700/525/technology,lab,computer' },
              { company:'IMV Corporation',       img:'https://loremflickr.com/700/525/industrial,machine,engineering' },
              { company:'Accenture',             img:'https://loremflickr.com/700/525/business,team,discussion' },
              { company:'Deloitte',              img:'https://loremflickr.com/700/525/consulting,office,modern' },
              { company:'Hashed In By Deloitte', img:'https://loremflickr.com/700/525/software,coding,team' },
              { company:'Infosys',               img:'https://loremflickr.com/700/525/campus,building,corporate' },
              { company:'Toyota Kirloskar',      img:'https://loremflickr.com/700/525/automotive,factory,engineer' },
              { company:'Microsoft',             img:'https://loremflickr.com/700/525/technology,server,cloud' },
              { company:'Google',                img:'https://loremflickr.com/700/525/modern,office,creative' },
              { company:'TCS',                   img:'https://loremflickr.com/700/525/it,services,desk' },
              { company:'Bosch',                 img:'https://picsum.photos/seed/bosch55/700/525' },
            ].map((item, i) => (
              <div
                key={i}
                className="gallery-card"
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  animation: `fadeInUp 0.5s ease ${i * 0.05}s backwards`,
                }}
              >
                <img
                  src={item.img}
                  alt={item.company}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.4s ease' }}
                  className="gallery-img"
                />
                {/* Dark overlay always subtle, stronger on hover */}
                <div className="gallery-overlay" style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.10) 50%, transparent 100%)',
                  transition:'opacity 0.3s',
                }} />
                {/* Company label at bottom-left */}
                <span style={{
                  position:'absolute', bottom:'16px', left:'16px',
                  color:'#fff', fontFamily:'Inter,sans-serif',
                  fontSize:'1rem', fontWeight:700,
                  textShadow:'0 1px 4px rgba(0,0,0,0.5)',
                  letterSpacing:'0.01em',
                }}>{item.company}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Top Recruiters — Light Luxury Theme ───────────────────────────────────── */}
      <div ref={el => { contentRefs.current['companies'] = el; }} data-section="companies" style={{ background: '#ffffff', padding: '100px 0', overflow: 'hidden', position: 'relative' }}>



        {/* ── Header & Stats Data ── */}
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', position:'relative', zIndex:2, marginBottom:'40px' }}>
          
          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:800, color:'#1a1a2e', margin:0, letterSpacing:'-0.5px' }}>Companies Visited</h2>
            <div style={{ height:'4px', width:'60px', background:'#d4292a', margin:'16px auto 0', borderRadius:'2px' }} />
          </div>

          {/* Stats Row */}
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'40px', background:'#f8f9fa', borderRadius:'16px', padding:'32px', boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
            
            {/* 150+ Companies */}
            <div style={{ textAlign:'center', flex:'1 1 200px' }}>
              <div style={{ fontSize:'3rem', fontWeight:800, color:'#d4292a', lineHeight:1 }}>150+</div>
              <div style={{ fontSize:'1rem', fontWeight:600, color:'#555', marginTop:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>Total Companies</div>
            </div>

            {/* 50+ MNCs */}
            <div style={{ textAlign:'center', flex:'1 1 200px' }}>
              <div style={{ fontSize:'3rem', fontWeight:800, color:'#1a1a2e', lineHeight:1 }}>50+</div>
              <div style={{ fontSize:'1rem', fontWeight:600, color:'#555', marginTop:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>MNCs Visited</div>
            </div>

            {/* 40+ Core */}
            <div style={{ textAlign:'center', flex:'1 1 200px' }}>
              <div style={{ fontSize:'3rem', fontWeight:800, color:'#1a1a2e', lineHeight:1 }}>40+</div>
              <div style={{ fontSize:'1rem', fontWeight:600, color:'#555', marginTop:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>Core Industries</div>
            </div>

            {/* 30+ Startups */}
            <div style={{ textAlign:'center', flex:'1 1 200px' }}>
              <div style={{ fontSize:'3rem', fontWeight:800, color:'#1a1a2e', lineHeight:1 }}>30+</div>
              <div style={{ fontSize:'1rem', fontWeight:600, color:'#555', marginTop:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>Startups</div>
            </div>

          </div>
        </div>


        {/* Marquee */}
        <div style={{ position:'relative', overflow:'hidden', zIndex:1 }}>

          {/* Left & right fade masks (White) */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'120px', background:'linear-gradient(to right, #ffffff, transparent)', zIndex:2, pointerEvents:'none' }} />
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'120px', background:'linear-gradient(to left, #ffffff, transparent)', zIndex:2, pointerEvents:'none' }} />

          <style>{`
            @keyframes marquee-luxury {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .luxury-track {
              display: flex;
              align-items: center;
              gap: 100px;
              animation: marquee-luxury 35s linear infinite;
              width: max-content;
              padding: 0 50px;
            }
            .luxury-track:hover { animation-play-state: paused; }
            .luxury-logo {
              display: flex;
              align-items: center;
              gap: 12px;
              flex-shrink: 0;
              opacity: 0.8;
              transition: all 0.35s ease;
              color: #1a1a2e;
            }
            .luxury-logo:hover { opacity: 1; color: #d4292a; transform: scale(1.02); }
            .luxury-sep {
              width: 1px;
              height: 40px;
              background: #e0e0e0;
              flex-shrink: 0;
            }
          `}</style>
          <div className="luxury-track">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} style={{ display:'flex', alignItems:'center', gap:'100px' }}>

                {/* Google */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'2rem', fontWeight:500, letterSpacing:'-0.5px' }}>Google</span>
                </div>
                <div className="luxury-sep" />

                {/* Microsoft */}
                <div className="luxury-logo">
                  <svg viewBox="0 0 21 21" width="28" height="28" style={{flexShrink:0}}>
                    <rect x="0" y="0" width="10" height="10" fill="currentColor"/>
                    <rect x="11" y="0" width="10" height="10" fill="currentColor"/>
                    <rect x="0" y="11" width="10" height="10" fill="currentColor"/>
                    <rect x="11" y="11" width="10" height="10" fill="currentColor"/>
                  </svg>
                  <span style={{ fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:'1.6rem', fontWeight:400, letterSpacing:'0.02em' }}>Microsoft</span>
                </div>
                <div className="luxury-sep" />

                {/* Infosys */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.8rem', fontWeight:700 }}>Infosys</span>
                </div>
                <div className="luxury-sep" />

                {/* TCS */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial Black,sans-serif', fontSize:'2rem', fontWeight:900, letterSpacing:'0.1em' }}>TCS</span>
                </div>
                <div className="luxury-sep" />

                {/* Deloitte */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.8rem', fontWeight:700 }}>Deloitte.</span>
                </div>
                <div className="luxury-sep" />

                {/* Accenture */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.8rem', fontWeight:700 }}>Accenture</span>
                </div>
                <div className="luxury-sep" />

                {/* IBM */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial Black,sans-serif', fontSize:'2rem', fontWeight:900, letterSpacing:'0.05em' }}>IBM</span>
                </div>
                <div className="luxury-sep" />

                {/* SAP Labs */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial Black,sans-serif', fontSize:'1.8rem', fontWeight:900, letterSpacing:'0.05em' }}>SAP</span>
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.2rem', fontWeight:500 }}>Labs</span>
                </div>
                <div className="luxury-sep" />

                {/* Capgemini */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Georgia,serif', fontSize:'1.7rem', fontWeight:500 }}>Capgemini</span>
                </div>
                <div className="luxury-sep" />

                {/* COHESITY */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.6rem', fontWeight:800, letterSpacing:'0.06em' }}>COHESITY</span>
                </div>
                <div className="luxury-sep" />

                {/* BOSCH */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial Black,sans-serif', fontSize:'1.7rem', fontWeight:900, letterSpacing:'0.14em' }}>BOSCH</span>
                </div>
                <div className="luxury-sep" />

                {/* Anglo Eastern */}
                <div className="luxury-logo">
                  <span style={{ fontFamily:'Arial,sans-serif', fontSize:'1.3rem', fontWeight:700, letterSpacing:'0.08em' }}>ANGLO-EASTERN</span>
                </div>

              </div>
            ))}
          </div>
        </div>


            


      </div>


      <Footer />
    </div>
  );
}