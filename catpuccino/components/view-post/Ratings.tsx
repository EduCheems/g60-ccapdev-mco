import React from "react";

interface RatingsProps {
  ratings: Record<string, number>;
}


export default function Ratings({ ratings }: RatingsProps) {
  const values = Object.values(ratings);
  const average = values.length > 0 
    ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) 
    : "0.0";

  const numAverage = parseFloat(average);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(numAverage) ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));

  return (
    <div className="flex items-center gap-1 select-none origin-right scale-125"> 
      <div className="flex text-2xl tracking-tight">
        {stars}
      </div>
      
      <span className="text-2xl font-black text-[#855225] ml-2">
        {average}
        <span className="text-lg font-bold ml-1">(67)</span>
      </span>
    </div>
  );
}