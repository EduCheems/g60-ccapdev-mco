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

  const viewBoxWidth = 400;
  const height = 26;         
  const tubeHeight = 10;     
  const padding = 15; // Increased slightly so the star doesn't clip at "1"
  const starSize = 30;       

  const trackWidth = viewBoxWidth - padding * 2;
  const percentage = (value - 1) / 4;
  const starX = padding + percentage * trackWidth;
  const fillWidth = percentage * trackWidth;
  const themeColor = labelColors[label] || "#F1786D";

  return (
    <div className="flex items-center w-full gap-2 select-none group py-1">
      
      {/* 1. Labels */}
      <div className="w-32 flex-shrink-0">
        <span 
          className="font-poppins font-bold text-[14px] leading-none"
          style={{ color: '#82501D' }} 
        >
          {label}
        </span>
      </div>

      {/* 2. Slider */}
      <div className="relative flex-1 flex items-center h-8">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${height}`}
          className="overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="liquidShadow">
              <feOffset dx="2" dy="2" />
              <feComposite operator="out" in="SourceGraphic" result="inverse" />
              <feFlood floodColor="#5C3A1A" floodOpacity="0.2" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>

            <filter id="tubeInnerShadow">
              <feOffset dx="1" dy="1" />
              <feComposite operator="out" in="SourceGraphic" result="inverse" />
              <feFlood floodColor="#000" floodOpacity="0.1" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Fill container */}
          <rect 
            x={padding} y={(height-tubeHeight)/2} 
            width={trackWidth} height={tubeHeight} 
            rx={5} fill="#FDF3E7" stroke="#855225" strokeWidth="2" 
            filter="url(#tubeInnerShadow)" 
          />
          
          {/* Liquid fill */}
          <rect 
            x={padding} y={(height-tubeHeight)/2} 
            width={fillWidth} height={tubeHeight} 
            rx={5} fill={themeColor} 
            filter="url(#liquidShadow)" 
            className="transition-all duration-300 ease-out" 
          />

          {/* Star state */}
          <g transform={`translate(${starX}, ${height / 2})`} className="transition-all duration-300 ease-out">
             {label === "Sociable" && (
               <image href="/bread.svg" x={10} y={-10} width={20} height={20} />
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

      {/* 3. Number box */}
      <div 
        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md border-2 border-[#82501D] shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.5)]"
        style={{ backgroundColor: themeColor }}
      >
        <span className="font-black text-black text-base">
          {value}
        </span>
      </div>
    </div>
  );
}
