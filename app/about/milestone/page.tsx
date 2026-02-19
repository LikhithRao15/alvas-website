"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaAward, FaBuilding, FaLeaf, FaMedal, FaUniversity, FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { 
    year: '1995', 
    title: 'The Genesis', 
    desc: 'Dr. M. Mohan Alva established Alva’s Education Foundation with a vision to "Mould a better tomorrow," starting with institutions affiliated to Rajiv Gandhi University of Health Sciences.', 
    details: `The foundation of Alva’s Education Foundation was laid in 1995 by Dr. M. Mohan Alva, a visionary leader and educationist. Driven by the philosophy of "Moulding a better tomorrow," the journey began with the establishment of institutions dedicated to health sciences. This pivotal moment marked the beginning of a transformative era for Moodbidri, turning it into a center of academic excellence. The initial focus was on providing quality education in Indian systems of medicine, which later expanded into a comprehensive educational ecosystem.
    
    The campus in Moodbidri quickly became a landmark, attracting students from across the state and eventually the nation. Dr. Alva's unique approach combined academic rigor with a deep respect for cultural heritage, ensuring that students received a holistic education. Early challenges were met with resilience, and the foundation's growth over the next few years was nothing short of phenomenal, setting the stage for the diverse array of institutions that would follow.`,
    icon: <FaBuilding />,
    color: '#b77700', // Mustard
    image: '/DJI_0135.jpg'
  },
  { 
    year: '1996', 
    title: 'Ayurvedic Excellence', 
    desc: 'Establishment of Alva’s Ayurveda Medical College, marking the beginning of a legacy in Indian medicine education, now a silver jubilee institution.', 
    details: `In 1996, Alva’s Ayurveda Medical College was established, cementing the foundation’s commitment to traditional Indian medicine. Over the years, it has grown into one of the premier institutions for Ayurveda in the country. With state-of-the-art facilities, a rich herbal garden, and a dedicated teaching hospital, the college has produced thousands of successful practitioners. Celebrating its Silver Jubilee, it stands as a testament to the enduring relevance and scientific validity of Ayurveda in the modern world.
    
    The college boasts an extensive library of ancient manuscripts and modern research papers, fostering a scholarly environment. Students here engage in practical training at the attached hospital, gaining hands-on experience in treating patients using traditional methods. The faculty comprises renowned experts in the field, who mentor students not just in medical science but also in the ethical and compassionate aspects of healthcare. This holistic training ensures that graduates are well-prepared to serve society with dedication and skill.`,
    icon: <FaLeaf />,
    color: '#475569', // Slate
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2005', 
    title: 'State Recognition', 
    desc: 'Dr. M. Mohan Alva honored with the prestigious "Rajyotsava Prashasti" by the Government of Karnataka for his immense contributions to education and culture.', 
    details: `The year 2005 brought significant state-level recognition when Dr. M. Mohan Alva was conferred with the "Rajyotsava Prashasti," the second-highest civilian honor in Karnataka. This award acknowledged his tireless efforts in promoting education, nurturing cultural heritage through events like Alva’s Virasat and Nudisiri, and his philanthropic contributions to sports and arts. It underscored the impact of the foundation not just as an educational hub, but as a cultural powerhouse.
    
    The award ceremony was a moment of pride for the entire Alva's family, including staff, students, and the local community. It validated the unique educational model championed by Dr. Alva, where cultural and extracurricular activities are given equal importance alongside academics. This recognition spurred further growth and innovation, inspiring the foundation to take on even more ambitious projects in the years to come, solidifying its reputation as a beacon of excellence in the state.`,
    icon: <FaAward />,
    color: '#b77700',
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2014', 
    title: 'Research Hub', 
    desc: 'Establishment of Ph.D. centers in Ayurveda, expanding academic horizons into advanced research and doctoral programs.', 
    details: `Elevating academic standards further, 2014 saw the establishment of Ph.D. centers within the Ayurveda Medical College. This move bridged the gap between traditional knowledge and modern research methodology. Scholars from across the country now pursue advanced doctoral research here, contributing to the global body of knowledge in Ayurveda. The center focuses on clinical trials, pharmacological studies, and literary research, fostering a spirit of inquiry and innovation.
    
    The research center is equipped with advanced laboratories and collaborates with other scientific institutions to conduct interdisciplinary studies. Regular seminars and conferences are organized to disseminate research findings and encourage intellectual exchange. This focus on research has not only enhanced the academic prestige of the institution but has also led to significant contributions in the field of Ayurvedic medicine, validating ancient practices with modern scientific evidence.`,
    icon: <FaUniversity />,
    color: '#475569',
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2019', 
    title: 'NCC Excellence', 
    desc: 'Awarded "Best Institution State Level Award" in NCC Senior Division Category, recognizing discipline and dedication to national service.', 
    details: `Discipline and national service have always been core values at Alva’s. In 2019, this commitment was recognized with the "Best Institution State Level Award" for the NCC Senior Division. The award highlighted the exceptional performance of cadets in training, social service, and national camps. Alva’s Education Foundation provides extensive support to NCC activities, encouraging students to develop leadership qualities, character, and a spirit of service to the nation.
    
    The campus provides top-notch training facilities for NCC cadets, including firing ranges and obstacle courses. Regular camps are held where cadets undergo rigorous physical training and learn about team building and leadership. Many cadets from the institution have gone on to join the armed forces, serving the country with distinction. This award serves as a motivation for current and future students to embrace the values of discipline, patriotism, and selfless service.`,
    icon: <FaMedal />,
    color: '#b77700',
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2021', 
    title: 'Silver Jubilee', 
    desc: 'Celebrated 25 years of excellence in education, sports, and culture, having grown into an educational hub with over 20 institutions.', 
    details: `2021 marked a historic milestone: the Silver Jubilee of Alva’s Education Foundation. From a single institution in 1995, it had blossomed into a colossal educational hub comprising over 20 institutions with more than 20,000 students. The jubilee celebrations reflected on a quarter-century of achievements in diverse fields—from medicine and engineering to arts, commerce, and special education. It was a moment to honor the past and envision an even brighter future.
    
    The celebrations were a grand affair, attended by dignitaries, alumni, and well-wishers from all walks of life. A series of events were organized throughout the year to commemorate the occasion, showcasing the diverse talents of the students. A special souvenir was released, documenting the journey of the foundation and its impact on society. The Silver Jubilee was not just a celebration of past achievements but a reaffirmation of the foundation's commitment to its vision of "Moulding a better tomorrow" for generations to come.`,
    icon: <FaAward />,
    color: '#475569',
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2024', 
    title: 'Sporting Dominance', 
    desc: 'Alva’s students secured 93 university medals (41 Gold) and represented India on the global stage, solidifying its status as a sports powerhouse.', 
    details: `Alva’s dominance in sports reached new heights in 2024. With a record-breaking haul of 93 university medals, including 41 Golds, the institution reaffirmed its status as the top sporting college in the university. Beyond improved infrastructure and coaching, the foundation’s unique "Adoption Scheme" for meritorious sports students has been a game-changer, enabling athletes from humble backgrounds to compete and win at national and international levels, including representation in Asian and World University Games.
    
    The campus boasts world-class sports facilities, including synthetic tracks, swimming pools, and indoor stadiums. Expert coaches identify and nurture talent from a young age, providing them with personalized training programs and nutritional support. The success of Alva's athletes on the national and international stage has brought glory not just to the institution but to the entire nation. The foundation continues to invest heavily in sports, believing in its power to build character and unite people.`,
    icon: <FaMedal />,
    color: '#b77700',
    image: '/DJI_0135.jpg'
  },
  { 
    year: '2025', 
    title: 'Academic Pinnacle', 
    desc: 'A record 75 students placed within the top 10,000 ranks in the All India NEET (UG) Examination, showcasing academic rigor and success.', 
    details: `In 2025, Alva’s set a new benchmark in academic excellence with stellar results in the NEET (UG) Examination. An unprecedented 75 students secured ranks within the top 10,000 all-India, a testament to the rigorous coaching, dedicated faculty, and disciplined academic environment. This achievement highlights the foundation’s capability to compete with the best specialist coaching centers in the country, ensuring that rural students have access to top-tier medical education opportunities.
    
    The institution's approach to competitive exam preparation involves comprehensive study material, regular mock tests, and personalized doubt-clearing sessions. The faculty consists of experienced educators who are dedicated to helping students achieve their dreams. The success in NEET is just one example of the academic prowess of Alva's students, who consistently perform well in various other competitive examinations. This focus on academic excellence ensures that students are well-equipped to pursue successful careers in their chosen fields.`,
    icon: <FaGraduationCap />,
    color: '#475569',
    image: '/DJI_0135.jpg'
  },
];

export default function MilestonePage() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeMilestone, setActiveMilestone] = React.useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setActiveMilestone(prev => prev === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Main Title
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Timeline Line Animation
      gsap.fromTo(lineRef.current, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );

      // Cards Animation
      cardsRef.current.forEach((card, i) => {
        const direction = i % 2 === 0 ? -50 : 50; // Left or Right slide
        
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            x: direction,
            y: 20
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Start animation when card is near bottom of viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e7e5e4] text-slate-800 font-sans overflow-x-hidden selection:bg-[#b77700] selection:text-white">
      

      <Header onMenuToggle={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <header className="relative pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="hero-text inline-block mb-4 px-4 py-1 rounded-full bg-[#b77700]/10 text-[#b77700] font-semibold text-sm tracking-widest uppercase">
            Our Journey
          </div>
          <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
            Moulding a <span className="text-[#b77700]">Better Tomorrow</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From a humble beginning in 1995 to an educational hub of excellence. Explore the defining moments of our history.
          </p>
        </div>
      </header>
      
      {/* Timeline Section */}
      <section className="relative px-4 pb-40 max-w-7xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 transform md:-translate-x-1/2">
          <div ref={lineRef} className="w-full bg-[#b77700] origin-top"></div>
        </div>

        <div className="space-y-12 md:space-y-24">
          {milestones.map((m, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Year/Date Marker - Desktop Center */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#fafaf9] border-4 border-[#e7e5e4] items-center justify-center z-10 shadow-lg group mt-8">
                <div className="w-3 h-3 rounded-full bg-[#b77700]" style={{ backgroundColor: m.color }}></div>
                <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 bg-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-slate-500">
                  {m.year}
                </div>
              </div>

              {/* Mobile Year Marker */}
              <div className="flex md:hidden absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full bg-[#fafaf9] border-2 border-[#b77700] items-center justify-center z-10 mt-8">
                <div className="w-2 h-2 rounded-full bg-[#b77700]"></div>
              </div>

              {/* Spacer OR Details Box */}
              <div className="flex-1 w-full hidden md:block">
                {activeMilestone === i && (
                  <div className="opacity-0 animate-fadeIn bg-[#e7e5e4] border border-slate-300 rounded-xl relative mt-4 shadow-inner h-[500px] flex flex-col overflow-hidden">
                    <div className={`absolute top-10 w-4 h-4 bg-[#e7e5e4] border-l border-t border-slate-300 transform rotate-45 ${i % 2 === 0 ? '-right-2' : '-left-2'} z-10`}></div>
                    
                    {/* Image Area */}
                    <div className="h-48 w-full relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2e2e2d] to-transparent"></div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="p-6 pt-2 overflow-y-auto w-full custom-scrollbar flex-1">

                        <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                        {m.details}
                        </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div ref={addToRefs} className="flex-1 w-full pl-12 md:pl-0 z-10">
                <div className={`bg-[#fafaf9] rounded-2xl p-8 border border-slate-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group ${activeMilestone === i ? 'ring-2 ring-[#b77700] ring-offset-2 ring-offset-[#e7e5e4]' : 'hover:-translate-y-1'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-4xl"
                      style={{ color: m.color }}
                    >
                      {m.icon}
                    </span>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100 font-mono">
                      {m.year}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-[#b77700] transition-colors">
                    {m.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {m.desc}
                  </p>

                  <button 
                    onClick={() => toggleDetails(i)}
                    className="inline-flex items-center text-sm font-bold text-[#b77700] hover:text-[#8f5d00] transition-colors group/btn"
                  >
                    {activeMilestone === i ? 'Close Details' : 'Know More'}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${activeMilestone === i ? 'rotate-180' : 'group-hover/btn:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
                
                {/* Mobile Details View (Visible only on mobile) */}
                {activeMilestone === i && (
                  <div className="md:hidden mt-4 bg-[#e7e5e4]/50 border border-slate-300/50 rounded-xl overflow-hidden shadow-inner max-h-[500px] flex flex-col">
                     {/* Image Area */}
                     <div className="h-40 w-full relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f7]/50 to-transparent"></div>
                     </div>
                     
                     <div className="p-4 pt-2 overflow-y-auto">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 sticky top-0 bg-[#e7e5e4]/20 backdrop-blur-sm py-1">Detailed Insight</h4>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{m.details}</p>
                     </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
}