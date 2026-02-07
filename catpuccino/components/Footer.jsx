"use client"; // <--- Add this at the very top!

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <footer className="border-t border-white/20 w-full bg-[#5C3727] pt-5 pb-5">
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-12 items-center mb-5">
                    
                    <div className="col-span-3">
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center gap-2 border border-white/40 px-6 py-3 text-[12px] text-white uppercase tracking-widest hover:bg-white hover:text-[#5C3727] transition"
                        >
                            BACK TO TOP
                        </button>
                    </div>

                    <div className="col-span-6 flex justify-center">
                        <div className="h-20">
                            <img 
                                src="/catpuccino-footer.svg"
                                alt="catpuccino footer logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="col-span-6"></div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col items-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                        Catpuccino 2026 | All rights reserved ©
                    </p>
                </div>
            </div>
        </footer>
    );
}