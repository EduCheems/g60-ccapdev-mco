'use client';

import React, { ChangeEvent, FormEvent } from "react";
import CafeSearch from "@/components/CafeSearcher";

interface EditProfileProps {
  isOpen: boolean;
  editName: string;
  editProfileImageUrl: string;
  editBio: string;
  editTopCafe1: string;
  editTopCafe2: string;
  editTopCafe3: string;
  onChangeName: (value: string) => void;
  onChangeBio: (value: string) => void;
  onChangeTopCafe1: (value: string) => void;
  onChangeTopCafe2: (value: string) => void;
  onChangeTopCafe3: (value: string) => void;
  onProfileImageFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: (e: FormEvent<HTMLFormElement>) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  editName,
  editProfileImageUrl,
  editBio,
  editTopCafe1,
  editTopCafe2,
  editTopCafe3,
  onChangeName,
  onChangeBio,
  onChangeTopCafe1,
  onChangeTopCafe2,
  onChangeTopCafe3,
  onProfileImageFileChange,
  onCancel,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#FFF7EA] rounded-[16px] shadow-xl px-6 py-5 w-full max-w-lg">
        <h2 className="text-lg font-bold text-[#262626] mb-3">Edit Profile</h2>
        <form onSubmit={onSave} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#262626]">
              Display name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => onChangeName(e.target.value)}
              className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <label className="text-sm font-semibold text-[#262626] self-start">
              Profile picture
            </label>
            <label className="relative w-44 h-44 rounded-full border-2 border-dashed border-[#E6AA76] overflow-hidden bg-[#FFE3C4] cursor-pointer hover:border-[#855225] hover:border-solid transition-all flex items-center justify-center">
              <img
                src={editProfileImageUrl || "/default-profile.svg"}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={onProfileImageFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            <span className="text-[11px] text-gray-700 self-start">
              Click the circle to upload a profile picture.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#262626]">
              Bio
            </label>
            <textarea
              value={editBio}
              onChange={(e) => onChangeBio(e.target.value)}
              className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B] resize-none h-24"
              placeholder="Write a short bio about yourself"
            />
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-semibold text-[#262626]">
              Top 3 recommended cafes
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#DFA52B] text-xs font-bold border border-black/20 text-[#3A240D]">
                  1
                </span>
                <CafeSearch
                  selectedCafe={editTopCafe1}
                  onSelect={onChangeTopCafe1}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#C0C0C5] text-xs font-bold border border-black/10 text-[#262626]">
                  2
                </span>
                <CafeSearch
                  selectedCafe={editTopCafe2}
                  onSelect={onChangeTopCafe2}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#8E531B] text-xs font-bold border border-black/20 text-[#FBF3DE]">
                  3
                </span>
                <CafeSearch
                  selectedCafe={editTopCafe3}
                  onSelect={onChangeTopCafe3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-[10px] text-sm font-semibold text-[#855225] bg-transparent hover:bg-[#F5E4C8] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#AA4B1B] hover:bg-[#8C3A13] transition"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

