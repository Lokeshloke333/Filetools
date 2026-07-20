import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PdfFileInfo, PdfMergeResult } from "@/lib/pdf/types";
import { validatePdf } from "@/lib/pdf/validation";
import { getPdfPageCount } from "@/lib/pdf/utils";

export function usePdfMerge() {
  const [files, setFiles] = useState<PdfFileInfo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfMergeResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilesSelect = useCallback((newFiles: File[]) => {
    setFiles((currentFiles) => {
      const newFileInfos: PdfFileInfo[] = [];
      let currentList = [...currentFiles];

      for (const f of newFiles) {
        const { valid, error } = validatePdf(f, currentList);
        if (!valid) {
          setUploadError(`${f.name}: ${error}`);
          continue;
        }

        const newInfo = { file: f, id: crypto.randomUUID() };
        newFileInfos.push(newInfo);
        currentList.push(newInfo); // Update list for next validation check
      }

      if (newFileInfos.length === 0) return currentFiles;

      // Fetch page counts asynchronously for the new files
      for (const info of newFileInfos) {
        getPdfPageCount(info.file).then((count) => {
          setFiles((latestFiles) =>
            latestFiles.map((f) => (f.id === info.id ? { ...f, pageCount: count } : f))
          );
        });
      }

      return currentList;
    });
  }, []);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setResult((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  const mergeFiles = useCallback(async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Uploading & Merging...");
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });

    try {
      const formData = new FormData();
      let totalOriginalSize = 0;
      let totalPages = 0;

      files.forEach((fileInfo) => {
        formData.append("files", fileInfo.file);
        totalOriginalSize += fileInfo.file.size;
        if (fileInfo.pageCount) {
          totalPages += fileInfo.pageCount;
        }
      });

      const response = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to merge PDFs");
      }

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const processedSize = blob.size;
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        filename: "merged-document.pdf",
        originalSize: totalOriginalSize,
        processedSize,
        totalPageCount: totalPages,
      });

      toast.success("PDFs merged successfully!");
    } catch (error: any) {
      console.error("Merge error:", error);
      toast.error(error.message || "An error occurred while merging PDFs.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [files]);

  return {
    files,
    setFiles, // to allow reordering
    handleFilesSelect,
    removeFile,
    clearAll,
    mergeFiles,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
  };
}
