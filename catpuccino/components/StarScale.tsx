"use client";
import React, { useState } from "react";

interface StarSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

const labelColors: Record<string, string> = {
  Sociable: "#E67E6E",
  Ambience: "#92B17B",
  Food: "#F58216",
  Catmosphere: "#6B9093",
  Service: "#F56294",
};

export default function StarScale({ label, value, onChange }: StarSliderProps) {
  const [isHovered, setIsHovered] = useState(false);

  // THESE ARE THE MAGIC NUMBERS FOR 187px HEIGHT
  const viewBoxWidth = 400;
  const height = 26;         // Shorter row height
  const tubeHeight = 10;     
  const padding = 10;
  const starSize = 30;       // Smaller star to fit the tight vertical space

  const trackWidth = viewBoxWidth - padding * 2;
  const percentage = (value - 1) / 4;
  const starX = padding + percentage * trackWidth;
  const fillWidth = percentage * trackWidth;
  const themeColor = labelColors[label] || "#F1786D";

  return (
    // Removed the negative px/py classes that were breaking your layout
    <div className="flex items-center w-full gap-3 select-none group">
      
      {/* 1. LABEL - Tighter width and font */}
      <div className="w-32 flex-shrink-0">
        <span 
          className="font-poppins font-bold text-[14px] leading-none"
          style={{ color: '#82501D' }} 
        >
          {label}
        </span>
      </div>

      {/* 2. SLIDER AREA - Height matches the SVG now */}
      <div className="relative flex-1 flex items-center h-7">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${height}`}
          className="overflow-visible pointer-events-none"
        >
          {/* ... Keep your <defs> exactly as they are ... */}

          {/* TRACK */}
          <rect x={padding} y={(height-tubeHeight)/2} width={trackWidth} height={tubeHeight} rx={5} fill="#FDF3E7" stroke="#A38B7A" strokeWidth="1" filter="url(#tubeInnerShadow)" />
          
          {/* FILL */}
          <rect x={padding} y={(height-tubeHeight)/2} width={fillWidth} height={tubeHeight} rx={5} fill={themeColor} filter="url(#tubeInnerShadow)" className="transition-all duration-300" />

          {/* THE STAR */}
          <g transform={`translate(${starX}, ${height / 2})`} className="transition-all duration-300">
             {/* The little bread for Sociable like in your image! */}
             {label === "Sociable" && (
               <image href="/bread.svg" x={5} y={0} width={20} height={20} />
             )}
            <image
              href={isHovered ? "/star-on-hover.svg" : "/star.svg"}
              x={-(starSize / 2)} y={-(starSize / 2)} width={starSize} height={starSize}
            />
          </g>
        </svg>

        <input
          type="range" min="1" max="5" step="1" value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
        />
      </div>

      {/* 3. NUMERIC BOX - Smaller to fit the 187px height */}
      <div 
        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md border-2 border-[#82501D] relative shadow-inner"
        style={{ backgroundColor: themeColor }}
      >
        <span className="font-black text-black text-base relative z-10">
          {value}
        </span>
      </div>
    </div>
  );
}