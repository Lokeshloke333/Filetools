import React from "react";
import { CheckCircle2, Download, RotateCcw, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils/image";
import { PdfUnlockResult } from "@/lib/pdf/types";

interface PdfUnlockResultCardProps {
  result: PdfUnlockResult;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfUnlockResultCard({ result, onDownload, onReset }: PdfUnlockResultCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-xl shadow-green-900/5 text-center flex flex-col items-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
        <Unlock className="w-10 h-10 text-green-500" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Unlocked Successfully!</h3>
      <p className="text-slate-500 mb-8 max-w-md">
        Your PDF has been decrypted and is now accessible without a password.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full justify-center mb-8">
        <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Original File</span>
          <span className="text-lg font-bold text-slate-700">{formatFileSize(result.originalSize)}</span>
        </div>
        <div className="bg-green-50 px-4 py-3 rounded-2xl border border-green-100 flex flex-col items-center">
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Unlocked File</span>
          <span className="text-lg font-bold text-green-700">{formatFileSize(result.processedSize)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button 
          size="lg" 
          className="h-14 px-8 rounded-2xl text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 transition-all"
          onClick={onDownload}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Unlocked PDF
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="h-14 px-8 rounded-2xl text-base font-bold border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          onClick={onReset}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Unlock Another PDF
        </Button>
      </div>
    </div>
  );
}
