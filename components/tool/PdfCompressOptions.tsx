import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PdfCompressionLevel } from "@/lib/pdf/types";
import { Zap, ShieldCheck, Minimize } from "lucide-react";

interface PdfCompressOptionsProps {
  level: PdfCompressionLevel;
  setLevel: (level: PdfCompressionLevel) => void;
  disabled: boolean;
}

export function PdfCompressOptions({
  level,
  setLevel,
  disabled,
}: PdfCompressOptionsProps) {
  return (
    <div className="space-y-6">
      <RadioGroup value={level} onValueChange={(v) => setLevel(v as PdfCompressionLevel)} disabled={disabled}>
        
        {/* Low Compression */}
        <div className={`p-4 rounded-xl border-2 transition-all ${level === "low" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="low" id="low" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="low" className="flex items-center gap-2 text-base font-bold text-slate-800 cursor-pointer">
                Low Compression <ShieldCheck className="w-4 h-4 text-green-500" />
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Highest quality. Ideal for printing and maintaining perfect image fidelity.
              </p>
            </div>
          </div>
        </div>

        {/* Medium Compression */}
        <div className={`p-4 rounded-xl border-2 transition-all ${level === "medium" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="medium" id="medium" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="medium" className="flex items-center gap-2 text-base font-bold text-slate-800 cursor-pointer">
                Medium Compression <Zap className="w-4 h-4 text-blue-500" />
              </Label>
              <div className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-1 mt-0.5">
                RECOMMENDED
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Good balance of quality and file size reduction. Best for email and web sharing.
              </p>
            </div>
          </div>
        </div>

        {/* High Compression */}
        <div className={`p-4 rounded-xl border-2 transition-all ${level === "high" ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}>
          <div className="flex items-start gap-3">
            <RadioGroupItem value="high" id="high" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="high" className="flex items-center gap-2 text-base font-bold text-slate-800 cursor-pointer">
                High Compression <Minimize className="w-4 h-4 text-orange-500" />
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Maximum file size reduction. Visible loss of image quality.
              </p>
            </div>
          </div>
        </div>

      </RadioGroup>
    </div>
  );
}
