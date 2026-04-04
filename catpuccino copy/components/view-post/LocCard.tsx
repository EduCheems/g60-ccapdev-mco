import { IoLocationSharp } from "react-icons/io5";

export default function LocationCard() {
  return (
    <div className="flex items-center gap-6 bg-[#FEF6EA] border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0_0_rgba(0,0,0,1)] max-w-2xl">

      <div className="w-32 h-32 bg-[#FEF6EA] rounded-2xl flex-shrink-0" />
      
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-black">
          Come to MewMew!
        </h2>
        <div className="text-sm font-medium leading-tight text-black/80">
          <span className="font-black border-b-2 border-black inline-block mb-1">Address:</span>
          <p>2nd Floor, One Archers Place,</p>
          <p>Taft Ave, Malate, Manila, 1004 Metro Manila</p>
        </div>
      </div>
    </div>
  );
}
