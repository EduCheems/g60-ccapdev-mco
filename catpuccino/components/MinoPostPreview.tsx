import React from 'react'; 

export default function MiniPostPreview(){
    return (
        <div className = "flex flex-col gap-1 py-3 border-b border-black/20 last:border-0  hover:bg-black/5 cursor-pointer px-2 -mx-2 rounded-md transition-colors">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#A86734]"></div>
                <span className="text-[10px] text-gray-600 font-medium">username - 2h ago</span>
            </div>

            <h4 className="text-sm font-bold text-black truncate">Title of the post</h4>
            <span className="text-[10px] text-gray-500 font-medium">
                67 upvotes • 24 comments
            </span>
        </div>
    )
}