// /about/page.js (or .tsx)

import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HERO TITLE  */}
      <section className="bg-[#FBF3DE] px-[140px] pt-16 pb-8 text-center">
        <h1 className="text-5xl font-poppins font-black text-[#743d0d]">
          🐾About Catpuccino🐾
        </h1>
      </section>


      {/*  INTRO SECTION  */}
      <section className="bg-[#FBF3DE] px-[140px] py-12">
        <div className="flex gap-16 items-start">

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-[#743d0d]">
              Caffeine and Cats: A Purrfect Blend
            </h2>

            <p className="text-[#262626] leading-relaxed">
              Catpuccino is a cozy corner of the internet made for two of life’s greatest joys: coffee and cats. We help cat lovers discover the best cat cafés around the world 
              — whether you're looking for the fluffiest residents, the strongest espresso, or the most aesthetic latte art. From hidden neighborhood gems to well-known feline hangouts, 
              we gather real reviews from real visitors who believe that everything is better with a cat nearby.
            </p>
          </div>

          <div className="w-[350px] h-[300px] bg-gray-300 rounded-xl"></div>

        </div>
      </section>


      {/*  WHAT’S OUR DEAL  */}
      <section className="bg-[#FEF6EA] px-[140px] py-20 text-center">

        <h2 className="text-4xl font-bold text-[#743d0d] mb-16">
          What’s our deal
        </h2>

        <div className="grid grid-cols-2 gap-16">

          <div className="flex flex-col items-center text-center">
            <div className="w-full h-[220px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-2 text-[#262626]">Meow</h3>
            <p className="text-[#262626]">🐾 Help you find cat cafés near you ⭐ Share honest, community-driven reviews 📸 Show real photos of café vibes and resident cats 💬 Let cat lovers connect over shared experiences</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-full h-[220px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-2 text-[#262626]">Maw</h3>
            <p className="text-[#262626]">It all began with a simple problem: we wanted to find the best cat cafés — but reviews were scattered, outdated, or focused more on coffee than cats.</p>
          </div>

        </div>
      </section>


      {/*  STATS  */}
      <section className="bg-[#FBF3DE] px-[140px] py-20 text-center">

        <h2 className="text-4xl font-bold text-[#262626] mb-16">
          Statistics
        </h2>

        <div className="grid grid-cols-2 gap-16">

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold text-[#743d0d]">6,767 users</h3>
            <p className="text-[#262626]">A growing community of cat lovers sharing their experiences.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold text-[#743d0d]">6,767 reviews</h3>
            <p className="text-[#262626]">Honest feedback on cafés, cats, coffee, and comfort.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold text-[#743d0d]">6,767 Cafe's Listed</h3>
            <p className="text-[#262626]">From small local spots to international favorites.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-[120px] bg-gray-300 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold text-[#743d0d]">5⭐ Average Rating</h3>
            <p className="text-[#262626]">Because great coffee and purring companions never disappoint.</p>
          </div>

        </div>
      </section>


      {/*  EXPANSION  */}
      <section className="bg-[#FEF6EA] px-[140px] py-20 text-center">

        <div className="w-[300px] h-[120px] bg-gray-300 rounded-xl mx-auto mb-10"></div>

        <h2 className="text-4xl font-poppins font-black text-[#703603]">
          And we’re still expanding!
        </h2>

      </section>
    </div>
  );
};

export default AboutPage;
