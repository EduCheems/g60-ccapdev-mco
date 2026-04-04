import React from "react";

interface InfoTagProps {
  icon: React.ElementType;
  iconColor: string;
  label: string;
  value: string;
}

export default function InfoTag({ icon: Icon, iconColor, label, value }: InfoTagProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
        <Icon className={`text-xl ${iconColor}`} />
      </div>
      <div className="flex flex-col mt-1 text-[10px]">
        <span className="leading-none text-[#262626] uppercase font-black">{label}:</span>
        <span className="text-black/70 font-bold">{value}</span>
      </div>
    </div>
  );
}