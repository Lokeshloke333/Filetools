import React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import { formatFileSize } from "@/lib/utils/image";
import { Button } from "@/components/ui/button";
import { FileWithPreview } from "@/hooks/useImageUpload";

interface ImageReorderListProps {
  files: FileWithPreview[];
  onReorder: (newOrder: FileWithPreview[]) => void;
  onRemove: (name: string) => void;
}

function ImageReorderItem({ file, onRemove }: { file: FileWithPreview; onRemove: (name: string) => void }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={file}
      id={file.name}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-4 p-4 mb-3 bg-white border border-slate-200 rounded-2xl shadow-sm cursor-default select-none group hover:border-blue-300 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div
        className="p-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 overflow-hidden bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
          <span>{formatFileSize(file.size)}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(file.name)}
        className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </Reorder.Item>
  );
}

export function ImageReorderList({ files, onReorder, onRemove }: ImageReorderListProps) {
  if (files.length === 0) return null;

  const totalSize = files.reduce((acc, curr) => acc + curr.size, 0);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 px-1 gap-2">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Images to Convert ({files.length})
        </h3>
        <p className="text-xs font-medium text-slate-500">
          Drag the handles <GripVertical className="w-3 h-3 inline text-slate-400" /> to reorder pages
        </p>
      </div>
      
      <Reorder.Group axis="y" values={files} onReorder={onReorder} className="w-full">
        {files.map((file) => (
          <ImageReorderItem key={file.name} file={file} onRemove={onRemove} />
        ))}
      </Reorder.Group>

      {/* Summary Card */}
      <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-around gap-4 shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Images</span>
          <span className="text-lg font-bold text-slate-800">{files.length}</span>
        </div>
        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Combined Size</span>
          <span className="text-lg font-bold text-slate-800">{formatFileSize(totalSize)}</span>
        </div>
        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Pages</span>
          <span className="text-lg font-bold text-blue-600">{files.length}</span>
        </div>
      </div>
    </div>
  );
}
