"use client";

import React, { useState } from "react";

export interface CatInfoData {
  name: string;
  breed: string;
  description: string;
  imageUrl?: string;
}

interface CatInfoProps {
  value?: CatInfoData | null;
  onChange?: (data: CatInfoData | null) => void;
}

const cardOuter =
  "rounded-[24px] border-[2px] border-black/60 bg-[#FCD24C] shadow-[0_4px_0_rgba(0,0,0,0.35)]";
const cardInner =
  "h-40 rounded-[18px] border border-black bg-[#FFF8EC] flex items-center justify-center overflow-hidden";
const cardFooter = "mt-3 px-4 pb-4";

export default function CatInfo({ value = null, onChange }: CatInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState(value?.name ?? "");
  const [formBreed, setFormBreed] = useState(value?.breed ?? "");
  const [formDescription, setFormDescription] = useState(value?.description ?? "");
  const [formImageUrl, setFormImageUrl] = useState(value?.imageUrl ?? "");

  const hasData = value && (value.name || value.breed || value.description);

  const openModal = (forEdit = false) => {
    if (forEdit && value) {
      setFormName(value.name);
      setFormBreed(value.breed);
      setFormDescription(value.description);
      setFormImageUrl(value.imageUrl ?? "");
    } else if (!forEdit) {
      setFormName("");
      setFormBreed("");
      setFormDescription("");
      setFormImageUrl("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CatInfoData = {
      name: formName.trim(),
      breed: formBreed.trim(),
      description: formDescription.trim(),
      ...(formImageUrl.trim() ? { imageUrl: formImageUrl.trim() } : {}),
    };
    onChange?.(data);
    closeModal();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Blank state: click to add
  if (!hasData) {
    return (
      <>
        <button
          type="button"
          onClick={() => openModal(false)}
          className={`w-[310px] min-h-[380px] flex flex-col ${cardOuter}`}
        >
          <div className="mt-3 mx-3">
            <div className={cardInner}>
              <span className="text-4xl font-light text-black leading-none">+</span>
            </div>
          </div>
          <div className={`${cardFooter}`}>
            <p className="text-center text-black font-black text-base leading-tight uppercase break-words">
              Click me to add a cat companion
            </p>
          </div>
        </button>

        {isModalOpen && (
          <CatInfoModal
            name={formName}
            breed={formBreed}
            description={formDescription}
            imageUrl={formImageUrl}
            onNameChange={setFormName}
            onBreedChange={setFormBreed}
            onDescriptionChange={setFormDescription}
            onImageUrlChange={setFormImageUrl}
            onImageFileChange={handleImageFileChange}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </>
    );
  }

  // Filled state: show cat info (click to edit optional)
  return (
    <>
      <button
        type="button"
        onClick={() => openModal(true)}
        className={`w-[310px] min-h-[380px] flex flex-col ${cardOuter}`}
      >
        <div className="mt-3 mx-3">
          <div className={cardInner}>
            {value?.imageUrl ? (
              <img src={value.imageUrl} alt={value.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-black font-black text-sm uppercase">CAT IMG*</span>
            )}
          </div>
        </div>
        <div className={`${cardFooter} text-left`}>
          <p className="text-center font-black text-black underline decoration-black underline-offset-2 uppercase break-words">
            {value!.name || "—"}
          </p>
          <p className="mt-1 text-sm text-black break-words">
            <span className="font-bold underline decoration-black underline-offset-1">Breed:</span>{" "}
            {value!.breed || "—"}
          </p>
          <p className="mt-1 text-sm text-black break-words">
            <span className="font-bold underline decoration-black underline-offset-1">Description:</span>
          </p>
          <p className="mt-0.5 text-sm text-black line-clamp-3 break-words">
            {value!.description || "—"}
          </p>
        </div>
      </button>

      {isModalOpen && (
        <CatInfoModal
          name={formName}
          breed={formBreed}
          description={formDescription}
          imageUrl={formImageUrl}
          onNameChange={setFormName}
          onBreedChange={setFormBreed}
          onDescriptionChange={setFormDescription}
          onImageUrlChange={setFormImageUrl}
          onImageFileChange={handleImageFileChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

interface CatInfoModalProps {
  name: string;
  breed: string;
  description: string;
  imageUrl: string;
  onNameChange: (v: string) => void;
  onBreedChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onImageUrlChange: (v: string) => void;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

function CatInfoModal({
  name,
  breed,
  description,
  imageUrl,
  onNameChange,
  onBreedChange,
  onDescriptionChange,
  onImageUrlChange,
  onImageFileChange,
  onClose,
  onSubmit,
}: CatInfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[#FFF7EA] rounded-2xl shadow-xl border-2 border-[#855225] w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#262626] mb-4">Add cat companion</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">Cat image</label>
              <div className="relative w-full aspect-video rounded-xl border-2 border-dashed border-[#E6AA76] bg-[#FFE3C4] overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt="Cat" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-black/40 text-sm uppercase">Image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">Cat name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="e.g. Whiskers"
                className="w-full px-3 py-2 rounded-lg border border-[#C9A57A] bg-[#FFF8EC] text-[#855225] text-sm outline-none focus:ring-2 focus:ring-[#AA4B1B]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">Breed *</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => onBreedChange(e.target.value)}
                placeholder="e.g. British Shorthair"
                className="w-full px-3 py-2 rounded-lg border border-[#C9A57A] bg-[#FFF8EC] text-[#855225] text-sm outline-none focus:ring-2 focus:ring-[#AA4B1B]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">Short description *</label>
              <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="e.g. Very active and playful, loves to interact with customers..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[#C9A57A] bg-[#FFF8EC] text-[#855225] text-sm outline-none focus:ring-2 focus:ring-[#AA4B1B] resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#855225] bg-white border border-[#C9A57A] hover:bg-[#F5E4C8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#AA4B1B] hover:bg-[#8C3A13]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
