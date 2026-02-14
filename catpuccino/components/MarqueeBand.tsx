// components/MarqueeBand.tsx
interface MarqueeProps {
  text: string;
  bgColor?: string;
  duration?: string; 
}

export default function MarqueeBand({ text, bgColor = "bg-[#FF66AA]", duration="40s" }: MarqueeProps) {

  const content = Array(10).fill(`${text}  •  `).join("");

  return (
    <div className={`w-full ${bgColor} py-3 overflow-hidden border-y border-black/10 select-none flex items-center`}>
      <div className="animate-marquee flex">
        <span className="text-white font-poppins text-xl font-bold tracking-widest uppercase">
          {content}
        </span>
        <span className="text-white font-poppins text-xl font-bold tracking-widest uppercase">
          {content}
        </span>
      </div>
    </div>
  );
}