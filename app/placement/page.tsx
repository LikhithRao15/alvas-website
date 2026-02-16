import { useState, useEffect, useRef } from 'react';

export default function PlacementPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const contentRefs = useRef({});

  const placementImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200', alt: 'Students in placement drive' },
    { id: 2, url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200', alt: 'Company recruitment' },
    { id: 3, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200', alt: 'Team collaboration' },
    { id: 4, url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200', alt: 'Placement celebration' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'students', label: 'Placed Students', icon: '🎓' },
    { id: 'companies', label: 'Companies', icon: '🏢' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % placementImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % placementImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + placementImages.length) % placementImages.length);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = contentRefs.current[tabId];
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const styles = {
    page: { width: '100%', fontFamily: "'Inter', -apple-system, sans-serif", background: '#f8f9fa' },
    hero: { position: 'relative', width: '100%', height: '50vh', minHeight: '500px', overflow: 'hidden', background: '#000' },
    sliderWrapper: { display: 'flex', height: '100%', transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)', transform: `translateX(-${currentSlide * 100}%)` },
    slide: { position: 'relative', minWidth: '100%', height: '100%' },
    slideImg: { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(212,41,42,0.4), rgba(44,62,80,0.6))' },
    heroContent: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', zIndex: 10, width: '90%', opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s' },
    heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, marginBottom: '1.5rem', textShadow: '0 4px 24px rgba(0,0,0,0.5)' },
    heroSubtitle: { fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, textShadow: '0 2px 12px rgba(0,0,0,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase' },
    sliderBtn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', width: '56px', height: '56px', borderRadius: '50%', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s' },
    indicators: { position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '16px', zIndex: 20 },
    indicator: (active) => ({ width: active ? '48px' : '12px', height: '12px', borderRadius: active ? '8px' : '50%', background: active ? '#fff' : 'rgba(255,255,255,0.4)', border: '2px solid rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.4s' }),
    tabSection: { position: 'sticky', top: 0, zIndex: 1000, background: '#f8f9fa', padding: '32px 0 0' },
    tabCard: { maxWidth: '1400px', margin: '0 auto', padding: '0 24px' },
    tabGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', background: '#fff', padding: '16px', borderRadius: '24px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)', border: '1px solid rgba(212,41,42,0.1)', position: 'relative' },
    tabItem: (active, delay) => ({ position: 'relative', background: active ? '#fff' : '#f8f9fa', border: `2px solid ${active ? '#d4292a' : 'transparent'}`, borderRadius: '16px', padding: '24px 20px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', overflow: 'hidden', animation: `fadeInUp 0.6s ease ${delay}s backwards`, boxShadow: active ? '0 8px 32px rgba(0,0,0,0.16)' : 'none' }),
    tabIcon: { fontSize: '2.5rem', transition: 'transform 0.4s' },
    tabLabel: (active) => ({ fontSize: '1.1rem', fontWeight: 600, color: active ? '#d4292a' : '#2c3e50', textAlign: 'center', transition: 'all 0.3s' }),
    content: { padding: '80px 24px', maxWidth: '1400px', margin: '0 auto' },
    section: { marginBottom: '120px', scrollMarginTop: '140px' },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#2c3e50', marginBottom: '64px', textAlign: 'center', position: 'relative', paddingBottom: '24px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '64px' },
    statCard: (delay, color) => ({ position: 'relative', background: '#fff', padding: '48px 32px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', textAlign: 'center', transition: 'all 0.5s', overflow: 'hidden', border: '2px solid transparent', animation: `fadeInUp 0.6s ease ${delay}s backwards` }),
    statIcon: { fontSize: '3rem', marginBottom: '16px' },
    statNumber: (color) => ({ fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 900, margin: '16px 0', lineHeight: 1, color }),
    statLabel: { fontSize: '1.1rem', color: '#7f8c8d', fontWeight: 500, margin: 0 },
    descCard: { background: '#fff', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden', animation: 'fadeInUp 0.8s ease 0.2s backwards' },
    descHeader: { background: 'linear-gradient(135deg, #d4292a, #a51f20)', padding: '32px 48px', color: '#fff' },
    descContent: { padding: '48px', fontSize: '1.15rem', lineHeight: 1.8, color: '#2c3e50' },
    highlightsSection: { padding: '48px', background: '#f8f9fa', borderTop: '1px solid #e0e0e0' },
    highlightsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' },
    highlightItem: (delay) => ({ display: 'flex', gap: '20px', padding: '24px', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s', animation: `fadeInUp 0.6s ease ${delay}s backwards` }),
    teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '80px' },
    teamCard: (delay) => ({ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden', transition: 'all 0.5s', animation: `fadeInUp 0.6s ease ${delay}s backwards`, padding: '48px 32px', textAlign: 'center' }),
    avatar: { width: '180px', height: '180px', margin: '0 auto 32px', borderRadius: '50%', overflow: 'hidden', border: '6px solid #fff', boxShadow: '0 8px 32px rgba(0,0,0,0.16)' },
    studentsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' },
    studentCard: (delay) => ({ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden', transition: 'all 0.5s', animation: `fadeInUp 0.6s ease ${delay}s backwards`, position: 'relative' }),
    studentHeader: { position: 'relative', padding: '48px 32px 32px', background: 'linear-gradient(135deg, #f8f9fa, #fff)', textAlign: 'center' },
    studentBadge: { position: 'absolute', top: '16px', right: '16px', background: '#d4292a', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 },
    companyTag: { background: 'linear-gradient(135deg, #d4292a, #ff5252)', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    packageTag: { background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    companyCategory: (delay) => ({ background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', marginBottom: '40px', animation: `fadeInUp 0.6s ease ${delay}s backwards` }),
    categoryHeader: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', paddingBottom: '24px', borderBottom: '3px solid #f8f9fa' },
    companiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '24px' },
    companyItem: (delay) => ({ background: '#f8f9fa', padding: '28px 20px', borderRadius: '16px', textAlign: 'center', transition: 'all 0.4s', border: '2px solid transparent', cursor: 'pointer', animation: `fadeInUp 0.4s ease ${delay}s backwards` }),
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        .tab-item:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .tab-item:hover .tab-icon { transform: scale(1.2) rotate(5deg); }
        .team-card:hover { transform: translateY(-12px); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        .student-card:hover { transform: translateY(-12px); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        .company-item:hover { background: #fff; border-color: #d4292a; transform: translateY(-8px); box-shadow: 0 8px 32px rgba(0,0,0,0.16); }
        .highlight-item:hover { transform: translateX(8px); box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .slider-btn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.5); transform: translateY(-50%) scale(1.1); }
      `}</style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.sliderWrapper}>
          {placementImages.map((img) => (
            <div key={img.id} style={styles.slide}>
              <img src={img.url} alt={img.alt} style={styles.slideImg} />
              <div style={styles.overlay}></div>
            </div>
          ))}
        </div>
        <button style={{...styles.sliderBtn, left: '32px'}} onClick={prevSlide}>‹</button>
        <button style={{...styles.sliderBtn, right: '32px'}} onClick={nextSlide}>›</button>
        <div style={styles.indicators}>
          {placementImages.map((_, i) => (
            <button key={i} style={styles.indicator(currentSlide === i)} onClick={() => goToSlide(i)} />
          ))}
        </div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Placements at Alva's</h1>
          <p style={styles.heroSubtitle}>Building Careers, Shaping Futures</p>
        </div>
      </section>

      {/* Tab Cards */}
      <section style={styles.tabSection}>
        <div style={styles.tabCard}>
          <div style={styles.tabGrid}>
            {tabs.map((tab, i) => (
              <button key={tab.id} className="tab-item" style={styles.tabItem(activeTab === tab.id, i * 0.1)} onClick={() => handleTabClick(tab.id)}>
                <div className="tab-icon" style={styles.tabIcon}>{tab.icon}</div>
                <div style={styles.tabLabel(activeTab === tab.id)}>{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={styles.content}>
        {/* Overview */}
        <div ref={(el) => (contentRefs.current['overview'] = el)} style={styles.section}>
          <h2 style={styles.sectionTitle}>Placement Overview</h2>
          <div style={styles.statsGrid}>
            {[
              { number: '95%', label: 'Placement Rate', icon: '📈', color: '#d4292a' },
              { number: '150+', label: 'Companies Visited', icon: '🏢', color: '#3498db' },
              { number: '₹8.5L', label: 'Average Package', icon: '💰', color: '#27ae60' },
              { number: '₹45L', label: 'Highest Package', icon: '🎯', color: '#f39c12' }
            ].map((stat, i) => (
              <div key={i} className="stat-card" style={styles.statCard(i * 0.1, stat.color)}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <h3 style={styles.statNumber(stat.color)}>{stat.number}</h3>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
          <div style={styles.descCard}>
            <div style={styles.descHeader}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', margin: 0 }}>About Our Placement Cell</h3>
            </div>
            <div style={styles.descContent}>
              <p>The Placement Cell at Alva's Institute of Engineering & Technology is dedicated to bridging the gap between academia and industry.</p>
            </div>
            <div style={styles.highlightsSection}>
              <h4 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '32px' }}>Key Highlights</h4>
              <div style={styles.highlightsGrid}>
                {[
                  { icon: '🎯', title: 'Industry-Aligned', desc: 'Curriculum with practical exposure' },
                  { icon: '💡', title: 'Regular Workshops', desc: 'Training sessions' },
                  { icon: '🎤', title: 'Mock Interviews', desc: 'Test preparations' },
                  { icon: '🤝', title: 'Internships', desc: 'Leading companies' }
                ].map((h, i) => (
                  <div key={i} className="highlight-item" style={styles.highlightItem(i * 0.05)}>
                    <span style={{ fontSize: '2.5rem' }}>{h.icon}</span>
                    <div>
                      <h5 style={{ fontSize: '1.2rem', color: '#d4292a', marginBottom: '8px' }}>{h.title}</h5>
                      <p style={{ fontSize: '1rem', color: '#7f8c8d', margin: 0 }}>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div ref={(el) => (contentRefs.current['team'] = el)} style={styles.section}>
          <h2 style={styles.sectionTitle}>Placement Team</h2>
          <div style={styles.teamGrid}>
            {[
              { name: 'Dr. John Doe', role: 'Placement Officer', email: 'placement@alvas.org' },
              { name: 'Prof. Jane Smith', role: 'Training Head', email: 'training@alvas.org' },
              { name: 'Mr. Robert Johnson', role: 'Industry Relations', email: 'industry@alvas.org' },
              { name: 'Ms. Emily Davis', role: 'Student Coordinator', email: 'coordinator@alvas.org' }
            ].map((m, i) => (
              <div key={i} className="team-card" style={styles.teamCard(i * 0.1)}>
                <div style={styles.avatar}>
                  <img src={`https://ui-avatars.com/api/?name=${m.name}&background=d4292a&color=fff&size=200`} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#2c3e50', marginBottom: '12px' }}>{m.name}</h3>
                <p style={{ fontSize: '1.1rem', color: '#d4292a', fontWeight: 600, marginBottom: '24px' }}>{m.role}</p>
                <a href={`mailto:${m.email}`} style={{ fontSize: '0.95rem', color: '#7f8c8d', textDecoration: 'none' }}>{m.email}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Students */}
        <div ref={(el) => (contentRefs.current['students'] = el)} style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Success Stories</h2>
          <div style={styles.studentsGrid}>
            {[
              { name: 'Rahul Sharma', branch: 'Computer Science', company: 'Google India', pkg: '₹42 LPA', year: '2024' },
              { name: 'Priya Patel', branch: 'Electronics', company: 'Microsoft', pkg: '₹38 LPA', year: '2024' },
              { name: 'Amit Kumar', branch: 'Mechanical', company: 'Bosch', pkg: '₹12 LPA', year: '2023' }
            ].map((s, i) => (
              <div key={i} className="student-card" style={styles.studentCard(i * 0.08)}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: 'linear-gradient(90deg, #d4292a, #f39c12)' }}></div>
                <div style={styles.studentHeader}>
                  <div style={{ ...styles.avatar, width: '140px', height: '140px', border: '6px solid #fff' }}>
                    <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random&size=150`} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={styles.studentBadge}>{s.year}</div>
                </div>
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#2c3e50', marginBottom: '8px' }}>{s.name}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#7f8c8d', marginBottom: '20px' }}>{s.branch}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={styles.companyTag}>{s.company}</div>
                    <div style={styles.packageTag}>{s.pkg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div ref={(el) => (contentRefs.current['companies'] = el)} style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Recruitment Partners</h2>
          {[
            { category: 'IT & Software', icon: '💻', companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Wipro', 'Cognizant'] },
            { category: 'Core Engineering', icon: '⚙️', companies: ['Bosch', 'L&T', 'Siemens', 'Schneider', 'ABB', 'Volvo', 'Tata Motors', 'Mahindra'] }
          ].map((cat, i) => (
            <div key={i} style={styles.companyCategory(i * 0.1)}>
              <div style={styles.categoryHeader}>
                <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
                <h3 style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#2c3e50', margin: 0 }}>{cat.category}</h3>
                <span style={{ background: '#d4292a', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{cat.companies.length} Companies</span>
              </div>
              <div style={styles.companiesGrid}>
                {cat.companies.map((c, j) => (
                  <div key={j} className="company-item" style={styles.companyItem((i * 0.1) + (j * 0.03))}>
                    <div style={{ width: '60px', height: '60px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #d4292a, #f39c12)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                      {c.charAt(0)}
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#2c3e50' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}