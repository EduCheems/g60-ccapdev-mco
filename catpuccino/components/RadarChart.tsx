"use client";

export default function RadarChart({ ratings }: { ratings: Record<string, number> }) {
  const size = 300;
  const center = size / 2;
  const radius = 100; 
  const labelRadius = radius + 28;
  
  // Update this line to use 'ratings' instead of 'data'
  const labels = Object.keys(ratings);

  const getCoordinates = (val: number, i: number, max: number) => {
    const angle = (Math.PI * 2) / labels.length * i - Math.PI / 2;
    const distance = (val / 5) * max;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const points = labels
    .map((key, i) => {
      // Update this line to use 'ratings' instead of 'data'
      const { x, y } = getCoordinates(ratings[key], i, radius);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative w-full flex justify-center items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* ... rest of your SVG code ... */}
        {/* Black Outline Background */}

    {/* Main Yellow Polygon */}
    <polygon
      points={points}
      fill="#FCD24C"
      fillOpacity="0.7"
      stroke="#FCD24C"
      strokeWidth="2"
      strokeLinejoin="round"
      className="transition-all duration-500 ease-out"
    />

        {/* Radar outline layers */}
    {[1, 2, 3, 4, 5].map((level) => {
      const ringPoints = labels
        .map((_, i) => {
          const { x, y } = getCoordinates(level, i, radius);
          return `${x},${y}`;
        })
        .join(" ");

        const isOuter = level === 5; 

      return (
        <polygon
          key={level}
          points={ringPoints}
          fill="none"
          stroke="black"
          strokeOpacity={isOuter? 0.4: 0.15}
          strokeWidth={isOuter? 3: 1}
        />
      );
    })}


    {/* Corner labels */}
    {labels.map((label, i) => {
      const angle =
       (Math.PI * 2) / labels.length * i - Math.PI / 2;

        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);

        return (
          <text
            key={label}
            x={x}
            y={y}
            fontSize="10"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            className="uppercase fill-black"
          >
            {label}
          </text>
        );
    })}

      </svg>
    </div>
  );
}