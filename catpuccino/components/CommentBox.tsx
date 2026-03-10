"use client";

import { useState, useRef, useEffect } from "react";
import { MdImage, MdClose } from "react-icons/md";
import { createComment } from "@/controllers/commentAction";

interface CommentBoxProps {
  id: string; // post id
  userId: string;
  isForceExpanded?: boolean;
  onCancel?: () => void;
  onSubmit?: (content: string, imageUrl: string | null) => void;
}

export default function CommentBox( { id, userId, isForceExpanded = false, onCancel, onSubmit }: CommentBoxProps ) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isValid = text.trim().length > 0 || imageFile !== null;

  useEffect(() => {
    if (isForceExpanded) {
      setIsExpanded(true); 
    }
  }, [isForceExpanded]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setIsExpanded(true); 
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    setIsExpanded(false);
    setText("");
    removeImage();
    if (onCancel) onCancel();
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isValid) return;
        
    if (onSubmit) {
      onSubmit(text, imagePreview);
    }

      handleCancel();
  };

  return (
    <div 
      onClick={() => !isExpanded && setIsExpanded(true)}
      className={`w-full bg-[#FEF6EA] border-[1.5px] border-[#855225] shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] transition-all duration-300 ease-in-out overflow-hidden flex flex-col
        ${isExpanded 
          ? "rounded-2xl p-4" 
          : "rounded-full px-5 py-3 cursor-text hover:bg-[#FBF3DE]"
        }
      `}
    >
      
      <textarea
        ref={textareaRef}
        className={`mt-2 ml-2 w-full bg-transparent outline-none resize-none font-poppins text-[#262626] placeholder:text-[#262626]/70 text-sm transition-all duration-300 ease-in-out
          ${isExpanded ? "h-[70px]" : "h-[20px] cursor-text"}
        `}
        placeholder="Join the conversation"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className={`transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded && imagePreview ? "opacity-100 max-h-[140px] mt-2" : "opacity-0 max-h-0"}
      `}>
        {imagePreview && (
          <div className="relative w-32 h-32 rounded-lg border-[1.5px] border-[#855225]/40 overflow-hidden">
            <img src={imagePreview} alt="Upload preview" className="object-cover w-full h-full" />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
            >
              <MdClose size={16} />
            </button>
          </div>
        )}
      </div>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden flex justify-between items-end
        ${isExpanded ? "opacity-100 max-h-[60px] mt-3" : "opacity-0 max-h-0 m-0"}
      `}>
        
        {/* Hidden File Input & Custom Icon Button */}
        <div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="p-2 hover:bg-[#EEDBB5] rounded-md transition-colors text-[#262626]"
            title="Attach an image"
          >
            <MdImage size={24} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleCancel}
            className="px-6 py-2 rounded-full border-[1.5px] border-[#262626] text-[#262626] font-poppins font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={!isValid}
            className={`px-6 py-2 rounded-full border-[1.5px] border-[#262626] font-poppins font-medium text-sm transition-all
              ${isValid 
                ? "bg-[#FCD24C] text-[#262626] cursor-pointer hover:bg-[#fbdc74]" 
                : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-70"
              }
            `}
          >
            Comment
          </button>
        </div>

      </div>
    </div>
  );
}