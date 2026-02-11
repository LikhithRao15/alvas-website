'use client'

import { FaArrowRight } from 'react-icons/fa'

export default function CampusDiaries() {
  const feedItems = [
    { id: 1, image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 2, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, image: 'https://randomuser.me/api/portraits/men/54.jpg' },
    { id: 4, image: 'https://randomuser.me/api/portraits/women/21.jpg' }
  ]

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="testimonials">
      {/* Decorative Background Shapes */}
      <div className="absolute -left-20 top-1/3 w-[380px] h-[380px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute right-0 bottom-0 w-[260px] h-[260px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 border-2 border-blue-600 rounded-tr-[40px] rounded-bl-[40px] mb-6">
            <h3 className="font-serif text-2xl md:text-3xl font-black text-slate-900">
              Campus Diaries
            </h3>
          </div>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base font-medium">
            Get an instant feed of the latest events, key moments, student
            successes and exciting campus activities.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left : Mobile Feed Illustration */}
          <div className="relative flex justify-center">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-[280px]">
              {/* Fake Phone Notch */}
              <div className="w-20 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

              {/* Feed Items */}
              <div className="space-y-4">
                {feedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt="Student profile"
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -z-10 w-[360px] h-[360px] bg-blue-200/50 rounded-full"></div>
          </div>

          {/* Right : Text + CTA */}
          <div>
            <h4 className="font-serif text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Stories that define
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                {' '}Campus Life
              </span>
            </h4>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
              From student achievements to cultural celebrations and innovation
              milestones — explore the moments that make Alva&apos;s a vibrant
              academic ecosystem.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              READ MORE
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}