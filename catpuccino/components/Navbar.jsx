
import Link from 'next/link';
import Searchbar from './Searchbar';

export default function Navbar(){
    return(
        <nav className="w-full bg-[#5C3727] border-b border-white/10 py-4">
            <div className="container mx-auto px-10 grid grid-cols-12 items-center">
            
                <div className="col-span-4 flex justify-start">
                    <div className="w-32 h-10 bg-gray-400/50 rounded flex items-center justify-center text-xs uppercase">
                        Logo
                    </div>
                </div>

                <div className="col-span-4 flex justify-start ml-10 gap-8 text-[12px] font-regular uppercase tracking-widest text-white/80">
                    <Link href="/" className="hover:text-[#D26500] hover:font-bold uppercase">Home</Link>
                    <Link href="/discover" className="hover:text-[#D26500] hover:font-bold uppercase">Discover</Link>
                    <Link href="/about" className="hover:text-[#D26500] hover:font-bold uppercase">About</Link>
                    <Link href="/contact" className="hover:text-[#D26500] hover:font-bold uppercase">Contact</Link>
                </div>

                <div className="col-span-4 flex items-center justify-end gap-4">
                    <div className="w-8 h-8 bg-gray-400/50 rounded sm"></div> 
                    <Searchbar/>

                    <div className="w-10 h-10 bg-gray-400/50 rounded-full"></div>
                </div>
            </div>
        </nav>
    );
}