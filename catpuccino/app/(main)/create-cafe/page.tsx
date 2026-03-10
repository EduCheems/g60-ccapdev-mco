"use client";

import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import CatInfo, { type CatInfoData } from "@/components/CatInfo";

const inputBase =
  "w-full bg-[#FEF6EA] border-2 border-[#855225] rounded-xl px-4 py-3 text-[#855225] placeholder-[#855225]/50 focus:outline-none focus:border-[#855225] font-medium shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)]";
const labelBase = "block text-sm font-bold text-[#855225] mb-1";

const dropZoneBase =
  "w-full min-h-[160px] rounded-xl border-2 border-dashed border-[#C9A57A] bg-[#FFF8EC] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#855225] hover:bg-[#FEF6EA] transition-all text-[#855225] font-medium text-sm";

function MediaDropZone({
  value,
  onFile,
  multiple = false,
}: {
  value: string | string[];
  onFile: (base64: string) => void;
  onRemove?: (index: number) => void;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    for (let i = 0; i < (multiple ? files.length : 1); i++) {
      const file = files[i];
      if (!file) continue;
      const reader = new FileReader();
      reader.onloadend = () => onFile(reader.result as string);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    for (let i = 0; i < (multiple ? files.length : 1); i++) {
      const file = files[i];
      if (!file?.type.startsWith("image/")) continue;
      const reader = new FileReader();
      reader.onloadend = () => onFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const hasValue = multiple ? (value as string[]).length > 0 : !!value;

  return (
    <div
      className={dropZoneBase}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFile}
        className="hidden"
      />
      {hasValue ? (
        multiple ? (
          <span className="text-[#855225]">{(value as string[]).length} image(s) added</span>
        ) : (
          <img src={value as string} alt="Banner" className="max-h-32 w-auto rounded-lg object-contain" />
        )
      ) : (
        <span className="text-center px-4">Drag or Drop or upload Media</span>
      )}
    </div>
  );
}

function MediaSection({
  title,
  value,
  onFile,
  multiple = false,
}: {
  title: string;
  value: string | string[];
  onFile: (base64: string) => void;
  onRemove?: (index: number) => void;
  multiple?: boolean;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-poppins font-black uppercase text-[#855225]">{title}</h3>
      <div className="h-[2px] w-full rounded-full bg-[#855225]/40" />
      <MediaDropZone value={value} onFile={onFile} multiple={multiple} />
    </div>
  );
}

export default function CreateCafePage() {
  const { data: session } = useSession();

  const [cafeName, setCafeName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [cafeBannerImage, setCafeBannerImage] = useState("");
  const [menuImages, setMenuImages] = useState<string[]>([]);

  const [companions, setCompanions] = useState<(CatInfoData | null)[]>([null]);

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
        description,
        address,
        openHours,
        priceRange,
        cafeBannerImage,
        menuImages,
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
          </div>
        </div>

        {/* Right column – Cafe Banner & Cafe Menu uploads + buttons */}
        <div className="w-[380px] flex-shrink-0">
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="bg-[#FEF6EA] rounded-xl border-2 border-[#855225] shadow-[5px_5px_0_0_#85522533] p-5 space-y-6">
              <MediaSection
                title="Cafe Banner"
                value={cafeBannerImage}
                onFile={setCafeBannerImage}
                multiple={false}
              />
              <MediaSection
                title="Cafe Menu"
                value={menuImages}
                onFile={(base64) => setMenuImages((prev) => [...prev, base64])}
                onRemove={(i) => setMenuImages((prev) => prev.filter((_, idx) => idx !== i))}
                multiple={true}
              />
              {menuImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {menuImages.map((src, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-[#855225] bg-[#FFF8EC]">
                      <img src={src} alt={`Menu ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setMenuImages((prev) => prev.filter((_, idx) => idx !== i)); }}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white text-xs leading-none flex items-center justify-center hover:bg-black/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
