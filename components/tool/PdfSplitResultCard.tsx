import React from "react";
import { FileArchive, CheckCircle2, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils/image";
import { PdfSplitResult } from "@/lib/pdf/types";

interface PdfSplitResultCardProps {
  result: PdfSplitResult;
  onDownload: () => void;
  onReset: () => void;
}

export function PdfSplitResultCard({ result, onDownload, onReset }: PdfSplitResultCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-xl shadow-green-900/5 text-center flex flex-col items-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
        <FileArchive className="w-10 h-10 text-green-500" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Split Successfully!</h3>
      <p className="text-slate-500 mb-8 max-w-md">
        Your PDF has been split into <span className="font-bold text-slate-700">{result.totalGeneratedFiles}</span> document{result.totalGeneratedFiles > 1 ? "s" : ""} and packaged into a ZIP archive.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-8">
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex flex-col items-center min-w-[140px]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Generated Files</span>
          <span className="text-lg font-bold text-slate-700">{result.totalGeneratedFiles}</span>
        </div>
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex flex-col items-center min-w-[140px]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ZIP Size</span>
          <span className="text-lg font-bold text-green-600">{formatFileSize(result.processedSize)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button 
          size="lg" 
          className="h-14 px-8 rounded-2xl text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 transition-all"
          onClick={onDownload}
        >
          <Download className="w-5 h-5 mr-2" />
          Download ZIP
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="h-14 px-8 rounded-2xl text-base font-bold border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          onClick={onReset}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Split Another PDF
        </Button>
      </div>
    </div>
  );
}
