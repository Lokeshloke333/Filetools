import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PdfFileInfo, PdfUnlockResult } from "@/lib/pdf/types";
import { validatePdf } from "@/lib/pdf/validation";
import { getPdfPageCount } from "@/lib/pdf/utils";

export function usePdfUnlock() {
  const [fileInfo, setFileInfo] = useState<PdfFileInfo | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [result, setResult] = useState<PdfUnlockResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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
    setPassword("");
    setPasswordError(null);

    // Fetch page count (this might fail if the PDF is heavily encrypted, so we catch errors silently)
    getPdfPageCount(file)
      .then((count) => {
        setFileInfo((prev) => (prev && prev.id === newInfo.id ? { ...prev, pageCount: count } : prev));
      })
      .catch(() => {
        // Ignored: expected for encrypted PDFs
      });
  }, []);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const clearAll = useCallback(() => {
    setFileInfo(null);
    setPassword("");
    setPasswordError(null);
    setResult((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  const unlockFile = useCallback(async () => {
    if (!fileInfo) {
      toast.error("Please upload a PDF file.");
      return;
    }
    
    if (!password) {
      setPasswordError("Password is required to unlock this PDF.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Uploading...");
    setPasswordError(null);
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });

    try {
      const formData = new FormData();
      formData.append("file", fileInfo.file);
      formData.append("password", password);

      // Simulate step-by-step progress
      setTimeout(() => setStatusMessage("Validating Password..."), 600);
      setTimeout(() => setStatusMessage("Removing Encryption..."), 1200);

      const response = await fetch("/api/pdf/unlock", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403) {
            setPasswordError(errorData.error || "Incorrect password.");
            throw new Error("INCORRECT_PASSWORD");
        }
        throw new Error(errorData.error || "Failed to unlock PDF");
      }

      setStatusMessage("Preparing Download...");
      const blob = await response.blob();
      const processedSize = blob.size;
      const url = URL.createObjectURL(blob);

      const originalName = fileInfo.file.name.replace(/\.[^/.]+$/, "");
      const unlockedFilename = `${originalName}_unlocked.pdf`;

      setResult({
        url,
        filename: unlockedFilename,
        originalSize: fileInfo.file.size,
        processedSize,
      });

      // Clear the password for security
      setPassword("");
      toast.success("PDF unlocked successfully!");
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Unlock error:", error);
      if (error.message !== "INCORRECT_PASSWORD") {
         toast.error(error.message || "An error occurred while unlocking the PDF.");
      }
    } finally {
      setIsProcessing(false);
      setStatusMessage("");
    }
  }, [fileInfo, password]);

  return {
    fileInfo,
    password,
    setPassword,
    handleFileSelect,
    clearAll,
    unlockFile,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
    passwordError,
  };
}
