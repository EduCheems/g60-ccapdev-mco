import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HERO TITLE  */}
      <section className="bg-[#FBF3DE] px-[140px] pt-16 pb-8 text-center border border-black">
        <h1 className="text-5xl font-poppins font-black text-[#262626]">
          🐾Contact Us🐾
        </h1>
        <p className="mt-4 text-[#262626] max-w-[600px] mx-auto">
          Have questions, suggestions, or partnership ideas? 
          We'd love to hear from you!
        </p>
      </section>


      {/*  CONTACT SECTION  */}
      <section className="bg-[#FBF3DE] px-[140px] py-20 flex gap-16 border border-black">

        {/*  Contact Form  */}
        <div className="flex-1 bg-[#F8F2E2] p-10 rounded-[24px] border-2 border-[#7C4F2B] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.08),6px_6px_0_0_rgba(124,79,43,0.25)]">

          <h2 className="text-3xl font-bold text-[#262626] mb-8">
            Send us a message
          </h2>

          <form className="flex flex-col gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="border-2 border-[#7C4F2B] rounded-2xl px-4 py-3 bg-[#F8F2E2] text-[#262626] placeholder:text-[#A09489] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#7C4F2B]/50"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border-2 border-[#7C4F2B] rounded-2xl px-4 py-3 bg-[#F8F2E2] text-[#262626] placeholder:text-[#A09489] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#7C4F2B]/50"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="border-2 border-dashed border-[#D5A073] rounded-2xl px-4 py-3 bg-[#F8F2E2] resize-none text-[#262626] placeholder:text-[#A09489] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#D5A073]/50"
            ></textarea>

            <button
              type="submit"
              className="border border-[#4e2300] bg-[#855225] text-white py-3 rounded-[10px] font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>
        </div>


        {/*  Contact Info  */}
        <div className="w-[350px] flex flex-col gap-8">

          <div className="bg-[#FCD24C] p-6 rounded-xl shadow-md border border-black">
            <h3 className="text-xl font-bold mb-2 text-[#262626]">
              Email
            </h3>
            <p className="text-[#262626]">
              support@catpuccino.com
            </p>
          </div>

          <div className="bg-[#FCD24C] p-6 rounded-xl shadow-md border border-black">
            <h3 className="text-xl font-bold mb-2 text-[#262626]">
              Socials
            </h3>
            <p className="text-[#262626]">
              Instagram | Facebook | Twitter
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ContactPage;
