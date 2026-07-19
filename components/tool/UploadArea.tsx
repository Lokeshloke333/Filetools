"use client";

import React, { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

interface UploadAreaProps {
  onFileSelect?: (file: File) => void;
  acceptedFormats?: string;
  maxSizeMB?: number;
}

export function UploadArea({
  onFileSelect,
  acceptedFormats = "JPG, PNG, WebP, GIF, AVIF",
  maxSizeMB = 50,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Basic validation mock for frontend
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`relative w-full h-[320px] rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 border-2 border-dashed
        ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 shadow-inner"
            : "border-slate-300 bg-white hover:bg-slate-50 hover:border-blue-300"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept={acceptedFormats.split(", ").map(f => `.${f.toLowerCase()}`).join(",")}
      />
      
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
        <UploadCloud className="w-8 h-8 text-blue-600" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">
        Drop your file here or{" "}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus:outline-none"
        >
          browse
        </button>
      </h3>
      
      <p className="text-slate-500 text-sm text-center font-medium">
        Supports {acceptedFormats} — up to {maxSizeMB}MB
      </p>

    </div>
  );
}
