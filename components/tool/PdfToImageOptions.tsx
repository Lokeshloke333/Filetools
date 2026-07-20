import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface PdfToImageSettings {
  format: "PNG" | "JPG";
  quality: "low" | "medium" | "high";
  dpi: "72" | "150" | "300";
  pageSelection: "all" | "current" | "custom";
  customRange: string;
}

interface PdfToImageOptionsProps {
  options: PdfToImageSettings;
  onChange: (options: PdfToImageSettings) => void;
  disabled?: boolean;
}

export function PdfToImageOptions({ options, onChange, disabled }: PdfToImageOptionsProps) {
  const updateOption = (key: keyof PdfToImageSettings, value: string) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label className="text-slate-700 font-semibold">Format</Label>
          <Select 
            value={options.format} 
            onValueChange={(val) => updateOption("format", val)} 
            disabled={disabled}
          >
            <SelectTrigger className="w-full h-11 rounded-xl">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PNG">PNG (Recommended)</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-slate-700 font-semibold">Quality</Label>
          <Select 
            value={options.quality} 
            onValueChange={(val) => updateOption("quality", val)} 
            disabled={disabled}
          >
            <SelectTrigger className="w-full h-11 rounded-xl">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Resolution (DPI)</Label>
        <Select 
          value={options.dpi} 
          onValueChange={(val) => updateOption("dpi", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select DPI" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="72">72 DPI (Web)</SelectItem>
            <SelectItem value="150">150 DPI (Standard)</SelectItem>
            <SelectItem value="300">300 DPI (High Quality/Print)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Pages</Label>
        <Select 
          value={options.pageSelection} 
          onValueChange={(val) => updateOption("pageSelection", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select pages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            <SelectItem value="current">First Page Only</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {options.pageSelection === "custom" && (
        <div className="space-y-3 pt-2">
          <Label className="text-slate-700 font-semibold">Page Range</Label>
          <Input 
            placeholder="e.g. 1-5, 7, 9-12"
            value={options.customRange}
            onChange={(e) => updateOption("customRange", e.target.value)}
            disabled={disabled}
            className="h-11 rounded-xl"
          />
          <p className="text-xs text-slate-500 font-medium">
            Enter page numbers and/or ranges separated by commas.
          </p>
        </div>
      )}
    </div>
  );
}
