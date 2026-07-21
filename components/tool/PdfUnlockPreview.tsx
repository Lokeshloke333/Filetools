import React from "react";
import { FileText, Trash2, Lock } from "lucide-react";
import { PdfFileInfo } from "@/lib/pdf/types";
import { formatFileSize } from "@/lib/utils/image";
import { Button } from "@/components/ui/button";

interface PdfUnlockPreviewProps {
  fileInfo: PdfFileInfo;
  onRemove: () => void;
}

export function PdfUnlockPreview({ fileInfo, onRemove }: PdfUnlockPreviewProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm relative group hover:border-red-300 transition-colors">
      <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
        <FileText className="w-8 h-8 text-red-500" />
      </div>

      <div className="flex-1 min-w-0 pr-12">
        <p className="text-base font-bold text-slate-800 truncate" title={fileInfo.file.name}>
          {fileInfo.file.name}
        </p>
        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 font-medium">
          <span>{formatFileSize(fileInfo.file.size)}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="text-red-600 font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" /> Protected PDF
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
