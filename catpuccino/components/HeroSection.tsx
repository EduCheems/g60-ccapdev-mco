"use client";

export default function HeroSection() {
  const scrollToDiscover = () => {
    const element = document.getElementById('catpuccino-definition');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-[642px] w-full pt-[40px] bg-[#FBF3DE] relative flex flex-col px-[140px]">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/landing-page-bg.svg" 
          alt="Background Decor" 
          className="w-full h-full object-cover opacity-100 scale-85 origin-bottom" 
        />
      </div>
      
      <h2 className="text-[#D26500] font-poppins text-2xl font-black mb-1">Bobcat says</h2>
      
      <div className="relative">
        <h1 className="text-[#855225] font-poppins -mt-2 font-black text-[81px] leading-tight uppercase tracking-tight">
          “ FIND YOUR SIPS AND PURRS”
        </h1>
        <div className="absolute -bottom-[50px] right-0 bg-[#D26500] text-[#FBF3DE] px-8 py-3 rounded-full font-black text-2xl shadow-lg transform rotate-[-4deg]">
          With catpuccino!
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full px-[140px] flex justify-between items-end">
        <span className="text-[#D26500]/50 font-black text-sm uppercase tracking-[0.2em]">Welcome to Catpuccino !!!</span>
        
        <button 
          onClick={scrollToDiscover}
          className="w-[100px] h-[80px] absolute left-1/2 -translate-x-1/2 bottom-8 z-20 cursor-pointer hover:translate-y-2 transition-transform duration-300 active:scale-90"
        >
          <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[25px] border-t-[#D26500]" />
        </button>

        <span className="text-[#D26500]/50 font-black text-sm uppercase tracking-[0.2em]">Look Down !!!</span>
      </div>
    </div>
  );
}