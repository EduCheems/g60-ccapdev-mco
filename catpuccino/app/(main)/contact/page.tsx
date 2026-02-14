import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HERO TITLE  */}
      <section className="bg-[#FBF3DE] px-[140px] pt-16 pb-8 text-center">
        <h1 className="text-5xl font-poppins font-black text-[#262626]">
          Contact Us
        </h1>
        <p className="mt-4 text-[#262626] max-w-[600px] mx-auto">
          Have questions, suggestions, or partnership ideas? 
          We'd love to hear from you!
        </p>
      </section>


      {/*  CONTACT SECTION  */}
      <section className="bg-[#FEF6EA] px-[140px] py-20 flex gap-16">

        {/*  Contact Form  */}
        <div className="flex-1 bg-white p-10 rounded-2xl shadow-md">

          <h2 className="text-3xl font-bold text-[#262626] mb-8">
            Send us a message
          </h2>

          <form className="flex flex-col gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#855225]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#855225]"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg px-4 py-3 resize-none placeholder:text-gray-400 focus:outline-none focus:border-[#855225]"
            ></textarea>

            <button
              type="submit"
              className="bg-[#855225] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>
        </div>


        {/*  Contact Info  */}
        <div className="w-[350px] flex flex-col gap-8">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2 text-[#262626]">
              Email
            </h3>
            <p className="text-[#262626]">
              support@catpuccino.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
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