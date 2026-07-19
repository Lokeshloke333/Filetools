"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export interface InteractiveCropPreviewProps {
  file: File & { preview?: string };
  onClear: () => void;
  aspectRatio: number | undefined; // undefined = free crop
  onCropChange: (crop: { x: number; y: number; width: number; height: number } | null) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function InteractiveCropPreview({ file, onClear, aspectRatio, onCropChange }: InteractiveCropPreviewProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  // When aspect ratio changes, re-center crop
  useEffect(() => {
    if (imgRef.current && aspectRatio) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspectRatio);
      setCrop(newCrop);
      // We don't have completedCrop yet, it will trigger onComplete
    }
  }, [aspectRatio]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  // Convert rendered crop to actual image pixel crop
  useEffect(() => {
    if (completedCrop && imgRef.current) {
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      const actualCrop = {
        x: Math.round(completedCrop.x * scaleX),
        y: Math.round(completedCrop.y * scaleY),
        width: Math.round(completedCrop.width * scaleX),
        height: Math.round(completedCrop.height * scaleY),
      };

      // Only fire if valid
      if (actualCrop.width > 0 && actualCrop.height > 0) {
        onCropChange(actualCrop);
      } else {
        onCropChange(null);
      }
    } else {
      onCropChange(null);
    }
  }, [completedCrop, onCropChange]);

  const handleReset = () => {
    setScale(1);
    if (imgRef.current) {
      if (aspectRatio) {
        setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, aspectRatio));
      } else {
        setCrop(undefined);
        setCompletedCrop(undefined);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Zoom Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <ZoomOut className="w-5 h-5 text-slate-400" />
          <Slider 
            value={[scale]} 
            onValueChange={(val) => setScale(val[0])} 
            min={0.5} 
            max={3} 
            step={0.1} 
            className="flex-1"
          />
          <ZoomIn className="w-5 h-5 text-slate-400" />
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} className="h-9">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Crop Area */}
      <div className="w-full min-h-[400px] max-h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative flex items-center justify-center border border-slate-200 shadow-sm">
        {file.preview && (
          <div className="overflow-auto max-w-full max-h-full flex items-center justify-center p-4">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              className="max-w-full max-h-full"
            >
              <img
                ref={imgRef}
                alt="Crop preview"
                src={file.preview}
                style={{ transform: `scale(${scale})`, transition: 'transform 0.1s', transformOrigin: 'center' }}
                onLoad={onImageLoad}
                className="max-w-full max-h-[500px] object-contain"
              />
            </ReactCrop>
          </div>
        )}
      </div>
      
      <Button variant="outline" onClick={onClear} className="w-full h-12 rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
        Remove Image
      </Button>
    </div>
  );
}
