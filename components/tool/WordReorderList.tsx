"use client";

import React from "react";
import { FileText, Trash2, ArrowUp, ArrowDown, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WordReorderListProps {
  files: File[];
  onReorder: (files: File[]) => void;
  onRemove: (name: string) => void;
  onClearAll: () => void;
}

export function WordReorderList({
  files,
  onReorder,
  onRemove,
  onClearAll,
}: WordReorderListProps) {
  if (files.length === 0) return null;

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...files];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onReorder(updated);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const updated = [...files];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onReorder(updated);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Uploaded Documents ({files.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Reorder or remove Word documents before converting to PDF.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        {files.map((file, idx) => {
          const isDocx = file.name.endsWith(".docx");
          return (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                  {isDocx ? "DOCX" : "DOC"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {files.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={idx === 0}
                      onClick={() => moveUp(idx)}
                      className="h-8 w-8 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={idx === files.length - 1}
                      onClick={() => moveDown(idx)}
                      className="h-8 w-8 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(file.name)}
                  className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
