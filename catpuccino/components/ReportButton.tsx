
"use client";
import React from 'react'; 


interface ReportButtonProps{
    onClick?: () => void; 
}

export default function ReportButton({ onClick }: ReportButtonProps){
    return (
        <button
            onClick={onClick}
            className="group flex items-center gap-2 px-4 py-1.5 bg-[#FEF6EA] border-[1.5px] border-black rounded-full shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#FF0909] hover:border-black active:translate-y-[3px] active:shadow-none transition-all cursor-pointer" 
        >

            <div className="relative w-5 h-5 flex-shrink-0">
                <img 
                src="/cat-report.svg" 
                alt="Report Icon" 
                className="absolute inset-0 w-full h-full opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                />
                <img 
                src="/cat-report-hovered.svg" 
                alt="Report Icon Hovered" 
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-white"
                />
            </div>

            <span className="font-poppins text-black text-sm font-bold transition-colors duration-200 group-hover:text-white">Report</span>

        </button>
    ); 
}