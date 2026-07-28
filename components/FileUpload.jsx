"use client";
import React, { useState } from "react";

export default function FileUpload({ onFileSelect }) {
    const [localPreview, setLocalPreview] = useState("");
  
    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);

      if (onFileSelect) {
        onFileSelect(file);
      }
    };

  return (
    <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-gray-600">
      Profile Picture
    </label>
    {localPreview && (
      <div className="flex items-center gap-2 mt-1">
        <img
          src={localPreview}
          alt="Preview"
          className="rounded-full object-cover w-20 h-20 border"
        />
      </div>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      required
      className="text-xs text-gray-700 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#4F46E5] file:text-white hover:file:bg-[#4338CA]"
    /> 
  </div>
  );
}