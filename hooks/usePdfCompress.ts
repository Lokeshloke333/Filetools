/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PdfFileInfo, PdfCompressionLevel, PdfCompressResult } from "@/lib/pdf/types";
import { validatePdf } from "@/lib/pdf/validation";
import { getPdfPageCount } from "@/lib/pdf/utils";

export function usePdfCompress() {
  const [fileInfo, setFileInfo] = useState<PdfFileInfo | null>(null);
  const [level, setLevel] = useState<PdfCompressionLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfCompressResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file) return;

    const { valid, error } = validatePdf(file, []);
    if (!valid) {
      setUploadError(`${file.name}: ${error}`);
      return;
    }

    const newInfo: PdfFileInfo = { file, id: crypto.randomUUID() };
    setFileInfo(newInfo);
    setResult(null);

    // Fetch page count
    getPdfPageCount(file).then((count) => {
      setFileInfo((prev) => (prev && prev.id === newInfo.id ? { ...prev, pageCount: count } : prev));
    });
  }, []);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const clearAll = useCallback(() => {
    setFileInfo(null);
    setResult((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  const compressFile = useCallback(async () => {
    if (!fileInfo) {
      toast.error("Please upload a PDF file.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Uploading & Analyzing...");
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });

    try {
      const formData = new FormData();
      formData.append("file", fileInfo.file);
      formData.append("level", level);

      // Simulate sequential progress messages since fetch() doesn't expose it natively without streams
      const statuses = ["Uploading...", "Analyzing PDF...", "Compressing...", "Optimizing..."];
      let statusIndex = 0;
      const progressInterval = setInterval(() => {
        statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
        setStatusMessage(statuses[statusIndex]);
      }, 1000);

      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to compress PDF");
      }

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const processedSize = blob.size;
      const url = URL.createObjectURL(blob);

      const originalName = fileInfo.file.name.replace(/\.[^/.]+$/, "");
      const compressedFilename = `${originalName}_compressed.pdf`;

      setResult({
        url,
        filename: compressedFilename,
        originalSize: fileInfo.file.size,
        processedSize,
      });

      toast.success("PDF compressed successfully!");
    } catch (error: any) {
      console.error("Compress error:", error);
      toast.error(error.message || "An error occurred while compressing the PDF.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [fileInfo, level]);

  return {
    fileInfo,
    level,
    setLevel,
    handleFileSelect,
    clearAll,
    compressFile,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
  };
}
