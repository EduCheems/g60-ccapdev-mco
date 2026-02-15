
import Link from 'next/link';
import Searchbar from './Searchbar';
import { IoAdd, IoSearchOutline } from "react-icons/io5";

export default function Navbar(){
    return(
        <nav className="w-full bg-[#5C3727] border-b border-white/10 py-4">
    <div className="container mx-auto px-10 flex items-center justify-between">
    
        <div className="flex-1 flex justify-start">
            <div className="w-32 h-10 bg-gray-400/50 rounded flex items-center justify-center text-xs uppercase text-white">
                Logo
            </div>
        </div>

        <div className="flex-[2] flex justify-center gap-8 text-[12px] font-medium uppercase tracking-widest text-white/80">
            <Link href="/home" className="hover:text-[#D26500] hover:font-bold transition-all">Home</Link>
            {/*<Link href="/discover" className="hover:text-[#D26500] hover:font-bold transition-all">Discover</Link>*/}
            <Link href="/about" className="hover:text-[#D26500] hover:font-bold transition-all">About</Link>
            <Link href="/contact" className="hover:text-[#D26500] hover:font-bold transition-all">Contact</Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
            <Link href="/post">
                <button className="w-10 h-10 bg-[#D26500] text-white rounded-lg flex items-center justify-center 
                                   shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] 
                                   hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] 
                                   active:translate-y-[4px] transition-all duration-75">
                    <IoAdd className="text-2xl stroke-[2px]" />
                </button>
            </Link>
            
            <Searchbar />

            <Link href="/profile" className="w-10 h-10 bg-gray-400/50 rounded-full flex-shrink-0 block hover:ring-2 hover:ring-white/50 transition-all"/>

        </div>
    </div>
</nav>

    );
}