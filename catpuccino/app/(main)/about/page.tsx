// /about/page.js (or .tsx)

import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/* ================= HERO TITLE ================= */}
      <section className="bg-[#FBF3DE] px-[140px] pt-16 pb-8 text-center">
        <h1 className="text-5xl font-poppins font-black text-[#262626]">
          About Catpuccino
        </h1>
      </section>


      {/* ================= INTRO SECTION ================= */}
      <section className="bg-[#FBF3DE] px-[140px] py-12">
        <div className="flex gap-16 items-start">

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-[#262626]">
              Header
            </h2>

            <p className="text-[#262626] leading-relaxed">
              I have been struggling to lock in these past few days...
            </p>
          </div>

          <div className="w-[350px] h-[300px] bg-gray-300 rounded-xl"></div>

        </div>
      </section>


      {/* ================= WHAT’S OUR DEAL ================= */}
      <section className="bg-[#FEF6EA] px-[140px] py-20 text-center">

        <h2 className="text-4xl font-bold text-[#262626] mb-16">
          What’s our deal
        </h2>

        <div className="grid grid-cols-2 gap-16">

          <div className="flex flex-col items-center text-center">
            <div className="w-full h-[220px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-2">Meow</h3>
            <p className="text-[#262626]">Body</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-full h-[220px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-2">Maw</h3>
            <p className="text-[#262626]">Body</p>
          </div>

        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="bg-[#FBF3DE] px-[140px] py-20 text-center">

        <h2 className="text-4xl font-bold text-[#262626] mb-16">
          Stats
        </h2>

        <div className="grid grid-cols-2 gap-16">

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold">6767 users</h3>
            <p className="text-[#262626]">Body</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold">6767 reviews</h3>
            <p className="text-[#262626]">Body</p>
          </div>

        </div>
      </section>


      {/* ================= EXPANSION ================= */}
      <section className="bg-[#FEF6EA] px-[140px] py-20 text-center">

        <div className="w-[300px] h-[120px] bg-gray-300 rounded-xl mx-auto mb-10"></div>

        <h2 className="text-4xl font-poppins font-black text-[#262626]">
          And we’re still expanding!
        </h2>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-[#855225] text-[#262626] text-center py-4 text-sm">
        Catpuccino 2026 | All rights reserved ©
      </footer>

    </div>
  );
};

export default AboutPage;
