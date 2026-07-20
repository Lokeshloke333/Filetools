import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PdfFileInfo, PdfSplitMode, PdfSplitResult } from "@/lib/pdf/types";
import { validatePdf } from "@/lib/pdf/validation";
import { getPdfPageCount } from "@/lib/pdf/utils";

export function usePdfSplit() {
  const [fileInfo, setFileInfo] = useState<PdfFileInfo | null>(null);
  const [mode, setMode] = useState<PdfSplitMode>("every_page");
  const [ranges, setRanges] = useState("");
  const [extract, setExtract] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfSplitResult | null>(null);
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
    setRanges("");
    setExtract("");
    setResult((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  const splitFiles = useCallback(async () => {
    if (!fileInfo) {
      toast.error("Please upload a PDF file.");
      return;
    }

    if (mode === "ranges" && !ranges.trim()) {
      toast.error("Please enter the page ranges to split.");
      return;
    }

    if (mode === "extract" && !extract.trim()) {
      toast.error("Please enter the pages to extract.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Uploading & Splitting...");
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });

    try {
      const formData = new FormData();
      formData.append("file", fileInfo.file);
      formData.append("mode", mode);
      if (mode === "ranges") formData.append("ranges", ranges);
      if (mode === "extract") formData.append("extract", extract);

      const response = await fetch("/api/pdf/split", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to split PDF");
      }

      const totalGenerated = parseInt(response.headers.get("X-Total-Files") || "1", 10);

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const processedSize = blob.size;
      const url = URL.createObjectURL(blob);

      const originalName = fileInfo.file.name.replace(/\.[^/.]+$/, "");
      const zipFilename = `${originalName}_split.zip`;

      setResult({
        url,
        filename: zipFilename,
        originalSize: fileInfo.file.size,
        processedSize,
        totalGeneratedFiles: totalGenerated,
      });

      toast.success("PDF split successfully!");
    } catch (error: any) {
      console.error("Split error:", error);
      toast.error(error.message || "An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [fileInfo, mode, ranges, extract]);

  return {
    fileInfo,
    mode,
    setMode,
    ranges,
    setRanges,
    extract,
    setExtract,
    handleFileSelect,
    clearAll,
    splitFiles,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
  };
}
