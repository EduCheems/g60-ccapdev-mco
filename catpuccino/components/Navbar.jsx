
export default function Navbar(){
    return(
        <nav className="w-full border-b border-white/10 py-4">
            <div className="container mx-auto px-10 grid grid-cols-12 items-center">
                
                 {/* Logo */}
                <div className="col-span-4 flex justify-start">
                    <div className="w-32 h-10 bg-gray-400/50 rounded flex items-center justify-center text-xs uppercase">
                        Logo
                    </div>
                </div>

                {/* Nav Links */}
                <div className="col-span-4 flex gap-8 text-[11px] font-regular uppercase tracking-widest text-white/80">
                    <a href="#" className="hover:text-white">Home</a>
                    <a href="#" className="hover:text-white">Discover</a>
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>

                {/* Search & Profile Icons */}
                <div className="col-span-4 flex items-center justify-end gap-4">
                    {/* Make a post Icon */}
                    <div className="w-8 h-8 bg-gray-400/50 rounded sm"></div> 
                    
                    {/* //Search Bar */}
                    <div className="w-40 h-8 bg-gray-400/50 rounded sm"></div>
                    
                    {/*Profile*/} 
                    <div className="w-10 h-10 bg-gray-400/50 rounded-full"></div>
                </div>
            </div>
        </nav>
    );
}