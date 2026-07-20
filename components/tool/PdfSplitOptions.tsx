import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { PdfSplitMode } from "@/lib/pdf/types";

interface PdfSplitOptionsProps {
  mode: PdfSplitMode;
  setMode: (mode: PdfSplitMode) => void;
  ranges: string;
  setRanges: (ranges: string) => void;
  extract: string;
  setExtract: (extract: string) => void;
  disabled: boolean;
}

export function PdfSplitOptions({
  mode,
  setMode,
  ranges,
  setRanges,
  extract,
  setExtract,
  disabled,
}: PdfSplitOptionsProps) {
  return (
    <div className="space-y-6">
      <RadioGroup value={mode} onValueChange={(v) => setMode(v as PdfSplitMode)} disabled={disabled}>
        
        {/* Split Every Page */}
        <div className={`p-4 rounded-xl border-2 transition-all ${mode === "every_page" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="every_page" id="every_page" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="every_page" className="text-base font-bold text-slate-800 cursor-pointer">
                Split Every Page
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Extract every single page into its own individual PDF file.
              </p>
            </div>
          </div>
        </div>

        {/* Split by Ranges */}
        <div className={`p-4 rounded-xl border-2 transition-all ${mode === "ranges" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="ranges" id="ranges" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ranges" className="text-base font-bold text-slate-800 cursor-pointer">
                Split by Page Range
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Create multiple PDFs from ranges. (e.g., 1-5, 6-10)
              </p>
              {mode === "ranges" && (
                <div className="mt-3">
                  <Input 
                    placeholder="e.g., 1-5, 8-12" 
                    value={ranges} 
                    onChange={(e) => setRanges(e.target.value)}
                    disabled={disabled}
                    className="h-11 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Extract Selected Pages */}
        <div className={`p-4 rounded-xl border-2 transition-all ${mode === "extract" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="extract" id="extract" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="extract" className="text-base font-bold text-slate-800 cursor-pointer">
                Extract Selected Pages
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Extract specific pages into a single PDF. (e.g., 1,3,5)
              </p>
              {mode === "extract" && (
                <div className="mt-3">
                  <Input 
                    placeholder="e.g., 1, 3, 5, 8" 
                    value={extract} 
                    onChange={(e) => setExtract(e.target.value)}
                    disabled={disabled}
                    className="h-11 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      </RadioGroup>
    </div>
  );
}
