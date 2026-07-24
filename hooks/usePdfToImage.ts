/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PdfFileInfo } from "@/lib/pdf/types";
import { validatePdf } from "@/lib/pdf/validation";
import { getPdfPageCount } from "@/lib/pdf/utils";
import { PdfToImageSettings } from "@/components/tool/PdfToImageOptions";

export interface PdfToImageResult {
  url: string;
  filename: string;
  originalSize: number;
  processedSize: number;
  imageCount: number;
}

export function usePdfToImage() {
  const [fileInfo, setFileInfo] = useState<PdfFileInfo | null>(null);
  const [options, setOptions] = useState<PdfToImageSettings>({
    format: "PNG",
    quality: "medium",
    dpi: "150",
    pageSelection: "all",
    customRange: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfToImageResult | null>(null);
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
    setUploadError(null);
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

  const convertFile = useCallback(async () => {
    if (!fileInfo) {
      toast.error("Please upload a PDF file.");
      return;
    }

    if (options.pageSelection === "custom" && !options.customRange.trim()) {
      toast.error("Please enter a valid page range.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Uploading...");
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });

    try {
      const formData = new FormData();
      formData.append("file", fileInfo.file);
      formData.append("format", options.format);
      formData.append("quality", options.quality);
      formData.append("dpi", options.dpi);
      formData.append("pageSelection", options.pageSelection);
      formData.append("customRange", options.customRange);

      const statuses = ["Uploading...", "Reading PDF...", "Rendering Pages...", "Converting...", "Creating ZIP..."];
      let statusIndex = 0;
      const progressInterval = setInterval(() => {
        statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
        setStatusMessage(statuses[statusIndex]);
      }, 1500);

      const response = await fetch("/api/pdf/pdf-to-image", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert PDF");
      }

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const imageCount = parseInt(response.headers.get("X-Image-Count") || "0", 10);
      const url = URL.createObjectURL(blob);

      const originalName = fileInfo.file.name.replace(/\.[^/.]+$/, "");
      const zipFilename = `${originalName}_images.zip`;

      setResult({
        url,
        filename: zipFilename,
        originalSize: fileInfo.file.size,
        processedSize: blob.size,
        imageCount,
      });

      toast.success("PDF converted to images successfully!");
    } catch (error: any) {
      console.error("Convert error:", error);
      toast.error(error.message || "An error occurred while converting the PDF.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [fileInfo, options]);

  return {
    fileInfo,
    options,
    setOptions,
    handleFileSelect,
    clearAll,
    convertFile,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
  };
}
