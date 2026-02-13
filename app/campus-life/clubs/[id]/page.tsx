"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ALL_CLUBS } from "../data";
import "../../../components/ClubsAndActivities.css";

const ClubDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const club = ALL_CLUBS.find((c) => c.id === id);

  if (!club) {
    return (
      <div className="clubs-container-root flex items-center justify-center h-screen text-center bg-[#FFF8E7]">
        <div>
          <h1 className="text-4xl font-bold text-[#8B2635] mb-4">
            Club Not Found
          </h1>
          <button
            className="back-home-btn"
            onClick={() => router.push("/campus-life/clubs")}
          >
            ← Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="clubs-container-root min-h-screen bg-[#FFF8E7] pb-20">
      {/* Hero Section - Full Width */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000aa] via-transparent to-transparent flex flex-col justify-end p-8 md:p-20">
          <button
            className="back-home-btn self-start mb-8 bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-[#8B2635]"
            onClick={() => router.push("/campus-life/clubs")}
          >
            ← Back to Clubs
          </button>

          <h1 className="font-['Libre_Baskerville'] text-5xl md:text-8xl text-white font-bold mb-4 tracking-tighter drop-shadow-2xl">
            {club.name}
          </h1>

          <div className="flex items-center gap-6 mt-4">
            <span className="bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
              {club.category}
            </span>
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <span className="text-2xl font-bold">{club.students}+</span>
              <span className="text-xs uppercase tracking-widest leading-none">
                Global
                <br />
                Members
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width with Padding */}
      <main className="w-full px-6 md:px-20 -mt-10 relative z-10">
        <div className="bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-white/20">
          {/* Subtle Top Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-[#D4AF37] via-[#8B2635] to-[#9CAF88]" />

          <div className="p-10 md:p-20">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left Column - Core Info */}
              <div className="lg:col-span-8 space-y-16">
                {/* About Section */}
                <section>
                  <h2 className="font-['Libre_Baskerville'] text-3xl text-[#8B2635] font-bold mb-6 flex items-center gap-4">
                    About the Club
                    <div className="flex-1 h-[2px] bg-[#D4AF37]/20" />
                  </h2>
                  <p className="text-[#343434] text-xl leading-relaxed font-light">
                    {club.description}
                  </p>
                </section>

                {/* Detailed Notes - Three Paragraphs */}
                <div className="space-y-12">
                  {club.paragraphs?.map((para, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#8B2635] rounded-3xl blur opacity-5 group-hover:opacity-10 transition duration-500" />
                      <div className="relative bg-[#FFF8E7]/40 rounded-3xl p-10 border border-[#D4AF37]/5 h-full">
                        <p className="text-[#343434] text-lg leading-relaxed font-light first-letter:text-4xl first-letter:font-bold first-letter:text-[#8B2635] first-letter:mr-1 first-letter:float-left">
                          {para}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Secondary Info */}
              <div className="lg:col-span-4 space-y-12">
                {/* Key Activities */}
                <section className="bg-slate-50 rounded-3xl p-10 h-fit sticky top-10">
                  <h3 className="font-bold text-[#8B2635] text-2xl mb-8 flex items-center justify-between">
                    Core Activities
                    <span className="text-sm bg-white/60 px-3 py-1 rounded-md text-[#D4AF37] border border-[#D4AF37]/20">
                      Ongoing
                    </span>
                  </h3>
                  <ul className="space-y-6">
                    {club.activities?.map((activity, index) => (
                      <li key={index} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center shrink-0 text-[#D4AF37] font-bold text-xs mt-1">
                          {index + 1}
                        </div>
                        <p className="text-[#444444] text-lg font-medium leading-tight pt-1">
                          {activity}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 pt-10 border-t border-slate-200">
                    <div className="flex items-center gap-4 group cursor-help">
                      <div className="w-12 h-12 rounded-2xl bg-[#8B2635] text-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                        💡
                      </div>
                      <div>
                        <div className="text-[#8B2635] font-bold">
                          Did you know?
                        </div>
                        <div className="text-[#666666] text-sm italic">
                          "{club.motive}"
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .clubs-container-root {
          font-family: "Lato", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ClubDetailPage;
