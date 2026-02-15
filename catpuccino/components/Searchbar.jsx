export default function Searchbar() {
  return (
    <div className="flex items-center justify-end">
      
      <div className="relative group">
        <input
          type="text"
          placeholder="SEARCH"
          className="bg-white/10 border border-white/20 rounded-full py-1.5 px-4 w-48 text-[10px] text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
        />
        <svg
          className="w-3 h-3 absolute right-3 top-2.5 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}