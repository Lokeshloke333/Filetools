/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { validateWordFile, WordToPdfOptions } from "@/lib/pdf/word-to-pdf.validation";
import { getPdfPageCount } from "@/lib/pdf/getPdfPageCount";
import { PdfMergeResult } from "@/lib/pdf/types";

export interface WordFileItem extends File {
  id: string;
}

export function useWordToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<WordToPdfOptions>({
    pageSize: "A4",
    orientation: "portrait",
    margins: "normal",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfMergeResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  const handleFilesSelect = useCallback((newFiles: File[]) => {
    let hasError = false;

    setFiles((currentFiles) => {
      const validFiles: File[] = [];
      for (const f of newFiles) {
        const { valid, error } = validateWordFile(f);
        if (!valid) {
          setUploadError(`${f.name}: ${error}`);
          hasError = true;
          continue;
        }

        // Check for duplicates
        if (currentFiles.some((existing) => existing.name === f.name && existing.size === f.size)) {
          setUploadError(`${f.name} is already added.`);
          hasError = true;
          continue;
        }

        validFiles.push(f);
      }

      if (!hasError) setUploadError(null);
      return [...currentFiles, ...validFiles];
    });
  }, []);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const removeFile = useCallback((name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const generatePdf = useCallback(async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one Word document.");
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
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("pageSize", options.pageSize || "A4");
      formData.append("orientation", options.orientation || "portrait");
      formData.append("margins", options.margins || "normal");

      const statuses = [
        "Uploading...",
        "Parsing Word Document...",
        "Formatting Paragraphs & Tables...",
        "Generating PDF Document...",
        "Finalizing Download...",
      ];
      let statusIndex = 0;
      const progressInterval = setInterval(() => {
        statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
        setStatusMessage(statuses[statusIndex]);
      }, 1200);

      const response = await fetch("/api/pdf/word-to-pdf", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert Word document to PDF.");
      }

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Extract real page count from X-Total-Pages header or generated PDF blob
      const pageCountHeader = response.headers.get("X-Total-Pages");
      let totalPageCount = pageCountHeader ? parseInt(pageCountHeader, 10) : 0;
      if (!totalPageCount || isNaN(totalPageCount)) {
        totalPageCount = await getPdfPageCount(blob);
      }

      const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);

      setResult({
        url,
        filename: files.length === 1 ? files[0].name.replace(/\.[^/.]+$/, ".pdf") : "converted-documents.pdf",
        originalSize: totalOriginalSize,
        processedSize: blob.size,
        totalPageCount,
      });

      toast.success("Word document converted to PDF successfully!");
    } catch (error: any) {
      console.error("Word to PDF Error:", error);
      toast.error(error.message || "An error occurred during conversion.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [files, options]);

  return {
    files,
    setFiles,
    options,
    setOptions,
    handleFilesSelect,
    removeFile,
    clearAll,
    generatePdf,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
  };
}
