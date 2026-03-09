"use client";

import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import RadarChart from "@/components/RadarChart";
import StarSlider from "@/components/StarScale";
import CatInfo, { type CatInfoData } from "@/components/CatInfo";
import { useRouter } from "next/navigation";

const categoryColors: Record<string, string> = {
  Sociability: "#ED7364",
  Ambience: "#7DA06C",
  Food: "#E08027",
  Catmosphere: "#508796",
  Service: "#F052A5",
};

const inputBase =
  "w-full bg-[#FEF6EA] border-2 border-[#855225] rounded-xl px-4 py-3 text-[#855225] placeholder-[#855225]/50 focus:outline-none focus:border-[#855225] font-medium shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)]";
const labelBase = "block text-sm font-bold text-[#855225] mb-1";

function MenuImageUpload({
  images,
  onAdd,
  onRemove,
}: {
  images: string[];
  onAdd: (base64: string) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onAdd(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-[#855225] bg-[#FFF8EC] flex-shrink-0">
            <img src={src} alt={`Menu ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-sm leading-none flex items-center justify-center hover:bg-black/80"
            >
              ×
            </button>
          </div>
        ))}
        <label className="w-28 h-28 rounded-xl border-2 border-dashed border-[#E6AA76] bg-[#FFF8EC] flex items-center justify-center cursor-pointer hover:border-[#855225] transition-all flex-shrink-0">
          <span className="text-[#855225]/60 text-2xl font-light">+</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-[#855225]/70">Add as many menu images as you like.</p>
    </div>
  );
}

export default function CreateCafePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [cafeName, setCafeName] = useState("");
  const [cafeId, setCafeId] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [menuImages, setMenuImages] = useState<string[]>([]);

  const [ratings, setRatings] = useState({
    Sociability: 3,
    Ambience: 3,
    Food: 3,
    Catmosphere: 3,
    Service: 3,
  });

  const [companions, setCompanions] = useState<(CatInfoData | null)[]>([null]);

  const handleRatingChange = (category: string, val: number) => {
    setRatings((prev) => ({ ...prev, [category]: val }));
  };

  const updateCompanion = (index: number, data: CatInfoData | null) => {
    setCompanions((prev) => {
      const next = [...prev];
      next[index] = data;
      if (index === next.length - 1 && data) {
        return [...next, null];
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!session) {
        alert("You must be logged in to create a cafe.");
        return;
      }
      const payload = {
        cafeName,
        cafeId,
        description,
        address,
        openHours,
        priceRange,
        menuImages,
        ratings,
        companions: companions.filter((c): c is CatInfoData => c !== null && !!(c.name || c.breed || c.description)),
      };
      console.log("Create cafe payload:", payload);
      alert("Create cafe submit (hook up to your API). Check console for payload.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-[140px] py-12">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-[#855225] font-poppins font-black text-[42px] uppercase">
          Create Cafe!
        </h1>
        <div className="h-[3px] flex-1 rounded-full bg-[#855225] mt-1" />
      </div>

      <div className="flex gap-12 items-start max-w-[1400px] mx-auto">
        {/* Left column */}
        <div className="flex-1 max-w-[675px] space-y-5 pb-20">
          {/* Cafe information */}
          <div className="bg-[#FEF6EA] border-2 border-[#855225] rounded-xl p-5 shadow-[5px_5px_0_0_#85522533] space-y-4">
            <h2 className="font-poppins font-black uppercase text-xl text-[#855225] border-b-2 border-[#855225] pb-2">
              Cafe information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Enter name of cafe *</label>
                <input
                  type="text"
                  placeholder="Enter Cafe Name"
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Enter cafe id *</label>
                <input
                  type="text"
                  placeholder="Cafe ID"
                  value={cafeId}
                  onChange={(e) => setCafeId(e.target.value)}
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>Cafe description</label>
              <textarea
                placeholder="Insert description of cafe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`${inputBase} resize-none`}
              />
            </div>

            <div>
              <label className={labelBase}>Cafe address / location</label>
              <textarea
                placeholder="Insert address or location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className={`${inputBase} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Open hours *</label>
                <input
                  type="text"
                  placeholder="e.g. 9 AM – 9 PM"
                  value={openHours}
                  onChange={(e) => setOpenHours(e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Price range *</label>
                <input
                  type="text"
                  placeholder="e.g. ₱100 – ₱500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>Cafe menu (images)</label>
              <MenuImageUpload
                images={menuImages}
                onAdd={(base64) => setMenuImages((prev) => [...prev, base64])}
                onRemove={(i) => setMenuImages((prev) => prev.filter((_, idx) => idx !== i))}
              />
            </div>
          </div>

          {/* Pawmeter */}
          <div
            style={{ border: "2px solid #855225" }}
            className="bg-[#FEF6EA] rounded-xl px-6 py-5 flex flex-col justify-between shadow-[5px_5px_0_rgb(133_82_37_/_0.2)]"
          >
            <h3 className="font-poppins font-black uppercase text-lg text-[#855225] mb-4">
              Rate your cafe based on these categories to generate your cafe's unique Pawmeter profile!
            </h3>
            <div className="space-y-1.5">
              {Object.entries(ratings).map(([key, val]) => (
                <StarSlider
                  key={key}
                  label={key}
                  value={val}
                  onChange={(newVal) => handleRatingChange(key, newVal)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column – Pawmeter (sticky) + buttons stay visible */}
        <div className="w-[380px] flex-shrink-0">
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="bg-[#FCD24C] rounded-[20px] px-6 py-6 border-2 border-[#855225] shadow-[5px_5px_0_0_#85522533]">
              <h2 className="text-2xl font-poppins font-black uppercase text-[#855225] mb-4 text-center">
                Pawmeter
              </h2>
              <div className="bg-[#FEF6EA] aspect-square rounded-2xl border-2 border-[#855225] overflow-hidden mb-6 flex items-center justify-center">
                <RadarChart ratings={ratings} />
              </div>
              <div className="space-y-3">
                {Object.entries(ratings).map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-[#855225]">
                      <span>{label}</span>
                      <span>{value}/5</span>
                    </div>
                    <div className="h-3 bg-white/60 rounded-full w-full overflow-hidden border border-[#855225]/30">
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${(value / 5) * 100}%`,
                          backgroundColor: categoryColors[label] ?? "#ED7364",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-8 py-3 bg-[#FEF6EA] text-[#855225] font-poppins font-bold uppercase rounded-full border-2 border-[#855225] hover:bg-[#F5E4C8] transition shadow-[5px_5px_0_rgb(133_82_37_/_0.2)]"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-10 py-3 bg-[#E5781E] text-white font-poppins font-bold uppercase rounded-full border-2 border-[#855225] hover:bg-[#c26214] transition shadow-[5px_5px_0_rgb(133_82_37_/_0.2)]"
              >
                Create Cafe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pawmazing Companions – full width across page */}
      <div className="w-full max-w-[1400px] mx-auto mt-8 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[#855225] font-poppins font-black text-[42px] uppercase">
            Pawmazing Companions
          </h2>
          <div className="h-[3px] flex-1 rounded-full bg-[#855225] mt-1" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-2 gap-y-6 w-full items-start">
          {companions.map((cat, index) => (
            <div key={index} className="min-w-0">
              <CatInfo
                value={cat}
                onChange={(data) => updateCompanion(index, data)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
