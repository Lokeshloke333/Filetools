import React from "react";
import { formatFileSize } from "@/lib/utils/image";
import { X, Image as ImageIcon } from "lucide-react";

interface ImagePreviewProps {
  file: File & { preview?: string };
  onClear: () => void;
}

export function ImagePreview({ file, onClear }: ImagePreviewProps) {
  return (
    <div className="relative w-full h-[320px] rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col">
      <button 
        onClick={onClear}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-full shadow-sm backdrop-blur-sm transition-colors text-slate-500"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex-1 w-full bg-slate-100 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Checkboard pattern for transparency */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}></div>
        {file.preview ? (
          <img 
            src={file.preview} 
            alt="Preview" 
            className="max-w-full max-h-full object-contain relative z-10 drop-shadow-md rounded-md"
          />
        ) : (
          <ImageIcon className="w-16 h-16 text-slate-300" />
        )}
      </div>
      
      <div className="h-16 bg-white border-t border-slate-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            {file.name.split('.').pop()?.toUpperCase() || 'IMG'}
          </div>
          <span className="font-medium text-slate-700 truncate">{file.name}</span>
        </div>
        <span className="text-sm font-semibold text-slate-500 whitespace-nowrap ml-4">
          {formatFileSize(file.size)}
        </span>
      </div>
    </div>
  );
}
