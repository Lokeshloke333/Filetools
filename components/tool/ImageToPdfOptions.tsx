import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageToPdfOptions as SettingsType } from "@/lib/pdf/image-to-pdf";

interface ImageToPdfOptionsProps {
  options: SettingsType;
  onChange: (options: SettingsType) => void;
  disabled?: boolean;
}

export function ImageToPdfOptions({ options, onChange, disabled }: ImageToPdfOptionsProps) {
  const updateOption = (key: keyof SettingsType, value: string) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Page Size</Label>
        <Select 
          value={options.pageSize} 
          onValueChange={(val) => updateOption("pageSize", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A4">A4 (Default)</SelectItem>
            <SelectItem value="Letter">US Letter</SelectItem>
            <SelectItem value="Legal">US Legal</SelectItem>
            <SelectItem value="A3">A3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Orientation</Label>
        <Select 
          value={options.orientation} 
          onValueChange={(val) => updateOption("orientation", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select orientation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Margins</Label>
        <Select 
          value={options.margins} 
          onValueChange={(val) => updateOption("margins", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select margins" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (No margins)</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-semibold">Image Fit</Label>
        <Select 
          value={options.imageFit} 
          onValueChange={(val) => updateOption("imageFit", val)} 
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-11 rounded-xl">
            <SelectValue placeholder="Select image fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fit">Fit to Page (Show all)</SelectItem>
            <SelectItem value="fill">Fill Page (May crop)</SelectItem>
            <SelectItem value="original">Original Size (Center)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
